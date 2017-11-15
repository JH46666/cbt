import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '/',
			name: '茶帮通商城',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: '/',
					name: '首页',
					component: resolve => require(['@/views/index/index.vue'],resolve)
				}
			]
		}
  	]
})
