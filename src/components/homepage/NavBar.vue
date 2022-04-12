<template>
  <div id="navbar">
    <div class="box">
      <img src="../../assets/homepageimg/fav.png" class="icon_img">
      <div class="title">我的星球</div>
      <div class="intro">我参加的星球交流群</div>
    </div>
    <div class="box">
      <img src="../../assets/homepageimg/addnew.png" class="icon_img">
      <div class="title">创建星球</div>
      <div class="intro">创建你想要的星球</div>
    </div>
<!--    <div class="box">-->
<!--      <img src="../../assets/homepageimg/compete.png" class="icon_img">-->
<!--      <div class="title">竞赛</div>-->
<!--      <div class="intro">学习和分享技术知识</div>-->
<!--    </div>-->
<!--    <div class="box">-->
<!--      <img src="../../assets/homepageimg/activity.png" class="icon_img">-->
<!--      <div class="title">活动</div>-->
<!--      <div class="intro">和同行面对面交流</div>-->
<!--    </div>-->
    <div class="systemnotice">
      <span class="notice" style="font-weight: bold;font-size:24px;color:#2C2C2C;font-family: 'Microsoft YaHei'">系统公告</span>
      <el-carousel height="190px" indicator-position="outside">
        <el-carousel-item v-for="item in notices" :key="item">
          <div class="nt">{{item.title}}</div>
          <div class="ni">{{item.infor}}</div>
          <div class="nf">——{{item.from}}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      notices:[
        {
          title:'4.6系统维修',
          infor:'222',
          from:'知识星球官方'
        },{
          title:'4.6系统维修',
          infor:'1',
          from:'知识星球官方'
        },{
          title:'4.6系统维修',
          infor:'1',
          from:'知识星球官方'
        }
      ]
    }
  }

}
</script>

<style>
#navbar{
  margin-top:60px;
  margin-left:70px;
}
.box{
  height: 86px;
  width: 230px;
  margin-bottom: 30px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.icon_img{
  width:50px;
  height:50px;
  margin-top:18px;
  margin-left:15px;
}
.title{
  margin-left:75px;
  margin-top: -52px;
  font-family: "Microsoft YaHei";
  font-size:20px;
  font-color:#2C2C2C;
}
.intro{
  margin-left:75px;
  font-family: "Microsoft YaHei";
  font-size:14px;
  font-color:#2C2C2C;
}
.systemnotice{
  margin-top:90px;
  height: 286px;
  width: 330px;
  margin-left:-50px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.notice{
  position:relative;
  margin-left:100px;
  top:20px;
}
.nt{
  font-size:20px;
  font-family: "Microsoft YaHei";
  font-color:#2C2C2C;
  margin-left:30px;
  margin-top:35px;
}
.ni{
  font-size:14px;
  font-family: "Microsoft YaHei";
  font-color:#000000;
  margin-left:30px;
  margin-top:25px;
}
.nf{
  font-size:14px;
  font-family: "Microsoft YaHei";
  font-color:#000000;
  margin-left:200px;
  margin-top:50px;
}
</style>