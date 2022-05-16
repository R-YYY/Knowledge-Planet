<template>
  <div id="noticehistory">
    <div class="topbar">
      <div class="topheader">

        <div class="notice">
          <div class="notice_text">历史公告</div>
        </div>

        <div class="noticedivide">
          <el-divider></el-divider>
        </div>

        <div v-if="notices.length<=9" class="shortnoticecontent">
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

        <div v-else class="longnoticecontent" style="height:495px;overflow-y: scroll">
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
    goToSystemNotice(){
      this.$router.push('/admin/systemnotice')
    },


  },
  mounted(){

  }

}
</script>
<style scoped>
.topbar{
  width:320px;
  height:560px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
  background-color: #e5ffff;
}
.topheader{
  position: absolute;
  margin-top: 10px;
}
.notice_text{
  text-align: center;
  font-size:23px;
  font-family: "Microsoft YaHei";
}
.noticedivide{
  width:320px;
}
.el-divider--horizontal{
  margin-bottom: 0px;
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