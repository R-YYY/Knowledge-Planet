<template>
  <div id="information">
    <div class="admindata">

      <div class="header">
        <el-input v-model="inputname" placeholder="请输入内容" class="search_input"></el-input>
        <el-button type="primary" icon="el-icon-search" class="search_button" @click="searchplanet">搜索</el-button>
        <div class="infordivide">
          <el-divider></el-divider>
        </div>
      </div>
      <div class="resource">
        <div class="resource_text">
          <span>资源</span>
          <span style="margin-left:480px;">操作</span>
        </div>
        <div class="infordivide">
          <el-divider></el-divider>
        </div>
        <div class="resource_content">


          <div class="none" v-if="resourceList.length==0">
            <el-empty description="暂无数据" v-show="!isUserInformation"></el-empty>
          </div>

          <div class="long_resource_content" style="height:450px;overflow-y: auto" v-if="resourceList.length>=2">
            <div class="card" v-for="item in resourceList" :key="item.resourceId" >
              <CheckResourceCard :resource="item"></CheckResourceCard>
              <el-button class="delete_button" type="danger" icon="el-icon-delete" circle @click="deleteresource(item.resourceId)"></el-button>
            </div>
          </div>

        </div>
      </div>




    </div>
  </div>
</template>

<script>

import {getSearchPlanet} from "@/api/homepage/planet";
import {getResourceByPCode} from "@/api/admin/manage";
import {freezeResource} from "@/api/admin/manage";
import CheckResourceCard from "@/components/administrator/resourceCheckPage/CheckResourceCard";
import CheckResourceDetail from "@/components/administrator/resourceCheckPage/CheckResourceDetail";
import eventBus from "@/utils/eventBus";

export default {
  components: {
    CheckResourceDetail,
    CheckResourceCard
  },
  data() {
    return {
      inputname:'',
      planetCode:'',
      information: {},
      logs:[],
      isNot:'',
      isUserInformation:false,
      planetResult:[],
      resourceList:[]
    }
  },
  methods: {
    searchplanet(name=this.inputname){
      console.log(name)
      getSearchPlanet(name).then((res)=>{
        if(res.data.success === true){
          let data = res.data.data.planetList
          console.log(data)
          this.planetResult=data
          this.planetCode=this.planetResult[0].planet.planetCode
          console.log(this.planetCode)

          getResourceByPCode(this.planetCode).then((res)=>{
            if(res.data.success === true){
              let data = res.data.data.resourceList
              console.log(77847648478)
              console.log(data)
              this.resourceList=data
              console.log(this.resourceList)
            }
          })
        }
      })
    },
    deleteresource(resourceId){
      freezeResource(resourceId).then((res)=>{
        if(res.data.success === true){
          console.log(res)
          console.log(771111111)
          this.searchplanet()
        }
      })
    }

  },

  mounted() {
    eventBus.$on('CodeResource',(res)=>{
      this.searchplanet(res)
    })


  }
}
</script>

<style scoped>
.admindata {
  position: absolute;
  width: 700px;
  height: 560px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}

.header {
  margin-top: 10px;
  position: absolute;
}

.infordivide {
  width: 700px;
}

.search_input{
  margin-top:10px;
  margin-left:40px;
  width:490px;
}
.search_button{
  margin-left:25px;
}

.el-divider--horizontal{
  margin-top: 10px;
}

.none{
  margin-left:0px;
  margin-top:150px;
}
.resource_text{
  font-family: "Microsoft YaHei";
  margin-left:40px;
  margin-top: 80px;
}
.long_resource_content{
  position:absolute;

  margin-left:40px;
}
.el-divider--horizontal{
  margin-bottom:0px;
}
.card {
  /*margin: 20px 20px 10px 20px;*/
  margin-top:20px;
  display: flex;
  height: 250px;
}

.delete_button{
  display: inline-block;
  margin-top: 100px;
  margin-left: 150px;
  height: 40px;
  margin-right: 104px;
}

</style>