<template>
  <div :class="index%2===0?'gray':'white'">
    <div style="display: flex">
      <i v-if="!ifShow" class="el-icon-arrow-right" @click="ifShow=true"
         style="margin-right: 40px;cursor: pointer;line-height: 45px"></i>
      <i v-if="ifShow" class="el-icon-arrow-down" @click="ifShow=false"
         style="margin-right: 40px;cursor: pointer;line-height: 45px"></i>
      <div class="id">{{question.id}}</div>
      <div class="des">{{question.description}}</div>
      <div class="score">{{question.score}}</div>
      <div style="display: flex">
        <div class="edit"  @click="drawer=true">
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
        {{question.description}}
      </div>
      <div class="choice">
        <div v-for="item in question.choice">
          <input type="radio"></input>{{item}}
          <el-tag v-if="item===question.answer" type="success" size="mini">正确答案</el-tag>
        </div>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" direction="btt" :with-header="false" size="85%">
      <AddQuestion :question="question"></AddQuestion>
    </el-drawer>
  </div>
</template>

<script>
import AddQuestion from "@/components/planet/competition/create/AddQuestion";
export default {
  name: "QuestionCard",
  components: {AddQuestion},
  props:["question","index"],
  data(){
    return{
      ifShow:false,
      drawer:false,
    }
  },
  mounted() {

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
</style>