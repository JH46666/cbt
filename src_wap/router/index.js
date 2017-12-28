import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'
import * as $tool from 'utils/index.js';

Vue.use(Router)

const router = new Router({
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

				},
				{
					path: 'block',
					name: '静态块页面',
					component: resolve => require(['@/views/block/index.vue'],resolve),
					meta: {
						hideFooter: true
					}
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
					path: 'editaddress',
					name: '编辑地址',
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
					name: '红包列表',
					component: resolve => require(['@/views/center/redpacket.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'changepassword',
					name: '修改密码',
					component: resolve => require(['@/views/center/changePassword.vue'],resolve),
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
					path: 'select',
					name: '茶帮通注册2',
					component: resolve => require(['@/views/regist/select.vue'],resolve),
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
				},
				{
					path: 'seller',
					name: '茶帮通注册4',
					component: resolve => require(['@/views/regist/seller.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'selecter',
					name: '茶帮通注册5',
					component: resolve => require(['@/views/regist/selectEdit.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'selleredit',
					name: '茶帮通注册6',
					component: resolve => require(['@/views/regist/sellerEdit.vue'],resolve),
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
					path: 'payview',
					name: '结算显示',
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
					path: 'deliverysuccess',
					name: '货到付款成功',
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
			name: '买家订单',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: 'buyerlist',
					name: '订单列表',
					component: resolve => require(['@/views/order/buyerList.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'buyerdetail',
					name: '订单详情',
					component: resolve => require(['@/views/order/buyerDetail.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'buyerevaluate',
					name: '订单评价',
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
					path: 'orderlistdetail',
					name: '卖家订单明细',
					component: resolve => require(['@/views/seller/orderListDetail.vue'],resolve),
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
					path: 'editaddress',
					name: '卖家修改地址',
					component: resolve => require(['@/views/center/editAddress.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'activitylist',
					name: '活动列表',
					component: resolve => require(['@/views/seller/activitylist.vue'],resolve),
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
					path: 'activityedit',
					name: '编辑活动',
					component: resolve => require(['@/views/seller/activityedit.vue'],resolve),
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
					path: 'recruit',
					name: '卖家招募',
					component: resolve => require(['@/views/seller/selleRecruit.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'batch',
					name: '批量处理',
					component: resolve => require(['@/views/seller/batchProcess.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'goodEdit-1',
					name: '商品编辑-1',
					component: resolve => require(['@/views/seller/goodEdit-1.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'goodEdit-2',
					name: '商品编辑-2',
					component: resolve => require(['@/views/seller/goodEdit-2.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'shopdetail',
					name: '店铺详情',
					component: resolve => require(['@/views/seller/shopDetail.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
			]
		},
		{
			path: '/news',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: 'list',
					name: '新闻列表',
					component: resolve => require(['@/views/news/index.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
			],
		},
	]
})

let count = 0;
router.beforeEach((to,from,next) => {
	store.commit('RECORD_ROUTER',{type:'to',data:to})
	store.commit('RECORD_ROUTER',{type:'from',data:from})
	// 计数，为1才去执行微信的登录
	count++;
	// 需要判断是否在微信内部，是的话要授权登录
	if($tool.isWx && count === 1) {

		// 从 localStorage 获取数据并删除
		window.isWxLogin = Boolean(localStorage.isWxLogin)
		delete localStorage.isWxLogin;

		if(! window.isWxLogin) {
			localStorage.setItem('isWxLogin',true);
			// chiputaobutuputaopi 与文哥商量的 key 值
			// console.log(encodeURI(location.origin + `/api/wap/wechatAutoLogin?chiputaobutuputaopi=${location.origin}/#/${to.fullPath}`))
			location.href = encodeURI(location.origin + `/api/wap/wechatAutoLogin?chiputaobutuputaopi=${location.origin}`) + `/%23` + encodeURI(to.fullPath)
		} else {
			next()
		}
	} else {
		next()
	}

})


export default router
