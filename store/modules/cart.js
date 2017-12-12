import $api from '../../api';
import { Toast,Indicator } from 'mint-ui'
const cart = {
    state:{
        cartData:[],
    },
    mutations:{
        SET_CART_LIST(state,data){
            state.cartData = data;
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
        addCart({rootState},{proId,buyNum}){
            return new Promise((resolve,reject)=>{
                $api.post('/oteao/shoppingCart/addBuyNum',{
                    device: rootState.device,
                    proId: proId,
                    buyNum: buyNum
                },res=>{
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
        }
    }
}

export default cart;
