<template>
  <div id="resource">
    <Header></Header>
    <div id="main">
      <HeadBar></HeadBar>
      <div id="content">
        <div class="card" v-for="(item,index) in resourceList" :key="item.id">
          <Card :resource="item"></Card>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import HeadBar from "@/components/planet/ResourceHeader"
import Card from "@/components/planet/ResourceCard"

export default {
  name: "ResourceView",
  components: {
    HeadBar,
    Card
  },
  data() {
    return {
      resourceList: [
        {
          id: 123,
          title: 'Common.Utility',
          description: '项目作者日常工作和网上总结和网上收集、整理的C#各种各样的功能类库。类于类之间没有之间的关联样的功能类库。类于类之间没有之间的关联',
          img: 'https://img.51miz.com/Element/00/33/31/09/db33029b_E333109_68c43404.png',
          person: '张三',
          time: '2021-12-2',
          isPicked: true,
          tags: ['github', '前端'],
          likes: 240,
          isLike: false,
          isCollect: false,
          collect: 96,
          url: 'http://www.baidu.com'
        },
        {
          id: 124,
          title: 'Common.Utility',
          description: '项目作者日常工作和网上总结和网上收集、整理的C#各种各样的功能类库。类于类之间没有之间的关联样的功能类库。类于类之间没有之间的关联',
          img: 'https://img.51miz.com/Element/00/33/31/09/db33029b_E333109_68c43404.png',
          person: '张三',
          time: '2021-12-2',
          isPicked: true,
          tags: ['github', '前端'],
          likes: 210,
          isLike: false,
          isCollect: false,
          collect: 96,
          url: 'http://www.baidu.com'
        },
        {
          id: 125,
          title: 'Common.Utility',
          description: '项目作者日常工作和网上总结和网上收集、整理的C#各种各样的功能类库。类于类之间没有之间的关联样的功能类库。类于类之间没有之间的关联',
          img: 'https://img.51miz.com/Element/00/33/31/09/db33029b_E333109_68c43404.png',
          person: '张三',
          time: '2021-12-2',
          isPicked: true,
          tags: ['github', '前端'],
          likes: 240,
          isLike: false,
          isCollect: false,
          collect: 96,
          url: 'http://www.baidu.com'
        },
        {
          id: 126,
          title: 'Common.Utility',
          description: '项目作者日常工作和网上总结和网上收集、整理的C#各种各样的功能类库。类于类之间没有之间的关联样的功能类库。类于类之间没有之间的关联',
          img: 'https://img.51miz.com/Element/00/33/31/09/db33029b_E333109_68c43404.png',
          person: '张三',
          time: '2021-12-2',
          isPicked: true,
          tags: ['github', '前端'],
          likes: 240,
          isLike: false,
          isCollect: false,
          collect: 96,
          url: 'http://www.baidu.com'
        },
        {
          id: 127,
          title: 'Common.Utility',
          description: '项目作者日常工作和网上总结和网上收集、整理的C#各种各样的功能类库。类于类之间没有之间的关联样的功能类库。类于类之间没有之间的关联',
          img: 'https://img.51miz.com/Element/00/33/31/09/db33029b_E333109_68c43404.png',
          person: '张三',
          time: '2021-12-2',
          isPicked: true,
          tags: ['github', '前端'],
          likes: 240,
          isLike: false,
          isCollect: false,
          collect: 96,
          url: 'http://www.baidu.com'
        },
        {
          id: 127,
          title: 'Common.Utility',
          description: '项目作者日常工作和网上总结和网上收集、整理的C#各种各样的功能类库。类于类之间没有之间的关联样的功能类库。类于类之间没有之间的关联',
          img: 'https://img.51miz.com/Element/00/33/31/09/db33029b_E333109_68c43404.png',
          person: '张三',
          time: '2021-12-2',
          isPicked: true,
          tags: ['github', '前端'],
          likes: 240,
          isLike: false,
          isCollect: false,
          collect: 96,
          url: 'http://www.baidu.com'
        },
        {
          id: 127,
          title: 'Common.Utility',
          description: '项目作者日常工作和网上总结和网上收集、整理的C#各种各样的功能类库。类于类之间没有之间的关联样的功能类库。类于类之间没有之间的关联',
          img: 'https://img.51miz.com/Element/00/33/31/09/db33029b_E333109_68c43404.png',
          person: '张三',
          time: '2021-12-2',
          isPicked: true,
          tags: ['github', '前端'],
          likes: 240,
          isLike: false,
          isCollect: false,
          collect: 96,
          url: 'http://www.baidu.com'
        },
      ]
    }
  }


}
</script>

<style scoped>
#main {
  margin: 30px 100px 0 100px;
}

#content {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.card {
  margin: 40px 20px 10px 20px;
}
</style>
