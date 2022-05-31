<template>
  <div id="recommendplanet">
    <div class="rep">
      <div class="rptext">推荐星球</div>
      <div class="hint" >
        <el-popover
            placement="right-start"
            trigger="hover"
            content="根据兴趣爱好为你推荐星球">
          <img src="../../assets/homepageimg/hint.png" class="hintpng" slot="reference">
        </el-popover>
      </div>



      <div class="longrpcontent" v-if="recommendplanet.length>3" style="height:600px;margin-top:20px;overflow-y: scroll">
        <div class="content" v-for="(item,index) in recommendplanet" :key="index">
          <img :src="item.planet.planetAvatar" class="planet_img">
          <div class="ptitle">{{ item.planet.planetName }}</div>
          <div class="pintro">{{ item.planet.planetDescription}}</div>
          <div class="goin">
            <el-button type="primary" size="mini" style="width:60px;height:33px;text-align:center" @click="joinplanet(item.planet.planetCode,item.planet.planetName)">加入</el-button>
          </div>
          <div class="other">
            <span style="font-family: 'Microsoft YaHei';font-size:14px;color:#727B82;margin-left:225px;">创建时间：{{item.planet.createTime}}</span>
            <span style="font-family: 'Microsoft YaHei';font-size:14px;color:#53A6DF;margin-left:50px;">创建人：</span>
            <img :src="item.uploaderAvatar" class="cp_avatar">
            <span style="font-family: 'Microsoft YaHei';font-size:14px;color:#53A6DF;margin-left:35px;">{{item.uploaderName}}</span>
          </div>
          <div class="divide">
            <el-divider></el-divider>
          </div>
        </div>
      </div>

      <div class="shortrpcontent" v-if="recommendplanet.length<=3" style="height:600px;margin-top:20px">
        <div class="content" v-for="(item,index) in recommendplanet" :key="index">
          <img :src="item.planet.planetAvatar" class="planet_img">
          <div class="ptitle">{{ item.planet.planetName }}</div>
          <div class="pintro">{{ item.planet.planetDescription}}</div>
          <div class="goin">
            <el-button type="primary" size="mini" style="width:60px;height:33px;text-align:center" @click="joinplanet(item.planet.planetCode)">加入</el-button>
          </div>
          <div class="other">
            <span style="font-family: 'Microsoft YaHei';font-size:14px;color:#727B82;margin-left:225px;">创建时间：{{item.planet.createTime}}</span>
            <span style="font-family: 'Microsoft YaHei';font-size:14px;color:#53A6DF;margin-left:50px;">创建人：</span>
            <img :src="item.uploaderAvatar" class="cp_avatar">
            <span style="font-family: 'Microsoft YaHei';font-size:14px;color:#53A6DF;margin-left:35px;">{{item.uploaderName}}</span>
          </div>
          <div class="divide">
            <el-divider></el-divider>
          </div>
        </div>
      </div>

      <div class="nonecontent" v-if="recommendplanet.length===0">
        <el-empty description="暂无推荐星球"></el-empty>
      </div>




    </div>
  </div>
</template>

<script>
import {createPlanet, getRecommendPlanet} from "@/api/homepage/planet";
import {joinPlanet} from "@/api/homepage/planet"
export default{
  data(){
    return{
      recommendplanet:[]
    }
  },
  methods:{
    joinplanet(planetCode,planetName) {
      this.$confirm('您确定加入该星球吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'primary'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '加入成功!'
        });
        joinPlanet(planetCode).then((res)=>{
          if(res.data.success){
            window.sessionStorage.setItem("planetCode",planetCode)
            window.sessionStorage.setItem("planetName",planetName)
            this.$router.push('/planet')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消加入'
        });
      });
    }
  },
  mounted(){
    getRecommendPlanet().then((res)=>{
      if(res.data.success){
        let data = res.data.data.planetList
        this.recommendplanet=data
      }
    })
  }
}
</script>

<style scoped>

.content{
  position:relative;
  margin-top:30px;
}
.rep{
  width:780px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
  height:670px;
}
.rptext{
  position: relative;
  font-family: "Microsoft YaHei";
  font-size:24px;
  font-color:#2C2C2C;
  left:30px;
  top:20px;
  font-weight: bold;
  width:100px;
}
.planet_img{
  border-radius: 50%;
  width:120px;
  height:120px;
  margin-left:30px;
}
.ptitle{
  margin-left:225px;
  margin-top:-126px;
  font-size:18px;
  font-color:#2C2C2C;
  font-family: "Microsoft YaHei";
  font-weight: bold;
}
.pintro{
  width:430px;
  height:50px;
  margin-left:225px;
  margin-top:10px;
  font-size:14px;
  font-color:#000000;
  font-family: "Microsoft YaHei";
  font-weight: bold;
}
.goin{
  margin-left:680px;
  margin-top:-50px;
}
.other{
  margin-top:36px;
  height:20px;
}
.divide{
  width:740px;
  margin-left:20px;
}
.hintpng{
  style:inline-block;
  height:18px;
  width:20px;
}
.hint{
  margin-left:130px;
  margin-top:-5px;
}
.cp_avatar{
  position:absolute;
  margin-top:-3px;
  border-radius: 50%;
  width:25px;
  height:25px;
  margin-left:5px;
}
.nonecontent{
  margin-top: -500px;
}
</style>
