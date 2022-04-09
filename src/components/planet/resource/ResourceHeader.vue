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
    </div>
    <div id="button">
      <el-button round icon="el-icon-upload" @click="dialogFormVisible=true">上传资源</el-button>
      <el-dialog title="上传资源" :visible.sync="dialogFormVisible">
        <el-form :model="form" class="form">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input class="input" v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input class="input" v-model="form.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="简介" :label-width="formLabelWidth">
            <el-input
                class="input"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.detail">
            </el-input>
          </el-form-item>
          <el-form-item label="标签" :label-width="formLabelWidth">
            <el-select v-model="form.tags" multiple placeholder="请选择" class="input">
              <el-option
                  max-width="400px"
                  v-for="tag in tagOptions"
                  :key="tag.value"
                  :label="tag.label"
                  :value="tag.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button  @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  name: "ResourceHeader",
  data() {
    return {
      selectTag: 0,
      form: {
        title: '',
        description: '',
        detail: '',
        url:'',
        tags: [],
      },
      dialogFormVisible:true,
      formLabelWidth: '3em',
      tagOptions:[
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项1',
          label: '黄金糕'
        },
      ],
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

#selector ul {

  list-style-type: none;
  display: inline;
}

#selector ul li {
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
}

.dialog-footer {
  text-align: center;
}
.dialog-footer button{
  margin-left: 20px;
  margin-right: 20px;
}
.form{
  margin-left: 10%;
  margin-right: 10%;
}
.input{
  width: 100%;
}
/deep/.el-select-dropdown__list {
  width: 20px;
}
</style>
