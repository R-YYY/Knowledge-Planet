<template>
  <div id="personalInformation">
    <HomePageHeader></HomePageHeader>
    <div id="main">
      <Option class="left"></Option>
      <JoinPlanet class="right_top"></JoinPlanet>
      <CollectResource class="right_bottom"></CollectResource>
    </div>
  </div>
</template>

<script>
import HomePageHeader from "@/components/HomePageHeader";
import Option from "@/components/personalInformation/collectPage/Option";
import JoinPlanet from "@/components/personalInformation/collectPage/JoinPlanet";
import CollectResource from "@/components/personalInformation/collectPage/CollectResource"
export default{
  name:"PersonalFavoriteView",
  components:{
    HomePageHeader,
    Option,
    JoinPlanet,
    CollectResource
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
  margin-left: 60px;
  float: left;
}
.right_top{
  display: inline-block;
  float: right;
  margin-right:15px;
}
.right_bottom{
  display: inline-block;
  float: right;
  margin-top:300px;
  margin-right:-320px;
}
</style>