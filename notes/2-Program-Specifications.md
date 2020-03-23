

## Description
The encounter builder is intended to simplify building 5e Dungeons and Dragons (D&D) 
encounters by performing the XP Threshold calculations based on the rules laid out 
on page 81 of the Dungeon Masters Guide (DMG). Based on how many players there are 
and their character levels, the desired difficulty of the encounter, and a range for
the number of monsters, it will provide a breakdown of different options for how many 
monsters and what challenge ratings they can have. 

#### Software quality
For coding style, adhere to [Idiomatic Javascript](https://github.com/rwaldron/idiomatic.js/).
* Use 4-space indentation 
* Prefer let to var
* Prefer single quotes to double quotes
* Avoid using 'this' directly. Instead, set it to a variable named after the scope
* Keep functions small and tightly scoped. The name of the function should indicate what 
it does. 

#### Performance requirements
The program should execute in under 50 milliseconds. It's code file should not exceed 
10kb in size.

## Program Specifications

#### Functional Requirements
The program should accept encounter parameters and return an array of encounter options. 

#### Interfaces
**getEncounters**
It should contain a getEncounters function that accepts an object for its parameter. 
The parameter object can contain 0 or more of the properties below. Any property not 
contained in the object should be set to its default value.

parameter object properties: 
* players : array of players  
    * player: object containing a player's level as an integer i.e. { level : 1 }
        * example { level : 1 }
    * example : [ { level : 4 }, { level : 5 }, { level : 4 } ]
    * default : []
* difficulty : string representing one of the following values : 'Easy', 'Medium', 'Hard', 'Deadly'
    * example : 'Easy'
    * default : 'Medium'
* monsterCountRange : object containing 'min' and 'max' int values
    * example : { min : 5, max : 10 }
    * default : { min : 1, max : 15 }
* monsterChallengeRange : object containing 'min and 'max int values
    * example : { min : 2, max : 3 }
    * default : { min : .25, max : 30 }

```
// sample
let arguments = { 
    players : [
        { level : 8 },
        { level : 9 }
    ],
    difficulty : 'Hard',
    monsterCountRange : { min : 1, max : 15 },
    monsterChallengeRange : { min : 6, max : 10 }
}
let encounters = getEncounters(arguments);
```

**encounters**
The return value of getEncounters should be an array of encounter objects containing, the number of 
monsters, the XP cost of the encounter, and an array of the challenge ratings of the monsters. 

```
// example encounter 
{ monsterCount : 2, xpCost : 5400, challengeRatings : [5, 5] }
```

#### Testing


**Multiplier Tests** 
The multiplier is based on the number of players and the number of monsters. There are 18 possible 
multiplier possibilities. At least these should be tested: 
* 6+ party size, 1x monster. 
* 1-2x party size, 15+ monsters. 
* 3-5x party size, 3-6x monsters.

**Monster Count** 
Adjusting the minimum and maximum monster counts should be tested
* Test that maximum filters out results with more monsters
* Test that minimum filters out results with less monsters
* Invalid entries should produce no results
    * If the maximum is less than the minimum 
    * If the maximum is set to 0 or less
    * If the minimum is set so high it can't be met with CR .135 (1/8) monsters

**Budget**
* The XP cost of an encounter should never exceed its budget. 
* The XP cost of an encounter should always be higher than the budget of a lower difficulty. 

**Monster Challenge**
Monster challenge minimum and maximum should effectively filter out results. 
* Test that setting the minimum excludes fights with lower CR monsters
* Test that setting the maximume xcludes fights with higher CR monsters
* Invalid entries should produce no results
    * If the maximum is less than the minimum
    * If the maximum is set to .135 or less
    * If the minimum is set to 30(?) or higher
    