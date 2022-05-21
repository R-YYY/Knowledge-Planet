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

        <div class="longnoticecontent" style="height:330px;overflow-y: auto">
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

import {getAllNotice} from "@/api/admin/manage";

export default{
  data(){
    return{
      notices:[]
    }
  },
  methods:{
    goToCreatePlanet(planetCode) {
      window.sessionStorage.setItem("planetCode",planetCode)
      this.$router.push('/planet')
    }
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
.bottombar{
  position: relative;
  width:320px;
  height:380px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
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
.longnoticecontent{
  text-align: center;
}
</style>