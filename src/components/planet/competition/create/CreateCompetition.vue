<template>
  <div style="display: flex;">
    <div class="create_area">
      <div class="create_card">
        <div class="input_name">
          <el-input v-model="title" placeholder="请输入竞赛名称"></el-input>
        </div>
        <div class="input_des">
          <el-input v-model="description" placeholder="请输入竞赛描述"
                    size="small" type="textarea" :rows="1" autosize>
          </el-input>
        </div>
        <div class="table">
          <div class="header">
            <img v-if="!ifShowAll" class="down" src="../../../../assets/competition/down.png" alt="" @click="showAll">
            <img v-if="ifShowAll" class="up" src="../../../../assets/competition/up.png" alt="" @click="hideAll">
            <div class="question_id">题号</div>
            <div class="question_desc">题目</div>
            <div class="question_score">分数</div>
            <div class="question_opera">操作</div>
          </div>
          <div v-for="(item,index) in questionList">
            <QuestionCard :question="item" :index="index"></QuestionCard>
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

export default {
  name: "CreateCompetition",
  components: {TotalQuestion, QuestionCard},
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
    let word = "这是一道单选题哈哈哈，你觉得应该选什么呢？/**###选项AAA/**###选项BBB/**###选项CCC"

    for (let i = 0; i < 5; i++) {
      let q = word.split("/**###")
      this.questionList.push({
        id: i,
        description: q[0],
        choice:q.splice(1,q.length),
        answer:"选项AAA",
        score: (i + 1) * 2,
      })
    }
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
  min-height: 403px;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 50px;
  padding-bottom: 30px;
}

.header {
  display: flex;
  padding-top: 10px;
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
}
</style>