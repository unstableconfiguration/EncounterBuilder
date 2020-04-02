## How the coding went 
I didn't take notes while doing the work, so this is a bit of a post-mortem on that part of the job. The coding went fairly well. I went a bit over on time, and some things deviated from planning, but I'd say the planning phase was about 80-90% successful.  
I did a test driven approach, though I feel there is a lot of room for improvement there.  

### How long it took
I was hoping it would take about 6-8 hours to code and it ended up taking about about 10. Estimating effort is one area I still need a lot of improvement on. The difficulty is that almost all the effort overrun comes at the end when inevitably something turns out to be harder than I thought.  

### How well did the planning work 
When I started the coding, the first thing I did was transcribe empty methods from the (pseudocode) outline. Part of the measure of success for the planning phase is how little I had to deviate from that basic structure.  
Most of the deviations came in the form of performance improvements. The need for performance improvements was at least in part a failure to visualize the algorithm during the planning phase. 

### Test Driven Development 
The test driven development went Ok, but is still an area I am working to improve on. An essential part of TDD is success in the planning phase.  
In general I find unit tests to be very dependent on planning. The biggest problem I have had with tests is refactors. Whether I am merging functions together, splitting them up, or renaming them, any changes like that necessitate changes to the tests that sort of deny some of the benefits of TDD. 

### Difficulties  
The biggest difficulties were with the performance of the algorithm. During planning, I rightly spotted that we couldn't mix and match actual monsters since it would create too many possibilities. At the same time, I failed to think of how many possibilities would be created by just running different combinations of challenge ratings. 