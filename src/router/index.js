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
import PersonalCompeteRecordView from "@/views/personal/PersonalCompeteRecordView";
import EditComView from "@/views/planet/competition/EditComView";
import ComRecordView from "@/views/planet/competition/ComRecordView";
import ManageComView from "@/views/planet/competition/ManageComView";
import SystemNoticeView from "@/views/administrator/SystemNoticeView";
import UserManagementView from "@/views/administrator/UserManagementView";
import AnswerQuestionView from "@/views/planet/competition/AnswerQuestionView"
import AdminLoginView from "@/views/login/AdminLoginView";
import ResourceCheckView from "@/views/administrator/ResourceCheckView";
import HistoryCompView from "@/views/planet/competition/HistoryCompView";
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path: '/',
            name:'',
            redirect: {name: 'login'}
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/adminLogin',
            name: 'adminLogin',
            component: AdminLoginView
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
            path: '/planet/competition/manage',
            name:'competitionManage',
            component: ManageComView,
        },
        {
            path: '/planet/competition/answer/:id/:title',
            name:'AnswerQuestionView',
            component: AnswerQuestionView,
        },
        {
            path: '/planet/competition/edit/:cid',
            name:'editCompetition',
            component: EditComView,
        },
        {
            path: '/planet/competition/record',
            name:'competitionRecord',
            component: ComRecordView,
        },
        {
            path: '/planet/competition/record/:cid',
            name:'historyCompetition',
            component: HistoryCompView,
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
        },
        {
            path:'/personal/competeRecord',
            name:'personalCompeteRecord',
            component: PersonalCompeteRecordView
        },
        {
            path:'/admin/systemNotice',
            name:'systemNotice',
            component: SystemNoticeView
        },
        {
            path:'/admin/userManage',
            name:'userManage',
            component: UserManagementView
        },
        {
            path:'/admin/resourceCheck',
            name:'resourceCheck',
            component: ResourceCheckView
        }

    ]

})

router.beforeEach((to, from, next)=>{
    let loginSet = new Set()
    loginSet.add('login')
    loginSet.add('adminLogin')
    loginSet.add('register')
    loginSet.add('findPassword')
    let planetSet = new Set()
    planetSet.add('resource')
    planetSet.add('checkResource')
    planetSet.add('planetHomepage')
    planetSet.add('historyCompetition')
    planetSet.add('activity')
    planetSet.add('competitionRecord')
    planetSet.add('editCompetition')
    planetSet.add('AnswerQuestionView')
    planetSet.add('competitionManage')
    planetSet.add('competition')
    planetSet.add('member')
    let adminSet = new Set()
    adminSet.add('resourceCheck')
    adminSet.add('userManage')
    adminSet.add('systemNotice')
    if(window.sessionStorage.getItem('token')===null&&(!loginSet.has(to.name))){
        next('login')
    }
    else if(window.sessionStorage.getItem('planetCode')===null&&planetSet.has(to.name)){
        next('homepage')
    }
    else if(adminSet.has(to.name)&&(from.name!=='adminLogin'&&!adminSet.has(from.name))){
        next('adminLogin')
    }
    else{
        next()
    }
})

export default router
