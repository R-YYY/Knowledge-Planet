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
        url: 'http://localhost:8081/login/checkAccount',
        headers: {
            'Content-Type':'application/json'
        },
        data: data
    })
}

