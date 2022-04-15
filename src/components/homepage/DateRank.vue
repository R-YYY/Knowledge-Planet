<template>
  <div id="daterank">
    <div class="alivedate">
      <el-calendar v-model="value">
        <template
        slot="dateCell"
        slot-scope="{date,data}">
          <div class="date-content">
            <span class="text">{{getDay(date)}}</span>
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
        <span style="margin-left:35px;height:30px;line-height: 30px;">{{item.title}}</span>
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
      rankPage: false
    }
  },
  methods:{
    getDay(date){
      return date.getDate()
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
</style>
