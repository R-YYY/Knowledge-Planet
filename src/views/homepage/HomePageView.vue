<template>
  <div id="homepage">
    <Header></Header>
    <div id="main">
      <NavBar class="left"></NavBar>
      <RecommendPlanet class="center"></RecommendPlanet>
      <DateRank class="right"></DateRank>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/homepage/NavBar";
import RecommendPlanet from "@/components/homepage/RecommendPlanet";
import DateRank from "@/components/homepage/DateRank";
import Header from "@/components/Header";

export default{
  name:"HomePageView",
  components:{
    Header,
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
#main{
  background-color: #cdcdcd;
  position:relative;
  min-width: 1400px;
  width: 90%;
  margin: 50px 5%;
}
.left{
  display: inline-block;
  float: left;

}
.center{
  display: inline-block;
  margin-left: 40px;
  float: left;

}
.right{
  display: inline-block;
  float: right;

}
</style>
