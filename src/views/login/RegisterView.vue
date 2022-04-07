<template>
  <div id="register">
    <RegisterForm></RegisterForm>
  </div>
</template>

<script>
import RegisterForm from "@/components/login/RegisterForm";
export default {
  name: "RegisterView",
  components: {
    RegisterForm,
  }
}
</script>

<style>
#register{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/registerBackground.jpg") center no-repeat;
  background-size: 100% 100%;
}
</style>