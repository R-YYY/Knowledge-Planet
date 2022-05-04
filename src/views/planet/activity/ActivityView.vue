<template>
  <div>
    <Header></Header>
    <div id="main">
      <div id="head">
        <HeadBar class="left" @select="select"></HeadBar>
        <InfoCard class="right"></InfoCard>
      </div>
      <div id="content">
        <div class="card" v-show="item.isShow" v-for="(item, index) in activityList" :key="item.activityId">
          <ActivityCard :activity="item"></ActivityCard>
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

export default {
  name: "ActivityView",
  components: {
    HeadBar,
    InfoCard,
    ActivityCard
  },
  data() {
    return {
      planetId: 23,
      activityList: [],
      showRelate: '全部',
      showNumber: '全部',
      showTag: '全部',
    }
  },
  created() {
    getActivity(23).then((res) => {
      console.log(res)
      this.activityList = []
      let activityList = res.data.data.activityList
      for (let item of activityList) {
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
          role:item.role,
          isShow: true
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    select(selectors){
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
  justify-content: space-between;
}

.left {
  margin: 0;
  width: 600px !important;
  max-width: 600px;

}

.right {
  flex: 1;
  max-width: 300px;
  margin: 0;
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
