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
        <el-table :data="record.slice((currentPage-1)*10,currentPage*10)">
          <el-table-column prop="title" label="竞赛名称" width="200">
          </el-table-column>
          <el-table-column prop="time" label="时间" width="350">
          </el-table-column>
          <el-table-column prop="grade" label="成绩" width="100">
          </el-table-column>
          <el-table-column width="100">
            <el-button type="text">查看</el-button>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="record.length"
            :current-page="currentPage"
            @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComRecordView",
  data(){
    return{
      record:[],
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
      this.record.push({
        title:"第"+(i+1)+"周周赛",
        time:"2022-6-7 13:00 ~ 2022-6-7 15:00",
        grade:i*10
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
  margin-left: 120px;
  min-height: 400px;
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
</style>