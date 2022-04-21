<template>
  <div id="memberView">
    <Header></Header>
    <div class="main">
      <div>
        <PlanetChoice></PlanetChoice>
      </div>
      <div>
        <MemberManage></MemberManage>
      </div>
    </div>
  </div>
</template>

<script>
import MemberManage from "@/components/planet/member/MemberManage";
import PlanetChoice from "@/components/planet/homepage/PlanetChoice";
export default {
  name: "MemberView",
  components: {PlanetChoice, MemberManage},
  data(){
    return{
      planet:{
        name:"Java学习",
        imgUrl:"https://img1.baidu.com/it/u=4233719733,83197555&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=303",
      }
    }
  }
}
</script>

<style scoped>
#memberView{
  background-color: #F7F6F6;
}

.main{
  display: flex;
  text-align: center;
}
</style>