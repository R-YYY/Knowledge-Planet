<template>
  <div class="desc">
    <div class="questionerInfo">
      <span class="avatar" :style="{backgroundImage: 'url('+topic.avatar+')'}"></span>
      <span class="questionerName">{{ topic.name }}</span>
    </div>
    <div class="main">
      <div class="text">
        <span class="content"
              @click="!topic.isShort?(contentVisible = !contentVisible):''">{{
            contentVisible ? topic.content : topic.shortContent
          }}</span>
        <span v-if="!topic.isShort" class="showButton" @click="contentVisible = !contentVisible">
          {{ !contentVisible ? '显示全部' : '收起' }}
          <i :class="contentVisible?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </span>
        <div v-if="topic.pictureList.length!==0" class="pictureList">
          <div class="pictureWall clearfix">
            <div v-for="(picture,index) in topic.pictureList"
                 :style="{backgroundImage:'url('+picture+')'}"
                 class="picture">
            </div>
          </div>
        </div>
        <div class="time">发布于{{ topic.time }}</div>
      </div>
    </div>
    <div class="footer">
      <div class="opt" @click="showComment">
        <img src="@/assets/icon/comment.png" alt="">
        <span>{{ topic.commentCount > 99 ? "99+" : topic.commentCount }}</span>
      </div>
      <div class="opt" @click="throttleLike()">
        <img :src="require('@/assets/icon/thumb'+(topic.isLiked?'ed':'')+'.png')" alt="">
        <span :style="{color:(topic.isLiked?'#74D8BE':'#999898')}">{{
            topic.praiseCount > 99 ? "99+" : topic.praiseCount
          }}</span>
      </div>
      <el-button id="answerButton"
                 :class="commentBarVisible?'onComment':'notOnComment'"
                 @click="commentBarVisible=!commentBarVisible">
        {{ !commentBarVisible ? '评论' : '取消' }}
      </el-button>
      <el-button id="submitButton" v-show="commentBarVisible" @click="sendComment">发送</el-button>
    </div>
    <transition name="el-zoom-in-center">
      <div v-show="commentBarVisible" class="commentInput">
        <span class="avatar" :style="{backgroundImage: 'url('+myAvatar+')'}"></span>

        <textarea rows="1"
                  v-model="myComment"
                  @input="autoTextAreaHeight"
                  placeholder="发布你的评论"
                  class="input"></textarea>
      </div>
    </transition>
    <commentArea v-if="commentData" :isShow="commentAreaVisible" :topicId="topic.topicId"></commentArea>
    <hr class="line">
  </div>
</template>

<script>
import answerForm from "@/components/planet/homepage/discussion/answerForm";
import commentArea from "@/components/planet/homepage/discussion/commentArea";
import {addComment, praise, unPraise} from "@/api/planet/topic";
import throttle from "@/utils/throttle";
import eventBus from "@/utils/eventBus";
export default {
  name: "discussCard",
  props: ['topic'],
  components: {
    answerForm,
    commentArea
  },
  data() {
    return {
      contentVisible: false,
      commentBarVisible: false,
      commentAreaVisible: false,
      commentData: false,
      myAvatar: window.sessionStorage.getItem('avatar'),
      myComment: ''
    }
  },
  created() {
    this.throttleLike = throttle(this.like,1000)
    this.contentVisible = this.topic.isShort
  },
  methods: {
    like() {
      let that = this
      if (!this.topic.isLiked) {
        praise(this.topic.topicId, 1).then((res) => {
          if (res.data.success === true) {
            that.topic.isLiked = true
            that.topic.praiseCount++
          } else {
            this.$message({message: "点赞失败，系统错误", type: 'error'});
          }
        }).catch(() => {
          this.$message({message: "点赞失败，系统错误", type: 'error'});
        })
      } else {
        unPraise(this.topic.topicId, 1).then((res) => {
          if (res.data.success === true) {
            that.topic.isLiked = false
            that.topic.praiseCount--
          } else {
            this.$message({message: "取消点赞失败，系统错误", type: 'error'});
          }
        }).catch(() => {
          this.$message({message: "取消点赞失败，系统错误", type: 'error'});
        })

      }

    },
    showComment() {
      this.commentAreaVisible = !this.commentAreaVisible
      if (!this.commentData) {
        this.commentData = true
      }
    },
    sendComment() {
      if(!this.myComment){
        this.$message.error("内容不能为空")
        return
      }
      let that = this
      let planetCode = window.sessionStorage.getItem('planetCode')
      addComment(planetCode, this.topic.topicId, null, null, this.myComment, 1).then((res) => {
        if (res.data.success) {
          that.$message.success("添加成功")
          that.myComment = ''
          that.$emit('update')
          eventBus.$emit('addMyComment')
        } else {
          that.$message.success("添加失败")
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

.desc {
  position: relative;
  padding: 20px 50px;
}

.questionerInfo {
  height: 35px;
  margin-bottom: 10px;
  line-height: 35px;
}


.avatar {
  vertical-align: middle;
  display: inline-block;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.questionerName {
  margin-left: 10px;
  font-weight: bold;
  color: #4a4a4a;
  cursor: pointer;
}

.main {
  margin: 0 20px 0 40px;
}

.text {
  position: relative;
  margin-bottom: 10px;
}

.content {
  position: relative;
  color: #6A6868;
  font-size: 16px;
  line-height: 25px;
  cursor: pointer;
  /*display: -webkit-box;*/
  /*-webkit-box-orient: vertical;*/
  /*line-clamp: 2;*/
  /*-webkit-line-clamp: 2;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
}

.time {
  font-size: 13px;
  margin-top: 5px;
  color: #acacac;
}

.showButton {
  margin-left: 10px;
  color: #74D8BE;
  font-size: 14px;
  cursor: pointer;
}

.line {
  margin: 15px 20px 0px 20px;
  border-top: 1px dashed #C1C0C0;
  border-bottom: 0;
}


.pictureWall {
  margin-top: 0;
  margin-right: 100px;
}

.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}

.picture {
  position: relative;
  width: 150px;
  height: 150px;
  float: left;
  border-radius: 8px;
  margin: 5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.footer {
  margin: 0 20px;
  height: 30px;
  line-height: 30px;
}

.opt {
  width: 60px;
  text-align: left;
}

.opt img {
  width: 25px;
  vertical-align: bottom;
}

.opt span {
  color: #999898;
  font-size: 16px;
  font-weight: bold;
  margin-left: 2px;
}

.opt {
  display: inline-block;
  cursor: pointer;
  margin-left: 20px;
}

.el-button,
.el-button:focus {
  transition: .3s linear;
  padding: 0 15px !important;
  height: 32px;
  line-height: 28px;
  font-weight: bold;
  border: 1px solid #74D8BE;
  background: #fff !important;
  box-shadow: 0px 2px 1px #74D8BE;
  color: #74D8BE !important;
}

.el-button:hover {
  border: 1px solid #74D8BE;
  box-shadow: 1px 2px 1px #74D8BE;
  background: #74D8BE !important;
  color: white !important;
}

.notOnComment {
  border-radius: 20px;
}

.onComment {
  border-radius: 0 20px 20px 0;
}

#answerButton {
  float: right;
  right: 50px
}

#submitButton {
  float: right;
  border-radius: 20px 0 0 20px;
  transition: .3s linear;
  border-right: 0;
}

.commentInput {
  margin: 20px 20px 0px 40px;
  display: flex;
}

.input {
  flex: 1;
  margin-left: 10px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 12px;
  box-sizing: border-box;
  border: 1px solid #fff;
  background-color: #e1f4ef;
  font-family: 微软雅黑;
  color: #757588;
  padding: 8px 15px 9px;
  resize: none;
  overflow: hidden;
  outline-width: 0;
  transition: .3s linear;
}

.input:focus {
  border: 1px solid #74D8BE;
  background-color: transparent;
}
</style>
