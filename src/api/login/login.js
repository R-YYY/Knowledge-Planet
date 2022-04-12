import axios from "axios";

const axios0 = axios.create({
    baseURL:"http://localhost:81/kp",
    withCredentials:  true,
    timeout:  5000
})


export function loginPost(email, password){
    const data = new FormData()
    data.append("email",email);
    data.append("password",password);
    return axios0({
        method: 'POST',
        url: '/system/login',
        data: data
    })
}

export function getVerificationCodeGet(email){
    return axios0({
        method:"GET",
        url:"/getVerificationCode/"+email,
    })
}

export function registerPost(email,code,name,password){
    let data = new FormData();
    data.append("email",email);
    data.append("verificationCode",code);
    data.append("nickName",name);
    data.append("password",password);
    return axios0({
        method:"POST",
        url:"/system/register",
        data:data,
    })
}

export function checkEmail(email){
    if(email.trim() === ""){
        return "请填写邮箱！";
    }
    if(!/^[a-zA-Z0-9_\-]{2,}@[a-zA-Z0-9_\-]{2,}(\.[a-zA-Z0-9_\-]+){1,2}$/.test(email)){
        return "邮箱格式错误，请重新填写！";
    }
    return "ok";
}

export function updatePassword(oldPassword, newPassword){
    const data = new FormData()
    data.append("oldPassword",oldPassword);
    data.append("newPassword",newPassword);
    return axios0({
        method: 'POST',
        url: 'userInfo/updatePassword',
        params:{
            "oldPassword":oldPassword,
            "newPassword":newPassword
        }
    })
}
