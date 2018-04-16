<template lang="html">
    <div class="list" ref="scrollDoc">
        <mt-navbar :class="{ 'on': !wxFlag }">
            <mt-tab-item v-for="(item,index) in tabList" :class="{'on': index == selectClass}" @click.native="selTab(index,item)" :key="index">
                {{ item }}
            </mt-tab-item>
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
                            <div class="order_status" v-if="item.groupSuccess == 2  && item.orderStatus !== 'CANCEL' && item.orderStatus !== 'CLOSE' && item.orderStatus !== 'WAIT_PAY'">
                                 待成团，差<span style="color: #f08200">{{ item.lessGroup }}</span>人
                                <!-- <div class="left" style="width: rem; display: flex; margin-top: 0.1rem;">
                                    <span class="icon-wrap" style="align-items: center; display: flex;">
                                        <i class="iconfont icon-pintuanshijianzhuangtai" style="color: #424242; font-size: 0.24rem;"></i>
                                    </span>
                                    <div style="margin-left: 0.05rem;color: #999; font-size: 0.22rem;">剩余{{ formateDate(item.lastTime) }}</div>
                                </div> -->
                            </div>
                            <div class="order_status" v-else>
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
                                <!-- 待付款 -->
                                <template v-if="item.orderStatus === 'WAIT_PAY'">
                                    <mt-button plain class="pay_now" @click.native="payMethod(item.payId)">
                                        立即支付
                                    </mt-button>
                                    <mt-button plain @click.native="cancelMethod(item)">
                                        取消订单
                                    </mt-button>
                                </template>
                                <!-- 待审核 -->
                                <template v-if="item.orderStatus === 'WAIT_CHECK'">
                                    <mt-button plain @click.native="cancelMethod(item)">
                                        取消订单
                                    </mt-button>
                                </template>
                                <!-- 支付成功、待审核（未成团） -->
                                <template v-if="item.orderStatus === 'PAY_WAIT_AUDIT' && item.groupSuccess == '2'">
                                    <mt-button plain class="pay_now" @click.native="share(item)">
                                        分享拼团
                                    </mt-button>
                                    <mt-button plain @click.native="cancelMethod(item, 'groupping')">
                                        取消订单
                                    </mt-button>
                                </template>
                                <!-- 支付成功、待审核（已成团） -->
                                <template v-if="item.orderStatus === 'PAY_WAIT_AUDIT' && item.groupSuccess == '1'">
                                    <mt-button plain @click.native="refund(item)">
                                        退款
                                    </mt-button>
                                </template>
                                <!-- 支付成功、待审核（单独购买） -->
                                <template v-if="item.orderStatus === 'PAY_WAIT_AUDIT' && item.groupSuccess == '3'">
                                    <mt-button plain @click.native="refund(item)">
                                        退款
                                    </mt-button>
                                </template>
                                <!-- 打包中（自营） -->
                                <template v-if="!item.shopName && item.orderStatus == 'PACKING'">
                                    <mt-button plain @click.native="refund(item)">
                                        退款
                                    </mt-button>
                                </template>
                                <!-- 打包中（第三方、未成团） -->
                                <template v-if="item.orderStatus === 'PACKING' && item.groupSuccess == '2' && item.shopName">
                                    <mt-button plain class="pay_now" @click.native="share(item)">
                                        分享拼团
                                    </mt-button>
                                    <mt-button plain @click.native="cancelMethod(item, 'groupping')">
                                        取消订单
                                    </mt-button>
                                </template>
                                <!-- 打包中（第三方、已成团） -->
                                <template v-if="item.orderStatus === 'PACKING' && item.groupSuccess == '1' && item.shopName">
                                    <mt-button plain @click.native="refund(item)">
                                        退款
                                    </mt-button>
                                </template>
                                <!-- 打包中（第三方、非团购） -->
                                <template v-if="item.orderStatus === 'PACKING' && item.groupSuccess == '3' && item.sellerOrgId">
                                    <mt-button plain @click.native="refund(item)">
                                        退款
                                    </mt-button>
                                </template>
                                <!-- 己发货 -->
                                <template>
                                    <!-- 第三方 -->
                                    <mt-button plain v-if="(item.orderStatus === 'DELIVERED' || item.orderStatus === 'CBT_BUYER') && (item.sellerOrgId!=null||(item.sellerOrgId==null && !item.subOrderSize))"
                                        class="pay_now" @click.native="confrimMethod(item.orderNo)">
                                        确认收货
                                    </mt-button>
                                    <!-- 自营 -->
                                    <mt-button plain v-if="(item.orderStatus === 'DELIVERED' || item.orderStatus === 'CBT_BUYER') && item.sellerOrgId==null && item.subOrderSize == 1"
                                        class="pay_now" @click.native="confrimMethodsMoreChild(item.orderId,item.orderNo)">
                                        确认收货
                                    </mt-button>
                                    <!-- 拆单的情况下不显示 -->
                                    <!-- <mt-button plain v-if="(item.orderStatus === 'DELIVERED' || item.orderStatus === 'CBT_BUYER') && item.sellerOrgId==null && item.subOrderSize >= 1"
                                        class="pay_now" @click.native="confrimMethodsMoreChild(item.subOrderNo,item.orderNo)">
                                        确认收货
                                    </mt-button> -->
                                    <mt-button plain v-if="(item.orderStatus === 'DELIVERED' || item.orderStatus === 'CBT_BUYER')" @click.native="refund(item)">
                                        退款
                                    </mt-button>
                                </template>
                                <!-- 完成（未评价） -->
                                <template v-if="!item.isComment && item.orderStatus === 'FINISH'">
                                    <mt-button plain class="pay_now" @click.native="commentMethod(item)">
                                        评价
                                    </mt-button>
                                    <mt-button plain @click.native="refund(item)">
                                        退款
                                    </mt-button>
                                </template>
                                <!-- 完成（已评价） -->
                                <template v-if="item.isComment && item.orderStatus === 'FINISH'">
                                    <mt-button plain @click.native="refund(item)">
                                        退款
                                    </mt-button>
                                </template>

                                <!-- <mt-button plain v-if="!item.isComment && item.orderStatus === 'FINISH'" class="pay_now" @click.native="commentMethod(item)">
                                    评价
                                </mt-button>
                                <mt-button plain v-if="item.orderStatus === 'WAIT_PAY' || item.orderStatus === 'WAIT_CHECK'" @click.native="cancelMethod(item)">
                                    取消订单
                                </mt-button>
                                <mt-button plain v-if="item.orderStatus === 'WAIT_PAY'" class="pay_now" @click.native="payMethod(item.payId)">
                                    立即支付
                                </mt-button>
                                <mt-button plain v-if="(item.orderStatus === 'DELIVERED' || item.orderStatus === 'CBT_BUYER') && (item.sellerOrgId!=null||(item.sellerOrgId==null && !item.subOrderSize))"
                                    class="pay_now" @click.native="confrimMethod(item.orderNo)">
                                    确认收货
                                </mt-button>
                                <mt-button plain v-if="(item.orderStatus === 'DELIVERED' || item.orderStatus === 'CBT_BUYER') && item.sellerOrgId==null&&item.subOrderSize == 1"
                                    class="pay_now" @click.native="confrimMethodsMoreChild(item.subOrderNo,item.orderNo)">
                                    确认收货
                                </mt-button> -->
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
        <div class="popup-tips" v-if="popupTipsFlag">
            <div class="tips-position-center cancel-tips-popup" v-if="cancelTipsFlag">
                <div class="tips-box">
                    <div class="tips-title"><h4><b>{{ cancelJsonData['tips-title'] }}</b></h4></div>
                    <div class="tips-text">{{ cancelJsonData['tips-text'] }}</div>
                    <div class="tips-btn" @click="popupTipsFlag = !popupTipsFlag; cancelTipsFlag = !cancelTipsFlag">{{ cancelJsonData['tips-btn'] }}</div>
                </div>
            </div>
             <div class="tips-position-center refund-tips-popup cancel-tips-popup" v-if="refundTipsFlag">
                <div class="tips-box">
                    <div class="tips-title"><h4><b>退款说明</b></h4></div>
                    <div class="tips-text">若您的订单有任何售后问题，请联系{{ isThirdShop }}进行售后处理</div>
                    <div class="tips-btn" @click="popupTipsFlag = !popupTipsFlag; refundTipsFlag = !refundTipsFlag">我知道了</div>
                </div>
            </div>
        </div>
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
            orderNum: 0,                            // 订单总数量
            noInfinity: false,
            tabList: {                              // tab列表
                0: '全部',
                1: '待付款',
                2: '拼团中',
                3: '待发货',
                4: '待收货',
                5: '待评价'
            },
            selectClass: 0,                        // 选中tab
            closeUp: false,
            cancelList: ['我不想买了','拍错商品，重新下单','其他原因'],
            cancelClass: null,
            cancelPro: {},
            timer: {},                            // 定时器
            grouppingLeftTime: {},                // 团购剩余时间
            leftTimeList:[],                      // 团购剩余时间，无格式
            popupTipsFlag: false,                 // 弹窗
            cancelTipsFlag: false,                // 取消订单弹窗
            refundTipsFlag: false,                // 退款弹窗
            isThirdShop: '',                      // 茶帮通或者第三方
            cancelJsonData: {}                    // 取消订单静态块
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
                    },1000)
                },res=>{
                    this.$toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                    return setTimeout(()=>{
                        location.reload();
                    },1000)
                })
            })
        },
        // 自营收货
        confrimMethodsMoreChild(orderId,parent) {
            this.getOrderList(orderId).then((ress)=>{
                let child =  ress.data.subOrder[0].subOrderNo;
                this.$messageBox({
                    title: '提示',
                    message: `确定确认收货?`,
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonText: '确定'
                }).then(res => {
                    if (res === 'cancel') {
                        console.log('cancel!');
                    } else {
                        this.confirmGoodAll(child, parent).then(() => { })
                    }
                })
            })
        },
        // 获取订单商品详情
        getOrderList(orderId) {
            let data = {
                orderId: orderId,
                device: 'WAP'
            }
            return new Promise((resolve, reject) => {
                this.$api.post('/oteao/order/orderProductList', data, res => {
                    resolve(res);
                }, res => {
                    return this.$toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
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
        // 提交评价
        commentMethod(obj) {
            this.$router.push({
                name: '订单评价',
                query: {
                    orderId: obj.orderId
                }
            })
        },
        // 取消订单
        cancelMethod(obj, str) {
            if(str =='groupping'){
                this.popupTipsFlag = true;
                this.cancelTipsFlag = true;
            }
            else{
                this.closeUp = true;
                this.cancelPro = obj;
            }
        },
        // 付款
        payMethod(payNumber) {
            this.$router.push({
                name: '收银台',
                query: {
                    payId: payNumber,
                    type: 'online'
                }
            })
        },
        // 退款
        refund(item) {
            if(item.shopName){
                this.isThirdShop = '卖家';
            }
            else {
                this.isThirdShop = '茶帮通客服';
            }
            this.popupTipsFlag = true;
            this.refundTipsFlag = true;
        },
        // 分享拼团
        share(item) {
            this.$router.push({
                name: '茶帮通拼团',
                query: {
                    orderId: item.orderId,
                    open: true,
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
        // 选择tab
        selTab(index,item) {
            this.currentNum = 1;
            this.selectClass = index;
            if (index == 0) {
                this.$router.replace({
                    name: '订单列表',
                    query: {
                        orderStatus: 'null'
                    }
                })
            } else if (index == 1) {
                this.$router.replace({
                    name: '订单列表',
                    query: {
                        orderStatus: 'waitPay'
                    }
                })
            } else if (index == 2) {
                this.$router.replace({
                    name: '订单列表',
                    query: {
                        orderStatus: 'groupping'
                    }
                })
            } else if (index == 3) {
                this.$router.replace({
                    name: '订单列表',
                    query: {
                        orderStatus: 'waitSend'
                    }
                })
            } else if (index == 4) {
                this.$router.replace({
                    name: '订单列表',
                    query: {
                        orderStatus: 'waitRec'
                    }
                })
            } else if (index == 5) {
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
                // 按订单ID请求团购信息
                // return new Promise((resolve, reject) => {
                    for (let item of this.orderList) {
                        if (item.groupSuccess == 2) {
                            this.$api.post('/oteao/groupPurchase/seachGroupByOrder', { orderId: item.orderId, }, ress => {
                                this.$set(item, 'lastTime', this.sortTime(ress.data.groupPurchase.createTime, ress.data.groupPurchase.systemTime));
                                // resolve();
                                // this.grouppingInfo.push({'item.orderId': res.data.groupPurchase});
                                // this.timer && clearInterval(this.timer);
                                // this.timeOut(this.grouppingInfo.createTime, this.grouppingInfo.systemTime);
                                this.timeOut(item);
                            }, ress => {
                                this.$toast(ress.message)
                            });
                        }
                    }
                // }).then((res)=>{
                    // this.timeOut();
                // });
            })
            this.noInfinity = false;
        },
        // 获取订单列表
        getList() {
            let status = this.$route.query.orderStatus,
                data = {
                    pageNumber: this.currentNum,
                    pageSize: this.pageNume,
                    device: this.device,
                    orderStatus: status
                };
            if (status === 'waitPay') {
                this.selectClass = 1;
            } else if (status === 'groupping') {
                this.selectClass = 2;
            } else if (status === 'waitSend') {
                this.selectClass = 3;
            } else if (status === 'waitRec') {
                this.selectClass = 4;
            } else if (status === 'waitComment') {
                this.selectClass = 5;
            } else {
                this.selectClass = 0;
            }
            return new Promise((resolve, reject) => {
                this.$api.post('/oteao/order/preOrderList', data, res => {
                    resolve(res);
                }, res => {
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            });
        },
        // 计算剩余时间
        sortTime(startTime, systemTime) {
            startTime = startTime.substr(0, 10) + "T" + startTime.substr(11, 8);
            systemTime = systemTime.substr(0, 10) + "T" + systemTime.substr(11, 8)
            const endTime = new Date(startTime);
            const nowTime = new Date(systemTime);
            let leftTime = parseInt((endTime.getTime() - nowTime.getTime())) + 24 * 60 * 60 * 1000
            return leftTime;
        },
        // 格式化时间
        formateDate(time) {
            // console.log(typeof time)
            if(isNaN(time)){
                return '00:00:00.0';
            }
            else{
                let h = this.formate(parseInt(time / (60 * 60 * 1000) % 24));
                let m = this.formate(parseInt(time / (60 * 1000) % 60));
                let s = this.formate(parseInt(time / 1000 % 60));
                let ms = parseInt(time / 100 % 10);
                if (time <= 0) {
                    return '00:00:00.0';
                } else {
                    return h + ':' + m + ':' + s + '.' + ms;
                }
            }
        },
        // 时间补零
        formate(time) {            // 倒计时部分
            if (time >= 10) {
                return time
            } else {
                return `0${time}`
            }
        },
        // 倒计时
        timeOut(item) {
            this.timer[item.orderId] && clearInterval(this.timer[item.orderId]);
            // this.timer.push({
            //     'item.orderId':null
            // });
            this.timer[item.orderId] = setInterval(() => {            // 倒计时
                // for (let item of this.orderList) {
                    if (item.groupSuccess == 2) {
                        item.lastTime = item.lastTime - 100
                        // console.log(item.lastTime);
                    }
                // }
            }, 100)
            // for(let item of this.grouppingInfo){
            //     let orderId = item.orderId;
            //     leftTimeList.push({
            //         orderId: this.sortTime(item.startTime, item.systemTime)
            //     });
            //     this.timer = setInterval(() => {
            //         for (let listItem of this.leftTimeList) {
            //             listItem.orderId = listItem.orderId - 100;
            //             if (listItem.orderId <= 0) {
            //                  this.grouppingLeftTime.push({
            //                     'listItem.orderId': '00:00:00.0'
            //                 })
            //             }
            //             else{
            //                 this.grouppingLeftTime.push({
            //                     'listItem.orderId': this.formateDate(listItem.orderId)
            //                 })
            //             }
            //         }
            //     }, 100);
            // }
        },
    },
    mounted () {
       this.wxFlag = this.$tool.isWx;
    //    this.timeOut();
  　},
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','买家订单');
        // 获取订单列表
        this.getList().then((res) =>{
            this.orderList = res.data.order;
            this.orderNum = res.data.orderNum;
            // 按订单ID请求团购信息
            // return new Promise((resolve, reject) => {
                for (let item of this.orderList) {
                    if (item.groupSuccess == 2) {
                        this.$api.post('/oteao/groupPurchase/seachGroupByOrder', { orderId: item.orderId, }, ress => {
                            this.$set(item, 'lastTime', this.sortTime(ress.data.groupPurchase.createTime, ress.data.groupPurchase.systemTime));
                            // resolve();
                            // this.grouppingInfo.push({'item.orderId': res.data.groupPurchase});
                            // this.timer && clearInterval(this.timer);
                            // this.timeOut(this.grouppingInfo.createTime, this.grouppingInfo.systemTime);
                            this.timeOut(item);
                        }, ress => {
                            this.$toast(ress.message);
                        });
                    }
                }
            // }).then((res)=>{
            //     this.timeOut();
            // });
        })
        // 获取取消订单静态块数据
        this.$store.dispatch('getBlock', 'cancelOrder').then(res => {
            try {
                this.cancelJsonData = JSON.parse(res.data.htmlText);
            } catch (error) {

            }
            // console.log(this.cancelJsonData)
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
    /* 取消订单弹窗 */
    .popup-tips{
        position: fixed;
        top: 0rem;
        z-index: 10;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.67);
        .tips-position-center{
            position: absolute;
            top: 0rem;
            right: 0rem;
            left: 0rem;
            bottom: 0rem;
            margin: auto;
        }
        .cancel-tips-popup{
            width: 5rem;
            height: 4rem;
            color: #000;
            .tips-box{
                background-color: #fff;
                text-align: center;
                border-radius: 0.1rem;
                .tips-title{
                    padding-top: 0.3rem;
                }
                .tips-text{
                    font-size: 0.24rem;
                    color: #666;
                    padding: 0.1rem 0.3rem;
                    border-bottom: 0.02rem #eee solid
                }
                .tips-btn{
                    padding: 0.3rem;
                    color: #f08200;
                }
            }
        }
    }
    .mint-button--normal{
        padding: 0 0.05rem;
    }
</style>
