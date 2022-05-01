<template>
  <div class="members_card">
    <div v-if="total===0" class="empty">
      <span class="no">星球暂无成员</span>
    </div>
    <div v-else>
      <div class="search">
        <el-input placeholder="请输入星球人员名称或邮箱"></el-input>
      </div>
      <div v-for="item in showMember">
        <div style="display: flex">
          <MemberCard :member="item" @deleteMember="deleteMember"></MemberCard>
        </div>
        <hr class="line">
      </div>
      <div>
        <el-pagination
            class="page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
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
      total:0,
      pageSize:20,
      currentPage:1,
      member:[],
      showMember:[],
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.showMember = this.member.slice((this.currentPage-1)*val,this.currentPage*val)
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.showMember = this.member.slice((val-1)*this.pageSize,val*this.pageSize)
      console.log(`当前页: ${val}`);
    },

    deleteMember(userId){
      this.total--;
      this.member = this.member.filter(item => item.userId !== userId)
      this.showMember = this.member.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
    }
  },
  mounted() {
    getMember("23").then((res)=>{
      if(res.data.data.result === undefined){
        return
      }
      this.member = JSON.parse(JSON.stringify(res.data.data.result))
      this.total = this.member.length
      this.showMember = this.member.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
    })

    // this.total = 43;
    // for (let i = 0; i < this.total; i++) {
    //   this.member.push({
    //     userId:i,
    //     userName:i+"的名字在哪里？",
    //     role:"普通成员",
    //     avatar: "https://img1.baidu.com/it/u=1919046953,770482211&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    //     topicNum:12,
    //     answerNum:23
    //   })
    // }
    // this.showMember = this.member.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
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
  padding-top: 30px;
  padding-bottom: 20px;
  margin-left: 60px;
}

.search{
  margin-left: 100px;
  padding-top: 40px;
  padding-bottom: 30px;
  width: 400px;
}

.line{
  margin: 15px 50px;
  border-top:1px dotted #C1C0C0;
  border-bottom: 0;
}
.empty {
  border-radius: 0 0 20px 20px;
  position: relative;
  height: 500px;
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
  left: 43%;
}
</style>