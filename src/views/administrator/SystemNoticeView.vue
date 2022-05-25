<template>
  <div id="systemNotice">
    <AdminHeader></AdminHeader>
    <div id="main">
      <Option class="left"></Option>
      <CreateNotice class="center"></CreateNotice>
      <NoticeHistory class="right"></NoticeHistory>
    </div>
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
import Option from "@/components/administrator/systemNoticePage/Option";
import CreateNotice from "@/components/administrator/systemNoticePage/CreateNotice";
import NoticeHistory from "@/components/administrator/systemNoticePage/NoticeHistory";

export default{
  name:"PersonalInformationView",
  components:{
    NoticeHistory,
    CreateNotice,
    AdminHeader,
    Option,
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