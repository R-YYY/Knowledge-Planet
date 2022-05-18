<template>
  <div id="checkRsc">
    <Header></Header>
    <div id="main">
      <el-backtop target="#checkRsc"><i class="el-icon-caret-top"></i></el-backtop>
      <div style="display: flex">
        <CheckRscHeader @select="select"></CheckRscHeader>
        <div class="switch">
          <span>星主审核模式</span>
          <el-switch
              v-model="check"
              @change="$router.push({name:'resource'})"
              active-color="#74D8BE"
              inactive-color="#CECACA">
          </el-switch>
        </div>
      </div>
      <div v-if="type==='unChecked'" class="content">
        <div class="card" v-for="item in resourceList" :key="item.resourceId"
             v-if="item.status===0">
          <CheckRscCard :resource="item"></CheckRscCard>
        </div>
      </div>
      <div v-else class="content">
        <div class="card" v-for="item in resourceList" :key="item.resourceId"
             v-if="item.status===1 && (showAllChecked?true:item.isRecommended===isRecommended)">
          <CheckRscCard :resource="item"></CheckRscCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckRscHeader from "@/components/planet/checkRsc/CheckRscHeader";
import CheckRscCard from "@/components/planet/checkRsc/CheckRscCard";
import {getResourceByPCode} from "@/api/planet/resource";
export default {
  name: "CheckRscView",
  components: {
    CheckRscCard,
    CheckRscHeader,
  },
  data() {
    return {
      check:true,
      resourceList: [],
      isRecommended: true,
      type: 'unChecked',
      showAllChecked:false,
    }
  },
  created() {
    let planetCode = window.sessionStorage.getItem("planetCode")
    getResourceByPCode(planetCode).then((res) => {
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
        case "checked":
          this.showAllChecked = true;
          break;
        case "checked&&recommend":
          this.showAllChecked = false;
          this.isRecommended = true;
          break;
        case "checked&&unRecommend":
          this.showAllChecked = false;
          this.isRecommended = false;
          break;
        case "unChecked":
          break;
      }
    },
  }
}
</script>

<style scoped>
#checkRsc {
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

.switch{
  margin-top: 15px;
  margin-left: 480px;
  font-size: 15px;
  color: #54524f;
  /*font-weight: bold;*/
}

.switch span{
  height: 20px;
  line-height: 20px;
  margin-right: 20px;
}
</style>