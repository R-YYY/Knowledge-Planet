<template>
  <div>
    <div class="integral_rank_card">
      <div class="header">
        <div>
          <img class="planet" src="../../../../assets/icon/planet.png" alt="">
        </div>
        <div class="rank_name">{{rankName}}</div>
      </div>
      <div>
        <Avatar class="first"
                :placing="users.length>0?users[0].rank:'null'"
                :name="users.length>0?users[0].userName:'null'"
                :img-url="users.length>0?users[0].avatar:waitingImgUrl">
        </Avatar>
      </div>
      <div style="display: flex">
        <Avatar class="second"
                :placing="users.length>1?users[1].rank:'null'"
                :name="users.length>1?users[1].userName:'null'"
                :img-url="users.length>1?users[1].avatar:waitingImgUrl">
        </Avatar>
        <Avatar class="third"
                :placing="users.length>2?users[2].rank:'null'"
                :name="users.length>2?users[2].userName:'null'"
                :img-url="users.length>2?users[2].avatar:waitingImgUrl">
        </Avatar>
      </div>
      <br>
      <hr class="line">
      <div v-if="users.length<=3" class="empty"></div>
      <div v-else style="height:400px;overflow-y: scroll">
        <div v-for="i in (users.length-3)">
          <IntegralCard :item="users[i+2]"></IntegralCard>
          <hr class="line">
        </div>
      </div>
    </div>
    <div v-if="rankName==='积分活跃排行榜'" class="me">
      <div>你的排名：{{me.rank}}</div>
      <div>你的积分：{{me.integral}}</div>
    </div>
    <div v-else-if="rankName==='竞赛排行榜'" class="join">
      <div>你的参加场次：{{joinCount}}</div>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/planet/Avatar";
import IntegralCard from "@/components/planet/homepage/integral/IntegralCard";
import {getLeaderboard} from "@/api/planet/member";
import {getLeaderBoard} from "@/api/planet/competition";
export default {
  name: "IntegralRank",
  components: {IntegralCard, Avatar},
  props:["rankName"],
  data(){
    return{
      users:[],
      show:false,
      me:{
        rank:"null",
        integral:"null",
      },
      joinCount:0,
      waitingImgUrl:"https://img2.baidu.com/it/u=295011096,4030987771&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501"
    }
  },
  methods:{
    loadIntegralRank(){
      let planetCode = window.sessionStorage.getItem("planetCode")
      getLeaderboard(planetCode).then((res)=>{
        let list = JSON.parse(JSON.stringify(res.data.data.result.userList))
        this.users = []
        for (let i = 0; i < list.length; i++) {
          this.users.push({
            rank:list[i].rank,
            userName:list[i].userName,
            desc:"已经获得"+list[i].integral+"积分",
            avatar: list[i].avatar
          });
        }
        this.me.rank = res.data.data.result.rank
        this.me.integral = res.data.data.result.integral
      }).catch(()=> {
        this.$message({message: "系统错误，排行榜加载失败", type: 'error'})
      })
    },

    loadCompetitionRank(){
      let planetCode = window.sessionStorage.getItem("planetCode")
      getLeaderBoard(planetCode).then((res)=>{
        this.joinCount = res.data.data.result.joinCount
        let list = res.data.data.result.leaderBoard
        list.sort( (x,y) => y.count - x.count )
        for (let i = 0; i < list.length; i++) {
          this.users.push({
            rank: i+1,
            userName:list[i].userInfo.userName,
            desc:"已经参加竞赛"+list[i].count+"次",
            avatar: list[i].userInfo.avatar
          })
        }
      })
    }
  },
  created() {
    switch (this.rankName) {
      case "积分活跃排行榜":
        this.loadIntegralRank()
        break
      case "竞赛排行榜":
        this.loadCompetitionRank()
        break
      default:
        break
    }
  }
}
</script>

<style scoped>
.integral_rank_card{
  text-align: left;
  margin-top: 30px;
  width: 300px;
  height: auto;
  border-radius: 20px 20px 0 0;
  background-color: white;
  box-shadow: 0 0 15px #cdcdcd;
}

.header{
  height: 50px;
  line-height: 50px;
  display: flex;
}

.planet{
  width: 35px;
  vertical-align: middle;
  margin-left: 10px;
}

.rank_name{
  width: 210px;
  text-align: center;
  font-weight: bold;
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

.me{
  display: flex;
  width: 300px;
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
  margin-left: 20px;
  margin-right: -10px;
}

.join{
  text-align: center;
  width: 300px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  color: #9A9191;
  border-radius: 0 0 20px 20px;
  background-color: white;
  box-shadow: 0 0 15px #cdcdcd;
}

.empty{
  height:400px;
  position: relative;
  background-image: url("../../../../assets/picture/empty.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}
</style>