<template>
  <div id="editCompetition">
    <Header></Header>
    <div class="back" @click="toCompetitionManage">
      <i class="el-icon-arrow-left" style="font-weight: bold"></i>
      <span>返回竞赛管理</span>
    </div>
    <div style="display: flex">
      <div>
        <QuestionList :question-list="questionList" :can-edit="competition.status===0"></QuestionList>
      </div>
      <div>
        <TotalQuestion :question-list="questionList"
                       :competition="competition"
                       :can-edit="competition.status===0">
        </TotalQuestion>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionList from "@/components/planet/competition/create/QuestionList";
import TotalQuestion from "@/components/planet/competition/create/TotalQuestion";
import {getQuestion, getQuestionListWithAnswer, separator} from "@/api/planet/question";
export default {
  name: "EditComView",
  components: {TotalQuestion, QuestionList},
  data(){
    return{
      questionList:[],
      competition:{},
    }
  },
  methods:{
    toCompetitionManage(){
      this.$router.push("/planet/competition/manage")
    },
  },
  mounted() {
    this.competition = JSON.parse(this.$route.query.competition)
    let competitionId = this.$route.params.cid
    getQuestionListWithAnswer(competitionId).then((res)=>{
      let list = res.data.data.questionList
      for (let i = 0; i < list.length; i++) {
        this.questionList.push({
          competitionId:competitionId,
          questionId:list[i].questionId,
          content:list[i].content,
          choices:list[i].items.split(separator),
          answer: list[i].answer,
          score:list[i].score
        })
      }
    })
  },
}
</script>

<style scoped>
#editCompetition{
  background-color: #F7F4F4;
}

.back{
  width: 112px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 150px;
}
</style>