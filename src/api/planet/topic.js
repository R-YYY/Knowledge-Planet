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

export function addComment(topicId,parentId,content,type) {
    return axios({
        method: 'POST',
        url: '/topic/addComment',
        params:{
            topicId:topicId,
            parentId:parentId,
            content:content,
            type:type
        }
    })
}

export function getAllReply(commentId) {
    return axios({
        method: 'GET',
        url: '/topic/getAllReply/'+commentId,
    })
}
