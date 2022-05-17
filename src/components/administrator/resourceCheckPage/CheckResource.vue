<template>
  <div id="information">
    <div class="admindata">

      <div class="header">
        <el-input v-model="inputuser" placeholder="请输入内容" class="search_input"></el-input>
        <el-button type="primary" icon="el-icon-search" class="search_button" @click="search">搜索</el-button>
        <div class="infordivide">
          <el-divider></el-divider>
        </div>
      </div>

      <div class="resource_text">
        <span>资源</span>
        <span>上传者</span>


      </div>

<!--      <div class="none">-->
<!--        <el-empty description="暂无数据" v-show="!isUserInformation"></el-empty>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      inputuser:'',
      information: {},
      logs:[],
      isNot:'',
      isUserInformation:false,
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped>
.admindata {
  position: absolute;
  width: 700px;
  height: 560px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
  background-color: #e5ffff;
}

.header {
  margin-top: 10px;
  position: absolute;
}

.infordivide {
  width: 700px;
}

.search_input{
  margin-top:10px;
  margin-left:40px;
  width:490px;
}
.search_button{
  margin-left:25px;
}

.el-divider--horizontal{
  margin-top: 10px;
}

.none{
  margin-left:0px;
  margin-top:150px;
}
</style>