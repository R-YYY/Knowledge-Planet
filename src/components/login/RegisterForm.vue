<template>
  <div class="register_area">
      <img class="login_and_register_logo_text" src="../../assets/zsxq.png" alt="">
      <div class="register_form">
        <el-form ref="registerForm" :model="userData" :rules="registerRules" label-width="80px" label-position="right">
          <el-form-item label="邮箱" class="login_and_register_input_item" prop="email">
            <el-input placeholder="请输入注册邮箱号" v-model="userData.email"></el-input>
          </el-form-item>
          <el-form-item label="验证码" class="login_and_register_input_item" prop="code">
            <el-input placeholder="请输入验证码" v-model="userData.code" style="width: 120px;margin-right: 15px"></el-input>
            <el-button type="primary" size="small" @click="sendCode">发送验证码</el-button>
          </el-form-item>
          <el-form-item label="用户名" class="login_and_register_input_item" prop="name">
            <el-input placeholder="请输入用户名" v-model="userData.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" class="login_and_register_input_item" prop="password">
            <el-input placeholder="请输入密码" v-model="userData.password" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="register_opt_area">
        <el-button type="primary" class="register_opt_register" @click="register">注册</el-button>
        <p class="register_opt_login_area">已有账号？
          <router-link class="register_opt_login" :to="{name:'login'}">登录</router-link></p>
      </div>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data(){
    return{
      userData:{
        email:"",
        code:"",
        name:"",
        password:""
      },
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
      if(this.userData.email.trim() === ""){
        this.$message({message: '请填写邮箱！', type: 'error'});
        return;
      }
      if(!/^[a-zA-Z0-9_\-]{2,}@[a-zA-Z0-9_\-]{2,}(\.[a-zA-Z0-9_\-]+){1,2}$/.test(this.userData.email)){
        this.$message({message: '邮箱格式错误，请重新填写！', type: 'error'});
        return;
      }
      this.$axios({
        url:"/getVerificationCode/"+this.userData.email,
        method:"get",
      })
      .then(()=>{
        this.$message({message: '验证码发送成功，请前往邮箱查看！', type: 'success'});
      })
      .catch(()=>{
        this.$message({message: '验证码发送失败，请重试！', type: 'error'});
      })
    },

    register(){
      this.$refs.registerForm.validate((valid)=>{
        if(valid){
          let data = new FormData();
          data.append("email",this.userData.email);
          data.append("verificationCode",this.userData.code);
          data.append("nickName",this.userData.name);
          data.append("password",this.$md5(this.userData.password));
          this.$axios({
            url:"/register",
            method:"post",
            data:data
          })
          .then((res)=>{
            this.$message({message: res.data.message, type: res.data.success?'success':'error'});
            if(res.data.success) {
              this.$router.push("/login");
            }
          })
        }
        else {
          this.$message({message: '注册信息填写错误，请重试！', type: 'error'});
        }
      })
    }
  }
}
</script>

<style>
.register_area{
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

.register_form{
  position: relative;
  top: 15px;
}

.register_opt_area{
  position: relative;
  top: 60px;
  left: 110px;
}

.register_opt_register{
  width: 230px;
}

.register_opt_login_area{
  position: relative;
  font-size: 10px;
  left: 140px;
}

.register_opt_login{
  color: black;
}

</style>