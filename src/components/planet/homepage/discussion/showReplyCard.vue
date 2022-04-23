<template>
  <div id="reply">
    <span class="replyNum" @click="dialogFormVisible=true">共{{ replyNum }}条回复</span>
    <el-dialog title="发起讨论" :visible.sync="dialogFormVisible">

    </el-dialog>
  </div>

</template>

<script>
import cos from "@/api/cos";
import {uploadResource} from "@/api/planet/resource";

export default {
  name: "showReplyCard",
  props:['replyNum'],
  data() {
    return {
      dialogFormVisible:false
    }
  },
  watch:{
    dialogFormVisible(){

    }
  }


}
</script>

<style scoped>
#reply{
  display: inline-block;
}
.replyNum {
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
  margin-left: 20px;
  font-size: 16px;
  color: #8f8f8f;
}

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

/deep/ .el-dialog__title {
  color: #74D8BE;
}

/deep/ .el-dialog__body {
  margin: 0;
  padding: 0;
  line-height: 20px;
}

</style>
