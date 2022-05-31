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


        <div class="longjoinplanet" style="height:185px;overflow-y: auto">
          <div v-for="item in joinplanets">
            <el-tag
                effect="dark"
                type="success"
                class="joinplanet_tag"
                @click="goToJoinPlanet(item.planet.planetCode,item.planet.planetName)"
            ><img :src="item.planet.planetAvatar" class="planet_avatar">{{ item.planet.planetName }}</el-tag>
          </div>
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
    goToJoinPlanet(planetCode,planetName) {
      window.sessionStorage.setItem("planetCode",planetCode)
      window.sessionStorage.setItem("planetName",planetName)
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

.joinplanet_tag{
  margin-top:10px;
  margin-bottom:10px;
}
.el-tag{
  /*background-color:white;*/
  /*border-color:white;*/
  color:black;
  width:250px;
}
.longjoinplanet{
  text-align: center;
}
.el-divider--horizontal{
  margin-bottom: 0px;
}
.planet_avatar{
  border-radius: 50%;
  width:25px;
  height:25px;
  vertical-align:middle;
  margin-right:5px;
}
</style>