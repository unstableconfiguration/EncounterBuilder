
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

describe('_getMultiplier', function() { 
    let fightSizeTests = [
        { playerCount : 3, monsterCount : 1, expectedValue : 1, description : 'should return a value of 1 with more than 2 players and 1 monster' },
        { playerCount : 2, monsterCount : 1, expectedValue : 1.5, description : 'should return a value of 1.5 with 1-2 players and 1 monster' },
        { playerCount : 5, monsterCount : 2, expectedValue : 1.5, description : 'should return a value of 1.5 with 3-5 players and 2 monsters' },
        { playerCount : 6, monsterCount : 2, expectedValue : 1, description : 'should return a value of 1 with 6+ players and 2 monsters' },
        { playerCount : 5, monsterCount : 13, expectedValue : 3, description : 'should return a value of 3 with 3-5 players and 11-14 monsters' },
        { playerCount : 4, monsterCount : 30, expectedValue : 4, description : 'should return a value of 4 with 3-5 players and 15+ monsters' }        
    ];

    fightSizeTests.forEach((fight) => { 
        it(fight.description, function() {
            let fightSize = builder._getMultiplier(fight.playerCount, fight.monsterCount);
            assert.isTrue(fightSize === fight.expectedValue);
        });
    });
});

describe('_getNextEncounter', function() { 

    it('should iterate the array if one is provided', function() { 
        let encounter = { monsterCount : 2, crRange : { min : 3, max : 6 }, crs : [3, 3], xpCost : 0  }
        let iteration = builder._getNextEncounter(encounter);
        assert.isTrue(iteration.crs[1] === 4);
    });

    it('should iterate item at index-1 if item at index is at max cr', function() { 
        let encounter = { monsterCount : 2, crRange : { min : 2, max : 8 }, crs : [4, 8], xpCost : 0 };
        let iteration = builder._getNextEncounter(encounter);
        assert.isTrue(iteration.crs[0] === 5);
    });

    it('should set all items with greater indices to the value of item at index when item at index iterates', function() { 
        let encounter = { monsterCount : 3, crRange : { min : 2, max : 12 }, crs : [5, 12, 12], xpCost : 0 };
        let iteration = builder._getNextEncounter(encounter);
        assert.isTrue(!iteration.crs.some((cr) => { cr !== 6 }));
    });

    it('should do nothing if all crs are at their max', function() { 
        let encounter = { monsterCount : 3, crRange : { min : 2, max : 12 }, crs : [12, 12, 12], xpCost : 0 };
        let iteration = builder._getNextEncounter(encounter);
        assert.isTrue(!iteration.crs.some((cr) => { cr !== 12 }));
    })
    
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

describe('_getCRCieling', function() { 
    it('should lower max cr if max cr has an xp value greater than the threshold', function() { 
        let crMax = builder._getCRCieling({ min : 0, max : 700 }, { min : 1, max : 4 });
        assert.isTrue(crMax === 3);
    });

    it('should leave max cr if max cr has an xp value within the threshold', function() { 
        let crMax = builder._getCRCieling({ min : 0, max : 1800 }, { min : 1, max : 4 });
        assert.isTrue(crMax === 4);
    });
});

describe('_getCRFloor', function() { 
    it('should raise the min cr to an xp value of at least 1/10th the max cr', function() { 
        let crMin = builder._getCRFloor({ min : 1, max : 6 });
        assert.isTrue(crMin === 2);
    });

    it('should not raise the min cr if it is already at least 1/10th the max cr', function() { 
        let crMin = builder._getCRFloor({ min : 1, max : 5 });
        assert.isTrue(crMin === 1);
    });
});

