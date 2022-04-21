<template>
  <div class="members_card">
    <div class="search">
      <el-input placeholder="请输入星球人员名称或邮箱"></el-input>
    </div>
    <div v-for="i in 10">
      <div style="display: flex">
        <MemberCard :member="member"></MemberCard>
        <MemberCard :member="member"></MemberCard>
      </div>
      <hr class="line">
    </div>
    <div>
      <el-pagination
          class="page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="40"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="4000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import MemberCard from "@/components/planet/member/MemberCard";
export default {
  name: "MemberManage",
  components: {MemberCard},
  data(){
    return{
      member:{
        name:"我的名字在哪里？",
        role:"普通成员",
        imgUrl: "https://img1.baidu.com/it/u=1919046953,770482211&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        topicNum:12,
        answerNum:23
      },
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
}
</script>

<style scoped>
.members_card{
  position: relative;
  text-align: left;
  width: 1000px;
  min-height: 500px;
  margin-left: 70px;
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
  margin-left: 70px;
  padding-top: 40px;
  padding-bottom: 30px;
  width: 400px;
}

.line{
  margin: 15px 40px 15px 40px;
  border-top:1px dotted #C1C0C0;
  border-bottom: 0;
}
</style>