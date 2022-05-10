<template>
  <div id="personalCompeteRecord">
    <HomePageHeader></HomePageHeader>
    <div id="main">
      <Option class="left"></Option>
      <CompeteRecord class="right"></CompeteRecord>
    </div>
  </div>
</template>

<script>
import HomePageHeader from "@/components/HomePageHeader";
import Option from "@/components/personalInformation/competeRecordPage/Option";
import CompeteRecord from "@/components/personalInformation/competeRecordPage/CompeteRecord"
export default{
  name:"PersonalCompeteRecordView",
  components:{
    HomePageHeader,
    Option,
    CompeteRecord
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