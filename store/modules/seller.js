import $api from '../../api'
const state = {
    orderList: {
        null: {},
        waitPay: {},
        waitSend: {},
        waitRec: {}
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