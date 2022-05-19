<template>
  <div>
    <Header></Header>
    <HistoryQuesArea :competition="competition"></HistoryQuesArea>
  </div>
</template>

<script>
import HistoryQuesArea from "@/components/planet/competition/record/HistoryQuesArea";
export default {
  name: "HistoryCompView",
  components: {HistoryQuesArea},
  data(){
    return{
      competition:{
        competitionId:1,
        title:"第十周",
      }
    }
  },
  created() {
    this.competition.competitionId = this.$route.params.cid
    this.competition.title = this.$route.params.title
  },
}
</script>

<style scoped>

</style>