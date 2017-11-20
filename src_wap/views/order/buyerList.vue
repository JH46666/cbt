<template lang="html">
    <div class="list">
        <mt-navbar v-model="selected" :class="{ 'on': !wxFlag }">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">待付款</mt-tab-item>
            <mt-tab-item id="3">待发货</mt-tab-item>
            <mt-tab-item id="4">待收货</mt-tab-item>
            <mt-tab-item id="5">待评价</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="mt_cell_wrapper">
                    <mt-cell v-for="(item,index) in orderList" :key="index">
                        <div class="order_head">
                            <div class="order_logo" v-if="!item.shop">
                                <img :src="shopLogo" />自营
                            </div>
                            <div class="order_icon" v-if="item.shop">
                                <i class="iconfont">&#xe66d;</i>
                                {{ item.name }}
                            </div>
                            <div class="order_status">
                                {{ item.orderStatus }}
                            </div>
                        </div>
                        <div class="order_content">
                            <div class="order_item" v-for="(pro,count) in item.goodArray" :key="count">
                                <div class="img_item">
                                    <img :src="pro.goodImg" />
                                </div>
                                <div class="text_item">
                                    <p class="text_wrap">{{ pro.goodText }}</p>
                                    <div class="count_price_wrap">
                                        <span>￥{{ pro.goodPrice }}</span>
                                        <span>x{{ pro.goodCount }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order_foot">
                            <div class="price_wrapper">
                                <div class="price">订单金额：<span>￥{{ item.price  }}</span></div>
                                <div class="count">共{{ item.count }}件</div>
                            </div>
                            <div class="btn_wrapper">
                                <mt-button plain v-if="item.orderStatus === '待审核' || item.orderStatus === '待评价' || item.orderStatus === '待发货'">再次购买</mt-button>
                                <mt-button plain v-if="item.orderStatus === '待评价'">评价</mt-button>
                                <mt-button plain v-if="item.orderStatus === '待付款'">取消订单</mt-button>
                                <mt-button plain v-if="item.orderStatus === '待付款'" class="pay_now">立即支付</mt-button>
                                <mt-button plain v-if="item.orderStatus === '已发货'">确认收货</mt-button>
                            </div>
                        </div>
                    </mt-cell>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <!-- <div class="mt_cell_wrapper">

                </div> -->
                <div class="mt_empty_wrapper">
                    <div class="empty_img">
                        <img src="../../assets/images/empty_list.png" />
                    </div>
                    <p class="empty_text">您还没有订单哟，快去买买买吧~</p>
                    <mt-button plain>去购物</mt-button>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <!-- <div class="mt_cell_wrapper">

                </div> -->
                <div class="mt_empty_wrapper">
                    <div class="empty_img">
                        <img src="../../assets/images/empty_list.png" />
                    </div>
                    <p class="empty_text">您还没有订单哟，快去买买买吧~</p>
                    <mt-button plain>去购物</mt-button>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <!-- <div class="mt_cell_wrapper">

                </div> -->
                <div class="mt_empty_wrapper">
                    <div class="empty_img">
                        <img src="../../assets/images/empty_list.png" />
                    </div>
                    <p class="empty_text">您还没有订单哟，快去买买买吧~</p>
                    <mt-button plain>去购物</mt-button>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="5">
                <!-- <div class="mt_cell_wrapper">

                </div> -->
                <div class="mt_empty_wrapper">
                    <div class="empty_img">
                        <img src="../../assets/images/empty_list.png" />
                    </div>
                    <p class="empty_text">您还没有订单哟，快去买买买吧~</p>
                    <mt-button plain>去购物</mt-button>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: '1',
            orderList: [
                {
                    shop: false,        // 是否第三方
                    name: null,
                    orderStatus: '待审核',
                    goodArray: [
                        {
                            goodImg: '../src_wap/assets/list_img.png',
                            goodText: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                            goodPrice: 500,
                            goodCount: 1
                        },
                        {
                            goodImg: '../src_wap/assets/list_img.png',
                            goodText: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                            goodPrice: 1000,
                            goodCount: 20
                        }
                    ],
                    count: 21,
                    price: 20500
                },
                {
                    shop: true,        // 是否第三方
                    name: '不知道什么店铺',
                    orderStatus: '待付款',
                    goodArray: [
                        {
                            goodImg: '../src_wap/assets/list_img.png',
                            goodText: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                            goodPrice: 500,
                            goodCount: 1
                        },
                        {
                            goodImg: '../src_wap/assets/list_img.png',
                            goodText: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                            goodPrice: 1000,
                            goodCount: 20
                        }
                    ],
                    count: 21,
                    price: 20500
                },
                {
                    shop: true,        // 是否第三方
                    name: '不知道什么店铺',
                    orderStatus: '待评价',
                    goodArray: [
                        {
                            goodImg: '../src_wap/assets/list_img.png',
                            goodText: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                            goodPrice: 500,
                            goodCount: 1
                        },
                        {
                            goodImg: '../src_wap/assets/list_img.png',
                            goodText: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                            goodPrice: 1000,
                            goodCount: 20
                        }
                    ],
                    count: 21,
                    price: 20500
                },
                {
                    shop: true,        // 是否第三方
                    name: '不知道什么店铺',
                    orderStatus: '已发货',
                    goodArray: [
                        {
                            goodImg: '../src_wap/assets/list_img.png',
                            goodText: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                            goodPrice: 500,
                            goodCount: 1
                        },
                        {
                            goodImg: '../src_wap/assets/list_img.png',
                            goodText: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                            goodPrice: 1000,
                            goodCount: 20
                        }
                    ],
                    count: 21,
                    price: 20500
                }
            ],
            shopLogo: '../src_wap/assets/images/list_logo.png',
            wxFlag: false,
        }
    },
    mounted () {
       this.wxFlag = this.$tool.isWx;
  　}
}
</script>

<style lang="less">
@import '~@/styles/order/list.less';
</style>
