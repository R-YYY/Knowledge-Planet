<template>
  <div id="option">
    <div class="leftbar">
      <img src="../../../assets/homepageimg/1.jpg" class="avatar">
      <el-divider></el-divider>
      <div class="personalpage">
        <img src="../../../assets/homepageimg/personalpage.png" class="personalpage_png">
        <span class="personalpage_text">个人主页</span>
      </div>
      <el-divider></el-divider>
      <div class="collect">
        <img src="../../../assets/homepageimg/collect.png" class="collect_png">
        <span class="collect_text">收藏夹</span>
      </div>
      <el-divider></el-divider>
      <div class="competerecord">
        <img src="../../../assets/homepageimg/competerecord.png" class="competerecord_png">
        <span class="competerecord_text">竞赛记录</span>
      </div>
      <el-divider></el-divider>
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

  },
  mounted(){

  }

}
</script>
<style socped>
.leftbar{
  width:250px;
  /*height:300px;*/
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
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left: 40px;
}
.personalpage_text{
  vertical-align: middle;
  margin-left: 35px;
  font-size:23px;
  font-family: "Microsoft YaHei";
}
.collect_png{
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left: 40px;
}
.collect_text{
  vertical-align: middle;
  margin-left: 35px;
  font-size:23px;
  font-family: "Microsoft YaHei";
}
.competerecord_png{
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left: 40px;
}
.competerecord_text{
  vertical-align: middle;
  margin-left:35px;
  font-size: 23px;
  font-family: "Microsoft YaHei";
}
</style>