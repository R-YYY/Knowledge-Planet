import axios from "../index";

export function addCompetition() {
    return axios({
        method: 'POST',

    })
}

export function getCompetitionByPlanet(planetCode){
    return axios({
        method: 'GET',
        url: "/competition/getCompetitionByPlanet",
        params: {
            planetCode: planetCode
        }
    })
}

export function getLeaderBoard(planetCode){
    return axios({
        method: 'GET',
        url: "/competition/getLeaderBoard",
        params: {
            planetCode: planetCode
        }
    })
}


