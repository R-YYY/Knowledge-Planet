<template>
  <div id="register">
    <RegisterForm></RegisterForm>
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm";
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
  background: url("../assets/loginBackground.jpg") center no-repeat;
}
</style>