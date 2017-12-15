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
                <div v-else-if="orderDetailData.orderStatus === 'FINISH' && orderDetailData.isComment === false"><img src="../../assets/images/order_1.png" />{{ orderStatus[orderDetailData.orderStatus] }}，待评价</div>
                <!-- 已评价 -->
                <div v-else-if="orderDetailData.orderStatus === 'FINISH' && orderDetailData.isComment === true"><img src="../../assets/images/order_5.png" />{{ orderStatus[orderDetailData.orderStatus] }}，已评价</div>
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
            <!-- <div class="invoice">
                <div class="line_1">
                    <i class="iconfont">&#xe623;</i>
                    <span>增值税发票</span>
                </div>
                <div class="line_2" :class="{ 'on': pullOrDownFlag }">
                    <div class="line_content">
                        <div class="line_item">
                            <span>公司名称</span>
                            <span>厦门北斗七星科技有限公司厦门北斗七星科技有限公司</span>
                        </div>
                        <div class="line_item">
                            <span>公司名称</span>
                            <span>厦门北斗七星科技有限公司</span>
                        </div>
                    </div>
                    <div class="line_btn">
                        <i class="iconfont" @click="pullOrDown" :class="{ 'icon-single-down': !pullOrDownFlag,'icon-shang': pullOrDownFlag }"></i>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="order">
            <!-- 店铺名称 是否自营 -->
            <div class="order_shop" v-if="orderDetailData.sellerOrgId == null">
                <img :src="shopLogo" /> 自营
            </div>
            <div class="order_shop" v-if="orderDetailData.sellerOrgId == 1">
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
                            <div class="list_item" v-for="(item,index) in order.products" :key="index">
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
                        </div>
                        <div class="order_head order_white">
                            <div class="order_express">
                                <img :src="express[order.expressCode]" /> {{ order.expressName }}
                                <span>{{ order.expressNo }}</span>
                            </div>
                            <div class="order_num">
                                <!-- <mt-button plain v-if="order.subOrderStatus === 'FINISH' && order.isComment === false" class="pay_now" @click.native="commentMethod(item.orderId)">评价</mt-button> -->
                                <!-- <mt-button plain v-if="order.subOrderStatus === 'WAIT_PAY' || order.subOrderStatus === 'WAIT_CHECK'" @click.native="cancelMethod">取消订单</mt-button>
                                <mt-button plain v-if="order.subOrderStatus === 'WAIT_PAY'" class="pay_now" @click.native="payMethod">立即支付</mt-button> -->
                                <mt-button plain v-if="order.subOrderStatus === 'DELIVERED' || order.subOrderStatus === 'CBT_BUYER'" class="pay_now" @click.native="confrimMethod(order.subOrderNo)">确认收货</mt-button>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="orderListDetail.subOrder == null && orderListDetail.mainOrder != null">
                    <div class="order_item">
                        <div class="list_wrapper">
                            <div class="list_item" v-for="(item,index) in orderListDetail.mainOrder.products" @click="$router.push({name: '商品详情',query: {proSku: item.proSku}})">
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
                        </div>
                        <div class="order_head"  v-if="orderDetailData.expressDeliveryName != '客户自提'">
                            <div class="order_express">
                                <img :src="express[orderListDetail.mainOrder.expressCode]" /> {{ orderListDetail.mainOrder.expressName }}
                                <span>{{ orderListDetail.mainOrder.expressNo }}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="order_address" v-if="orderDetailData.expressDeliveryName === '客户自提'" :class="{ 'on': pullOrDownShop }">
                <div class="order_address_1">
                    <div class="order_address_num">
                        自提
                    </div>
                    <div class="order_address_icon">
                        <span @click="pullOrDownShopMethod">门店地址<i class="iconfont" :class="{ 'icon-single-down': !pullOrDownShop,'icon-shang': pullOrDownShop }"></i></span>
                    </div>
                </div>
                <div class="order_address_2">
                    <div class="order_addrss_text">
                        {{ orderDetailData.shopAddress }}
                    </div>
                    <div class="order_addrss_tel">
                        联系电话：<a :href="linkShopTel">{{ orderDetailData.shopPhone }}</a>
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
                <div class="price_detail_item">
                    <span>积分抵扣</span>
                    <span v-if="orderDetailData.useJfSum === 0">0积分</span>
                    <span v-else>-{{ orderDetailData.useJfSum }}积分</span>
                </div>
                <div class="price_detail_item">
                    <span>运费</span>
                    <span>{{ orderDetailData.freightSum | toFix2 }}</span>
                </div>
                <div class="price_detail_item">
                    <span>订单总价</span>
                    <span>￥{{ orderDetailData.orderAllSum | toFix2 }}</span>
                </div>
            </div>
            <div class="order_price_total">
                <div class="price_total_item">
                    <span>返积分：{{  orderDetailData.giveJfSum }}分</span>
                    <span>余额支付：￥{{ orderDetailData.useCashSum | toFix2 }}</span>
                </div>
                <div class="price_total_item">
                    <span>{{  orderDetailData.orderSum | toFix2 }}</span>实际付款：
                </div>
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
            <!-- <mt-button plain v-if="status === '待审核' || status === '待评价' || status === '待发货'" @click.native="confrimMethod">再次购买</mt-button> -->
            <mt-button plain v-if="orderDetailData.orderStatus === 'FINISH' && orderDetailData.isComment === false" class="pay_now" @click.native="commentMethod(orderDetailData.orderId)">评价</mt-button>
            <mt-button plain v-if="orderDetailData.orderStatus === 'WAIT_PAY' || orderDetailData.orderStatus === 'WAIT_CHECK'" @click.native="cancelMethod">取消订单</mt-button>
            <mt-button plain v-if="orderDetailData.orderStatus === 'WAIT_PAY'" class="pay_now" @click.native="payMethod(orderDetailData.payId)">立即支付</mt-button>
            <mt-button plain v-if="orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER'" class="pay_now" @click.native="confrimMethod(orderDetailData.orderNo)">确认收货</mt-button>
        </div>
        <!-- 按钮 -->
        <div class="order_btn"  v-if="orderListDetail.subOrder != null && orderListDetail.mainOrder == null">
            <!-- <mt-button plain v-if="status === '待审核' || status === '待评价' || status === '待发货'" @click.native="confrimMethod">再次购买</mt-button> -->
            <!-- <mt-button plain v-if="orderDetailData.orderStatus === 'WAIT_PAY'" class="pay_now" @click.native="payMethod">立即支付</mt-button> -->
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
            shopLogo: '../src_wap/assets/images/list_logo.png',
            isThird: true,
            express: {
                'ship_sf': '../src_wap/assets/images/sfkd.png',
                'ship_sto': '../src_wap/assets/images/stkd.png',
                'ship_ems': '../src_wap/assets/images/emskd.png'
            },
            titleText: '订单详情',
            orderDetailData: {},
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
        getOrderList(orderId) {
            let data = {
                    orderId: orderId,
                    device: 'WAP'
                }
            return new Promise((resolve,reject) => {
                this.$api.post('/oteao/order/orderProductList',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
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
                    cancelReason: this.cancelList[this.cancelList]
                }
                this.$api.post('/oteao/order/cancelOrder',data,res => {
                    Toast({
                        message: `订单【${this.orderDetailData.orderNo}】已关闭`,
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
        confrimMethod(orderNumber) {
            let data = {
                orderNo: orderNumber
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
        regStar(val) {                 // 隐藏会员账号
            if(val == ''){
                val = '';
            }else{
                let valLen = val.length;
                if(valLen <= 5 && valLen > 0){
                    val = val.substr(0,valLen-1) + '*';
                }else{
                    let star = '';
                    for(let i=0; i<valLen-5; i++){
                        star+='*';
                    }
                    val = val.substr(0,3) + star + val.substr(valLen-2,valLen+1);
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
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        }
    },
    created() {
        this.titleText = '订单详情'
        this.$emit('updateHead',this.titleText);
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
