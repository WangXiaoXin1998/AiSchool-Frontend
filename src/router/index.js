import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import forgetpwd from '@/components/forgetpwd'
import index from '@/components/index'
import safe from '@/components/safe'
import poorlevel from '@/components/poorlevel'
import poormonitor from '@/components/poormonitor'
import poormanage from '@/components/poormanage'
import accountmanage from '@/components/accountmanage'
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
      path: '/poormonitor',
      name: 'poormonitor',
      component: poormonitor
    },
    {
      path: '/poormanage',
      name: 'poormanage',
      component: poormanage
    },
    {
      path: '/accountmanage',
      name: 'accountmanage',
      component: accountmanage
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
