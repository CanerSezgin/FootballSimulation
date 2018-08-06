function homeWinner(points){
    var points_ = points.slice();
    points_[0] +=3;
    return (points_);
}
function awayWinner(points){
    var points_ = points.slice();
    points_[1] +=3;
    return (points_);
}
function draw(points){
    var points_ = points.slice();
    points_[0] +=1;
    points_[1] +=1;
    return (points_);
}
var functions = [homeWinner, awayWinner, draw];

function takePoints(match, teams){
    var home = match.homeTeam.teamName;
    var away = match.awayTeam.teamName;
    var homePoints = 0; var awayPoints = 0;
    teams.forEach(team => {
        if(home == team.name)
        homePoints = team.statistics.points;
        if(away == team.name)
            awayPoints = team.statistics.points;
    });
    return [homePoints, awayPoints];
}

function singleWeekProb(points1, points2){
    var array1 = []; 
    var array2 = [];
    var prob = [];
    for(let i=0; i<3; i++){
        array1[i] = functions[i](points1);
        array2[i] = functions[i](points2);
    }

    var index = 0;
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            prob[index] = array1[i].concat(array2[j])
            index++;
        }
    }
    return prob;
}

function singleWeekTakeData(match1, match2, teams){
    var match1Points = takePoints(match1, teams);
    var match2Points = takePoints(match2, teams);
    return singleWeekProb(match1Points, match2Points);
}

function week5(){
    var prob = singleWeekTakeData(GameManager.matches[10], GameManager.matches[11],GameManager.teams);
    //In order to see all possible points at the end of the league, activate the code below;
       /* console.log(prob); */
       numOfWinnerProb(prob,1);
       $("#weekNo").html("End Of Week 5");
}

function week4(){
    var preWeekprob = singleWeekTakeData(GameManager.matches[8], GameManager.matches[9],GameManager.teams);
    var secondWeekArray = [];
    var prob = [];
    preWeekprob.forEach((prePoss, index) => {
        var match1Points = [prePoss[1], prePoss[2]];
        var match2Points = [prePoss[0], prePoss[3]];
        secondWeekArray[index] = singleWeekProb(match1Points, match2Points);
    });

    secondWeekArray.forEach(array => {
        array.forEach(poss => {
            prob.push(poss);
        });
    })
    //In order to see all possible points at the end of the league, activate the code below;
       /* console.log(prob); */
       numOfWinnerProb(prob,2);
       $("#prob_warning").hide();
       $("#weekNo").html("End Of Week 4");
       $("#prob").show();
}

function numOfWinnerProb(prob, leftWeekNo){
    var teams = [];
    var teamProbs = [0,0,0,0];
    var totalProbNo = Math.pow(3, (2*leftWeekNo));
    
    teams[0] = GameManager.matches[10].homeTeam.teamName;
    teams[1] = GameManager.matches[10].awayTeam.teamName;
    teams[2] = GameManager.matches[11].homeTeam.teamName;
    teams[3] = GameManager.matches[11].awayTeam.teamName;

    prob.forEach(p => {
        let index = p.indexOf(Math.max(...p));
        switch(index) {
            case 0:
                teamProbs[index]++;
                break;
            case 1:
                teamProbs[index]++;
                break;
            case 2:
                teamProbs[index]++;
                break;
            case 3:
                teamProbs[index]++;
        }
    });
    
    probPct = teamProbs.map(x => Math.round(x / totalProbNo *100));
    Graph(teams, probPct);
}

var update = false;
function drawGraph(teams, probPct){
    var ctx = document.getElementById("myChart").getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: teams,
            datasets: [{
                label: 'Championship Title Probabilities (%)',
                data: probPct,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    update = true;
}

function updateGraph(probPct) {
    for(let i=0; i<4; i++) {
        removeData(myChart);
    }
    
    probPct.forEach(p => {
        addData(myChart, p);
    });
}

function addData(chart, data) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function Graph(teams, probPct){
    if(update) 
        updateGraph(probPct); 
    else
        drawGraph(teams, probPct);
}