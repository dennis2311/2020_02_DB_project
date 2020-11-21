import Vue from 'vue'
import Router from 'vue-router'

import commonRouter from './commonRouter'
import adminRouter from './adminRouter'
import assessorRouter from './assessorRouter'
import submitteeRouter from './submitteeRouter'

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
    ...commonRouter,
    ...adminRouter,
    ...assessorRouter,
    ...submitteeRouter,
    

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
