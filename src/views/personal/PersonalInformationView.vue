<template>
  <div id="personalInformation">
    <Header></Header>
    <div id="main">
      <Option class="left"></Option>
      <Information class="center"></Information>
      <JoinPlanet class="right_top"></JoinPlanet>
      <CreatePlanet class="right_bottom"></CreatePlanet>
    </div>
  </div>
</template>

<script>

import Header from "@/components/Header";
import Option from "@/components/personalInformation/personalPage/Option";
import Information from "@/components/personalInformation/personalPage/Information";
import JoinPlanet from "@/components/personalInformation/personalPage/JoinPlanet";
import CreatePlanet from "@/components/personalInformation/personalPage/CreatePlanet";

export default{
  name:"PersonalInformationView",
  components:{
    Header,
    Option,
    Information,
    JoinPlanet,
    CreatePlanet
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