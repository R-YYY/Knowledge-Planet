<template>
  <div id="recommendplanet">
    <div class="rep">
      <div class="rptext">推荐星球</div>
      <div class="rpcontent" v-for="(item,index) in recplanets" :key="index">
        <div class="content">
          <img src="../../assets/homepageimg/1.jpg" class="planet_img">
          <div class="ptitle">{{ item.title }}</div>
          <div class="pintro">{{item.intro}}</div>
          <div class="goin">
            <el-button type="primary" size="mini" style="width:60px;height:33px;text-align:center">加入</el-button>
          </div>
          <div class="other">
            <span style="font-family: 'Microsoft YaHei';font-size:14px;color:#727B82;margin-left:225px;">创建时间：{{item.time}}</span>
            <span style="font-family: 'Microsoft YaHei';font-size:14px;color:#53A6DF;margin-left:50px;">创建人：{{item.person}}</span>
          </div>
          <div class="divide">
            <el-divider></el-divider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      recplanets:[
        {
          img:'',
          title:'一路向北',
          intro:'我一路向北，离开有你的季节，你说你好累，已无法再爱上谁。风在山路吹，过往的画面全都是不对，细数惭愧，我伤你几回。',
          time:'2022年4月8日',
          person:'周杰伦'
        },{
          img:'',
          title:'花海',
          intro:'原谅说太快,爱成了阻碍，手中的风筝放太快回不来，不要你离开，回忆划不开，欠你的宠爱，我在等待重来，天空仍灿烂，它爱着大海，情歌被打败，爱已不存在。',
          time:'2022年4月8日',
          person:'周杰伦'
        },{
          img:'',
          title:'园游会',
          intro:'琥珀色黄昏像糖在很美的远方，你的脸没有化妆我却疯狂爱上，思念跟影子在傍晚一起被拉长，我手中那张入场券陪我数羊，薄荷色草地芬芳像风没有形状。',
          time:'2022年4月8日',
          person:'周杰伦'
        }
      ]
    }
  }
}
</script>

<style scoped>
#recommendplanet{
  position:relative;
  margin-top:-577px;
  margin-left:370px;
}
.rpcontent{
  margin-top:25px;
}
.content{
  position:relative;
  margin-top:10px;
}
.rep{
  /*position: relative;*/
  width:780px;
  height:600px;
  border-radius: 16px;
  box-shadow: 0 0 30px #dcdcdc;
}
.rptext{
  position: relative;
  font-family: "Microsoft YaHei";
  font-size:24px;
  font-color:#2C2C2C;
  left:30px;
  top:20px;
  font-weight: bold;
}
.planet_img{
  width:179px;
  height:120px;
  margin-left:30px;
}
.ptitle{
  margin-left:225px;
  margin-top:-126px;
  font-size:18px;
  font-color:#2C2C2C;
  font-family: "Microsoft YaHei";
  font-weight: bold;
}
.pintro{
  width:430px;
  height:50px;
  margin-left:225px;
  margin-top:10px;
  font-size:14px;
  font-color:#000000;
  font-family: "Microsoft YaHei";
  font-weight: bold;
}
.goin{
  margin-left:680px;
  margin-top:-50px;
}
.other{
  margin-top:36px;
}
.divide{
  width:740px;
  margin-left:20px;
}
</style>