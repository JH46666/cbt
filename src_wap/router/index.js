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
					path: 'detail',
					name: '商品详情',
					component: resolve => require(['@/views/goods/detail.vue'],resolve),
					meta: {
						hideFooter: true
					}
                },
				{
					path: 'login',
					name: '账户登录',
					component: resolve => require(['@/views/login/login.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'forget',
					name: '忘记密码',
					component: resolve => require(['@/views/login/forget.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: '/search',
					name: '搜索',
					component: resolve => require(['@/views/search/index.vue'],resolve),
					meta: {
						transition: 'fadeDown',
						hideFooter: true
					}
				},
				{
					path: '/cart',
					component: resolve => require(['@/views/cart/index.vue'],resolve),
					// meta: {
					// 	hideFooter: true
					// }
				}
			]
		},
		{
			path: '/center',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: '/',
					name: '个人中心',
					component: resolve => require(['@/views/center/index.vue'],resolve)
				},
				{
					path: 'address',
					name: '地址管理',
					component: resolve => require(['@/views/center/address.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'addaddress',
					name: '新增地址',
					component: resolve => require(['@/views/center/editAddress.vue'],resolve),
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
		},
		{
			path: '/regist',
			name: '茶帮通注册',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: 'buyer',
					name: '茶帮通注册1',
					component: resolve => require(['@/views/regist/buyer.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'seller',
					name: '茶帮通注册2',
					component: resolve => require(['@/views/regist/seller.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'examine',
					name: '茶帮通注册3',
					component: resolve => require(['@/views/regist/examine.vue'],resolve),
					meta: {
						hideFooter: true
					}
				}
			]
		},
		{
			path: '/balance',
			name: '结算中心',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: 'success',
					name: '结算成功',
					component: resolve => require(['@/views/balance/payView.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'fail',
					name: '结算失败',
					component: resolve => require(['@/views/balance/payView.vue'],resolve),
					meta: {
						hideFooter: true
					}
				}
			]
		},
		{
			path: '/order',
			name: '订单列表',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: 'buyerlist',
					name: '订单列表1',
					component: resolve => require(['@/views/order/buyerList.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'sellerlist',
					name: '订单列表2',
					component: resolve => require(['@/views/order/sellerList.vue'],resolve),
					meta: {
						hideFooter: true
					}
				}
			]
		}
	]
})
