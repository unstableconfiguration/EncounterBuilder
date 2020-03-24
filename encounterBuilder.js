


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

    let xpMultipliers = { /* fightSize : multiplier */ }
    builder._getMultiplier = function(playerCount, monsterCount) { 
        // gets multiplier based on fight size 
    }

    builder._getFightSize = function(playerCount, monsterCount) {
        // gets fight size based on relative number of combatants. 
    }

    builder._getEncounters = function(xpRange, countRange, crRange) {
        // iterate through monster counts low to high 
        // build up possible encounters within cr range 
        // add any encounters that fit within xp budget
    }

    builder._challengeRatings = { 
        /* 0, 1/8, 1/4, 1/2 */
        0 : 10, .135 : 25, .25 : 50, .5 : 100, 
        // 1-10
        1 : 200, 2 : 450, 3 : 700, 4 : 1100, 5 : 1800, 6 : 2300, 7 : 2900, 8 : 3900, 9 : 5000, 10 : 5900,
        // 11-20
        11 : 7200, 12 : 8400, 13 : 10000, 14 : 11500, 15 : 13000, 16 : 15000, 17 : 18000, 19 : 22000, 20 : 25000,
        // 21-30
        21 : 33000, 22 : 41000, 23 : 50000, 24 : 62000, 25 : 75000, 26 : 90000, 27 : 105000, 28 : 120000, 29 : 135000, 30 : 155000
    }
    builder._getNextEncounter = function(encounter) { 
        // encounter contains count, cr range, current/previous cr array, cost, and whether it is done 
        // iterate cr array by 1, calculate cost. and return  
    }

    builder._getEncounterCost = function(crs = []) { 
        return crs.reduce((accumulator, cr) => { 
            return accumulator + builder._challengeRatings[cr];
        }, 0);
    }

    return builder;
}






