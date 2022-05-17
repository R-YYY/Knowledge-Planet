import axios from "../index.js";

export function getCollectResource(){
    return axios({
        method:"GET",
        url:'/resource/getCollectResource',
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