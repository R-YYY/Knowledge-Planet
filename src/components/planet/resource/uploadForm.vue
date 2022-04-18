<template>
  <div>
    <el-button round icon="el-icon-upload" @click="dialogFormVisible=true">上传资源</el-button>
    <el-dialog title="上传资源" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="form">
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
              class="avatar-uploader"
              :auto-upload="false"
              action="string"
              :on-change="handlePicturePreview">
            <div v-if="form.imageUrl" :style="{backgroundImage:'url('+form.imageUrl+')'}" class="picture"></div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.resourceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input
              class="input"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.detail">
          </el-input>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-select v-model="form.tags" multiple placeholder="请选择" class="input">
            <el-option
                max-width="400px"
                v-for="tag in tagOptions"
                :key="tag.value"
                :label="tag.label"
                :value="tag.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="upload">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import cos from "@/api/cos";
import {uploadResource} from "@/api/planet/resource";
export default {
  name: "uploadForm",
  data() {
    return {
      dialogFormVisible:false,
      form: {
        planetCode:'',
        resourceName: '',
        description: '',
        detail: '',
        link: 'https://',
        tags: [],
        imageUrl: '',
        coverage: {},
      },
      formLabelWidth: '3em',
      tagOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '黄金'
        },
      ],
    }
  },
  methods: {
    upload() {
      cos.putObject({
        Bucket: 'covenant-1308013334', /* 必须 */
        Region: 'ap-shanghai',     /* 存储桶所在地域，必须字段 */
        Key: this.form.coverage.uid+this.form.coverage.name,              /* 必须 */
        StorageClass: 'STANDARD',
        Body: this.form.coverage, // 上传文件对象
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        }
      }, function (err, data) {
        if(err||data.statusCode!==200){
          console.log("图片上传失败，请重新上传")
        }
        else{
          this.form.imageUrl = data.Location
          let data = JSON.stringify({
            "planetCode": this.planetCode,
            "resourceName": this.form.resourceName,
            "link": this.form.link,
            "coverage": data.Location,
            "resourceDescription": this.form.description,
            "details": this.form.details
          })
          uploadResource(data).then((res)=>{
            console.log(res)
          })
        }

      })
    },
    handlePicturePreview(file) {
      this.form.coverage = file.raw
      this.form.imageUrl = URL.createObjectURL(file.raw);
    },
  }

}
</script>

<style scoped>


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

.form {
  margin-left: 10%;
  margin-right: 10%;
}

.input {
  width: 100%;
}

/deep/ .el-select-dropdown__list {
  width: 20px;
}

/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #dcdcdc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/deep/ .avatar-uploader .el-upload:hover {
  border-color: #00ded4;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.picture {
  width: 100px;
  height: 100px;
  background-size: cover;
}
</style>
