<template>
  <div>
    <div class="desc">
      <h1 class="name">{{ topic.name }}</h1>
      <p class="content">{{ topic.content }}</p>
    </div>
    <div class="opt">
      <img src="@/assets/icon/comment.png" alt="">
      <span>{{ topic.comment_num > 99 ? "99+" : topic.comment_num }}</span>
    </div>
    <div class="opt">
      <img src="@/assets/icon/thumb.png" alt="">
      <span>{{ topic.thumb_num > 99 ? "99+" : topic.thumb_num }}</span>
    </div>
    <el-button style="position: absolute;right:50px" round icon="el-icon-edit" @click="dialogFormVisible=true">回答
    </el-button>
    <hr class="line">
  </div>
</template>

<script>
export default {
  name: "discussCard",
  props:['topic'],

}
</script>

<style scoped>

.desc {
  cursor: pointer;
}

.name {
  margin: 20px 30px;
  color: #6A6868;
  font-weight: bold;
  font-size: 18px;
}

.content {
  color: #6A6868;
  font-size: 15px;
  line-height: 25px;
  margin-left: 30px;
  margin-right: 40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line {
  margin: 15px 30px 0px 30px;
  border-top: 2px dashed #C1C0C0;
  border-bottom: 0;
}
.opt{
  width: 60px;
  text-align: center;
}
.opt img {
  width: 25px;
  vertical-align: middle;
}

.opt span {
  color: #999898;
  font-size: 14px;
  font-weight: bold;
  margin-left: 2px;
}

.opt {
  display: inline-block;
  cursor: pointer;
  margin-left: 30px;
}

.el-button {
  padding:  0 10px!important;
  height: 32px;
  line-height: 28px;
  font-weight: bold;
  border: 1px solid #74D8BE;
  box-shadow: 1px 2px 1px #74D8BE;
  color: #74D8BE;
}

.el-button:hover,
.el-button:focus {
  border: 1px solid #74D8BE;
  box-shadow: 0 0px 0px #74D8BE;
  background: #74D8BE !important;
  color: white !important;
}

.answer img {
  width: 18px;
  vertical-align: middle;
  padding-right: 7px;
}

#button {
  margin-right: 10px;
}
</style>
