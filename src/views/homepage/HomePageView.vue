<template>
  <div id="homepage">
    <Header></Header>
    <div id="main">
      <NavBar></NavBar>
      <RecommendPlanet></RecommendPlanet>
      <DateRank></DateRank>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import NavBar from "@/components/homepage/NavBar";
import RecommendPlanet from "@/components/homepage/RecommendPlanet";
import DateRank from "@/components/homepage/DateRank";

export default{
  name:"HomePageView",
  components:{
    RecommendPlanet,
    Header,
    NavBar,
    DateRank
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>

</style>