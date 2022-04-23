<template>
  <div class="commentArea">
    <div class="head">
      <span class="commentNum">{{ commentList.length }}&nbsp条评论</span>
      <span class="el-icon-sort sort" @click="sortMethod=!sortMethod">
          切换为按{{ sortMethod ? '热度' : '时间' }}排序</span>
    </div>
    <div>
      <div v-for="(item,index) in commentList"
           :key="item.id"
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
                  :class="item.isLike?'likeIconActive':'likeIcon'"></button>
          <button @click="throttleLike($event,item)"
                  class="textButton"
                  :class="item.isLike?'likeCountActive':''">
            {{ item.likeCount }}
          </button>
          <showReplyCard :replyNum="item.replyNum"></showReplyCard>
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
                    v-model="item.replyContent"
                    @input="autoTextAreaHeight"
                    placeholder="发布你的评论"
                    class="input"></textarea>
          <transition name="el-zoom-in-center">
            <button class="submitButton" @click="reply">发布
            </button>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "@/utils/throttle";
import showReplyCard from "@/components/planet/homepage/discussion/showReplyCard";
export default {
  name: "commentArea",
  components:{
    showReplyCard
  },
  data() {
    return {
      commentList: [{
        id: 1,
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Ff6%2Fc9%2Ff6%2Ff6c9f647a533782026c0609ac5d550df.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653216789&t=5a8da6e8d7dd650e0f696a7bf3a480b5',
        name: "小刘",
        content: '是的，基本上多数打科兴疫苗的都是老年或慢性病患者（也就是不适宜打摩迪纳和辉瑞疫苗的人群），以这个作为统计基础，实在是缺乏对比依据。通俗点说，就是年青且身体健康的人群重症率和病死率比较低。',
        time: '2021-12-21 03:12',
        replyNum: 5,
        isLike: false,
        likeCount: 5,
        showButton: false,
        showInput: false,
        replyContent: '',
        submitButton: false,
      }, {
        id: 2,
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Ff6%2Fc9%2Ff6%2Ff6c9f647a533782026c0609ac5d550df.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653216789&t=5a8da6e8d7dd650e0f696a7bf3a480b5',
        name: "小刘",
        content: '是的，基本上多数打科兴疫苗的都是老年或慢性病患者（也就是不适宜打摩迪纳和辉瑞疫苗的人群），以这个作为统计基础，实在是缺乏对比依据。通俗点说，就是年青且身体健康的人群重症率和病死率比较低。',
        time: '2021-12-21 03:12',
        replyNum: 2,
        isLike: false,
        likeCount: 5,
        showButton: false,
        showInput: false,
        replyContent: '',
        submitButton: false,
      }],
      dialogFormVisible:false,
      sortMethod: true,
    }
  },
  created() {
    this.throttleLike = throttle(this.like, 1000)
  },
  methods: {
    like(e, item) {
      item.isLike = !item.isLike
      // if (!this.message.liked) {
      // praise(this.message.resourceId).then((res) => {
      //   if (res.data.success === true) {
      //     this.message.liked = !this.message.liked
      //     this.message.likeCount++;
      //     this.likeTag++;
      //     span.className = "text active"
      //   } else {
      //     this.$message({message: "点赞失败，系统错误", type: 'error'});
      //   }
      // }).catch(() => {
      //   this.$message({message: "点赞失败，系统错误", type: 'error'});
      // })
      // } else {
      //   unPraise(this.message.resourceId).then((res) => {
      //     if (res.data.success === true) {
      //       this.message.liked = !this.message.liked
      //       this.message.likeCount--;
      //       this.span.className = "text"
      //     }
      //   }).catch(() => {
      //     this.$message({message: "取消点赞失败，系统错误", type: 'error'});
      //   })

      // }

    },
    reply() {
      this.$message("你好")
    },
    autoTextAreaHeight(e) {
      e.target.style.height = 'auto'
      e.target.style.height = e.target.scrollTop + e.target.scrollHeight + "px"
    },
  }
}
</script>

<style scoped>

.commentArea {
  margin: 0 20px 20px 40px;
  padding: 20px 0;
}

.head {
  margin-bottom: 10px;
}

.commentNum {
  cursor: pointer;
  font-weight: bold;
}

.sort {
  float: right;
  cursor: pointer;
}


.questionerInfo {
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
