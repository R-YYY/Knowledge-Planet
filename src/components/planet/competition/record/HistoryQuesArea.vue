<template>
  <div>
    <div class="back" @click="toCompetitionRecord">
      <i class="el-icon-arrow-left" style="font-weight: bold"></i>
      <span>返回</span>
    </div>
    <div class="com_main">
      <div class="com_header">
        {{ competition.title }}
      </div>
      <div class="com_content" v-show="index+1===currentIndex" v-for="(question,index) in questions"
           :key="question.questionId">
        <span class="tag">{{ index + 1 }}/{{ questions.length }}</span>
        <p class="question_title">{{ question.content }}
          <span class="score">({{question.getScore}} / {{question.score}}分)</span>
        </p>
        <el-radio-group class="question_options" v-model="question.userAnswer" disabled>
          <div v-for="(option,index) in question.options">
            <el-radio :class="questionClass(question,index)" :key="index" :label="index.toString()">
              {{ option }}
              <span v-if="index.toString()===question.answer" class="answer">(正确答案)</span>
            </el-radio>
          </div>
        </el-radio-group>
      </div>
      <div class="button_group">
        <button class="move_button" v-if="this.currentIndex<this.questions.length"
                @click="moveToQuestion(currentIndex+1)">下一题
        </button>
        <button class="move_button" v-if="this.currentIndex>1" @click="moveToQuestion(currentIndex-1)">上一题</button>
      </div>
      <div class="footer">
        <span class="index_card_header">答题卡</span>
        <div class="index_cards">
          <span class="index_card"
                v-for="(question,index) in questions"
                :key="question.questionId"
                @click="moveToQuestion(index+1)">{{ index + 1 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getQuestionWithUserResult, separator} from "@/api/planet/question";

export default {
  name: "HistoryQuesArea",
  props: ["competition"],
  data() {
    return {
      questions: [],
      currentIndex: 1,
    }
  },
  mounted() {
    getQuestionWithUserResult(this.competition.competitionId).then((res) => {
      if (res.data.success) {
        let questions = res.data.data.questionList
        console.log(questions)
        for (let item of questions) {
          let options = item.question.items.split(separator)
          this.questions.push({
            questionId: item.question.questionId,
            competitionId: item.question.competitionId,
            content: item.question.content,
            answer: item.question.answer,
            score: item.question.score,
            options: options,
            userAnswer:item.userAnswer,
            right:item.right,
            getScore:item.getScore
          })
        }
        console.log(this.questions)
        this.$nextTick(function () {
          this.moveToQuestion(1)
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    moveToQuestion(index) {
      this.currentIndex = index
      let cards = document.getElementsByClassName("index_card")
      for (let i = 0; i < cards.length; i++) {
        cards[i].className = "index_card"
        if (this.questions[i].answer !== null) {
          cards[i].className = "index_card index_card_finish"
        }
      }
      cards[index - 1].className = "index_card index_card_current"
    },

    questionClass(question,index){
      if(question.answer===index.toString())
        return 'right_option'
      return question.userAnswer===index.toString()?'error_option':'question_option'
    },

    toCompetitionRecord(){
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.back{
  width: 112px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 315px;
}

.com_main {
  position: relative;
  top: 20px;
  left: 50%;
  min-height: 200px;
  padding: 0 0 20px 0;
  width: min(900px, 60%);
  border-radius: 12px;
  transform: translateX(-50%);
  box-shadow: 0 0 12px #ababab;
}

.com_header {
  height: 50px;
  border-radius: 12px 12px 0 0;
  background-color: #E2F5F0;
  line-height: 50px;
  padding-left: 20px;
  font-weight: bold;
  color: #606060;
  font-size: 18px;
}

.com_content {
  min-height: 200px;
  margin: 20px 30px;
}

.tag {
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 20px;
  background-color: #E2F5F0;
  color: #565656;

}

.question_title {
  font-size: 17px;
}

.question_options {
  display: block;
}

.question_option,
.right_option,
.error_option {
  display: block;
  height: 50px;
  line-height: 50px;
  margin-bottom: 10px;
  margin-right: 0;
  padding-left: 10px;
  border-radius: 8px;
  border: 1px solid #e1e1e1;
}

.right_option{
  background-color: #e2f5f0;
}

.error_option{
  background-color: #f5dcdc;
}

.button_group {
  height: 50px;
  padding-right: 10px;
}

.move_button {
  float: right;
  margin-right: 20px;
  width: 80px;
  height: 35px;
  border-radius: 8px;
  border: 1px solid #74D8BE;
  font-weight: bold;
  color: #74D8BE;
  background-color: #fff;
}

/*.move_button:hover {*/
/*  color: #fff;*/
/*  background-color: #74D8BE;*/
/*}*/

.footer {
  min-height: 100px;
  margin: 0 0px;
  padding: 20px 30px;
  border-top: 1px dashed #bdbdbd;
}

.index_cards {
  display: flex;
}

.index_card_header {
  display: block;
  height: 30px;
  line-height: 30px;
}

.index_card {
  margin: 5px 0;
  display: inline-block;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
  color: #919191;
  background-color: #fff;
}

.index_card_current {
  color: #fff;
  background-color: #74D8BE;
}

.move_button:hover {
  color: #fff;
  background-color: #74D8BE;
  cursor: pointer;
}

.index_card:hover,
.index_card_finish {
  color: #74D8BE;
}

.answer{
  font-size: 13px;
  color: black;
  margin-left: 10px
}

.score{
  color: #8c939d;
  margin-left: 10px;
}
</style>