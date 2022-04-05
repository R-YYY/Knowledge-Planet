<template>
  <div class="login_area">
    <el-card shadow="always">
      <img class="login_and_register_logo_text" src="../assets/zsxq.png" alt="">
      <div class="login_form">
        <el-form>
          <el-form-item label="账号" class="login_and_register_input_item">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="密码" class="login_and_register_input_item">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="login_opt_area">
        <p class="login_opt_forget">
          <router-link class="login_opt_forget" :to="{name:'register'}">忘记密码？</router-link>
        </p>
        <el-button type="primary" class="login_opt_login">登录</el-button>
        <p class="login_opt_register_area">没有账号？
          <router-link class="login_opt_register" :to="{name:'register'}">点击注册</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LoginForm"
}
</script>

<style>
.login_area{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  height: 450px;
  margin-left: -225px;
  margin-top: -225px;
}

.login_and_register_logo_text{
  position: relative;
  top: 20px;
  left: 105px;
  width: 200px;
}

.login_and_register_input_item{
  position: relative;
  left: 40px;
  top: 30px;
  width: 330px;
}

.login_opt_area{
  position: relative;
  top: 15px;
  left: 40px;
}

.login_opt_login{
  width: 330px;
}

.login_opt_forget,.login_opt_register{
  font-size: 10px;
  margin-bottom: 40px;
  color: #74D8BE;
}

.login_opt_register_area{
  font-size: 10px;
  margin-bottom: 40px;
}

</style>