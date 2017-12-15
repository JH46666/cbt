<template lang="html">
    <div class="list" ref="scrollDoc">
        <mt-navbar :class="{ 'on': !wxFlag }">
            <mt-tab-item v-for="(item,index) in tabList" :class="{'on': index == selectClass}" @click.native="selTab(index,item)" :key="index">{{ item }}</mt-tab-item>
        </mt-navbar>
         <!--  -->
        <mt-tab-container>
            <mt-tab-container-item>
                <div class="mt_cell_wrapper" v-if="orderNum != 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="noInfinity" infinite-scroll-distance="10">
                    <mt-cell v-for="(item,index) in orderList" :key="index">
                        <div class="order_head">
                            <div class="order_logo" v-if="item.sellerOrgId == null">
                                <img :src="shopLogo" />自营
                            </div>
                            <div class="order_icon" v-else>
                                <i class="iconfont">&#xe66d;</i>
                                {{ item.shopName }}
                            </div>
                            <div class="order_status">
                                {{ orderStatus[item.orderStatus] }}
                            </div>
                        </div>
                        <div class="order_content" @click="toListDetail(item.orderNo)">
                            <div class="order_item" v-for="(pro,count) in item.products" :key="count">
                                <div class="img_item">
                                    <img :src="pro.imageUrl" />
                                </div>
                                <div class="text_item">
                                    <p class="text_wrap">{{ pro.productName }}</p>
                                    <div class="count_price_wrap">
                                        <span>￥{{ pro.productPrice }}</span>
                                        <span>x{{ pro.productNum }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order_foot">
                            <div class="price_wrapper">
                                <div class="price">订单金额：<span>￥{{ item.productPaySum  }}</span></div>
                                <div class="count">共{{ item.products.length }}件</div>
                            </div>
                            <div class="btn_wrapper">
                                <!-- <mt-button plain v-if="item.orderStatus === 'WAIT_CHECK' || item.orderStatus === 'PAY_WAIT_AUDIT' || item.orderStatus === 'PACKING' || item.orderStatus === 'DELIVERED' || item.orderStatus === 'CBT_BUYER' || item.orderStatus === 'COMMENT' || item.orderStatus === 'CLOSE'" @click.native="confrimMethod">再次购买</mt-button> -->
                                <mt-button plain v-if="item.isComment === false && item.orderStatus === 'FINISH'" class="pay_now" @click.native="commentMethod(item)">评价</mt-button>
                                <mt-button plain v-if="item.orderStatus === 'WAIT_PAY' || item.orderStatus === 'WAIT_CHECK'" @click.native="cancelMethod(item)">取消订单</mt-button>
                                <mt-button plain v-if="item.orderStatus === 'WAIT_PAY'" class="pay_now" @click.native="payMethod(item.payId)">立即支付</mt-button>
                                <mt-button plain v-if="item.orderStatus === 'DELIVERED' || item.orderStatus === 'CBT_BUYER'" class="pay_now" @click.native="confrimMethod(item.orderNo)">确认收货</mt-button>
                            </div>
                        </div>
                    </mt-cell>
                    <div class="goods-loading" v-if="!noInfinity && orderList.length < orderNum">
                        <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                        <span class="loading-text">正在努力加载中~</span>
                    </div>
                    <div class="no-more" v-if="orderList.length == orderNum">没有更多了呦~</div>
                </div>
                <div class="mt_empty_wrapper" v-if="orderNum == 0">
                    <div class="empty_img">
                        <img src="../../assets/images/empty_list.png" />
                    </div>
                    <p class="empty_text" v-if="selectClass === 0">您还没有订单哟，快去买买买吧~</p>
                    <p class="empty_text" v-if="selectClass != 0">您还没有相关的订单哟~</p>
                    <mt-button plain @click="toIndex">去购物</mt-button>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <mt-popup v-model="closeUp" position="bottom">
            <div class="close-wrap">
                <p class="close-tip"  v-for="(item,index) in cancelList" :class="{on: index == cancelClass}" :key="index" @click="selectCancel(index)">{{ item }}<i class="iconfont">&#xe684;</i></p>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import { Toast,MessageBox } from 'mint-ui';
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            orderList: [],
            shopLogo: '../src_wap/assets/images/list_logo.png',
            wxFlag: false,
            currentNum: 1,
            pageNume: 20,
            device: 'WAP',
            orderNum: 0,
            noInfinity: false,
            tabList: {
                0:'全部',
                1:'待付款',
                2:'待发货',
                3:'待收货',
                4:'待评价'
            },
            selectClass: 0,
            closeUp: false,
            cancelList: ['我不想买了','拍错商品，重新下单','其他原因'],
            cancelClass: null,
            cancelPro: {},
        }
    },
    methods: {
        toListDetail(orderNo) {
            this.$router.push({
                path: '/order/buyerdetail',
                query: {
                    orderNo: orderNo
                }
            });
        },
        selectCancel(index) {
            this.cancelClass = index;
            this.closeUp = false;
            setTimeout(() => {
                let data = {
                    payId: this.cancelPro.payId,
                    cancelReason: this.cancelList[this.cancelList]
                }
                this.$api.post('/oteao/order/cancelOrder',data,res => {
                    Toast({
                        message: `订单【${this.cancelPro.orderNo}】已关闭`,
                        iconClass: 'icon icon-success'
                    });
                    this.cancelClass = null;
                    return window.location.reload();
                },res=>{
                    this.cancelClass = null;
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            },300)
        },
        commentMethod(obj) {
            this.$router.push({
                name: '订单评价',
                query: {
                    orderId: obj.orderId
                }
            })
        },
        cancelMethod(obj) {
            this.closeUp = true;
            this.cancelPro = obj;
        },
        payMethod(payNumber) {
            this.$router.push({
                name: '收银台',
                query: {
                    payId: payNumber,
                    type: 'online'
                }
            })
        },
        confrimMethod(orderNo) {
            let data = {
                orderNo: orderNo
            }
            MessageBox.confirm('确定确认收货?').then(action => {
                this.$api.post('/oteao/order/confimReceipt',data,res => {
                    Toast({
                        message: `订单【${orderNo}】已确认收货`,
                        iconClass: 'icon icon-success'
                    });
                    return window.location.reload();
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            },action => {
                console.log('cancel!');
            });
        },
        toIndex() {
            this.$router.push({
                name: '首页'
            })
        },
        loadMore() {
            try {
                if(this.orderList.length >= this.orderNum) return this.noInfinity = true;
                this.currentNum++;
                this.getList().then((res) =>{
                    let timeData = res.data.order;
                    this.orderList = this.orderList.concat(timeData);
                    this.noInfinity = false;
                })
            } catch (e) {

            }
        },
        selTab(index,item) {
            this.currentNum = 1;
            this.selectClass = index;
            if(index == 0){
                this.$router.replace({
                    name: '订单列表',
                    query: {
                        orderStatus: 'null'
                    }
                })
            }else if(index == 1){
                this.$router.replace({
                    name: '订单列表',
                    query: {
                        orderStatus: 'waitPay'
                    }
                })
            }else if(index == 2){
                this.$router.replace({
                    name: '订单列表',
                    query: {
                        orderStatus: 'waitSend'
                    }
                })
            }else if(index == 3){
                this.$router.replace({
                    name: '订单列表',
                    query: {
                        orderStatus: 'waitRec'
                    }
                })
            }else if(index == 4){
                this.$router.replace({
                    name: '订单列表',
                    query: {
                        orderStatus: 'waitComment'
                    }
                })
            }
            this.$refs.scrollDoc.scrollTop = 0;
            this.getList().then((res) =>{
                this.orderList = res.data.order;
                this.orderNum = res.data.orderNum;
            })
            this.noInfinity = false;
        },
        getList() {
                let status = this.$route.query.orderStatus,
                data = {
                    pageNumber: this.currentNum,
                    pageSize: this.pageNume,
                    device: this.device,
                    orderStatus: status
                };
            if(status === 'waitPay'){
                this.selectClass = 1;
            }else if(status === 'waitSend'){
                this.selectClass = 2;
            }else if(status === 'waitRec'){
                this.selectClass = 3;
            }else if(status === 'waitComment'){
                this.selectClass = 4;
            }else{
                this.selectClass = 0;
            }
            return new Promise((resolve,reject) => {
                this.$api.post('/oteao/order/preOrderList',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        }
    },
    head: {
        title() {
            return {
                inner : '订单列表'
            }
        }
    },
    mounted () {
       this.wxFlag = this.$tool.isWx;
  　},
    created() {
        this.getList().then((res) =>{
            this.orderList = res.data.order;
            this.orderNum = res.data.orderNum;
        })
    },
    computed:{
        ...mapGetters([
            'orderStatus'
        ]),
    }
}
</script>

<style lang="less">
@import '~@/styles/order/list.less';
</style>
