<template>
  <div id="manageRscHeader">
    <h1 class="head">星球资源</h1>
    <el-divider direction="vertical"></el-divider>
    <div class="selector">
      <ul @click="select">
        <li>
          <span class="selectItem selectedItem">未审核</span>
        </li>
        <li>
          <span class="selectItem">已审核</span>
        </li>
      </ul>
    </div>
    <el-checkbox-group class="recommend" min="1" v-model="checkList" v-if="used" @change="change">
      <el-checkbox label="已推荐" name="recommend"></el-checkbox>
      <el-checkbox label="未推荐" name="unRecommend"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "CheckRscHeader",
  data(){
    return{
      checkList:["已推荐","未推荐"],
      used:false,
    }
  },
  methods:{
    select(e) {
      if (e.target.nodeName === "SPAN") {
        let spans = document.querySelectorAll('li span');
        for (let span of spans) {
          span.className = "selectItem"
        }
        e.target.className = "selectItem selectedItem";
        switch (e.target.innerHTML) {
          case "已审核":
            this.used=true;
            this.$emit('select', 'checked');
            break;
          case "未审核":
            this.used=false;
            this.$emit('select', 'unChecked');
            break;
        }
      }
    },

    change(list){
      if(list.length===2){
        this.$emit('select', 'checked');
      }
      else if(list.length===1){
        this.$emit('select', list[0]==='已推荐'?'checked&&recommend':'checked&&unRecommend');
      }
      else{
        this.$emit('select', 'null');
      }
    }
  }
}
</script>

<style scoped>
#manageRscHeader{
  position: relative;
  display: flex;
  height: 50px;
  width: 650px;
  line-height: 50px;
  border-radius: 50px;
  box-shadow: 0 0 12px #dadada;
  background-color: white;
}

.head{
  width: 120px;
  margin-top: 2px;
  margin-left: 10px;
  text-align: center;
  font-size: 18px;
  color: #54524f;
  font-weight: bold;
}

.selector{
  /*flex: 2;*/
}

.selector ul {
  font-weight: bold;
  list-style-type: none;
  display: inline;
}

.selector ul li {
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
  font-weight: bold;
  color: #999898;
  font-size: 16px;
}

.selectedItem {
  color: #00ded4;
  border-color: #00ded4;
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

.recommend{
  /*color: #999898;*/
  font-weight: bold;
  font-size: 10px;
  margin-top: 5px;
}
</style>