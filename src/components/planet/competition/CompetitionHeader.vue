<template>
  <div class="header">
    <h1 class="name">星球竞赛</h1>
    <el-divider direction="vertical"></el-divider>
    <div class="history">参赛记录</div>
    <div class="button">
      <CreateCompetition></CreateCompetition>
    </div>
  </div>
</template>

<script>
import CreateCompetition from "@/components/planet/competition/CreateCompetition";
export default {
  name: "CompetitionHeader",
  components: {CreateCompetition}
}
</script>

<style scoped>
.header{
  position: relative;
  display: flex;
  height: 50px;
  width: 420px;
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

.button{
  margin-left: 10px;
}
</style>