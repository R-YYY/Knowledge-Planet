<template>
  <div id="register">
    <div class="register_card">
      <img class="logo" src="../../assets/login/zsxq.png" alt="">
      <div class="register_form">
        <el-form ref="registerForm" :model="userData" :rules="registerRules" label-width="80px" label-position="right">
          <el-form-item label="邮箱" class="input_item" prop="email">
            <el-input placeholder="请输入注册邮箱号" v-model="userData.email"></el-input>
          </el-form-item>
          <el-form-item label="验证码" class="input_item" prop="code">
            <el-input placeholder="请输入验证码" v-model="userData.code" style="width: 120px;margin-right: 15px"></el-input>
            <el-button type="primary" size="small" @click="sendCode">发送验证码</el-button>
          </el-form-item>
          <el-form-item label="用户名" class="input_item" prop="name">
            <el-input placeholder="请输入用户名" v-model="userData.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" class="input_item" prop="password">
            <el-input placeholder="请输入密码" v-model="userData.password" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="opt_area">
        <el-button type="primary" class="register_btn" @click="register">注册</el-button>
        <p class="login">已有账号？
          <router-link class="login_btn" :to="{name:'login'}">登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import {checkEmail, getVerificationCodeGet, registerPost} from "@/api/login/login";

export default {
  name: "RegisterView",
  data(){
    return{
      userData:{
        email:"",
        code:"",
        name:"",
        password:"",
      },
      count:'',
      registerRules:{
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        code:[
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        name:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          {min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    sendCode(){
      let msg = checkEmail(this.userData.email)
      if(msg !== "ok") {
        this.$message({message: msg, type: 'error'});
        return;
      }
      getVerificationCodeGet(this.userData.email).then(() => {
        this.$message({message: '验证码发送成功，请前往邮箱查看！', type: 'success'});
      }).catch(() => {
        this.$message({message: '验证码发送失败，请重试！', type: 'error'});
      })
    },

    register(){
      this.$refs.registerForm.validate((valid)=>{
        if(valid){
          registerPost(this.userData.email,this.userData.code,this.userData.name, this.$md5(this.userData.password)).then((res)=>{
            this.$message({message: res.data.message, type: res.data.success?'success':'error'});
            if(res.data.success) {
              this.$router.push({
                name:"success",
                params:{
                  message:"注册成功",
                },
              });
            }
          })
        }
        else {
          this.$message({message: '注册信息填写错误，请重试！', type: 'error'});
        }
      })
    },
  }
}
</script>

<style scoped>
#register{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login/registerBackground.jpg") center no-repeat;
  background-size: 100% 100%;
}

.register_card{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 420px;
  height: 480px;
  margin-left: -210px;
  margin-top: -240px;
  background: rgba(255,255,255,0.8);
  border-radius: 20px;
}

.logo{
  position: relative;
  top: 20px;
  left: 100px;
  width: 200px;
}

.register_form{
  position: relative;
  top: 15px;
}

.input_item{
  position: relative;
  left: 30px;
  top: 30px;
  width: 310px;
}

.opt_area{
  position: relative;
  top: 60px;
  left: 110px;
}

.register_btn{
  width: 230px;
}

.login{
  position: relative;
  font-size: 10px;
  left: 140px;
}

.login_btn{
  color: black;
}
</style>