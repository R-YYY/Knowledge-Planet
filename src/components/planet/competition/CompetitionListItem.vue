<template>
  <div class="card">
    <img class="picture" :src="competition.picture" alt="加载失败">
    <div>
      <div class="name">{{competition.title}}
        <el-tag v-if="timeStatus()===1" type="danger" size="mini">未开始</el-tag>
        <el-tag v-else-if="timeStatus()===0" type="success" size="mini">进行中</el-tag>
        <el-tag v-else type="info" size="mini">已结束</el-tag>
      </div>
      <div class="time">{{competition.startTime}} ~ {{competition.endTime}}</div>
    </div>
    <div v-if="competition.userScore===null && timeStatus() === 1" class="join_btn" @click="joinOrQuit(1)">报名</div>
    <div v-else-if="competition.userScore!==null && timeStatus() === 1" class="join_btn" @click="joinOrQuit(0)">取消报名</div>
    <div v-else-if="competition.userScore===null && timeStatus() === 0" class="add_btn" @click="dialogVisible = true">参加</div>
    <div v-else-if="competition.userScore!==null && timeStatus() === 0" class="add_btn">已作答</div>
    <div v-else-if="timeStatus() === -1" class="unable">已结束</div>
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <JoinCompetition :competition="competition"></JoinCompetition>
    </el-dialog>
  </div>
</template>

<script>
import JoinCompetition from "@/components/planet/competition/JoinCompetition";
import {joinOrQuitCompetition} from "@/api/planet/competition";
export default {
  name: "CompetitionListItem",
  components: {JoinCompetition},
  props:["competition"],
  data(){
    return{
      dialogVisible:false,
    }
  },
  methods:{
    timeStatus(){
      var start = new Date(this.competition.startTime)
      var end = new Date(this.competition.endTime)
      var now = new Date()
      if(now > end) return -1  //已结束
      if(now < start) return 1  //未开始
      return 0  //进行中
    },

    joinOrQuit(type){
      joinOrQuitCompetition(this.competition.competitionId,type).then((res)=>{
        console.log(res.data)
        if(res.data.success){
          this.competition.userScore = type===1?0:null
          this.$message.success(type===1?"报名成功":"已取消报名")
        }
      })
    }
  }
}
</script>

<style scoped>
.card{
  display: flex;
  height: 60px;
  margin-left: 50px;
}

.name,.time{
  width: 285px;
}

.name{
  font-weight: bold;
  height: 35px;
  line-height: 35px;
}

.time{
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  color: #6f6e6e;
}

.picture{
  width: 100px;
  height: 50px;
  margin-top: 5px;
  margin-right: 20px;
}

.join_btn,.add_btn,.unable{
  font-style: oblique;
  text-align: center;
  font-weight: bold;
  width: 90px;
  height: 30px;
  line-height: 30px;
  color: white;
  border-radius: 4px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.add_btn{
  background-color: #74D8BE;
  cursor: pointer;
}

.join_btn{
  background-color: #fcc278;
  cursor: pointer;
}

.unable{
  background-color: #8c939d;
  cursor: not-allowed;
}
</style>