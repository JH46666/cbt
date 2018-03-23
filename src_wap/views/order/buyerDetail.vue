<template lang="html">
    <div class="detail">
        <div class="detail_type" :class="{'height2': orderDetailData.groupSuccess === 2}">
            <div class="type" :class="{'width100': orderDetailData.groupSuccess === 2}">
                <!-- 拼团中 -->
                <div v-if="orderDetailData.groupSuccess === 2" class="groupping">
                    <div style="position: relative;">
                        <div><img src="../../assets/images/cbt_icddxqpt.png" />
                        拼团中,还差<span style="color: #f08200">{{ grouppingInfo.groupNumber - grouppingInfo.offerNumber }}</span>人
                    </div>
                    <div class="countdown">
                        <i class="iconfont icon-pintuanshijianzhuangtai" style="font-size: 0.24rem; margin-top: -0.03rem;"></i>
                        <div class="countdown-text">{{ grouppingLeftTime ? grouppingLeftTime : "00:00:00.0" }}后结束</div>
                    </div>
                    </div>
                    <div class="groupping-member-info">
                        <div class="groupping-member-icon" v-for="(item, index) in grouppingMemberInfo" :key=index>   
                            <img src="../../assets/images/cbt_icwctportrait.png" alt="">
                            <img src="../../assets/images/p.gif" alt="">
                            <!-- <img :src=item.memberFace alt=""> -->
                            <div class="master-face">
                                团长
                            </div>
                        </div>
                        <div class="groupping-member-icon" v-for="(item, index) in grouppingMemberInfo" :key=index>
                            <img src="../../assets/images/cbt_icwctportrait.png" alt="" v-if="!(grouppingMemberInfo.length > 2)">
                            <img src="../../assets/images/cbt_icwctportrait.png" alt="" v-if="!(grouppingMemberInfo.length > 1) ">
                        </div>
                    </div>
                </div>
                <!-- 待发货 -->
                <div v-if="orderDetailData.orderStatus === 'PACKING' && orderDetailData.groupSuccess != 2"><img src="../../assets/images/order_3.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 待收货 -->
                <div v-else-if="orderDetailData.orderStatus === 'DELIVERED'"><img src="../../assets/images/order_2.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 待付款 -->
                <div v-else-if="orderDetailData.orderStatus === 'WAIT_PAY'"><img src="../../assets/images/order_4.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 已评价 -->
                <div v-else-if="orderDetailData.orderStatus === 'FINISH'"><img src="../../assets/images/order_1.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 取消 -->
                <div v-else-if="orderDetailData.orderStatus === 'CANCEL'"><img src="../../assets/images/order_6.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
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
            <div class="number order_date_item" style="align-items: center;">
                订单编号：{{ orderDetailData.orderNo }}
                <div style="border: solid 0.02rem #999999; border-radius: 0.05rem; font-size: 0.26rem; padding: 0.12rem 0.25rem;">复制</div>
            </div>
            <div class="order_date_item" v-if="orderDetailData.createTime">
                <span>下单时间：</span>
                <span>{{ orderDetailData.createTime }}</span>
            </div>
            <div class="order_date_item" v-if="orderDetailData.payTime">
                <span>付款时间：</span>
                <span>{{ orderDetailData.payTime }}</span>
            </div>
            <div class="order_date_item" v-if="orderDetailData.sendTime">
                <span>发货时间：</span>
                <span>{{ orderDetailData.sendTime }}</span>
            </div>
            <div class="order_date_item" v-if="orderDetailData.recTime">
                <span>收货时间：</span>
                <span>{{ orderDetailData.recTime }}</span>
            </div>
            <div class="order_date_item" v-if="orderDetailData.commentTime">
                <span>评价时间：</span>
                <span>{{ orderDetailData.commentTime }}</span>
            </div>
            <div class="order_date_item" v-if="orderDetailData.orderCloseTime || orderDetailData.cancelTime">
                <span>取消时间：</span>
                <span>{{ orderDetailData.orderCloseTime }}{{ orderDetailData.cancelTime }}</span>
            </div>
        </div>
        <!-- 底部按钮 -->
        <div class="order_btn"  v-if="orderListDetail.mainOrder != null && orderListDetail.subOrder == null">
            <!-- 待付款 -->
            <template v-if="orderDetailData.orderStatus === 'WAIT_PAY'">
                <mt-button plain class="pay_now" @click.native="payMethod(orderDetailData.payId)">
                    立即支付
                </mt-button>
                <mt-button plain @click.native="cancelMethod(orderDetailData)">
                    取消订单
                </mt-button>
            </template>
            <!-- 待审核 -->
            <template v-if="orderDetailData.orderStatus === 'WAIT_CHECK'">
                <mt-button plain @click.native="cancelMethod(orderDetailData)">
                    取消订单
                </mt-button>
            </template>
            <!-- 支付成功、待审核（未成团） -->
            <template v-if="orderDetailData.orderStatus === 'PAY_WAIT_AUDIT' && orderDetailData.groupSuccess == '2'">
                <mt-button plain class="pay_now" @click.native="share(orderDetailData)">
                    分享拼团
                </mt-button>
                <mt-button plain @click.native="cancelMethod(orderDetailData, 'groupping')">
                    取消订单
                </mt-button>
            </template>
            <!-- 支付成功、待审核（已成团） -->
            <template v-if="orderDetailData.orderStatus === 'PAY_WAIT_AUDIT' && orderDetailData.groupSuccess == '1'">
                <mt-button plain @click.native="refund(orderDetailData)">
                    退款
                </mt-button>
            </template>
            <!-- 打包中（自营） -->
            <template v-if="!orderDetailData.shopName && orderDetailData.orderStatus == 'PACKING'">
                <mt-button plain @click.native="refund(orderDetailData)">
                    退款
                </mt-button>
            </template>
            <!-- 打包中（第三方、未成团） -->
            <template v-if="orderDetailData.orderStatus === 'PACKING' && orderDetailData.groupSuccess == '2' && orderDetailData.shopName">
                <mt-button plain class="pay_now" @click.native="share(orderDetailData)">
                    分享拼团
                </mt-button>
                <mt-button plain @click.native="cancelMethod(orderDetailData, 'groupping')">
                    取消订单
                </mt-button>
            </template>
            <!-- 打包中（第三方、已成团） -->
            <template v-if="orderDetailData.orderStatus === 'PACKING' && orderDetailData.groupSuccess == '1' && orderDetailData.shopName">
                <mt-button plain @click.native="refund(orderDetailData)">
                    退款
                </mt-button>
            </template>
            <!-- 己发货 -->
            <template>
                <mt-button plain v-if="(orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER') && (orderDetailData.sellerOrgId!=null||(orderDetailData.sellerOrgId==null && !orderDetailData.subOrderSize))"
                    class="pay_now" @click.native="confrimMethod(orderDetailData.orderNo)">
                    确认收货
                </mt-button>
                <mt-button plain v-if="(orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER') && orderDetailData.sellerOrgId==null && orderDetailData.subOrderSize == 1"
                    class="pay_now" @click.native="confrimMethodsMoreChild(orderDetailData.subOrderNo,orderDetailData.orderNo)">
                    确认收货
                </mt-button>
            </template>
            <!-- 完成（未评价） -->
            <template v-if="!orderDetailData.isComment && orderDetailData.orderStatus === 'FINISH'">
                <mt-button plain class="pay_now" @click.native="commentMethod(orderDetailData.orderId)">
                    评价
                </mt-button>
                <mt-button plain @click.native="refund(orderDetailData)">
                    退款
                </mt-button>
            </template>
            <!-- 完成（已评价） -->
            <template v-if="orderDetailData.isComment && orderDetailData.orderStatus === 'FINISH'">
                <mt-button plain @click.native="refund(orderDetailData)">
                    退款
                </mt-button>
            </template>
        </div>



        <!-- 按钮 -->
        <!-- <div class="order_btn"  v-if="orderListDetail.mainOrder != null && orderListDetail.subOrder == null">
            <mt-button plain v-if="orderDetailData.orderStatus === 'FINISH' && orderDetailData.isComment === false" class="pay_now" @click.native="commentMethod(orderDetailData.orderId)">评价</mt-button>
            <mt-button plain v-if="orderDetailData.orderStatus === 'WAIT_PAY' || orderDetailData.orderStatus === 'WAIT_CHECK'" @click.native="cancelMethod">取消订单</mt-button>
            <mt-button plain v-if="orderDetailData.orderStatus === 'WAIT_PAY'" class="pay_now" @click.native="payMethod(orderDetailData.payId)">立即支付</mt-button>
            <mt-button plain v-if="orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER'" class="pay_now" @click.native="confrimMethod(orderDetailData.orderNo)">确认收货</mt-button>
        </div> -->
        <!-- 按钮 -->
        <!-- <div class="order_btn"  v-if="orderListDetail.subOrder != null && orderListDetail.mainOrder == null">
            <mt-button plain v-if="orderDetailData.orderStatus === 'FINISH' && orderDetailData.isComment === false" class="pay_now" @click.native="commentMethod(orderDetailData.orderId)">评价</mt-button>
        </div> -->
        <!-- 取消理由弹窗 -->
        <mt-popup v-model="closeUp" position="bottom">
            <div class="close-wrap">
                <p class="close-tip"  v-for="(item,index) in cancelList" :class="{on: index == cancelClass}" :key="index" @click="selectCancel(index)">{{ item }}<i class="iconfont">&#xe684;</i></p>
            </div>
        </mt-popup>
        <div class="popup-tips" v-if="popupTipsFlag">
            <div class="cancel-tips-popup">
                <div class="tips-box">
                    <div class="tips-title"><h4><b>暂时无法取消订单</b></h4></div>
                    <div class="tips-text">发起拼团24小时后，若未拼团成功将自动取消订单并退款哦</div>
                    <div class="tips-btn" @click="popupTipsFlag = !popupTipsFlag">我知道了</div>
                </div>
            </div>
            <div class="refund-tips-popup">
                <div class="tips-box">
                    <div class="tips-title"><h4><b>暂时无法取消订单</b></h4></div>
                    <div class="tips-text">发起拼团24小时后，若未拼团成功将自动取消订单并退款哦</div>
                    <div class="tips-btn" @click="popupTipsFlag = !popupTipsFlag">我知道了</div>
                </div>
            </div>
        </div>
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
            grouppingInfo: {},                          // 团购信息
            grouppingMemberInfo: [],                    // 团购成员信息
            grouppingLeftTime: '',                      // 团购剩余时间
            popupTipsFlag: false,                       // 弹窗
            refundPopupFlag: false,                     // 退款弹窗
            cancelTipsFlag: false,                      // 取消订单弹窗
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
        // 获取订单商品详情
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
        cancelMethod(obj, str) {
           if(str =="groupping"){
                this.popupTipsFlag = true;
            }
            else{
                this.closeUp = true;
                this.cancelPro = obj;
            }
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
        },
        // 计算剩余时间
        sortTime(startTime, systemTime) {
            const endTime = new Date(startTime);
            const nowTime = new Date(systemTime);
            let leftTime = parseInt((endTime.getTime() - nowTime.getTime())) + 24 * 60 * 60 * 1000;
            return leftTime;
        },
        // 格式化时间
        formateDate(time) {
            let h = this.formate(parseInt(time / (60 * 60 * 1000) % 24));
            let m = this.formate(parseInt(time / (60 * 1000) % 60));
            let s = this.formate(parseInt(time / 1000 % 60));
            let ms = (parseInt(time / 100 % 10));
            if (time <= 0) {
                return '00:00:00.0';
            } else {
                return h + ':' + m + ':' + s + '.' + ms;
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
        timeOut(startTime, systemTime) {
            let leftTime = this.sortTime(startTime, systemTime);
            this.timer = setInterval(() => {
                leftTime = leftTime - 100;
                this.grouppingLeftTime = this.formateDate(leftTime);
            }, 100);
            if (leftTime <= 0) {
                clearInterval(this.timer);
            }
        },
        // 退款
        refund(){
            this.refundPopupFlag = true;
        },
        // 分享拼团
        share(){

        }
    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','订单详情');
        // 获取订单详情
        this.getListDetail().then((res) =>{
            this.orderDetailData = res.data;
            // this.proAllSum = this.$tool.math.eval(`${this.orderDetailData..orderSum} - ${this.orderDetailData..freightSum}`);
            // 进入订单详情后, 按订单ID请求团购信息
            this.$api.post('/oteao/groupPurchase/seachGroupByOrder', { orderId: this.orderDetailData.orderId, }, res => {
                this.grouppingInfo = res.data.groupPurchase;
                this.grouppingMemberInfo = res.data.groupPurchaseDetails;
                this.timer && clearInterval(this.timer);
                this.timeOut(this.grouppingInfo.createTime, this.grouppingInfo.systemTime);
            }, res => {
                this.$toast(res.message)
            });
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
    .height2{
        height: unset!important;
        padding-top: 0.36rem!important;
    }
    .width100{
        width: 100%;
    }
    .groupping{
        display: block!important;
        .countdown{
            width: 2.62rem;
            height: 0.50rem;
            padding: 0.18rem 0rem 0.12rem 0.2rem;
            color: #fe9900; 
            font-size: 0.22rem; 
            position: absolute; 
            right: -0.35rem; 
            background-color: #525150; 
            border-radius: 0.25rem 0rem 0rem 0.25rem;
            display: flex;
            font-size: 0.24rem;
            .countdown-text{
                margin-left: 0.07rem;
                color: #fff;
                line-height: 0.34rem;
            }
        }
        .groupping-member-info{
            margin-top: 0.3rem;
            flex-wrap: wrap;
            padding-bottom: 0.3rem;
            .groupping-member-icon{
                position: relative;
                width: 1.00rem;
                height: 1.00rem;
                margin-right: 0.30rem;
                img{
                    width: 1.00rem!important;
                    height: 1.00rem!important;
                    &:nth-child(2){
                        border-radius: 50%;
                        position: absolute;
                        left: 0rem;
                    }
                }
                .master-face{
                    font-size: 0.24rem!important;
                    /* width: 0.48rem; */
                    /* height: 0.26rem; */
                    padding: 0.03rem;
                    text-align: center;
                    background-color: #fe9900;
                    border-radius: 0.12rem;
                    border: solid 0.02rem #ffffff;
                    position: absolute;
                    right: -0.25rem;
                    top: 0rem;
                    color: #fff;
                }
            }
        }
    }
    .btn_wrapper{
        margin-top: .24rem;
        .flex;
        .flex-dir(row-reverse);
        .mint-button--default.is-plain{
            border: 1px solid #999;
            color: #333;
            font-size: .26rem;
            width: 1.64rem;
            height: .56rem;
            .line(.56rem);
            border-radius: 20px;
            margin-right: .4rem;
            &:first-child{
                margin-right: 0;
            }
            &.pay_now{
                .color(#f08200);
                border-color: #f08200;
            }
        }
        .mint-button::after{
            border-radius: 20px;
            .bg(rgba(0, 0, 0, 0.2));
        }
    }
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
</style>
