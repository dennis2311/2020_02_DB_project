import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from '@/components/common/LoginPage'
import CreateAccountPage from '@/components/common/CreateAccountPage'
import FindAccountPage from '@/components/common/FindAccountPage'

import AdminPage from '@/components/admin/AdminPage'

import AssessorPage from '@/components/assessor/AssessorPage'

import SubmitteePage from '@/components/submittee/SubmitteePage'


// under : example routes
import UserIndexPage from '@/components/UserIndexPage'
import UserDetailPage from '@/components/UserDetailPage'
import ShowUserPage from '@/components/ShowUserPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/createaccount',
      name: 'CreateAccountPage',
      component: CreateAccountPage
    },
    {
      path: '/findaccount',
      name: 'FindAccountPage',
      component: FindAccountPage
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

    

    // under : example routes
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
    {
      path : '/showUsers',
      name: 'ShowUsersPage',
      component: ShowUserPage
    }
  ]
})
