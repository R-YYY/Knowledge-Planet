import axios from "../index";

export function uploadResource(data) {
    return axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        url: '/resource/uploadResource',
        data: data
    })
}

export function getResourceByPCode(planetCode) {
    return axios({
        method: "GET",
        url: "/resource/getResourceByPCode",
        params: {
            planetCode: planetCode
        }
    })
}

export function praise(resourceId) {
    return axios({
        method: "post",
        url: "/resource/praise",
        params: {
            resourceId: resourceId
        }
    })
}

export function unPraise(resourceId) {
    return axios({
        method: "post",
        url: "/resource/unPraise",
        params: {
            resourceId: resourceId
        }
    })
}

export function collect(resourceId) {
    return axios({
        method: "post",
        url: "/resource/collect",
        params: {
            resourceId: resourceId
        }
    })
}

export function unCollect(resourceId) {
    return axios({
        method: "post",
        url: "/resource/uncollect",
        params: {
            resourceId: resourceId
        }
    })
}



