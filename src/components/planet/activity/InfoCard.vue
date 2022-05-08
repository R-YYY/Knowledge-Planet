<template>
  <div id="card">
    <div id="content">
      <div id="myInfo">
        <div id="container">
          <span class="myAvatar" :style="{backgroundImage: 'url('+avatar+')'}"></span>
        </div>
        <div id="name">{{ username }}</div>
      </div>
      <div id="data">
        <span class="font">截止目前，您已</span>
        <span class="mainData">
          <span class="text"><span style="color: #4be8a1">发布</span>了{{createNum}}个活动</span>
          <span class="text"><span style="color: #6393ea">参与</span>了{{joinNum}}个活动</span>
        </span>
      </div>
    </div>
    <div id="footer">发布或参与活动时，请遵守平台规定!</div>
  </div>
</template>

<script>
import {getActivityNum} from "@/api/planet/activity";

export default {
  name: "InfoCard",
  data() {
    return {
        avatar: window.sessionStorage.getItem('avatar'),
        username:window.sessionStorage.getItem('userName'),
        createNum:0,
        joinNum:0,
    }
  },
  created() {
    getActivityNum().then((res)=>{
      this.createNum = res.data.data.createNum
      this.joinNum = res.data.data.joinNum
    }).catch((err)=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
#card {
  height: 120px;
  width: 300px;
  min-width: 300px;
  border-radius: 12px;
  box-shadow: 0 0 12px #c7c7c7;
}

#content {
  padding: 0 10px 0 0;
  height: 85px;
  line-height: 85px;
  display: flex;
}

#myInfo {
  width: 90px;
  height: 85px;
  display: flex;
  flex-direction: column;
}

#container {
  height: 50px;
  line-height: 30px;
  text-align: center;
}

.myAvatar {
  margin-top: 15px;
  display: inline-block;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  background-color: #00c8bf;
}

#name {
  text-align: center;
  padding: 0 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
  line-height: 30px;
}
#data{
  flex: 1;
  display: flex;
  line-height: 20px;
}
.font{
  flex: 1;
  font-size: 12px;
  display: inline-block;
  height: 85px;
  line-height: 85px;
}
.text{
  flex: 1;
  line-height: 30px;
}
.mainData{
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  font-size: 12px;
  height: 60px;
  line-height: 60px;
}
#footer {
  height: 35px;
  text-align: center;
  font-weight: bold;
}
</style>
