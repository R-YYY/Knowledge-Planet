import axios from "axios";

let axiosInstance = axios.create({
    baseURL: "https://knewledgeplanet.usemock.com",
    timeout: 5000
})

export function getResourceByPCode1(planetCode) {
    return axiosInstance({
        method: "GET",
        url: "/resource/getResourceByPCode",
        params: {
            planetCode: planetCode
        }
    })
}
