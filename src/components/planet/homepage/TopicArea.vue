<template>
  <div class="topic_card">
    <div class="topic_header">
      <span class="header_name">星球讨论</span>
      <span id="all" class="show" @click="show('all')">全部</span>
      <span id="new" class="no_show" @click="show('new')">最新</span>
      <span id="recommend" class="no_show" @click="show('recommend')">球主推荐
      <img class="fire" src="../../../assets/icon/fire.png" alt=""></span>
      <span class="release">
        <img class="write_" src="../../../assets/icon/write_.png" alt="">发起讨论
      </span>
    </div>
    <div v-for="i in 10">
      <div class="desc">
        <p class="name">{{topics[i-1].name}}</p>
        <p class="content">{{topics[i-1].content}}</p>
      </div>
      <div class="opt">
        <img src="../../../assets/icon/comment.png" alt="">
        <span>{{topics[i-1].comment_num>99?"99+":topics[i-1].comment_num}}</span>
      </div>
      <div class="opt">
        <img src="../../../assets/icon/thumb.png" alt="">
        <span>{{topics[i-1].thumb_num>99?"99+":topics[i-1].thumb_num}}</span>
      </div>
      <div class="answer">
        <img src="../../../assets/icon/write.png" alt="">
        <span>回答</span>
      </div>
      <hr class="line">
    </div>
  </div>
</template>

<script>
export default {
  name: "TopicArea",
  data(){
    return{
      topics:[],
    }
  },
  methods:{
    show(obj){
      document.getElementById("all").className="no_show";
      document.getElementById("new").className="no_show";
      document.getElementById("recommend").className="no_show";
      document.getElementById(obj).className="show";
    },
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.topics.push({
        name:"哈哈哈嗝，Are you kidding me?",
        content:"这是一个虚假的内容这是一个虚假的内容这是一个虚假的内容这是一个虚假的内容" +
            "这是一个虚假的内容这是一个虚假的内容这是一个虚假的内容这是一个虚假的内容这是一" +
            "个虚假的内容这是一个虚假的内容这是一个虚假的内容这是一个虚假的内容这是一个虚假的内容",
        comment_num:100-i,
        thumb_num:100-i,
      })
    }
  }
}
</script>

<style scoped>
.topic_card{
  text-align: left;
  width: 800px;
  height: 100%;
  margin: 30px 30px 0;
  background-color: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 0 15px #cdcdcd;
}

.topic_header{
  width: 100%;
  height: 80px;
  background-color: #E2F5F0;
  border-radius: 20px 20px 0 0;
}

.header_name{
  height: 80px;
  line-height: 80px;
  margin-left: 30px;
  margin-right: 60px;
  font-size: 25px;
  font-weight: bold;
}

.no_show{
  font-weight: bold;
  margin-right: 40px;
  cursor: pointer;
  color: #999898;
}

.show{
  font-weight: bold;
  margin-right: 40px;
  cursor: pointer;
  color: #74D8BE;
  border-bottom: 3px solid #74D8BE;
  padding-bottom: 2px;
}

.fire{
  width: 20px;
}

.release{
  padding: 12px;
  margin-left: 120px;
  color: #74D8BE;
  font-weight: bold;
  font-size: 20px;
  background-color: white;
  border-radius: 30px;
  border: 2px solid #74D8BE;
  cursor: pointer;
}

.write_{
  width: 30px;
  vertical-align: middle;
  margin-right: 10px;
}

.desc{
  cursor: pointer;
}

.name{
  color: #6A6868;
  font-weight: bold;
  font-size: 20px;
  margin-left: 30px;
  margin-right: 40px;
}

.content{
  color: #6A6868;
  font-size: 15px;
  line-height: 25px;
  margin-left: 30px;
  margin-right: 40px;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  line-clamp:2;
  -webkit-line-clamp:2;
  overflow:hidden;
  text-overflow:ellipsis ;
}

.line{
  margin: 15px 30px 0;
  border-top:2px dashed #C1C0C0;
  border-bottom: 0;
}

.opt img{
  width: 25px;
  vertical-align: middle;
}

.opt span{
  color: #999898;
  font-size: 14px;
  font-weight: bold;
  margin-left: 2px;
}

.opt{
  display: inline-block;
  cursor: pointer;
  margin-left: 30px;
}

.answer{
  display: inline-block;
  height: 30px;
  cursor: pointer;
  margin-left: 30px;
  padding-left: 10px;
  padding-right: 15px;
  border-radius: 20px;
  border: 2px solid #74D8BE;
  color: #74D8BE;
  line-height: 30px;
  font-weight: bold;
}

.answer img{
  width: 18px;
  vertical-align: middle;
  padding-right: 7px;
}

</style>