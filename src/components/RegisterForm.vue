<template>
  <div class="register_area">
    <el-card shadow="always">
      <img class="login_and_register_logo_text" src="../assets/zsxq.png" alt="">
      <div class="register_form">
        <el-form label-width="70px" label-position="left">
          <el-form-item label="邮箱" class="login_and_register_input_item">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="验证码" class="login_and_register_input_item">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="密码" class="login_and_register_input_item">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="确认密码" class="login_and_register_input_item">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="register_opt_area">
        <span class="register_opt_register">
          <el-button type="primary" class="register_opt">发送验证码</el-button>
        </span>
        <span class="register_opt_register">
          <el-button type="primary" class="register_opt">注册</el-button>
        </span>
        <p class="register_opt_login_area">已有账号？
          <router-link class="register_opt_login" :to="{name:'login'}">登录</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RegisterForm"
}
</script>

<style>
.register_area{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  height: 500px;
  margin-left: -225px;
  margin-top: -250px;
}

.register_opt_area{
  position: relative;
  top: 30px;
  left: 40px;
}

.register_opt_register{
  position: relative;
  top: 20px;
  margin-left: 30px;
  margin-right: 20px;
}

.register_opt_login_area{
  position: relative;
  left: 205px;
  top: 30px;
  font-size: 10px;
  margin-bottom: 70px;
}

.register_opt_login{
  font-size: 10px;
  margin-bottom: 20px;
  color: #74D8BE;
}

.register_opt{
  width: 115px;
}
</style>