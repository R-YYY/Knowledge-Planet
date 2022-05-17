<template>
  <div id="information">
    <div class="admindata">

      <div class="header">
        <el-input v-model="inputuser" placeholder="请输入内容" class="search_input"></el-input>
        <el-button type="primary" icon="el-icon-search" class="search_button">搜索</el-button>
        <div class="infordivide">
          <el-divider></el-divider>
        </div>
      </div>

      <div class="information" v-model="information">
        <div class="avatar">
          <p class="avatar_text">头像:</p>
          <img src="../../../assets/homepageimg/1.jpg" class="avatar_jpg">
        </div>

        <div class="content">
          <div class="name">
            <span>昵称：</span><span>{{ information.name }}</span>
          </div>
          <div class="mail">
            <span>邮箱：</span><span>{{ information.mail }}</span>
          </div>
          <div class="id">
            <span>ID：</span><span>{{ information.id }}</span>
          </div>
        </div>
      </div>

      <div class="change">
        <div class="changenot">
          <el-switch
              style="display: block"
              v-model="isNot"
              inactive-color="#13ce66"
              active-color="#ff4949"
              active-text="禁用"
              inactive-text="正常">
          </el-switch>
        </div>
      </div>

      <div class="loginrecord">
        <div class="loginrecord_text">登录记录</div>
        <div v-if="records.length<=4" class="shortrecord">
          <div v-for="item in records">
            <el-tag class="record_tag">
              <span>
                登录时间：{{item.time}}
              </span>
              <span style="margin-left: 50px;">
                登录身份：{{item.status}}
              </span>
            </el-tag>
          </div>
        </div>

        <div v-else class="longrecord" style="overflow-y: scroll">
          <div v-for="item in records">
            <el-tag class="record_tag">
              <span>
                登录时间：{{item.time}}
              </span>
              <span style="margin-left: 50px;">
                登录身份：{{item.status}}
              </span>
            </el-tag>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      inputuser:'',
      information: {
        avatar: '',
        name: '11',
        mail:'2926204175@qq.com',
        id: '1952455',
        coverge: {}
      },
      isAdmin:false,
      isNot:false,
      records:[
        {
          time:'202120',
          status:'普通用户'
        },
        {
          time:'202120',
          status:'普通用户'
        },
        {
          time:'202120',
          status:'管理员'
        },
        {
          time:'202120',
          status:'管理员'
        },
        {
          time:'202120',
          status:'管理员'
        },
        {
          time:'202120',
          status:'管理员'
        },
        {
          time:'202120',
          status:'管理员'
        },
        {
          time:'202120',
          status:'管理员'
        }

      ]
    }
  },
  methods: {

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
  margin-top:80px;
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
  background-color: #99ccff;
  margin-left:40px;
  margin-top: 5px;
}
.longrecord{
  position: absolute;
  width: 605px;
  height: 200px;
  border-radius: 16px;
  box-shadow: 0 0 5px #dcdcdc;
  background-color: #99ccff;
  margin-left:40px;
  margin-top: 5px;
}
.record_tag{
  margin-left: 20px;
  margin-top:5px;
  margin-bottom: 5px;
  width:300px;
}
</style>