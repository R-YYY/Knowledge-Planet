<template>
  <div id="com_main">
    <div class="com_header">
      {{ competition.title }}
      <span class="time">{{ time }}</span>
    </div>
    <div class="com_content" v-show="index+1===currentIndex" v-for="(question,index) in questions"
         :key="question.questionId">
      <span class="tag">{{ index + 1 }}/{{ questions.length }}</span>
      <p class="question_title">{{ question.content }}</p>
      <el-radio-group class="question_options" v-model="question.answer">
        <el-radio class="question_option" v-for="(option,index) in question.options" :key="option" :label="index">
          {{ option }}
        </el-radio>
      </el-radio-group>
    </div>
    <div class="button_group">
      <button class="move_button" v-if="this.currentIndex<this.questions.length"
              @click="moveToQuestion(currentIndex+1)">下一题
      </button>
      <button class="move_button" v-if="this.currentIndex===this.questions.length" @click="submitAnswer">提交</button>
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
</template>

<script>
import {getQuestion, submitAnswers} from "@/api/planet/question";
import {getCompetitionScore} from "@/api/planet/competition";

export default {
  name: "QuestionArea",
  props: ["competition"],
  data() {
    return {
      questions: [],
      currentIndex: 1,
      timeBySeconds: 1,
      timer:null,
    }
  },
  created() {
    let nowTime = new Date()
    let endTime = new Date(window.sessionStorage.getItem('endTime'))
    this.timeBySeconds = parseInt((endTime - nowTime) / 1000)
    let that = this
    this.timer = setInterval(function () {
      that.timeBySeconds--;
    }, 1000)
  },
  computed: {
    time() {
      let hour = parseInt((this.timeBySeconds / 3600).toString())
      hour = hour.toString().length === 1 ? ('0' + hour) : hour
      let minutes = parseInt(((this.timeBySeconds / 60) % 60).toString())
      minutes = minutes.toString().length === 1 ? ('0' + minutes) : minutes
      let seconds = this.timeBySeconds % 60
      seconds = seconds.toString().length === 1 ? ('0' + seconds) : seconds
      return hour + '小时' + minutes + '分' + seconds + '秒'
    }
  },
  mounted() {
    getQuestion(this.competition.id).then((res) => {
      if (res.data.success) {
        console.log(res)
        let questions = res.data.data.question
        for (let item of questions) {
          let options = item.items.split("/**###")
          this.questions.push({
            questionId: item.questionId,
            competitionId: item.competitionId,
            content: item.content,
            answer: null,
            score: item.score,
            options: options
          })
        }
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
      console.log(index)
      let cards = document.getElementsByClassName("index_card")
      for (let i = 0; i < cards.length; i++) {
        cards[i].className = "index_card"
        if (this.questions[i].answer !== null) {
          cards[i].className = "index_card index_card_finish"
        }
      }
      cards[index - 1].className = "index_card index_card_current"
    },
    submitAnswer() {
      let planetCode = window.sessionStorage.getItem("planetCode")
      let answers = {}
      for (let question of this.questions) {
        if (question.answer === null) {
          this.$message.error("请全部做完后再提交哦！")
          return
        } else {
          answers[question.questionId] = question.answer
        }
      }
      let data = JSON.stringify(answers)
      submitAnswers(planetCode, data).then((res) => {
        if (res.data.success) {
          this.$emit("getScore")
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
#com_main {
  position: relative;
  top: 50px;
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

.time {
  float: right;
  padding-right: 40px;
  color: #919191;
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

.question_option {
  display: block;
  height: 50px;
  line-height: 50px;
  margin-bottom: 10px;
  margin-right: 0;
  padding-left: 10px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
}

.question_option:hover {
  background-color: #E2F5F0;
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

.move_button:hover {
  color: #fff;
  background-color: #74D8BE;
}

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
  /*border:1px solid #919191;*/
  cursor: pointer;
  color: #919191;
  background-color: #fff;
}

.index_card:hover,
.index_card_current {
  color: #fff;
  background-color: #74D8BE;
}

.index_card_finish {
  color: #74D8BE;
}
</style>
