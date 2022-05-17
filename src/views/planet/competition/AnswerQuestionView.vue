<template>
  <div>
    <Header></Header>
    <QuestionArea v-if="competition.score===null" @getScore="getScore" :competition="competition"></QuestionArea>
    <ScoreCard v-if="competition.score!==null" :score="competition.score"></ScoreCard>
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
        id:1,
        title:"第十周",
        score:null,
        time:0,
      }
    }

  },
  created() {
    console.log(this.$route.params)
    this.competition.id = this.$route.params.id
    this.competition.title = this.$route.params.title
  },
  mounted() {
    this.getScore()
  },
  methods: {
    getScore(){
      getCompetitionScore(this.competition.id).then((res)=>{
        if(res.data.success){
          console.log(res.data.data.score)
          this.competition.score = res.data.data.score
          console.log(this.competition.score===null)
        }
      }).catch((err)=>{
        console.log(err)
        this.competition.score = null
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
