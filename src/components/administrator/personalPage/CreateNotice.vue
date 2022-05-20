<template>
  <div id="createnotice">
    <div class="topbar">
      <div class="topheader">
        <div class="notice">
          <div class="notice_text">系统公告</div>
        </div>
        <div class="noticedivide">
          <el-divider></el-divider>
        </div>
      </div>
      <div class="create" @click="goToSystemNotice">
        <img src="../../../assets/admin/write.png" class="write_png">
        <span class="write_text">新增公告</span>
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
    goToSystemNotice(){
      this.$router.push('/admin/systemnotice')
    },


  },
  mounted(){

  }

}
</script>
<style scoped>
.topbar{
  width:320px;
  height:165px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.topheader{
  position: absolute;
  margin-top: 10px;
}
.notice_text{
  text-align: center;
  font-size:23px;
  font-family: "Microsoft YaHei";
}
.noticedivide{
  width:320px;
}
.el-divider--horizontal{
  margin-bottom: 10px;
}
.write_png {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.write_text {
  vertical-align: middle;
  line-height: 30px;
  margin-left: 5px;
  font-size: 30px;
  font-weight: bold;
  color:#707070;
  font-family: "Microsoft YaHei";
}
.create{
  position: absolute;
  display: inline-block;
  margin-top: 90px;
  margin-left: 80px;
}
</style>