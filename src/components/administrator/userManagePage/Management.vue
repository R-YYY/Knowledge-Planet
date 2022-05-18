<template>
  <div id="information">
    <div class="admindata">

      <div class="header">
        <el-input v-model="inputuser" placeholder="请输入用户的昵称" class="search_input"></el-input>
        <el-button type="primary" icon="el-icon-search" class="search_button" @click="search">搜索</el-button>
        <div class="infordivide">
          <el-divider></el-divider>
        </div>
      </div>

      <div class="none">
        <el-empty description="暂无数据" v-show="!isUserInformation"></el-empty>
      </div>

      <div class="information" v-model="information" v-show="isUserInformation">
        <div class="avatar">
          <p class="avatar_text">头像:</p>
          <img :src="information.avatar" class="avatar_jpg">
        </div>

        <div class="content">
          <div class="name">
            <span>昵称：</span><span>{{ information.userName }}</span>
          </div>
          <div class="mail">
            <span>邮箱：</span><span>{{ information.email }}</span>
          </div>
          <div class="id">
            <span>ID：</span><span>{{ information.userId }}</span>
          </div>
        </div>
      </div>

      <div class="change" v-show="isUserInformation">
        <div class="changenot">
          <el-switch
              style="display: block"
              v-model="information.isNot"
              inactive-color="#13ce66"
              active-color="#ff4949"
              active-text="禁用"
              inactive-text="正常"
              @change="changestatus()">
          </el-switch>
        </div>
      </div>

      <div class="loginrecord" v-show="isUserInformation">
        <div class="loginrecord_text">登录记录</div>
        <div v-if="logs.length<=4" class="shortrecord">
          <div v-for="item in logs">
            <el-tag class="record_tag">
              <span>
                登录时间：{{item.createTime}}
              </span>
              <span style="margin-left: 50px;">
                登录浏览器：{{item.browser}}
              </span>
            </el-tag>
          </div>
        </div>

        <div v-else class="longrecord" style="overflow-y: scroll">
          <div v-for="item in logs">
            <el-tag class="record_tag">
              <span>
                登录时间：{{item.createTime}}
              </span>
              <span style="margin-left: 50px;">
                登录浏览器：{{item.browser}}
              </span>
            </el-tag>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
import {changeUserStatus} from "@/api/admin/manage";
import {searchUser} from "@/api/admin/manage";
import {getLoginLogByUserId} from "@/api/admin/manage";

export default {
  data() {
    return {
      inputuser:'',
      information: {
        userId:'',
        userName:'',
        email:'',
        avatar:'',
        status:'',
        isNot:'',
      },
      logId:'',
      logs:[],
      isUserInformation:false,
    }
  },
  methods: {
    search(){
      let name=this.inputuser
      searchUser(name).then((res)=>{
        if(res.data.success === true){
          let data=res.data.data.userList
          console.log(data)
          if(data.length==1){
            this.information.userId=data[0].userId
            this.information.email=data[0].email
            this.information.userName=data[0].userName
            this.information.status=data[0].status
            this.information.avatar=data[0].avatar
            this.isUserInformation=true
            this.logId=this.information.userId
            console.log(11448645)
            console.log(data[0].status)
            if(this.information.status==1){
              this.information.isNot=true
            }
            else{
              this.information.isNot=false
            }
            getLoginLogByUserId(this.logId).then((res)=>{
              if(res.data.success === true){
                console.log(998742754)
                let data=res.data.data
                console.log(data)
                this.logs=data.loginLogList
                console.log(this.logs)
              }
            })
          }
          else{
            this.isUserInformation=false
          }
        }
      })
    },

    changestatus(){
      console.log(this.information.isNot)
      let userstatus=1
      console.log(111)
      if(this.information.isNot==false){
        userstatus=0
      }
      console.log(userstatus)
      let userId=this.information.userId
      changeUserStatus(userId,userstatus).then((res)=>{
        if(res.data.success === true){
          console.log(res)
          console.log(userstatus)
        }
      })
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.admindata {
  position: absolute;
  width: 700px;
  height: 560px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
  background-color: #e5ffff;
}

.header {
  margin-top: 10px;
  position: absolute;
}

.information{
  margin-top:-80px;
  display:flex;
  align-items: center;
}

.infordivide {
  width: 700px;
}

.avatar_text {
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left: 40px;
}

.avatar_jpg {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-left: 100px;
  margin-top: -40px;
}

.name {
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left: 40px;
  margin-top: 20px;
  background-color: #99ffff;
  box-shadow: 0 0 10px #dcdcdc;
  width: 400px;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left: 5px;
}

.mail {
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left: 40px;
  margin-top: 20px;
  background-color: #99ffff;
  box-shadow: 0 0 10px #dcdcdc;
  width: 400px;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left: 5px;
}

.id {
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left: 40px;
  margin-top: 20px;
  background-color: #99ffff;
  box-shadow: 0 0 10px #dcdcdc;
  width: 400px;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left: 5px;
}
.search_input{
  margin-top:10px;
  margin-left:40px;
  width:490px;
}
.search_button{
  margin-left:25px;
}

.el-divider--horizontal{
  margin-top: 10px;
}
.change{
  display: flex;
  margin-left:10px;
  margin-top:20px;
}
.changenot{
  margin-left:30px;
}

.loginrecord_text{
  font-weight: bold;
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left:40px;
  margin-top: 25px;
}
.shortrecord{
  position: absolute;
  width: 605px;
  height: 200px;
  border-radius: 16px;
  box-shadow: 0 0 5px #dcdcdc;
  background-color: white;
  margin-left:40px;
  margin-top: 5px;
}
.longrecord{
  position: absolute;
  width: 605px;
  height: 200px;
  border-radius: 16px;
  box-shadow: 0 0 5px #dcdcdc;
  background-color: white;
  margin-left:40px;
  margin-top: 5px;
}
.record_tag{
  margin-left: 20px;
  margin-top:5px;
  margin-bottom: 5px;
  width:360px;
}
.none{
  margin-left:0px;
  margin-top:150px;
}
</style>