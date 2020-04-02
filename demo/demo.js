

(()=>{


    let encounterBuilder = new EncounterBuilder();
    let arguments = {};

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
    });


    let difficulty = document.getElementById('difficulty');
    difficulty.addEventListener('change', (e)=>{
        console.log(e.target.value);
    });


    let crMin = document.getElementById('crMin');
    crMin.addEventListener('keyup', (e) => {
        sanitizeInput(e, rgxSanitizeNumbers);
    });

    let crMax = document.getElementById('crMax');
    crMax.addEventListener('keyup', (e) => { 
        sanitizeInput(e, rgxSanitizeNumbers);
    });

    let countMin = document.getElementById('monsterCountMin');
    countMin.addEventListener('keyup', (e) => { 
        sanitizeInput(e, rgxSanitizeNumbers);
    });

    let countMax = document.getElementById('monsterCountMax');
    countMax.addEventListener('keyup', (e) => {
        sanitizeInput(ee, rgxSanitizeNumbers);
    });

})();