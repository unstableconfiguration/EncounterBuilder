

(()=>{


    let encounterBuilder = new EncounterBuilder();
    let arguments = { 
        characters : [],
        difficulty : 'Medium',
        crRange : { min : 1, max : 10 },
        monsterCountRange : { min : 1, max : 6 }
    };
    window.arguments = arguments;

    let generateEncounters = function() { 
        let encounters = encounterBuilder.getEncounters(arguments);
        output.innerHTML = JSON.stringify(encounters);
    }

    let rgxSanitizeNumbers = /[^\d]/g;
    let rgxSanitizeNumberList = /[^\d,\s]/g;
    let sanitizeInput = function(event, rgx) {
        event.target.value = event.target.value.replace(rgx, '');
    }    

    let characters = document.getElementById('characters');
    characters.addEventListener('keyup', (e) => {
        sanitizeInput(e, rgxSanitizeNumberList);
        arguments.characters = e.target.value.split(',');
        arguments.characters = arguments.characters.map(i => +i);
        generateEncounters();
    });

    let difficulty = document.getElementById('difficulty');
    difficulty.addEventListener('change', (e)=>{
        console.log(e.target.value);
    });

    let crMin = document.getElementById('crMin');
    crMin.addEventListener('keyup', (e) => {
        sanitizeInput(e, rgxSanitizeNumbers);
        arguments.crRange.min = +e.target.value;
        generateEncounters();
    });

    let crMax = document.getElementById('crMax');
    crMax.addEventListener('keyup', (e) => { 
        sanitizeInput(e, rgxSanitizeNumbers);
        arguments.crRange.max = +e.target.value;
        generateEncounters();
    });

    let countMin = document.getElementById('monsterCountMin');
    countMin.addEventListener('keyup', (e) => { 
        sanitizeInput(e, rgxSanitizeNumbers);
        arguments.monsterCountRange.min = +e.target.value;
        generateEncounters();
    });

    let countMax = document.getElementById('monsterCountMax');
    countMax.addEventListener('keyup', (e) => {
        sanitizeInput(e, rgxSanitizeNumbers);
        arguments.monsterCountRange.max = +e.target.value;
        generateEncounters();
    });

    
    

})();