import axios from "../index";

export function addActivity(data) {
    return axios({
        method: 'POST',
        url: '/activity/addActivity',
        data: data
    })
}

export function getActivity(planetId) {
    return axios({
        method: 'GET',
        url: '/activity/getActivity/'+planetId,
    })
}

export function checkActivity(planetCode,activityId,checkInfo,checkResult) {
    let formData = new FormData()
    formData.append('activityId',activityId)
    formData.append('checkInfo',checkInfo)
    formData.append('checkResult',checkResult)
    formData.append('planetCode',planetCode)
    return axios({
        method: 'POST',
        url: '/activity/checkActivity',
        data:formData
    })
}

export function getActivityNum() {
    return axios({
        method: 'GET',
        url: '/activity/getActivityNum',
    })
}

export function joinOrQuitActivity(activityId,type) {
    let formData = new FormData()
    formData.append('activityId',activityId)
    formData.append('type',type)
    return axios({
        method: 'POST',
        url: '/activity/joinOrQuitActivity',
        data:formData
    })
}

export function getActivityMember(activityId) {
    return axios({
        method: 'GET',
        url: '/activity/getActivityMember/'+activityId,
    })
}
