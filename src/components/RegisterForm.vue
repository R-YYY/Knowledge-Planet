<template>
  <div class="register_area">
    <el-card shadow="always">
      <img class="login_and_register_logo_text" src="../assets/zsxq.png" alt="">
      <div class="register_form">
        <el-form>
          <el-form-item label="用户名" class="login_and_register_input_item">
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
        <el-button type="primary" class="register_opt_register">注册</el-button>
        <p class="register_opt_login_area">已有账号？
          <router-link class="register_opt_login" :to="{name:'login'}">点击登录</router-link></p>
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
  top: 15px;
  left: 40px;
}

.register_opt_register{
  width: 330px;
}
</style>