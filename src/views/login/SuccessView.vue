<template>
  <div id="registerSuccess">
    <div class="success_area">
      <img src="../../assets/login/success.png" alt="" class="success_icon">
      <p class="gongxi"><b>恭喜您！</b></p>
      <p class="fanhui">您已{{message}}！{{count}}秒后即将返回登录页面，你也可以选择
        <router-link class="lijifanhui" :to="{name:'login'}">立即返回</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",
  data(){
    return{
      message:"",
      count:''
    }
  },
  methods:{
    countDown() {
      const TIME_COUNT = 5;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 1 && this.count <= TIME_COUNT) {
            this.count--;
          }
          else {
            clearInterval(this.timer);
            this.timer = null;
            this.$router.push("/login");
          }
        }, 1000);
      }
    },
  },

  created() {
    this.message = this.$route.params.message;
    this.countDown();
  }
}
</script>

<style scoped>
#registerSuccess{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login/registerBackground.jpg") center no-repeat;
  background-size: 100% 100%;
}

.success_area{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 420px;
  height: 450px;
  margin-left: -210px;
  margin-top: -240px;
  background: rgba(255,255,255,0.8);
  border-radius: 20px;
}

.success_icon{
  position: relative;
  width: 200px;
  margin-left: 110px;
  margin-top: 20%;
}

.gongxi{
  position: relative;
  left: 40%;
  font-size: 25px;
}

.fanhui{
  position: relative;
  left: 30px;
  font-size: 13px;
}

.lijifanhui{
  color: #00c8bf;
  cursor:pointer;
}
</style>