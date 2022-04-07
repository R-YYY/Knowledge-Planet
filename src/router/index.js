import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import ResourceView from "@/views/planet/ResourceView";

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect :{name:'login'}
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/register_result',
    name: 'registerResult'
  },
  {
    path: '/planet/resource',
    name: 'resource',
    component: ResourceView
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
