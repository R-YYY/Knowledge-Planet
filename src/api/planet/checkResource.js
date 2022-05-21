import axios from "../index";

export function checkResource(data,planetCode) {
    return axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        url: '/resource/checkResource',
        params:{
            planetCode:planetCode
        },
        data: data
    })
}

export function changeRecommendStatus(data) {
    return axios({
        method: 'POST',
        url: '/resource/changeRecommendStatus',
        data: data
    })
}