## First coding
So I've planned the thing out and want to start coding. My goal is to do the 
coding in a couple of steps. 
**Pseudo Code** I'm going to start by writing out the program in pseudocode. 
Yesterday during planning, I was thinking about the 'interfaces' of the program, 
both the user interface, and the software interface. Now I'll be thinking about 
the program's internals and the flow of the code. 
**Create the structure** Next, I'm going to be writing the program out to match 
the pseudocode, but with empty methods. I'll also create an empty .html page to 
load it. At this point, I want it to build without errors, but not actually do 
anything. 
**Fill it in** To fill in the empty function, I'm going to be doing test driven 
development. This means I'll pick a function, write the tests for it, then 
write the code for it so that it passes the tests. 


## Pseudocode 

```
fn getEncounters(arguments):
    groupThreshold = getGroupXPThreshold(players, difficulty)
    groupThreshold = groupThreshold * getMultiplier(playerCount, monsterCount)
    encounters = 

fn _getGroupXPThreshold(players, difficulty) 
    groupThreshold = { min : 0, max : 0 }
    for each player
        threshold = getPlayerXPThreshold(player, difficulty)
        groupThreshold.min += threshold.min
        groupthreshold.max += threshold.max
    return groupThreshold

const xpThresholds // table of xp thresholds from book
fn _getPlayerXPThreshold(player, difficulty)
    return {
        min : xpThresholds[player.level][difficulty-1] || xpThresholds[player.level][difficulty] * .75
        max : xpThresholds[player.level][difficulty]
    }

const xpMultipliers // table of xp multipliers based on fight size
fn _getMultiplier(playerCount, monsterCount)
    fightSize = getFightSize(playerCount, monsterCount)
    return xpMultipliers[fightSize]

fn _getFightSize(playerCount, monsterCount)
    return size 

const challengeRatings // table of XP values for challenge ratings. 
fn _getEncounters(xpThreshold, monsterCount, monsterCR)
    encounters = []

    algorithm description: 
    loop through the monster counts from min to max. 
    For each count c, set out c number of the minimum challenge rating 
    iterate the challenge ratings right to left, checking if their sum fits in the budget range 
    we'll need to work out exit conditions. 

    for count = monsterCount.min to monsterCount.max
        encounter = { count : count, monsterCR : monsterCR, crs : null, cost : 0, done : 0 }
        while(!encounter.done)
            encounter = getNextEncounter(encounter)
            if(encounter.cost > xpThreshold.min || encounter.cost < xpThreshold.max)
                enconters.push({ count : count, cost : cost, crs : crs })

fn getNextEncounter(encounter)
    if crs is null set crs to array of length = count with cr minimum,  
    else, iterate crs. iterate right-to-left. don't exceed cr max. when a value iterates, nothing to 
        its right can be lower than it. 
    
    calculate cost and return 

fn getEncounterCost(crs)

```



