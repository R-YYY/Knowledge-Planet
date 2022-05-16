<template>
  <div id="createplanet">
    <div class="bottombar">
      <div class="bottomheader">
        <div class="create">
          <div class="create_text">历史公告</div>
        </div>

        <div class="createdivide">
          <el-divider></el-divider>
        </div>

        <div v-if="notices.length<=6" class="shortnoticecontent">
          <div v-for="item in notices">
            <el-popover
                placement="top-start"
                :title="item.title"
                width="200"
                trigger="hover"
                :content="item.content">
              <el-tag slot="reference" class="notice_tag">{{ item.title }}</el-tag>
            </el-popover>
          </div>
        </div>

        <div v-else class="longnoticecontent" style="height:330px;overflow-y: scroll">
          <div v-for="item in notices">
            <el-popover
                placement="top"
                :title="item.title"
                width="200"
                trigger="hover"
                :content="item.content">
              <el-tag slot="reference" class="notice_tag" type="plain">{{ item.title }}</el-tag>
            </el-popover>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default{
  data(){
    return{
      notices:[
        {
          title:'1111',
          content:'o2ih30ti1h3t12i0jjjjjjjjjjjjjjjj'
        },
        {
          title:'1111',
          content:'o2ih30ti1h3t12i0jjjjjjjjjjjjjjjj'
        },
        {
          title:'112eh11',
          content:'o2ih30ti1h3t12i0jjjjjjjjjjjjjjjj'
        },
        {
          title:'1111',
          content:'o2ih30ti1h3t12i0jjjjjjjjjjjjjjjj'
        },
        {
          title:'12q3q111',
          content:'o2ih30ti1h3t12i0jjjjjjjjjjjjjjjj'
        },
        {
          title:'1111',
          content:'o2ih30ti1h3t12i0jjjjjjjjjjjjjjjj'
        },
        {
          title:'11dkbfiweb11',
          content:'o2ih30ti1h3t12i0jjjjjjjjjjjjjjjj'
        },
        {
          title:'11qfewg211',
          content:'o2ih30ti1h3t12i0jjjjjjjjjjjjjjjj'
        },
        {
          title:'11wer311',
          content:'o2ih30ti1h3t12i0jjjjjjjjjjjjjjjj'
        },
        {
          title:'11weqt311',
          content:'o2ih30ti1h3t12i0jjjjjjjjjjjjjjjj'
        },
        {
          title:'11weg11',
          content:'o2ih30ti1h3t12i0jjjjjjjjjjjjjjjj'
        },
      ]
    }
  },
  methods:{
    goToCreatePlanet(planetCode) {
      window.sessionStorage.setItem("planetCode",planetCode)
      this.$router.push('/planet')
    }
  },
  mounted(){

  }
}
</script>
<style scoped>
.bottombar{
  position: relative;
  width:320px;
  height:380px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
  background-color: #e5ffff;
}
.bottomheader{
  margin-top: 10px;
  position: absolute;
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
.el-divider--horizontal{
  margin-bottom: 0px;
  margin-top:10px;
}
.create_text{
  text-align: center;
  font-size:23px;
  font-family: "Microsoft YaHei";
}
.notice_tag{
  margin-top:10px;
  margin-bottom:10px;
}
.el-tag{
  background-color: #99ebff;
  border-color: #99ebff;
  color:black;
  width:200px;
}
.shortnoticecontent{
  text-align: center;
}
.longnoticecontent{
  text-align: center;
}
</style>