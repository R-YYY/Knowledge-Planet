<template>
  <div class="header">
    <h1 class="name">星球竞赛</h1>
    <el-divider direction="vertical"></el-divider>
    <div class="history" @click="toRecord">参赛记录</div>
    <div v-if="isManager">
      <el-button round icon="el-icon-upload" @click="toCreate">竞赛管理</el-button>
    </div>
  </div>
</template>

<script>
import QuestionList from "@/components/planet/competition/create/QuestionList";
export default {
  name: "CompetitionHeader",
  components: {QuestionList},
  data(){
    return{
      isManager:window.sessionStorage.getItem('isManager')==="1",
    }
  },
  methods:{
    toRecord(){
      this.$router.push("/planet/competition/record")
    },

    toCreate(){
      this.$router.push("/planet/competition/manage")
    }
  }
}
</script>

<style scoped>
.header{
  position: relative;
  display: flex;
  height: 50px;
  width: 390px;
  line-height: 50px;
  border-radius: 50px;
  box-shadow: 0 0 12px #dadada;
  background-color: white;
}

.name{
  width: 120px;
  margin-top: 2px;
  margin-left: 10px;
  text-align: center;
  font-size: 18px;
  color: #54524f;
  font-weight: bold;
}

/*垂直线*/
.el-divider--vertical {
  display: inline-block;
  width: 2px;
  height: 30px;
  margin: 10px 0;
  vertical-align: middle;
  position: relative;
}

.history{
  font-weight: bold;
  color: #999898;
  cursor: pointer;
  margin-left: 30px;
  margin-right: 30px;
  line-height: 50px;
  height: 35px;
}

.el-button {
  font-weight: bolder;
  border: 1px solid #00ded4;
  color: #00ded4;
}

.el-button:hover,
.el-button:focus {
  background: #00ded4 !important;
  color: white !important;
  font-weight: bold;
}
</style>