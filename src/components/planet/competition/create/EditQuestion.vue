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
          <div style="margin-top: 20px;margin-bottom: 10px">选项</div>
          <div v-for="(item,index) in question.choices">
            <el-input v-model="question.choices[index]"></el-input>
            <div class="choice_set_area">
              <div v-if="index===question.answer">
                <el-tag type="success" size="mini">正确答案</el-tag>
                <span class="choice_cancel">取消</span>
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
            {{question.content}}
          </div>
          <div class="right_choice">
            <div v-for="(item,index) in question.choices">
              <input type="radio"></input>{{item}}
              <el-tag v-if="index===question.answer" type="success" size="mini">正确答案</el-tag>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
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
        this.question.choices.splice(index, 1)
      }
    },

    setAnswer(index){
      this.question.answer = index
    },

    change(){
      return this.item.content === this.question.content &&
          this.item.answer === this.question.answer &&
          this.item.choices === this.question.choices
    },

    save(){

    },

    beforeClose(){
      console.log(this.item)
      console.log(this.question)
      if(JSON.stringify(this.item) !== JSON.stringify(this.question)) {
        this.$confirm('在关闭前请确认是否保存修改？').then(_ => {

          this.visible = false
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

}

.choice_set_area{
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
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
</style>