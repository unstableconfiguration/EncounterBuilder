
let assert = chai.assert;
let builder = new EncounterBuilder();

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
