
let assert = chai.assert;
let builder = new EncounterBuilder();



describe('_getGroupThresholdRange', function() { 
    let groups = [
        { difficulty : 'Medium', players : [{ level : 1 }, { level : 1 }, { level : 1 }, { level : 1 } ], expectedRange : { min : 101, max : 200 }, description : 'should return a value of 101-200 for four level 1 players and a medium encounter' },
        { difficulty : 'Deadly', players : [{ level : 1 }, { level : 20 } ], expectedRange : { min : 8576, max : 12800 }, description : 'should return a value of 8576-12800 for a level 1 and level 20 player group and a Deadly encounter' },
        { difficulty : 'Easy', players : [{ level : 9 } ], expectedRange : { min : 414, max : 550 }, description : 'should return a value of 414-550 for 1 level 9 player and an Easy encounter' }
   
    ];
    groups.forEach((group) => { 
        it(group.description, function() { 
            let xpRange = builder._getGroupThresholdRange(group.players, group.difficulty);
            assert.isTrue(xpRange.min === group.expectedRange.min && xpRange.max === group.expectedRange.max); 
        });
    });
});

describe('_getEncounters', function() { 
    let encounters = [
        { playerCount : 4, xpRange : { min : 101, max : 200 }, countRange : { min : 1, max : 5 }, crRange : { min : 0, max : 5 }, description : 'test' }
        //{ playerCount : 0, xpRange : { min : 0, max : 0 }, countRange : { min : 0, max : 0 }, crRange : { min : 0, max : 0 } },
    ]

    //function(playerCount, xpRange, countRange, crRange) 
    
    encounters.forEach((encounter) => { 
        it(encounter.description, function() { 
            let encounters = builder._getEncounters(encounter.playerCount, encounter.xpRange, encounter.countRange, encounter.crRange);
            console.log(encounters);
            assert.isTrue('false');
        });
    });
});

describe('_getMultiplier', function() { 
    let fightSizeTests = [
        { playerCount : 3, monsterCount : 1, expectedValue : 1, description : 'should return a value of 1 with more than 2 players and 1 monster' },
        { playerCount : 2, monsterCount : 1, expectedValue : 1.5, description : 'should return a value of 1.5 with 1-2 players and 1 monster' },
        { playerCount : 5, monsterCount : 2, expectedValue : 1.5, description : 'should return a value of 1.5 with 3-5 players and 2 monsters' },
        { playerCount : 6, monsterCount : 2, expectedValue : 1, description : 'should return a value of 1 with 6+ players and 2 monsters' },
        { playerCount : 5, monsterCount : 13, expectedValue : 3, description : 'should return a value of 3 with 3-5 players and 11-14 monsters' },
        { playerCount : 4, monsterCount : 30, expectedValue : 4, description : 'should return a value of 4 with 3-5 players and 15+ monsters' }        
    ]

    fightSizeTests.forEach((fight) => { 
        it(fight.description, function() {
            let fightSize = builder._getMultiplier(fight.playerCount, fight.monsterCount);
            assert.isTrue(fightSize === fight.expectedValue);
        });
    });
});

describe('_getNextEncounter', function() { 
    it('should seed the array if the array is undefined', function() { 
        let newEncounter = { count : 3, crRange : { min : 2, max : 8 }, crs : null, cost : 0, done : 0 }
        let iteration = builder._getNextEncounter(newEncounter);
        assert.isNotNull(iteration.crs);
    });

    it('should iterate the array if one is provided', function() { 
        let encounter = { count : 2, crRange : { min : 3, max : 6 }, crs : [3, 3], cost : 0, done : 0 }
        let iteration = builder._getNextEncounter(encounter);
        assert.isTrue(iteration.crs[1] === 4);
    });
    
});

describe('_getEncounterCost', function() { 
    it('should calculate encounter xp value based on array of challenge ratings', function() { 
        let sampleEncounters = [
            { crs : [1, 1, 1], xp : 600 },
            { crs : [3, 4], xp : 1800 }
        ]
        sampleEncounters.forEach((encounter) => {
            assert.isTrue(builder._getEncounterCost(encounter.crs) === encounter.xp, 1);
        });
    });
    
    it('should return 0 when the provided array is undefined', function() { 
        assert.isTrue(builder._getEncounterCost() === 0);
    });
    
    it('should return 0 when the provided array is empty', function() { 
        assert.isTrue(builder._getEncounterCost([]) === 0);
    });

    it('should modify the cost based on the xpMultiplier', function() { 
        assert.isTrue(builder._getEncounterCost([1, 1, .5], 1.5) === 750);
    });
});

