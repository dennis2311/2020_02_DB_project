import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import AdminPage from '@/components/AdminPage'
import AssessorPage from '@/components/AssessorPage'
import SubmitteePage from '@/components/SubmitteePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
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
    }
  ]
})
