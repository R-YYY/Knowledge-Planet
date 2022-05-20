<template>
  <div class="members_card">
    <div class="search">
      <el-input placeholder="请输入星球人员名称或邮箱" v-model="input" @input="search" clearable></el-input>
    </div>
    <div v-if="member.length===0" class="empty">
      <span class="no">星球暂无成员</span>
    </div>
    <div v-else-if="showMember.length===0" class="empty">
      <span class="no">星球没有这个成员</span>
    </div>
    <div v-else style="min-height: 430px">
      <div v-for="item in showMember.slice((currentPage-1)*pageSize,currentPage*pageSize)">
        <div>
          <MemberCard :member="item" @deleteMember="deleteMember"></MemberCard>
        </div>
        <hr class="line">
      </div>
    </div>
    <div class="page">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="showTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import MemberCard from "@/components/planet/member/MemberCard";
import {getMember} from "@/api/planet/member";
export default {
  name: "MemberManage",
  components: {MemberCard},
  data(){
    return{
      showTotal:0,
      member:[],
      showMember:[],
      pageSize:20,
      currentPage:1,
      input:"",
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },

    handleCurrentChange(val) {
      this.currentPage = val;
    },

    deleteMember(userId){
      this.member = this.member.filter(item => item.userId !== userId)
      this.showMember = this.member
      this.showTotal = this.showMember.length
    },

    search(){
      if(this.input.stripe === ""){
        this.showMember = this.member
        this.showTotal = this.showMember.length
        return
      }
      this.showMember = []
      for (let i = 0; i < this.member.length; i++) {
        let item = this.member[i]
        if(item.userName.includes(this.input) || item.email.includes(this.input)){
          this.showMember.push(item)
        }
      }
      this.showTotal = this.showMember.length
    }
  },
  mounted() {
    let planetCode = window.sessionStorage.getItem("planetCode")
    getMember(planetCode).then((res)=>{
      if(res.data.data.result === undefined){
        return
      }
      let list = res.data.data.result
      let userId = window.sessionStorage.getItem("userId")
      for (let item of list) {
        if(item.userId.toString() !== userId){
          this.member.push(item)
        }
      }
      this.showMember = this.member
      this.showTotal = this.showMember.length
    })
  }
}
</script>

<style scoped>
.members_card{
  position: relative;
  text-align: left;
  width: 800px;
  min-height: 650px;
  margin-left: 100px;
  margin-top: 30px;
  margin-bottom: 0;
  background-color: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 0 15px #cdcdcd;
}

.page{
  text-align: center;
  padding-top: 30px;
  padding-bottom: 20px;
}

.search{
  display: flex;
  margin-left: 100px;
  padding-top: 40px;
  padding-bottom: 30px;
  width: 300px;
}

.line{
  margin: 15px 50px;
  border-top:1px dotted #C1C0C0;
  border-bottom: 0;
}
.empty {
  position: relative;
  height: 430px;
  width: 100%;
  background-image: url("../../../assets/picture/empty.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}

.no{
  color: #cccccc;
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  top: 75%;
  width: 100%;
  text-align: center;
}
</style>