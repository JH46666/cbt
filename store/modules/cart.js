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
        addCart({dispatch,rootState},{proId,buyNum}){
            return new Promise((resolve,reject)=>{
                $api.post('/oteao/shoppingCart/addBuyNum',{
                    device: rootState.device,
                    proId: proId,
                    buyNum: buyNum
                },res=>{
                    // 更新购物车数量
                    dispatch('queryCartTotal');
                    return Toast({
                        message: res.message,
                        iconClass: 'icon icon-success'
                    });
                },res=>{
                    return Toast({
                        message: res.message,
                        iconClass: 'icon icon-fail'
                    });
                });
            })
        },
        queryCartTotal({commit}) {
            $api.get('/oteao/shoppingCart/getCartTotalCount',{sysId:1},res => {
                commit('UPDATETOTAL',res.data);
            })
        }
    }
}

export default cart;
