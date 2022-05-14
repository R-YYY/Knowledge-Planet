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
          <div class="info">竞赛信息</div>
          <div class="score">成绩</div>
          <div class="opera">操作</div>
        </div>
        <hr>
        <div v-if="recordList.length===0">
          <el-empty description="没有参赛记录"></el-empty>
        </div>
        <div v-for="item in recordList.slice((currentPage-1)*10,currentPage*10)">
          <ComRecordItem :record="item"></ComRecordItem>
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
import ComRecordItem from "@/components/planet/competition/record/ComRecordItem";
import {getRegisteredCompetition} from "@/api/planet/competition";
export default {
  name: "ComRecordView",
  components: {ComRecordItem},
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
    }
  },
  mounted() {
    getRegisteredCompetition().then((res)=>{
      let list = res.data.data.competitionList
      for (let i = 0; i < list.length; i++) {
        this.recordList.push({
          title:list[i].competition.title,
          picture:list[i].competition.picture,
          startTime:list[i].competition.startTime,
          endTime:list[i].competition.endTime,
          userScore:list[i].userScore,
          totalScore:list[i].totalScore,
          questionNumber:list[i].questionNumber
        })
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

.info{
  margin-left: 30px;
  width: 600px;
}

.score{
  width: 200px;
}

.opera{
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
</style>