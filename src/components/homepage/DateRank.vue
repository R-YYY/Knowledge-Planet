<template>
  <div id="daterank" >
    <div class="alivedate" v-if="calendarPage">
      <el-calendar v-model="value">
        <template
            slot="dateCell"
            slot-scope="{date,data}">
          <div class="date-content">
            <span class="text" v-if="compare(data,activedate) === 1">{{getDay(date)}}✔️</span>
            <span class="text" v-if="compare(data,activedate) === 0" >{{getDay(date)}}</span>
          </div>
        </template>
      </el-calendar>
    </div>
    <div v-if="rankPage" class="planetrank">
      <div class="pt">星球热度排行榜</div>
      <div class="rankcontext" style="margin-top:20px;">
        <div class="rank" v-for="item in planets" :key="item.index">
          <div class="placing">{{item.index}}</div>
          <span class="aaa">{{item.title}}</span>
          <span ><img src="../../assets/homepageimg/hot.png" class="hot_img"></span>
          <span style="height: 30px;line-height: 30px;float:right;margin-right:-63px;margin-top:12px;">{{item.planethot}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {getLoginRecord} from "@/api/homepage/planet"
import {getHotPlanet} from "@/api/homepage/planet"
export default{
  data(){
    return{
      value:new Date(),
      planets:[],
      rankPage: false,
      calendarPage:false,
      activedate:[]
    }
  },
  methods:{
    getDay(date){
      return date.getDate()
    },
    compare(data,activedate){
      if(activedate.includes(data.day)){
        return 1
      }
      else{
        return 0
      }
    }
  },
  mounted(){
    getHotPlanet().then((res)=>{
      if(res.data.success === true){
        let data = res.data.data.planetList
        for(let i = 0;i<data.length;i++){
          this.planets[i] = {}
          this.planets[i].index = i+1
          this.planets[i].title=data[i].planetName
          this.planets[i].planethot=data[i].hot
        }
        this.rankPage = true
      }
    }),
        getLoginRecord().then((res)=>{
          if(res.data.success === true){
            let data=res.data.data.date
            this.activedate=data
            this.calendarPage=true
          }
        })

  }
}
</script>

<style scoped>
#daterank{
  display: inline-block;
  border-radius: 16px;
}
.alivedate{

  width:350px;
  border-radius: 16px;
  box-shadow: 0 0 12px #dcdcdc;
}
.planetrank{
  border-radius: 16px;
  margin-top: 40px;
  position:relative;
  width:350px;
  border-radius: 16px;
  box-shadow: 0 0 12px #dcdcdc;
}
/deep/  .el-calendar-table .el-calendar-day{
  /*box-sizing: border-box;*/
  padding-left:1px;
  padding-top:10px;
  font-size:12px;
  width: 50px;
  height: 30px;
  border-radius: 16px!important;
}
.el-calendar{
  border-radius: 16px;
}
/deep/ .el-calendar__header{
  border-radius: 16px;
}
.pt{
  position: relative;
  font-family: "Microsoft YaHei";
  font-size:24px;
  font-color:#2C2C2C;
  padding-top: 15px;
  text-align: center;
  height:15px;
}
.hot_img{
  margin-right:50px;
  float:right;
  margin-top:15px;
  width:20px;
}
.aaa{
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width:180px;
  margin-left:20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: middle;
}
.rank{
  height: 50px;
  line-height: 50px;
}
.placing{
  margin-left:20px;
  display: inline-block;
  border-radius: 50%;
  background-color: #ddd1d1;
  height:40px;
  width: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  color: white
}
</style>
