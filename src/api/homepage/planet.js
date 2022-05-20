import axios from "../index.js";

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

export function getMessage(){
    return axios({
        method:"GET",
        url:'/system/getMessage'
    })
}

export function setMessageStatus(mId,sta){
    let data = new FormData();
    data.append("messageId",mId);
    data.append("status",sta);
    return axios({
        method:"POST",
        url:"/system/setMessageStatus",
        data:data
    })
}

export function joinPlanet(planetCode){
    let data = new FormData();
    data.append("planetCode",planetCode);
    return axios({
        method:"POST",
        url:"/planet/joinPlanet",
        data:data
    })
}

export function getCreatePlanet(){
    return axios({
        method:"GET",
        url:'/planet/getPlanet/1'
    })
}

export function getJoinPlanet(){
    return axios({
        method:"GET",
        url:'/planet/getPlanet/2'
    })
}

export function getRole(planetCode){
    return axios({
        method:"GET",
        url:'/planet/getRole/'+planetCode
    })
}
export function getMemNumOfPlanet(planetCode){
    return axios({
        method:"GET",
        url:'/planet/getMemNumOfPlanet?planetCode='+planetCode
    })
}
export function quitPlanet(planetCode){
    let formData = new FormData()
    formData.append("planetCode",planetCode)
    return axios({
        method:"POST",
        url:'/planet/quitPlanet/',
        data:formData
    })
}
