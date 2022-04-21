<template>
  <div id="resource">
    <Header></Header>
    <div id="main">
      <el-backtop target="#resource"><i class="el-icon-caret-top"></i></el-backtop>
      <HeadBar @select="select"></HeadBar>
      <div v-if="type==='all'||type==='recommend'" class="content">
        <div class="card" v-for="(item,index) in resourceList" :key="item.resourceId"
             v-show="isRecommended||item.isRecommended">
          <Card :resource="item"></Card>
        </div>
      </div>
      <div v-else class="content">
        <div class="card" v-for="(item,index) in resourceList" :key="item.resourceId"
             v-if="index<11">
          <Card :resource="item"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "@/components/planet/resource/ResourceHeader"
import Card from "@/components/planet/resource/ResourceCard"
import {getResourceByPCode} from "@/api/planet/resource"
import {compareByDesc, compareByAsc} from "@/utils/compare";

export default {
  name: "ResourceView",
  components: {
    HeadBar,
    Card
  },
  data() {
    return {
      planetCode: "1234",
      resourceList: [],
      isRecommended: true,
      type: 'all'
    }
  },
  created() {
    getResourceByPCode(1234).then((res) => {
      console.log(res)
      let list = res.data.data.resourceList
      for (let item of list) {
        this.resourceList.push(item)
      }
    }).catch(() => {
      this.$message({message: "系统错误", type: 'error'});
    })
  },
  methods: {
    select(val) {
      this.type = val
      switch (val) {
        case "all":
          this.isRecommended = true;
          this.resourceList.sort(compareByAsc("resourceId"))
          break;
        case "hot":
          this.isRecommended = true;
          this.resourceList.sort(compareByDesc("likeCount"))
          break;
        case "time":
          this.isRecommended = true;
          this.resourceList.sort(compareByDesc("uploadTime"))
          break;
        case "recommend":
          this.isRecommended = false;
          break;
      }
    }
  }


}
</script>

<style scoped>
#resource {
  height: 100vh;
  overflow-x: hidden;
}

#main {
  margin: 30px 100px 0 100px;
}

.content {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

}

.card {
  margin: 40px 20px 10px 20px;
}
div .card:nth-last-child(1):nth-child(3n - 1){
  margin-right: calc(30% + 80px);
}
</style>
