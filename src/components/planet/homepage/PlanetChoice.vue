<template>
  <div>
    <div class="choice_card">
      <div class="choice">
        <img src="../../../assets/icon/resources.png" alt="">
        <span>星球资源</span>
      </div>
      <hr class="line">
      <div class="choice">
        <img src="../../../assets/icon/activity.png" alt="">
        <span>活动拼团</span>
      </div>
      <hr class="line">
      <div class="choice">
        <img src="../../../assets/icon/competition.png" alt="">
        <span>知识竞赛</span>
      </div>
    </div>
    <div class="choice_card">
      <div class="choice">
        <img src="../../../assets/icon/notice.png" alt="">
        <span>系统公告</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanetChoice"
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
  height: 70px;
  line-height: 70px;
}

.choice img{
  position: absolute;
  width: 30px;
  height: 30px;
  top: 20px;
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