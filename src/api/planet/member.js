import axios from "../index";

export function getLeaderboard(planetId) {
    return axios({
        method: 'GET',
        url: '/planet/getLeaderboard/'+planetId,
    })
}