<template>
  <div id="detail">
    <Header></Header>
    <div id="detailCard" v-if="page">
      <div id="header">
        <h1>资源详情</h1>
      </div>
      <div id="content">
        <div id="contentHead">
          <el-image :src="message.img" fit="cover" style="width: 120px;height: 120px">
          </el-image>
          <h2>{{ message.title }}</h2>
          <p>{{ message.description }}</p>
          <div v-for="item in message.tags" :key="item" class="tag">
            <el-tag type="info" effect="plain" size="small">{{ item }}</el-tag>
          </div>
        </div>
        <div id="contentBody">
          <el-descriptions :column="1" colon>
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
    <Avatar :name="avatar.name" :placing="avatar.placing" :imgUrl="avatar.imgUrl"></Avatar>
  </div>
</template>

<script>
import {getResourceById, praise, unPraise, collect, unCollect} from "@/api/planet/resource"
import Avatar from "@/components/planet/Avatar"
export default {
  name: "DetailView",
  components:{
    Avatar
  },
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
      avatar:{
        name:"小济阿瓦达asd",
        placing:"1",
        imgUrl:'https://tse1-mm.cn.bing.net/th/id/R-C.6f3812af899915ec57ee2e7d7a277d72?rik=qiMWKqmZtKFBZA&riu=http%3a%2f%2fscimg.jianbihuadq.com%2f202012%2f2020120319570822.jpg&ehk=ypsLEZAjwfnVoLPwnQtjL%2fcDSf0SuedZf5vnf%2ffyscE%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
      }
    }
  },
  created() {
    getResourceById(this.$route.params.rid).then((res) => {
      this.$message({message: res.data.message, type: res.data.success ? 'success' : 'error'});
      console.log(res)
      if (res.data.success) {
        let result = res.data.data.result
        this.message = {
          rid: result.r_id,
          title: result.r_name,
          img: 'https://img.51miz.com/Element/00/33/31/09/db33029b_E333109_68c43404.png',
          //this.message.img = result.coverage,
          likes: result.praise_count,
          collect: result.collect_count,
          time: result.upload_time,
          url: result.link,
          description: result.r_description,
          detail: result.details,
          person: result.u_name
        }
      }
      this.page = true
    })

  },

  methods: {
    like(e) {
      this.message.isLike = !this.message.isLike
      let span = e.currentTarget.children[1]
      if (this.message.isLike) {
        praise('1234', this.message.rid).then((res) => {
          if (res.data.success === true) {
            this.message.likes++;
            this.likeTag++;
            span.className += " active"
          }

        })
      } else {
        unPraise('1234', this.message.rid).then((res) => {
          if (res.data.success === true) {
            this.message.likes--;
            this.likeTag--;
            span.className = "text"
          }
        })
      }

    },
    collect(e) {
      this.message.isCollect = !this.message.isCollect
      let span = e.currentTarget.children[1]
      if (this.message.isCollect) {
        collect(1234, this.message.rid).then((res) => {
          if (res.data.success === true) {
            this.message.collect++;
            this.starTag++;
            span.className += " active"
          }
        })

      } else {
        unCollect(1234, this.message.rid).then((res) => {
          if (res.data.success === true) {
            this.message.collect--;
            this.starTag--;
            span.className = "text"
          }
        })
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
