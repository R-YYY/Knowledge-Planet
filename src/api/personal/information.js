import axios from "../index.js";

export function getCollectResource(){
    return axios({
        method:"GET",
        url:'/resource/getCollectResource',
    })
}
