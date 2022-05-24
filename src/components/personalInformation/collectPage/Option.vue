<template>
  <div id="option">
    <div class="leftbar">
      <img :src="information.avatar" class="avatar">
      <el-divider></el-divider>
      <div class="personalpage" @click="goToPersonalPage">
        <img src="../../../assets/homepageimg/personalpage.png" class="personalpage_png">
        <span class="personalpage_text">个人主页</span>
      </div>
      <el-divider></el-divider>
      <div class="collect" @click="goToPersonalFavorite">
        <img src="../../../assets/homepageimg/collect.png" class="collect_png" >
        <span class="collect_text">收藏夹</span>
      </div>
      <el-divider></el-divider>
      <div class="competerecord" @click="goToPersonalCompeteRecord">
        <img src="../../../assets/homepageimg/competerecord.png" class="competerecord_png">
        <span class="competerecord_text">竞赛记录</span>
      </div>
    </div>

  </div>
</template>

<script>

import {getUserById} from "@/api/admin/manage";

export default{
  data(){
    return{
      information:{},
    }
  },
  methods:{
    goToPersonalPage(){
      this.$router.push('/personal')
    },
    goToPersonalFavorite(){
      this.$router.push('/personal/favorite')
    },
    goToPersonalCompeteRecord(){
      this.$router.push('/personal/competeRecord')
    }
  },
  mounted(){
    getUserById().then((res)=>{
      if(res.data.success === true){
        let data = res.data.data
        this.information=data.result
        console.log(this.information)
      }
    })

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
  width:28px;
  height:28px;
  vertical-align: middle;
  margin-left: 40px;
}
.personalpage_text{
  margin-top: 24px;
  margin-bottom: 24px;
  vertical-align: middle;
  margin-left: 35px;
  font-size:21px;
  font-family: "Microsoft YaHei";
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
.collect{
  background-color: #e5ffff;
}
/deep/ .el-divider--horizontal{
  margin-top:0px;
  margin-bottom: 0px;
}
</style>
