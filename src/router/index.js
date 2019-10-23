import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import forgetpwd from '@/components/forgetpwd'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forgetpwd',
      name: 'forgetpwd',
      component: forgetpwd
    },
  ]
})
