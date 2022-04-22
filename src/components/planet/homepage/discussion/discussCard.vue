<template>
  <div>
    <div class="desc">
      <h1 class="titleName">{{ topic.name }}</h1>
      <div class="questionerInfo" v-show="contentVisible">
        <span class="avatar" :style="{backgroundImage: 'url('+avatar+')'}"></span>
        <span class="questionerName">{{ name }}</span>
      </div>
      <div class="text">
        <span class="content"
              @click="contentVisible = !contentVisible">{{ contentVisible ? topic.content : topic.shortContent }}</span>
        <span class="showButton" v-show="!contentVisible" @click="contentVisible = !contentVisible">
          显示全部
          <i :class="contentVisible?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </span>
        <div class="time" v-show="contentVisible">发布于{{ time }}
          <span class="showButton" @click="contentVisible = !contentVisible">收起
          <i :class="contentVisible?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </span></div>
      </div>
    </div>
    <div class="opt">
      <img src="@/assets/icon/comment.png" alt="">
      <span>{{ topic.comment_num > 99 ? "99+" : topic.comment_num }}</span>
    </div>
    <div class="opt">
      <img src="@/assets/icon/thumb.png" alt="">
      <span>{{ topic.thumb_num > 99 ? "99+" : topic.thumb_num }}</span>
    </div>
    <el-button id="answerButton" round icon="el-icon-edit" @click="answerFormVisible=true">回答
    </el-button>
    <transition name="el-zoom-in-top">
      <answerForm v-if="answerFormVisible" @cancel="answerFormVisible=false"></answerForm>
    </transition>
    <hr class="line">
  </div>
</template>

<script>
import answerForm from "@/components/planet/homepage/discussion/answerForm";

export default {
  name: "discussCard",
  props: ['topic'],
  components: {
    answerForm
  },
  data() {
    return {
      contentVisible: false,
      answerFormVisible: false,
      avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Ff6%2Fc9%2Ff6%2Ff6c9f647a533782026c0609ac5d550df.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653216789&t=5a8da6e8d7dd650e0f696a7bf3a480b5',
      name: 'asdasd',
      time: '2012-12-32 12:30'
    }
  },
  created() {
    let content = this.topic.content
    this.topic.shortContent = ''
    let reg = /[^\x00-\xff]/
    let l = 0
    if (content.length <= 70) {
      this.topic.shortContent = content
    } else {
      for (let i = 0; i < content.length; i++) {
        this.topic.shortContent += content.charAt(i)
        l = (l + (reg.test(content.charAt(i)) ? 2 : 1))
        if (l >= 160) {
          break
        }
      }
    }
    this.topic.shortContent += '...'

  }
}
</script>

<style scoped>

.desc {
  position: relative;
  cursor: pointer;
  padding: 0 20px;
}

.titleName {
  margin: 20px 0 10px;
  color: #6A6868;
  font-weight: bold;
  font-size: 18px;
}

.questionerInfo {
  height: 24px;
  margin-bottom: 10px;
  line-height: 24px;
}

.avatar {
  vertical-align: middle;
  display: inline-block;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.questionerName {
  margin-left: 10px;
  font-weight: bold;
  color: #4a4a4a;
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
}

.line {
  margin: 15px 20px 0px 20px;
  border-top: 1px dashed #C1C0C0;
  border-bottom: 0;
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

.el-button {
  padding: 0 10px !important;
  height: 32px;
  line-height: 28px;
  font-weight: bold;
  border: 1px solid #74D8BE;
  box-shadow: 1px 2px 1px #74D8BE;
  color: #74D8BE;
}

.el-button:hover,
.el-button:focus {
  border: 1px solid #74D8BE;
  box-shadow: 0 0px 0px #74D8BE;
  background: #74D8BE !important;
  color: white !important;
}

.answer img {
  width: 18px;
  vertical-align: middle;
  padding-right: 7px;
}

#answerButton {
  position: absolute;
  right: 50px
}
</style>
