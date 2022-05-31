<template>
  <div id="checkedRscCard">
    <div class="content" @click="showCheckDetail">
      <div class="content_left">
        <img :src="resource.coverage" alt="正在显示" class="logo">
      </div>
      <div class="content_right">
        <div class="content_right_top">{{ resource.resourceName }}</div>
        <div class="content_right_middle">{{ resource.resourceDescription }}</div>
        <div class="content_right_bottom">
          <div v-for="item in resource.tagList" :key="item" class="tag">
            <el-tag type="info" effect="plain" size="small">{{ item }}</el-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer_left" @click="resource.status===1?recommend():success()">
        <span ref="like" class="text">{{resource.status===1?(resource.isRecommended?"取消推荐":"推荐"):"通过"}}</span>
      </div>
      <div class="footer_center" @click="fail">
        <span ref="collect" class="text">{{resource.status===1?"下架":"不通过"}}</span>
      </div>
      <div class="footer_right" @click="enter">
        <img src="@/assets/icon/enter2.png" class="icon" alt="正在加载">
        <span class="text">访问</span>
      </div>
    </div>
    <el-dialog
        title="资源详情"
        :visible.sync="detailVisible"
        width="60%">
      <CheckRscDetail :resource="resource"></CheckRscDetail>
    </el-dialog>
  </div>
</template>

<script>
import CheckRscDetail from "@/components/planet/checkRsc/CheckRscDetail";
import {changeRecommendStatus, checkResource} from "@/api/planet/checkResource";

export default {
  name: "CheckRscCard",
  props:["resource"],
  components:{
    CheckRscDetail
  },
  data(){
    return{
      detailVisible:false,
    }
  },
  methods:{
    enter() {
      window.open(this.resource.link)
    },

    showCheckDetail(){
      this.detailVisible=true
    },

    recommend(){
      let data = new FormData
      data.append("resourceId",this.resource.resourceId)
      data.append("resourceStatus",this.resource.isRecommended?"0":"1")
      changeRecommendStatus(data).then((res)=>{
        console.log(res)
        this.$message({type: res.data.success?'success':'error', message: res.data.message});
        if(res.data.success) {
          this.resource.isRecommended = !this.resource.isRecommended
        }
      }).catch(()=>{
        this.$message({type: 'info', message: '系统错误'});
      })
    },

    success(){
      console.log(this.resource)
      let data = JSON.stringify({
        "resourceId": this.resource.resourceId,
        "resourceName": this.resource.resourceName,
        "checkResult": 1,
        "checkInfo": "通过",
        "uploaderId": this.resource.uploaderId,
      })
      let planetCode = window.sessionStorage.getItem("planetCode")
      checkResource(data,planetCode).then((res)=>{
        console.log(res)
        this.$message({type: res.data.success?'success':'error', message: res.data.message});
        if(res.data.success) {
          this.resource.status = 1;
        }
      }).catch(()=>{
        this.$message({type: 'info', message: '系统错误'});
      })
    },

    fail(){
      this.openBox("下架").then((value)=>{
        let data = JSON.stringify({
          "resourceId": this.resource.resourceId,
          "resourceName": this.resource.resourceName,
          "checkResult": 2,
          "checkInfo": value.value,
          "uploaderId": this.resource.uploaderId,
        })
        let planetCode = window.sessionStorage.getItem("planetCode")
        checkResource(data,planetCode).then((res)=>{
          console.log(res)
          this.$message({type: res.data.success?'success':'error', message: res.data.message});
          if(res.data.success) {
            this.resource.status = 2;
          }
        }).catch(()=>{
          this.$message({type: 'info', message: '系统错误'});
        })
      })
    },

    openBox(operation){
      return this.$prompt('请输入'+operation+'的原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[^\s]+[\s]*.*$/,
        inputErrorMessage: '请填写原因'
      })
    }
  },
}
</script>

<style scoped>
#checkedRscCard{
  height: 220px;
  width: 350px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 0 30px #dcdcdc;
}


.content{
  display: flex;
  height: 175px;
  width: 100%;
  border-bottom: 2px solid #dadada;
  cursor: pointer;
}

.logo {
  width: 80%;
  margin-left: 15%;
  border-radius: 8px;
  height: auto;
  cursor: pointer;
}

.content_left {
  flex: 1;
  margin-top: 20px;
  margin-right: 10px;
}

.content_right {
  flex: 2;
  display: flex;
  flex-direction: column;
  margin: 20px 20px 10px 0;
}

.content_right_top {
  flex: 1;
  font-weight: bold;
  font-size: 18px;
  color: #5e5e5e;
}

.content_right_middle {
  flex: 3;
  font-size: 14px;
  color: #757575;
  overflow: hidden;
  margin-bottom: 10px;
}

content_right_bottom {
  flex: 1;
}

.footer {
  display: flex;
}

.footer_left,
.footer_right,
.footer_center {
  flex: 1;
  margin-top: 5px;
  line-height: 35px;
  height: 35px;
  text-align: center;
}

.footer_center {
  border-left: 2px solid #dadada;
  border-right: 2px solid #dadada;
}

.icon {
  /*margin-top: 6px;*/
  transform: translateY(3px);
  height: 20px;
}

.text {
  margin-left: 5px;
  color: #bebebe;
  font-weight: bold;
  cursor: pointer;
}

.tag {
  display: inline-block;
  margin-left: 10px;
}
</style>