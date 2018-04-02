const order = {
    state: {
        status:{
            'WAIT_PAY': '待付款',
            'WAIT_CHECK': '待审核',
            'DEALING': '处理中',
            'PACKING': '打包中',
            'DELIVERED': '已发货',
            'SALLER_CBT': '发往验货',
            'SUB_REC': '已入库(茶帮通已收货)',
            'CHECK_OK': '验货通过(茶帮通已验货)',
            'CHECK_BAD': '验货不通过(茶帮通已验货)',
            'CBT_BUYER': '已发货(茶帮通发往买家)',
            'FINISH': '订单完成',
            'CLOSE': '订单关闭',
            'CANCEL': '订单取消',
            'PAY_WAIT_AUDIT': '支付成功，待审核',
            'COMMENT': '待评价'
        }
    },
    mutations: {

    },
    actions: {

    }
}
export default order
