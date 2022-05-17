<template>
  <div class="upcoming_card">
    <el-carousel :interval="4000" type="card" height="290px">
      <el-carousel-item v-if="competitionList.length===0" class="empty_card">
        <img src="../../../assets/picture/empty.png" alt="">
        <div class="empty_word">当前星球没有竞赛可以参加</div>
      </el-carousel-item>
      <el-carousel-item v-else v-for="item in competitionList" :key="item.id" class="item_card">
        <div>
          <div class="com_name">{{ item.title }}</div>
          <div class="com_time">时间：{{ item.startTime }} ~ {{item.endTime}}</div>
          <div class="com_des">{{ item.description }}</div>
          <div class="btn" @click="dialogVisible=true;chooseCom=item">参加</div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div>
      <el-dialog :visible.sync="dialogVisible" width="30%" center>
        <JoinCompetition :competition="chooseCom"></JoinCompetition>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getCompetitionNotStart} from "@/api/planet/competition";
import JoinCompetition from "@/components/planet/competition/JoinCompetition";

export default {
  name: "UpcomingCompetition",
  components: {JoinCompetition},
  data(){
    return{
      dialogVisible:false,
      competitionList:[],
      chooseCom:{
        competitionId:"",
        title:"",
        startTime:"",
        endTime:"",
        description:"",
      },
    }
  },
  methods:{
  },
  mounted() {
    getCompetitionNotStart("23").then((res)=>{
      let list = res.data.data.competitionList
      for (let i = 0; i < list.length; i++) {
        this.competitionList.push({
          planetCode:list[i].competition.planetCode,
          competitionId:list[i].competition.competitionId,
          title: list[i].competition.title,
          description: list[i].competition.description,
          picture:list[i].competition.picture,
          startTime: list[i].competition.startTime,
          endTime: list[i].competition.endTime,
          createTime:list[i].competition.createTime,
          status:list[i].competition.status,
          questionNumber:list[i].questionNumber,
          totalScore:list[i].totalScore,
          userScore: list[i].userScore,
        })
      }
    }).catch(()=>{
      this.$message.error("系统错误，请稍后重试！")
    })
  }
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
  margin-left: -40px;
  margin-top: 30px;
  color: white;
  font-weight: bold;
  text-align: center;
  width: 80px;
  height: 35px;
  line-height: 35px;
  background-color: #f7aa22;
  border-radius: 20px;
  cursor: pointer;
}
</style>