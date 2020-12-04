// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';
import 'es6-promise/auto'

Vue.use(Vuex)
Vue.prototype.$http = axios
Vue.config.productionTip = false

const store = new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state:{
    loggedIn: false,
    id:'',
    role: '',
  },
  mutations:{
    logIn(state, payload){
      state.loggedIn = true;
      state.id = payload.id
      state.role = payload.role
    },
    logOut(state){
      state.loggedIn = false
      state.id = ''
      state.role = ''
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

// Vue.use(VueSession)
