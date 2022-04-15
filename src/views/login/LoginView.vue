<template>
  <div id="login">
    <div class="login_card">
      <img class="logo" src="../../assets/login/zsxq.png" alt="">
      <div class="login_form">
        <el-form>
          <el-form-item  label="邮箱" class="input_item" prop="email">
            <el-input v-model="email" placeholder="请输入登录邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" class="input_item">
            <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="opt_area">
        <p class="forget_btn" @click="toFindPsd">忘记密码？</p>
        <el-button type="primary" class="login_btn" @click="login">登录</el-button>
        <p class="register">没有账号？
          <router-link class="register_btn" :to="{name:'register'}">点击注册</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import {checkEmail, loginPost} from "@/api/login/login";

export default {
  name: "LoginView",
  data(){
    return{
      email:"",
      password:"",
      newPassword:"",
    }
  },
  methods:{
    login(){
      let msg = checkEmail(this.email)
      if(msg !== "ok") {
        this.$message({message: msg, type: 'error'});
        return;
      }
      loginPost(this.email,this.$md5(this.password)).then((res)=>{
        this.$message({message: res.data.message, type: res.data.success?'success':'error'});
        if(res.data.success){
          window.sessionStorage.setItem("email",this.email);
          window.sessionStorage.setItem("token",res.data.data.token);
          this.$router.push({name:'homepage'});
        }
      }).catch(()=>{
        this.$message({message: "系统错误" , type: 'error'});
      })
    },

    toFindPsd(){
      this.$router.push("/findPassword");
    },
  }
}
</script>

<style scoped>
#login{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login/loginBackground.jpg") center no-repeat;
  background-size: 100% 100%;
}

.login_card{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 420px;
  height: 450px;
  margin-left: -210px;
  margin-top: -225px;
  background: rgba(255,255,255,0.8);
  border-radius: 20px;
}

.logo{
  position: relative;
  top: 20px;
  left: 100px;
  width: 200px;
}

.login_form{
  position: relative;
  left: 20px;
}

.input_item{
  position: relative;
  left: 30px;
  top: 30px;
  width: 310px;
}

.opt_area{
  position: relative;
  top: 15px;
  left: 50px;
}

.forget_btn{
  font-size: 10px;
  margin-bottom: 40px;
  color: black;
  text-decoration:underline black;
  cursor:pointer;
}

.login_btn{
  width: 310px;
}

.register{
  font-size: 10px;
}

.register_btn{
  font-size: 10px;
  margin-bottom: 40px;
  color: black;
  text-decoration:underline black;
  cursor:pointer;
}
</style>