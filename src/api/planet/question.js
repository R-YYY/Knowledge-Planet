import axios from "../index";
import {dateFormat} from "@/api/planet/competition";

//问题描述与答案之间的间隔符
export const separator = "/**###"

export function addQuestion(competitionId,question) {
    let items = ""
    for (let i = 0; i < question.choices.length - 1; i++) {
        items += question.choices[i] + separator
    }
    items += question.choices[question.choices.length - 1]
    let data = JSON.stringify({
        "competitionId": competitionId,
        "content": question.content,
        "answer": question.answer,
        "score": question.score,
        "items": items
    })
    return axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        url:"/competition/addQuestion",
        data:data
    })
}

export function getQuestion(competitionId){
    return axios({
        method:"GET",
        url:"/competition/getQuestion",
        params:{
            competitionId:competitionId
        }
    })
}