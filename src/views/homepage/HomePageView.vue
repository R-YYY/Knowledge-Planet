<template>
  <div id="homepage">
    <HomePageHeader></HomePageHeader>
    <div id="main">
      <NavBar></NavBar>
      <RecommendPlanet></RecommendPlanet>
      <DateRank></DateRank>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/homepage/NavBar";
import RecommendPlanet from "@/components/homepage/RecommendPlanet";
import DateRank from "@/components/homepage/DateRank";
import HomePageHeader from "@/components/HomePageHeader";

export default{
  name:"HomePageView",
  components:{
    HomePageHeader,
    RecommendPlanet,
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
