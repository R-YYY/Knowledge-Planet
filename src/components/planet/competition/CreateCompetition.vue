<template>
  <div>
    <el-button round icon="el-icon-upload" @click="dialogFormVisible=true">发布竞赛</el-button>
  </div>
</template>

<script>
export default {
  name: "CreateCompetition",
  data(){
    return{
      dialogFormVisible:false,
    }
  }
}
</script>

<style scoped>
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