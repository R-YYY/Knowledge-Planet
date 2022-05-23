<template>
  <div class="topic_card">
    <div class="topic_header">
      <span class="header_name">星球讨论</span>
      <div class="header_select">
        <ul @click="select">
          <li><span class="selectItem selectedItem">全部</span></li>
          <li><span class="selectItem">只看星主</span>
            <div id="fire"></div>
          </li>
        </ul>
      </div>
      <div class="button">
        <CreateDiscuss></CreateDiscuss>
      </div>
    </div>
    <div v-if="topics.length===0||(ownerTopicNum===0&&isRecommended)" class="empty"></div>
    <div v-else style="margin-bottom: 100px">
      <div v-show="item.userId===ownerId||isRecommended" v-for="(item,index) in topics" :key="item.topicId">
        <Card :topic="item" @update="updateTopic"></Card>
      </div>
    </div>
  </div>
</template>

<script>
import CreateDiscuss from "./discussion/createTopicFrom"
import Card from "./discussion/topicCard"
import {getAllTopic} from "@/api/planet/topic";
import eventBus from "@/utils/eventBus";

export default {
  name: "TopicArea",
  props:['ownerId'],
  components: {
    CreateDiscuss,
    Card
  },
  data() {
    return {
      planetCode: window.sessionStorage.getItem('planetCode'),
      topics: [],
      ownerTopicNum:0,
      isRecommended: true
    }
  },
  methods: {
    select(e) {
      if (e.target.nodeName === "SPAN") {
        let spans = document.querySelectorAll('li span');
        for (let span of spans) {
          span.className = "selectItem"
        }
        e.target.className = "selectItem selectedItem"
        switch (e.target.innerHTML) {
          case "全部":
            this.isRecommended = true
            break;
          case "只看星主":
            this.isRecommended = false
            console.log(this.ownerTopicNum)
            break;
        }
      }
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
    },
    updateTopic() {
      getAllTopic(this.planetCode).then((res) => {
        console.log(res)
        let data = res.data.data.topicList
        this.topics = []
        this.ownerTopicNum = 0
        for (let item of data) {
          let pictureList = []
          if (item.topic.picture)
            pictureList = item.topic.picture.split(',')
          if(item.topic.userId===this.ownerId)
            this.ownerTopicNum++
          let shortContent = this.analyseContent(item.topic.content)
          this.topics.push({
            topicId: item.topic.topicId,
            userId: item.topic.userId,
            praiseCount: item.topic.praiseCount,
            content: item.topic.content,
            isShort: shortContent === true,
            shortContent: shortContent === true ? null : shortContent,
            avatar: item.avatar,
            name: item.userName,
            time: item.topic.time,
            commentCount: item.topic.commentCount,
            pictureList: pictureList,
            isLiked: item.liked,
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
  },
  created() {
    this.updateTopic()
    eventBus.$on('addMyTopic', () => {
      this.updateTopic()
    })
    eventBus.$on('addMyReply', () => {
      this.updateTopic()
    })
  }
}
</script>

<style scoped>
.topic_card {
  position: relative;
  text-align: left;
  width: 800px;
  margin: 30px 30px 0;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 15px #cdcdcd;

}

.topic_header {
  position: relative;
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #E2F5F0;
  border-radius: 20px 20px 0 0;
}

.header_name {
  text-align: center;
  width: 150px;
  font-size: 20px;
  font-weight: bold;
}

.header_select {
  flex: 1;

}

ul {
  list-style-type: none;
  display: inline;
}

ul li {
  cursor: pointer;
  display: inline;
  position: relative;
  margin-right: 30px;
  line-height: 50px;
}

.selectItem {
  font-weight: bold;
  color: #999898;
  display: inline-block;
  height: 35px;
}

.selectedItem {
  color: #74D8BE;
  border-bottom: 3px solid #74D8BE;
}

#fire {
  position: relative;
  display: inline-block;
  background-image: url('../../../assets/icon/fire.png');
  background-repeat: no-repeat;
  background-size: cover;
  transform: translateY(2px);
  width: 18px;
  height: 18px;
}

.button {
  width: 150px;
  text-align: center;
}

.empty {
  border-radius: 0 0 20px 20px;
  position: relative;
  height: 500px;
  width: 100%;
  background-image: url("../../../assets/picture/empty.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
