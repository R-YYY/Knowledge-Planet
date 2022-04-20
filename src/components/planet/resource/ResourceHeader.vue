<template>
  <div id="headBar">
    <h1 id="head">星球资源</h1>
    <el-divider direction="vertical"></el-divider>
    <div id="selector">
      <ul @click="select">
        <li><span class="selectItem selectedItem">全部</span></li>
        <li>
          <el-tooltip content="查看点赞数最高的前10个资源" effect="light" placement="top">
            <span class="selectItem">热门</span>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip content="查看最新的前10个资源" effect="light" placement="top">
            <span class="selectItem">最新</span>
          </el-tooltip>
        </li>
        <li><span class="selectItem">星主推荐</span>
          <div id="fire"></div>
        </li>
      </ul>
    </div>
    <div id="button">
      <Upload></Upload>
    </div>
  </div>
</template>

<script>
import Upload from '@/components/planet/resource/uploadForm'

export default {
  name: "ResourceHeader",
  components: {
    Upload
  },
  data() {
    return {
      selectTag: 0,
    }
  },
  methods: {
    select(e) {
      if (e.target.nodeName === "SPAN") {
        let spans = document.querySelectorAll('li span');
        for (let span of spans) {
          span.className = "selectItem"
        }
        e.target.className = "selectItem selectedItem"
        switch (e.target.innerHTML) {
          case "全部":
            this.$emit('select', 'all')
            break;
          case "热门":
            this.$emit('select', 'hot')
            break;
          case "最新":
            this.$emit('select', 'time')
            break;
          case "星主推荐":
            this.$emit('select', 'recommend')
            break;
        }
      }
    },

  }
}
</script>

<style scoped>
#headBar {
  position: relative;
  display: flex;
  height: 50px;
  width: 650px;
  line-height: 50px;
  border-radius: 50px;
  box-shadow: 0 0 12px #dadada;
  background-color: white;
}

#head {
  width: 120px;
  margin-top: 2px;
  margin-left: 10px;
  text-align: center;
  font-size: 18px;
  color: #54524f;
  font-weight: bold;
}

/*垂直线*/
.el-divider--vertical {
  display: inline-block;
  width: 2px;
  height: 30px;
  margin: 10px 0;
  vertical-align: middle;
  position: relative;
}

#button {
  margin-right: 10px;
}

#selector {
  flex: 4;
}

#selector ul {
  font-weight: bold;
  list-style-type: none;
  display: inline;
}

#selector ul li {
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

#fire {
  position: relative;
  display: inline-block;
  background-image: url('../../../assets/icon/fire.png');
  background-repeat: no-repeat;
  background-size: cover;
  transform: translateY(2px);
  width: 18px;
  height: 18px;
  cursor: default;
}
</style>
