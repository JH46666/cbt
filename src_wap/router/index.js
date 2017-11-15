import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: '/',
					name: '首页',
					component: resolve => require(['@/views/index/index.vue'],resolve)
				},
				{
					path: 'login',
					name: '账户登录',
					component: resolve => require(['@/views/login/login.vue'],resolve),
					meta: {
						hideFooter: true
					}
				}
			]
		},
		{
			path: '/center',
			name: '个人中心',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: 'address',
					name: '地址管理',
					component: resolve => require(['@/views/center/address.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'integral',
					name: '积分记录',
					component: resolve => require(['@/views/center/integral.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'balance',
					name: '账户余额',
					component: resolve => require(['@/views/center/balance.vue'],resolve),
					meta: {
						hideFooter: true
					}
				}
			]
		}
		
	]
})
