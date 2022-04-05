import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";

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
  }
]

const router = new VueRouter({
  routes
})

export default router
