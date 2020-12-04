import Vue from 'vue'
import Router from 'vue-router'

import commonRouter from './commonRouter'
import adminRouter from './adminRouter'
import assessorRouter from './assessorRouter'
import submitteeRouter from './submitteeRouter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...commonRouter,
    ...adminRouter,
    ...assessorRouter,
    ...submitteeRouter,
  ]
})
