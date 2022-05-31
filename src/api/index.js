import Vue from 'vue'
import Axios from 'axios'
import {Loading} from 'element-ui'

const axiosInstance = Axios.create({
    baseURL: "http://49.235.232.7:81/kp",
    timeout: 5000
})
let loadingInstance = null
let timer = null
axiosInstance.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        if (window.sessionStorage.getItem('token')) {
            config.headers['token'] = window.sessionStorage.getItem('token')
        }
        if (!timer)
            timer = setTimeout(() => {
                loadingInstance = Loading.service({fullscreen: true})
            }, 1000)
        return config
    },
    err => {
        Vue.prototype.$message.error('请求超时')
        return Promise.reject(err)
    }
)

axiosInstance.interceptors.response.use(
    response => {
        if (timer) clearTimeout(timer)
        if (loadingInstance) loadingInstance.close()
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default axiosInstance
