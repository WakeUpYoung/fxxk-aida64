import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import {BootstrapVue, BootstrapVueIcons} from "bootstrap-vue"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
