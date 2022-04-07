import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'//主题色
import Header from '@/components/Header.vue'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
//使用ElementUI
Vue.use(ElementUI)
//全局组件
Vue.component('Header',Header)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
