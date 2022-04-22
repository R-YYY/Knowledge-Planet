<template>
  <div>
    <div id="homepageHeader">
      <div id="left">
        <div id="logo"></div>
      </div>
      <div id="center">
        <el-input class="search"
                  style="position: relative"
                  v-model="searchContent"
                  placeholder="请输入内容"
                  @keyup.enter.native="searchplanet"
                  @blur="isShowResult=false"
        >
        </el-input>
        <div class="searchResult" v-show="isShowResult">
          <div class="result" v-for="item in planetResult" >
            <span style="margin-top:20px;">星球名字：{{item.planetName}}</span>
            <span style="margin-left:50px;">星球热度：{{item.hot}}</span>
          </div>
        </div>
      </div>
      <div id="right">
        <div id="icon1" class="icon"></div>
        <div id="icon2" class="icon"></div>
        <div class="noticeicon" @click="showNotice()">
          <div id="icon3" class="icon"></div>
          <el-badge value="New" class="noticenumber" v-show="isShowNoticeNumber"></el-badge>
        </div>
      </div>
    </div>
    <div class="placeholder">
    </div>
    <el-drawer
        style="margin-top:50px;"
        :visible.sync="isShowNoticeDrawer"
        z-index="2">
      <h style="font-family: 'Microsoft YaHei';font-size:20px;font-weight: bold;margin-left:20px;">系统通知</h>
      <div class="allnotice" v-for="item in notices" >
        <p style="font-weight: bold;font-family: 'Microsoft YaHei';margin-left: 20px;">{{item.title}}</p>
        <p style="font-family: 'Microsoft YaHei';margin-left: 20px;">{{item.content}}</p>
        <el-divider></el-divider>
      </div>
    </el-drawer>
  </div>

</template>

<script>
import {getSearchPlanet} from "@/api/homepage/planet"
import {getAllNotice} from "@/api/homepage/planet"
export default {
  name: "HomePageHeader",
  data() {
    return {
      searchContent: '',
      isShowNoticeNumber:true,
      isShowResult:false,
      planetResult:[],
      notices:[],
      isShowNoticeDrawer:false
    }
  },
  methods:{
    searchplanet(){
      this.isShowResult=!this.isShowResult
      getSearchPlanet(this.searchContent).then((res)=>{
        console.log(1)
        if(res.data.success === true){
          let data = res.data.data.planetList
          console.log(data)
          console.log(123456789)
          this.planetResult=data
        }
      })
    },
    showNotice(){
      this.isShowNoticeDrawer=!this.isShowNoticeDrawer
      this.isShowNoticeNumber=false
      getAllNotice().then((res)=>{
        if(res.data.success === true){
          let data = res.data.data.notices
          console.log(data)
          console.log(222222)
          this.notices=data
          console.log(this.notices)
        }
      })
    }

  },
  mounted(){

  }
}
</script>

<style scoped>
#homepageHeader {
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
  overflow: hidden;
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
  background-image: url("../assets/login/zsxq.png");
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
.searchResult{
  width:505px;
  text-align:left;
  margin-left:165px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
  background-color:whitesmoke;
  position:absolute;
}
.noticenumber{
  margin-left:75px;
  margin-top:-65px;
}
</style>
