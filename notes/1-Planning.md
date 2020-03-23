## Making a D&D encounter builder
In my D&D game, I typically just throw whatever at the party without too much regard for 
challenge rating. I want to build level-appropriate encounters for the group, and I want 
to make a tool to help select monsters for it.  
Leah had an interest in being updated on my progress, and I'm also going to just take 
a bit of time and write notes as I do the work. 

#### Day 1 and early goals
My minimum goal today is to create the project, possibly upload it to github, and 
get through most of the planning part. For planning, I want to think up a bit of 
how the UI will look and be used, and what shape the code will roughly take.  


## Rules for creating an encounter

#### XP budget
Page 82 of the DMG has the rules of creating an encounter. They have a table that represents 
a XP budget per-character based on their level and how difficult the encounter should be. 
For example, an 8th level character fighting a hard encounter has a budget of 1400xp. A party 
of four 8th level characters then has a budget of 5600xp. Frustratingly enough, there is 
not an immediately apparent pattern to the XP budgets, so we may not be able to just write 
it as a formula and may have to just hard-code the xp table.  

```
Level   Easy    Medium  Hard    Deadly
1       25      50      75      100
2       50      100     150     200
3       75      150     225     400
4       125     250     375     500
...
20      2800    5700    8500    12700
```

#### XP modifier for groups of monsters
Monsters each have an xp cost on their stat block, so we use the xp budget to purchase 
monsters for the fight. In addition, there is an xp modifier that gets applied as the number 
of monsters increases. So basically, 1 goblin may be worth 50xp, but 2 goblins is not worth 
100, because there is a 1.5x multiplier for fights with 2 monsters, and it goes up to a 4x 
modifier for fights of 15+ monsters.  

```
Number  Multiplier
1       1
2       1.5
3-6     2
7-10    2.5
11-14   3
15+     4
```

This assumes party consists of 3-5 players. If there are 1-2 players, bump the multiplier up to the 
next tier so 1-2 players vs 1 monster is 1.5x, and 1-2 players vs 2 is 2x. 
If there are 6+ players, reduce it by 1, with a multiplier of 1 presumably being the floor. 

#### Program design notes: 
So from a code perspective, we more or less have a formula to work with. We need to get the budget 
for the encounter, then get encounters that fit that budget. 

Players should be supplied as an array of levels. Difficulty needs to be supplied as a string most 
likely. We can set minimum and maximum monster counts that default to 1 and 15 respectively. 

It is tempting to include the monsters themselves in the return value, but I think that would end 
up a mistake. If, for example, our budget and monster count allows for 5 CR 1 monsters, it would end 
up giving us every combination of 5 CR 1s available, which would be in the millions. Instead, we 
should return how many monsters of each challenge rating can be purchased with the budget. We can use 
our monster lookup to find monsters that fit that challenge rating. 
For the base program, we may just return an array of numbers representing the challenge ratings. The 
UI wrapper can make that readable. 

#### UI notes
For characters, we'll want two options.
* A character count plus a group level 
* Enter in characters individually.
For difficulty, we want to be able to select from a drop down 
For number of monsters, we want to be able to set minimum and maximum values, which can default 
to 1 and 15 respectively. 

For output, we'll probably want a table. We'll need to see the number of monsters and the 
combined xp cost of the encounter. We'll also want to show a breakdown of which CRs and how many 
of each are available. We'll want searching and sorting on each column. For the CR column, 
we'll probably opt for a simple display like: CR5x2, CR1/8x6 with full text searching.  








