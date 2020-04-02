

(() => {

    let populateCRDropDowns = function(dropDown, defaultValue) {
        let createSelect = function(display, value) {
            let option = document.createElement('option');
            option.innerText = display;
            option.value = value;
            if(value === defaultValue) {
                option.selected = true;
            }
            dropDown.appendChild(option);
        }

        createSelect('0', 0);
        createSelect('1/8', .135);
        createSelect('1/4', .25);
        createSelect('1/2', .5);
        for(let i = 1; i < 30; i++) {
            createSelect(i, i)
        };
    }

    let encounterBuilder = new EncounterBuilder();
    let encounterArgs = { 
        players : [],
        difficulty : '',
        crRange : { min : 0, max : 0 },
        monsterCountRange : { min : 0, max : 0 },

        setCharacters : function(value) { 
            encounterArgs.players = value 
                .split(',')
                .map(c => { return { level : +c||0 } });
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
        output.innerHTML = '';
        for(let i = 0; i < encounters.length; i++){
            output.innerHTML += '<br>' + JSON.stringify(encounters[i]);
        }
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
    populateCRDropDowns(crMin, 1);
    encounterArgs.setCRMin(crMin.value);
    crMin.addEventListener('change', (e) => {
        encounterArgs.setCRMin(e.target.value);
        generateEncounters();
    });

    let crMax = document.getElementById('crMax');
    populateCRDropDowns(crMax, 5);
    encounterArgs.setCRMax(crMax.value);
    crMax.addEventListener('change', (e) => { 
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