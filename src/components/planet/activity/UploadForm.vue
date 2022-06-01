<template>
  <div>
    <el-button round icon="el-icon-upload" @click="dialogFormVisible=true">发布活动</el-button>
    <el-dialog title="发布活动" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm" class="form">
        <el-form-item label="标签" prop="tag" :label-width="formLabelWidth">
          <el-select v-model="form.tag" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="maxNumber" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.maxNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="time" :label-width="formLabelWidth">
          <el-date-picker
              v-model="form.time"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
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
import {addActivity} from "@/api/planet/activity";
import {dateFormat} from "@/api/planet/competition";

export default {
  name: "uploadForm",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        planetCode: window.sessionStorage.getItem("planetCode"),
        title: '',
        description: '',
        tag: '',
        time: '',
        maxNumber: '',
        address: '',
      },
      formLabelWidth: '4em',
      rules: {
        title: [
          {required: true, message: '请输入名称', trigger: 'blur'},
        ],
        description: [
          {required: true, message: '请输入简单描述', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur'},
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'blur'},
        ],
        maxNumber: [
          {required: true, message: '请输入最大人数', trigger: 'blur'},
        ],
        tag: [
          {required: true, message: '请选择一个标签', trigger: 'blur'},
        ],
        time: [
          {required: true, message: '请选择时间', trigger: 'blur'},
        ],
      },
      options: [
        {
          value: '学习',
          label: '学习'
        }, {
          value: '休闲',
          label: '休闲'
        }, {
          value: '娱乐',
          label: '娱乐'
        }],
    }
  },
  methods: {
    upload() {
      let date = dateFormat("YYYY-mm-dd HH:MM:SS",new Date())
      if(this.form.time[1]<=date||!this.form.time[1]||!this.form.time[0]){
        this.$message.error("时间有误，请重新选择时间")
        return
      }
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          this.$message.error('提交失败!!');
          return false;
        }
        console.log(this.form.time[0])
        let data = JSON.stringify({
          "planetCode": this.form.planetCode,
          "title": this.form.title,
          "description": this.form.description,
          "tag": this.form.tag,
          "maxNumber": this.form.maxNumber,
          "startTime": this.form.time[0],
          "endTime": this.form.time[1],
          "address": this.form.address,
        })
        addActivity(data).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.dialogFormVisible = false
            this.$message.success("发布成功！")
            this.$emit('update')
          } else {
            this.$message.error("发布失败!")
          }
        }).catch((err) => {
          this.$message.error("发布失败，系统错误！")
          console.log(err)
        })
      })
    },

  }
}
</script>

<style scoped>


.el-button {
  font-weight: bolder;
  border: 1px solid #00ded4;
  color: #00ded4;
}

.el-button:hover,
.el-button:focus {
  background: #00ded4 !important;
  color: white !important;
  font-weight: bold;
}

/deep/ .el-dialog__header {
  text-align: center;
  height: 70px;
}

/deep/ .el-dialog__body {
  padding-bottom: 0;
}

.dialog-footer {
  text-align: center;
  height: 50px;
  line-height: 50px;
  margin-bottom: 20px;
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

</style>
