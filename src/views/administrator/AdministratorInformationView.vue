<template>
  <div id="administratorInformation">
    <HomePageHeader></HomePageHeader>
    <div id="main">
      <Option class="left"></Option>
      <Information class="center"></Information>
      <CreateNotice class="right_top"></CreateNotice>
      <NoticeHistory class="right_bottom"></NoticeHistory>
    </div>
  </div>
</template>

<script>
import HomePageHeader from "@/components/HomePageHeader";
import Option from "@/components/administrator/personalPage/Option";
import Information from "@/components/administrator/personalPage/Information"
import CreateNotice from "@/components/administrator/personalPage/CreateNotice"
import NoticeHistory from "@/components/administrator/personalPage/NoticeHistory"

export default{
  name:"PersonalInformationView",
  components:{
    NoticeHistory,
    CreateNotice,
    HomePageHeader,
    Option,
    Information,
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
  margin-top:180px;
  margin-right:-320px;
}
</style>