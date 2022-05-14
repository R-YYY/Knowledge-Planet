<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload : this.reload,
    }
  },
  data() {
    return {
      isRouterAlive:true,
    };
  },
  methods: {
    // 通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    },
  },
};
</script>

<style>
html,body{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
