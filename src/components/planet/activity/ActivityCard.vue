<template>
  <div id="card">
    <el-dialog title="成员信息" :visible.sync="dialogTableVisible">
      <el-table :data="memberList">
        <el-table-column property="avatar" label="头像" width="150">
          <template slot-scope="scope">
            <span class="organizerAvatar" :style="{backgroundImage:'url('+scope.row.avatar+')'}"></span>
          </template>
        </el-table-column>
        <el-table-column property="userName" label="昵称" width="200"></el-table-column>
        <el-table-column property="email" label="邮箱"></el-table-column>
      </el-table>
    </el-dialog>
    <div id="content">
      <div class="top">
        <span class="title">{{ activity.title }}</span>
        <span class="tag">{{ activity.tag }}</span>
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
          <el-tooltip effect="light" :content="'地址:'+activity.address" placement="top">
            <span class="address">{{ activity.address }} </span>
          </el-tooltip>
          <span class="peopleNum" @click="checkMemberList">当前人数
            <span
                style="font-weight: bold">{{ activity.curNumber }}/{{ activity.maxNumber }}
            </span>
          </span>
        </div>
      </div>
    </div>
    <div id="footer">
      <span class="organizerAvatar" :style="{backgroundImage:'url('+activity.organizerAvatar+')'}"></span>
      <span class="organizerName">{{ activity.organizerName }}</span>
      <el-button class="answerButton"
                 v-if="this.activity.status===1"
                 :disabled="isFull&&!activity.role"
                 :class="buttonStyle"
                 @click="throttleJoin()">
        {{ buttonTag }}
      </el-button>
      <el-button class="exit rightCheckButton answerButton"
                 v-show="this.activity.status===0"
                 @click="check(2)">不通过
      </el-button>
      <el-button class="leftCheckButton answerButton"
                 v-if="this.activity.status===0"
                 @click="check(1)">通过
      </el-button>
    </div>
  </div>
</template>

<script>

import {joinOrQuitActivity, checkActivity, getActivityMember} from "@/api/planet/activity";
import throttle from "@/utils/throttle";
import {loginPost} from "@/api/login/login";

export default {
  name: "ActivityCard",
  props: ['activity'],
  data() {
    return {
      memberList: [],
      dialogTableVisible: false
    }
  },
  created() {
    this.throttleJoin = throttle(this.joinActivity, 1000)
  },
  computed: {
    isFull() {
      return this.activity.curNumber >= this.activity.maxNumber
    },
    buttonTag() {
      if (this.activity.role === 0) {
        return '退出'
      } else if (this.activity.role === 1) {
        return '撤销'
      } else if (this.isFull) {
        return '已满'
      } else {
        return '组队'
      }
    },
    buttonStyle() {
      if (this.activity.role === 1 || this.activity.role === 0) {
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
      let type = this.activity.role === null ? 1 : 0
      console.log(type)
      joinOrQuitActivity(this.activity.activityId, type).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.$message.success("操作成功！")
          if (this.activity.role === null) {
            this.activity.role = 0
            this.activity.curNumber++
          } else if (this.activity.role === 1) {
            this.$emit('quit')
          } else {
            this.activity.role = null
            this.activity.curNumber--
          }
        } else {
          this.$message.error("操作失败！")
        }
      }).catch((err) => {
        console.log(err)
      })

    },
    check(index) {
      if (index === 2) {
        this.$prompt('请输入拒绝原因', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then((res) => {

          let planetCode = window.sessionStorage.getItem('planetCode')
          checkActivity(planetCode, this.activity.activityId, res.value, index).then((res) => {
            if (res.data.success) {
              console.log(res)
              this.$message.success("操作成功！")
              this.$emit("update")
            }
          }).catch((err) => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消拒绝'
          });
        });
      } else {
        let planetCode = window.sessionStorage.getItem('planetCode')
        checkActivity(planetCode, this.activity.activityId, '通过', index).then((res) => {
          if (res.data.success) {
            console.log(res)
            this.$message.success("操作成功！")
            this.$emit("update")
          }
        }).catch((err) => {
          console.log(err)
        })
      }

    },
    getMember() {
      getActivityMember(this.activity.activityId).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.memberList = []
          for (let item of res.data.data.memberList) {
            this.memberList.push({
              avatar: item.avatar,
              userName: item.userName,
              email: item.email
            })
          }
          this.dialogTableVisible = true
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    checkMemberList() {
      if (window.sessionStorage.getItem("userId") === this.activity.organizerId || window.sessionStorage.getItem("isManager") === "1") {
        this.getMember()
      }
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
  cursor: pointer;
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
  vertical-align: middle;
  line-height: 30px;
  margin-left: 10px;
  display: inline-block;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  color: #f54b4b !important;
  border-color: #f54b4b;
  background-color: white !important;
}

.exit:hover {
  color: #fff !important;
  border-color: #fff;
  background-color: #f54b4b !important;
}

.join {
  color: #74D8BE !important;
  border-color: #74D8BE;
}

.join.hover {
  color: #fff !important;
  border-color: #fff;
  background-color: #74D8BE !important;
}

.full,
.full:hover {
  color: #acacac !important;
  border-color: #acacac !important;
  background-color: white !important;

}

.answerButton {
  float: right;
  margin-top: 0px;
}

.leftCheckButton {
  margin-right: 10px;
}
</style>
