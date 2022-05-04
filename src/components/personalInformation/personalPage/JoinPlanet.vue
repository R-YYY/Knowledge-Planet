<template>
  <div id="joinplanet">
    <div class="topbar">
      <div class="topheader">
        <div class="join">
          <img src="../../../assets/homepageimg/planet.png" class="planet_png">
          <span class="join_text">我加入的星球</span>
        </div>
        <div class="joindivide">
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
<style socped>
.topbar{
  width:320px;
  height:250px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
  background-color: #e5ffff;
}
.topheader{
  position: absolute;
  margin-top: 10px;
}
.planet_png{
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left:70px;
}
.join_text{
  vertical-align: middle;
  margin-left: 20px;
  font-size:23px;
  font-family: "Microsoft YaHei";
}
.joindivide{
  width:320px;
}
</style>