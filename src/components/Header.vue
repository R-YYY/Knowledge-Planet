<template>
  <div>
    <div id="header">
      <div id="left">
        <div id="logo"></div>
      </div>
      <div id="center">
        <slot></slot>
        <div class="searchBar" v-show="searchVisible">
          <input type="text"
                 placeholder="请输入你想搜索的内容..."
                 v-model="searchContent"
                 @keyup.enter="search">
          <i class="el-icon-search"
             :style="'color:'+color"
             @click="search"
             @mouseover="color = '#74D8BE'"
             @mouseleave="color = '#E4E7ED'"></i>
        </div>

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
      searchContent: '',
      color: 'color:#E4E7ED',
      screenWidth: document.body.clientWidth,
      mode: true,
      searchVisible: true
    }
  },
  mounted() {
    const that = this
    window.addEventListener('resize', function () {
      window.screenWidth = document.body.clientWidth
      that.screenWidth = window.screenWidth
    })
    this.screenChange()
  },
  methods: {
    search(e) {
      console.log(e)
    },
    screenChange() {
      let that = this
      this.timer = true
      setTimeout(function () {
        if (that.screenWidth < 930 && that.searchVisible) {
          that.searchVisible = false
        } else if (that.screenWidth >= 930 && !that.searchVisible) {
          that.searchVisible = true
        }
        if (that.screenWidth < 1200 && that.mode) {
          that.mode = !that.mode
          document.querySelector('#left').style.marginLeft = "20px"
          document.querySelector('#right').style.marginRight = "20px"
        } else if (that.screenWidth >= 1200 && !that.mode) {
          that.mode = !that.mode
          document.querySelector('#left').style.marginLeft = "150px"
          document.querySelector('#right').style.marginRight = "150px"
        }
        that.timer = false
      }, 300)
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.screenChange()
      }
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
  width: 120px;
  min-width: 120px;
  margin-left: 150px;
}

#right {
  width: 160px;
  min-width: 160px;
  margin-right: 150px;
}

#center {

  position: relative;
  text-align: right;
  flex: 1;
  min-width: 320px;
}

#logo {
  position: relative;
  background-image: url("../assets/login/zsxq.png");
  background-size: auto 100%;
  background-repeat: no-repeat;
  height: 80%;
  top: 10%;
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


.searchBar {
  margin-top: 7px;
  display: inline-block;
  line-height: 30px;

}

input {
  outline: none;
  padding-left: 13px;
  height: 30px;
  width: 250px;
  border-radius: 42px;
  border: 2px solid #E4E7ED;
  /*background: #F9F0DA;*/
  transition: .3s linear;
  float: right;
}

input:focus {
  width: 300px;
  border: 2px solid #74D8BE;
}

i {
  cursor: pointer;
  position: absolute;
  color: #E4E7ED;
  background: none;
  margin-right: 10px;
  right: 0;
  line-height: 36px;
}

</style>
