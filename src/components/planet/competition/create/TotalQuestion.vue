<template>
  <div>
    <div style="display: flex">
      <div>
        <div class="top">题数</div>
        <div class="num">{{questionList.length}}</div>
      </div>
      <div>
        <div class="top">总分</div>
        <div class="num">{{getTotalScore()}}</div>
      </div>
    </div>
    <div class="add_question" @click="$refs.child.show()">添加题目</div>
    <div style="display: flex">
      <div class="create">发布</div>
      <div class="cancel">取消</div>
    </div>
    <EditQuestion ref="child" :item="question"></EditQuestion>
  </div>
</template>

<script>
import EditQuestion from "@/components/planet/competition/create/EditQuestion";
export default {
  name: "TotalQuestion",
  components: {EditQuestion},
  props:["questionList"],
  data(){
    return{
      question:{
        title:"",
        content:"",
        choices:["","",""],
        answer:null,
      }
    }
  },
  methods:{
    getTotalScore(){
      let result = 0
      for (let i = 0; i < this.questionList.length; i++) {
        result += this.questionList[i].score
      }
      return result
    }
  }
}
</script>

<style scoped>
.top{
  text-align: center;
  color: #858b92;
  width: 50px;
  line-height: 25px;
  margin-top: 15px;
  margin-left: 60px;
}

.num{
  text-align: center;
  color: black;
  width: 50px;
  line-height: 25px;
  margin-left: 60px;
}


.add_question{
  width: 260px;
  text-align: center;
  font-weight: bold;
  margin-left: 20px;
  line-height: 40px;
  background-color: #ddf8f0;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
}

.create{
  text-align: center;
  line-height: 30px;
  width: 60px;
  font-weight: bold;
  border-radius: 10px;
  color: white;
  background-color: #74D8BE;
  margin-left: 50px;
  margin-top: 50px;
  cursor: pointer;
}

.cancel{
  text-align: center;
  line-height: 30px;
  width: 60px;
  font-weight: bold;
  border-radius: 10px;
  background-color: #f1f3fa;
  margin-left: 80px;
  margin-top: 50px;
  cursor: pointer;
}
</style>