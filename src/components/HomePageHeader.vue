<template>
  <div>
    <div id="homepageHeader">
      <div id="left">
        <div id="logo" @click="goToHomepage()"></div>
      </div>
      <div id="center">
        <div class="searchBar">
          <input type="text"
                 placeholder="请输入你想搜索的内容..."
                 v-model="searchContent"
                 @keyup.enter="searchplanet">
          <i class="el-icon-search"
             :style="'color:'+color"
             @mousedown="searchplanet"
             @mouseover="color = '#74D8BE'"
             @mouseleave="color = '#E4E7ED'"></i>
        </div>
      </div>
      <div id="right">
        <div id="icon1" class="icon" @click="goToPersonalPage"></div>
        <div id="icon2" class="icon" @click="showMessage"></div>
        <div id="icon3" class="icon" @click="showNotice"></div>
        <span>
        <el-badge v-model="messages.length" class="messagenumber" v-show="isShowMessageNumber && messages.length>0"></el-badge>
        </span>
      </div>
    </div>
    <div class="placeholder">
    </div>
    <el-dialog
        title="搜索结果"
        :visible.sync="isShowResult"
        class="searchresult"
    >
      <div class="none" v-show="isShowResult && planetResult.length==0">
        <el-empty description="暂无数据"></el-empty>
      </div>

      <div class="shortsearchResult" v-show="isShowResult && planetResult.length<=8 && planetResult.length>0" >
        <div class="result" v-for="item in planetResult" >
          <span class="planet_text" >星球：<img :src="item.planet.planetAvatar" class="planet_avatar">{{item.planet.planetName}}</span>
          <span style="margin-left:20px;">星球热度：{{item.planet.hot}}</span>
          <span style="margin-left:20px;">创建时间：{{item.planet.createTime}}</span>
          <el-button size="mini" type="primary" class="join_button" v-if="item.role!=null" @click="goinplanet(item.planet.planetCode,item.planet.planetName)">进入</el-button>
          <el-button size="mini" type="success" class="goin_button" v-else @click="joinplanet(item.planet.planetCode,item.planet.planetName)">加入</el-button>
          <el-divider></el-divider>
        </div>
      </div>

      <div class="longsearchResult" v-show="isShowResult && planetResult.length>8" style="height:495px;overflow-y: scroll" >
        <div class="result" v-for="item in planetResult" >
          <span class="planet_text" >星球：<img :src="item.planet.planetAvatar" class="planet_avatar">{{item.planet.planetName}}</span>
          <span style="margin-left:20px;">星球热度：{{item.planet.hot}}</span>
          <span style="margin-left:20px;">创建时间：{{item.planet.createTime}}</span>
          <el-button size="mini" type="primary" class="join_button" v-if="item.role!=null" @click="goinplanet(item.planet.planetCode)">进入</el-button>
          <el-button size="mini" type="success" class="goin_button" v-else @click="joinplanet(item.planet.planetCode)">加入</el-button>
          <el-divider></el-divider>
        </div>
      </div>

    </el-dialog>
    <el-drawer
        style="margin-top:50px;"
        :visible.sync="isShowNoticeDrawer"
        z-index="2">
      <h style="font-family: 'Microsoft YaHei';font-size:20px;font-weight: bold;margin-left:20px;">所有公告</h>
      <div class="allnotice" v-for="item in notices" >
        <p style="font-weight: bold;font-family: 'Microsoft YaHei';margin-left: 20px;">
          {{item.title}}</p>
        <p style="font-family: 'Microsoft YaHei';margin-left: 20px;">{{item.content}}</p>
        <el-divider></el-divider>
      </div>
    </el-drawer>

    <el-drawer
        style="margin-top:50px;"
        :visible.sync="isShowMessageDrawer"
        z-index="2">
      <h style="font-family: 'Microsoft YaHei';font-size:20px;font-weight: bold;margin-left:20px;">系统通知</h>
      <div class="allmessage" v-for="item in messages" >
        <p style="font-family: 'Microsoft YaHei';margin-left: 20px;">{{item.content}}</p>
        <el-switch
            class="readmessage"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="已读"
            inactive-text="未读"
            v-model="item.status"
            @change="readnotice(item.messageId,item.status)"
        >
        </el-switch>
        <el-divider></el-divider>
      </div>
    </el-drawer>
  </div>

</template>

<script>
import {getSearchPlanet, joinPlanet} from "@/api/homepage/planet"
import {getAllNotice} from "@/api/homepage/planet"
import {getMessage} from "@/api/homepage/planet"
import {setMessageStatus} from "@/api/homepage/planet";

export default {
  name: "HomePageHeader",
  data() {
    return {
      searchContent: '',
      isShowMessageNumber:true,
      isShowResult:false,
      planetResult:[],
      notices:[],
      isShowNoticeDrawer:false,
      isShowMessageDrawer:false,
      messages:[],
      isRead:false
    }
  },
  methods:{
    searchplanet(){
      if(this.searchContent!=''){
        this.isShowResult=!this.isShowResult
        getSearchPlanet(this.searchContent).then((res)=>{
          if(res.data.success === true){
            let data = res.data.data.planetList
            console.log(77847648478)
            console.log(data)
            this.planetResult=data
          }
        })
      }
    },
    showNotice(){
      this.isShowMessageDrawer=false
      this.isShowNoticeDrawer=!this.isShowNoticeDrawer
    },
    showMessage(){
      this.isShowNoticeDrawer=false
      this.isShowMessageDrawer=!this.isShowMessageDrawer
      this.isShowMessageNumber=false
    },
    readnotice(messageId,status){
      let mId=messageId
      let sta=0
      console.log(mId)
      if(status==true){
        sta=1
      }
      console.log(sta)
      setMessageStatus(mId,sta).then((res)=>{
        console.log(888888)
        console.log(res)
        getMessage().then((res)=>{
          if(res.data.success === true){
            let data = res.data.data.messageList
            console.log(data)
            this.messages=data
            console.log(this.messages)
          }
        })
      })
    },
    goToPersonalPage(){
      this.$router.push('/personal')
    },
    goToHomepage(){
      this.$router.push('/homepage')
    },
    goinplanet(planetCode,planetName){
      window.sessionStorage.setItem("planetCode",planetCode)
      window.sessionStorage.setItem("planetName",planetName)
      this.$router.push('/planet')
    },
    joinplanet(planetCode,planetName) {
      console.log(planetCode)
      this.$confirm('您确定加入该星球吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'primary'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '加入成功!'
        });
        joinPlanet(planetCode).then((res)=>{
          console.log(res)
          if(res.data.success){
            window.sessionStorage.setItem("planetCode",planetCode)
            window.sessionStorage.setItem("planetName",planetName)
            this.$router.push('/planet')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消加入'
        });
      });
    }
  },
  mounted(){
    getAllNotice().then((res)=>{
      if(res.data.success === true){
        let data = res.data.data.notices
        console.log(data)
        this.notices=data
        console.log(this.notices)
      }
    }),
    getMessage().then((res)=>{
      if(res.data.success === true){
        let data = res.data.data.messageList
        console.log(data)
        this.messages=data
        console.log(this.messages)
      }
    })
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
  background-image: url("../assets/icon/notice2.png");
}
.messagenumber{
  margin-left:125px;
  margin-top:-85px;
}
.readmessage{
  margin-left: 300px;
}
.el-divider--horizontal{
  margin-top:0px;
  margin-bottom: 0px;
}
.planet_avatar{
  border-radius: 50%;
  width:25px;
  height:25px;
  vertical-align:middle;
  margin-right:10px;
}
.planet_text{
  vertical-align: middle;
  line-height: 50px;
}
.join_button{
  margin-left: 10px;
}
.goin_button{
  margin-left:10px;
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
