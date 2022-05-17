<template>
  <div id="resourceCheck">
    <HomePageHeader></HomePageHeader>
    <div id="main">
      <Option class="left"></Option>
      <CheckResource class="center"></CheckResource>
      <AllPlanet class="right"></AllPlanet>
    </div>
  </div>
</template>

<script>
import HomePageHeader from "@/components/HomePageHeader";
import Option from "@/components/administrator/resourceCheckPage/Option";
import CheckResource from "@/components/administrator/resourceCheckPage/CheckResource";
import AllPlanet from "@/components/administrator/resourceCheckPage/AllPlanet";

export default{
  name:"ResourceCheckView",
  components:{
    HomePageHeader,
    Option,
    CheckResource,
    AllPlanet
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
.right{
  display: inline-block;
  float: right;
}
</style>