import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/login/LoginView";
import RegisterView from "@/views/login/RegisterView";
import ResourceView from "@/views/planet/resource/ResourceView";
import ResourceDetail from "@/views/planet/resource/DetailView";
import HomePageView from "@/views/homepage/HomePageView";
import Success from "@/views/login/SuccessView";
import FindPasswordView from "@/views/login/FindPasswordView";
import PlanetHomePageView from "@/views/planet/PlanetHomePageView";
import MemberView from "@/views/planet/member/MemberView";
import CheckRscView from "@/views/planet/resource/CheckRscView";
import CompetitionView from "@/views/planet/competition/CompetitionView";
import ActivityView from "@/views/planet/activity/ActivityView";
import PersonalInformationView from "@/views/personal/PersonalInformationView";
import PersonalFavoriteView from "@/views/personal/PersonalFavoriteView";
import ComRecordView from "@/views/planet/competition/ComRecordView";
import CreateComView from "@/views/planet/competition/CreateComView";

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
        path: '/findPassword',
        name: 'findPassword',
        component: FindPasswordView,
    },
    {
        path: '/success',
        name: 'success',
        component: Success,
    },
    {
        path: '/planet/resource',
        name: 'resource',
        component: ResourceView,
    },
    {
        path: '/planet/resource/check',
        name: 'checkResource',
        component: CheckRscView,
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
    },
    {
        path: '/planet',
        name:'planetHomepage',
        component: PlanetHomePageView,
    },
    {
        path: '/planet/member',
        name:'member',
        component: MemberView,
    },
    {
        path: '/planet/competition',
        name:'competition',
        component: CompetitionView,
    },
    {
        path: '/planet/competition/create',
        name:'createCompetition',
        component: CreateComView,
    },
    {
        path: '/planet/competition/record',
        name:'competitionRecord',
        component: ComRecordView,
    },
    {
        path: '/planet/activity',
        name:'activity',
        component: ActivityView,
    },
    {
        path:'/personal',
        name:'personalInformation',
        component:PersonalInformationView
    },
    {
        path:'/personal/favorite',
        name:'personalFavorite',
        component: PersonalFavoriteView
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
