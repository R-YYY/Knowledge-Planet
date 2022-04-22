import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'//主题色
import Header from '@/components/Header.vue'
import md5 from 'js-md5';


Vue.config.productionTip = false
Vue.prototype.$md5 = md5;
//使用ElementUI
Vue.use(ElementUI)
//全局组件
Vue.component('Header',Header)
// Vue.component(CollapseTransition.name, CollapseTransition)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
