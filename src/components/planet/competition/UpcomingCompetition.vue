<template>
  <div class="upcoming_card">
    <el-carousel :interval="4000" type="card" height="290px">
      <el-carousel-item v-if="competitionList.length===0" class="empty_card">
        <img src="../../../assets/picture/empty.png" alt="">
        <div class="empty_word">当前星球没有正在进行的竞赛</div>
      </el-carousel-item>
      <div v-else v-for="item in competitionList" :key="item.competitionId">
        <el-carousel-item class="item_card">
          <div>
            <div class="com_name">{{ item.title }}</div>
            <div class="com_time">时间：{{ item.startTime }} ~ {{item.endTime}}</div>
            <div class="com_des">{{ item.description }}</div>
            <div v-if="item.userScore===null" class="btn" @click="chooseCom=item;dialogVisible = true">参加</div>
            <div v-else class="btn">已作答</div>
          </div>
        </el-carousel-item>
      </div>
    </el-carousel>
    <div>
      <el-dialog :visible.sync="dialogVisible" width="30%" center>
        <JoinCompetition :competition="chooseCom"></JoinCompetition>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {joinOrQuitCompetition} from "@/api/planet/competition";
import JoinCompetition from "@/components/planet/competition/JoinCompetition";

export default {
  name: "UpcomingCompetition",
  components: {JoinCompetition},
  props:["competitionList"],
  data(){
    return{
      dialogVisible:false,
      // competitionList:[],
      chooseCom:{
        competitionId:"",
        title:"",
        startTime:"",
        endTime:"",
        description:"",
        userScore:"",
      },
    }
  },
  methods:{
    joinOrQuit(competition,type){
      joinOrQuitCompetition(competition.competitionId,type).then((res)=>{
        console.log(res.data)
        if(res.data.success){
          competition.userScore = type===1?0:null
          this.$message.success(type===1?"已取消报名":"报名成功")
        }
      })
    }
  },
  // mounted() {
  //   let planetCode = window.sessionStorage.getItem("planetCode")
  //   getCompetitionNotStart(planetCode).then((res)=>{
  //     let list = res.data.data.competitionList
  //     for (let i = 0; i < list.length; i++) {
  //       this.competitionList.push({
  //         planetCode:list[i].competition.planetCode,
  //         competitionId:list[i].competition.competitionId,
  //         title: list[i].competition.title,
  //         description: list[i].competition.description,
  //         picture:list[i].competition.picture,
  //         startTime: list[i].competition.startTime,
  //         endTime: list[i].competition.endTime,
  //         createTime:list[i].competition.createTime,
  //         status:list[i].competition.status,
  //         questionNumber:list[i].questionNumber,
  //         totalScore:list[i].totalScore,
  //         userScore: list[i].userScore,
  //       })
  //     }
  //   }).catch(()=>{
  //     this.$message.error("系统错误，请稍后重试！")
  //   })
  // }
}
</script>

<style scoped>
.upcoming_card{
  width: 1020px;
  margin-left: 250px;
}

.item_card{
  height: 270px;
  background: url("../../../assets/competition/shan.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 20px;
}

.empty_card{
  text-align: center;
  height: 270px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;
}

.empty_word{
  margin-top: -15px;
  font-weight: bold;
  color: #909399;
}

.com_name{
  margin-top: 30px;
  margin-left: 40px;
  font-size: 27px;
  font-weight: bolder;
  color: #6a6868;
}

.com_time{
  margin-top: 20px;
  margin-left: 40px;
  font-size: 17px;
  font-weight: bolder;
  color: #6a6868;
}

.com_des{
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 30px;
  font-size: 17px;
  font-style: oblique;
  color: #6a6868;
}

.btn{
  position: relative;
  left: 50%;
  margin-left: -60px;
  margin-top: 30px;
  color: white;
  font-weight: bold;
  text-align: center;
  width: 120px;
  height: 35px;
  line-height: 35px;
  background-color: #74D8BE;
  border-radius: 20px;
  cursor: pointer;
}
</style>