<template>
  <div id="createplanet">
    <div class="bottombar">
      <div class="bottomheader">
        <div class="create">
          <img src="../../../assets/homepageimg/planet.png" class="planet_png">
          <span class="create_text">我创建的星球</span>
        </div>
        <div class="createdivide">
          <el-divider></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default{
  data(){
    return{

    }
  },
  methods:{

  },
  mounted(){

  }

}
</script>
<style scoped>
.bottombar{
  width:320px;
  height:250px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
  background-color: #e5ffff;
}
.bottomheader{
  margin-top: 10px;
  position: absolute;
}
.planet_png{
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left:70px;
}
.create_text{
  vertical-align: middle;
  margin-left: 20px;
  font-size:23px;
  font-family: "Microsoft YaHei";
}
.createdivide{
  width:320px;
}
</style>