<template>
  <div id="resource">
    <Header></Header>
    <div id="main">
      <HeadBar></HeadBar>
      <div id="content">
        <div class="card" v-for="(item,index) in resourceList" :key="item.id">
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

export default {
  name: "ResourceView",
  components: {
    HeadBar,
    Card
  },
  data() {
    return {
      planetCode: "1234",
      resourceList: []
    }
  },
  mounted() {
    getResourceByPCode(1234).then((res) => {
      for (let item of res.data.data.resourceList) {
        this.resourceList.push(item)
      }
    }).catch(() => {
      this.$message({message: "系统错误", type: 'error'});
    })
  },
  methods() {

  }


}
</script>

<style scoped>
#main {
  margin: 30px 100px 0 100px;
}

#content {
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
