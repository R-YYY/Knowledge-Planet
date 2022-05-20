<template>
  <div id="score_card">
    <h2>你已成功完成竞赛！</h2>
    <p>得分 {{score}}</p>
    <el-button class="btn" round @click="$router.push('/planet/competition')">返回竞赛主页</el-button>
  </div>
</template>

<script>
export default {
  name: "ScoreCard",
  props:['score'],

}
</script>

<style scoped>
#score_card {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 300px;
  width: 300px;
  border-radius: 16px;
  text-align: center;
  background-color: #E2F5F0;
  color: #646464;
  border: 1px solid #919191;
  /*box-shadow: 0 0 12px #919191;*/
}

#score_card h2 {
  font-size: 24px;
  line-height: 70px;
}

#score_card p {
  margin-top: 40px;
  font-size: 22px;
  font-weight: bold;
}

.btn{
  margin-top: 40px;
}
</style>
