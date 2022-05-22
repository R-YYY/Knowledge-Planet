<template>
  <div id="collectresource">
    <div class="resource">
      <div class="header">
        <p class="resource_text">我的收藏</p>
      </div>
      <div class="none" v-if="resourceList.length==0">
        <el-empty description="暂无收藏资源"></el-empty>
      </div>

      <div class="long_resource_content" style="height:497px;overflow-y: auto" v-if="resourceList.length>=1">
        <div class="card" v-for="item in resourceList" :key="item.resourceId" >
          <FavoriteResourceCard :resource="item"></FavoriteResourceCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteResourceCard from "@/components/personalInformation/collectPage/FavoriteResourceCard";
import {getCollectResource} from "@/api/personal/information";

export default{
  components: {
    FavoriteResourceCard
  },
  data(){
    return{
      resourceList: [],
    }
  },
  created() {
    getCollectResource().then((res) => {
      console.log(res)
      console.log(1124987534)
      let list = res.data.data.resourceList
      for (let item of list) {
        this.resourceList.push(item)
      }
    }).catch(() => {
      this.$message({message: "系统错误", type: 'error'});
    })
  },
  methods:{

  },
  mounted(){

  }

}
</script>
<style scoped>
.resource{
  position:relative;
  width:900px;
  height:580px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.header{
  display:flex;
  margin-top: -15px;
  margin-left: 20px;
}
.resource_text{
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 25px;
}
.long_resource_content{
  /*position:absolute;*/
  /*width:880px;*/
  /*margin-top:100px;*/
  /*margin-left:20px;*/
  margin-left: 0px;
  margin-right: 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.card {
  margin: 20px 20px 10px 20px;
}
div .card:nth-last-child(1):nth-child(3n - 1){
  margin-right: calc(30% + 80px);
}
</style>