<template>
  <div id="competitionRecord">
    <Header></Header>
    <div class="back" @click="toCompetition">
      <i class="el-icon-arrow-left" style="font-weight: bold"></i>
      <span>返回竞赛主页</span>
    </div>
    <div class="record">
      <div class="header">参赛记录</div>
      <div class="table">
        <div style="display: flex">
          <div class="info_area">竞赛信息</div>
          <div class="score_area">成绩</div>
          <div class="opera_area">操作</div>
        </div>
        <hr>
        <div v-if="recordList.length===0">
          <el-empty description="没有参赛记录"></el-empty>
        </div>
        <div v-for="item in recordList.slice((currentPage-1)*10,currentPage*10)">
          <div class="com_record_item">
            <img class="picture" :src="item.picture" alt="">
            <div>
              <div class="title">{{item.title}}</div>
              <div class="time">{{item.startTime}} ~ {{item.endTime}}</div>
            </div>
            <div class="score">{{item.userScore}} / {{item.totalScore}}</div>
            <div class="btn" @click="seeDetail(item)">查看</div>
          </div>
          <hr class="line">
        </div>
      </div>
      <div class="page">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="recordList.length"
            :current-page="currentPage"
            @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getRegisteredCompetition} from "@/api/planet/competition";
export default {
  name: "ComRecordView",
  data(){
    return{
      recordList:[],
      currentPage:1,
    }
  },
  methods:{
    toCompetition(){
      this.$router.push("/planet/competition")
    },

    handleCurrentChange(val){
      this.currentPage = val
    },

    seeDetail(item){
      this.$router.push({
        name:"historyCompetition",
        params:{
          cid:item.competitionId,
          title:item.title,
        }
      })
    }
  },
  mounted() {
    getRegisteredCompetition().then((res)=>{
      let list = res.data.data.competitionList
      let planetCode = window.sessionStorage.getItem("planetCode")
      for (let i = 0; i < list.length; i++) {
        if(new Date(list[i].competition.startTime) < new Date()
            && list[i].competition.planetCode.toString()===planetCode) {
          this.recordList.push({
            competitionId:list[i].competition.competitionId,
            title: list[i].competition.title,
            picture: list[i].competition.picture,
            startTime: list[i].competition.startTime,
            endTime: list[i].competition.endTime,
            userScore: list[i].userScore,
            totalScore: list[i].totalScore,
            questionNumber: list[i].questionNumber
          })
        }
      }
    }).catch(()=>{
      this.$message.error("系统错误，请稍后重试")
    })
  }
}
</script>

<style scoped>
#competitionRecord{
  background-color: #F7F4F4;
}

.record{
  position: relative;
  width: 1000px;
  min-height: 600px;
  margin-top: 15px;
  left: 50%;
  margin-left: -500px;
  background-color: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 0 15px #cdcdcd;
}

.back{
  width: 112px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 40px;
  margin-left: 260px;
}

.table{
  margin-left: 100px;
  min-height: 400px;
  margin-right: 100px;
}

.info_area{
  margin-left: 30px;
  width: 600px;
}

.score_area{
  width: 200px;
}

.opera_area{
  width: 100px;
}

.header{
  line-height: 80px;
  margin-left: 45px;
  font-size: 30px;
  font-weight: bold;
}

.page{
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
}

.line{
  border-top:1px dotted #C1C0C0;
  border-bottom: 0;
}

.com_record_item{
  display: flex;
}

.picture{
  width: 100px;
  height: 60px;
  margin: 5px 25px;
}

.title{
  width: 390px;
  font-weight: bold;
  padding-top: 10px;
}

.time{
  font-size: 14px;
  margin-top: 10px;
}

.score{
  width: 160px;
  margin-top: 25px;
  height: 20px;
  font-size: 15px;
}

.btn{
  text-align: center;
  width: 60px;
  line-height: 70px;
  cursor: pointer;
  color: #00DED4;
}
</style>