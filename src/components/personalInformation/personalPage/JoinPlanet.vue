<template>
  <div id="joinplanet">
    <div class="topbar">
      <div class="topheader">
        <div class="join">
          <img src="../../../assets/homepageimg/planet.png" class="planet_png">
          <span class="join_text">我加入的星球</span>
        </div>
        <div class="joindivide">
          <el-divider></el-divider>
        </div>
        <div class="planets">
          <el-tag
              v-for="item in joinplanets"
              effect="dark"
              style="margin-left:30px;margin-top:10px;"
              type="success"
              @click="goToJoinPlanet(item.planet.planetCode)"
          >{{ item.planet.planetName }}</el-tag>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {getJoinPlanet} from "@/api/homepage/planet";

export default{
  data(){
    return{
      joinplanets:[],
    }
  },
  methods:{
    goToJoinPlanet(planetCode) {
      window.sessionStorage.setItem("planetCode",planetCode)
      this.$router.push('/planet')
    }

  },
  mounted(){
    getJoinPlanet().then((res)=>{
      if(res.data.success === true){
        let data = res.data.data.planetList
        console.log(data)
        this.joinplanets=data
      }
    })
  }

}
</script>
<style scoped>
.topbar{
  width:320px;
  height:250px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
  background-color: #e5ffff;
}
.topheader{
  position: absolute;
  margin-top: 10px;
}
.planet_png{
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left:70px;
}
.join_text{
  vertical-align: middle;
  margin-left: 20px;
  font-size:23px;
  font-family: "Microsoft YaHei";
}
.joindivide{
  width:320px;
}
.el-divider--horizontal{
  margin-bottom: 10px;
}
</style>