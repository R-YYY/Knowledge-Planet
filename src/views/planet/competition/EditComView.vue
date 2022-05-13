<template>
  <div id="editCompetition">
    <Header></Header>
    <div class="back" @click="toCompetitionManage">
      <i class="el-icon-arrow-left" style="font-weight: bold"></i>
      <span>返回竞赛管理</span>
    </div>
    <div>
      <EditCompetition></EditCompetition>
    </div>
  </div>
</template>

<script>
import EditCompetition from "@/components/planet/competition/create/EditCompetition";
export default {
  name: "EditComView",
  components: {EditCompetition},
  methods:{
    toCompetitionManage(){
      this.$router.push("/planet/competition/manage")
    },
  }
}
</script>

<style scoped>
#editCompetition{
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