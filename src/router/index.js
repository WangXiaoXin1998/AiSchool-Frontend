import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import forgetpwd from '@/components/forgetpwd'
import index from '@/components/index'
import safe from '@/components/safe'
import poorlevel from '@/components/poorlevel'
import excellentlevel from '@/components/excellentlevel'
import yearlybill from '@/components/yearlybill'
import consume from '@/components/consume'

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
      path: '/yearlybill',
      name: 'yearlybill',
      component: yearlybill
    },
    {
      path: '/poorlevel',
      name: 'poorlevel',
      component: poorlevel
    },
    {
      path: '/consume',
      name: 'consume',
      component: consume
    },
    {
      path: '/excellentlevel',
      name: 'excellentlevel',
      component: excellentlevel
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
