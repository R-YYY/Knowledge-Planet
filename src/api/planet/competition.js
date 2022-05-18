import axios from "../index";


//dateFormat("YYYY-mm-dd HH:MM:SS",startTime)
export function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}

export function addCompetition(competition,planetCode) {
    let data = JSON.stringify({
        "planetCode":planetCode,
        "title":competition.title,
        "description":competition.description,
        "picture":competition.picture,
        "startTime":dateFormat("YYYY-mm-dd HH:MM:SS",competition.startTime),
        "endTime":dateFormat("YYYY-mm-dd HH:MM:SS",competition.endTime),
    })
    return axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        url:"/competition/addCompetition",
        data:data
    })
}

export function getCompetitionByPlanet(planetCode){
    return axios({
        method: 'GET',
        url: "/competition/getCompetitionByPlanet",
        params: {
            planetCode: planetCode
        }
    })
}

export function getLeaderBoard(planetCode){
    return axios({
        method: 'GET',
        url: "/competition/getLeaderBoard",
        params: {
            planetCode: planetCode
        }
    })
}

export function releaseOrAbolish(competitionId,type){
    let data = new FormData
    data.append("competitionId",competitionId)
    data.append("type",type)
    return axios({
        method: 'POST',
        url: "/competition/releaseOrAbolish",
        data:data
    })
}

export function getRegisteredCompetition(){
    return axios({
        method:"GET",
        url:"/competition/getRegisteredCompetition",
    })
}

export function getCompetitionNotStart(planetCode){
    return axios({
        method:"GET",
        url:"/competition/getCompetitionNotStart",
        params:{
            planetCode:planetCode
        }
    })
}
export function getCompetitionScore(competitionId){
    let formData = new FormData()
    formData.append('competitionId',competitionId)
    return axios({
        method:"POST",
        url:"/competition/getCompetitionScore",
        data:formData
    })
}

export function joinOrQuitCompetition(competitionId,type){
    let data = new FormData()
    data.append("competitionId",competitionId)
    data.append("type",type)
    return axios({
        method:"POST",
        url:"competition/joinOrQuitCompetition",
        data:data,
    })
}