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
    for (let i = 0; i < 11; i++) {
      this.recordList.push({
        title:"第"+(i+1)+"周周赛",
        picture:"https://img1.baidu.com/it/u=1269253414,843691233&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=311",
        startTime:"2022-4-27 15:00",
        endTime:"2022-5-1 17:00",
        score:i*10
      })
    }
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