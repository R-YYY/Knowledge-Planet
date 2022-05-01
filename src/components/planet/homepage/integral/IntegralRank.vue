<template>
  <div class="integral_rank_card">
    <div class="header">
      <img class="planet" src="../../../../assets/icon/planet.png" alt="">
      <b class="rank_name">积分活跃排行榜</b>
    </div>
    <div>
      <Avatar class="first" :placing="users[0].rank" :name="users[0].userName" :img-url="users[0].avatar"></Avatar>
    </div>
    <div style="display: flex">
      <Avatar v-if="users.length>1" class="second" :placing="users[1].rank" :name="users[1].userName" :img-url="users[1].avatar"></Avatar>
      <Avatar v-if="users.length>2" class="third" :placing="users[2].rank" :name="users[2].userName" :img-url="users[2].avatar"></Avatar>
    </div>
    <br>
    <hr class="line">
    <div v-for="i in 7">
      <IntegralCard v-if="users.length>i+2" :item="users[i+2]"></IntegralCard>
      <hr v-if="users.length>i+2" class="line">
    </div>
    <div v-if="show" v-for="i in 40">
      <IntegralCard :item="users[i+10]"></IntegralCard>
      <hr class="line">
    </div>
    <div v-if="users.length>10" class="more">
      <b @click="show=!show">{{show?"收起":"显示更多"}}</b><br>
    </div>
    <div class="me">
      <div>你的排名：{{me.rank}}</div>
      <div>你的积分：{{me.integral}}</div>
    </div>

  </div>
</template>

<script>
import Avatar from "@/components/planet/Avatar";
import IntegralCard from "@/components/planet/homepage/integral/IntegralCard";
import {getLeaderboard} from "@/api/planet/member";
export default {
  name: "IntegralRank",
  components: {IntegralCard, Avatar},
  data(){
    return{
      users:[{
        rank:"null",
        userName:"null",
        integral: "null",
        avatar: "",
      }],
      show:false,
      me:{
        rank:"null",
        integral:"null",
      }
    }
  },
  created() {
    getLeaderboard("23").then((res)=>{
      console.log(res)
      this.me.rank = res.data.data.result.rank
      this.me.integral = res.data.data.result.integral
      this.users = JSON.parse(JSON.stringify(res.data.data.result.userList))
    }).catch(()=> {
      this.$message({message: "系统错误，排行榜加载失败", type: 'error'})
    })

    // this.users = []
    // for (let i = 0; i < 50; i++) {
    //   this.users.push({
    //     rank:i+1,
    //     userName:"第"+(i+1)+"的名字呢？",
    //     integral:100-i,
    //     avatar: "https://img1.baidu.com/it/u=1659441821,1293635445&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
    //   });
    // }

  }
}
</script>

<style scoped>
.integral_rank_card{
  text-align: left;
  margin-top: 30px;
  width: 300px;
  height: auto;
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

.first{
  margin-left: 70px;
}

.second{
  margin-top: 10px;
  margin-right: 30px;
}

.third{
  margin-top: 10px;
  margin-left: 30px;
}

.line{
  margin: 0 10px 0;
  border-top:1px dotted #C1C0C0;
  border-bottom: 0;
}

.more{
  text-align: center;
  height: 50px;
  line-height: 50px;
  cursor:pointer;
  color: #53A6DF;
}

.me{
  display: flex;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  color: #9A9191;
  border-radius: 0 0 20px 20px;
  background-color: white;
  box-shadow: 0 0 15px #cdcdcd;
}

.me div{
  width: 120px;
  margin-left: 35px;
  margin-right: -30px;
}
</style>