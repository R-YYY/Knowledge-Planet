<template>
  <div id="manageCompetition">
    <Header></Header>
    <div class="back" @click="toCompetition">
      <i class="el-icon-arrow-left" style="font-weight: bold"></i>
      <span>返回竞赛主页</span>
    </div>
    <div>
      <ManageComList></ManageComList>
    </div>
  </div>
</template>

<script>
import ManageComList from "@/components/planet/competition/manage/ManageComList";
export default {
  name: "ManageComView",
  components: {ManageComList},
  methods:{
    toCompetition(){
      this.$router.push("/planet/competition")
    },
  }
}
</script>

<style scoped>
#manageCompetition{
  background-color: #F7F4F4;
}

.back{
  width: 112px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 150px;
}
</style>