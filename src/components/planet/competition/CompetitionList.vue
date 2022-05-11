<template>
  <div class="competition_list">
    <div class="header">全部竞赛</div>
    <hr class="line">
    <div style="display: flex">
      <div class="name">竞赛信息</div>
      <div class="opera">操作</div>
    </div>
    <hr class="line">
    <div v-if="competitionList.length===0" class="empty"></div>
    <div v-else style="height: 610px">
      <div v-for="item in competitionList.slice((currentPage-1)*10,currentPage*10)">
        <CompetitionListItem :competition="item"></CompetitionListItem>
        <hr class="line">
      </div>
    </div>
    <div class="page">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="competitionList.length"
          :current-page="currentPage"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CompetitionListItem from "@/components/planet/competition/CompetitionListItem";
export default {
  name: "CompetitionList",
  components: {CompetitionListItem},
  data(){
    return{
      competitionList:[{
        title:"",
        time:"",
        duration:"",
      }],
      currentPage:1,
    }
  },
  methods:{
    handleCurrentChange(val){
      this.currentPage = val
    }
  },
  created() {
    this.competitionList=[]
    for (let i = 0; i < 77; i++) {
      this.competitionList.push({
        id:i,
        title:"竞赛"+(i+1)+"的名字",
        picture:"https://img1.baidu.com/it/u=1269253414,843691233&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=311",
        startTime:"2022-5-11 15:00",
        endTime:"2022-5-11 18:00",
      })
    }
  }
}
</script>

<style scoped>
.competition_list{
  width: 580px;
  height: 790px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;
}

.header{
  font-weight: bold;
  font-size: 25px;
  color: #6f6e6e;
  margin-top: 30px;
  margin-left: 40px;
  margin-bottom: 20px;
}

.line{
  margin: 0 30px 0;
  border-top:1px solid #C1C0C0;
  border-bottom: 0;
}

.name{
  margin-left: 55px;
  width: 425px;
  line-height: 30px;
}

.opera{
  line-height: 30px;
}

.page{
  text-align: center;
  padding-top: 15px;
}

.empty{
  position: relative;
  height: 610px;
  width: 100%;
  background-image: url("../../../assets/picture/empty.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}
</style>