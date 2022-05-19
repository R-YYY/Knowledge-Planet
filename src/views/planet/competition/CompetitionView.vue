<template>
  <div id="competition">
    <Header></Header>
    <div class="top"></div>
    <div class="bottom">
      <UpcomingCompetition :competition-list="ongoingCompetitionList"></UpcomingCompetition>
      <div style="display: flex">
        <div class="left">
          <CompetitionHeader></CompetitionHeader>
          <IntegralRank style="margin-left: 40px;margin-top: 50px" rank-name="竞赛排行榜"></IntegralRank>
        </div>
        <div class="right">
          <CompetitionList :competition-list="competitionList"></CompetitionList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpcomingCompetition from "@/components/planet/competition/UpcomingCompetition";
import IntegralRank from "@/components/planet/homepage/integral/IntegralRank";
import CompetitionList from "@/components/planet/competition/CompetitionList";
import CompetitionHeader from "@/components/planet/competition/CompetitionHeader";
import {getCompetitionByPlanet} from "@/api/planet/competition";
import {compareCompetition} from "@/utils/compare";
export default {
  name: "CompetitionView",
  components: {CompetitionHeader, CompetitionList, IntegralRank, UpcomingCompetition},
  data(){
    return{
      competitionList:[],
      ongoingCompetitionList:[],
    }
  },
  methods:{
    timeStatus(item){
        var start = new Date(item.startTime)
        var end = new Date(item.endTime)
        var now = new Date()
        if(now > end) return -1  //已结束
        if(now < start) return 1  //未开始
        return 0  //进行中
    }
  },
  mounted() {
    this.competitionList=[]
    let planetCode = window.sessionStorage.getItem("planetCode")
    getCompetitionByPlanet(planetCode).then((res)=>{
      let list = res.data.data.competitionList
      for (let i = 0; i < list.length; i++) {
        let item = {
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
        }
        if(item.status === 1){
          this.competitionList.push(item)
          if(this.timeStatus(item) === 0){
            this.ongoingCompetitionList.push(item)
          }
        }
      }
      this.competitionList.sort(compareCompetition())
    })
  }
}
</script>

<style scoped>
#competition{
  background-color: #F7F4F4;
}

.top{
  height: 430px;
  width: 100%;
  background: url("../../../assets/competition/image.png") no-repeat;
  background-size: 100% 100%;
}

.bottom{
  position: relative;
  min-height: 800px;
  width: 100%;
  margin-top: -100px;
}

.left{
  margin-left: 250px;
  margin-top: 30px;
  padding-bottom: 100px;
}

.right{
  margin-left: 50px;
  margin-top: 30px;
  padding-bottom: 100px;
}
</style>