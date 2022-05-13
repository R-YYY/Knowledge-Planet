import axios from "../index";

//问题描述与答案之间的间隔符
export const separator = "/**###"

export function addQuestion() {
    return axios({
        method: 'POST',

    })
}