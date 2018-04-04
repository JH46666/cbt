import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'
import * as $tool from 'utils/index.js';
import $api from '../../api';

Vue.use(Router)

const router = new Router({
	mode: 'history',
	// scrollBehavior (to, from, savedPosition) {
	// 	if (to.hash) {
	// 	  return {
	// 		selector: to.hash
	// 	  }
	// 	}
	// },
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
					path: 'message',
					name: '消息',
					component: resolve => require(['@/views/layerim/demo.vue'],resolve),
					meta: {
						hideFooter: false
					}
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
				},
				{
					path: 'comment',
					name: '商品评论',
					component: resolve => require(['@/views/goods/commentList.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'share',
					name: '茶帮通拼团',
					component: resolve => require(['@/views/share/index.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'rules',
					name: '拼团需知',
					component: resolve => require(['@/views/share/collageddetail.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},

				{
					path: 'creategoods',
					name: '如何创建商品',
					component: resolve => require(['@/views/seller/creategoods.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'detailspf',
					name: '茶帮通商品详情规范',
					component: resolve => require(['@/views/seller/detailspf.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},

				{
					path: 'buyerProcess',
					name: '注册为茶帮通买家流程',
					component: resolve => require(['@/views/seller/buyerProcess.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'saleProcess',
					name: '注册为茶帮通卖家流程',
					component: resolve => require(['@/views/seller/saleProcess.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'penaltyRules',
					name: '茶帮通处罚规则',
					component: resolve => require(['@/views/seller/penaltyRules.vue'],resolve),
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
				},
				{
					path: 'brandVenue',
					name: '品牌馆',
					component: resolve => require(['@/views/center/brandVenue.vue'],resolve),
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
					// 第一次注册，不带出数据
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
					// 能带出之前的数据
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
					// 卖家完善资料
					path: 'selleredit',
					name: '茶帮通注册6',
					component: resolve => require(['@/views/regist/sellerEdit.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
				{
					path: 'sellerexamine',
					name: '茶帮通注册7',
					component: resolve => require(['@/views/regist/sellerExamine.vue'],resolve),
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
				{
					path: 'myMessage',
					name: '我的消息',
					component: resolve => require(['@/views/seller/message.vue'], resolve),
					meta: {
						hideFooter: true
					}
				}
			]
		},
		{
			path: 'wxlogin',
			name: '微信登录第三页面',
			component: resolve => require(['@/views/login/wxLogin.vue'],resolve),
			meta: {
				hideFooter: true
			}
		},
		{
			path: '/page',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: 'branchHall',
					name: '分馆',
					component: resolve => require(['@/views/page/branchHall.vue'],resolve),
					meta: {
						hideFooter: true
					}
				}
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
				{
					path: 'detail',
					name: '新闻详情',
					component: resolve => require(['@/views/news/detail.vue'],resolve),
					meta: {
						hideFooter: true
					}
				},
			],
		},
		{
			path: '/packet',
			component: resolve => require(['@/views/layout/mainWrap.vue'],resolve),
			children: [
				{
					path: '/',
					name: '红包馆',
					component: resolve => require(['@/views/page/packetHall.vue'],resolve),
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
	store.commit('RECORD_ROUTER',{type:'to',data:to});
	store.commit('RECORD_ROUTER',{type:'from',data:from});
	if(to.path !== "/message/" &&to.path!=="/seller/myMessage/"){
		let ele = document.getElementsByClassName("layui-m-layer");
		for(let i = 0; i<ele.length; i++){
			ele[i].style.display = "none";
		}
	}
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
			console.log(location.origin)
			console.log(to.fullPath)
			location.href = encodeURI(location.origin + `/api/wap/wechatAutoLogin?chiputaobutuputaopi=${location.origin}`) + `/%3F%23` + encodeURI(to.fullPath)
		} else {
			next()
		}
	} else {
		next()
	}
	// // 规避掉注册页面
	// const nextRoute = ['account', 'order', 'course'];
	// const auth = store.state.auth;
	// //跳转至上述3个页面
	// if (nextRoute.indexOf(to.name) >= 0) {
	// 	//未登录
	// 	if (!store.state.auth.IsLogin) {
	// 		vueRouter.push({ name: 'login' })
	// 	}
	// }
	// //已登录的情况再去登录页，跳转至首页
	// if (to.name === 'login') {
	// 	if (auth.IsLogin) {
	// 		vueRouter.push({ name: 'home' });
	// 	}
	// }
	// next();
});

router.afterEach( ( to, from, next ) => {
 setTimeout(()=>{
   var _hmt = _hmt || [];
   (function() {
    //每次执行前，先移除上次插入的代码
    document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?cdab7e8597c7ef0982765c6e4e156df2";
    hm.id = "baidu_tj"
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
   })();
 },0);
} );

export default router
