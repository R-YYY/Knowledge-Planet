<template>
  <div class="card">
    <div>
      <div class="name">{{competition.name}}</div>
      <div class="time">{{competition.time}}</div>
    </div>
    <div>
      <div class="duration">{{competition.duration}}</div>
    </div>
    <div class="btn">参加</div>

  </div>
</template>

<script>
export default {
  name: "CompetitionCard",
  props:["competition"],
}
</script>

<style scoped>
.card{
  display: flex;
  height: 60px;
  margin-left: 50px;
}

.name{
  font-weight: bold;
  width: 250px;
  height: 35px;
  line-height: 35px;
}

.time{
  width: 250px;
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  color: #6f6e6e;
}

.duration{
  width: 150px;
  height: 60px;
  line-height: 60px;
}

.btn{
  font-style: oblique;
  text-align: center;
  font-weight: bold;
  width: 60px;
  height: 30px;
  line-height: 30px;
  color: white;
  background-color: #fcc278;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>