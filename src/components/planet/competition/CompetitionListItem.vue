<template>
  <div class="card">
    <img class="picture" :src="competition.picture" alt="加载失败">
    <div>
      <div class="name">{{competition.title}}
        <el-tag v-if="status()===1" type="danger" size="mini">未开始</el-tag>
        <el-tag v-else-if="status()===0" type="success" size="mini">进行中</el-tag>
        <el-tag v-else type="info" size="mini">已结束</el-tag>
      </div>
      <div class="time">{{competition.startTime}} ~ {{competition.endTime}}</div>
    </div>
    <div v-if="status()===-1" class="unable">参加</div>
    <div v-else class="btn" @click="dialogVisible = true">参加</div>
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <JoinCompetition :competition="competition"></JoinCompetition>
    </el-dialog>
  </div>
</template>

<script>
import JoinCompetition from "@/components/planet/competition/JoinCompetition";
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
    status(){
      var start = new Date(this.competition.startTime)
      var end = new Date(this.competition.endTime)
      var now = new Date()
      if(now > end) return -1  //已结束
      if(now < start) return 1  //未开始
      return 0  //进行中
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
  width: 300px;
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

.btn,.unable{
  font-style: oblique;
  text-align: center;
  font-weight: bold;
  width: 60px;
  height: 30px;
  line-height: 30px;
  color: white;
  border-radius: 4px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.btn{
  background-color: #fcc278;
  cursor: pointer;
}

.unable{
  background-color: #8c939d;
  cursor: not-allowed;
}
</style>