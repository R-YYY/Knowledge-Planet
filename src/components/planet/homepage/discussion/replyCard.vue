<template>
  <div id="reply">
    <span class="replyNum" @click="getReply">共{{ comment.replyCount }}条回复</span>
    <el-dialog title="查看对话" :visible.sync="dialogFormVisible">
      <div class="card">
        <div class="questionerInfo"
             @mouseover="comment.showButton=true"
             @mouseleave="comment.showButton=false">
          <span class="avatar" :style="{backgroundImage: 'url('+comment.avatar+')'}"></span>
          <span class="name">{{ comment.name }}</span>
          <span class="time">{{ comment.time }}</span>
          <div class="content">{{ comment.content }}</div>
          <div class="commentFooter">
            <button @click="throttleLike($event,comment)"
                    class="icon"
                    :class="comment.isLiked?'likeIconActive':'likeIcon'"></button>
            <button @click="throttleLike($event,comment)"
                    class="textButton"
                    :class="comment.isLiked?'likeCountActive':''">
              {{ comment.praiseCount }}
            </button>
            <transition name="el-fade-in-linear">
              <button @click="reply"
                      class="icon replyIcon"
                      v-show="comment.showButton"></button>
            </transition>
            <transition name="el-fade-in-linear">
              <button @click="comment.showInput=!comment.showInput"
                      class="textButton"
                      v-show="comment.showButton">{{ comment.showInput ? '取消回复' : '回复' }}
              </button>
            </transition>
          </div>
          <div v-show="comment.showInput" class="replyBar"
               @blur="comment.submitButton=false">
          <textarea rows="1"
                    v-model="comment.myReplyContent"
                    @input="autoTextAreaHeight"
                    placeholder="发布你的评论"
                    class="input"></textarea>
            <transition name="el-zoom-in-center">
              <button class="submitButton" @click="reply(comment)">发布
              </button>
            </transition>
          </div>
        </div>
      </div>
      <div class="card replyCard">
        <div class="cardHeader">共{{ replyList.length }}&nbsp条回复</div>
        <div v-for="(item,index) in replyList"
             :key="item.commentId"
             class="questionerInfo"
             @mouseover="item.showButton=true"
             @mouseleave="item.showButton=false">
          <span class="avatar" :style="{backgroundImage: 'url('+item.avatar+')'}"></span>
          <span class="name">{{ item.name }} <span style="color:#a0cbcb">&nbsp回复&nbsp</span>{{ item.replyName }}</span>
          <span class="time">{{ item.time }}</span>
          <div class="content">{{ item.content }}</div>
          <div class="commentFooter">
            <button @click="throttleLike($event,item)"
                    class="icon"
                    :class="item.isLiked?'likeIconActive':'likeIcon'"></button>
            <button @click="throttleLike($event,item)"
                    class="textButton"
                    :class="item.isLiked?'likeCountActive':''">
              {{ item.praiseCount }}
            </button>
            <transition name="el-fade-in-linear">
              <button @click="reply"
                      class="icon replyIcon"
                      v-show="item.showButton"></button>
            </transition>
            <transition name="el-fade-in-linear">
              <button @click="item.showInput=!item.showInput"
                      class="textButton"
                      v-show="item.showButton">{{ item.showInput ? '取消回复' : '回复' }}
              </button>
            </transition>
          </div>
          <div v-show="item.showInput" class="replyBar"
               @blur="item.submitButton=false">
          <textarea rows="1"
                    v-model="item.myReplyContent"
                    @input="autoTextAreaHeight"
                    placeholder="发布你的评论"
                    class="input"></textarea>
            <transition name="el-zoom-in-center">
              <button class="submitButton" @click="reply(item)">发布
              </button>
            </transition>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import cos from "@/api/cos";
import {uploadResource} from "@/api/planet/resource";
import throttle from "@/utils/throttle";
import {addComment, getAllReply, praise, unPraise} from "@/api/planet/topic";
import eventBus from "@/utils/eventBus";

export default {
  name: "showReplyCard",
  props: ['comment'],
  data() {
    return {
      dialogFormVisible: false,
      firstTag: true,
      replyList: []
    }
  },
  created() {
    this.comment.showButton = false
    this.throttleLike = throttle(this.like, 1000)
    eventBus.$on("addMyReply", (val) => {
      if(val === this.comment.commentId)
        this.getReply(true)
    })
  },
  methods: {
    like(e, item) {
      let that = this
      if (!item.isLiked) {
        praise(item.commentId, 0).then((res) => {
          if (res.data.success === true) {
            item.isLiked = true
            item.praiseCount++
          } else {
            this.$message({message: "点赞失败，系统错误", type: 'error'});
          }
        }).catch(() => {
          this.$message({message: "点赞失败，系统错误", type: 'error'});
        })
      } else {
        unPraise(item.commentId, 0).then((res) => {
          if (res.data.success === true) {
            item.isLiked = false
            item.praiseCount--
          } else {
            this.$message({message: "取消点赞失败，系统错误", type: 'error'});
          }
        }).catch(() => {
          this.$message({message: "取消点赞失败，系统错误", type: 'error'});
        })
      }
    },
    reply(comment) {
      if(!comment.myReplyContent){
        this.$message.error("内容不能为空")
        return
      }
      let that = this
      addComment(window.sessionStorage.getItem('planetCode'),comment.topicId, comment.commentId, this.comment.commentId, comment.myReplyContent, 0).then((res) => {
        if (res.data.success) {
          that.$message.success("回复成功")
          comment.myReplyContent = ''
          eventBus.$emit("addMyReply",this.comment.commentId)
        } else {
          that.$message.success("回复失败")
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getReply(flag = false) {
      this.dialogFormVisible = true
      if (this.firstTag === false && flag === false)
        return
      this.firstTag = false
      getAllReply(this.comment.commentId).then((res) => {
        this.replyList = []
        let replyList = res.data.data.replyList
        console.log(replyList)
        for (let item of replyList) {
          this.replyList.push({
            topicId: item.comment.topicId,
            commentId: item.comment.commentId,
            avatar: item.author.avatar,
            name: item.author.userName,
            replyName: item.replyToUser.userName,
            content: item.comment.content,
            time: item.comment.time,
            praiseCount: item.comment.praiseCount,
            isLike: item.liked,
            showButton: false,
            showInput: false,
            myReplyContent: '',
            submitButton: false,
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    autoTextAreaHeight(e) {
      e.target.style.height = 'auto'
      e.target.style.height = e.target.scrollTop + e.target.scrollHeight + "px"
    },


  }
}
</script>

<style scoped>
#reply {
  display: inline-block;
}

.replyNum {
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
  margin-left: 20px;
  font-size: 16px;
  color: #8f8f8f;
}

.el-button {
  font-weight: bold;
  border: 0px solid #74D8BE;
  color: #74D8BE;
  box-shadow: 0 2px 5px #74D8BE;
}

.el-button:hover,
.el-button:focus {
  border: 1px solid #74D8BE;
  box-shadow: 0 0px 0px #74D8BE;
  background: #74D8BE !important;
  color: white !important;
}

/deep/ .el-dialog {
  border-radius: 2px;
  width: 800px;
  background-color: #E2F5F0;
}

/deep/ .el-dialog__header {
  padding: 5px 30px;
  height: 30px;
  line-height: 50px;
  text-align: center;
  color: #42b983;
  font-weight: bold;
}

/deep/ .el-dialog__title {
  color: #74D8BE;
}

/deep/ .el-dialog__body {
  margin: 0;
  padding: 0 0 10px;
  line-height: 20px;
}


.card {
  margin: 20px 40px 0;
  padding: 10px 10px 0;
  background-color: white;
  border-radius: 8px;
}

.replyCard {
  margin-bottom: 20px;
}

.questionerInfo {
  vertical-align: middle;
  padding-bottom: 10px;
  margin-bottom: 10px;
  line-height: 30px;
}


.avatar {
  vertical-align: middle;
  display: inline-block;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.name {
  vertical-align: middle;
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  color: #4a4a4a;
  cursor: pointer;
}

.time {
  float: right;
  margin-right: 30px;
  font-size: 16px;
  color: #8f8f8f;
}

.content {
  margin-left: 40px;
  margin-right: 20px;
  line-height: 28px;
}

.commentFooter {
  margin-top: 5px;
  vertical-align: middle;
  height: 20px;
  justify-content: center;
  line-height: 20px;
  margin-left: 40px;
  margin-right: 20px;
}

.icon {
  cursor: pointer;
  vertical-align: middle;
  border: 0px;
  transform: translateY(-1px);
  width: 16px;
  height: 16px;
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.likeIcon {
  background-image: url("../../../../assets/icon/commentLike.png");
}

.likeIconActive {
  background-image: url("../../../../assets/icon/commentLiked.png");
}

.textButton {
  cursor: pointer;
  padding: 0 0 0 4px;
  vertical-align: middle;
  color: #8f8f8f;
  line-height: 20px;
  font-size: 16px;
  border: 0px;
  background-color: transparent;
}

.likeCountActive {
  color: #74D8BE;
}

.replyNum {
  cursor: pointer;
  vertical-align: middle;
  margin-left: 20px;
  font-size: 16px;
  color: #8f8f8f;
}

.replyIcon {
  margin-left: 20px;
  vertical-align: middle;
  background-image: url("../../../../assets/icon/reply.png");
}

.replyBar {
  position: relative;
  margin-top: 10px;
  margin-left: 40px;
  margin-right: 30px;
}

.input {
  display: inline-block;
  width: 87%;
  font-size: 16px;
  line-height: 20px;
  border-radius: 12px;
  box-sizing: border-box;
  border: 1px solid #fff;
  background-color: #e1f4ef;
  font-family: 微软雅黑;
  color: #757588;
  padding: 8px 12px 9px;
  resize: none;
  overflow: hidden;
  outline-width: 0;
  transition: .3s linear;
}

.input:focus {
  border: 1px solid #74D8BE;
  background-color: transparent;
}

.submitButton {
  position: absolute;
  right: 0;
  margin-left: 20px;
  height: 38px;
  border: 0;
  border-radius: 12px;
  background-color: #e1f4ef;
  padding: 0 15px;
  color: #74D8BE;
  font-weight: bold;
}

.submitButton:hover {
  box-shadow: 0 2px 2px #90debb;
}

.cardHeader {
  margin: 5px;
  padding: 0 5px 10px;
  color: #333333;
  font-weight: bold;
  border-bottom: 1px solid #dedede;
}
</style>
