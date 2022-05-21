<template>
  <div id="collectresource">
    <div class="resource">
      <div class="header">
        <p class="resource_text">我的收藏</p>
      </div>
      <div class="resource_content">
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
  position:absolute;
  margin-top: -15px;
  margin-left: 20px;
}
.resource_text{
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 25px;
}
.resource_content{
  position:absolute;
  width:880px;
  margin-top:100px;
  margin-left:20px;
}
</style>