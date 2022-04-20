import axios from "../index.js";

// export function getPlanetRank(){
//     return axios({
//         method:"GET",
//         url:"/planet/getHotPlanet/",
//     })
// }

export function getAllNotice(){
    return axios({
        method:"GET",
        url:"/system/getAllNotice/",
    })
}

export function getSearchPlanet(searchContent) {
    return axios({
        method: "GET",
        url: "/planet/searchPlanet",
        params:{
            keyWord:searchContent
        }
    })
}

export function createPlanet(name,description,coverage) {
    return axios({
        method: "POST",
        url: '/planet/createPlanet',
        params:{
            planetName:name,
            planetDescription:description,
            planetAvatar:coverage
        }
    })
}

export function getLoginRecord(){
    return axios({
        method:"GET",
        url:'/system/getLoginRecord',
    })
}

export function getRecommendPlanet(){
    return axios({
        method:"GET",
        url:'/planet/getRecommendPlanet',
    })
}

export function getHotPlanet(){
    return axios({
        method:"GET",
        url:'/planet/getHotPlanet',
    })
}