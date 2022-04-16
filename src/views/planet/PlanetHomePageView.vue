<template>
  <div id="planetHomePage">
    <Header></Header>
    <div class="main">
      <div>
        <PlanetChoice></PlanetChoice>
      </div>
      <div>
        <TopicArea></TopicArea>
      </div>
      <div>
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
  display: flex;
  text-align: center;
  height: 100%;
}
</style>