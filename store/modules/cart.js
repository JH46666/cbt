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
                    return Toast({
                        message: res.message,
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
