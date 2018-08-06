class Team{
    // Team Power (fw: Forward, mf: Midfield, df: Defence) 
    constructor(Id, nationality, name, fw, mf, df){
        this.Id = Id;
        this.name = name;
        this.nationality = nationality;
        this.power = {
            fw: fw,
            mf: mf,
            df: df
        };
    }
}

class Match{
    constructor(no, homeTeam, awayTeam){
        this.no = no;
        this.homeTeam = {
            teamName: homeTeam,
            score: ""
        };
        this.awayTeam = {
            teamName: awayTeam,
            score: ""
        }
    }
}

function createTeams(){

// Spanish Teams
GameManager.teamList[0] = new Team(1, "Spanish", "R. Madrid", 87,84,84);
GameManager.teamList[1] = new Team(2, "Spanish", "Barcelona", 87,85,82);
GameManager.teamList[2] = new Team(3, "Spanish", "A. Madrid", 81,83,83);
GameManager.teamList[3] = new Team(4, "Spanish", "Sevilla FC", 81,81,80);
GameManager.teamList[4] = new Team(5, "Spanish", "Villarreal", 80,79,78);

// English Teams
GameManager.teamList[5] = new Team(6, "English", "Chelsea", 85,82,82);
GameManager.teamList[6] = new Team(7, "English", "Man. City", 85,83,82);
GameManager.teamList[7] = new Team(8, "English", "Man. United", 85,84,81);
GameManager.teamList[8] = new Team(9, "English", "Arsenal", 84,82,81);
GameManager.teamList[9] = new Team(10, "English", "Liverpool", 82,82,80);

// Italian Teams
GameManager.teamList[10] = new Team(11, "Italian", "Juventus", 86,84,83);
GameManager.teamList[11] = new Team(12, "Italian", "AS Roma", 80,83,81);
GameManager.teamList[12] = new Team(13, "Italian", "SSC Napoli", 85,81,79);
GameManager.teamList[13] = new Team(14, "Italian", "AC Milan", 81,80,80);
GameManager.teamList[14] = new Team(15, "Italian", "Inter", 80,81,79);

// German Teams
GameManager.teamList[15] = new Team(16, "German", "B. Dortmund", 81,80,82);
GameManager.teamList[16] = new Team(17, "German", "FC Schalke", 77,79,77);
GameManager.teamList[17] = new Team(18, "German", "Leipzig", 79,78,77);

}


