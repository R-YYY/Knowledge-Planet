<template>
  <div id="resource">
    <Header></Header>
    <div id="main">
      <HeadBar @select="select"></HeadBar>
      <div class="content">
        <div class="card" v-for="(item,index) in resourceList" :key="item.resourceId">
          <Card :resource="item" v-show="isRecommended||item.isRecommended"></Card>
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
      page: 'all',
      planetCode: "1234",
      resourceList: [],
      resourceListByTime: [],
      isRecommended: true,
    }
  },
  created() {
    getResourceByPCode(1234).then((res) => {
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
      console.log(val)
      switch (val) {
        case "all":
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
</style>
