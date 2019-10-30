// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api/api';
import axios from 'axios';
import qs from 'qs';
Vue.config.productionTip = false;
Vue.prototype.$ajax = api;
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.use(qs);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})