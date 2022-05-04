<template>
  <div class="card">
    <div>
      <div class="name">{{competition.title}}</div>
      <div class="time">{{competition.time}}</div>
    </div>
    <div>
      <div class="duration">{{competition.duration}}</div>
    </div>
    <div class="btn" @click="dialogVisible=true">参加</div>
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <div class="join">
        <img class="img" src="../../../assets/competition/wenhao.png" alt="">
        <div>请确认是否参加竞赛</div>
      </div>
      <ul>
        <li>竞赛名称：{{competition.title}}</li>
        <li>开始时间：{{competition.time}}</li>
        <li>竞赛时长：{{competition.duration}}</li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CompetitionCard",
  props:["competition"],
  data(){
    return{
      dialogVisible:false,
    }
  }
}
</script>

<style scoped>
.card{
  display: flex;
  height: 60px;
  margin-left: 50px;
}

.name{
  font-weight: bold;
  width: 250px;
  height: 35px;
  line-height: 35px;
}

.time{
  width: 250px;
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  color: #6f6e6e;
}

.duration{
  width: 150px;
  height: 60px;
  line-height: 60px;
}

.btn{
  font-style: oblique;
  text-align: center;
  font-weight: bold;
  width: 60px;
  height: 30px;
  line-height: 30px;
  color: white;
  background-color: #fcc278;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 15px;
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