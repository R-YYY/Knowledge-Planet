<template>
  <div id="planetHomePage">
    <Header>
      <template v-slot:default>
        <div class="planetInfo">
          <span class="span">已进入&nbsp<span class="green">{{name}}</span></span>
          <span class="span">已有<span class="green">{{personNum}}</span>位小伙伴加入该星球</span>
        </div>
      </template>
    </Header>
    <div class="main">
      <div>
        <PlanetChoice></PlanetChoice>
      </div>
      <div>
        <TopicArea></TopicArea>
      </div>
      <div>
        <IntegralRank rank-name="积分活跃排行榜"></IntegralRank>
      </div>
    </div>
  </div>
</template>

<script>
import IntegralRank from "@/components/planet/homepage/integral/IntegralRank";
import TopicArea from "@/components/planet/homepage/TopicArea";
import PlanetChoice from "@/components/planet/homepage/PlanetChoice";
export default {
  name: "PlanetHomePageView",
  components: {PlanetChoice, TopicArea, IntegralRank},
  data(){
    return{
      name:"前端星",
      personNum:123,
    }
  }
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
.planetInfo{
  float: left;
  line-height: 50px;
  height: 50px;
  display: flex;
}
.span{
  margin-left: 20px;
  text-align: left;
  font-size: 12px;
  color: #919191;
}
.green{
  font-weight: bold;
  color: #00c8bf;
}
.green{
  font-weight: bold;
  color: #00c8bf;
}
</style>
