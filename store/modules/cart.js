import $api from '../../api';
const cart = {
    state:{
        cartList:[],
    },
    mutations:{
        SET_CART_LIST(state,data){
            console.log(data);
            state.cartList = data;
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
        }
    }
}

export default cart;