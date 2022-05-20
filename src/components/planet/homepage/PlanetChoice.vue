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
    <div class="choice_card" v-if="isManager">
      <div class="choice" @click="goto('member')">
        <img src="../../../assets/icon/member.png" alt="">
        <span>成员管理</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanetChoice",
  props:["isManager"],
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

    }
  }
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
</style>
