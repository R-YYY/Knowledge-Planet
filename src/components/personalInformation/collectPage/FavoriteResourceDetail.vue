<template>
  <div>
    <div id="content">
      <div id="contentHead">
        <el-image :src="resource.coverage" fit="cover" class="logo">
        </el-image>
        <h2>{{ resource.resourceName }}</h2>
        <p>{{ resource.resourceDescription }}</p>
        <div v-for="item in resource.tagList" :key="item" class="tag">
          <el-tag type="info" effect="plain" size="small">{{ item }}</el-tag>
        </div>
      </div>
      <div id="contentBody">
        <el-descriptions :column="1" colon>
          <el-descriptions-item label="链接">
            <el-link :href="resource.link">{{ resource.link }}</el-link>
          </el-descriptions-item>
          <el-descriptions-item label="详情">{{ resource.details }}</el-descriptions-item>
          <el-descriptions-item label="时间">{{ resource.uploadTime }}</el-descriptions-item>
          <el-descriptions-item label="荐者">
            <el-image class="miniIcon" :src="resource.uploaderAvatar">
              <div slot="error" class="image-slot">
                <img style="height: 20px;" src="../../../assets/icon/my.png" alt="">
              </div>
            </el-image>
            <span style="width: 25px"></span>
            {{ resource.uploaderName }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div id="footer">
      <div class="footer_right" @click="enter">
        <img src="@/assets/icon/enter2.png" class="icon" alt="">
        <span class="text">访问</span>
      </div>
    </div>
  </div>
</template>

<script>
import {changeRecommendStatus, checkResource} from "@/api/planet/checkResource";

export default {
  name: "FavoriteResourceDetail",
  props:["resource"],
  methods:{
    enter() {
      window.open(this.resource.link);
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
      checkResource(data).then((res)=>{
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
        checkResource(data).then((res)=>{
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
  }
}
</script>

<style scoped>
.logo{
  width: 120px;
  height: 120px;
  border-radius: 8px;
}

#content {
  flex: 1;
  margin: 20px;
}

#contentHead {
  text-align: center;
}

.tag {
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
}

#contentBody {
  text-align: left;
  margin-left: 30px;
}

.el-link.el-link--default {
  color: #10cbf5;
}

.el-link.el-link--default:hover {
  color: #00ded4;
}

#footer {
  display: flex;
  height: 50px;
  border-top: 2px solid #e7e7e7;
}

.footer_left,
.footer_right,
.footer_center {
  flex: 1;
  margin-top: 5px;
  line-height: 40px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}

.footer_center {
  border-left: 2px solid #e7e7e7;
  border-right: 2px solid #e7e7e7;
}

.text {
  margin-left: 5px;
  color: #bebebe;
  font-weight: bold;
}

.icon {
  /*margin-top: 6px;*/
  transform: translateY(3px);
  height: 20px;
}

.miniIcon{
  border-radius: 50%;
  height: 20px;
  width: 20px;
  position: absolute
}
</style>