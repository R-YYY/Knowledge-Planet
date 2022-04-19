<template>
  <div id="daterank">
    <div class="alivedate">
      <el-calendar v-model="value">
        <template
            slot="dateCell"
            slot-scope="{date,data}">
          <div class="date-content" @click="todo(data)">
            <span class="text" v-if="compare(data,datedate) === 1">{{getDay(date)}}✔️</span>
            <span class="text" v-if="compare(data,datedate) === 0" >{{getDay(date)}}</span>
          </div>
        </template>
      </el-calendar>
    </div>
    <div v-if="rankPage" class="planetrank">
      <div class="pt">星球热度排行榜</div>
      <div class="rankcontext" style="margin-top:20px;">
        <div class="rank" v-for="item in planets" :key="item.index">
        <span style="border-radius: 50%;height: 30px;width: 30px;display: inline-block;background: #DDD1D1;vertical-align: top;margin-left: 30px;margin-bottom:10px;">
        <span style="display: block;color: white;height: 30px;line-height: 30px;text-align: center">{{item.index}}</span></span>
          <span class="aaa">{{item.title}}</span>
          <span ><img src="../../assets/homepageimg/hot.png" class="hot_img"></span>
          <span style="height: 30px;line-height: 30px;">{{item.planethot}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {getPlanetRank} from "@/api/homepage/planet"
export default{
  data(){
    return{
      value:new Date(),
      planets:[],
      rankPage: false,
      datedate:["2022-04-16","2022-04-15","2022-03-28","2022-04-17","2022-04-18"],
    }
  },
  methods:{
    getDay(date){
      return date.getDate()
    },
    // getToday(){
    //   let nowDate = new Date()
    //   let date = {
    //     year: nowDate.getFullYear(),
    //     month: nowDate.getMonth() + 1,
    //     date: nowDate.getDate()
    //   }
    //   if (parseInt(date.date) < 10) {
    //     date.date = '0' + date.date
    //   }
    //   this.systemTime = date.year + '-' + date.month + '-' + date.date
    //   return this.systemTime
    // },
    compare(data,datedate){
      if(datedate.includes(data.day)){
        return 1
      }
      else{
        return 0
      }
    }
  },
  mounted(){
    getPlanetRank().then((res)=>{
      if(res.data.success === true){
        console.log(1)
        let data = res.data.data.planetList
        console.log(data)
        for(let i = 0;i<5;i++){
          this.planets[i] = {}
          this.planets[i].index = i+1
          this.planets[i].title=data[i].planetName
          this.planets[i].planethot=data[i].hot
        }
        this.rankPage = true
      }
    })
  }
}
</script>

<style scoped>
.alivedate{
  margin-left:1175px;
  margin-top:-600px;
  width:350px;
  height:310px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.planetrank{
  position:relative;
  margin-left:1175px;
  margin-top:30px;
  width:350px;
  height:260px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
/deep/  .el-calendar-table .el-calendar-day{
  /*box-sizing: border-box;*/
  padding-left:1px;
  padding-top:10px;
  font-size:8px;
  width: 50px;
  height: 30px;
}
.pt{
  font-family: "Microsoft YaHei";
  font-size:24px;
  font-color:#2C2C2C;
  margin-left:80px;
  height:20px;
}
.hot_img{
  margin-left:130px;
  width:20px;
}
.aaa{
  display: inline-block;
  width:50px;
  margin-left:20px;
}
</style>
