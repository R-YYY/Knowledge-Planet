<template>
  <div style="display: flex;">
    <div class="create_area">
      <div class="create_card">
        <div class="table">
          <div class="header">
            <img v-if="!ifShowAll" class="down" src="../../../../assets/competition/down.png" alt="" @click="showAll">
            <img v-if="ifShowAll" class="up" src="../../../../assets/competition/up.png" alt="" @click="hideAll">
            <div class="question_id">题号</div>
            <div class="question_desc">题目</div>
            <div class="question_score">分数</div>
            <div class="question_opera">操作</div>
          </div>
          <el-empty class="empty" v-if="questionList.length===0" description="当前竞赛没有题目"></el-empty>
          <div v-for="(item,index) in questionList">
            <QuestionCard :question="item" :index="index" :edit="true"></QuestionCard>
          </div>
        </div>
      </div>
    </div>
    <div class="total_info">
      <TotalQuestion :question-list="questionList"></TotalQuestion>
    </div>
  </div>
</template>

<script>
import QuestionCard from "@/components/planet/competition/create/QuestionCard";
import TotalQuestion from "@/components/planet/competition/create/TotalQuestion";
import {getQuestion, separator} from "@/api/planet/question";
import AddCompetition from "@/components/planet/competition/create/AddCompetition";

export default {
  name: "EditCompetition",
  components: {AddCompetition, TotalQuestion, QuestionCard},
  data() {
    return {
      title: "",
      description: "",
      questionList: [],
      ifShowAll: false,
    }
  },
  methods: {
    showAll() {
      this.ifShowAll = true
    },

    hideAll() {
      this.ifShowAll = false
    },
  },
  mounted() {
    let competitionId = this.$route.params.cid
    getQuestion(competitionId).then((res)=>{
      let list = res.data.data.question
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
  }
}
</script>

<style scoped>
.create_area {
  overflow-y: scroll;
  height: 620px
}

.create_card {
  width: 900px;
  height: auto;
  margin: 15px 15px 30px 150px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;
}

.input_name {
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 30px;
}

.input_des {
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 20px;
}

.total_info {
  width: 300px;
  height: 250px;
  margin-top: 15px;
  margin-left: 30px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;
}

.table {
  min-height: 540px;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 50px;
  padding-bottom: 30px;
}

.header {
  display: flex;
  padding-top: 30px;
  padding-bottom: 10px;
}

.question_id {
  line-height: 20px;
  width: 100px;
}

.question_desc {
  line-height: 20px;
  width: 400px;
}

.question_score {
  line-height: 20px;
  width: 100px;
}

.question_opera {
  line-height: 20px;
}

.down, .up {
  height: 18px;
  width: 18px;
  cursor: pointer;
  margin-right: 40px;
  margin-left: 20px;
}

.empty{
  margin-top: 100px;
}
</style>