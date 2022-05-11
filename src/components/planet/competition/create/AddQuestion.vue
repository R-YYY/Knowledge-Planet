<template>
  <div>
    <div class="header">
      <div class="drawer_name">请编辑题目内容</div>
      <div class="save">保存</div>
      <div class="cancel">取消</div>
    </div>
    <div style="display: flex">
      <div class="add_left">
        <div style="margin-bottom: 10px">题目</div>
        <el-input class="question_input" type="textarea" :autosize="{ minRows: 5}" v-model="question.description"></el-input>
        <div style="margin-top: 20px;margin-bottom: 10px">选项</div>
        <div v-for="(item,index) in question.choice">
          <el-input v-model="question.choice[index]"></el-input>
          <div class="choice_set_area">
            <div v-if="item===question.answer">
              <el-tag type="success" size="mini">正确答案</el-tag>
              <span class="choice_cancel">取消</span>
            </div>
            <div v-else class="choice_set">
              <i class="el-icon-check"></i><span>设为正确答案</span>
            </div>
            <div class="choice_delete">
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </div>
        <div class="add_btn">
          <i class="el-icon-plus"></i><span>添加选项</span>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="add_right">
        <div style="margin-bottom: 10px">预览</div>
        <div class="right_description">
          {{question.description}}
        </div>
        <div class="right_choice">
          <div v-for="item in question.choice">
            <input type="radio"></input>{{item}}
            <el-tag v-if="item===question.answer" type="success" size="mini">正确答案</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddQuestion",
  props:["question"],
}
</script>

<style scoped>
.header{
  display: flex;
  height: 70px;
  border-bottom: 1px solid #dcdfe6;
}

.drawer_name{
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
  margin-left: 20px;
}

.save{
  margin-left: 1150px;
  margin-top: 20px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  width: 60px;
  border-radius: 5px;
  color: white;
  background-color: #74D8BE;
  cursor: pointer;
}

.cancel{
  margin-left: 30px;
  margin-top: 20px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  width: 60px;
  border-radius: 10px;
  background-color: #f1f3fa;
  cursor: pointer;
}

.add_left{
  width: 50%;
  margin-left: 20px;
  margin-top: 10px;
}

.question_input{

}

.choice_set_area{
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
}

.choice_delete{
  color: #848b96;
  margin-left: 83%;
}

.choice_cancel,.choice_set{
  cursor: pointer;
  font-size: 14px;
  color: #858b92;
}

.choice_cancel{
  margin-left: 10px;
}

/*垂直线*/
.el-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 530px;
  margin-left: 10px;
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
}

.add_btn{
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  color: #74D8BE;
  border: 2px dotted #74D8BE;
  cursor: pointer;
  margin-bottom: 20px;
}

.add_right{
  width: 50%;
  margin-top: 10px;
}

.right_description{
  /*margin-bottom: 20px;*/
}

.right_choice{
  margin-top: 20px;
}

.right_choice div{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>