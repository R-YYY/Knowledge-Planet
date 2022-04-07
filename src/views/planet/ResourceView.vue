<template>
  <div id="resource">
    <Header></Header>
      <HeadBar id="headBar"></HeadBar>
  </div>
</template>

<script>
import HeadBar from "@/components/planet/ResourceHeader"
export default {
  name: "ResourceView",
  components:{
    HeadBar
  }


}
</script>

<style scoped>
#headBar {
  margin-top: 30px;
  margin-left: 150px;
}
</style>
