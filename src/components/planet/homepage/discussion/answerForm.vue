<template>
  <div id="form">
    <textarea v-model="content" @input="autoTextAreaHeight" class="input"></textarea>
    <transition name="el-zoom-in-top">
      <div v-if="pictureList.length!==0" class="pictureList">
        <div class="pictureWall clearfix">
          <div v-for="(picture,index) in pictureList"
               draggable="true"
               @dragstart="startIndex = index"
               @dragleave="startIndex = index"
               @dragenter="replacePosition(index)"
               @dragover="allowDrag"
               :style="{backgroundImage:'url('+picture+')'}"
               class="picture">
            <div class="deleteButton" @click="removePicture(index)"></div>
          </div>
          <div class="upload-plus" @click="uploadPictureClick"><i class="el-icon-plus"></i></div>
        </div>
      </div>
    </transition>
    <div class="footer">
      <button class="pictureButton" @click="uploadPictureClick">
        <i class="el-icon-picture-outline-round"></i>
      </button>
      <input type="file" multiple id="file" @change="uploadPicture" style="display: none">
      <span class="wordNum">{{ content.length }}字</span>

      <el-button class="submitButton" round @click="submit">发送
      </el-button>
      <el-button class="submitButton" round @click="cancelAnswer">取消
      </el-button>
    </div>
  </div>
</template>

<script>
import cos from "@/api/cos";
import {insertTopic} from "@/api/planet/topic";
import eventBus from "@/utils/eventBus";

export default {
  name: "answerForm",
  data() {
    return {
      content: "",
      pictureList: [],
      picturesKey: [],
      startIndex: null,
    }
  },
  methods: {
    autoTextAreaHeight(e) {
      e.target.style.height = 'auto'
      e.target.style.height = e.target.scrollTop + e.target.scrollHeight + "px"
    },
    uploadPictureClick() {
      document.querySelector('#file').click();
    },
    uploadPicture(e) {
      let that = this
      for (let item of e.currentTarget.files) {
        const key = 'discuss/' + item.lastModified + item.name.split('.')[0]
        cos.putObject({
          Bucket: 'covenant-1308013334', /* 必须 */
          Region: 'ap-shanghai',     /* 存储桶所在地域，必须字段 */
          Key: key,              /* 必须 */
          StorageClass: 'STANDARD',
          Body: item, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
          }
        }, function (err, data) {
          console.log(data)
          if (err || data.statusCode !== 200) {
            that.$message.error("图片上传失败，请重新上传")
          } else {
            that.pictureList.push('https://' + data.Location)
            that.picturesKey.push(key)
            console.log("图片上传成功")
          }
        })
      }

    },
    removePicture(index) {
      console.log(index)
      let that = this
      console.log(this.picturesKey[index])
      cos.deleteObject({
        Bucket: 'covenant-1308013334', /* 必须 */
        Region: 'ap-shanghai',     /* 存储桶所在地域，必须字段 */
        Key: 'discuss/' + that.picturesKey[index],              /* 必须 */
      }, function (err, data) {
        console.log(err, data)
        if (err || data.statusCode !== 204) {
          that.$message.error("删除图片失败")
        } else {
          that.pictureList.splice(index, 1)
          that.picturesKey.splice(index, 1)
          console.log("文件图片成功")
        }
      })
    },
    replacePosition(index) {
      this.swap(this.startIndex, index, this.pictureList)
      this.swap(this.startIndex, index, this.picturesKey)
      let pictureList = this.pictureList
      let picturesKey = this.picturesKey
      this.pictureList = []
      this.pictureList = pictureList
      this.picturesKey = picturesKey
    },
    allowDrag(e) {
      e.preventDefault()
    },
    swap(start, end, arr) {
      let temp = arr[start]
      arr[start] = arr[end]
      arr[end] = temp
    },
    cancelAnswer() {
      this.$emit("cancel")
    },
    submit() {
      let picture = ''
      console.log(this.pictureList)
      for (let p of this.pictureList) {
        picture += p + ','
      }
      picture = picture.substr(0,picture.length - 1)
      let data = JSON.stringify({
        "planetCode": window.sessionStorage.getItem('planetCode'),
        "content": this.content,
        "picture": picture
      })
      let that = this
      insertTopic(data).then((res) => {
        console.log(res)
        if (res.data.success) {
          that.$message.success("发帖成功")
          this.$emit("cancel")
          eventBus.$emit('addMyTopic')
        } else {
          that.$message.success("发帖失败")
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#form {
  padding: 20px 30px 10px;
  min-height: 150px;
  border-radius: 12px;
  background-color: #E2F5F0;
}

.input {
  font-size: 16px;
  min-height: 140px;
  line-height: 20px;
  border-radius: 12px;
  border: 0 solid #42b983;
  box-sizing: border-box;
  padding: 10px 20px;
  resize: none;
  overflow: hidden;
}

.input:focus {
  background-color: #fff;
  outline-width: 0;
  border: 1px solid #74D8BE;
}


.pictureButton {
  border-radius: 50%;
  border: 0px;
  height: 30px;
  width: 30px;
  padding: 1px 0 0;
  color: #74D8BE;
  background-color: white;
  font-size: 22px;
  line-height: 30px;
}

.pictureButton:hover,
.pictureButton:focus {
  background-color: #74D8BE;
  color: #fff;
}

.pictureWall {
  margin-top: 0;
}

.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}

.picture {
  position: relative;
  width: 90px;
  height: 90px;
  float: left;
  border-radius: 8px;
  margin-right: 10px;
  margin-top: 7px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/*.picture:hover {*/
/*  opacity: 0.5;*/
/*}*/

.deleteButton {
  position: absolute;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  background-color: #aaaaaa;
  background-image: url("../../../../assets/icon/close.png");
  background-size: 11px 11px;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.8;
  top: 5px;
  right: 5px
}

.deleteButton:hover {
  opacity: 1;
  background-color: transparent;
  background-image: url("../../../../assets/icon/close-active.png");
  opacity: 1;
}

.upload-plus {
  width: 90px;
  height: 90px;
  float: left;
  border-radius: 8px;
  margin-top: 7px;
  color: #acacac;
  border: 1px dashed #acacac;
  text-align: center;
  line-height: 90px;
}

.upload-plus:hover {
  color: #00ded4;
  border: 1px dashed #00ded4;
}

.footer {
  text-align: left;
  margin: 10px 0;
  padding: 0;
  line-height: 0;
}

.wordNum {
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  color: #74D8BE;
  margin-left: 20px;
  transform: translateY(-2px);
}

.el-button {
  padding: 0 15px !important;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  border: 0px solid #74D8BE;
  box-shadow: 0 3px 2px #74D8BE;
  color: #74D8BE;
}

.el-button:hover,
.el-button:focus {
  box-shadow: 0 3px 2px #fff;
  color: #fff !important;
  background-color: #74D8BE !important;
}

.submitButton {
  float: right;
  margin-left: 10px;
}
</style>
