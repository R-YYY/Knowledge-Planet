<template>
  <div class="member_card">
    <div>
      <img class="img" :src="member.imgUrl" alt="">
    </div>
    <div>
      <div class="name">{{ member.name }}</div>
      <div class="role">{{member.role}}</div>
      <div class="info">
        <span>{{member.topicNum}}讨论</span>
        <b>·</b>
        <span>{{member.answerNum}}回答</span>
      </div>
    </div>
    <div class="delete">
      <el-button round>踢出星球</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemberCard",
  props:["member"],
  data(){
    return{

    }
  },
}
</script>

<style scoped>
.member_card{
  width: 500px;
  padding-left: 70px;
  display: flex;
}

.img{
  width: 70px;
  height: 70px;
  border-radius: 10%;
  cursor: pointer;
}

.name{
  font-weight: bolder;
  font-size: 18px;
  height: 30px;
  line-height: 25px;
  margin-left: 10px;
  cursor: pointer;
}

.role{
  height: 25px;
  line-height: 20px;
  margin-left: 10px;
  font-size: 15px;
}

.info{
  color: #8590a6;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  font-size: 15px;
}

.info b{
  margin-left: 5px;
  margin-right: 5px;
}

.delete{
  margin-left: 80px;
  margin-top: 25px;
}

.el-button {
  padding:  0 10px!important;
  height: 32px;
  line-height: 28px;
  font-weight: bold;
  border: 1px solid #74D8BE;
  box-shadow: 1px 2px 1px #74D8BE;
  color: #74D8BE;
}

.el-button:hover,
.el-button:focus {
  border: 1px solid #74D8BE;
  box-shadow: 0 0px 0px #74D8BE;
  background: #74D8BE !important;
  color: white !important;
}
</style>