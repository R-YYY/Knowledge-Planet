import axios from "../index.js";
import da from "element-ui/src/locale/lang/da";

export function getAllNotice(){
    return axios({
        method:"GET",
        url:"/system/getAllNotice/",
    })
}

export function getUserById(){
    return axios({
        method:"GET",
        url:"/background/getUserById",
    })
}


export function releaseNotice(data) {
    return axios({
        method: "POST",
        url:"/system/releaseNotice",
        data: data
    })
}

export function searchUser(info){
    let data = new FormData();
    data.append("info",info);
    return axios({
        method:"GET",
        url:"/background/searchUser?info="+info,
        data:data
    })
}

export function changeUserStatus(userId,status){
    let data = new FormData();
    data.append("userId",userId);
    data.append("status",status);

    return axios({
        method:"POST",
        url:"/background/changeUserStatus",
        data:data
    })
}

export function getAllPlanet(){
    return axios({
        method:"GET",
        url:"/planet/getAllPlanet",
    })
}

export function getLoginLogByUserId(userId){
    return axios({
        method:"GET",
        url:"/background/getLoginLogByUserId/"+userId,
    })
}



export function getResourceByPCode(planetCode) {
    return axios({
        method: "GET",
        url: "/resource/getResourceByPCode",
        params:{
            planetCode:planetCode
        }
    })
}

export function freezeOrThawResource(resourceId,type){
    let data = new FormData();
    data.append("resourceId",resourceId);
    data.append("type",type);
    return axios({
        method:"POST",
        url:"/resource/freezeOrThawResource",
        data:data
    })
}

export function adminSearchPlanet(searchContent) {
    return axios({
        method: "GET",
        url: "/planet/adminSearchPlanet",
        params:{
            keyWord:searchContent
        }
    })
}

export function adminGetResourceByPCode(planetCode){
    let data = new FormData();
    data.append("planetCode",planetCode);
    return axios({
        method:"GET",
        url:"/resource/adminGetResourceByPCode?planetCode="+planetCode,
        data:data
    })
}


