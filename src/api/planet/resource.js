import axios from "axios";

const axios1 = axios.create({
    baseURL:"http://101.35.194.132:81/kp/resource",
    withCredentials:  true,
    timeout:  5000
})

export function uploadResource(uid, pCode, uName, rName, link, coverage){
    const data = new FormData()
    data.append("email",email);
    data.append("password",password);
    return axios0({
        method: 'POST',
        url: '/login',
        data: data
    })
}

export function getResourceById(rid){
    return axios1({
        method:"GET",
        url:"/getResourceById/",
        params:{
            r_id:rid
        }

    })
}

export function praise(uid,rid){
    return axios1({
        method:"post",
        url:"/praise",
        params:{
            u_id:uid,
            r_id:rid
        }
    })
}

export function unPraise(uid,rid){
    return axios1({
        method:"post",
        url:"/unPraise",
        params:{
            u_id:uid,
            r_id:rid
        }
    })
}

export function collect(uid,rid){
    return axios1({
        method:"post",
        url:"/collect",
        params:{
            u_id:uid,
            r_id:rid
        }
    })
}

export function unCollect(uid,rid){
    return axios1({
        method:"post",
        url:"/unCollect",
        params:{
            u_id:uid,
            r_id:rid
        }
    })
}



