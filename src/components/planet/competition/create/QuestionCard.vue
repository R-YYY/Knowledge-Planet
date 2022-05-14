<template>
  <div :class="index%2===0?'gray':'white'">
    <div style="display: flex">
      <i v-if="!ifShow" class="el-icon-arrow-right" @click="show"
         style="margin-left: 20px;margin-right: 40px;cursor: pointer;line-height: 45px"></i>
      <i v-if="ifShow" class="el-icon-arrow-down" @click="hide"
         style="margin-left: 20px;margin-right: 40px;cursor: pointer;line-height: 45px"></i>
      <div class="id">{{question.questionId}}</div>
      <div class="des">{{question.content}}</div>
      <div class="score">{{question.score}}</div>
      <div v-if="edit" style="display: flex">
        <div class="edit" @click="openEdit">
          <el-tooltip effect="dark" content="编辑" placement="top">
            <i class="el-icon-edit-outline"></i>
          </el-tooltip>
        </div>
        <div class="delete">
          <el-tooltip effect="dark" content="删除" placement="top">
            <i class="el-icon-delete"></i>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div v-if="ifShow" class="info">
      <div class="description">
        {{question.content}}<span class="right_score">({{question.score}}分)</span>
      </div>
      <div class="choice">
        <div v-for="(item,index) in question.choices">
          <input type="radio" disabled></input>{{item}}
          <el-tag v-if="index==question.answer" type="success" size="mini">正确答案</el-tag>
        </div>
      </div>
    </div>
    <EditQuestion ref="child" :item="question"></EditQuestion>
  </div>
</template>

<script>
import EditQuestion from "@/components/planet/competition/create/EditQuestion";
export default {
  name: "QuestionCard",
  components: {EditQuestion},
  props:["question","index","edit"],
  data(){
    return{
      ifShow:false,
    }
  },
  methods: {
    openEdit(){
      this.$refs.child.show()
    },

    show(){
      this.ifShow = true
    },

    hide(){
      this.ifShow = false
    }
  }
}
</script>

<style scoped>
.gray{
  background-color: #f7f7f8;
}

.white{

}

.id,.des,.score{
  color: #595e68;
  font-size: 14px;
  line-height: 45px;
}

.id{
  width: 100px;
}

.des{
  width: 380px;
  padding-right: 20px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.score{
  width: 100px;
}

.description{
}

.choice{
  margin-top: 20px;
}

.choice div{
  margin-top: 10px;
  margin-bottom: 10px;
}

.info{
  color: black;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 50px;
}

.edit,.delete{
  cursor: pointer;
  font-size: 16px;
  line-height: 45px;
}

.delete{
  margin-left: 40px;
  color: red;
}

.right_score{
  color: #8c939d;
  margin-left: 10px;
}
</style>