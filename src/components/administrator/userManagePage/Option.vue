<template>
  <div id="option">
    <div class="leftbar">
      <img src="../../../assets/homepageimg/1.jpg" class="avatar">
      <el-divider></el-divider>
      <div class="personalpage" @click="goToPersonalPage">
        <img src="../../../assets/admin/admin.png" class="personalpage_png">
        <span class="personalpage_text">管理员主页</span>
      </div>
      <el-divider></el-divider>
      <div class="noticepage" @click="goToSystemNotice">
        <img src="../../../assets/admin/notice.png" class="notice_png">
        <span class="notice_text">公告管理</span>
      </div>
      <el-divider></el-divider>
      <div class="userpage" @click="goToUserManage">
        <img src="../../../assets/admin/user.png" class="user_png">
        <span class="user_text">用户管理</span>
      </div>
      <el-divider></el-divider>
      <div class="resourcecheck" @click="goToResourceCheck">
        <img src="../../../assets/admin/resource.png" class="resourcecheck_png">
        <span class="resourcecheck_text">资源管理</span>
      </div>
    </div>

  </div>
</template>

<script>

export default{
  data(){
    return{

    }
  },
  methods:{
    goToPersonalPage(){
      this.$router.push('/admin')
    },
    goToSystemNotice(){
      this.$router.push('/admin/systemnotice')
    },
    goToUserManage(){
      this.$router.push('/admin/usermanage')
    },
    goToResourceCheck(){
      this.$router.push('/admin/resourcecheck')
    }

  },
  mounted(){

  }

}
</script>

<style scoped>
.leftbar{
  width:250px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.avatar{
  border-radius: 50%;
  width:70px;
  height:70px;
  margin-left:90px;
  margin-top:20px;
}
.personalpage_png{
  margin-top: 24px;
  margin-bottom: 24px;
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left: 40px;
}
.personalpage_text{
  margin-top: 24px;
  margin-bottom: 24px;
  vertical-align: middle;
  margin-left: 35px;
  font-size:23px;
  font-family: "Microsoft YaHei";
}
.notice_png{
  margin-top: 24px;
  margin-bottom: 24px;
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left: 40px;
}
.notice_text{
  vertical-align: middle;
  margin-left: 35px;
  font-size:23px;
  font-family: "Microsoft YaHei";
}
.user_png{
  margin-top: 24px;
  margin-bottom: 24px;
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left: 40px;
}
.user_text{
  vertical-align: middle;
  margin-left:35px;
  font-size: 23px;
  font-family: "Microsoft YaHei";
}
.resourcecheck_png{
  margin-top: 24px;
  margin-bottom: 24px;
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left: 40px;
}
.resourcecheck_text{
  vertical-align: middle;
  margin-left:35px;
  font-size: 23px;
  font-family: "Microsoft YaHei";
}
.userpage{
  background-color: #e5ffff;
}
/deep/ .el-divider--horizontal{
  margin-top:0px;
  margin-bottom: 0px;
}
</style>