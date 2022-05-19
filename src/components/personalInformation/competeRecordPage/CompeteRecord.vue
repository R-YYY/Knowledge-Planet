<template>
  <div id="competerecord">
    <div class="record">
      <div class="header">
        <p class="record_text">我的竞赛记录</p>
      </div>
      <div class="record_list">
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
          <div v-for="item in recordList.slice((currentPage-1)*5,currentPage*5)">
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
  </div>
</template>

<script>

import {getRegisteredCompetition} from "@/api/planet/competition";

export default{
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
        if(new Date(list[i].competition.startTime) < new Date()) {
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
.record{
  position:relative;
  width:900px;
  height:590px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.header{
  position:absolute;
  margin-top: -15px;
  margin-left: 20px;
}
.record_text{
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 25px;
}
.record_content{
  position:absolute;
  width:880px;
  margin-top:50px;
  margin-left:20px;
}

.record_list{
  position: absolute;
  top: 60px;
  left: -50px;
}

.table{
  margin-left: 100px;
  min-height: 400px;
  margin-right: 100px;
}

.info_area{
  margin-left: 30px;
  width: 500px;
}

.score_area{
  width: 150px;
}

.opera_area{
  width: 100px;
}

.page{
  padding-top: 10px;
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
  width: 380px;
  font-weight: bold;
  padding-top: 10px;
}

.time{
  font-size: 14px;
  margin-top: 10px;
}

.score{
  width: 135px;
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