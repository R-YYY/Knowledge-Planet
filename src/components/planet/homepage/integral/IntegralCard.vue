<template>
  <div style="display: flex">
    <div>
      <b class="ranking">{{item.rank}}</b>
    </div>
    <div class="info">
      <div class="name">{{item.userName}}</div>
      <div class="desc">{{item.desc}}</div>
    </div>
    <div>
      <img class="img" :src="item.avatar" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "IntegralCard",
  props: ['item'],
}
</script>

<style scoped>
.ranking{
  text-align: center;
  width: 35px;
  display: inline-block;
  height: 48px;
  line-height: 50px;
  font-size: 20px;
  color: #9A9191;
  margin-left: 10px;
}

.info{
  margin-left: 5px;
  width: 170px;
  height: 50px;
}

.name{
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #F5B767;
}

.desc{
  font-size: 10px;
  color: #aaa1a1;
}

.img{
  width: 40px;
  height: 40px;
  margin-top: 4px;
  border-radius: 50%;
  border: 4px solid #D3D2D2;
}
</style>