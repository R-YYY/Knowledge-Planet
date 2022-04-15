<template>
  <div id="findPassword">
    <div class="find_psd_card">
      <img class="logo" src="../../assets/login/zsxq.png" alt="">
      <div class="form">
        <el-form :model="userData" :rules="findRules" label-width="70px" label-position="right">
          <el-form-item  label="邮箱" class="input_item" prop="email">
            <el-input v-model="userData.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="验证码" class="input_item" prop="code">
            <el-input v-model="userData.code" placeholder="请输入验证码" style="width: 120px;margin-right: 25px"></el-input>
            <el-button type="primary" size="small" @click="sendCode">发送验证码</el-button>
          </el-form-item>
          <el-form-item label="新密码" class="input_item" prop="password">
            <el-input v-model="userData.password" placeholder="请输入新密码" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="opt_area">
        <el-button type="primary" class="change_psd_btn" @click="changePsd">修改密码</el-button><br>
        <span class="register">没有账号？
        <router-link class="register_btn" :to="{name:'register'}">点击注册</router-link></span>
        <span class="login">已有账号？
        <span class="login_btn" @click="toLogin">登录</span></span>
      </div>
    </div>
  </div>
</template>

<script>
import {checkEmail, getVerificationCodeGet} from "@/api/login/login";

export default {
  name: "FindPasswordView",
  data(){
    return{
      userData:{
        email:"",
        code:"",
        password:"",
      },
      findRules:{
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        code:[
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur'}
        ]
      },
    }
  },
  methods:{
    changePsd(){

    },

    sendCode() {
      let msg = checkEmail(this.userData.email)
      if(msg !== "ok") {
        this.$message({message: msg, type: 'error'});
        return;
      }
      getVerificationCodeGet(this.userData.email).then((res) => {
        this.$message({message: '验证码发送成功，请前往邮箱查看！', type: 'success'});
      }).catch(() => {
        this.$message({message: '验证码发送失败，请重试！', type: 'error'});
      })
    },

    toLogin(){
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>
#findPassword{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login/loginBackground.jpg") center no-repeat;
  background-size: 100% 100%;
}

.find_psd_card{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 420px;
  height: 430px;
  margin-left: -210px;
  margin-top: -215px;
  background: rgba(255,255,255,0.8);
  border-radius: 20px;
}

.logo{
  position: relative;
  top: 20px;
  left: 100px;
  width: 200px;
}

.form{
  position: relative;
  top: 20px;
}

.input_item{
  position: relative;
  left: 30px;
  top: 30px;
  width: 310px;
}

.opt_area{
  position: relative;
  top: 70px;
  left: 100px;
}

.change_psd_btn{
  width: 240px;
}

.register{
  position: relative;
  top: 10px;
  font-size: 10px;
}

.register_btn{
  color: black;
}

.login{
  position: relative;
  top: 10px;
  left: 40px;
  font-size: 10px;
}

.login_btn{
  text-decoration:underline black;
  cursor:pointer;
}
</style>