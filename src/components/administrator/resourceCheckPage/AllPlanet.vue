<template>
  <div id="allplanet">
    <div class="topbar">
      <div class="topheader">

        <div class="planet">
          <div class="planet_text">所有星球</div>
        </div>

        <div class="planetdivide">
          <el-divider></el-divider>
        </div>

        <div v-if="planets.length<=9" class="shortplanetcontent">
          <div v-for="item in planets">
            <el-tag slot="reference" class="planet_tag">{{ item.planetName }}</el-tag>
          </div>
        </div>

        <div v-else class="longplanetcontent" style="height:495px;overflow-y: scroll">
          <div v-for="item in planets">
            <el-tag slot="reference" class="planet_tag" type="plain">{{ item.planetName }}</el-tag>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>


import {getAllPlanet} from "@/api/admin/manage";
export default{
  data(){
    return{
      planets:[]
    }
  },
  methods:{

  },
  mounted(){
    getAllPlanet().then((res)=>{
      if(res.data.success === true){
        let data = res.data.data.planetList
        console.log(11987657657)
        this.planets=data
        console.log(this.planets)
      }
    })
  }
}
</script>
<style scoped>
.topbar{
  width:320px;
  height:560px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
  background-color: #e5ffff;
}
.topheader{
  position: absolute;
  margin-top: 10px;
}
.planet_text{
  text-align: center;
  font-size:23px;
  font-family: "Microsoft YaHei";
  margin-top:5px;

}
.planetdivide{
  width:320px;
}
.el-divider--horizontal{
  margin-bottom: 0px;
  margin-top:25px;
}
.planet_tag{
  margin-top:10px;
  margin-bottom:10px;
}
.el-tag{
  background-color: #99ebff;
  border-color: #99ebff;
  color:black;
  width:200px;
}
.shortplanetcontent{
  text-align: center;
}
.longplanetcontent{
  text-align: center;
}
</style>