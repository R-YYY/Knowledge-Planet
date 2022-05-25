<template>
  <div>
    <div id="adminheader">
      <div id="left">
        <div id="logo"></div>
      </div>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>

export default {
  name: "AdminHeader",
  data() {
    return {
      color: 'color:#E4E7ED',
    }
  },
  mounted() {

  },
  methods: {

  },
  watch: {

  }
}
</script>

<style scoped>
#adminheader {
  position: fixed;
  z-index: 100;
  display: flex;
  top: 0;
  height: 50px;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 40px #dadada;
}

/*由于header的定位是fixed，需要一个占位div*/
.placeholder {
  height: 50px;
}

#left {
  width: 120px;
  min-width: 120px;
  margin-left: 150px;
}


#logo {
  position: relative;
  background-image: url("../assets/login/zsxq.png");
  background-size: auto 100%;
  background-repeat: no-repeat;
  height: 80%;
  top: 10%;
}

.el-divider--horizontal{
  margin-top:0px;
  margin-bottom: 0px;
}

</style>
