<template lang="html">
    <div class="list" ref="scrollDoc">
        <mt-navbar :class="{ 'on': !wxFlag }">
            <mt-tab-item v-for="(item,index) in tabList" :class="{'on': index == selectClass}" @click.native="selTab(index,item)" :key="index">{{ item }}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container>
            <mt-tab-container-item>
                <div class="mt_cell_wrapper" v-if="orderNum != 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="noInfinity" infinite-scroll-distance="10">
                    <mt-cell v-for="(item,index) in orderList" :key="index">
                        <div class="order_head">
                            <div class="order_logo" v-if="item.sellerOrgId == null">
                                <img src="../../assets/images/list_logo.png" />自营
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
                            <template v-for="(pro,count) in item.products">
                                <div class="order_item" :key="count" v-if="pro.premiumEnum === 'NO_PREMIUM'">
                                    <div class="img_item">
                                        <img :src="pro.imageUrl" />
                                    </div>
                                    <div class="text_item">
                                        <p class="text_wrap">{{ pro.productName }}</p>
                                        <div class="count_price_wrap">
                                            <span>￥{{ pro.productPrice  | toFix2  }}</span>
                                            <span>x{{ pro.productNum }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="order_item on" :key="count" v-else>
                                    <div class="img_item">
                                        <img :src="pro.imageUrl" />
                                    </div>
                                    <div class="text_item">
                                        <p class="text_wrap freeP"><span>赠品</span><span>{{ pro.productName }}</span></p>
                                        <div class="count_price_wrap">
                                            <span>￥0.00</span>
                                            <del>￥{{ pro.productPrice | toFix2 }}</del>
                                            <span>x{{ pro.productNum }}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="order_foot">
                            <div class="price_wrapper">
                                <div class="price">订单金额：<span>￥{{ item.orderAllSum | toFix2 }}</span></div>
                                <div class="count">共{{ item.products.length }}件</div>
                            </div>
                            <div class="btn_wrapper">
                                <mt-button plain v-if="!item.isComment && item.orderStatus === 'FINISH'" class="pay_now" @click.native="commentMethod(item)">评价</mt-button>
                                <mt-button plain v-if="item.orderStatus === 'WAIT_PAY' || item.orderStatus === 'WAIT_CHECK'" @click.native="cancelMethod(item)">取消订单</mt-button>
                                <mt-button plain v-if="item.orderStatus === 'WAIT_PAY'" class="pay_now" @click.native="payMethod(item.payId)">立即支付</mt-button>
                                <mt-button plain v-if="(item.orderStatus === 'DELIVERED' || item.orderStatus === 'CBT_BUYER') && (item.sellerOrgId!=null||(item.sellerOrgId==null && !item.subOrderSize))" class="pay_now" @click.native="confrimMethod(item.orderNo)">确认收货</mt-button>
                                <mt-button plain v-if="(item.orderStatus === 'DELIVERED' || item.orderStatus === 'CBT_BUYER') && item.sellerOrgId==null&&item.subOrderSize == 1" class="pay_now" @click.native="confrimMethodsMoreChild(item.subOrderNo,item.orderNo)">确认收货</mt-button>
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
        confirmGoodAll(child,parent) {
            let data = {
                    subOrderNo: child,
                    orderNo: parent
                }
            return new Promise((resolve,reject) => {
                this.$api.post('/oteao/order/subOrderConfimReceipt',data,res => {
                    this.$toast({
                        message: `订单【${child}】已确认收货`,
                        iconClass: 'icon icon-success'
                    });
                    return setTimeout(()=>{
                        location.reload();
                    },200)
                },res=>{
                    this.$toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                    return setTimeout(()=>{
                        location.reload();
                    },200)
                })
            })
        },
        confrimMethodsMoreChild(child,parent) {
            this.$messageBox({
                title:'提示',
                message:`确定确认收货?`,
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonText: '确定'
            }).then(res => {
                if(res === 'cancel') {
                    console.log('cancel!');
                } else {
                    this.confirmGoodAll(child,parent).then(()=>{})
                }
            })
        },
        confrimMethod(orderCode) {
            let data = {
                orderNo: orderCode
            }
            return new Promise((resolve,reject) => {
                this.$api.post('/oteao/order/confimReceipt',data,res => {
                    this.$toast({
                        message: `订单【${orderCode}】已确认收货`,
                        iconClass: 'icon icon-success'
                    });
                    return setTimeout(()=>{
                        location.reload();
                    },200)
                },res=>{
                    this.$toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                    return setTimeout(()=>{
                        location.reload();
                    },200)
                })
            })
        },
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
                        message: `订单取消成功`,
                        iconClass: 'icon icon-success'
                    });
                    this.cancelClass = null;
                    return window.location.reload();
                },res=>{
                    this.cancelClass = null;
                    Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                    return window.location.reload();
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
    mounted () {
       this.wxFlag = this.$tool.isWx;
  　},
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','买家订单');

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
