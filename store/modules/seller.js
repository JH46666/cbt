import $api from '../../api'
const state = {
    orderList: {
        null: {},                           // 默认
        waitPay: {},                        // 待付款
        waitSend: {},                       // 待发货
        waitRec: {},                        // 待收货 
        groupping: {}                       // 待成团
    }
}


const mutations = {
    SET_ORDERLIST(state,{type,data}) {
        state.orderList[type] = data;
    }
}

const actions = {
    getSellerOrder({state, commit, rootState},{type,page}) {
        return new Promise((reslove,reject) => {
            $api.post('/oteao/order/preSellerOrderList',{
                orderStatus: type,
                pageNumber: page || 1,
                pageSize: 10,
                device: rootState.device
            },res => {
                reslove(res)
            })
        })
    }
}




export default {
    state,
    mutations,
    actions
}