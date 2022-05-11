<template>
  <div class="com_record_item">
    <img class="picture" :src="record.picture" alt="">
    <div>
      <div class="title">{{record.title}}</div>
      <div class="time">{{record.startTime}} ~ {{record.endTime}}</div>
    </div>
    <div class="score">{{record.score}}</div>
    <el-button type="text">查看</el-button>
  </div>
</template>

<script>
export default {
  name: "ComRecordItem",
  props:["record"],

}
</script>

<style scoped>
.com_record_item{
  display: flex;
}

.picture{
  width: 100px;
  height: 60px;
  margin: 5px 25px;
}

.title{
  width: 400px;
  font-weight: bold;
  padding-top: 10px;
}

.time{
  font-size: 14px;
  margin-top: 10px;
}

.score{
  width: 165px;
  margin-top: 25px;
  height: 20px;
}
</style>