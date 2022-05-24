<template>
  <div id="personalInformation">
    <Header></Header>
    <div id="main">
      <Option class="left"></Option>
      <CollectResource class="right"></CollectResource>
    </div>
  </div>
</template>

<script>

import Header from "@/components/Header";
import Option from "@/components/personalInformation/collectPage/Option";
import CollectResource from "@/components/personalInformation/collectPage/CollectResource"
export default{
  name:"PersonalFavoriteView",
  components:{
    Header,
    Option,
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
.right{
  display: inline-block;
  float: left;
  margin-left:50px;
}
</style>