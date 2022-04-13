import Vue from 'vue'
import Axios from 'axios'

const axiosInstance = Axios.create({
    baseURL: "http://101.35.194.132:81/kp",
    withCredentials: true,
    timeout: 5000
})

axiosInstance.interceptors.request.use(
    config => {
        if (window.sessionStorage.getItem('token')) {
            config.headers['token'] = window.sessionStorage.getItem('token')
        }
        return config
    },
    err => {
        Vue.prototype.$message.error('请求超时')
        return Promise.reject(err)
    }
)

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default axiosInstance
