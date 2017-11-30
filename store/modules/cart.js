import $api from '../../api';
const cart = {
    state:{
        oteaoCart:[],
    },
    mutations:{
        SET_CART_LIST(state,data){
            state.oteaoCart = data;
        }
    },
    actions:{
        queryCart({context,rootState},{device,buyNow}){
            return new Promise((resolve,reject)=>{
                $api.get('/oteao/shoppingCart/query',{
                    device: rootState,
                    buyNow: buyNow || ''
                },res=>{
                    resolve(res);
                });
            })
        }
    }
}

export default cart;