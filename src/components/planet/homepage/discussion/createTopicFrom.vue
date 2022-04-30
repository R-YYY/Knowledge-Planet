<template>
  <div>
    <el-button round icon="el-icon-edit" @click="dialogFormVisible=true">发起讨论</el-button>
    <el-dialog title="发起讨论" :visible.sync="dialogFormVisible">
      <answerForm @cancel="dialogFormVisible=false"></answerForm>
    </el-dialog>
  </div>

</template>

<script>
import cos from "@/api/cos";
import {uploadResource} from "@/api/planet/resource";
import answerForm from "@/components/planet/homepage/discussion/answerForm";

export default {
  name: "uploadForm",
  components: {
    answerForm
  },
  data() {
    return {
      dialogFormVisible: false,
    }
  },


}
</script>

<style scoped>


.el-button {
  font-weight: bold;
  border: 0px solid #74D8BE;
  color: #74D8BE;
  box-shadow: 0 2px 5px #74D8BE;
}

.el-button:hover,
.el-button:focus {
  border: 1px solid #74D8BE;
  box-shadow: 0 0px 0px #74D8BE;
  background: #74D8BE !important;
  color: white !important;
}

/deep/ .el-dialog {
  border-radius: 12px;
  max-width: 500px;
  background-color: #E2F5F0;
}

/deep/ .el-dialog__header {
  padding: 5px 30px;
  height: 30px;
  line-height: 50px;
  text-align: center;
  color: #42b983;
  font-weight: bold;
}

/deep/.el-dialog__title {
  color: #74D8BE;
}

/deep/ .el-dialog__body {
  margin: 0;
  padding: 0;
  line-height: 20px;
}

</style>
