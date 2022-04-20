<template>
  <div id="recommendplanet">
    <div class="rep">
      <div class="rptext">推荐星球</div>
      <div class="hint" >
        <el-popover
            placement="right-start"
            trigger="hover"
            content="为你推荐最感兴趣的星球">
            <img src="../../assets/homepageimg/hint.png" class="hintpng" slot="reference">
        </el-popover>
      </div>


      <div class="rpcontent" v-for="(item,index) in recommendplanet" :key="index">
        <div class="content">
          <img src="../../assets/homepageimg/1.jpg" class="planet_img">
          <div class="ptitle">{{ item.planetName }}</div>
          <div class="pintro">{{item.planetDescription}}</div>
          <div class="goin">
            <el-button type="primary" size="mini" style="width:60px;height:33px;text-align:center">加入</el-button>
          </div>
          <div class="other">
            <span style="font-family: 'Microsoft YaHei';font-size:14px;color:#727B82;margin-left:225px;">创建时间：{{item.createTime}}</span>
<!--            <span style="font-family: 'Microsoft YaHei';font-size:14px;color:#53A6DF;margin-left:50px;">创建人：{{item.person}}</span>-->
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
import { getRecommendPlanet} from "@/api/homepage/planet";

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
        }
      ],
      recommendplanet:[]
    }
  },
  methods:{

  },
  mounted(){
    getRecommendPlanet().then((res)=>{
      if(res.data.success === true){
        console.log(1)
        let data = res.data.data.planetList
        console.log(data)
        this.recommendplanet=data

      }
    })
  }
}
</script>

<style scoped>
#recommendplanet{

}
.rpcontent{
  margin-top:25px;
}
.content{
  position:relative;
  margin-top:30px;
}
.rep{
  /*position: relative;*/
  width:780px;
  /*height:600px;*/
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
  width:100px;
}
.planet_img{
  border-radius: 50%;
  width:120px;
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
.hintpng{
  style:inline-block;
  height:18px;
  width:20px;
}
.hint{
  margin-left:130px;
  margin-top:-5px;
}
</style>