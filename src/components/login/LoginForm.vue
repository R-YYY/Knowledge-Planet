<template>
  <div class="login_area">
    <img class="login_and_register_logo_text" src="../../assets/zsxq.png" alt="">
    <div class="login_form">
      <el-form>
        <el-form-item  label="邮箱" class="login_and_register_input_item" prop="email">
          <el-input v-model="email" placeholder="请输入登录邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="login_and_register_input_item">
          <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="login_opt_area">
      <p class="login_opt_forget" @click="toFindPsd">忘记密码？</p>
      <el-button type="primary" class="login_opt_login" @click="login">登录</el-button>
      <p class="login_opt_register_area">没有账号？
        <router-link class="login_opt_register" :to="{name:'register'}">点击注册</router-link></p>
    </div>
    <div>
      <el-input v-model="newPassword" placeholder="placeholder"></el-input>
      <button @click="update">修改密码</button>
    </div>
  </div>
</template>

<script>
import {checkEmail, loginPost, updatePassword} from "@/api/login/login";
export default {
  name: "LoginForm",
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
        }
      })
    },

    toFindPsd(){
      this.$emit('changeModel',true);
    },

    update(){
      console.log(this.$md5(this.newPassword),this.$md5(this.password))
      updatePassword(this.$md5(this.password),this.$md5(this.newPassword)).then((res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<style>
.login_area{
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

.login_form{
  position: relative;
  left: 20px;
}

.login_and_register_logo_text{
  position: relative;
  top: 20px;
  left: 100px;
  width: 200px;
}

.login_and_register_input_item{
  position: relative;
  left: 30px;
  top: 30px;
  width: 310px;
}

.login_opt_area{
  position: relative;
  top: 15px;
  left: 50px;
}

.login_opt_login{
  width: 310px;
}

.login_opt_forget,.login_opt_register{
  font-size: 10px;
  margin-bottom: 40px;
  color: black;
  text-decoration:underline black;
  cursor:pointer;
}

.login_opt_register_area{
  font-size: 10px;
}

</style>
