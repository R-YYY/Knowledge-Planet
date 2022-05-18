<template>
  <div class="member_card">
    <div>
      <img class="img" :src="member.avatar" alt="">
    </div>
    <div>
      <div class="name">{{ member.userName }}</div>
      <div class="role">普通成员</div>
      <div class="info">
        邮箱：{{member.email}}
      </div>
    </div>
    <div class="delete">
      <el-button round @click="deleteMe">踢出星球</el-button>
    </div>
  </div>
</template>

<script>
import {deleteMember} from "@/api/planet/member";

export default {
  name: "MemberCard",
  props:["member"],
  methods:{
    deleteMe() {
      let planetCode = window.sessionStorage.getItem("planetCode")
      deleteMember(planetCode,this.member.userId).then((res)=>{
        this.$message({message: res.data.message, type: res.data.success?'success':'error'})
        if(res.data.success){
          this.$emit('deleteMember',this.member.userId)
        }
      }).catch(()=>{
        this.$message({message: "系统错误，操作失败", type: 'error'})
      })
    }
  }
}
</script>

<style scoped>
.member_card{
  width: 700px;
  padding-left: 100px;
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
  width: 250px;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  font-size: 15px;
}

.delete{
  margin-left: 180px;
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