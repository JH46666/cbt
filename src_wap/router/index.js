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
					path: 'search',
					name: '搜索',
					component: resolve => require(['@/views/search/index.vue'],resolve),
					meta: {
						transition: 'fadeDown',
						hideFooter: true
					}
				},
				{
					path: 'category',
					name: '分类',
					component: resolve => require(['@/views/search/category.vue'],resolve),

				},
				{
					path: 'cart',
					name: '购物车',
					component: resolve => require(['@/views/cart/index.vue'],resolve),

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
				},
				{
					path: 'redpacket',
					name: '账户余额',
					component: resolve => require(['@/views/center/redpacket.vue'],resolve),
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
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: '/',
					name: '结算中心',
					component: resolve => require(['@/views/balance/index.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
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
				},
				{
					path: 'delivery',
					name: '货到付款结算',
					component: resolve => require(['@/views/balance/payView.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'cashier',
					name: '收银台',
					component: resolve => require(['@/views/balance/cashier.vue'],resolve),
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
					path: 'buyerdetail',
					name: '订单详情1',
					component: resolve => require(['@/views/order/buyerDetail.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'buyerevaluate',
					name: '订单评价1',
					component: resolve => require(['@/views/order/buyerEvaluate.vue'],resolve),
					meta: {
						hideFooter: true
					}
				}
			]
		},
		{
			path: '/seller',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children:[
				{
					path: '/',
					name: '卖家中心',
					component: resolve => require(['@/views/seller/seller.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'orderlist',
					name: '卖家订单列表',
					component: resolve => require(['@/views/seller/orderList.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'editexpress',
					name: '修改配送方式',
					component: resolve => require(['@/views/seller/editExpress.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'sendgoods',
					name: '发货',
					component: resolve => require(['@/views/seller/sendGoods.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'orderdetail',
					name: '卖家订单详情',
					component: resolve => require(['@/views/seller/orderDetail.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'activitylist',
					name: '活动列表',
					component: resolve => require(['@/views/seller/activityList.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'activity',
					name: '添加活动',
					component: resolve => require(['@/views/seller/activity.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'freight',
					name: '运费配置',
					component: resolve => require(['@/views/seller/freight.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'goodsmanage',
					name: '商品管理',
					component: resolve => require(['@/views/seller/goodsManage.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'newshelves-1',
					name: '新品上架-1',
					component: resolve => require(['@/views/seller/newshelves1.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'newshelves-2',
					name: '新品上架-2',
					component: resolve => require(['@/views/seller/newshelves2.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'income',
					name: '我的收入',
					component: resolve => require(['@/views/seller/income.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'newshelves-3',
					name: '新品上架3',
					component: resolve => require(['@/views/seller/newshelves3.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'recruit',
					name: '卖家招募',
					component: resolve => require(['@/views/seller/selleRecruit.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'regist',
					name: '卖家注册',
					component: resolve => require(['@/views/seller/regist.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
			]
		}
	]
})
