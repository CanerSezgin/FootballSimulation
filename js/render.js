// *** HTML Related ***

function listMatchResults(matches){
    var tbody = $("#table_mresults tbody");
    var week = 1;
    tbody.html("");

    $.each(matches, (index, match) => {
        var main =             
            `<tr>
            <th>${match.no}</th>
            <td>${match.homeTeam.teamName}</td>
            <td>${match.homeTeam.score}</td>
            <td>${match.awayTeam.score}</td>
            <td>${match.awayTeam.teamName}</td>
            </tr>`
        var weekCell = `<tr><th scope="row" colspan="5">Week ${week}:</th></tr>`;
        var total = "";
        if(index % 2 == 0) {
            total = weekCell + main;
            week++;
        } else {
            total = main;
        }
        tbody.append(total);        
    });
}

function listTeams(teams){
    var tbody = $('#table_teams tbody');
    tbody.html("");

    $.each(teams, (index, team) => {
        tbody.append(
            `<tr>
            <th scope="row">${index+1}</th>
            <td>${team.name}</td>
            <td>${team.power.df}</td>
            <td>${team.power.mf}</td>
            <td>${team.power.fw}</td>
            </tr>`);
    });
}

function listLeagueTable(teams){
    var tbody = $('#table_league-table tbody');
    tbody.html("");
    
    var sortedTeams = teams.slice(0);
    sortedTeams.sort(function(a,b) {
    return b.statistics.points - a.statistics.points;
});

    $.each(sortedTeams, (index, team) => {
            tbody.append(
            `<tr>
            <td>${team.name}</td>
            <td>${team.statistics.played}</td>
            <td>${team.statistics.won}</td>
            <td>${team.statistics.drawn}</td>
            <td>${team.statistics.lost}</td>
            <td>${parseInt(team.statistics.forGoals)}</td>
            <td>${parseInt(team.statistics.againstGoals)}</td>
            <td>${team.statistics.gd}</td>
            <td>${team.statistics.points}</td>
            </tr>`);
    });
}

function listTeamSelection(teamList){
    var tbody1 = $('#table_choose_1 tbody');
    var tbody2 = $('#table_choose_2 tbody');
    tbody1.html(""); tbody2.html("");

    for(let i = 0; i<teamList.length/2; i++){
        tbody1.append(
            `<tr>
            <th scope="row">${i+1}</th>
            <td>${teamList[i].name}</td>
            <td>${teamList[i].nationality}</td>
            <td>${teamList[i].power.df}</td>
            <td>${teamList[i].power.mf}</td>
            <td>${teamList[i].power.fw}</td>
            </tr>`);
    }

    for(let i = 9; i<teamList.length; i++){
        tbody2.append(
            `<tr>
            <th scope="row">${i+1}</th>
            <td>${teamList[i].name}</td>
            <td>${teamList[i].nationality}</td>
            <td>${teamList[i].power.df}</td>
            <td>${teamList[i].power.mf}</td>
            <td>${teamList[i].power.fw}</td>
            </tr>`);
    }
}

function selectTeam(){
    var no = 1;
    
        $("#table_choose_1 tbody tr, #table_choose_2 tbody tr").click( function(){
            if($(this).hasClass("selected")) console.log("this team has been already chosen.");
            else {
                    var id = '#'+ no;
                    $(id).removeClass("selected");
                    $(id).removeAttr('id');
                    $(this).addClass("selected");
                    $(this).attr('id', no);
                    GameManager.selectedTeams[no-1] = $("th",this).html();
                    no++;
                    if(no > 4) {
                        no = 1;
                        $("#btn_select-teams").removeAttr("disabled");
                    }
                }
        });
}

// Edit Match Results
$("#table_mresults tbody").on("click", "tr", function(){
    var homeTeamTd = $(this).find(':nth-child(3)');
    var awayTeamTd = $(this).find(':nth-child(4)');

    if(homeTeamTd.html() != "" && awayTeamTd.html() != ""){
        homeTeamTd.prop('contentEditable', true);
        awayTeamTd.prop('contentEditable', true);
    } else {
        console.log("You can not change the score if the match have not played yet!");
    }

    $(this).keypress(function (event){
        enter = event.which == 13;
        space = event.which == 32;
        if (isNaN(String.fromCharCode(event.which)) || space) event.preventDefault();
        if(enter) event.target.blur();
    });

    $(this).focusout(function (event){
        index = $(this).find(':nth-child(1)').html() -1;
        var match =  GameManager.matches[index]
        match.homeTeam.score = parseInt($(this).find(':nth-child(3)').html());
        match.awayTeam.score = parseInt($(this).find(':nth-child(4)').html());
        status(match);
        GameManager.updateTeams();
        if(GameManager.comingMatchNo == 9 ) week4();
        if(GameManager.comingMatchNo == 11) week5();
    })
}); 