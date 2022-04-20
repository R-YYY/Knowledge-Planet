<template>
  <div>
    <el-button round icon="el-icon-upload" @click="dialogFormVisible=true">上传资源</el-button>
    <el-dialog title="上传资源" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm" class="form">
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
        <el-form-item label="标题" prop="resourceName" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.resourceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="detail" :label-width="formLabelWidth">
          <el-input
              class="input"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.detail">
          </el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags" :label-width="formLabelWidth">
          <el-tag
              :key="tag"
              v-for="tag in form.tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
      dialogFormVisible: false,
      form: {
        planetCode: '1234',
        resourceName: '',
        description: '',
        detail: '',
        link: 'https://',
        tags: [],
        imageUrl: '',
        coverage: {},
      },
      inputVisible: false,
      inputValue: '',
      formLabelWidth: '4em',
      rules:{
        resourceName: [
          {required:true,message:'请输入资源名称',trigger:'blur'},
        ],
        description: [
          {required:true,message:'请输入简单描述',trigger:'blur'},
          {min:2,max:20,message:'长度在2到20个字符',trigger: 'blur'},
        ],
        detail: [
          {required:true,message:'请输入详细信息',trigger:'blur'},
          {min:10,message:'长度大于10个字符',trigger: 'blur'},
        ],
        link: [
          {required:true,message:'请输入活动名称',trigger:'blur'},
          {min:2,max:16,message:'长度在2到16个字符',trigger: 'blur'},
        ],
        tags: [
          {type:'array',required:true,message:'至少上传一个标签',trigger:'blur'},
        ],
        coverage: [
          {required:true,message:'请上传封面',trigger:'blur'},
        ],
      }
    }
  },
  methods: {
    upload() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          this.$message.error('提交失败!!');
          return false;
        }
      });
      let key = this.form.coverage.uid + this.form.coverage.name
      let coverage = this.form.coverage
      let form = this.form
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
        if (err || data.statusCode !== 200) {
          this.$message.error("图片上传失败，请重新上传")
        } else {
          let resource = JSON.stringify({
            "planetCode": form.planetCode,
            "resourceName": form.resourceName,
            "link": form.link,
            "coverage": "https://" + data.Location,
            "resourceDescription": form.description,
            "details": form.detail,
            "tagList": form.tags
          })
          uploadResource(resource).then((res) => {
            console.log(res)
            if (res.data.success === true) {
              that.$message("上传成功",'success')
              that.dialogFormVisible = false
            }
          }).catch(err)
          {
            console.log(err)
          }
        }

      })
    },
    handlePicturePreview(file) {
      this.form.coverage = file.raw
      this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    handleClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }

}
</script>

<style scoped>


.el-button {
  font-weight: bolder;
  border:1px solid #00ded4;
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
  background-position: center;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
