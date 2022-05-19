<template>
  <div class="competition_list">
    <div class="header">全部竞赛</div>
    <hr class="line">
    <div style="display: flex">
      <div class="name">竞赛信息</div>
      <div class="opera">操作</div>
    </div>
    <hr class="line">
    <div v-if="competitionList.length===0" class="empty"></div>
    <div v-else style="height: 610px">
      <div v-for="item in competitionList.slice((currentPage-1)*10,currentPage*10)">
        <div>
          <CompetitionListItem :competition="item"></CompetitionListItem>
          <hr class="line">
        </div>
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
import CompetitionListItem from "@/components/planet/competition/CompetitionListItem";
import {getCompetitionByPlanet} from "@/api/planet/competition";
import {compareCompetition} from "@/utils/compare";
export default {
  name: "CompetitionList",
  props:["competitionList"],
  components: {CompetitionListItem},
  data(){
    return{
      // competitionList:[],
      currentPage:1,
    }
  },
  methods:{
    handleCurrentChange(val){
      this.currentPage = val
    }
  },
  // created() {
  //   this.competitionList=[]
  //   let planetCode = window.sessionStorage.getItem("planetCode")
  //   getCompetitionByPlanet(planetCode).then((res)=>{
  //     let list = res.data.data.competitionList
  //     for (let i = 0; i < list.length; i++) {
  //       if(list[i].competition.status === 1){
  //         this.competitionList.push({
  //           planetCode:list[i].competition.planetCode,
  //           competitionId:list[i].competition.competitionId,
  //           title: list[i].competition.title,
  //           description: list[i].competition.description,
  //           picture:list[i].competition.picture,
  //           startTime: list[i].competition.startTime,
  //           endTime: list[i].competition.endTime,
  //           createTime:list[i].competition.createTime,
  //           status:list[i].competition.status,
  //           questionNumber:list[i].questionNumber,
  //           totalScore:list[i].totalScore,
  //           userScore: list[i].userScore,
  //         })
  //       }
  //     }
  //     this.competitionList.sort(compareCompetition())
  //   })
  // }
}
</script>

<style scoped>
.competition_list{
  width: 580px;
  height: 790px;
  background: white;
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
  margin-left: 55px;
  width: 425px;
  line-height: 30px;
}

.opera{
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