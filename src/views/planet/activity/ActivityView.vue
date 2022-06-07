<template>
  <div>
    <Header></Header>
    <div id="main">
      <div id="head">
        <HeadBar class="left" @select="select" @update="updateActivity" :checkMode="checkMode"></HeadBar>
        <InfoCard class="center"></InfoCard>
        <div class="right">
          <el-button v-if="isManager"  class="checkButton" @click="checkMode=!checkMode" >{{checkMode?'正常模式':'审核模式'}}</el-button>
        </div>
      </div>
      <div id="content">
        <div v-if="!checkMode&&item.isShow" class="card" v-for="(item, index) in activityList" :key="item.activityId">
          <ActivityCard :activity="item" @quit="updateActivity"></ActivityCard>
        </div>
        <div v-if="checkMode&&item.isShow" class="card" v-for="(item, index) in noCheckActivityList" :key="item.activityId">
          <ActivityCard :activity="item" @update="updateActivity"></ActivityCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "@/components/planet/activity/HeadBar";
import InfoCard from "@/components/planet/activity/InfoCard"
import ActivityCard from "@/components/planet/activity/ActivityCard";
import {getActivity} from "@/api/planet/activity";
import {compareByAsc, compareByDesc} from "@/utils/compare";

export default {
  name: "ActivityView",
  components: {
    HeadBar,
    InfoCard,
    ActivityCard
  },
  data() {
    return {
      planetCode: window.sessionStorage.getItem("planetCode"),
      activityList: [],
      noCheckActivityList:[],
      showRelate: '全部',
      showNumber: '全部',
      showTag: '全部',
      checkMode:false,
      isManager:window.sessionStorage.getItem('isManager')==="1"
    }
  },
  created() {
    this.updateActivity()
  },
  methods: {
    updateActivity(){
      getActivity(this.planetCode).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.activityList = []
          this.noCheckActivityList = []
          let activityList = res.data.data.activityList
          for (let item of activityList) {
            if (item.activity.status === 1) {
              this.activityList.push({
                organizerAvatar: item.organizerAvatar,
                organizerId: item.organizerId,
                organizerName: item.organizerName,
                activityId: item.activity.activityId,
                createTime: item.activity.createTime,
                curNumber: item.activity.curNumber,
                address: item.activity.address,
                description: item.activity.description,
                endTime: item.activity.endTime,
                maxNumber: item.activity.maxNumber,
                startTime: item.activity.startTime,
                status: item.activity.status,
                tag: item.activity.tag,
                title: item.activity.title,
                role: item.role,
                isShow: true
              })
            }else if(item.activity.status=== 0){
              this.noCheckActivityList.push({
                organizerAvatar: item.organizerAvatar,
                organizerId: item.organizerId,
                organizerName: item.organizerName,
                activityId: item.activity.activityId,
                createTime: item.activity.createTime,
                curNumber: item.activity.curNumber,
                address: item.activity.address,
                description: item.activity.description,
                endTime: item.activity.endTime,
                maxNumber: item.activity.maxNumber,
                startTime: item.activity.startTime,
                status: item.activity.status,
                tag: item.activity.tag,
                title: item.activity.title,
                role: item.role,
                isShow: true
              })
            }
          }
          this.sort()
        } else {
          this.$message.error("系统错误")
        }

      }).catch((err) => {
        console.log(err)
      })
    },
    select(selectors) {
      this.showRelate = selectors[0]
      this.showNumber = selectors[1]
      this.showTag = selectors[2]
      this.changeSelect()
    },
    changeSelect() {
      for (let item of this.activityList) {
        item.isShow = true
        if (this.showRelate !== '全部') {
          if (this.showRelate === '我参与的') {
            item.isShow &&= item.role === 0
          } else {
            item.isShow &&= item.role === 1
          }
        }
        if (this.showNumber !== '全部') {
          if (this.showNumber === '组队中') {
            item.isShow &&= item.curNumber < item.maxNumber
          } else {
            item.isShow &&= item.curNumber >= item.maxNumber
          }
        }
        if (this.showTag !== '全部') {
          item.isShow &&= this.showTag === item.tag
        }
      }
    },
    sort() {
      this.activityList.sort(compareByAsc("endTime"))
    },
  },


}
</script>

<style scoped>
#main {
  height: 100%;
  margin: 50px 150px;
}

#head {
  margin-left: 20px;
  margin-right: 20px;
  height: 120px;
  display: flex;
  justify-content: left;
}

.left {
  margin: 0;
  width: 600px !important;
  max-width: 600px;

}

.center {
  flex: 1;
  max-width: 300px;
  margin: 0 40px;
}

.right {
  flex: 1;
  height: 120px;
  line-height: 120px;
  width: 200px;
}

.checkButton {
  margin-top: 40px;
  margin-left: 20px;
  height: 40px;
  width: 80px;
  border-radius: 8px;
  padding: 0px!important;
  background-color: #fff;
  color: #00DED4;
  border: 1px solid #00DED4;
  font-weight: bold;
}
.checkButton :hover{
  background-color: #00DED4;
  color: white;
}
#content {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

}


.card {
  margin: 40px 20px 10px 20px;
}

div .card:nth-last-child(1):nth-child(3n - 1) {
  margin-right: calc(30% + 60px);
}
</style>
