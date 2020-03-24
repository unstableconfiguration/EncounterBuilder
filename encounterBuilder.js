


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

    builder._challengeRatings = { /* cr : xp */ }
    builder._getNextEncounter = function(encounter) { 
        // encounter contains count, cr range, current/previous cr array, cost, and whether it is done 
        // iterate cr array by 1, calculate cost. and return  
    }

    builder._getEncounterCost = function(crs) { 
        // sum of xp values for challenge ratings in array
    }

    return builder;
}






