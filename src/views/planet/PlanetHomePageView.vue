<template>
  <div id="planetHomePage">
    <Header></Header>
    <div class="main">
      <div class="left">
        <PlanetChoice></PlanetChoice>
      </div>
      <div class="mid">
        <TopicArea></TopicArea>
      </div>
      <div class="right">
        <IntegralRank></IntegralRank>
      </div>
    </div>
  </div>
</template>

<script>
import IntegralRank from "@/components/planet/homepage/IntegralRank";
import TopicArea from "@/components/planet/homepage/TopicArea";
import PlanetChoice from "@/components/planet/homepage/PlanetChoice";
export default {
  name: "PlanetHomePageView",
  components: {PlanetChoice, TopicArea, IntegralRank}
}
</script>

<style scoped>
#planetHomePage{
  background-color: #F7F6F6;
}

.main{
  text-align: center;
  height: 2000px;
}

.left{
  display: inline-block;
  vertical-align: top;
  height: 100%;
  /*background-color: #ff0f05;*/
}

.mid{
  display: inline-block;
  vertical-align: top;
  height: 100%;
  /*background-color: #3aff52;*/
}

.right{
  display: inline-block;
  vertical-align: top;
  height: 100%;
  /*background-color: #80c4ff;*/
}
</style>