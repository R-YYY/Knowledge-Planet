<template>
  <div class="back_to_homepage" @click="$router.push({name:'planetHomepage'})">
    <i class="el-icon-back" style="font-weight: bold"></i>星球主页
  </div>
</template>

<script>
export default {
  name: "BackToHome"
}
</script>

<style scoped>
.back_to_homepage{
  cursor: pointer;
  position: fixed;
  text-align: center;
  color: white;
  font-weight: bold;
  left: 30px;
  top: 650px;
  width: 100px;
  height: 40px;
  line-height: 40px;
  background-size: cover;
  background: #00DED4 no-repeat center;
  border-radius: 30%;
  box-shadow: 0 0 15px #cdcdcd;
  /*border: 5px solid #B5D0D0;*/
}
</style>