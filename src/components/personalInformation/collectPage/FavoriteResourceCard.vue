<template>
  <div id="favoriteresourcecard">
    <div id="content" @click="showCheckDetail">
      <div class="content_left">
        <img :src="message.coverage" alt="正在显示" class="logo">
      </div>

      <div class="content_right">
        <div class="content_right_top">{{ message.resourceName }}</div>
        <div class="content_right_middle">{{ message.resourceDescription }}</div>
        <div class="content_right_bottom">
          <div v-for="item in message.tagList" :key="item" class="tag">
            <el-tag type="info" effect="plain" size="small">{{ item }}</el-tag>
          </div>
        </div>
      </div>
    </div>

    <div id="footer">
      <div class="footer_center" @click="throttleStar($event)">
        <img :src="require('@/assets/icon/'+iconList[starTag])" class="icon">
        <span ref="collect" class="text"></span>
      </div>
      <div class="footer_right" @click="enter">
        <img src="@/assets/icon/enter2.png" class="icon">
        <span class="text">访问</span>
      </div>
    </div>

    <el-dialog
        title="资源详情"
        :visible.sync="detailVisible"
        width="60%">
      <FavoriteResourceDetail :resource="resource"></FavoriteResourceDetail>
    </el-dialog>

  </div>
</template>

<script>
import {collect, unCollect} from "@/api/planet/resource";
import throttle from "@/utils/throttle";
import FavoriteResourceDetail from "@/components/personalInformation/collectPage/FavoriteResourceDetail";

export default {
  name: "ResourceCard",
  props: ['resource'],
  components:{
    FavoriteResourceDetail
  },
  data() {
    return {
      message: {
        checkInfo: null,
        collectCount: null,
        collected: null,
        coverage: null,
        details: null,
        isRecommended: null,
        likeCount: null,
        liked: false,
        link: null,
        planetCode: null,
        resourceDescription: null,
        resourceId: null,
        resourceName: null,
        status: null,
        uploadTime: null,
        uploaderAvatar: null,
        uploaderId: null,
        uploaderName: null,
        tagList:null
      },
      iconList: [
        'like.png',
        'like-active.png',
        'star.png',
        'star-active.png'
      ],
      likeTag: 0,
      starTag: 2,
      detailVisible:false
    }
  },
  created() {
    this.throttleStar = throttle(this.star,1000)
  },
  mounted() {
    this.message = this.resource
    if (this.message.collected) {
      this.$refs.collect.className += " active"
      this.starTag++;
    }
  },
  methods: {
    showCheckDetail(){
      this.detailVisible=true
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
    getDetail() {
      sessionStorage.setItem('resource', JSON.stringify(this.message))
      this.$router.push({
        name: 'resourceDetail',
        params: {
          rid: this.message.resourceId
        }
      })
    }

  }
}
</script>

<style scoped>
#favoriteresourcecard {
  height: 220px;
  width: 350px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 0 30px #dcdcdc;
}

#content {
  display: flex;
  height: 175px;
  width: 100%;
  border-bottom: 2px solid #dadada;
  margin-top: 20px;
}

.content_left {
  flex: 1;
  margin-top: 20px;
  margin-right: 10px;
}

.content_right {
  flex: 2;
  display: flex;
  flex-direction: column;
  margin: 20px 20px 10px 0;
}

.content_right_top {
  flex: 1;
  font-weight: bold;
  font-size: 18px;
  color: #5e5e5e;
}

.content_right_middle {
  flex: 3;
  font-size: 14px;
  color: #757575;
  overflow: hidden;
  margin-bottom: 10px;
}

content_right_bottom {
  flex: 1;
}

.logo {
  width: 80%;
  margin-left: 15%;
  border-radius: 8px;
  height: auto;
}

.tag {
  display: inline-block;
  margin-left: 10px;
}

#footer {
  display: flex;
}

.footer_left,
.footer_right,
.footer_center {
  flex: 1;
  margin-top: 5px;
  line-height: 35px;
  height: 35px;
  text-align: center;
}

.footer_center {

  border-right: 2px solid #dadada;
}

.icon {
  /*margin-top: 6px;*/
  transform: translateY(3px);
  height: 20px;
  cursor: pointer;
}

.text {
  margin-left: 5px;
  color: #bebebe;
  font-weight: bold;
  cursor: pointer;
}

.active {
  color: #ff4d51;
}
</style>
