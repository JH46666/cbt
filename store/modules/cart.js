import $api from '../../api';
import { Toast,Indicator } from 'mint-ui'
const cart = {
    state:{
        cartData:[],
        cartTotal: 0
    },
    mutations:{
        SET_CART_LIST(state,data){
            state.cartData = data;
        },
        // 更新购物车数量
        UPDATETOTAL(state,data) {
            state.cartTotal = data;
        }
    },
    actions:{
        queryCart({context,rootState},{buynow}){
            return new Promise((resolve,reject)=>{
                $api.get('/oteao/shoppingCart/query',{
                    device: rootState.device,
                    buyNow: buynow || ''
                },res=>{
                    resolve(res);
                },res=>{
                    reject(res);
                });
            })
        },
        addCart({dispatch,rootState},{proId,buyNum,groupType,groupId}){
            return new Promise((resolve,reject)=>{
                $api.post('/oteao/shoppingCart/addBuyNum',{
                    device: rootState.device,
                    proId: proId,
                    buyNum: buyNum,
                    buyNow:1,//立即购买
                    groupType:groupType,//0或空:单独购买 1:开团 2:参团
                    groupId:groupId?groupId:''//团购编号
                },res=>{
                    // 更新购物车数量
                    // dispatch('queryCartTotal');
                    // Toast({
                    //     message: res.message,
                    //     iconClass: 'icon icon-success'
                    // });
                    resolve(res);
                },res=>{
                  if(groupType==2){
                    let msg = ''
                    switch (res.code) {
                      case 4072:msg = "没有团购价!";break;
                      case 4073:msg = "没有这个团购!";break;
                      case 4074:msg = "该团超时啦，看看别的团吧~";break;
                      case 4075:msg = "该团拼满啦，看看别的团吧~";break;
                      case 4076:msg = "开团失败!";break;
                      case 4077:msg = "你已参加过这个团购了!";break;
                      case 4078:msg = "不可以购买自己的商品哟~";break;
                      default: msg = "来晚了呦，商品卖光啦~";
                    }
                    return Toast({
                        message: msg,
                        iconClass: 'icon icon-fail'
                    });
                  }else if(res.code == 4078){
                    return Toast({
                        message: '不可以购买自己的商品哟~',
                        iconClass: 'icon icon-fail'
                    });
                  }else{
                    return Toast({
                        message: '来晚了呦，商品卖光啦~',
                        iconClass: 'icon icon-fail'
                    });
                  }

                });
            })
        },
        queryCartTotal({commit}) {
            $api.get('/oteao/shoppingCart/getCartTotalCount',{sysId:1},res => {
                commit('UPDATETOTAL',res.data);
            },res => {})
        }
    }
}

export default cart;
