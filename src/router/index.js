import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import forgetpwd from '@/components/forgetpwd'
import index from '@/components/index'
import safe from '@/components/safe'
import mygroup from '@/components/mygroup'
import mytask from '@/components/mytask'
import userlist from '@/components/userlist'
import managelist from '@/components/managelist'
import tasklist from '@/components/tasklist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/safe',
      name: 'safe',
      component: safe
    },
    {
      path: '/mygroup',
      name: 'mygroup',
      component: mygroup
    },
    {
      path: '/managelist',
      name: 'managelist',
      component: managelist
    },
    {
      path: '/userlist',
      name: 'userlist',
      component: userlist
    },
    {
      path: '/tasklist',
      name: 'tasklist',
      component: tasklist
    },
    {
      path: '/mytask',
      name: 'mytask',
      component: mytask
    },
    {
      path: '/',
      name: 'login',
      component: login
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
