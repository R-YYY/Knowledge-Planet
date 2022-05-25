<template>
  <div id="option">
    <div class="leftbar">
      <img src="../../../assets/admin/status.png" class="avatar">
      <el-divider></el-divider>
      <div class="collect" @click="goToSystemNotice">
        <img src="../../../assets/admin/notice.png" class="collect_png">
        <span class="collect_text">公告管理</span>
      </div>
      <el-divider></el-divider>
      <div class="competerecord" @click="goToUserManage">
        <img src="../../../assets/admin/user.png" class="competerecord_png">
        <span class="competerecord_text">用户管理</span>
      </div>
      <el-divider></el-divider>
      <div class="resourcepage" @click="goToResourceCheck">
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
      this.$router.push('/admin/systemNotice')
    },
    goToUserManage(){
      this.$router.push('/admin/userManage')
    },
    goToResourceCheck(){
      this.$router.push('/admin/resourceCheck')
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
  width:70px;
  height:70px;
  margin-left:90px;
  margin-top:20px;
}
.collect_png{
  margin-top: 24px;
  margin-bottom: 24px;
  display: inline-block;
  width:28px;
  height:28px;
  vertical-align: middle;
  margin-left: 40px;
}
.collect_text{
  vertical-align: middle;
  margin-left: 35px;
  font-size:21px;
  font-family: "Microsoft YaHei";
}
.competerecord_png{
  margin-top: 24px;
  margin-bottom: 24px;
  display: inline-block;
  width:28px;
  height:28px;
  vertical-align: middle;
  margin-left: 40px;
}
.competerecord_text{
  vertical-align: middle;
  margin-left:35px;
  font-size: 21px;
  font-family: "Microsoft YaHei";
}
.resourcecheck_png{
  margin-top: 24px;
  margin-bottom: 24px;
  display: inline-block;
  width:28px;
  height:28px;
  vertical-align: middle;
  margin-left: 40px;
}
.resourcecheck_text{
  vertical-align: middle;
  margin-left:35px;
  font-size: 21px;
  font-family: "Microsoft YaHei";
}

.resourcepage{
  background-color: #e5ffff;
}
/deep/ .el-divider--horizontal{
  margin-top:0px;
  margin-bottom: 0px;
}
</style>