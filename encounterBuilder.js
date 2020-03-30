


let EncounterBuilder = function() {
    let builder = this;

    builder.getEncounters = function(arguments) {
        arguments = builder._setDefaults(arguments);
        let groupThresholdRange = builder._getGroupThresholdRange(arguments.players, arguments.difficulty);
        return builder._getEncounters(groupThresholdRange, arguments.monsterCountRange, arguments.crRange);
    }

    builder._setDefaults = function(arguments) { 
        arguments.players = arguments.players || [];
        arguments.crRange = arguments.crRange || { min : .135, max : 30 };
        arguments.monsterCountRange = arguments.monsterCountRange || { min : 1, max : 15 };
        arguments.difficulty = arguments.difficulty || 'Medium';
    }

    builder._getGroupThresholdRange = function(players, difficulty) {
        return players.reduce((accumulator, player) => {
            let playerXPThreshold = builder._getPlayerThresholdRange(player, difficulty);
            accumulator.min += playerXPThreshold.min;
            accumulator.max += playerXPThreshold.max;
            return accumulator;
        }, { min : 1, max : 0 });
    }

    builder._xpThresholds = { 
        1 : { 'Easy' : 25,    'Medium' : 50,   'Hard' : 75,   'Deadly' : 100 },
        2 : { 'Easy' : 50,    'Medium' : 100,  'Hard' : 150,  'Deadly' : 200 },
        3 : { 'Easy' : 75,    'Medium' : 150,  'Hard' : 225,  'Deadly' : 400 },
        4 : { 'Easy' : 125,   'Medium' : 250,  'Hard' : 375,  'Deadly' : 500 },
        5 : { 'Easy' : 250,   'Medium' : 500,  'Hard' : 750,  'Deadly' : 1100 },
        6 : { 'Easy' : 300,   'Medium' : 600,  'Hard' : 900,  'Deadly' : 1400 },
        7 : { 'Easy' : 350,   'Medium' : 750,  'Hard' : 1100, 'Deadly' : 1700 },
        8 : { 'Easy' : 450,   'Medium' : 900,  'Hard' : 1400, 'Deadly' : 2100 },
        9 : { 'Easy' : 550,   'Medium' : 1100, 'Hard' : 1600, 'Deadly' : 2400 },
        10 : { 'Easy' : 600,  'Medium' : 1200, 'Hard' : 1900, 'Deadly' : 2800 },
        11 : { 'Easy' : 800,  'Medium' : 1600, 'Hard' : 2400, 'Deadly' : 3600 },
        12 : { 'Easy' : 1000, 'Medium' : 2000, 'Hard' : 3000, 'Deadly' : 4500 },
        13 : { 'Easy' : 1100, 'Medium' : 2200, 'Hard' : 3400, 'Deadly' : 5100 },
        14 : { 'Easy' : 1250, 'Medium' : 2500, 'Hard' : 3800, 'Deadly' : 5700 },
        15 : { 'Easy' : 1400, 'Medium' : 2800, 'Hard' : 4300, 'Deadly' : 6400 },
        16 : { 'Easy' : 1600, 'Medium' : 3200, 'Hard' : 4800, 'Deadly' : 7200 },
        17 : { 'Easy' : 2000, 'Medium' : 3900, 'Hard' : 5900, 'Deadly' : 8800 },
        18 : { 'Easy' : 2100, 'Medium' : 4200, 'Hard' : 6300, 'Deadly' : 9500 },
        19 : { 'Easy' : 2400, 'Medium' : 4900, 'Hard' : 7300, 'Deadly' : 10900 },
        20 : { 'Easy' : 2800, 'Medium' : 5700, 'Hard' : 8500, 'Deadly' : 12700 },
    }
    builder._getPlayerThresholdRange = function(player, difficulty) { 
        let playerXPThreshold = { min : 0, max : 0 };
        
        let lowerDifficulty = 'Easy';
        if(difficulty === 'Deadly') { lowerDifficulty = 'Hard'; }
        else if (difficulty === 'Hard') { lowerDifficulty = 'Medium'; }
        else if (difficulty === 'Medium') { lowerDifficulty = 'Easy'; }
        
        playerXPThreshold.max = builder._xpThresholds[player.level][difficulty];
        if(difficulty === 'Easy') {
            playerXPThreshold.min = Math.round(playerXPThreshold.max * .75);
        }
        else {
            playerXPThreshold.min = builder._xpThresholds[player.level][lowerDifficulty];
        }
        
        return playerXPThreshold;
    }

    let xpMultipliers = { 1 : 1, 2 : 1.5, 3 : 2, 4 : 2.5, 5 : 3, 6 : 4 };
    builder._getMultiplier = function(playerCount, monsterCount) { 
        let fightSize = builder._getFightSize(playerCount, monsterCount);
        return xpMultipliers[fightSize];
    }

    builder._getFightSize = function(playerCount, monsterCount) {
        let fightSize = 0;
        if(monsterCount === 1) { fightSize = 1; }
        else if (monsterCount === 2) { fightSize = 2; }
        else if (monsterCount > 2 && monsterCount <= 6) { fightSize = 3; }
        else if (monsterCount >= 7 && monsterCount <= 10) { fightSize = 4; }
        else if (monsterCount >= 11 && monsterCount <= 14) { fightSize = 5; }
        else if (monsterCount >= 15) { fightSize = 6; }
        
        if(playerCount <= 2 && fightSize < 6) { fightSize++; }
        else if (playerCount >= 6 && fightSize > 1) { fightSize--; }
        return fightSize;
    }

    builder._getEncounters = function(playerCount, xpRange, countRange, crRange) {
        let encounters = [];
        crRange = _getCRCieling(xpRange, crRange);
        crRange = _getCRFloor(crRange);

        for(let monsterCount = countRange.min; monsterCount <= countRange.max; monsterCount++) {
            let multiplier = builder._getMultiplier(playerCount, monsterCount);
            let encounter = { count : monsterCount, xpMultiplier : multiplier, xpCost : 0, crRange : crRange, crs : null, done : false }

            while(!encounter.done) {
                encounter = builder._getNextEncounter(encounter);

                if(encounter.xpCost > xpRange.min && encounter.xpCost <= xpRange.max) {
                    encounters.push(JSON.parse(JSON.stringify(encounter)));
                }
                
                /* Performance improvement. Once we have exceeded the xp budget we'll always exceed it with our highest value. */
                if(encounter.xpCost > xpRange.max) {
                    encounter.crRange.max = builder._lowerChallengeRating(encounter.crRange.max);
                }
            }
        }

        return encounters;
    }

    /* If our crRange.max exceeds our xpRange.max, we can lower it to filter out monsters of overly high CRs */
    let _getCRCieling = function(xpRange, crRange) {
        for(let i = crRange.max; i > 0; i--){
            if(builder._challengeRatingXPValues[crRange.max] > xpRange.max) {
                crRange.max = builder._lowerChallengeRating(crRange.max);
            }
            else { break; }
        }
        return crRange;
    }
    
    /* To avoid wasting cycles on too-weak monsters, crRange.min must be at least 1/10th the xp of crRange.max
        This gets a lot more generous as levels increase, and mostly serves to filter out CR 0-.5 early as those 
        quickly become one-hit-kills */
    let _getCRFloor = function(crRange) {
        for(let i = crRange.min; i <= crRange.max; i++) {
            if(builder._challengeRatingXPValues[crRange.min] < builder._challengeRatingXPValues[crRange.max] / 10) {
                crRange.min = builder._raiseChallengeRating(crRange.min);
            }
            else { break; }
        }
        return crRange;
    }

    builder._challengeRatingXPValues = { 
        /* 0, 1/8, 1/4, 1/2 */
        0 : 10, .135 : 25, .25 : 50, .5 : 100, 
        // 1-10
        1 : 200, 2 : 450, 3 : 700, 4 : 1100, 5 : 1800, 6 : 2300, 7 : 2900, 8 : 3900, 9 : 5000, 10 : 5900,
        // 11-20
        11 : 7200, 12 : 8400, 13 : 10000, 14 : 11500, 15 : 13000, 16 : 15000, 17 : 18000, 19 : 22000, 20 : 25000,
        // 21-30
        21 : 33000, 22 : 41000, 23 : 50000, 24 : 62000, 25 : 75000, 26 : 90000, 27 : 105000, 28 : 120000, 29 : 135000, 30 : 155000
    };

    builder._challengeRatings = [
        0, .135, .25, .5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    ];

    builder._lowerChallengeRating = function(cr) {
        if(cr > 0)
            return builder._challengeRatings[builder._challengeRatings.indexOf(cr) - 1];
        return cr;
    }

    builder._raiseChallengeRating = function(cr) { 
        if(cr < 30)
            return builder._challengeRatings[builder._challengeRatings.indexOf(cr) + 1];
        return cr;
    }

    builder._getNextEncounter = function(encounter) { 

        if(!encounter.crs) { 
            encounter.crs = _seedEncounter(encounter.count, encounter.crRange.min);
        }
        else { 
            encounter.crs = _iterateEncounter(encounter.crs, encounter.crRange.max);
            if(encounter.crs[0] >= encounter.crRange.max) {
                encounter.done = true;
            }
        }
        
        encounter.xpCost = builder._getEncounterCost(encounter.crs) * encounter.xpMultiplier;
        return encounter;
    }

    let _seedEncounter = function(count, crMin) { 
        let crs = [];
        for(let i = 0; i < count; i++) {
            crs.push(crMin);
        }
        return crs;
    }

    let _iterateEncounter = function(crs, crMax) {
        let iterateValue = function(idx) {
            let value = crs[idx];
            if(value < crMax) {
                crs[idx] = builder._raiseChallengeRating(value);
            }
            else {
                if(idx === 0) { return; }

                iterateValue(idx-1);
                for(let i = idx-1; i < crs.length; i++) {
                    crs[i] = crs[idx-1];
                }
            }
        }
        iterateValue(crs.length-1);
        return crs;
    }

    /* Get Encounter Cost 
        Looks up the XP values for the provided challenge ratings and sums their values. 
    */
    builder._getEncounterCost = function(crs = []) { 
        return crs.reduce((accumulator, cr) => { 
            return accumulator + builder._challengeRatingXPValues[cr];
        }, 0);
    }

    return builder;
}






