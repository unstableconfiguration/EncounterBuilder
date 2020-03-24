


let EncounterBuilder = function() {
    let builder = this;

    builder.getEncounters = function(arguments) {
        arguments = builder._setDefaults(arguments);
        let groupThreshold = builder.getGroupXPThreshold(arguments.players, arguments.difficulty);
        return builder._getEncounters(groupthreshold, arguments.monsterCount, arguments.monsterCR);
    }

    builder._setDefaults = function(arguments) { 
        // sets defaults for players, difficulty, count range, cr range 
    }

    builder._getGroupXPThreshold = function(players, difficulty) {
        // combines the player xp thresholds
    }

    let xpThresholds = { /* level : { difficulty : xp } */ }
    builder._getPlayerXPThreshold = function(player, difficulty) { 
        // gets the xp threshold for a player by level and difficulty 
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

    builder._getEncounters = function(xpRange, countRange, crRange) {
        // iterate through monster counts low to high 
        // build up possible encounters within cr range 
        // add any encounters that fit within xp budget
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

    builder._getNextEncounter = function(encounter) { 
        if(!encounter.crs) { 
            encounter.crs = _seedEncounter(encounter.count, encounter.crRange.min);
        }
        else { 
            encounter.crs = _iterateEncounter(encounter.crs, encounter.crRange.max);
            if(encounter.crs[0] === encounter.crRange.max) {
                encounter.done = true;
            }
        }
        
        encounter.cost = builder._getEncounterCost(encounter.crs);
        return encounter;
    }

    let _seedEncounter = function(count, crMin) { 
        let crs = [];
        for(let i = 0; i < count; i++) {
            crs.push(crMin);
        }
    }

    let _iterateEncounter = function(crs, crMax) {
        let iterateValue = function(idx) {
            let value = crs[idx];
            if(value < crMax) {
                if(value >= 1) {
                    value++;
                }
                else {
                    value = builder._challengeRatings[builder._challengeRatings.indexOf(value) + 1];
                }
                crs[idx] = value;
            }
            else {
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






