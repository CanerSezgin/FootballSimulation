# FootballSimulation

[LIVE PROJECT](https://canersezgin.github.io/FootballSimulation/)

#### This is a text-based football simulation project. 
* There is **18** teams from different countries/leagues. 
* User selects **4** teams for the league. 

* The simulation league group has 4 teams, there is going to be **12 matches (6 weeks)**
By using **Next Match** button, user can take the simulation forward.(play the match)

* After any match was played, user can change/update the match score by clicking to the match result section. (If the match has not been played yet, the match score can not be changed) 
If the match score is changed by user, the Scoreboard (League Table) is also updated immediately. 

* User can also click the **Finish The League** button in order to finish the league (play all rest of the matches)

* **Team Probabilities of the Championship Title** is calculated as from 4th Week. 

### Match Engine
* The chance factor was considered in order to prevent that team power has a critical impact on the match results. 
When the match starts, the **midfield power** of teams is recalculated by using chance factor. After this calculation, midfield power might be **+/- 7%** from the original amount of power. 

* After recalculation of the midfield power of teams, the new amounts are compared, the team that has greater midfield power will have possession of the ball and they will grab more chance than the other team to score a goal. 

* There are some events in the match (# of events according to possession of the ball for each team) 
For each event, the **attacking power** of the team that attacks will recalculated. New power might be **+/- %10** of the original amount. 
* And the **defending power** of the team that defends will recalculated. New power might be **+/- %4** of the original amount. 
According to new powers, the attacking team might be score a goal or not. 

### Opinion and Suggestion

- If you detect any bugs
- If you have any questions
- If you have any suggestions
- If you wanna just say something

Please let me know. I pay attention so much to your opinion and suggestion.
