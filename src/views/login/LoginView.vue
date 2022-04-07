<template>
  <div id="login">
    <LoginForm v-if="!isFindPsd" v-on:changeModel="changeModel"></LoginForm>
    <FindPasswordForm v-if="isFindPsd" v-on:changeModel="changeModel"></FindPasswordForm>
  </div>
</template>

<script>
import LoginForm from "@/components/login/LoginForm";
import FindPasswordForm from "@/components/login/FindPasswordForm";
export default {
  name: "LoginView",
  data(){
    return{
      isFindPsd:false,
    }
  },
  components:{
    FindPasswordForm,
    LoginForm,
  },
  methods:{
    changeModel(res){
      this.isFindPsd = res;
    }
  }
}
</script>

<style>
#login{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/loginBackground.jpg") center no-repeat;
  background-size: 100% 100%;
}

</style>