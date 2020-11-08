import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import AdminPage from '@/components/AdminPage'
import AssessorPage from '@/components/AssessorPage'
import SubmitteePage from '@/components/SubmitteePage'
import UserIndexPage from '@/components/UserIndexPage'
import UserDetailPage from '@/components/UserDetailPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage
    },
    {
      path: '/assessor',
      name: 'AssessorPage',
      component: AssessorPage
    },
    {
      path: '/submittee',
      name: 'SubmitteePage',
      component: SubmitteePage
    },
    {
      path: '/users',
      name: 'UserIndexPage',
      component: UserIndexPage
    },
    {
      path: '/users/:id',
      name: 'UserDetailPage',
      component: UserDetailPage
    },
  ]
})
