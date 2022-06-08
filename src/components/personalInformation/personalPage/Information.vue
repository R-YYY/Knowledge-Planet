<template>
  <div id="information">
    <div class="personaldata">

      <div class="header">
        <img src="../../../assets/homepageimg/information.png" class="information_png">
        <span class="information_text">个人资料</span>
        <div class="infordivide">
          <el-divider></el-divider>
        </div>
      </div>

      <div class="information" v-model="information">
        <p class="avatar_text">头像:</p>
        <img :src="information.avatar" class="avatar_jpg">
        <div class="name">
          <span>昵称：</span><span>{{ information.userName }}</span>
        </div>
        <div class="mail">
          <span>邮箱：</span><span>{{ information.email }}</span>
        </div>
      </div>

      <div class="changebutton">
        <el-button type="danger" @click="showChangeInformation=true">修改资料</el-button>
      </div>

      <div class="changeinformation">
        <el-dialog :visible.sync="showChangeInformation" width="35%">
          <el-form :model="information" class="informationform">
            <el-form-item label="头像" :label-width="informationformLabelWidth">
              <el-upload
                  class="avatar-uploader"
                  :auto-upload="false"
                  action="string"
                  :limit="1"
                  :on-change="handlePicturePreview">
                <div v-if="information.avatar" :style="{backgroundImage:'url('+information.avatar+')'}"
                     class="picture"></div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="昵称" :label-width="informationformLabelWidth">
              <el-col :span="18">
                <el-input class="input" v-model="information.userName" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="邮箱" :label-width="informationformLabelWidth">
              <el-col :span="18">
                <el-input class="input" v-model="information.email" autocomplete="off" disabled="true"></el-input>
              </el-col>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog_footer">
            <el-button @click="showChangeInformation = false">取 消</el-button>
            <el-button @click="upload(information.userName,information.avatar)">确 定</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>

import cos from "@/api/cos";
import {getUserById, updateAvatarById, updateNameById} from "@/api/personal/information";

export default {
  data() {
    return {
      information: {},
      showChangeInformation: false,
      informationformLabelWidth: '3em'
    }
  },
  methods: {
    handlePicturePreview(file) {
      if(file.raw.type!=='image/jpeg'&&file.raw.type!=='image/png')
      {
        this.$message.error('请上传jpg或png格式的图片！')
        return
      }
      this.information.coverage = file.raw
      this.information.avatar = URL.createObjectURL(file.raw);
    },
    upload(name,avatar) {
      let key = 'userAvatar/'+this.information.userId+this.information.userName
      let coverage = this.information.coverage
      let information = this.information
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
        console.log(data)
        if(err||data.statusCode!==200){
          console.log("图片上传失败，请重新上传")
        }
        else{
          let coverage="https://"+data.Location
          updateAvatarById(coverage).then((res)=>{

            console.log(res)
          })
        }
      })

      updateNameById(name).then((res)=>{
        console.log(res)
      })

      this.showChangeInformation=false

      this.$message({
        type: 'success',
        message: '修改成功!'
      });

    },
  },
  mounted() {
    getUserById().then((res)=>{
      if(res.data.success === true){
        let data = res.data.data
        this.information=data.result
        console.log(this.information)
      }
    })
  }

}
</script>

<style scoped>
.personaldata {
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

.information_png {
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-left: 40px;
}

.information_text {
  vertical-align: middle;
  margin-left: 15px;
  font-size: 23px;
  font-family: "Microsoft YaHei";
}

.infordivide {
  width: 700px;
}

.avatar_text {
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-top: 80px;
  margin-left: 40px;
}

.avatar_jpg {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-left: 100px;
  margin-top: -40px;
}

.name {
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left: 40px;
  margin-top: 20px;
  width: 375px;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left: 5px;
}



.mail {
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left: 40px;
  margin-top: 20px;
  width: 375px;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left: 5px;
}

.changebutton {
  margin-left: 40px;
  margin-top: 30px;
}

.informationform {
  margin-left: 10%;
}

.dialog_footer {
  text-align: center;
}

.dialog_footer button {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
