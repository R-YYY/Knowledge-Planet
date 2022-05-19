import axios from "../index";

//答案之间的分隔符
export const separator = "/**###"

export function addQuestion(question) {
    let items = ""
    for (let i = 0; i < question.choices.length - 1; i++) {
        items += question.choices[i] + separator
    }
    items += question.choices[question.choices.length - 1]
    let data = JSON.stringify({
        "competitionId": question.competitionId,
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

export function getQuestionWithUserResult(competitionId){
    return axios({
        method:"GET",
        url:"/competition/getQuestionWithUserResult/"+competitionId,
    })
}

export function getQuestionListWithAnswer(competitionId){
    return axios({
        method:"GET",
        url:"/competition/getQuestionListWithAnswer",
        params:{
            competitionId:competitionId
        }
    })
}

export function updateQuestion(question){
    let items = ""
    for (let i = 0; i < question.choices.length - 1; i++) {
        items += question.choices[i] + separator
    }
    items += question.choices[question.choices.length - 1]
    let data = JSON.stringify({
        "competitionId": question.competitionId,
        "questionId":question.questionId,
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
        url:"/competition/updateQuestion",
        data:data
    })
}
export function submitAnswers(planetCode,data){
    return axios({
        method:"POST",
        url:"/competition/submitAnswers",
        params:{
            planetCode:planetCode,
        },
        data:data,
    })
}
