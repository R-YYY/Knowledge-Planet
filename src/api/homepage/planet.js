import axios from "axios";

const axios2 = axios.create({
    baseURL:"http://101.35.194.132:81/kp/planet",
    withCredentials:  true,
    timeout:  5000
})

export function getPlanetRank(){
    return axios2({
        method:"GET",
        url:"/getHotPlanet/",
    })
}