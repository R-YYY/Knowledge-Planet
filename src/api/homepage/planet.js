import axios from "../index.js";

export function getPlanetRank(){
    return axios({
        method:"GET",
        url:"/planet/getHotPlanet/",
    })
}

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
