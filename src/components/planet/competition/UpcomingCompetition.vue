<template>
  <div class="upcoming_card">
    <el-carousel :interval="4000" type="card" height="290px">
      <el-carousel-item v-if="competitionList.length===0" class="empty_card">
        <img src="../../../assets/picture/empty.png" alt="">
        <div class="empty_word">当前星球没有竞赛可以参加</div>
      </el-carousel-item>
      <el-carousel-item v-else v-for="item in competitionList" :key="item.id" class="item_card">
        <div>
          <div class="com_name">{{ item.title }}</div>
          <div class="com_time">时间：{{ item.startTime }} ~ {{item.endTime}}</div>
          <div class="com_des">{{ item.description }}</div>
          <div class="btn" @click="dialogVisible=true;chooseCom=item">参加</div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div>
      <el-dialog :visible.sync="dialogVisible" width="30%" center>
        <div class="join">
          <img class="img" src="../../../assets/competition/wenhao.png" alt="">
          <div>请确认是否参加竞赛</div>
        </div>
        <ul>
          <li>竞赛名称：{{chooseCom.title}}</li>
          <li>开始时间：{{chooseCom.startTime}}</li>
          <li>结束时间：{{chooseCom.endTime}}</li>
        </ul>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpcomingCompetition",
  data(){
    return{
      dialogVisible:false,
      competitionList:[],
      chooseCom:{
        title:"",
        startTime:"",
        endTime:"",
        description:"",
      },
    }
  },
  methods:{
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.competitionList.push({
        id:i,
        title:"前端星第"+(i+1)+"场周赛",
        startTime:"2022-4-27 15:00",
        endTime:"2022-4-27 17:00",
        description:"给每一个热带前端的小伙伴一次提升自己的机会！还等啥，快来参加~",
      })
    }
  }
}
</script>

<style scoped>
.upcoming_card{
  width: 1020px;
  margin-left: 250px;
}

.item_card{
  height: 270px;
  background: url("../../../assets/competition/shan.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 20px;
}

.empty_card{
  text-align: center;
  height: 270px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;
}

.empty_word{
  margin-top: -15px;
  font-weight: bold;
  color: #909399;
}

.com_name{
  margin-top: 30px;
  margin-left: 40px;
  font-size: 27px;
  font-weight: bolder;
  color: #6a6868;
}

.com_time{
  margin-top: 20px;
  margin-left: 40px;
  font-size: 17px;
  font-weight: bolder;
  color: #6a6868;
}

.com_des{
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 30px;
  font-size: 17px;
  font-style: oblique;
  color: #6a6868;
}

.btn{
  position: relative;
  left: 50%;
  margin-left: -40px;
  margin-top: 30px;
  color: white;
  font-weight: bold;
  text-align: center;
  width: 80px;
  height: 35px;
  line-height: 35px;
  background-color: #f7aa22;
  border-radius: 20px;
  cursor: pointer;
}

.join{
  color: black;
  text-align: center;
  font-size: 20px;
}

.img{
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

ul{
  color: black;
  list-style: none;
  margin-top: 50px;
  margin-left: 30px;
  font-size: 15px;
  line-height: 30px;
}
</style>