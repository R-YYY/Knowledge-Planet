<template>
  <div style="display: flex;">
    <div class="create_area">
      <div class="create_card">
        <div class="input_name">
          <el-input v-model="title" placeholder="请输入竞赛名称"></el-input>
        </div>
        <div class="input_des">
          <el-input v-model="description" placeholder="请输入竞赛描述"
                    size="small" type="textarea" :rows="1" autosize >
          </el-input>
        </div>
        <div class="table">
          <div class="header">
            <img v-if="!ifShowAll" class="down" src="../../../assets/competition/down.png" alt="" @click="showAll">
            <img v-if="ifShowAll" class="up" src="../../../assets/competition/up.png" alt="" @click="hideAll">
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
      <div style="display: flex">
        <div>
          <div class="top">题数</div>
          <div class="num">{{questionList.length}}</div>
        </div>
        <div>
          <div class="top">总分</div>
          <div class="num">{{totalScore()}}</div>
        </div>
      </div>
      <div class="add_question">
        添加题目
      </div>
      <div style="display: flex">
        <div class="create">发布</div>
        <div class="cancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from "@/components/planet/competition/QuestionCard";
export default {
  name: "CreateCompetition",
  components: {QuestionCard},
  data(){
    return{
      title:"",
      description:"",
      questionList:[],
      ifShowAll:false,
    }
  },
  methods:{
    showAll(){
      this.ifShowAll = true
    },

    hideAll(){
      this.ifShowAll = false
    },

    totalScore(){
      let result = 0
      for (let i = 0; i < this.questionList.length; i++) {
        result += this.questionList[i].score
      }
      return result
    }
  },
  mounted() {
    for (let i = 0; i < 15; i++) {
      this.questionList.push({
        id:i,
        description:"因为1+1=2，所以这道题应该选什么呢？",
        score:(i+1)*2,
      })
    }
  }
}
</script>

<style scoped>
.create_area{
  overflow-y: scroll;
  height: 620px
}

.create_card{
  width: 900px;
  height: auto;
  margin: 15px 15px 30px 150px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;
}

.input_name{
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 30px;
}

.input_des{
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 20px;
}

.total_info{
  width: 300px;
  height: 250px;
  margin-top: 15px;
  margin-left: 30px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;
}

.table{
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 50px;
  padding-bottom: 30px;
}

.header{
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}

.question_id{
  line-height: 20px;
  width: 100px;
}

.question_desc{
  line-height: 20px;
  width: 400px;
}

.question_score{
  line-height: 20px;
  width: 100px;
}

.question_opera{
  line-height: 20px;
}

.down,.up{
  height: 18px;
  width: 18px;
  cursor: pointer;
  margin-right: 40px;
}

.top{
  text-align: center;
  color: #858b92;
  width: 50px;
  line-height: 25px;
  margin-top: 15px;
  margin-left: 60px;
}

.num{
  text-align: center;
  color: black;
  width: 50px;
  line-height: 25px;
  margin-left: 60px;
}


.add_question{
  width: 260px;
  text-align: center;
  font-weight: bold;
  margin-left: 20px;
  line-height: 40px;
  background-color: #ddf8f0;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
}

.create{
  text-align: center;
  line-height: 30px;
  width: 60px;
  font-weight: bold;
  border-radius: 10px;
  color: white;
  background-color: #74D8BE;
  margin-left: 50px;
  margin-top: 50px;
  cursor: pointer;
}

.cancel{
  text-align: center;
  line-height: 30px;
  width: 60px;
  font-weight: bold;
  border-radius: 10px;
  background-color: #f1f3fa;
  margin-left: 80px;
  margin-top: 50px;
  cursor: pointer;
}

</style>