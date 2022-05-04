<template>
  <div id="card">
    <div id="content" @click="">
      <div class="top">
        <span class="title">{{ activity.title }}</span>
        <span class="tag">学习</span>
      </div>
      <div class="middle">
        {{ activity.description }}
      </div>
      <div class="bottom">
        <div class="time">
          <span class="startTime">开始日期 {{ activity.startTime }}</span>
          <span class="endTime">截止日期 {{ activity.endTime }}</span>
        </div>
        <div class="other">
          <el-tooltip effect="light" :content="activity.address" placement="top">
            <span class="address">{{ activity.address }} </span>
          </el-tooltip>
          <span class="peopleNum">当前人数 <span
              style="font-weight: bold">{{ activity.curNumber }}/{{ activity.maxNumber }}</span></span>
        </div>

      </div>
    </div>
    <div id="footer">
      <span class="organizerAvatar" :style="{backgroundImage:'url('+activity.organizerAvatar+')'}"></span>
      <span class="organizerName">{{ activity.organizerName }}</span>
      <el-button id="answerButton"
                 :disabled="isFull&&activity.status"
                 :class="buttonStyle"
                 @click="">
        {{ buttonTag }}
      </el-button>
    </div>
  </div>
</template>

<script>
import {praise, unPraise, collect, unCollect} from "@/api/planet/resource";
import throttle from "@/utils/throttle";
import {addActivity} from "@/api/planet/activity";

export default {
  name: "ActivityCard",
  props: ['activity'],
  data() {
    return {}
  },
  created() {
  },
  computed: {
    isFull() {
      return this.activity.curNumber >= this.activity.maxNumber
    },
    buttonTag() {
      if (this.status === 1) {
        return '退出'
      } else if (this.isFull) {
        return '已满'
      } else {
        return '组队'
      }
    },
    buttonStyle() {
      if (this.status === 1) {
        return 'exit'
      } else if (this.isFull) {
        return 'full'
      } else {
        return 'join'
      }
    }
  },
  methods: {
    joinActivity() {

      addActivity().then((res) => {

      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#card {
  height: 220px;
  width: 350px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 0 30px #dcdcdc;
}

#content {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  padding: 20px 25px 5px;
  height: 175px;
  width: 100%;
  border-bottom: 2px solid #fff;
}

.title {
  font-size: 18px;
}

.tag {
  float: right;
  display: inline-block;
  background-color: #42b983;
  width: 50px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  height: 24px;
  line-height: 24px;
  border-radius: 10px;
}

.top {
  flex: 1;
  font-weight: bold;
  font-size: 18px;
  color: #5e5e5e;
}

.middle {
  flex: 2;
  font-size: 14px;
  color: #757575;
  overflow: hidden;
  margin-bottom: 10px;
  margin-top: 10px;
}

.bottom {
  flex: 1;
  display: flex;
}

.time {
  flex: 2;
  display: flex;
  flex-direction: column;
  color: #757575;
  font-size: 13px;
}

.other {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #757575;
  font-size: 13px;
}

.address {
  flex: 1;
  font-size: 13px;
  text-align: right;
  margin-right: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.peopleNum {
  flex: 1;
  font-size: 13px;
  text-align: right;
  margin-right: 5px;
}

#footer {
  position: relative;
  padding: 0 25px;
  line-height: 30px;
}


.organizerAvatar {
  vertical-align: middle;
  display: inline-block;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.organizerName {
  line-height: 30px;
  margin-left: 10px;
  color: #00c8bf;
  background-color: white;
  font-size: 16px;
  font-weight: bold;
}

.el-button,
.el-button:focus {
  transition: .3s linear;
  padding: 0 15px !important;
  height: 32px;
  line-height: 28px;
  border-radius: 20px;
  font-weight: bold;
  border: 1px solid #74D8BE;
  background: #fff !important;
  color: #74D8BE !important;
}

.el-button:hover {
  border: 1px solid #74D8BE;
  background: #74D8BE !important;
  color: white !important;
}

.exit {
  color: red !important;
  border-color: red;
}

.join {
  color: #74D8BE !important;
  border-color: #74D8BE;
}

.full,
.full:hover {
  color: #acacac !important;
  border-color: #acacac !important;
  background-color: white !important;

}

#answerButton {
  float: right;
  margin-top: 0px;
}
</style>
