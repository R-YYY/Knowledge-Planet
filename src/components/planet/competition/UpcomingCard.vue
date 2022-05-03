<template>
  <div class="upcoming_card">
    <div class="left_card">
      <div class="com_name">{{competition[0].name}}</div>
      <div class="com_time">时间：{{competition[0].time}}</div>
      <div class="com_des">{{competition[0].des}}</div>
      <div class="btn">参加</div>
    </div>
    <div class="right_card">
      <div class="com_name">{{competition[1].name}}</div>
      <div class="com_time">时间：{{competition[1].time}}</div>
      <div class="com_des">{{competition[1].des}}</div>
      <div class="btn">参加</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpcomingCard",
  data(){
    return{
      competition:[
        {
          name:"前端星第一届全能知识大赛",
          time:"2022-04-20   08:00~24:00",
          des:"前端星的球友们，这是一次检测自我能力的绝佳机会，如果你想知道自己对于前端知识的掌握程度，还不点进来测测？",
        },
        {
          name:"前端星第18场周赛",
          time:"2022-04-20   08:00~24:00",
          des:"给每一个热带前端的小伙伴一次提升自己的机会！还等啥，快来参加~",
        }
      ]
    }
  }
}
</script>

<style scoped>
.upcoming_card{
  width: 1020px;
  margin-left: 250px;
  display: flex;
}

.left_card{
  width: 550px;
  height: 270px;
  margin-top: 50px;
  margin-right: 70px;
  background: url("../../../assets/competition/shan.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 20px;
}

.right_card{
  width: 400px;
  height: 270px;
  margin-top: 50px;
  background: url("../../../assets/competition/yun.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 30px;
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
</style>