<template>
  <div>
    <div class="join">
      <img class="img" src="../../../assets/competition/wenhao.png" alt="">
      <div>请确认是否参加竞赛</div>
    </div>
    <ul>
      <li>竞赛名称：{{competition.title}}</li>
      <li>开始时间：{{competition.startTime}}</li>
      <li>结束时间：{{competition.endTime}}</li>
    </ul>
    <div slot="footer" class="dialog-footer">
      <el-button @click="join">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoinCompetition",
  props:["competition"],
  methods:{
    join(){
      window.sessionStorage.setItem("endTime",this.competition.endTime)
      this.$router.push({
        name:"AnswerQuestionView",
        params:{
          id: this.competition.competitionId,
          title:this.competition.title,
        }
      })
    }
  }
}
</script>

<style scoped>
.join{
  color: black;
  text-align: center;
  font-size: 20px;
}

.img{
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

ul{
  color: black;
  list-style: none;
  margin-top: 50px;
  margin-left: 30px;
  font-size: 15px;
  line-height: 30px;
}
</style>
