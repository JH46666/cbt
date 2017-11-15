// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store';
import $api from 'api';
import axios from 'axios';
import * as utils from 'utils';

// UI 框架
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


import './styles/less/common.less'


Vue.config.productionTip = false

// 全局方法
Vue.prototype.$api = $api;
Vue.prototype.$http = axios;
Vue.prototype.$tool = utils;




new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
