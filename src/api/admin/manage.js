import axios from "../index.js";

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
