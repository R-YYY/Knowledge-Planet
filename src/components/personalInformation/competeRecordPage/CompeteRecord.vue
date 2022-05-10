<template>
  <div id="competerecord">
    <div class="record">
      <div class="header">
        <p class="record_text">我的竞赛记录</p>
      </div>
      <div class="record_content">

      </div>
    </div>
  </div>
</template>

<script>

export default{
  components: {

  },
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
.record{
  position:relative;
  width:900px;
  height:580px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.header{
  position:absolute;
  margin-top: -15px;
  margin-left: 20px;
}
.record_text{
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 25px;
}
.record_content{
  position:absolute;
  width:880px;
  margin-top:50px;
  margin-left:20px;
}
</style>