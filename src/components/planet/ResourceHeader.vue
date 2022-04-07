<template>
  <div id="headBar">
    <h1 id="head">星球资源</h1>
    <el-divider direction="vertical"></el-divider>
    <div id="selector">
      <ul @click="select">
        <li><span class="selectItem selectedItem">全部</span></li>
        <li><span class="selectItem">最新</span></li>
        <li><span class="selectItem">球主推荐</span>
          <div id="fire"></div>
        </li>
      </ul>
      <el-checkbox v-model="checked">只看精选</el-checkbox>
    </div>
    <div id="button">
      <el-button round icon="el-icon-upload">上传资源</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResourceHeader",
  data() {
    return {
      selectTag: 0,
      checked: false
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
      }
    }
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

.el-button {
  border-color: #00ded4;
  color: #00ded4;
}

.el-button:hover,
.el-button:focus {
  background: #00ded4 !important;
  color: white !important;
  font-weight: bold;
}

#selector {
  flex: 4;
}

ul {

  list-style-type: none;
  display: inline;
}

ul li {
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

el-checkbox {
  position: relative;
  margin-right: 100px;
}

/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #00ded4;
}

/deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #00ded4;
  background-color: #00ded4;
}

#fire {
  position: relative;
  display: inline-block;
  background-image: url('../../assets/icon/fire.png');
  background-repeat: no-repeat;
  background-size: cover;
  transform: translateY(2px);
  width: 18px;
  height: 18px;
}
</style>
