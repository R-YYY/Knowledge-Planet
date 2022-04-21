<template>
  <div class="topic_card">
    <div class="topic_header">
      <span class="header_name">星球讨论</span>
      <div class="header_select">
        <ul @click="select">
          <li><span class="selectItem selectedItem">全部</span></li>
          <li><span class="selectItem">最新</span></li>
          <li><span class="selectItem">只看星主</span>
            <div id="fire"></div>
          </li>
        </ul>
      </div>

      <div class="button">
        <CreateDiscuss></CreateDiscuss>
      </div>
    </div>
    <div v-if="topics.length===0" class="empty"></div>
    <div v-else style="margin-bottom: 100px">
      <div v-for="(item,index) in topics" :key="item.id">
        <Card :topic="item"></Card>
      </div>
    </div>
  </div>
</template>

<script>
import CreateDiscuss from "./discussion/createDiscssFrom"
import Card from "./discussion/discussCard"
export default {
  name: "TopicArea",
  components: {
    CreateDiscuss,
    Card
  },
  data() {
    return {
      topics: [],
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
            this.$emit('select', 'all')
            break;
          case "最新":
            this.$emit('select', 'time')
            break;
          case "星主推荐":
            this.$emit('select', 'recommend')
            break;
        }
      }
    },
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.topics.push({
        name: "哈哈哈嗝，Are you kidding me?",
        content: "发安慰你发安慰你发安慰你发安慰你发安慰你发安发安慰你发安慰你发安慰你发安慰你发安慰你发安发安慰你发安慰你发安慰你发安慰你发安慰你发安慰你发安慰你发安慰你发安慰你发安慰你发安慰你发安慰你发安慰你发安慰你发安慰你发",
        comment_num: 100 - i,
        thumb_num: 100 - i,
      })
    }
  }
}
</script>

<style scoped>
.topic_card {
  position: relative;
  text-align: left;
  width: 800px;
  min-height: 500px;
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
