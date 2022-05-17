<template>
  <div>
    <Header></Header>
    <QuestionArea v-if="competition.score===null" @getScore="getScore" :competition="competition"></QuestionArea>
    <ScoreCard v-else :score="competition.score" :time="competition.time"></ScoreCard>
  </div>
</template>

<script>
import QuestionArea from "@/components/planet/competition/qusetion/QuestionArea"
import ScoreCard from "@/components/planet/competition/qusetion/ScoreCard"
import {getCompetitionScore} from "@/api/planet/competition";
export default {
  name: "AnswerQuestionView",
  components:{
    QuestionArea,
    ScoreCard
  },
  data() {
    return {
      competition:{
        Id:1,
        title:"第十周",
        score:null,
        time:0,
      }
    }

  },
  mounted() {
    this.getScore()
  },
  methods: {
    getScore(){
      getCompetitionScore(this.competition.Id).then((res)=>{
        if(res.data.success){
          this.competition.score = res.data.data.score
        }
      }).then((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>


#clock_box {
  position: fixed;
  right: 40px;
  z-index: 10;
  top: 100px;
  width: 160px;
  height: 50px;
  box-shadow: 0 0 12px #ababab;
  border-radius: 12px;
  background-color: white;
  text-align: center;
}

.remain_time {
  margin: 0;
  padding: 0;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  color: #606060;
}

</style>
