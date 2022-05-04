<template>
  <div>
    <el-button round icon="el-icon-upload" @click="dialogVisible=true">发布竞赛</el-button>
    <div>
      <el-dialog title="竞赛信息" :visible.sync="dialogVisible" width="50%">
        <el-form ref="competitionForm" :rules="rules" label-position="right" label-width="100" class="form">
          <el-form-item label="竞赛名称" prop="title">
            <el-input v-model="title" placeholder="请输入竞赛名称" style="width: 420px"></el-input>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="7">
              <el-form-item prop="startTime">
                <el-date-picker type="datetime" placeholder="选择开始时间" v-model="startTime" style="width: 100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col style="text-align: center" :span="2">-</el-col>
            <el-col :span="7">
              <el-form-item prop="endTime">
                <el-date-picker  type="datetime" placeholder="选择结束时间" v-model="endTime" style="width: 100%"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="create">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateCompetition",
  data(){
    return{
      dialogVisible:false,
      title:"",
      startTime:"",
      endTime:"",
      rules:{
        title: [
          { required: true, message: '请输入竞赛名称', trigger: 'blur' },
        ],
        startTime: [
          { type: 'datetime', required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { type: 'datetime', required: true, message: '请选择结束时间', trigger: 'change' }
        ],
      }
    }
  },
  methods:{
    create(){
      this.$refs.competitionForm.validate((val)=>{
        if(val){
          this.$message({type:"success",message:"success"})
          this.dialogVisible=false
        }
      })
    }
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

.form{
  margin-left: 100px;
}
</style>