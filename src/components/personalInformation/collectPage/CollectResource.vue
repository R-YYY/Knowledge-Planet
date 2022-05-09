<template>
  <div id="collectresource">
    <div class="resource">
      <div class="header">
        <p class="resource_text">我的收藏</p>
      </div>
      <div class="resource_content">
        <el-collapse  v-for="item in activeNames">
          <el-collapse-item  :title="item.name" :name="item.name">
            <div class="content">
              <div class="card">

                <Card :resource="item"></Card>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>

export default{
  data(){
    return{
      activeNames:[
        {
          name:'1',
          content:'1'
        },
        {
          name:'2',
          content:'2'
        },
        {
          name:'3',
          content:'3'
        }
      ]

    }
  },
  methods:{

  },
  mounted(){

  }

}
</script>
<style scoped>
.resource{
  position:relative;
  width:900px;
  height:580px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.header{
  position:absolute;
  margin-top: -15px;
  margin-left: 20px;
}
.resource_text{
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 25px;
}
.resource_content{
  position:absolute;
  width:880px;
  margin-top:50px;
  margin-left:20px;
}
/deep/ .el-collapse-item__header{
  font-size: 18px;
  color: #F56C6C;
}

/*/deep/ .el-collapse-item__wrap{*/
/*  border-bottom:1px solid black;*/
/*}*/

</style>