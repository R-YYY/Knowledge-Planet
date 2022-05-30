<template>
  <div id="information">
    <div class="admindata">

      <div class="header">
        <el-input v-model="inputname" placeholder="请输入内容" class="search_input"></el-input>
        <el-button type="primary" icon="el-icon-search" class="search_button" @click="searchplanets">搜索</el-button>
        <div class="infordivide">
          <el-divider></el-divider>
        </div>
      </div>
      <div class="resource">
        <div class="resource_text">
          <span>资源</span>
          <span style="margin-left:380px;">状态</span>
          <span style="margin-left:115px;">操作</span>
        </div>
        <div class="infordivide">
          <el-divider></el-divider>
        </div>
        <div class="resource_content">

          <div class="none" v-if="resourceList.length==0">
            <el-empty description="暂无数据" v-show="!isUserInformation"></el-empty>
          </div>

          <div class="long_resource_content" style="height:450px;overflow-y: auto" v-if="this.inputname!=null && resourceList.length>=1">
            <div class="card" v-for="item in resourceList" :key="item.resourceId" >
              <CheckResourceCard :resource="item"></CheckResourceCard>
              <div class="status_text" v-if="item.status==1">通过</div>
              <div class="status_text" v-if="item.status==2">不通过</div>
              <div class="status_text" v-if="item.status==3">冻结</div>
              <el-button type="success" icon="el-icon-check" circle @click="unfreezeresource(item.resourceId)" class="unfreeze_button" :disabled="item.status==1"></el-button>
              <el-button class="freeze_button" type="danger" icon="el-icon-close" circle @click="freezeresource(item.resourceId)" :disabled="item.status!=1"></el-button>
            </div>
          </div>

        </div>
      </div>

      <el-dialog
          title="搜索结果"
          :visible.sync="isShowResult"
          class="searchresult"
      >
        <div class="planetresult_none" v-show="isShowResult && planetResult.length==0" style="height:395px;">
          <el-empty description="暂无数据"></el-empty>
        </div>
        <div class="longsearchResult" v-show="isShowResult && planetResult.length>0" style="height:395px;overflow-y: auto" >
          <div class="result" v-for="item in planetResult" >
            <span class="planet_text" >星球：<img :src="item.planetAvatar" class="planet_avatar">{{item.planetName}}</span>
            <span style="margin-left:20px;">星球热度：{{item.hot}}</span>
            <span style="margin-left:20px;">创建时间：{{item.createTime}}</span>
            <el-button size="mini" type="primary" class="see_button" @click="seeresource(item.planetCode)">查看</el-button>
            <el-divider></el-divider>
          </div>
        </div>

      </el-dialog>

    </div>
  </div>
</template>

<script>


import {adminSearchPlanet, getResourceByPCode} from "@/api/admin/manage";
import {freezeOrThawResource} from "@/api/admin/manage";
import {adminGetResourceByPCode} from "@/api/admin/manage";
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
      inputcode:'',
      planetCode:'',
      information: {},
      logs:[],
      isNot:'',
      isUserInformation:false,
      planetResult: {},
      resourceList:[],
      isShowResult:false
    }
  },
  methods: {
    searchplanets(){
      if(this.inputname!=''){
        let name=this.inputname
        console.log(name)
        adminSearchPlanet(name).then((res)=>{
          if(res.data.success === true){
            console.log(112221)
            this.isShowResult=true
            let data = res.data.data.planetList
            this.planetResult=data
            console.log(this.planetResult)
          }
        })
      }
    },
    getclickresource(inputName,inputCode){
      this.inputname=inputName
      this.inputcode=inputCode
      adminGetResourceByPCode(this.inputcode).then((res)=>{
        if(res.data.success === true){
          let data = res.data.data.resourceList
          this.resourceList=data
          console.log(this.resourceList)
        }
      })
    },
    freezeresource(resourceId){
      let type=3
      freezeOrThawResource(resourceId,type).then((res)=>{
        if(res.data.success === true){
          console.log(res)

          adminSearchPlanet(this.inputname).then((res)=>{
            if(res.data.success === true){
              let data = res.data.data.planetList
              console.log(data)
              this.planetResult=data
              this.planetCode=this.planetResult[0].planet.planetCode
              console.log(this.planetCode)

              adminGetResourceByPCode(this.planetCode).then((res)=>{
                if(res.data.success === true){
                  let data = res.data.data.resourceList
                  this.resourceList=data
                  console.log(this.resourceList)
                }
              })
            }
          })
        }
      })
    },
    unfreezeresource(resourceId){
      let type=1
      freezeOrThawResource(resourceId,type).then((res)=>{
        if(res.data.success === true){
          console.log(res)
          adminSearchPlanet(this.inputname).then((res)=>{
            if(res.data.success === true){
              let data = res.data.data.planetList
              console.log(data)
              this.planetResult=data
              this.planetCode=this.planetResult[0].planet.planetCode
              console.log(this.planetCode)

              adminGetResourceByPCode(this.planetCode).then((res)=>{
                if(res.data.success === true){
                  let data = res.data.data.resourceList
                  this.resourceList=data
                  console.log(this.resourceList)
                }
              })
            }
          })
        }
      })
    },
    seeresource(planetCode){
      console.log(123)
      console.log(planetCode)
      adminGetResourceByPCode(planetCode).then((res)=>{
        if(res.data.success === true){
          console.log(123)
          this.isShowResult=false
          let data = res.data.data.resourceList
          this.resourceList=data
          console.log(this.resourceList)
        }
      })

    }
  },

  mounted() {
    eventBus.$on('CodeResource',(planetName,planetCode)=>{
      console.log(planetName)
      console.log(planetCode)
      this.inputname=planetName
      this.inputcode=planetCode
      this.getclickresource(planetName,planetCode)
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
  margin-top:60px;
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

.status_text{
  display:inline;
  margin-left:60px;
  margin-top:100px;
  width:60px;
}

.unfreeze_button{
  display: inline-block;
  margin-top: 90px;
  margin-left: 60px;
  height: 40px;
}
.freeze_button{
  display: inline-block;
  margin-top: 90px;
  height: 40px;
  margin-right: 23px;
}
.planet_avatar{
  border-radius: 50%;
  width:25px;
  height:25px;
  vertical-align:middle;
  margin-right:10px;
}
.planet_text{
  vertical-align: middle;
  line-height: 50px;
}
.searchresult{
  margin-left:100px;
}
.see_button{
  margin-left: 20px;
}
</style>