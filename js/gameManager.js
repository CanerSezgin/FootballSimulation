let GameManager = {
    teamList: [], selectedTeams: [], teams: [],
    matches: [], comingMatchNo: 1,
    getTeams() { 
        for(let i = 0; i<4; i++){
            var newArray = this.teamList.filter((team) => {
                return team.Id == this.selectedTeams[i];
            });
            this.teams[i] = newArray[0];
        }
        listTeams(this.teams);
        this.createMatches(schedulePattern(this.teams));
        this.updateTeams();
    },
    createMatches(schedulePattern){
        var matchNo = 0;
         schedulePattern.forEach((pattern, index) => {
            matchNo++;
            this.matches[matchNo] = new Match(matchNo, pattern[0].name, pattern[1].name);
            matchNo++;
            this.matches[matchNo] = new Match(matchNo, pattern[2].name, pattern[3].name);
        }); 
        this.matches.shift();
    },
    updateTeams(){
        listMatchResults(this.matches);
        this.teams.forEach(team => {
            calculateStats(this.matches, team);
        });
        listLeagueTable(this.teams);
    }
}

function schedulePattern(teams){
/*  teams[0] = 1 ...  
    [1,2,3,4], [1,4,2,3], [1,3,4,2],
    [4,3,2,1], [3,2,4,1], [2,4,3,1] */

    let schedulePattern = [];
    let initial = [teams[0],teams[2],teams[3],teams[1]];
        for(let i = 0; i < 6; i++){
            let temp = initial.pop();
            initial.splice(1,0,temp);   
            if(i<3){
                schedulePattern.push(initial.slice());
            } else {
                initial.reverse();
                schedulePattern.push(initial.slice());
                initial.reverse();
            }
        }
        return schedulePattern;
}

function playMatch(match, teams){

    // Match Engine
    [homeScore, awayScore] = matchEngine(match.homeTeam, match.awayTeam, teams);
    // Match Scores
    match.homeTeam.score = homeScore;
    match.awayTeam.score = awayScore;
    // Match Points
    status(match);
}

function status(match){
    if(match.homeTeam.score > match.awayTeam.score){
        match.homeTeam.status = "won";
        match.awayTeam.status = "lost";
    } else if(match.homeTeam.score < match.awayTeam.score){
        match.homeTeam.status = "lost";
        match.awayTeam.status = "won";

    } else {
        match.homeTeam.status = "drawn";
        match.awayTeam.status = "drawn";
    } 
}

function calculateStats(matches, team){
    var statistics = matches.reduce( (result, currentMatch) => {
      const home = currentMatch.homeTeam;
      const away = currentMatch.awayTeam;
      if(home.teamName === team.name){
        result.forGoals += home.score;
        result.againstGoals += away.score;
        result.gd = result.forGoals - result.againstGoals;
        if(home.status === "won") {
            result.won++;
            result.points += 3; 
        }
        if(home.status === "drawn") {
            result.drawn++;
            result.points += 1; 
        }
        if(home.status === "lost") {
            result.lost++;
        }
      }
      if(away.teamName === team.name){
        result.forGoals += away.score;
        result.againstGoals += home.score;
        result.gd = result.forGoals - result.againstGoals;
        if(away.status === "won") {
            result.won++;
            result.points += 3; 
        }
        if(away.status === "drawn") {
            result.drawn++;
            result.points += 1; 
        }
        if(away.status === "lost") {
            result.lost++;
        }
      }
      return result;
    } , {forGoals : 0, againstGoals: 0, gd:0, won: 0, drawn: 0, lost: 0, points: 0});
    
    team.statistics = statistics;
    team.statistics.played = team.statistics.won + team.statistics.drawn + team.statistics.lost;
  }  

  function matchEngine(team1, team2, teams){
    var homeTeam = "";
    var awayTeam = "";
    teams.forEach(team => {
        if(team.name === team1.teamName) 
            homeTeam = JSON.parse(JSON.stringify(team));
            homeTeam.score = 0;
        if(team.name === team2.teamName)
            awayTeam = JSON.parse(JSON.stringify(team));
            awayTeam.score = 0;

    });

    homeTeam.power.mf = luck(homeTeam.power.mf, 0.07);
    awayTeam.power.mf = luck(awayTeam.power.mf, 0.07);

    var totalEventNumber = 7; var homeEvents = 0; var awayEvents = 0;
    if(homeTeam.power.mf > awayTeam.power.mf){
        homeEvents = 4;  awayEvents = totalEventNumber - homeEvents;
    } else
        {homeEvents = 3; awayEvents = totalEventNumber - homeEvents;
    }

    for(let i = 0; i < homeEvents; i++){
        event(homeTeam, awayTeam);
    }

    for(let i = 0; i < awayEvents; i++){
        event(awayTeam, homeTeam);
    }
    
    /* Teams' power skills are recalculated for each match. 
    In order to consider chance factor for each skills */
    function luck (skill, factor) {
        // skills are going to change randomly +/- %factor  
        return skill + Math.floor(Math.random() * (2 * skill * factor) - skill * factor);
    }

    /* Teams get a chance (event) to score a goal 
        according to MF skills (possession) */
    function event(att, def){
        var fw = att.power.fw;
        var df = def.power.df;
        fw = luck(fw, 0.10);
        df = luck(df, 0.04);
        if(fw > df+3){
            att.score++;
        }
    }
    return [homeTeam.score, awayTeam.score];
  }

  // Buttons  
  function playAll(matchNo){
      for(let i = matchNo; i <= GameManager.matches.length; i++){
        playMatch(GameManager.matches[i-1], GameManager.teams);
      }
    console.log("League is over! Please reset to play again.");
    GameManager.comingMatchNo = "Done";
    GameManager.updateTeams();
  }

  function playSingleMatch(matchNo){
    if(GameManager.comingMatchNo <=  GameManager.matches.length){
        playMatch(GameManager.matches[matchNo-1], GameManager.teams);
        GameManager.comingMatchNo++;
        GameManager.updateTeams();
            if(GameManager.comingMatchNo == 9) week4();
            if(GameManager.comingMatchNo == 11) week5();
    } else {
        console.log("League is over! Please reset to play again.");
    }
  }

//Preload
$("#selectTeams").hide();
$("#main").hide();
$("#prob").hide();
$("#prob_warning").show();

// Start
$("#btn_start").click(function() {
    createTeams();
    listTeamSelection(GameManager.teamList);
    selectTeam();
    $("#start").hide();
    $("#selectTeams").show();
});

// Select Teams
$("#btn_select-teams").click(function() {
    GameManager.getTeams();
    $("#selectTeams").hide();
    $("#main").show();
});

// Next Match
$("#btn_nextMatch").click(function(){
    playSingleMatch(GameManager.comingMatchNo);
})

// Finish League
$("#btn_finishLeague").click(function(){
    playAll(GameManager.comingMatchNo);
})

// Reset 
$("#btn_reset").click(function() {
    location.reload();
})



