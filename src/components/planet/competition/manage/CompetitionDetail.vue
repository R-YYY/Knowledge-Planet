<template>
  <div>
    <el-drawer :visible.sync="visible"
               direction="rtl"
               size="40%"
               title="竞赛信息"
               :append-to-body="true"
               :modal-append-to-body="false">
      <div class="detail_area">
        <div class="detail">
          <div class="info">
            <el-form label-position="left" label-width="100px">
              <el-form-item label="竞赛名称">
                {{competition.title}}
              </el-form-item>
              <el-form-item label="竞赛描述">
                {{competition.description}}
              </el-form-item>
              <el-form-item label="竞赛时间">
                {{competition.startTime}} ~ {{competition.endTime}}
              </el-form-item>
              <el-form-item label="总题数">
                {{competition.questionNumber}}
              </el-form-item>
              <el-form-item label="总分">
                {{competition.totalScore}}
              </el-form-item>
              <el-form-item label="状态">
                <el-tag v-if="competition.status===0" type="danger" size="mini">未发布</el-tag>
                <el-tag v-else-if="competition.status===1" type="success" size="mini">已发布</el-tag>
                <el-tag v-else type="info" size="mini">已取消</el-tag>
              </el-form-item>
            </el-form>
          </div>
          <div class="table">
            <div class="header">
              <img v-if="!ifShowAll" class="down" src="../../../../assets/competition/down.png" alt="" @click="showAll">
              <img v-if="ifShowAll" class="up" src="../../../../assets/competition/up.png" alt="" @click="hideAll">
              <div class="question_id">题号</div>
              <div class="question_desc">题目</div>
              <div class="question_score">分数</div>
            </div>
            <el-empty v-if="questionList.length===0" description="当前竞赛没有题目"></el-empty>
            <div v-for="(item,index) in questionList">
              <QuestionCard ref="child" :question="item" :index="index" :edit="false"></QuestionCard>
            </div>
          </div>
        </div>
        <div class="opera_area">
          <el-button v-if="competition.status===0" @click="release">发布竞赛</el-button>
          <el-button v-else-if="competition.status===1" @click="abolish">取消竞赛</el-button>
          <el-button type="primary" @click="toEdit">编辑</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import QuestionCard from "@/components/planet/competition/create/QuestionCard";
import {getQuestion, getQuestionListWithAnswer, separator} from "@/api/planet/question";
import {releaseOrAbolish} from "@/api/planet/competition";
export default {
  name: "CompetitionDetail",
  components: {QuestionCard},
  props:["competition"],
  data(){
    return{
      visible:false,
      questionList: [],
      ifShowAll: false,
    }
  },
  methods:{
    show(){
      this.visible = true
    },

    hide(){
      this.visible = false
    },

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

    toEdit(){
      console.log(this.competition)
      this.$router.push({
        name: 'editCompetition',
        params: {
          cid: this.competition.competitionId,
        },
        query:{
          competition:JSON.stringify(this.competition)
        }
      })
    },

    release(){
      if(this.questionList.length === 0){
        this.$message.error("当前竞赛没有题目，请添加题目后再发布！")
        return
      }
      releaseOrAbolish(this.competition.competitionId,1).then((res)=>{
        if(res.data.success){
          this.competition.status = 1
        }
      }).catch(()=>{
        this.$message({type:"error",message:"系统错误，请稍后重试"})
      })
    },

    abolish(){
      this.$confirm('竞赛取消后将无法重新发布，请确认是否取消竞赛?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        releaseOrAbolish(this.competition.competitionId,2).then((res)=>{
          if(res.data.success){
            this.competition.status = 2
            this.$message.success("竞赛已取消")
          }
        }).catch(()=>{
          this.$message({type:"error",message:"系统错误，请稍后重试"})
        })
      });
    },

    loadQuestion(){
      this.questionList=[]
      let competitionId = this.competition.competitionId
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
    }
  },
  watch:{
    competition:{
      handler(newValue,oldValue){
        this.loadQuestion()
      },
      deep:true
    }
  }
}
</script>

<style scoped>
.detail_area{

}

.info{
  margin-left: 20px;
  margin-right: 50px;
}

.detail{

}

.table{
  min-height: 403px;
  margin-top: 20px;
  padding-bottom: 30px;
}

.header{
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}

.down, .up {
  height: 18px;
  width: 18px;
  cursor: pointer;
  margin-right: 40px;
  margin-left: 20px;
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

.el-form-item{
  margin-bottom: 0px;
}

.opera_area{
  position: fixed;
  bottom: 20px;
  right: 50px;
}
</style>