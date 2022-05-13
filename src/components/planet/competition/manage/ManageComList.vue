<template>
  <div id="manageCompetitionList">
    <div class="card">
      <div class="header">
        <div class="header_name">竞赛列表</div>
        <AddCompetition></AddCompetition>
      </div>
      <hr style="margin-left: 55px;margin-right: 50px">
      <div class="table">
        <el-table
            :data="competitionList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            height="450px"
            :row-style="{height:0+'px'}"
            :cell-style="{padding:7+'px'}">
          <el-table-column fixed prop="title" label="竞赛名称" width="200">
          </el-table-column>
          <el-table-column label="描述" width="200">
            <template slot-scope="scope">
              <div class="des">
                {{scope.row.description}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="questionNum" label="总题数" width="120" sortable>
          </el-table-column>
          <el-table-column prop="score" label="总分" width="120" sortable>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200" sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="200" sortable>
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="200" sortable>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
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
            :total="competitionList.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import AddCompetition from "@/components/planet/competition/create/AddCompetition";
export default {
  name: "ManageComList",
  components: {AddCompetition},
  data(){
    return{
      competitionList:[],
      currentPage:1,
      pageSize:20,
    }
  },
  methods:{
    handleSizeChange(val){
      this.pageSize = val
    },

    handleCurrentChange(val){
      this.currentPage = val
    },

    toEdit(competition){
      this.$router.push({
        name: 'editCompetition',
        params: {
          cid: competition.competitionId
        }
      })
    }
  },
  mounted() {
    for (let i = 0; i < 41; i++) {
      this.competitionList.push({
        competitionId:i,
        title:"第"+(i+1)+"周周赛的名字",
        description:"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
        picture:"https://img1.baidu.com/it/u=1269253414,843691233&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=311",
        createTime:"2022-5-11 15:00",
        startTime:"2022-5-12 15:00",
        endTime:"2022-5-12 17:00",
        questionNum:5,
        score:100,
      })
    }
  }
}
</script>

<style scoped>
#manageCompetitionList{
  background-color: #F7F4F4;
}

.header{
  display: flex;
  height: 70px;
}

.header_name{
  color: black;
  font-weight: bold;
  font-size: 25px;
  margin-left: 60px;
  line-height: 80px;
}

.table{
  width: 1100px;
  margin-left: 50px;
}

.card{
  margin-left: 150px;
  margin-top: 20px;
  width: 1200px;
  min-height: 600px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;
}

.des{
  width: 150px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.page{
  text-align: center;
  margin-top: 15px;
}
</style>