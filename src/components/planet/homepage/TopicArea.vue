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
        <p class="name">自学前端需要达到什么水平才能去工作？</p>
        <p class="content">历史的车轮滚滚向前，今天的web前端虽然名义上还叫前端，但在职业技能上已经要求一个
          合格前端开发人员可以独立完成项目，取代后端。职场竞争残酷，“全能”是这个......</p>
      </div>
      <div class="opt">
        <img src="../../../assets/icon/comment.png" alt="">
        <span>99+</span>
      </div>
      <div class="opt">
        <img src="../../../assets/icon/thumb.png" alt="">
        <span>99+</span>
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

    }
  },
  methods:{
    show(obj){
      document.getElementById("all").className="no_show";
      document.getElementById("new").className="no_show";
      document.getElementById("recommend").className="no_show";
      document.getElementById(obj).className="show";
    },
  }
}
</script>

<style scoped>
.topic_card{
  text-align: left;
  width: 800px;
  height: 100%;
  margin: 30px 30px 0 180px;
  background-color: white;
  border-radius: 20px;
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