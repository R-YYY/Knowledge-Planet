import Vue from 'vue'
import Axios from 'axios'

const axiosInstance = Axios.create({
    baseURL: "http://49.235.232.7:81/kp",
    timeout: 5000
})

axiosInstance.interceptors.request.use(
    config => {
        config.headers['Content-Type']= 'application/json;charset=UTF-8'
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
