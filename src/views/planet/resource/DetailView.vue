<template>
  <div id="detail">
    <Header></Header>
    <div id="detailCard">
      <div id="header">
        <h1>资源详情</h1>
      </div>
      <div id="content">
        <div id="contentHead">
          <el-image :src="message.coverage" fit="cover" class="logo">
          </el-image>
          <h2>{{ message.resourceName }}</h2>
          <p>{{ message.resourceDescription }}</p>
          <div v-for="item in message.tagList" :key="item" class="tag">
            <el-tag type="info" effect="plain" size="small">{{ item }}</el-tag>
          </div>
        </div>
        <div id="contentBody">
          <el-descriptions :column="1" colon>
            <el-descriptions-item label="链接">
              <el-link :href="message.link">{{ message.link }}</el-link>
            </el-descriptions-item>
            <el-descriptions-item label="详情">{{ message.details }}</el-descriptions-item>
            <el-descriptions-item label="时间">{{ message.uploadTime }}</el-descriptions-item>
            <el-descriptions-item label="荐者">
              <el-image class="miniIcon" :src="message.uploaderAvatar">
                <div slot="error" class="image-slot">
                  <img style="height: 20px;"
                       src="../../../assets/icon/my.png">
                </div>
              </el-image>
              <span style="width: 25px"></span>
              {{ message.uploaderName }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      <div id="footer">
        <div class="footer_left" @click="throttleLike($event)">
          <img :src="require('@/assets/icon/'+iconList[likeTag])" class="icon">
          <span ref="like" class="text">{{ message.likeCount }}</span>
        </div>
        <div class="footer_center" @click="throttleStar($event)">
          <img :src="require('@/assets/icon/'+iconList[starTag])" class="icon">
          <span ref="collect" class="text">{{ message.collectCount }}</span>
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
import {praise, unPraise, collect, unCollect} from "@/api/planet/resource"
import throttle from "@/utils/throttle";

export default {
  name: "DetailView",
  data() {
    return {
      page: false,
      message: {},
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
  created() {
    this.message = JSON.parse(sessionStorage.getItem('resource'))
    console.log(this.message)
    this.throttleStar = throttle(this.star, 1000)
    this.throttleLike = throttle(this.like, 1000)
  },
  mounted() {
    if (this.message.liked) {
      this.$refs.like.className += " active"
      this.likeTag++;
    }
    if (this.message.collected) {
      this.$refs.collect.className += " active"
      this.starTag++;
    }
  },
  methods: {
    like(e) {
      let span = e.currentTarget.children[1]
      if (!this.message.liked) {
        praise(this.message.resourceId).then((res) => {
          if (res.data.success === true) {
            this.message.liked = !this.message.liked
            this.message.likeCount++;
            this.likeTag++;
            span.className = "text active"
          } else {
            this.$message({message: "点赞失败，系统错误", type: 'error'});
          }
        }).catch(() => {
          this.$message({message: "点赞失败，系统错误", type: 'error'});
        })
      } else {
        unPraise(this.message.resourceId).then((res) => {
          if (res.data.success === true) {
            this.message.liked = !this.message.liked
            this.message.likeCount--;
            this.likeTag--;
            span.className = "text"
          }
        }).catch(() => {
          this.$message({message: "取消点赞失败，系统错误", type: 'error'});
        })

      }

    },
    star(e) {
      let span = e.currentTarget.children[1]
      if (!this.message.collected) {
        collect(this.message.resourceId).then((res) => {
          if (res.data.success === true) {
            this.message.collected = !this.message.collected
            this.message.collectCount++;
            this.starTag++;
            span.className = "text active"
          }
        }).catch(() => {
          this.$message({message: "收藏失败，系统错误", type: 'error'});
        })
      } else {
        unCollect(this.message.resourceId).then((res) => {
          if (res.data.success === true) {
            this.message.collected = !this.message.collected
            this.message.collectCount--;
            this.starTag--;
            span.className = "text"
          }
        }).catch(() => {
          this.$message({message: "取消收藏失败，系统错误", type: 'error'});
        })

      }
    },
    enter() {
      window.open(this.message.link)
    },
    getMessage(){
      let xhr = new XMLHttpRequest()
      xhr.open('get','https://knewledgeplanet.usemock.com/kp?userId=1')
      xhr.send()
      xhr.onreadystatechange = function (res){
        if(xhr.readyState===4||xhr.status===200){
          console.log(xhr.responseText)
        }
      }
    }
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

.logo{
  width: 120px;
  height: 120px;
  border-radius: 8px;
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

#contentHead el-image {
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
  margin-left: 30px;
}
.miniIcon{
  border-radius: 50%;
  height: 20px;
  width: 20px;
  position: absolute
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
