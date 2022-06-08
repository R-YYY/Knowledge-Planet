<template>
  <div id="navbar">
    <el-popover
        placement="right-start"
        title="我的星球"
        trigger="click">
      <div class="planets">
        <div class="joinplanet">
          <h1 style="font-family: 'Microsoft YaHei';font-weight:bold;font-size:20px;">我加入的星球</h1>
          <div class="jp" style="width:500px;margin-left:-30px;margin-top:-20px;">
            <el-tag
                v-for="item in joinplanets"
                :key="item.planet.planetCode"
                effect="dark"
                style="margin-left:30px;margin-top:30px;"
                type="success"
                @click="goToJoinPlanet(item.planet.planetCode,item.planet.planetName)"
            ><img :src="item.planet.planetAvatar" class="planet_avatar">{{ item.planet.planetName }}</el-tag>
          </div>
        </div>
        <div class="createplanet" style="margin-top:30px;">
          <h1 style="font-family: 'Microsoft YaHei';font-weight:bold;font-size:20px;">我创建的星球</h1>
          <div class="jp" style="width:500px;margin-left:-30px;margin-top:-10px;">
            <el-tag
                v-for="item in createplanets"
                :key="item.planet.planetCode"
                effect="dark"
                type="danger"
                style="margin-left:30px;margin-top:20px;"
                @click="goToCreatePlanet(item.planet.planetCode,item.planet.planetName)"
            ><img :src="item.planet.planetAvatar" class="planet_avatar">{{ item.planet.planetName }}</el-tag>
          </div>
        </div>
      </div>
      <div class="box" slot="reference">
        <div class="left"><img src="../../assets/homepageimg/fav.png" class="icon_img">
        </div><div class="right">
        <span class="title">我的星球</span>
        <span class="intro">我参加的星球交流群</span>

        </div>
      </div>
    </el-popover>

    <div class="box" @click="showCreatePlanet=true">
      <div class="left">   <img src="../../assets/homepageimg/addnew.png" class="icon_img"> </div>

      <div class="right">
        <span class="title">创建星球</span>
        <span class="intro">创建你想要的星球</span>
      </div>
    </div>

    <div class="systemnotice" v-if="noticePage">
      <span class="notice" style="font-weight: bold;font-size:24px;color:#2C2C2C;font-family: 'Microsoft YaHei'">系统公告</span>
      <div class="hint" >
        <el-popover
            placement="right-start"
            trigger="hover"
            content="展示系统的通知">
          <img src="../../assets/homepageimg/hint.png" class="hintpng" slot="reference">
        </el-popover>
      </div>
      <el-carousel height="150px">
        <el-carousel-item v-for="item in notices" :key="item.noticeId">
          <div class="nt">{{item.title}}</div>
          <div class="ni">{{item.infor}}</div>
          <div class="nf">——知识星球官方</div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="createplanet">
      <el-dialog :visible.sync="showCreatePlanet">
        <el-form :model="planetform" ref="planetform" class="planetform" :rules="rules">
          <el-form-item label="星球图片" :label-width="planetformLabelWidth" prop="avatar">
            <el-upload
                class="avatar-uploader"
                :auto-upload="false"
                action="string"
                :limit="1"
                :on-change="handlePicturePreview">
              <div v-if="planetform.avatar" :style="{backgroundImage:'url('+planetform.avatar+')'}" class="picture"></div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="星球名字" :label-width="planetformLabelWidth" prop="name">
            <el-input class="input" v-model="planetform.name" autocomplete="off" maxlength="15" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="星球描述" :label-width="planetformLabelWidth" prop="description">
            <el-input
                class="input"
                type="textarea"
                :rows="3"
                maxlength="90"
                show-word-limit
                placeholder="请输入内容"
                v-model="planetform.description">
            </el-input>
          </el-form-item>
          <el-form-item class="dialog-footer">
            <el-button @click="showCreatePlanet = false">取 消</el-button>
            <el-button @click="submitForm('planetform')">确 定</el-button>

          </el-form-item>


        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import cos from "@/api/cos";
import {createPlanet} from "@/api/homepage/planet";
import {getAllNotice} from "@/api/homepage/planet";
import {getCreatePlanet} from "@/api/homepage/planet";
import {getJoinPlanet} from "@/api/homepage/planet";

export default{
  data(){
    return{
      showCreatePlanet:false,
      planetformLabelWidth: '6em',
      notices:[],
      noticePage:false,
      planetform:{
        avatar:'',
        name:'',
        createtime:'',
        description:'',
        coverage:{}
      },
      rules:{
        name:[
          {required:true,message:'请输入星球名字',trigger:'blur'},
          {min:1,max:15,message:'长度在1到15个字符',trigger:'blur'}
        ],
        description:[
          {required:true,message:'请输入星球介绍',trigger:'blur'},
          {min:1,max:90,message:'长度在1到90个字符',trigger:'blur'}
        ]
      },
      joinplanets:[],
      createplanets:[]
    }
  },
  methods:{
    upload() {
      let key = 'planetAvatar/' +this.planetform.coverage.uid+this.planetform.coverage.name
      let coverage = this.planetform.coverage
      let planetform = this.planetform
      let that = this
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
        if(err||data.statusCode!==200){
          console.log("图片上传失败，请重新上传")
          that.$message.error("图片上传失败，请重新上传")
        }
        else{
          let name=planetform.name
          let description=planetform.description
          let coverage="https://"+data.Location
          createPlanet(name,description,coverage).then((res)=>{
            window.sessionStorage.setItem("planetName",name)
            window.sessionStorage.setItem("planetCode",res.data.data.planetCode)
            that.$router.push("/planet")
            that.$message({
              message: '成功创建',
              type: 'success'
            });
          })
        }
      })
      this.showCreatePlanet = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.upload();
        } else {
          this.$message.error('创建失败');
          return false;
        }
      });
    },
    handlePicturePreview(file) {
      if(file.raw.type!=='image/jpeg'&&file.raw.type!=='image/png'){
        this.$message.error('请上传图片')
        return
      }
      this.planetform.coverage = file.raw
      this.planetform.avatar = URL.createObjectURL(file.raw);
    },
    goToJoinPlanet(planetCode,planetName){
      window.sessionStorage.setItem("planetCode",planetCode)
      window.sessionStorage.setItem("planetName",planetName)
      this.$router.push('/planet')
    },
    goToCreatePlanet(planetCode,planetName){
      window.sessionStorage.setItem("planetCode",planetCode)
      window.sessionStorage.setItem("planetName",planetName)
      this.$router.push('/planet')
    }
  },
  mounted(){
    getAllNotice().then((res)=>{
      if(res.data.success === true){
        let data = res.data.data.notices
        for(let i = 0;i<data.length;i++){
          this.notices[i] = {}
          this.notices[i].title = data[i].title
          this.notices[i].infor=data[i].content
        }
        this.noticePage = true
      }
    }),
        getCreatePlanet().then((res)=>{
          if(res.data.success === true){
            let data = res.data.data.planetList
            this.createplanets=data
          }
        }),
        getJoinPlanet().then((res)=>{
          if(res.data.success === true){
            let data = res.data.data
            this.joinplanets=data.planetList
          }
        })
  }

}
</script>

<style>
#navbar{
}
.box{
  cursor:pointer;
  position: relative;
  display: flex;
  height: 76px;
  width: 200px;
  margin-bottom: 50px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.left{
  flex: 2;
  position: relative;
}
.icon_img{
  position: absolute;
  left: 50%;
  top:50%;
  margin-left: -20px;
  margin-top: -20px;
  flex:1;
  width:40px;
  height:40px;
}
.right{
  flex:5;
  display: flex;
  flex-direction: column;
}
.title{
  flex: 1;
  padding-top: 14px;
  font-family: "Microsoft YaHei";
  font-size:20px;
  font-color:#2C2C2C;
}
.intro{
  flex: 1;
  display: block;
  font-family: "Microsoft YaHei";
  font-size:14px;
  font-color:#2C2C2C;
}
.systemnotice{
  text-align: center;
  margin-top:90px;
  height: 200px;
  width: 200px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.notice{
  position:relative;
  top:15px;
}
.nt{
  font-size:18px;
  font-weight:bold;
  font-family: "Microsoft YaHei";
  font-color: #575757;
  text-align: left;
  margin-left: 1em;
  margin-top:25px;
}
.ni{
  font-size:14px;
  font-family: "Microsoft YaHei";
  font-color:#000000;
  margin-left:10px;
  margin-top:10px;
  margin-right: 10px;
  text-align: left;
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
.hintpng{
  style:inline-block;
  height:18px;
  width:20px;
}
.hint{
  margin-left:125px;
  margin-top:-10px;
}
.planet_avatar{
  border-radius: 50%;
  width:25px;
  height:25px;
  vertical-align:middle;
  margin-right:5px;
}
.jp{
  cursor:pointer;

}
</style>
