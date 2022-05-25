<template>
  <div id="userManagement">
    <AdminHeader></AdminHeader>
    <div id="main">
      <Option class="left"></Option>
      <Management class="center"></Management>

    </div>
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
import Option from "@/components/administrator/userManagePage/Option";
import Management from "@/components/administrator/userManagePage/Management";


export default{
  name:"PersonalInformationView",
  components:{
    AdminHeader,
    Option,
    Management,
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