<template>
  <div id="login">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  name: "LoginView",
  components:{
    LoginForm,
  }
}
</script>

<style>
#login{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/loginBackground.jpg") center no-repeat;
}

</style>