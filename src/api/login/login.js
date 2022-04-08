import axios from "axios";

const axios = axios.create({
    withCredentials:  true,
    timeout:  5000
})


export function loginPost(email, password){
    const data = new FormData()
    data.append("email",email);
    data.append("password",password);
    return axios({
        method: 'POST',
        url: '/login',
        data: data
    })
}

