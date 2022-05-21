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

        <div class="longnoticecontent" style="height:495px;overflow-y: auto">
          <div v-for="item in notices">
            <el-popover
                placement="top-start"
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


import {getAllNotice} from "@/api/admin/manage";
export default{
  data(){
    return{
      notices:[]

    }
  },
  methods:{
    goToSystemNotice(){
      this.$router.push('/admin/systemnotice')
    },

  },
  mounted(){
    getAllNotice().then((res)=>{
      if(res.data.success === true){
        let data = res.data.data.notices
        console.log(data)
        this.notices=data
        console.log(this.notices)
      }
    })

  }

}
</script>
<style scoped>
.topbar{
  width:320px;
  height:560px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
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
.longnoticecontent{
  text-align: center;
}
</style>