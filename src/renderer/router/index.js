import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '../../renderer/components/MainPage/MainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
