<template>
  <div class="integral_rank_card">
    <div class="header">
      <img class="planet" src="../../../../assets/icon/planet.png" alt="">
      <b class="rank_name">积分活跃排行榜</b>
    </div>
    <div>
      <Avatar class="first" :placing="users[0].placing" :name="users[0].name" :img-url="users[0].imgUrl"></Avatar>
    </div>
    <div style="display: flex">
      <Avatar class="second" :placing="users[1].placing" :name="users[1].name" :img-url="users[1].imgUrl"></Avatar>
      <Avatar class="third" :placing="users[2].placing" :name="users[2].name" :img-url="users[2].imgUrl"></Avatar>
    </div>
    <br>
    <hr class="line">
    <div v-for="i in 7">
      <IntegralCard :item="users[i+2]"></IntegralCard>
      <hr class="line">
    </div>
    <div class="more">
      <b>显示更多</b>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/planet/Avatar";
import IntegralCard from "@/components/planet/homepage/integral/IntegralCard";
export default {
  name: "IntegralRank",
  components: {IntegralCard, Avatar},
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
</style>