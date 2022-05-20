<template>
  <div>
    <div class="card">
      <div style="display: flex">
        <div>
          <div class="top">题数</div>
          <div class="num">{{questionList.length}}</div>
        </div>
        <div>
          <div class="top">总分</div>
          <div class="num">{{getTotalScore()}}</div>
        </div>
      </div>
      <div v-if="canEdit" class="add_question" @click="$refs.child.show()">添加题目</div>
      <div v-else class="add_question unable">添加题目</div>
      <div class="form">
        <el-form label-position="left" label-width="70px">
          <el-form-item label="竞赛名称">
            {{competition.title}}
          </el-form-item>
          <el-form-item label="竞赛描述">
            {{competition.description}}
          </el-form-item>
          <el-form-item label="开始时间">
            {{competition.startTime}}
          </el-form-item>
          <el-form-item label="结束时间">
            {{competition.endTime}}
          </el-form-item>
          <el-form-item label="状态">
            <el-tag v-if="competition.status===0" type="danger" size="mini">未发布</el-tag>
            <el-tag v-else-if="competition.status===1" type="success" size="mini">已发布</el-tag>
            <el-tag v-else type="info" size="mini">已取消</el-tag>
          </el-form-item>
          <el-form-item label="备注">
            <span v-if="competition.status===0" style="font-size: 13px">无</span>
            <span v-if="competition.status===1" class="tip">当前竞赛已发布，不可编辑</span>
            <span v-else-if="competition.status===2" class="tip">当前竞赛已取消，不可编辑</span>
          </el-form-item>
        </el-form>
      </div>
      <EditQuestion ref="child" :item="newQuestion"></EditQuestion>
    </div>
  </div>
</template>

<script>
import EditQuestion from "@/components/planet/competition/create/EditQuestion";
export default {
  name: "TotalQuestion",
  components: {EditQuestion},
  props:["questionList","competition","canEdit"],
  data(){
    return{
      newQuestion:{
        competitionId:this.$route.params.cid,
        questionId:"",
        content:"",
        choices:["","",""],
        answer:null,
        score:1,
      }
    }
  },
  methods:{
    getTotalScore(){
      let result = 0
      for (let i = 0; i < this.questionList.length; i++) {
        result += this.questionList[i].score
      }
      return result
    },
  },
}
</script>

<style scoped>
.card{
  width: 300px;
  height: auto;
  margin-top: 15px;
  margin-left: 30px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;
}

.form{
  margin-left: 30px;
  margin-right: 20px;
  margin-top: 30px;
  padding-bottom: 20px;
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

.unable{
  cursor: not-allowed;
  background-color: gainsboro;
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

.el-form-item{
  margin-bottom: 0px;
}

.tip{
  color: red;
  font-size: 13px;
}
</style>