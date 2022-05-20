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
          <el-table-column fixed label="竞赛名称" width="250">
            <template slot-scope="scope">
              <span style="margin-right: 10px">{{scope.row.title}}</span>
              <el-tag v-if="scope.row.status===0" type="danger" size="mini">未发布</el-tag>
              <el-tag v-else-if="scope.row.status===1" type="success" size="mini">已发布</el-tag>
              <el-tag v-else type="info" size="mini">已取消</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="描述" width="200">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.description" placement="top">
                <div class="des">
                  {{scope.row.description}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="questionNumber" label="总题数" width="120" sortable>
          </el-table-column>
          <el-table-column prop="totalScore" label="总分" width="120" sortable>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200" sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="200" sortable>
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="200" sortable>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <div style="display:flex;">
                <el-button type="text" size="small" @click="seeDetail(scope.row)">查看</el-button>
                <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <CompetitionDetail ref="child" :competition="chooseCom"></CompetitionDetail>
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
import {getCompetitionByPlanet} from "@/api/planet/competition";
import CompetitionDetail from "@/components/planet/competition/manage/CompetitionDetail";
export default {
  name: "ManageComList",
  components: {CompetitionDetail, AddCompetition},
  data(){
    return{
      competitionList:[],
      currentPage:1,
      pageSize:20,
      chooseCom:{
        competitionId:"",
        title:"",
        description:"",
        picture:"",
        createTime:"",
        startTime:"",
        endTime:"",
        status:"",
        questionNumber:"",
        totalScore:"",
      }
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
          cid: competition.competitionId,
        },
        query:{
          competition:JSON.stringify(competition)
        }
      })
    },

    seeDetail(competition){
      this.chooseCom=competition
      this.$refs.child.show()
    }
  },
  mounted() {
    this.competitionList = []
    let planetCode = window.sessionStorage.getItem("planetCode")
    getCompetitionByPlanet(planetCode).then((res)=>{
      let list = res.data.data.competitionList
      for (let i = 0; i < list.length; i++) {
        this.competitionList.push({
          planetCode:list[i].competition.planetCode,
          competitionId:list[i].competition.competitionId,
          title:list[i].competition.title,
          description:list[i].competition.description,
          picture:list[i].competition.picture,
          createTime:list[i].competition.createTime,
          startTime:list[i].competition.startTime,
          endTime:list[i].competition.endTime,
          status:list[i].competition.status,
          questionNumber:list[i].questionNumber,
          totalScore:list[i].totalScore,
        })
      }
    })
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