<template>
  <div id="createplanet">
    <div class="bottombar">
      <div class="bottomheader">
        <div class="create">
          <img src="../../../assets/homepageimg/planet.png" class="planet_png">
          <span class="create_text">我创建的星球</span>
        </div>
        <div class="createdivide">
          <el-divider></el-divider>
        </div>

        <div class="longcreateplanet" style="height:185px;overflow-y: auto">
          <div v-for="item in createplanets">
            <el-tag
                effect="dark"
                type="danger"
                class="createplanet_tag"
                @click="goToCreatePlanet(item.planet.planetCode,item.planet.planetName)"
            ><img :src="item.planet.planetAvatar" class="planet_avatar">{{ item.planet.planetName }}</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCreatePlanet} from "@/api/homepage/planet";

export default{
  data(){
    return{
      createplanets:[]
    }
  },
  methods:{
    goToCreatePlanet(planetCode,planetName) {
      window.sessionStorage.setItem("planetCode",planetCode)
      window.sessionStorage.setItem("planetName",planetName)
      this.$router.push('/planet')
    }

  },
  mounted(){
    getCreatePlanet().then((res)=>{
      if(res.data.success === true){
        let data = res.data.data.planetList
        console.log(data)
        this.createplanets=data
      }
    })
  }

}
</script>
<style scoped>
.bottombar{
  position: relative;
  width:320px;
  height:250px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.bottomheader{
  margin-top: 10px;
  position: absolute;
}
.planet_png{
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left:70px;
}
.create_text{
  vertical-align: middle;
  margin-left: 20px;
  font-size:23px;
  font-family: "Microsoft YaHei";
}
.createdivide{
  width:320px;
}
.el-divider--horizontal{
  margin-bottom: 10px;
}
.createplanet_tag{
  margin-top:10px;
  margin-bottom:10px;
}
.el-tag{
  color:black;
  width:250px;
}
.longcreateplanet{
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