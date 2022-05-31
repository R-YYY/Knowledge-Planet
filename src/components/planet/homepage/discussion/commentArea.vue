<template>
  <div class="commentArea" v-show="isShow">
    <div class="head">
      <span class="commentNum">{{ commentList.length }}&nbsp条评论</span>
      <span class="el-icon-sort sort" @click="compare">
          切换为按{{ sortMethod ? '热度' : '时间' }}排序</span>
    </div>
    <div>
      <div v-for="(item,index) in commentList"
           :key="item.commentId"
           class="questionerInfo"
           @mouseover="item.showButton=true"
           @mouseleave="item.showButton=false">
        <span class="avatar" :style="{backgroundImage: 'url('+item.avatar+')'}"></span>
        <span class="name">{{ item.name }}</span>
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
          <showReplyCard :comment="item"></showReplyCard>
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
        <transition name="el-zoom-in-center">
          <div v-show="item.showInput" class="replyBar"
               @blur="item.submitButton=false">
          <textarea rows="1"
                    v-model="item.myReplyContent"
                    @input="autoTextAreaHeight"
                    placeholder="发布你的评论"
                    class="input"></textarea>
            <button class="submitButton" @click="reply(item)">发布</button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "@/utils/throttle";
import showReplyCard from "@/components/planet/homepage/discussion/replyCard";
import {getFirstComment, addComment, praise, unPraise} from "@/api/planet/topic";
import eventBus from "@/utils/eventBus";
import {compareByDesc, compareByAsc} from "@/utils/compare";


export default {
  name: "commentArea",
  components: {
    showReplyCard
  },
  props: ['isShow', 'topicId'],
  data() {
    return {
      commentList: [],
      dialogFormVisible: false,
      sortMethod: true,
    }
  },
  created() {
    this.throttleLike = throttle(this.like, 1000)
    this.updateComment()
    eventBus.$on('addMyComment', () => {
      this.updateComment()
    })
    eventBus.$on("addMyReply", (val) => {
      this.updateComment()
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
    compare() {
      this.sortMethod = !this.sortMethod
      if (this.sortMethod)
        this.commentList.sort(compareByDesc("time"))
      else
        this.commentList.sort(compareByDesc("praiseCount"))
    },
    updateComment() {
      getFirstComment(this.topicId).then((res) => {
        this.commentList = []
        let commentList = res.data.data.result.commentList
        for (let item of commentList) {
          let shortContent = this.analyseContent(item.comment.content)
          this.commentList.push({
            topicId: item.comment.topicId,
            commentId: item.comment.commentId,
            avatar: item.avatar,
            name: item.userName,
            content: item.comment.content,
            isShort: shortContent === true,
            shortContent: shortContent === true ? null : shortContent,
            time: item.comment.time,
            replyCount: item.replyList.length,
            isLiked: item.liked,
            praiseCount: item.comment.praiseCount,
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
    reply(comment) {
      if (!comment.myReplyContent) {
        this.$message.error("内容不能为空")
        return
      }
      let that = this
      let planetCode = window.sessionStorage.getItem('planetCode')
      addComment(planetCode, comment.topicId, comment.commentId, comment.commentId, comment.myReplyContent, 0).then((res) => {
        if (res.data.success) {
          that.$message.success("回复成功")
          comment.myReplyContent = ''
          eventBus.$emit("addMyReply")
        } else {
          that.$message.success("回复失败")
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    autoTextAreaHeight(e) {
      e.target.style.height = 'auto'
      e.target.style.height = e.target.scrollTop + e.target.scrollHeight + "px"
    },
    analyseContent(content) {
      let shortContent = ''
      let reg = /[^\x00-\xff]/
      let l = 0
      if (content.length <= 140) {
        return true
      } else {
        for (let i = 0; i < content.length; i++) {
          shortContent += content.charAt(i)
          l = (l + (reg.test(content.charAt(i)) ? 2 : 1))
          if (l >= 280) {
            break
          }
        }
        shortContent += '...'
        return shortContent
      }
    }
  }
}
</script>

<style scoped>

.commentArea {
  margin: 0 20px 0 40px;
  padding: 20px 0 0;
}

.head {
  margin-bottom: 10px;
  line-height: 20px;
}

.commentNum {
  cursor: pointer;
  font-weight: bold;
}

.sort {
  vertical-align: middle;
  line-height: 20px;
  font-size: 16px;
  float: right;
  cursor: pointer;
}

.questionerInfo {
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f1f1;
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
  margin-left: 10px;
  font-weight: bold;
  color: #4a4a4a;
  cursor: pointer;
}

.time {
  float: right;
  margin-right: 10px;
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
</style>
