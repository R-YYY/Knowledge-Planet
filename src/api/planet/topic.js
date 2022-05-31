import axios from "../index";

export function insertTopic(data) {
    return axios({
        method: 'POST',
        url: '/topic/insertTopic',
        data: data
    })
}

export function getAllTopic(planetCode) {
    return axios({
        method: 'GET',
        url: '/topic/getAllTopic/'+planetCode,
    })
}

export function getFirstComment(topicId) {
    return axios({
        method: 'get',
        url: '/topic/getFirstComment/'+topicId,
    })
}

export function addComment(planetCode,topicId,parentId,firstCommentId,content,type) {
    return axios({
        method: 'POST',
        url: '/topic/addComment',
        params:{
            topicId:topicId,
            parentId:parentId,
            firstCommentId:firstCommentId,
            content:content,
            type:type,
            planetCode:planetCode
        }
    })
}

export function getAllReply(commentId) {
    return axios({
        method: 'GET',
        url: '/topic/getAllReply/'+commentId,
    })
}

export function praise(id,type) {
    let formData = new FormData();
    formData.append("id",id)
    formData.append("type",type)
    return axios({
        method: 'POST',
        url: '/topic/praise',
        data:formData,
    })
}

export function unPraise(id,type) {
    let formData = new FormData();
    formData.append("id",id)
    formData.append("type",type)
    return axios({
        method: 'POST',
        url: '/topic/unPraise',
        data:formData,
    })
}
export function getOwnerId(planetCode) {
    return axios({
        method: 'GET',
        url: '/planet/getOwnerId/'+planetCode,
    })
}
