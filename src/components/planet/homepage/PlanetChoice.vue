<template>
  <div>
    <div class="choice_card">
      <div class="choice" @click="goto('topic')">
        <img src="../../../assets/icon/resources.png" alt="">
        <span>星球讨论</span>
      </div>
      <hr class="line">
      <div class="choice" @click="goto('resource')">
        <img src="../../../assets/icon/resources.png" alt="">
        <span>星球资源</span>
      </div>
      <hr class="line">
      <div class="choice" @click="goto('activity')">
        <img src="../../../assets/icon/activity.png" alt="">
        <span>活动拼团</span>
      </div>
      <hr class="line">
      <div class="choice" @click="goto('competition')">
        <img src="../../../assets/icon/competition.png" alt="">
        <span>知识竞赛</span>
      </div>
    </div>
    <div class="choice_card" v-if="isManager===1">
      <div class="choice" @click="goto('member')">
        <img src="../../../assets/icon/member.png" alt="">
        <span>成员管理</span>
      </div>
    </div>
    <div v-if="isManager===2" class="choice_card" @click="quit">
        <span class="quit_font">退出星球</span>
    </div>
  </div>
</template>

<script>
import {quitPlanet} from "@/api/homepage/planet";

export default {
  name: "PlanetChoice",
  props:["isManager"],
  data(){
    return{
    }
  },
  methods:{
    goto(path){
      switch(path){
        case 'resource':
          this.$router.push("/planet/resource")
          break;
        case 'activity':
          this.$router.push("/planet/activity")
          break;
        case 'competition':
          this.$router.push("/planet/competition")
          break;
        case 'member':
          this.$router.push("/planet/member")
          break;
        case 'topic':
          this.$router.push("/planet")
          break;
      }

    },
    quit(){
      console.log(this.isManager)
      this.$confirm('此操作将永久退出该星球, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        quitPlanet(window.sessionStorage.getItem("planetCode")).then((res)=>{
          if(res.data.success){
            this.$message({
              type: 'success',
              message: '退出成功!'
            });
            this.$router.push('/homepage')
          }else{
            this.$message({
              type: 'error',
              message: '退出失败，未知原因'
            });
          }
        }).catch((err)=>{
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    }
  },
}
</script>

<style scoped>
.choice_card{
  width: 150px;
  margin-top: 30px;
  margin-left: 100px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;
}

.choice{
  position: relative;
  cursor: pointer;
  height: 60px;
  line-height: 60px;
}

.choice img{
  position: absolute;
  width: 30px;
  height: 30px;
  top: 15px;
  left: 15px;
}

.choice span{
  color: #949090;
  font-size: 18px;
  font-weight: bold;
  padding-left: 30px;
}

.line{
  margin: 0 15px;
  border-top:2px dashed #C1C0C0;
  border-bottom: 0;
}
.quit_font{
  height: 50px;
  line-height: 50px;
  display: inline-block;
  color: #e56f71;
  font-weight: bold;
  cursor: pointer;
  font-size: 18px;
}
</style>
