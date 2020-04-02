

(()=>{


    let encounterBuilder = new EncounterBuilder();
    let encounterArgs = { 
        characters : [],
        difficulty : '',
        crRange : { min : 0, max : 0 },
        monsterCountRange : { min : 0, max : 0 },

        setCharacters : function(value) { 
            encounterArgs.characters = value 
                .split(',')
                .map(c => +c);
        },
        setDifficulty : function(value) {
            encounterArgs.difficulty = value;
        },
        setCRMin : function(value) { 
            encounterArgs.crRange.min = +value;
        },
        setCRMax : function(value) { 
            encounterArgs.crRange.max = +value;
        },
        setCountMin : function(value) { 
            encounterArgs.monsterCountRange.min = +value;
        },
        setCountMax : function(value) { 
            encounterArgs.monsterCountRange.max = +value;
        },
        
    };

    let generateEncounters = function() { 
        let encounters = encounterBuilder.getEncounters(encounterArgs);
        output.innerHTML = JSON.stringify(encounters);
    }

    let rgxSanitizeNumbers = /[^\d]/g;
    let rgxSanitizeNumberList = /[^\d,\s]/g;
    let sanitizeInput = function(event, rgx) {
        event.target.value = event.target.value.replace(rgx, '');
    }    

    let characters = document.getElementById('characters');
    encounterArgs.setCharacters(characters.value);
    characters.addEventListener('keyup', (e) => {
        sanitizeInput(e, rgxSanitizeNumberList);
        encounterArgs.setCharacters(e.target.value);
        generateEncounters();
    });

    let difficulty = document.getElementById('difficulty');
    encounterArgs.setDifficulty(difficulty.value);
    difficulty.addEventListener('change', (e)=>{
        encounterArgs.setDifficulty(e.target.value);
        generateEncounters();
    });

    let crMin = document.getElementById('crMin');
    encounterArgs.setCRMin(crMin.value);
    crMin.addEventListener('keyup', (e) => {
        sanitizeInput(e, rgxSanitizeNumbers);
        encounterArgs.setCRMin(e.target.value);
        generateEncounters();
    });

    let crMax = document.getElementById('crMax');
    encounterArgs.setCRMax(crMax.value);
    crMax.addEventListener('keyup', (e) => { 
        sanitizeInput(e, rgxSanitizeNumbers);
        encounterArgs.setCRMax(e.target.value);
        generateEncounters();
    });

    let countMin = document.getElementById('monsterCountMin');
    encounterArgs.setCountMin(countMin.value);
    countMin.addEventListener('keyup', (e) => { 
        sanitizeInput(e, rgxSanitizeNumbers);
        encounterArgs.setCountMin(e.target.value);
        generateEncounters();
    });

    let countMax = document.getElementById('monsterCountMax');
    encounterArgs.setCountMax(countMax.value);
    countMax.addEventListener('keyup', (e) => {
        sanitizeInput(e, rgxSanitizeNumbers);
        encounterArgs.setCountMax(e.target.value);
        generateEncounters();
    });


})();