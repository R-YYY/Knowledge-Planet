<template>
  <div class="integral_rank_card">
    <div class="header">
      <img class="planet" src="../../../assets/icon/planet.png" alt="">
      <b class="rank_name">积分活跃排行榜</b>
    </div>
    <div style="margin-left: 65px">
      <Avatar :placing="users[0].placing" :name="users[0].name" :img-url="users[0].imgUrl"></Avatar>
    </div>
    <div>
      <div style="display: inline-block;margin-right: 60px;margin-top: 10px">
        <Avatar :placing="users[1].placing" :name="users[1].name" :img-url="users[1].imgUrl"></Avatar>
      </div>
      <div style="display: inline-block">
        <Avatar :placing="users[2].placing" :name="users[2].name" :img-url="users[2].imgUrl"></Avatar>
      </div>
    </div>
    <br>
    <hr class="line">
    <div class="other" v-for="i in 7">
      <b class="ranking">{{users[i+2].placing}}</b>
      <div class="other_info">
        <span class="other_name">{{users[i+2].name}}</span><br>
        <span class="other_desc">已经参加了{{users[i+2].nums}}场比赛</span>
      </div>
      <img class="other_img" :src="users[i+2].imgUrl" alt="">
      <hr class="line">
    </div>
    <div class="more">
      <b>显示更多</b>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/planet/Avatar";
export default {
  name: "IntegralRank",
  components: {Avatar},
  data(){
    return{
      users:[],
    }
  },
  created() {
    this.users = [];
    for (let i = 0; i < 10; i++) {
      this.users.push({
        placing:i+1,
        name:"第"+(i+1)+"的名字呢？",
        nums:100-i,
        imgUrl: "https://img1.baidu.com/it/u=1659441821,1293635445&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      });
    }
  }
}
</script>

<style scoped>
.integral_rank_card{
  text-align: left;
  margin-top: 30px;
  width: 300px;
  height: 690px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 0 15px #cdcdcd;
}

.header{
  height: 50px;
  line-height: 50px;
}

.planet{
  width: 35px;
  vertical-align: middle;
  margin-left: 10px;
}

.rank_name{
  padding-left: 48px;
  color: #8c939d;
}

.line{
  margin: 3px 10px 0;
  border-top:1px dotted #C1C0C0;
  border-bottom: 0;
}

.other_img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #D3D2D2;
  vertical-align: middle;
}

.other_info{
  width: 190px;
  height: 48px;
  display: inline-block;
  vertical-align: middle;
}

.ranking{
  text-align: center;
  width: 35px;
  display: inline-block;
  height: 48px;
  line-height: 50px;
  font-size: 20px;
  color: #9A9191;
  margin-left: 10px;
}

.other_name{
  font-weight: bold;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  color: #F5B767;
}

.other_desc{
  font-size: 10px;
  color: #aaa1a1;
}

.more{
  text-align: center;
  height: 50px;
  line-height: 50px;
  cursor:pointer;
  color: #53A6DF;
}
</style>