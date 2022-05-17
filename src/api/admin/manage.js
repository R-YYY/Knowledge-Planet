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

export function updateNameById(newName) {
    return axios({
        method: "POST",
        url: "/background/updateNameById",
        params:{
            newName:newName
        }
    })
}

export function updateAvatarById(newAvatar) {
    return axios({
        method: "POST",
        url: "/background/updateAvatarById",
        params:{
            newAvatar:newAvatar
        }
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