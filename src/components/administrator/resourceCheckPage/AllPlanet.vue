<template>
  <div id="planethistory">
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
            <el-popover
                placement="top-start"
                :title="item.title"
                width="200"
                trigger="hover"
                :content="item.content">
              <el-tag slot="reference" class="planet_tag">{{ item.title }}</el-tag>
            </el-popover>
          </div>
        </div>

        <div v-else class="longplanetcontent" style="height:495px;overflow-y: scroll">
          <div v-for="item in planets">
            <el-popover
                placement="top"
                :title="item.planetName"
                width="200"
                trigger="hover"
                :content="item.planetDescription">
              <el-tag slot="reference" class="planet_tag" type="plain">
                <img :src="item.planetAvatar" class="planet_avatar">
                {{ item.planetName }}
              </el-tag>
            </el-popover>
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
        console.log(996633225588114477)
        console.log(data)
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
}
.topheader{
  position: absolute;
  margin-top: 10px;
}
.planet_text{
  text-align: center;
  font-size:23px;
  font-family: "Microsoft YaHei";
  margin-top: 5px;
}
.planetdivide{
  width:320px;
}
.el-divider--horizontal{
  margin-bottom: 0px;
}
.planet_tag{
  font-size:15px;
  margin-top:10px;
  margin-bottom:10px;
  /*line-height: 10px;*/
  vertical-align: middle;
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
.planet_avatar{
  border-radius: 50%;
  display: inline-block;
  width:25px;
  height:25px;
  vertical-align: middle;
}
</style>