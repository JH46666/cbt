// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store';
import $api from 'api';
import axios from 'axios';
import * as utils from 'utils/index.js';
import VueHead from 'vue-head';
import cbtComponents from './components';
import {MessageBox,Toast} from 'mint-ui';
import filters from '../filters'
import VueAxios from 'vue-axios'
Vue.use(VueAxios)
// 全局方法
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$toast = Toast;


// UI 框架
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// SEO
Vue.use(VueHead)

// 茶帮通组件
Vue.use(cbtComponents)


// 全局过滤
Vue.use(filters);


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
  components: { App },
  created() {
    this.$store.commit('SET_DEVICE','WAP')
  }
})
