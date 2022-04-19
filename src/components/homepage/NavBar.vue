<template>
  <div id="navbar">
    <el-popover
        placement="right-start"
        title="我的星球"
        trigger="click">
      <div class="planets">
        <div class="joinplanet">
          <h style="font-family: 'Microsoft YaHei';font-weight:bold;font-size:20px;">我参加的星球</h>
          <div class="jp" style="width:300px;margin-left:-30px;margin-top:-20px;">
            <el-tag
                v-for="item in joinplanets"
                effect="dark"
                style="margin-left:30px;"
                type="success"
            >{{ item }}</el-tag>
          </div>
        </div>
        <div class="createplanet" style="margin-top:50px;">
          <h style="font-family: 'Microsoft YaHei';font-weight:bold;font-size:20px;">我创建的星球</h>
          <div class="jp" style="width:300px;margin-left:-30px;margin-top:-10px;">
            <el-tag
                v-for="item in createplanets"
                effect="dark"
                type="danger"
                style="margin-left:30px;margin-top:20px;"
            >{{ item }}</el-tag>
          </div>
        </div>
      </div>
      <div class="box" slot="reference">
        <img src="../../assets/homepageimg/fav.png" class="icon_img">
        <div class="title">我的星球</div>
        <div class="intro">我参加的星球交流群</div>
      </div>
    </el-popover>

    <div class="box" @click="showCreatePlanet=true">
      <img src="../../assets/homepageimg/addnew.png" class="icon_img">
      <div class="title">创建星球</div>
      <div class="intro">创建你想要的星球</div>
    </div>

    <div class="systemnotice" v-if="noticePage">
      <span class="notice" style="font-weight: bold;font-size:24px;color:#2C2C2C;font-family: 'Microsoft YaHei'">系统公告</span>
      <el-carousel height="190px" indicator-position="outside">
        <el-carousel-item v-for="item in notices" :key="item">
          <div class="nt">{{item.title}}</div>
          <div class="ni">{{item.infor}}</div>
          <div class="nf">——知识星球官方</div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <dic class="createplanet">
      <el-dialog :visible.sync="showCreatePlanet">
        <el-form :model="planetform" class="planetform">
          <el-form-item label="星球图片" :label-width="planetformLabelWidth">
            <el-upload
                class="avatar-uploader"
                :auto-upload="false"
                action="string"
                :on-change="handlePicturePreview">
              <div v-if="planetform.avatar" :style="{backgroundImage:'url('+planetform.avatar+')'}" class="picture"></div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="星球名字" :label-width="planetformLabelWidth">
            <el-input class="input" v-model="planetform.name" autocomplete="off"></el-input>
          </el-form-item>
<!--          <el-form-item label="创建时间" :label-width="planetformLabelWidth">-->
<!--            <el-col :span="11">-->
<!--              <el-date-picker type="date" placeholder="选择日期" v-model="planetform.createtime" style="width: 100%;"></el-date-picker>-->
<!--            </el-col>-->
<!--          </el-form-item>-->
          <el-form-item label="星球描述" :label-width="planetformLabelWidth">
            <el-input
                class="input"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="planetform.description">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showCreatePlanet = false">取 消</el-button>
          <el-button @click="upload">确 定</el-button>
        </div>
      </el-dialog>
    </dic>
  </div>
</template>

<script>
import cos from "@/api/cos";
import {createPlanet} from "@/api/homepage/planet";
import {getAllNotice} from "@/api/homepage/planet";
export default{
  data(){
    return{
      showCreatePlanet:false,
      planetformLabelWidth: '5em',
      notices:[],
      noticePage:false,
      planetform:{
        avatar:'',
        name:'',
        // createtime:'',
        description:'',
        coverage:{}
      },
      joinplanets:["你的名字","你的名字","你的名字","你的名字","你的名字","你的名字"],
      createplanets:["你的名字", "你的名字","你的名字","你的名字","你的名字"]
    }
  },
  methods:{
    isCreatePlanet(){
      this.showCreatePlanet=true
    },
    upload() {
      let key = this.planetform.coverage.uid+this.planetform.coverage.name
      let coverage = this.planetform.coverage
      let planetform = this.planetform
      cos.putObject({
        Bucket: 'covenant-1308013334', /* 必须 */
        Region: 'ap-shanghai',     /* 存储桶所在地域，必须字段 */
        Key: key,              /* 必须 */
        StorageClass: 'STANDARD',
        Body: coverage, // 上传文件对象
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        }
      }, function (err, data) {
        console.log(data)
        if(err||data.statusCode!==200){
          console.log("图片上传失败，请重新上传")
        }
        else{
          let name=planetform.name
          let description=planetform.description
          let coverage="https://"+data.Location
          createPlanet(name,description,coverage).then((res)=>{
            console.log(res)
          })
        }

      })
      this.showCreatePlanet = false
    },
    handlePicturePreview(file) {
      this.planetform.coverage = file.raw
      this.planetform.avatar = URL.createObjectURL(file.raw);
    },
  },
  mounted(){
    getAllNotice().then((res)=>{
      if(res.data.success === true){
        console.log(1)
        let data = res.data.data.notices
        console.log(data)
        for(let i = 0;i<data.length;i++){
          this.notices[i] = {}
          this.notices[i].title = data[i].title
          this.notices[i].infor=data[i].content
        }
        this.noticePage = true
      }
    })
  }

}
</script>

<style>
#navbar{
  margin-top:60px;
  margin-left:70px;
}
.box{
  height: 86px;
  width: 230px;
  margin-bottom: 50px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.icon_img{
  width:50px;
  height:50px;
  margin-top:18px;
  margin-left:15px;
}
.title{
  margin-left:75px;
  margin-top: -52px;
  font-family: "Microsoft YaHei";
  font-size:20px;
  font-color:#2C2C2C;
}
.intro{
  margin-left:75px;
  font-family: "Microsoft YaHei";
  font-size:14px;
  font-color:#2C2C2C;
}
.systemnotice{
  margin-top:90px;
  height: 286px;
  width: 330px;
  margin-left:-50px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.notice{
  position:relative;
  margin-left:100px;
  top:20px;
}
.nt{
  font-size:20px;
  font-weight:bold;
  font-family: "Microsoft YaHei";
  font-color:#2C2C2C;
  margin-left:10px;
  margin-top:35px;
}
.ni{
  font-size:14px;
  font-family: "Microsoft YaHei";
  font-color:#000000;
  margin-left:10px;
  margin-top:25px;
}
.nf{
  font-size:14px;
  font-weight:bold;
  font-family: "Microsoft YaHei";
  font-color:#000000;
  margin-left:200px;
  margin-top:30px;
}

.el-button {
  border-color: #00ded4;
  color: #00ded4;
}

.el-button:hover,
.el-button:focus {
  background: #00ded4 !important;
  color: white !important;
  font-weight: bold;
}

.dialog-footer {
  text-align: center;
}

.dialog-footer button {
  margin-left: 20px;
  margin-right: 20px;
}

.planetform {
  margin-left: 10%;
  margin-right: 10%;
}

.input {
  width: 100%;
}

/deep/ .el-select-dropdown__list {
  width: 20px;
}

 .avatar-uploader .el-upload {
  border: 1px dashed #dcdcdc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

 .avatar-uploader .el-upload:hover {
  border-color: #00ded4;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px!important;
  text-align: center;
}

.picture {
  width: 100px;
  height: 100px;
  background-size: cover;
}
</style>