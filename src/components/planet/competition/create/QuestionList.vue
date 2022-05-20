<template>
  <div class="create_area">
    <div class="create_card">
      <div class="table">
        <div class="header">
          <img v-if="!ifShowAll" class="down" src="../../../../assets/competition/down.png" alt="" @click="showAll">
          <img v-if="ifShowAll" class="up" src="../../../../assets/competition/up.png" alt="" @click="hideAll">
          <div class="question_id">题号</div>
          <div class="question_desc">题目</div>
          <div class="question_score">分数</div>
          <div v-if="canEdit" class="question_opera">操作</div>
        </div>
        <el-empty class="empty" v-if="questionList.length===0" description="当前竞赛没有题目"></el-empty>
        <div v-for="(item,index) in questionList">
          <QuestionCard :question="item" ref="child" :index="index" :edit="canEdit"></QuestionCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from "@/components/planet/competition/create/QuestionCard";
import TotalQuestion from "@/components/planet/competition/create/TotalQuestion";
import AddCompetition from "@/components/planet/competition/create/AddCompetition";

export default {
  name: "QuestionList",
  components: {AddCompetition, TotalQuestion, QuestionCard},
  props:["questionList","canEdit"],
  data() {
    return {
      title: "",
      description: "",
      ifShowAll: false,
    }
  },
  methods: {
    showAll() {
      this.ifShowAll = true
      let list = this.$refs.child
      for (let i = 0; i < list.length; i++) {
        list[i].show()
      }
    },

    hideAll() {
      this.ifShowAll = false
      let list = this.$refs.child
      for (let i = 0; i < list.length; i++) {
        list[i].hide()
      }
    },
  },
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