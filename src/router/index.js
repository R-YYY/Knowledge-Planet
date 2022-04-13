import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/login/LoginView";
import RegisterView from "@/views/login/RegisterView";
import ResourceView from "@/views/planet/resource/ResourceView";
import ResourceDetail from "@/views/planet/resource/DetailView";
import HomePageView from "@/views/homepage/HomePageView";
import RegisterSuccessView from "@/views/login/RegisterSuccessView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: {name: 'login'}
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
        path: '/registerSuccess',
        name: 'registerSuccess',
        component: RegisterSuccessView,
    },
    {
        path: '/planet/resource',
        name: 'resource',
        component: ResourceView,
    },
    {
        path: '/planet/resource/detail/:rid',
        name: 'resourceDetail',
        component: ResourceDetail,
    },
    {
        path: '/homepage',
        name: 'homepage',
        component: HomePageView,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
