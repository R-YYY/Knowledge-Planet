<template>
  <div id="resourceCheck">
    <Header></Header>
    <div id="main">
      <Option class="left"></Option>
      <CheckResource class="center"></CheckResource>
      <AllPlanet class="right"></AllPlanet>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Option from "@/components/administrator/resourceCheckPage/Option";
import CheckResource from "@/components/administrator/resourceCheckPage/CheckResource";
import AllPlanet from "@/components/administrator/resourceCheckPage/AllPlanet";

export default{
  name:"ResourceCheckView",
  components:{
    Header,
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