<template>
  <div id="login">
    <div class="login_card">
      <img class="logo" src="../../assets/login/zsxq.png" alt="">
      <div class="login_form">
        <el-form label-width="60px" label-position="right">
          <el-form-item  label="账号" class="input_item" prop="email">
            <el-input v-model="adminId" placeholder="请输入管理员账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" class="input_item">
            <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="验证码" class="input_item">
            <div class="code_area">
              <el-input v-model="code" placeholder="请输入验证码" class="code_input"></el-input>
              <div @click="refreshCode" style="cursor: pointer">
                <IdentifyCode
                    :identifyCode="identifyCode"
                    :backgroundColorMin="255"
                    :contentWidth="100"
                    :contentHeight="40"
                    :fontSizeMin="40"
                />
              </div>
            </div>
            <span class="code_tip">点击图片更换验证码</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="opt_area">
        <el-button type="primary" class="login_btn" @click="login">登录</el-button><br>
      </div>
      <div class="admin" @click="toLogin">
        <el-tooltip content="切换至普通用户登录" effect="light">
          <img src="../../assets/admin/user.png" alt="">
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import {adminLogin, checkEmail, loginPost} from "@/api/login/login";
import IdentifyCode from "@/components/login/IdentifyCode";

export default {
  name: "AdminLoginView",
  components: {IdentifyCode},
  data(){
    return{
      adminId:"",
      password:"",
      code:"",
      //生成验证码的字符范围
      // identifyCodes: "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
      identifyCodes: "0123456789",
      //生成的验证码
      identifyCode: "",
    }
  },
  methods:{
    login(){
      // console.log(this.$md5(this.password))
      adminLogin(this.adminId,this.$md5(this.password)).then((res)=>{
        console.log(res.data)
        this.$message({message: res.data.message, type: res.data.success?'success':'error'});
        if(res.data.success){
          window.sessionStorage.setItem("token",res.data.data.token);
          this.$router.push("/admin/systemNotice")
        }
      }).catch(()=>{
        this.$message({message: "系统错误" , type: 'error'});
      })
    },

    toLogin(){
      this.$router.push("/login")
    },

    //回车登录
    keyDown(e) {
      if (e.keyCode === 13) {
        this.login();
      }
    },

    //生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    //刷新验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //生成验证码，l为生成验证码的长度
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        //随机字符串拼接
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  created() {
    window.addEventListener('keydown', this.keyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyDown)
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
  left: 20px;
  top: 20px;
  margin-top: 25px;
  width: 300px;
}

.opt_area{
  position: relative;
  top: 15px;
  left: 100px;
}

.forget_btn{
  font-size: 10px;
  margin-bottom: 40px;
  color: black;
  text-decoration:underline black;
  cursor:pointer;
}

.login_btn{
  width: 240px;
  margin-bottom: 10px;
}

.register{
  margin-left: 70px;
  font-size: 10px;
}

.register_btn{
  font-size: 10px;
  margin-bottom: 40px;
  color: black;
  text-decoration:underline black;
  cursor:pointer;
}

.code_input{
  width: 120px;
  margin-right: 15px
}

.code_area{
  display: flex;
  height: 40px;
}

.code_tip{
  font-size: 10px;
  margin-left: 130px;
}

.admin{
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50% 0 20px 0;
}

.admin img{
  margin-left: 10px;
  margin-top: 10px;
  width: 20px;
  height: 20px;
}
</style>