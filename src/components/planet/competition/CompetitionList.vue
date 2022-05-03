<template>
  <div class="competition_list">
    <div class="header">其他竞赛</div>
    <hr class="line">
    <div style="display: flex">
      <div class="name">竞赛</div>
      <div class="time">时长</div>
    </div>
    <hr class="line">
    <div v-if="competitionList.length===0" class="empty"></div>
    <div v-else style="height: 610px">
      <div v-for="item in competitionList.slice((currentPage-1)*10,currentPage*10)">
        <CompetitionCard :competition="item"></CompetitionCard>
        <hr class="line">
      </div>
    </div>
    <div class="page">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="competitionList.length"
          :current-page="currentPage"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CompetitionCard from "@/components/planet/competition/CompetitionCard";
export default {
  name: "CompetitionList",
  components: {CompetitionCard},
  data(){
    return{
      competitionList:[{
        name:"",
        time:"",
        duration:"",
      }],
      currentPage:1,
    }
  },
  methods:{
    handleCurrentChange(val){
      this.currentPage = val
    }
  },
  created() {
    this.competitionList=[]
    for (let i = 0; i < 77; i++) {
      this.competitionList.push({
        name:"竞赛"+(i+1)+"的名字",
        time:"2022-4-27 15:00",
        duration:"50分钟",
      })
    }
  }
}
</script>

<style scoped>
.competition_list{
  width: 580px;
  height: 790px;
  background: rgba(255,255,255,0.8);
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;
}

.header{
  font-weight: bold;
  font-size: 25px;
  color: #6f6e6e;
  margin-top: 30px;
  margin-left: 40px;
  margin-bottom: 20px;
}

.line{
  margin: 0 30px 0;
  border-top:1px solid #C1C0C0;
  border-bottom: 0;
}

.name{
  margin-left: 50px;
  width: 250px;
  line-height: 30px;
}

.time{
  line-height: 30px;
}

.page{
  text-align: center;
  padding-top: 15px;
}

.empty{
  position: relative;
  height: 610px;
  width: 100%;
  background-image: url("../../../assets/picture/empty.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}
</style>