<template>
  <div>
    <div id="header">
      <div id="left">
        <div id="logo"></div>
      </div>
      <div id="center">
        <el-input class="search"
                  v-model="searchContent"
                  placeholder="请输入内容">
        </el-input>
      </div>
      <div id="right">
        <div id="icon1" class="icon"></div>
        <div id="icon2" class="icon"></div>
        <div id="icon3" class="icon"></div>
      </div>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchContent: ''
    }
  }
}
</script>

<style scoped>
#header {
  position: fixed;
  z-index: 100;
  display: flex;
  top: 0;
  height: 50px;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 40px #dadada;
}
/*由于header的定位是fixed，需要一个占位div*/
.placeholder {
  height: 50px;
}
#left {
  width: 200px;
  min-width: 200px;
  margin-left: 150px;
}

#right {
  width: 200px;
  min-width: 200px;
  margin-right: 150px;
}

#center {
  line-height: 50px;
  text-align: center;
  flex: 1;
}

#logo {
  position: relative;
  background-image: url("../assets/zsxq.png");
  background-size: auto 100%;
  background-repeat: no-repeat;
  height: 80%;
  top: 10%;
}

/deep/ input {
  height: 35px;
  width: 60%;
  min-width: 200px;
  border-radius: 20px;
  border-color: #CECACA;
  background-image: url('../assets/icon/search.png');
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 98% center;
}

.icon {
  float: right;
  margin-top: 10px;
  margin-left: 20px;
  height: 30px;
  width: 30px;
  background-size: cover;
}

#icon1 {
  background-image: url("../assets/icon/my.png");
  height: 40px;
  width: 40px;
  margin-top: 5px;
}

#icon2 {
  background-image: url("../assets/icon/message.png");
}

#icon3 {
  background-image: url("../assets/icon/alert.png");
}
</style>
