<template lang="html">
    <div class="detail">
        <div class="detail_type">
            <div class="type">
                <!-- 待发货 -->
                <div v-if="orderDetailData.orderStatus === 'PACKING'"><img src="../../assets/images/order_3.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 待收货 -->
                <div v-else-if="orderDetailData.orderStatus === 'DELIVERED'"><img src="../../assets/images/order_2.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 待付款 -->
                <div v-else-if="orderDetailData.orderStatus === 'WAIT_PAY'"><img src="../../assets/images/order_4.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 已评价 -->
                <div v-else-if="orderDetailData.orderStatus === 'FINISH'"><img src="../../assets/images/order_1.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 已评价 -->
                <!-- 其他 -->
                <div v-else><img src="../../assets/images/order_6.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
            </div>
            <div class="number">
                订单编号：{{ orderDetailData.orderNo }}
            </div>
        </div>
        <div class="detail_address">
            <div class="address">
                <div class="line_1">
                    <i class="iconfont">&#xe670;</i>
                    <span>{{ orderDetailData.receiptName }}</span>
                    <template v-if="orderDetailData.receiptPhone">
                        <span>{{ regStar(orderDetailData.receiptPhone) }}</span>
                    </template>
                </div>
                <div class="line_2">{{ orderDetailData.detailAddress }}</div>
            </div>
        </div>
        <div class="order">
            <!-- 店铺名称 是否自营 -->
            <div class="order_shop" v-if="orderDetailData.sellerOrgId == null">
                <img src="../../assets/images/list_logo.png" /> 自营
            </div>
            <div class="order_shop" v-else>
                <i class="iconfont">&#xe66d;</i> {{ orderDetailData.shopName }}
            </div>
            <!-- 订单列表 -->
            <div class="order_wrapper">
                <template v-if="orderListDetail.subOrder!=null && orderListDetail.mainOrder == null">
                    <div class="order_item" v-for="(order,num) in orderListDetail.subOrder" :key="num">
                        <div class="order_state">
                            <span>{{ orderStatus[order.subOrderStatus] }}</span>
                            <span>{{ order.subOrderNo }}</span>
                        </div>
                        <div class="list_wrapper">
                            <template v-for="(item,index) in order.products">
                                <div class="list_item" :key="index"  @click="$router.push({name: '商品详情',query: {proSku: item.proSku}})"  v-if="item.premiumEnum === 'NO_PREMIUM'">
                                    <div class="list_img">
                                        <img :src="item.imageUrl" />
                                    </div>
                                    <div class="list_content">
                                        <p>{{ item.productName }}</p>
                                        <div class="list_price_count">
                                            <span>￥{{ item.productPrice | toFix2 }}</span>
                                            <span>x{{ item.productNum | toFix2 }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="list_item on" :key="index" @click="$router.push({name: '商品详情',query: {proSku: item.proSku}})" v-else>
                                    <div class="list_img">
                                        <img :src="item.imageUrl" />
                                    </div>
                                    <div class="list_content">
                                        <p class="freeP"><span>赠品</span><span>{{ item.productName }}</span></p>
                                        <div class="list_price_count">
                                            <span>￥0.00</span>
                                            <del>￥{{ item.productPrice | toFix2 }}</del>
                                            <span>x{{ item.productNum | toFix2 }}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </div>
                        <div class="order_head order_white" :class="{right_btn: order.expressCode === 'get_self'}">
                            <div class="order_express" v-if="order.expressCode != 'get_self'">
                                <img src="../../assets/images/sfkd.png" v-if="order.expressCode == 'ship_sf' || order.expressCode == 'SF'" />
                                <img src="../../assets/images/stkd.png" v-if="order.expressCode == 'ship_sto' || order.expressCode == 'STO'" />
                                <img src="../../assets/images/emskd.png" v-if="order.expressCode == 'ship_ems' || order.expressCode == 'EMS'" /> {{ order.expressName }}
                                <span>{{ order.expressNo }}</span>
                            </div>
                            <div class="order_num">
                                <mt-button plain v-if="order.subOrderStatus === 'DELIVERED' || order.subOrderStatus === 'CBT_BUYER'" class="pay_now" @click.native="confrimMethodsMoreChild(order.subOrderNo,orderDetailData.orderNo)">确认收货</mt-button>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="orderListDetail.subOrder == null && orderListDetail.mainOrder != null">
                    <div class="order_item">
                        <div class="list_wrapper">
                            <template v-for="(item,index) in orderListDetail.mainOrder.products">
                                <div class="list_item" :key="index" @click="$router.push({name: '商品详情',query: {proSku: item.proSku}})" v-if="item.premiumEnum === 'NO_PREMIUM'">
                                    <div class="list_img">
                                        <img :src="item.imageUrl" />
                                    </div>
                                    <div class="list_content">
                                        <p>{{ item.productName }}</p>
                                        <div class="list_price_count">
                                            <span>￥{{ item.productPrice | toFix2 }}</span>
                                            <span>x{{ item.productNum | toFix2 }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="list_item on" :key="index" @click="$router.push({name: '商品详情',query: {proSku: item.proSku}})" v-else>
                                    <div class="list_img">
                                        <img :src="item.imageUrl" />
                                    </div>
                                    <div class="list_content">
                                        <p class="freeP"><span>赠品</span><span>{{ item.productName }}</span></p>
                                        <div class="list_price_count">
                                            <span>￥0.00</span>
                                            <del>￥{{ item.productPrice | toFix2 }}</del>
                                            <span>x{{ item.productNum | toFix2 }}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </div>
                        <div class="order_head"  v-if="orderDetailData.expressDeliveryCode != 'get_self'">
                            <div class="order_express" v-if="orderDetailData.payType!='CASH_DELIVERY'">
                                <img src="../../assets/images/sfkd.png" v-if="orderDetailData.expressDeliveryCode == 'ship_sf' || orderDetailData.expressDeliveryCode == 'SF'" />
                                <img src="../../assets/images/stkd.png" v-if="orderDetailData.expressDeliveryCode == 'ship_sto' || orderDetailData.expressDeliveryCode == 'STO'" />
                                <img src="../../assets/images/emskd.png" v-if="orderDetailData.expressDeliveryCode == 'ship_ems' || orderDetailData.expressDeliveryCode == 'EMS'" /> {{ orderDetailData.expressDeliveryName }}
                                <span>{{ orderDetailData.expressNo }}</span>
                            </div>
                            <div class="order_express" v-else>
                                <img src="../../assets/images/sfkd.png" v-if="orderDetailData.expressDeliveryCode == 'ship_sf' || orderDetailData.expressDeliveryCode == 'SF'" />
                                <img src="../../assets/images/stkd.png" v-if="orderDetailData.expressDeliveryCode == 'ship_sto' || orderDetailData.expressDeliveryCode == 'STO'" />
                                <img src="../../assets/images/emskd.png" v-if="orderDetailData.expressDeliveryCode == 'ship_ems' || orderDetailData.expressDeliveryCode == 'EMS'" /> {{ orderDetailData.expressDeliveryName }}-货到付款
                                <span>{{ orderDetailData.expressNo }}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="order_address" v-if="orderDetailData.expressDeliveryCode === 'get_self'" :class="{ 'on': !pullOrDownShop }">
                <div class="order_address_1">
                    <div class="order_address_num">
                        自提
                    </div>
                    <div class="order_address_icon">
                        <span @click="pullOrDownShopMethod">门店地址<i class="iconfont" :class="{ 'icon-single-down': pullOrDownShop,'icon-shang': !pullOrDownShop }"></i></span>
                    </div>
                </div>
                <div class="order_address_2">
                    <div class="order_addrss_text">
                        提货地址：{{ orderDetailData.shopAddress }}
                    </div>
                    <div class="order_addrss_tel">
                        联系电话：<a :href="linkShopTel">{{ orderDetailData.businessTelephone }}</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 价格总 -->
        <div class="order_price">
            <div class="order_price_detail">
                <div class="price_detail_item">
                    <span>商品总价</span>
                    <span>￥{{ orderDetailData.productPaySum | toFix2 }}</span>
                </div>
                <div class="price_detail_item" v-if="orderDetailData.redPacketName">
                    <span>红包抵扣</span>
                    <span v-if="orderDetailData.redPacketSum === 0">￥0</span>
                    <span v-else>-￥{{ orderDetailData.redPacketSum | toFix2 }}</span>
                </div>
                <template v-if="orderDetailData.fullCut.length>0">
                    <div class="price_detail_item" v-for="(rule,index) in orderDetailData.fullCut" :key="index">
                        <span>{{ rule.showName }}</span>
                        <span>-￥{{ rule.giveNum | toFix2 }}</span>
                    </div>
                </template>
                <div class="price_detail_item" v-if="orderDetailData.internalDiscountSum">
                    <span>内部优惠</span>
                    <span v-if="Number(orderDetailData.internalDiscountSum)>0">-￥{{ orderDetailData.internalDiscountSum | toFix2 }}</span>
                    <span v-else>￥{{ orderDetailData.internalDiscountSum | toFix2 }}</span>
                </div>
                <div class="price_detail_item">
                    <span>运费</span>
                    <span>￥{{ orderDetailData.freightSum | toFix2 }}</span>
                </div>
                <div class="price_detail_item">
                    <span>订单总价</span>
                    <span>￥{{ orderDetailData.orderAllSum | toFix2 }}</span>
                </div>
            </div>
            <div class="order_price_total">
                <div class="price_total_item">
                    <span>返积分：{{  orderDetailData.giveJfSum }}分</span>
                    <span>余额支付：￥{{ orderDetailData.useStoreValue | toFix2 }}</span>
                </div>
                <template v-if="orderDetailData.payType!='CASH_DELIVERY'">
                    <div class="price_total_item">
                        <span>{{  orderDetailData.orderSum | toFix2 }}</span>实际付款：
                    </div>
                </template>
                <template v-else>
                    <div class="price_total_item" v-if="orderDetailData.orderStatus === 'FINISH'">
                        <span>￥{{  orderDetailData.orderSum | toFix2 }}</span>实际付款：
                    </div>
                    <div class="price_total_item"  v-else>
                        <span>￥{{  orderDetailData.orderSum | toFix2 }}</span>待付款：
                    </div>
                </template>
            </div>
        </div>
        <!-- 下单时间 -->
        <div class="order_date">
            <div class="order_date_item" v-if="orderDetailData.createTime">
                <span>下单时间</span>
                <span>{{ orderDetailData.createTime }}</span>
            </div>
            <div class="order_date_item" v-if="orderDetailData.payTime">
                <span>付款时间</span>
                <span>{{ orderDetailData.payTime }}</span>
            </div>
            <div class="order_date_item" v-if="orderDetailData.sendTime">
                <span>发货时间</span>
                <span>{{ orderDetailData.sendTime }}</span>
            </div>
            <div class="order_date_item" v-if="orderDetailData.recTime">
                <span>收货时间</span>
                <span>{{ orderDetailData.recTime }}</span>
            </div>
            <div class="order_date_item" v-if="orderDetailData.commentTime">
                <span>评价时间</span>
                <span>{{ orderDetailData.commentTime }}</span>
            </div>
            <div class="order_date_item" v-if="orderDetailData.orderCloseTime || orderDetailData.cancelTime">
                <span>取消时间</span>
                <span>{{ orderDetailData.orderCloseTime }}{{ orderDetailData.cancelTime }}</span>
            </div>
        </div>
        <!-- 按钮 -->
        <div class="order_btn"  v-if="orderListDetail.mainOrder != null && orderListDetail.subOrder == null">
            <mt-button plain v-if="orderDetailData.orderStatus === 'FINISH' && orderDetailData.isComment === false" class="pay_now" @click.native="commentMethod(orderDetailData.orderId)">评价</mt-button>
            <mt-button plain v-if="orderDetailData.orderStatus === 'WAIT_PAY' || orderDetailData.orderStatus === 'WAIT_CHECK'" @click.native="cancelMethod">取消订单</mt-button>
            <mt-button plain v-if="orderDetailData.orderStatus === 'WAIT_PAY'" class="pay_now" @click.native="payMethod(orderDetailData.payId)">立即支付</mt-button>
            <mt-button plain v-if="orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER'" class="pay_now" @click.native="confrimMethod(orderDetailData.orderNo)">确认收货</mt-button>
        </div>
        <!-- 按钮 -->
        <div class="order_btn"  v-if="orderListDetail.subOrder != null && orderListDetail.mainOrder == null">
            <mt-button plain v-if="orderDetailData.orderStatus === 'FINISH' && orderDetailData.isComment === false" class="pay_now" @click.native="commentMethod(orderDetailData.orderId)">评价</mt-button>
        </div>
        <mt-popup v-model="closeUp" position="bottom">
            <div class="close-wrap">
                <p class="close-tip"  v-for="(item,index) in cancelList" :class="{on: index == cancelClass}" :key="index" @click="selectCancel(index)">{{ item }}<i class="iconfont">&#xe684;</i></p>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import { MessageBox,Toast } from 'mint-ui';
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            pullOrDownFlag: false,
            pullOrDownShop: false,
            isThird: true,
            titleText: '订单详情',
            orderDetailData: {
                fullCut: []
            },
            closeUp: false,
            cancelList: ['我不想买了','拍错商品，重新下单','其他原因'],
            cancelClass: null,
            orderListDetail: {
                mainOrder: {},
                freeRuleMap: {},
                subOrder: null,
                freeProducts: []
            },
        }
    },
    head: {
        title() {
            return {
                inner : this.titleText
            }
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
        getOrderList(orderId) {
            let data = {
                    orderId: orderId,
                    device: 'WAP'
                }
            return new Promise((resolve,reject) => {
                this.$api.post('/oteao/order/orderProductList',data,res => {
                    resolve(res);
                },res=>{
                    return this.$toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        commentMethod(orderId) {
            this.$router.push({
                name: '订单评价',
                query: {
                    orderId: orderId
                }
            })
        },
        selectCancel(index) {
            this.cancelClass = index;
            this.closeUp = false;
            setTimeout(() => {
                let data = {
                    payId: this.orderDetailData.payId,
                    cancelReason: this.cancelList[this.cancelClass]
                }
                this.$api.post('/oteao/order/cancelOrder',data,res => {
                    this.$toast({
                        message: `订单已取消`,
                        iconClass: 'icon icon-success'
                    });
                    this.cancelClass = null;
                    return window.location.reload();
                },res=>{
                    this.cancelClass = null;
                    this.$toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                    return window.location.reload();
                })
            },300)
        },
        cancelMethod() {
            this.closeUp = true;
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
        pullOrDown() {
            this.pullOrDownFlag = !this.pullOrDownFlag;
        },
        pullOrDownShopMethod() {
            this.pullOrDownShop = !this.pullOrDownShop;
        },
        confimeGood(orderCode) {
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
        confrimMethod(orderNumber) {
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
                    this.confimeGood(orderNumber).then(()=>{

                    })
                }
            })
        },
        regStar(val) {                 // 隐藏会员账号
            if(val == ''){
                val = '';
            }else{
                let valLen = val.length;
                if(valLen <= 5 && valLen > 0){
                    val = val.substr(0,valLen-1) + '*';
                }else{
                    let star = '';
                    for(let i=0; i<valLen-7; i++){
                        star+='*';
                    }
                    val = val.substr(0,3) + star + val.substr(valLen-4,valLen+1);
                }
            }
            return val;
        },
        getListDetail() {
            let orderNo = this.$route.query.orderNo,
                data = {
                    orderNo: orderNo
                }
            return new Promise((resolve,reject) => {
                this.$api.post('/oteao/order/findOrderByNo',data,res => {
                    resolve(res);
                },res=>{
                    return this.$toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        }
    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','订单详情');

        this.getListDetail().then((res) =>{
            this.orderDetailData = res.data;
            // this.proAllSum = this.$tool.math.eval(`${this.orderDetailData..orderSum} - ${this.orderDetailData..freightSum}`);
            this.getOrderList(this.orderDetailData.orderId).then((res) =>{
                this.orderListDetail = res.data;
            });
        })
    },
    mounted() {

    },
    computed:{
        ...mapGetters([
            'orderStatus'
        ]),
        linkShopTel() {
            return `tel//${this.orderDetailData.shopPhone}`;
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/order/detail.less';
</style>
