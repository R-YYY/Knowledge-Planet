<template>
  <div id="createnotice">
    <div class="noticecontent">

      <div class="header">
        <img src="../../../assets/admin/write.png" class="notice_png">
        <span class="notice_text">新增公告</span>
        <div class="noticedivide">
          <el-divider></el-divider>
        </div>
      </div>

      <div class="content">
        <div class="title_text">公告题目</div>
        <el-input
            style="width:360px;"
            type="text"
            placeholder="请输入内容"
            v-model="title"
            maxlength="20"
            show-word-limit
        >
        </el-input>
        <div style="margin: 40px 0;"></div>
        <div class="content_text">公告内容</div>
        <el-input
            style="width:600px;"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="content"
            maxlength="200"
            show-word-limit
        >
        </el-input>
      </div>
      <div class="create">
        <el-button type="primary" icon="el-icon-success" @click="release()">发布</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import {getUserById} from "@/api/admin/manage";
import {releaseNotice} from "@/api/admin/manage";

export default {
  data() {
    return {
      adminId:'',
      title:'',
      content:'',
      information:{}
    }
  },
  methods: {
    release() {
      let data = JSON.stringify({
        "adminId": 1,
        "title": this.title,
        "content": this.content,
      })
      releaseNotice(data).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.$message.success("发布成功！")

        } else {
          this.$message.error("发布失败!")
        }
      }).catch((err) => {
        this.$message.error("发布失败，系统错误！")
        console.log(err)
      })
    },
  },
  mounted() {

  }

}
</script>

<style scoped>
.noticecontent {
  position: absolute;
  width: 700px;
  min-height: 560px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}

.header {
  margin-top: 10px;
  position: absolute;
}

.notice_png {
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-left: 40px;
}

.notice_text {
  vertical-align: middle;
  margin-left: 15px;
  font-size: 23px;
  font-family: "Microsoft YaHei";
  color:#707070;
}

.noticedivide {
  width: 700px;
}
.title_text{
  font-size:20px;
  margin-bottom: 10px;
  font-family: "Microsoft YaHei";
}

.content_text{
  font-size:20px;
  margin-bottom: 10px;
  font-family: "Microsoft YaHei";
}

.content{
  margin-top:100px;
  margin-left:40px
}
.create{
  margin-left: 40px;
  margin-top:30px;
}
</style>
