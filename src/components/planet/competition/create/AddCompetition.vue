<template>
  <div class="add_competition_form">
    <div class="create_btn" @click="dialogVisible=true">
      <i class="el-icon-plus"></i>创建竞赛
    </div>
    <el-dialog title="创建竞赛" :visible.sync="dialogVisible" width="50%">
      <div class="form">
        <el-form :model="competition" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="图片" required>
            <el-upload
                class="avatar-uploader"
                :http-request="uploadPicture"
                :on-remove="removePicture"
                :limit="1"
                action="string">
              <div v-if="competition.picture!==null" :style="{backgroundImage:'url('+competition.picture+')'}"
                   class="picture"></div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="竞赛名称" prop="title">
            <el-input v-model="competition.title"></el-input>
          </el-form-item>
          <el-form-item label="竞赛描述" prop="description">
            <el-input type="textarea" :autosize="{minRows:4}" v-model="competition.description"></el-input>
          </el-form-item>
          <el-form-item label="竞赛时间" required>
            <div style="display: flex">
              <el-form-item prop="startTime">
                <el-date-picker v-model="competition.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
              </el-form-item>
              <span style="width: 30px;text-align: center">-</span>
              <el-form-item prop="endTime">
                <el-date-picker v-model="competition.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button class="cancel" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="create">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cos from "@/api/cos";
import {addCompetition} from "@/api/planet/competition";

export default {
  name: "AddCompetition",
  data() {
    return {
      dialogVisible: false,
      competition: {
        title: "",
        description: "",
        picture: null,
        createTime: "",
        startTime: "",
        endTime: "",
        questionNumber: 0,
        score: 0,
        status: 0,
      },
      rules: {
        title: [
          {required: true, message: '请输入竞赛名称', trigger: 'blur'},
        ],
        description: [
          {required: true, message: '请输入竞赛描述', trigger: 'blur'},
        ],
        startTime: [
          {type: 'date', required: true, message: '请选择开始时间', trigger: 'change'}
        ],
        endTime: [
          {type: 'date', required: true, message: '请选择结束时间', trigger: 'change'}
        ],
        picture: [
          {required: true, message: '请上传封面', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    create() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let planetCode = window.sessionStorage.getItem("planetCode")
          addCompetition(this.competition, planetCode).then((res) => {
            console.log(res.data)
            this.dialogVisible = false
            this.open(res.data.data.competitionId)
          }).catch(() => {
            this.$message({type: "error", message: "系统错误，创建失败"})
          })
        }
      })
    },

    open(competitionId) {
      this.$confirm('竞赛已创建成功，是否立即添加竞赛题目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$router.push({
          name: 'editCompetition',
          params: {
            cid: competitionId,
          },
          query: {
            competition: JSON.stringify(this.competition)
          }
        })
      }).catch(() => {
        location.reload()
        this.$router.go(0)
      });
    },

    uploadPicture(e) {
      const isJPG = e.file.type === 'image/jpeg' || e.file.type === 'image/png';
      if (!isJPG) {
        this.$message.error("请上传图片")
        return
      }
      let that = this
      cos.putObject({
        Bucket: 'covenant-1308013334', /* 必须 */
        Region: 'ap-shanghai',     /* 存储桶所在地域，必须字段 */
        Key: 'resourceCoverage/' + e.file.uid + e.file.name,              /* 必须 */
        StorageClass: 'STANDARD',
        Body: e.file, // 上传文件对象
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        }
      }, function (err, data) {
        console.log(data)
        if (err || data.statusCode !== 200) {
          that.$message.error("图片上传失败，请重新上传")
        } else {
          that.competition.picture = 'https://' + data.Location
          console.log("图片上传成功")
        }
      })
    },

    removePicture(file, fileList) {
      console.log(file)
      let that = this
      cos.deleteObject({
        Bucket: 'covenant-1308013334', /* 必须 */
        Region: 'ap-shanghai',     /* 存储桶所在地域，必须字段 */
        Key: 'competitionPicture/' + file.raw.uid + file.raw.name,              /* 必须 */
      }, function (err, data) {
        console.log(err, data)
        if (err || data.statusCode !== 204) {
          that.$message.error("图片文件失败")
        } else {
          that.competition.picture = null
          console.log("图片删除成功")
        }
      })
    },
  }
}
</script>

<style scoped>
.form {
  padding-left: 50px;
  padding-right: 110px;
}

.create_btn {
  color: white;
  font-weight: bold;
  text-align: center;
  margin-left: 870px;
  width: 120px;
  height: 38px;
  line-height: 38px;
  margin-top: 21px;
  background-color: #74D8BE;
  cursor: pointer;
  border-radius: 10px;
}

.cancel {
  margin: 20px 120px 20px 220px;
}

.picture {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
}
</style>
