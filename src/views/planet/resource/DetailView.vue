<template>
  <div id="detail">
    <Header></Header>
    {{rid}}
    <div id="detailCard">
      <div id="header">
        <h1>资源详情</h1>
      </div>
      <div id="content">
        <div id="contentHead">
          <img :src="message.img" alt="">
          <h2>{{ message.title }}</h2>
          <p>{{ message.description }}</p>
          <div v-for="item in message.tags" :key="item" class="tag">
            <el-tag type="info" effect="plain" size="small">{{ item }}</el-tag>
          </div>
        </div>
        <div id="contentBody">
          <el-descriptions column="1" colon>
            <el-descriptions-item label="链接">
              <el-link :href="message.url">{{ message.url }}</el-link>
            </el-descriptions-item>
            <el-descriptions-item label="详情">{{ message.detail }}</el-descriptions-item>
            <el-descriptions-item label="时间">{{ message.time }}</el-descriptions-item>
            <el-descriptions-item label="荐者">{{ message.person }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      <div id="footer">
        <div class="footer_left" @click="like">
          <img :src="require('@/assets/icon/'+iconList[likeTag])" class="icon">
          <span class="text">{{ message.likes }}</span>
        </div>
        <div class="footer_center" @click="collect">
          <img :src="require('@/assets/icon/'+iconList[starTag])" class="icon">
          <span class="text">{{ message.collect }}</span>
        </div>
        <div class="footer_right" @click="enter">
          <img src="@/assets/icon/enter2.png" class="icon">
          <span class="text">访问</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailView",
  data() {
    return {
      message: {
      },
      iconList: [
        'like.png',
        'like-active.png',
        'star.png',
        'star-active.png'
      ],
      likeTag: 0,
      starTag: 2,
    }
  },
  mounted() {
    console.log(this.$route.params)
    this.message = JSON.parse(this.$route.params.message)
  },

  methods: {
    like(e) {
      this.message.isLike = !this.message.isLike
      let span = e.currentTarget.children[1]
      if (this.message.isLike) {
        this.message.likes++;
        this.likeTag++;
        span.className += " active"
      } else {
        this.message.likes--;
        this.likeTag--;
        span.className = "text"
      }

    },
    collect(e) {
      this.message.isCollect = !this.message.isCollect
      let span = e.currentTarget.children[1]
      if (this.message.isCollect) {
        this.message.collect++;
        this.starTag++;
        span.className += " active"
      } else {
        this.message.collect--;
        this.starTag--;
        span.className = "text"
      }
    },
    enter() {
      window.open(this.message.url)
    },
  }
}
</script>

<style scoped>
#detailCard {
  display: flex;
  flex-direction: column;
  width: 60%;
  min-width: 400px;
  margin-left: 20%;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 12px;
  box-shadow: 0 0 30px #dcdcdc;
}

#header {
  position: relative;
  height: 50px;
  line-height: 50px;
  border-bottom: 2px solid #e7e7e7;
}

h1, h2 {
  margin-top: 0;
  margin-left: 30px;
  font-size: 18px;
  font-weight: normal;
}

h2 {
  margin-left: 0;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}

p {
  font-size: 14px;
  margin-top: 0px;
}

#content {
  flex: 1;
  margin: 20px;
}

#contentHead {
  text-align: center;
}

#contentHead img {
  width: 130px;
  height: auto;
}

.tag {
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
}

#contentBody {
  text-align: left;
  margin-left: 10px;
}

.demo-table-expand {
  font-size: 0;
}

.el-link.el-link--default {
  color: #10cbf5;
}

.el-link.el-link--default:hover {
  color: #00ded4;
}

#footer {
  display: flex;
  height: 50px;
  border-top: 2px solid #e7e7e7;
}

.footer_left,
.footer_right,
.footer_center {
  flex: 1;
  margin-top: 5px;
  line-height: 40px;
  height: 40px;
  text-align: center;
}

.footer_center {
  border-left: 2px solid #e7e7e7;
  border-right: 2px solid #e7e7e7;
}

.icon {
  /*margin-top: 6px;*/
  transform: translateY(3px);
  height: 20px;
}

.text {
  margin-left: 5px;
  color: #bebebe;
  font-weight: bold;
}

.active {
  color: #ff4d51;
}
</style>
