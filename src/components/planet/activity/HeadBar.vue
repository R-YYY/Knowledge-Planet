<template>
  <div id="headBarMain">
    <div id="left">
      <span class="title">星球约</span>
    </div>
    <div id="center">
      <div id="selectors">
        <div class="select" v-show="!checkMode">
          <ul @click="select">
            <li><span class="selectItem selectedItem">全部</span></li>
            <li><span class="selectItem">我参与的</span></li>
            <li><span class="selectItem">我发布的</span></li>
          </ul>
        </div>
        <div class="select" v-show="!checkMode">
          <ul @click="select">
            <li><span class="selectItem selectedItem">全部</span></li>
            <li><span class="selectItem">组队中</span></li>
            <li><span class="selectItem">已组满</span></li>
          </ul>
        </div>
        <div class="select">
          <ul @click="select">
            <li><span class="selectItem selectedItem">全部</span></li>
            <li><span class="selectItem">学习</span></li>
            <li><span class="selectItem">休闲</span></li>
            <li><span class="selectItem">娱乐</span></li>
          </ul>
        </div>
      </div>

    </div>
    <div id="right">
      <uploadForm @update="update"></uploadForm>
    </div>
  </div>
</template>

<script>
import uploadForm from "@/components/planet/activity/UploadForm";

export default {
  name: "headBar",
  props:['checkMode'],
  components: {
    uploadForm
  },
  methods: {
    select(e) {
      if (e.target.nodeName === "SPAN") {
        let ul = e.currentTarget;
        let lis = ul.childNodes
        for (let li of lis) {
          li.firstChild.className = "selectItem"
        }
        e.target.className = "selectItem selectedItem"
        let spans = document.getElementsByClassName("selectItem selectedItem")
        let selectors = []
        for (let i = 0; i < 3; i++) {
          selectors[i] = spans[i].innerHTML
        }
        this.$emit("select",selectors)
      }
    },
    update(){
      this.$emit('update')
    }
  }
}
</script>

<style scoped>
#headBarMain {
  display: flex;
  height: 120px;
  width: 600px;
  min-width: 600px;
  padding: 0;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 0 12px #c7c7c7;
}

#left {
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.title {
  display: inline-block;
  margin-top: 10px;
  padding: 0 25px;
  height: 100px;
  line-height: 100px;
  color: #00ded4;
  font-size: 18px;
  font-weight: bold;
  border-right: 2px solid #c4c4c4;
}

#center {
  height: 110px;
  flex: 1;
  padding: 6px 0;
}

.select {
  transform: translateY(-5px);
  height: 35px;
}

.select ul {
  padding-left: 10px;
  font-weight: bold;
  list-style-type: none;
  display: inline;
}

.select ul li {
  color: #999898;
  cursor: pointer;
  display: inline;
  position: relative;
  margin-right: 30px;
  line-height: 50px;
}

.selectItem {
  display: inline-block;
  height: 35px;
  border-bottom: 3px solid #fff;
}

.selectedItem {
  color: #00ded4;
  border-color: #00ded4;
}

#right {
  width: 150px;
  line-height: 120px;
}

</style>
