<template>
  <div id="card">
    <div id="content" @click="getDetail">
      <div class="content_left">
        <img :src="message.img" alt="正在显示" class="logo">
      </div>
      <div class="content_right">
        <div class="content_right_top">{{message.title}}</div>
        <div class="content_right_middle">{{message.description}}</div>
        <div class="content_right_bottom">
          <div v-for="item in message.tags" :key="item" class="tag">
            <el-tag type="info" effect="plain" size="small">{{ item }}</el-tag>
          </div>
        </div>
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
</template>

<script>
export default {
  name: "ResourceCard",
  props: ['resource'],
  data() {
    return {
      message: {},
      iconList: [
        'like.png',
        'like-active.png',
        'star.png',
        'star-active.png'
      ],
      likeTag:0,
      starTag:2,
    }
  },
  mounted() {
    this.message = this.resource
    console.log(this.message.rid)
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
    getDetail(){
      this.$router.push({
        name:'resourceDetail',
        params:{
          rid: this.message.rid
        }
      })
    }

  }
}
</script>

<style scoped>
#card {
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
}
.content_left{
  flex: 1;
  margin-left: 10px;
  margin-top: 10px;
}
.content_right{
  flex: 2;
  display: flex;
  flex-direction: column;
  margin: 20px 20px 10px 0;
}
.content_right_top{
  flex: 1;
  font-weight: bold;
  font-size: 18px;
  color: #5e5e5e;
}
.content_right_middle{
  flex: 3;
  font-size: 14px;
  color: #757575;
  overflow: hidden;
  margin-bottom: 10px;
}
content_right_bottom{
  flex: 1;
}
.logo {
  width: 100%;
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
  border-left: 2px solid #dadada;
  border-right: 2px solid #dadada;
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
