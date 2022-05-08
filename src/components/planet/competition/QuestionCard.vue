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
    </div>
    <div v-if="ifShow" class="info">
      <div class="description">
        {{question.description}}
      </div>
      <div class="choice">
        <div>
          <input type="radio"></input>选项A<span>(正确答案)</span>
        </div>
        <div>
          <input type="radio"></input>选项B<span>(正确答案)</span>
        </div>
        <div>
          <input type="radio"></input>选项C<span>(正确答案)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionCard",
  props:["question","index"],
  data(){
    return{
      ifShow:false,
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

.choice div span{
  font-size: 12px;
  color:red;
}

.info{
  color: black;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 50px;
}
</style>