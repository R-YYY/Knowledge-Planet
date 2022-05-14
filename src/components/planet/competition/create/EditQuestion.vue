<template>
  <div>
    <el-drawer :visible.sync="visible" direction="btt" :with-header="false" size="85%" :before-close="beforeClose">
      <div class="header">
        <div class="drawer_name">请编辑题目内容</div>
        <div class="save" @click="save">保存</div>
        <div class="cancel" @click="beforeClose">取消</div>
      </div>
      <div style="display: flex">
        <div class="add_left">
          <div style="margin-bottom: 10px">题目</div>
          <el-input class="question_input" type="textarea" :autosize="{ minRows: 5}" v-model="question.content"></el-input>
          <div style="margin-bottom: 10px">分数</div>
          <el-input class="score_input" v-model="question.score"></el-input>
          <div style="margin-top: 20px;margin-bottom: 10px">选项</div>
          <div v-for="(item,index) in question.choices">
            <el-input v-model="question.choices[index]"></el-input>
            <div class="choice_set_area">
              <div v-if="index==question.answer">
                <el-tag type="success" size="mini">正确答案</el-tag>
                <span class="choice_cancel" @click="question.answer=null">取消</span>
              </div>
              <div v-else class="choice_set" @click="setAnswer(index)">
                <i class="el-icon-check"></i><span>设为正确答案</span>
              </div>
              <div :class="question.choices.length>2?'choice_delete':'choice_delete_forbidden'" @click="deleteChoice(index)">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
          <div class="add_btn" @click="addChoice">
            <i class="el-icon-plus"></i><span>添加选项</span>
          </div>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="add_right">
          <div style="margin-bottom: 10px">预览</div>
          <div class="right_description">
            {{question.content}}<span class="right_score">({{question.score}}分)</span>
          </div>
          <div class="right_choice">
            <div v-for="(item,index) in question.choices">
              <input type="radio" disabled></input>{{item}}
              <el-tag v-if="index==question.answer" type="success" size="mini">正确答案</el-tag>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {addQuestion, updateQuestion} from "@/api/planet/question";

export default {
  name: "EditQuestion",
  props:["item"],
  data(){
    return{
      visible:false,
      question:JSON.parse(JSON.stringify(this.item)),
    }
  },
  methods:{
    show(){
      this.visible = true
    },

    hide(){
      this.visible = false
    },

    addChoice(){
      this.question.choices.push("")
    },

    deleteChoice(index){
      if(this.question.choices.length > 2) {
        if(this.question.answer > index){
          this.question.answer--;
        }
        else if(this.question.answer === index){
          this.question.answer=null
        }
        this.question.choices.splice(index, 1)
      }
    },

    setAnswer(index){
      this.question.answer = index
    },

    validate(){
      return this.question.content.trim() !== "" &&
          this.question.answer !== null &&
          this.question.answer <= this.question.choices.length &&
          this.question.score > 0
    },

    save(){
      if(!this.validate()){
        this.$message.error("题目信息填写不完整，请检查后重试！")
        return
      }
      if(this.question.questionId === ""){
        this.addQuestion()
      }
      else{
        this.changeQuestion()
      }
    },

    changeQuestion(){
      updateQuestion(this.question).then((res)=>{
        console.log(res.data)
        this.$message({type:"success",message:"更新成功"})
        location.reload()
        this.$router.go(0)
      }).catch(()=>{
        this.$message({type:"error",message:"系统错误，请稍后重试"})
      })
    },

    addQuestion(){
      addQuestion(this.question).then((res)=>{
        console.log(res.data)
        this.$message({type:"success",message:"添加成功"})
        location.reload()
        this.$router.go(0)
      }).catch(()=>{
        this.$message({type:"error",message:"系统错误，请稍后重试"})
      })
    },

    beforeClose(){
      if(JSON.stringify(this.item) !== JSON.stringify(this.question)) {
        this.$confirm('在关闭前请确认是否保存修改？').then(_ => {
          this.save()
        }).catch(_ =>{
          this.question = JSON.parse(JSON.stringify(this.item))
          this.visible = false
        });
      }
      else{
        this.visible = false
      }
    }
  },
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
  margin-bottom: 10px;
}

.choice_set_area{
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
}

.score_input{
  width: 50px;
}

.choice_delete{
  color: #848b96;
  margin-left: 83%;
  cursor: pointer;
}

.choice_delete_forbidden{
  color: #848b96;
  margin-left: 83%;
  cursor: not-allowed;
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

.right_score{
  color: #8c939d;
  margin-left: 10px;
}
</style>