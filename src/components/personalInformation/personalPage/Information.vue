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
        <img src="../../../assets/homepageimg/1.jpg" class="avatar_jpg">
        <div class="name">
          <span>昵称：</span><span>{{information.name}}</span>
        </div>
        <div class="region">
          <span>居住地：</span><span>{{information.region}}</span>
        </div>
        <div class="birthday">
          <span>生日：</span><span>{{information.birthday}}</span>
        </div>
        <div class="telephone">
          <span>电话：</span><span>{{information.telephone}}</span>
        </div>
        <div class="id">
          <span>ID：</span><span>{{information.id}}</span>
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
                  :on-change="handlePicturePreview">
                <div v-if="information.avatar" :style="{backgroundImage:'url('+information.avatar+')'}" class="picture"></div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="昵称" :label-width="informationformLabelWidth">
              <el-col :span="18">
                <el-input class="input" v-model="information.name" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="住址" :label-width="informationformLabelWidth">
              <el-col :span="18">
                <el-input class="input" v-model="information.region" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="生日" :label-width="informationformLabelWidth">
              <el-col :span="18">
                <el-input class="input" v-model="information.birthday" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>


            <el-form-item label="生日" :label-width="informationformLabelWidth">
              <el-col :span="4">
                <el-input class="input" v-model="information.birthday" autocomplete="off"></el-input>
              </el-col>
              <el-col class="line" :span="1">年</el-col>
              <el-col :span="4">
                <el-input class="input" v-model="information.birthday" autocomplete="off"></el-input>
              </el-col>
              <el-col class="line" :span="1">月</el-col>
              <el-col :span="4">
                <el-input class="input" v-model="information.birthday" autocomplete="off"></el-input>
              </el-col>
              <el-col class="line" :span="1">日</el-col>
            </el-form-item>

            <el-form-item label="电话" :label-width="informationformLabelWidth">
              <el-col :span="18">
                <el-input class="input" v-model="information.telephone" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="ID" :label-width="informationformLabelWidth">
              <el-col :span="18">
                <el-input class="input" v-model="information.id" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog_footer">
            <el-button @click="showChangeInformation = false" >取 消</el-button>
            <el-button @click="upload" >确 定</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>

export default{
  data(){
    return{
      information: {
        avatar:'',
        name: '11',
        region: '上海',
        birthday: '2002',
        telephone:'15130721316',
        id:'1952455',
        coverge:{}
      },
      showChangeInformation:false,
      informationformLabelWidth: '3em',
    }
  },
  methods:{
    handlePicturePreview(file) {
      this.information.coverage = file.raw
      this.information.avatar = URL.createObjectURL(file.raw);
    },
  },
  mounted(){

  }

}
</script>
<style socped>
.personaldata{
  position:absolute;
  width:700px;
  height:560px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
  background-color: #e5ffff;
}
.header{
  margin-top:10px;
  position:absolute;
}
.information_png{
  display: inline-block;
  width:30px;
  height:30px;
  vertical-align: middle;
  margin-left: 40px;
}
.information_text{
  vertical-align: middle;
  margin-left:15px;
  font-size: 23px;
  font-family: "Microsoft YaHei";
}
.infordivide{
  width:700px;
}
.avatar_text{
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-top:80px;
  margin-left:40px;
}
.avatar_jpg{
  border-radius: 50%;
  width:100px;
  height:100px;
  margin-left:100px;
  margin-top:-40px;
}
.name{
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left:40px;
  margin-top:20px;
  background-color: #99ffff;
  box-shadow: 0 0 10px #dcdcdc;
  width:375px;
  height:35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left:5px;
}
.region{
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left:40px;
  margin-top:20px;
  background-color: #99ffff;
  box-shadow: 0 0 10px #dcdcdc;
  width:375px;
  height:35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left:5px;
}
.birthday{
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left:40px;
  margin-top:20px;
  background-color: #99ffff;
  box-shadow: 0 0 10px #dcdcdc;
  width:375px;
  height:35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left:5px;
}
.telephone{
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left:40px;
  margin-top:20px;
  background-color: #99ffff;
  box-shadow: 0 0 10px #dcdcdc;
  width:375px;
  height:35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left:5px;
}
.id{
  font-family: "Microsoft YaHei";
  font-size: 20px;
  margin-left:40px;
  margin-top:20px;
  background-color: #99ffff;
  box-shadow: 0 0 10px #dcdcdc;
  width:375px;
  height:35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left:5px;
}
.changebutton{
  margin-left:40px;
  margin-top:30px;
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