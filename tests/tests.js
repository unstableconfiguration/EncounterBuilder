
let assert = chai.assert;
let builder = new EncounterBuilder();


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
    
    it('should mark "done" when finished iterating', function() { 
        let encounter = { count : 4, crRange : { min : 5, max : 10 }, crs : [9, 10, 10, 10], done : 0 }
        let iteration = builder._getNextEncounter(encounter);
        assert.isTrue(iteration.done);
    });

    it('should set the cost of the encounter', function() { 
        let encounter = { count : 3, crRange : { min : 0, max : 3 }, crs : [1, 1, .5] }
        let iteration = builder._getNextEncounter(encounter);
        console.log(iteration);
        assert.isTrue(iteration.cost === 600);
    });
});

describe('_getEncounterCost', function() { 
    it('should calculate encounter xp value based on array of challenge ratings', function() { 
        let sampleEncounters = [
            { crs : [1, 1, 1], xp : 600 },
            { crs : [3, 4], xp : 1800 }
        ]
        sampleEncounters.forEach((encounter) => {
            assert.isTrue(builder._getEncounterCost(encounter.crs) === encounter.xp);
        });
    });
    
    it('should return 0 when the provided array is undefined', function() { 
        assert.isTrue(builder._getEncounterCost() === 0);
    });
    
    it('should return 0 when the provided array is empty', function() { 
        assert.isTrue(builder._getEncounterCost([]) === 0);
    });
});

