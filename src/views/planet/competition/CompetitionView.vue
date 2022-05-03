<template>
  <div id="competition">
    <Header></Header>
    <div class="top"></div>
    <div class="bottom">
      <UpcomingCard></UpcomingCard>
      <div style="display: flex">
        <div class="left">
          <CompetitionHeader></CompetitionHeader>
          <IntegralRank style="margin-left: 60px;margin-top: 50px" rank-name="竞赛排行榜"></IntegralRank>
        </div>
        <div class="right">
          <CompetitionList></CompetitionList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpcomingCard from "@/components/planet/competition/UpcomingCard";
import IntegralRank from "@/components/planet/homepage/integral/IntegralRank";
import CompetitionList from "@/components/planet/competition/CompetitionList";
import CompetitionHeader from "@/components/planet/competition/CompetitionHeader";
export default {
  name: "CompetitionView",
  components: {CompetitionHeader, CompetitionList, IntegralRank, UpcomingCard},
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
  margin-top: 50px;
  padding-bottom: 100px;
}

.right{
  margin-left: 50px;
  margin-top: 50px;
  padding-bottom: 100px;
}
</style>