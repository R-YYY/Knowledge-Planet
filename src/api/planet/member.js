import axios from "../index";

export function getLeaderboard(planetId) {
    return axios({
        method: 'GET',
        url: '/planet/getLeaderboard/'+planetId,
    })
}

export function getMember(planetCode) {
    return axios({
        method: 'GET',
        url: '/planet/getMember',
        params: {
            planetCode: planetCode
        }
    })
}

export function deleteMember(planetCode,userId) {
    return axios({
        method: 'POST',
        url: '/planet/deleteMember',
        params: {
            planetCode: planetCode,
            userId:userId
        }
    })
}