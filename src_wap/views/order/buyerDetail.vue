<template lang="html">
    <div class="detail">
        <div class="detail_type" :class="{'height2': height2}">
            <div class="type" :class="{'width100': width100}">
                <!-- 拼团中 -->
                <div v-if="orderDetailData.groupSuccess === 2 && orderDetailData.orderStatus !== 'CANCEL' && orderDetailData.orderStatus !== 'CLOSE' && orderDetailData.orderStatus !== 'WAIT_PAY'" class="groupping">
                    <div style="position: relative;">
                        <div><img src="../../assets/images/cbt_icddxqpt.png" />
                        拼团中,差<span style="color: #f08200">{{ grouppingInfo.groupNumber - grouppingInfo.offerNumber }}</span>人
                    </div>
                    <div class="countdown">
                        <i class="iconfont icon-pintuanshijianzhuangtai" style="font-size: 0.24rem; margin-top: -0.03rem;"></i>
                        <div class="countdown-text">{{ grouppingLeftTime ? grouppingLeftTime : "00:00:00.0" }}后结束</div>
                    </div>
                    </div>
                    <!-- 拼团成员头像 -->
                    <div class="groupping-member-info">
                        <div class="groupping-member-icon" v-for="(item, index) in grouppingMemberInfo" :key="index">
                            <div style="color: #fff; font-size: 0.28rem" v-if="!item.memberFace">{{ item.memberUnitName.slice(0,2) }}</div>
                            <!-- <img src="../../assets/images/p.gif" alt=""> -->
                            <img :src=item.memberFace alt="" v-if="item.memberFace">
                            <div class="master-face" v-if="index == 0">
                                团长
                            </div>
                        </div>
                        <template v-if="grouppingMemberInfo.length < 5">
                            <div class="groupping-member-icon" v-for="n in (grouppingInfo.groupNumber - grouppingInfo.offerNumber)">
                                <img src="../../assets/images/cbt_icwctportrait.png" alt="">
                            </div>
                        </template>
                    </div>
                </div>
                <!-- 待发货 -->
                <div v-if="orderDetailData.orderStatus === 'PACKING' && orderDetailData.groupSuccess == 3"><img src="../../assets/images/order_3.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 待发货，已成团 -->
                <div v-if="orderDetailData.orderStatus === 'PACKING' && orderDetailData.groupSuccess == 1" style="width: 100%; display: block; position: relative;">
                    <div><img src="../../assets/images/order_3.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                    <!-- 拼团成员头像 -->
                    <div class="groupping-member-info">
                        <div class="groupping-member-icon" v-for="(item, index) in grouppingMemberInfo" :key="index">
                            <div style="color: #fff; font-size: 0.28rem" v-if="!item.memberFace">{{ item.memberUnitName.slice(0,2) }}</div>
                            <img :src=item.memberFace alt="" v-if="item.memberFace">
                            <div class="master-face" v-if="index == 0">
                                团长
                            </div>
                        </div>
                        <template v-if="grouppingMemberInfo.length < 5">
                            <div class="groupping-member-icon"  v-for="n in (grouppingInfo.groupNumber - grouppingInfo.offerNumber)">
                                <img src="../../assets/images/cbt_icwctportrait.png" alt="">
                            </div>
                        </template>
                    </div>
                    <div>
                        <img src="../../assets/images/cbt_xqptcg.png" alt="" style="width: 1.00rem; height: 1.00rem; position: absolute; right: 0rem; top: 0rem">
                    </div>
                </div>
                <!-- 支付成功，待审核 -->
                <div v-if="orderDetailData.orderStatus === 'PAY_WAIT_AUDIT' && orderDetailData.groupSuccess == 3"><img src="../../assets/images/order_3.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 支付成功，待审核，已成团 -->
                <div v-if="orderDetailData.orderStatus === 'PAY_WAIT_AUDIT' && orderDetailData.groupSuccess == 1" style="width: 100%; display: block; position: relative;">
                    <div><img src="../../assets/images/order_3.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                    <div class="groupping-member-info">
                        <div class="groupping-member-icon" v-for="(item, index) in grouppingMemberInfo" :key="index">
                            <div style="color: #fff; font-size: 0.28rem" v-if="!item.memberFace">{{ item.memberUnitName.slice(0,2) }}</div>
                            <!-- <img src="../../assets/images/p.gif" alt=""> -->
                            <img :src=item.memberFace alt="" v-if="item.memberFace">
                            <div class="master-face" v-if="index == 0">
                                团长
                            </div>
                        </div>
                        <template v-if="grouppingMemberInfo.length < 5">
                            <div class="groupping-member-icon" v-for="n in (grouppingInfo.groupNumber - grouppingInfo.offerNumber)">
                                <img src="../../assets/images/cbt_icwctportrait.png" alt="">
                            </div>
                        </template>
                    </div>
                    <div><img src="../../assets/images/cbt_xqptcg.png" alt="" style="width: 1.00rem; height: 1.00rem; position: absolute; right: 0rem; top: 0rem"></div>
                </div>
                <!-- 待收货 -->
                <div v-else-if="orderDetailData.orderStatus === 'DELIVERED' && orderDetailData.groupSuccess != 1"><img src="../../assets/images/order_2.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 已发货，已成团-->
                <div v-else-if="orderDetailData.orderStatus === 'DELIVERED' && orderDetailData.groupSuccess == 1" style="width: 100%; display: block; position: relative;">
                    <div><img src="../../assets/images/order_2.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                    <div class="groupping-member-info">
                        <div class="groupping-member-icon" v-for="(item, index) in grouppingMemberInfo" :key="index">
                            <div style="color: #fff; font-size: 0.28rem" v-if="!item.memberFace">{{ item.memberUnitName.slice(0,2) }}</div>
                            <!-- <img src="../../assets/images/p.gif" alt=""> -->
                            <img :src=item.memberFace alt="" v-if="item.memberFace">
                            <div class="master-face" v-if="index == 0">
                                团长
                            </div>
                        </div>
                        <template v-if="grouppingMemberInfo.length < 5">
                            <div class="groupping-member-icon"  v-for="n in (grouppingInfo.groupNumber - grouppingInfo.offerNumber)">
                                <img src="../../assets/images/cbt_icwctportrait.png" alt="">
                            </div>
                        </template>
                    </div>
                    <div><img src="../../assets/images/cbt_xqptcg.png" alt="" style="width: 1.00rem; height: 1.00rem; position: absolute; right: 0rem; top: 0rem"></div>
                </div>
                <!-- 待付款 -->
                <div v-else-if="orderDetailData.orderStatus === 'WAIT_PAY'"><img src="../../assets/images/order_4.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 已评价，未成团 -->
                <div v-else-if="orderDetailData.orderStatus === 'FINISH' && orderDetailData.isComment  && orderDetailData.groupSuccess == 3"><img src="../../assets/images/order_1.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 已评价，已成团 -->
                <div v-else-if="orderDetailData.orderStatus === 'FINISH' && orderDetailData.isComment  && orderDetailData.groupSuccess == 1" style="width: 100%; display: block; position: relative;">
                    <div><img src="../../assets/images/order_1.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                    <div class="groupping-member-info">
                        <div class="groupping-member-icon" v-for="(item, index) in grouppingMemberInfo" :key="index">
                            <div style="color: #fff; font-size: 0.28rem" v-if="!item.memberFace">{{ item.memberUnitName.slice(0,2) }}</div>
                            <!-- <img src="../../assets/images/p.gif" alt=""> -->
                            <img :src=item.memberFace alt="" v-if="item.memberFace">
                            <div class="master-face" v-if="index == 0">
                                团长
                            </div>
                        </div>
                        <template v-if="grouppingMemberInfo.length < 5">
                            <div class="groupping-member-icon"  v-for="n in (grouppingInfo.groupNumber - grouppingInfo.offerNumber)">
                                <img src="../../assets/images/cbt_icwctportrait.png" alt="">
                            </div>
                        </template>
                    </div>
                    <div>
                        <img src="../../assets/images/cbt_xqptcg.png" alt="" style="width: 1.00rem; height: 1.00rem; position: absolute; right: 0rem; top: 0rem">
                    </div>
                </div>
                <!-- 待评价，未成团 -->
                <div v-else-if="!orderDetailData.isComment && orderDetailData.orderStatus === 'FINISH' && orderDetailData.groupSuccess == 3"><img src="../../assets/images/order_1.png" />待评价</div>
                <!-- 待评价，已成团 -->
                <div v-else-if="!orderDetailData.isComment && orderDetailData.orderStatus === 'FINISH' && orderDetailData.groupSuccess == 1" style="width: 100%; display: block; position: relative;">
                    <div><img src="../../assets/images/order_1.png" />待评价</div>
                    <div class="groupping-member-info">
                        <div class="groupping-member-icon" v-for="(item, index) in grouppingMemberInfo" :key="index">
                            <div style="color: #fff; font-size: 0.28rem" v-if="!item.memberFace">{{ item.memberUnitName.slice(0,2) }}</div>
                            <!-- <img src="../../assets/images/p.gif" alt=""> -->
                            <img :src=item.memberFace alt="" v-if="item.memberFace">
                            <div class="master-face" v-if="index == 0">
                                团长
                            </div>
                        </div>
                        <template v-if="grouppingMemberInfo.length < 5">
                            <div class="groupping-member-icon"  v-for="n in (grouppingInfo.groupNumber - grouppingInfo.offerNumber)">
                                <img src="../../assets/images/cbt_icwctportrait.png" alt="">
                            </div>
                        </template>
                    </div>
                    <div>
                        <img src="../../assets/images/cbt_xqptcg.png" alt="" style="width: 1.00rem; height: 1.00rem; position: absolute; right: 0rem; top: 0rem">
                    </div>
                </div>
                <!-- 取消 -->
                <div v-else-if="orderDetailData.orderStatus === 'CANCEL'"><img src="../../assets/images/order_6.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 处理中 -->
                <div v-else-if="orderDetailData.orderStatus === 'DEALING'"><img src="../../assets/images/order_3.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 关闭 -->
                <div v-else-if="orderDetailData.orderStatus === 'CLOSE' && orderDetailData.groupSuccess == 3"><img src="../../assets/images/order_6.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                <!-- 关闭，未成团 -->
                <div v-else-if="orderDetailData.orderStatus === 'CLOSE' && orderDetailData.groupSuccess == 2"  style="width: 100%; display: block; position: relative;">
                    <div><img src="../../assets/images/cbt_icddxqqx.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                    <div class="groupping-member-info">
                        <div class="groupping-member-icon" v-for="(item, index) in grouppingMemberInfo" :key="index">
                            <div style="color: #fff; font-size: 0.28rem" v-if="!item.memberFace">{{ item.memberUnitName.slice(0,2) }}</div>
                            <!-- <img src="../../assets/images/p.gif" alt=""> -->
                            <img :src=item.memberFace alt="" v-if="item.memberFace">
                            <div class="master-face" v-if="index == 0">
                                团长
                            </div>
                        </div>
                        <template v-if="grouppingMemberInfo.length < 5">
                            <div class="groupping-member-icon" v-for="n in (grouppingInfo.groupNumber - grouppingInfo.offerNumber)">
                                <img src="../../assets/images/cbt_icwctportrait.png" alt="">
                            </div>
                        </template>
                    </div>
                    <div>
                        <img src="../../assets/images/cbt_xqptsb.png" alt="" style="width: 1.00rem; height: 1.00rem; position: absolute; right: 0rem; top: 0rem">
                    </div>
                </div>
                <!-- 关闭，已成团 -->
                <div v-else-if="orderDetailData.orderStatus === 'CLOSE' && orderDetailData.groupSuccess == 1"  style="width: 100%; display: block; position: relative;">
                    <div><img src="../../assets/images/cbt_icddxqqx.png" />{{ orderStatus[orderDetailData.orderStatus] }}</div>
                    <div class="groupping-member-info">
                        <div class="groupping-member-icon" v-for="(item, index) in grouppingMemberInfo" :key="index">
                            <div style="color: #fff; font-size: 0.28rem" v-if="!item.memberFace">{{ item.memberUnitName.slice(0,2) }}</div>
                            <!-- <img src="../../assets/images/p.gif" alt=""> -->
                            <img :src=item.memberFace alt="" v-if="item.memberFace">
                            <div class="master-face" v-if="index == 0">
                                团长
                            </div>
                        </div>
                        <template v-if="grouppingMemberInfo.length < 5">
                            <div class="groupping-member-icon" v-for="n in (grouppingInfo.groupNumber - grouppingInfo.offerNumber)">
                                <img src="../../assets/images/cbt_icwctportrait.png" alt="">
                            </div>
                        </template>
                    </div>
                    <div>
                        <img src="../../assets/images/cbt_xqptcg.png" alt="" style="width: 1.00rem; height: 1.00rem; position: absolute; right: 0rem; top: 0rem">
                    </div>
                </div>
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
                <div class="line_2">
                    <!--  detailAddress有时会附带上streetAddress-->
                    {{ orderDetailData.detailAddress.replace(orderDetailData.streetAddress,'') + orderDetailData.streetAddress}}
                </div>
            </div>
        </div>
        <div class="order">
            <!-- 店铺名称 是否自营 -->
            <div class="order_shop" v-if="orderDetailData.sellerOrgId == null">
                <img src="../../assets/images/list_logo.png" style="position: relative; top: -0.04rem;" />
                <span>自营</span>
            </div>
            <div class="order_shop" v-else>
                <i class="iconfont">&#xe66d;</i> {{ orderDetailData.shopName }}
            </div>
            <!-- 订单列表 -->
            <div class="order_wrapper">
                <!-- orderListDetail是orderProductList的数据 -->
                <template v-if="orderListDetail.subOrder!=null && orderListDetail.mainOrder == null">
                <!-- <template> -->
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
                                <!-- <mt-button plain v-if="order.subOrderStatus === 'DELIVERED' || order.subOrderStatus === 'CBT_BUYER'" class="pay_now" @click.native="confrimMethodsMoreChild(order.subOrderNo,orderDetailData.orderNo)">确认收货</mt-button> -->
                                <!-- <mt-button plain v-if="(orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER') && (orderDetailData.sellerOrgId!=null||(orderDetailData.sellerOrgId==null && !orderDetailData.subOrderSize))"
                                    class="pay_now" @click.native="confrimMethod(orderDetailData.orderNo)">
                                    确认收货
                                </mt-button> -->
                                <!-- <mt-button plain v-if="(orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER') && orderDetailData.sellerOrgId==null && orderDetailData.subOrderSize == 1"
                                    class="pay_now" @click.native="confrimMethodsMoreChild(orderDetailData.subOrderNo,orderDetailData.orderNo)">
                                    确认收货
                                </mt-button> -->
                                <mt-button plain v-if="(order.subOrderStatus === 'DELIVERED' || order.subOrderStatus === 'CBT_BUYER') && (orderListDetail.subOrder && orderListDetail.subOrder.length > 1)"
                                    class="pay_now" @click.native="confrimMethodsMoreChild(order.subOrderNo,orderDetailData.orderNo)">
                                    确认收货
                                </mt-button>
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
                        <!-- <div class="order_num" style="position: relative;" v-if="orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER'">
                            <mt-button plain class="pay_now" style="font-size: 0.26rem; width: 1.64rem; height: 0.56rem; border-radius: 0.4rem;
                                border-color: rgba(0,0,0,.2); position: absolute; right: 0rem; top: -0.70rem; border-color: #f08200; color: #f08200;"
                                @click.native="confrimMethod(orderDetailData.orderNo)">
                                确认收货
                            </mt-button>
                        </div> -->
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
                <template v-if="orderDetailData.payType!='CASH_DELIVERY' && orderDetailData.orderStatus !== 'WAIT_PAY'">
                    <div class="price_total_item">
                        <span>￥{{  orderDetailData.orderSum | toFix2 }}</span>实际付款：
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
         <!-- 联系卖家 -->
         <div class="chat-with-seller" @click="openKfDialog">
             <div class="text" v-if="!orderDetailData.shopName">
                <i class="iconfont icon-kefurukousvg" style="color: #f08200;"></i>
                联系茶通帮客服
             </div>
            <div class="text" v-else>
                <i class="iconfont icon-dianpu" style="color: #f08200;"></i>
                联系卖家
            </div>
         </div>
        <!-- 下单时间 -->
        <div class="order_date">
            <div class="number order_date_item" style="align-items: center; display: flex;">
                订单编号：{{ orderDetailData.orderNo }}
                <div style="border: solid 0.02rem #999999; border-radius: 0.05rem; font-size: 0.26rem; padding: 0.12rem 0.25rem;"
                    v-clipboard:copy="orderDetailData.orderNo" v-clipboard:success="clipboardData" v-clipboard:error="copyFail"
                >
                    复制
                </div>
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
        <!-- <div class="order_btn"  v-if="orderListDetail.mainOrder != null && orderListDetail.subOrder == null"> -->
        <div class="order_btn">
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
            <!-- 支付成功、待审核（单独购买） -->
            <template v-if="orderDetailData.orderStatus === 'PAY_WAIT_AUDIT' && orderDetailData.groupSuccess == '3'">
                <mt-button plain @click.native="refund(orderDetailData)">
                    退款
                </mt-button>
            </template>
            <!-- 打包中（自营） -->
            <template v-if="!orderDetailData.sellerOrgId && orderDetailData.orderStatus == 'PACKING'">
                <mt-button plain @click.native="refund(orderDetailData)">
                    退款
                </mt-button>
            </template>
            <!-- 打包中（第三方、未成团） -->
            <template v-if="orderDetailData.orderStatus === 'PACKING' && orderDetailData.groupSuccess == '2' && orderDetailData.sellerOrgId">
                <mt-button plain class="pay_now" @click.native="share(orderDetailData)">
                    分享拼团
                </mt-button>
                <mt-button plain @click.native="cancelMethod(orderDetailData, 'groupping')">
                    取消订单
                </mt-button>
            </template>
            <!-- 打包中（第三方、已成团） -->
            <template v-if="orderDetailData.orderStatus === 'PACKING' && orderDetailData.groupSuccess == '1' && orderDetailData.sellerOrgId">
                <mt-button plain @click.native="refund(orderDetailData)">
                    退款
                </mt-button>
            </template>
            <!-- 打包中（第三方、非团购） -->
            <template v-if="orderDetailData.orderStatus === 'PACKING' && orderDetailData.groupSuccess == '3' && orderDetailData.sellerOrgId">
                <mt-button plain @click.native="refund(orderDetailData)">
                    退款
                </mt-button>
            </template>
            <!-- 己发货 -->
            <template>
                 <!-- && orderListDetail.subOrder.lenght == 0 -->
                 <mt-button plain v-if="(orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER') && (orderListDetail.subOrder && orderListDetail.subOrder.length <= 1)"
                    class="pay_now" @click.native="confrimMethodsMoreChild(orderListDetail.subOrder[0].subOrderNo,orderDetailData.orderNo)">
                    确认收货
                </mt-button>
                <!-- 第三方 -->
                <mt-button plain v-if="(orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER') && !orderListDetail.subOrder"
                    class="pay_now" @click.native="confrimMethod(orderDetailData.orderNo)">
                    确认收货
                </mt-button>
                <!-- <mt-button plain v-if="(orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER') && (orderDetailData.sellerOrgId!=null||(orderDetailData.sellerOrgId==null && !orderDetailData.subOrderSize))"
                    class="pay_now" @click.native="confrimMethod(orderDetailData.orderNo)">
                    确认收货
                </mt-button> -->
                <!-- <mt-button plain v-if="(orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER') && orderDetailData.sellerOrgId==null && orderDetailData.subOrderSize == 1"
                    class="pay_now" @click.native="confrimMethodsMoreChild(orderDetailData.subOrderNo,orderDetailData.orderNo)">
                    确认收货
                </mt-button> -->
                <mt-button plain v-if="(orderDetailData.orderStatus === 'DELIVERED' || orderDetailData.orderStatus === 'CBT_BUYER')" @click.native="refund(orderDetailData)">
                    退款
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
import { MessageBox,Toast } from 'mint-ui';
import {mapGetters} from 'vuex';
import store from 'store';
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
            cancelTipsFlag: false,                      // 取消订单弹窗
            refundTipsFlag: false,                      // 退款弹窗
            myData: {                                   // 聊天数据初始化
                mine: {},
                friend: [],
                group: []
            },
            shopInfo: {                                 // 商家店铺信息
                shopName: '',
                orgId: ''
            },
            isThirdShop: '',                            // 茶帮通或者第三方
            cancelJsonData: {},                         // 取消订单静态块
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
                    },1000)
                },res=>{
                    this.$toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                    // return setTimeout(()=>{
                    //     location.reload();
                    // },200)
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
        // 提交评价
        commentMethod(orderId) {
            this.$router.push({
                name: '订单评价',
                query: {
                    orderId: orderId
                }
            })
        },
        // 取消订单
        cancelMethod(obj, str) {
           if(str =="groupping"){
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
            if (item.shopName) {
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
            startTime = startTime.substr(0, 10) + "T" + startTime.substr(11, 8);
            systemTime = systemTime.substr(0, 10) + "T" + systemTime.substr(11, 8)
            const endTime = new Date(startTime);
            const nowTime = new Date(systemTime);
            let leftTime = parseInt((endTime.getTime() - nowTime.getTime())) + 24 * 60 * 60 * 1000
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
        // 联系商家
        openKfDialog() {
            //    this.showOrHide = true;
            store.dispatch('getMemberData').then((res) => {
                let data = { username: store.state.member.member.id+'_1', password: store.state.member.member.id+'_1' };
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
                this.$http.post("/erp/account/ajaxLogin", ret).then(res => {
                    let userid = res.data.data;//res.data.data.split(",")[0];
                    this.getBase(userid);
                });
            }).catch(res => {
                this.$router.replace('/login');
            });
        },
        // 获得商家数据
        getBase(userid) {
            this.$http.get(`/erp/layim/base?userId=${userid}`).then(res => {
                if (res.data.data) {
                    this.myData = res.data.data;
                    this.addFriend(userid);
                } else {
                    return Toast(res.data.msg);
                }
            })
        },
        // 添加聊天
        addFriend(selfId) {
            let kefuName = "茶帮通客服";
            let addId = 1;
            let _this = this;
            if (this.shopInfo.orgId) {
                kefuName = this.shopInfo.shopName;
                addId = this.shopInfo.orgId+'_2';
            }
            this.$http.get(`/erp/layim/addFriend?friend=${addId}&userId=${selfId}`).then(res => {
                let friendId = res.data.data;
                if(res.data.code == 1){
                    Toast({
                        message: res.data.msg,
                        position: 'center',
                        duration: 1000
                    });
                    return;
                }
                layui.config({
                    version: true,
                    base: '/static/mods/'
                }).use(['mobile', 'socket', 'req', "laytpl"], function (mobile, socket, req) {
                    var layim = mobile.layim,
                        laytpl = layui.laytpl,
                        layer = mobile.layer;
                    layer.closeAll();
                    var $ = layui.jquery;
                    var selfFlag = false;
                    //基础配置
                    layim.config({
                        init: {
                            //设置我的基础信息
                            mine: _this.myData.mine,
                            friend: _this.myData.friend,
                            group: _this.myData.group
                        }
                        //上传图片接口
                        , uploadImage: { url: '/erp/upload/file' }
                        //上传文件接口
                        , uploadFile: { url: '/erp/upload/file' }

                        , isAudio: true //开启聊天工具栏音频
                        , isVideo: true //开启聊天工具栏视频
                        , voice: false //开启提示音
                        , initSkin: '5.jpg' //1-5 设置初始背景
                        , notice: true //是否开启桌面消息提醒，默认false
                        , msgbox: '/erp/layim/msgbox'
                        , find: layui.cache.dir + 'css/modules/layim/html/find.html' //发现页面地址，若不开启，剔除该项即可
                        , chatLog: layui.cache.dir + 'css/modules/layim/html/chatLog.html' //聊天记录页面地址，若不开启，剔除该项即可

                        //可同时配置多个
                        , tool: [{
                            alias: 'history' //工具别名
                            , title: '聊天记录' //工具名称
                            , iconUnicode: '&#xe60e;' //图标字体的unicode，可不填
                            , iconClass: '' //图标字体的class类名
                        }],
                        brief:true
                    });
                    let wsServer = window.location.host=='m.oteao.com'?'wss://im.oteao.com':'wss://mdemows.oteao.com';
                    socket.config({
                        log: true,
                        token: `/erp/layim/getToKenById?id=${selfId}`,
                        // token:'/erp/layim/token',
                        server: wsServer,
                        //server:'ws://192.168.7.8:8888',
                        //server: 'wss://java.im.test.yipicha.com',
                        reconn: true
                    });

                    //创建一个会话
                    layim.chat({
                        id: friendId
                        , name: kefuName
                        , type: 'friend' //friend、group等字符，如果是group，则创建的是群聊
                        , avatar: 'http://tp1.sinaimg.cn/1571889140/180/40030060651/1'
                    });

                    $(".layui-m-layer").css('z-index','120');
                    socket.on('open', function (e) {
                        console.log("监听到事件：open");
                    });
                    socket.on('close', function (e) {
                        console.log("监听到事件：close");
                    });
                    socket.on('error', function (e) {
                        console.log("监听到事件：error");
                    });
                    socket.on('msg', function (e) {
                        var msg = JSON.parse(e.data);
                        console.log(msg);
                        var handleChat = function (msg) {
                            if (selfFlag) {
                                selfFlag = false;
                                return;
                            }
                            layim.getMessage(msg);
                        }
                        var handleStatus = function (msg) {
                            var status = '';
                            if (typeof msg.count !== 'undefined') {
                                status = msg.count + '人在线';
                            } else {
                                status = msg.online ? '在线' : '离线';
                            }
                            layim.setChatStatus('<span style="color:#FF5722;">' + status + '</span>');
                        }
                        if (msg.mtype) {
                            switch (msg.mtype) {
                                case -1:
                                    return console.log(msg.msg);
                                case socket.mtype.chatFriend:
                                case socket.mtype.chatGroup:
                                    handleChat(msg);
                                    break;
                                case socket.mtype.checkIsOnline:
                                case socket.mtype.checkOnlineCount:
                                    handleStatus(msg);
                                    break;
                                case socket.mtype.serverNotice:
                                    layim.msgbox(msg.count);
                                    break;
                                case socket.mtype.addFriendNotice:
                                    layim.addList({
                                        type: msg.type,
                                        avatar: msg.avatar,
                                        username: msg.username,
                                        groupid: msg.groupid,
                                        sign: msg.sign,
                                        id: msg.id
                                    });
                                    msg.mtype = socket.mtype.chatFriend;
                                    msg.content = "我们已经是好友啦，一起来聊天吧！";
                                    layim.getMessage(msg);
                                    break;
                                case socket.mtype.onofflineNotice:
                                    layim.setFriendStatus(msg.id, msg.status);
                                    break;
                            }
                        }
                    });
                    // console.log(socket.mtype);
                    //监听在线状态的切换事件
                    layim.on('online', function (data) {
                        //console.log(data);
                    });
                    //监听签名修改
                    layim.on('sign', function (value) {
                        //console.log(value);
                    });
                    //监听自定义工具栏点击，以添加代码为例
                    // layim.on('tool(code)', function(insert){
                    //     layer.prompt({
                    //         title: '插入代码'
                    //         ,formType: 2
                    //         ,shade: 0
                    //     }, function(text, index){
                    //         layer.close(index);
                    //         insert('[pre class=layui-code]' + text + '[/pre]'); //将内容插入到编辑器
                    //     });
                    // });
                    //监听layim建立就绪
                    layim.on('ready', function () {
                        req.loading = false;
                        req.get('/erp/layim/apply-unread', {}, function (res) {
                            res.data && layim.msgbox(res.data);
                        });
                        console.log(layim.cache().friend);
                    });
                    //监听发送消息
                    layim.off('sendMessage').on('sendMessage', function (data) {
                        var To = data.to;
                        var timeStamp = data.mine.time;
                        console.log("return******" + timeStamp)
                        if (sessionStorage.getItem("msg_timestamp") == timeStamp) {
                            console.log("return******" + timeStamp)
                            return;
                        }
                        sessionStorage.setItem("msg_timestamp", timeStamp);
                        var t = data.to.type == 'friend';
                        if (!t) {
                            selfFlag = true;
                        }
                        socket.send({ mtype: (t ? socket.mtype.chatFriend : socket.mtype.chatGroup), content: data.mine.content, toid: data.to.id, id: data.mine.id, time: data.mine.time });
                        return;
                    });
                    //监听查看群员
                    layim.on('members', function (data) {
                        //console.log(data);
                    });
                    //监听天窗口的切换
                    layim.on('chatChange', function (res) {
                        var t = res.data.type == 'friend';
                        socket.send({
                            mtype: t ? socket.mtype.checkIsOnline : socket.mtype.checkOnlineCount,
                            id: res.data.id
                        });
                    });
                    //监听返回
                    layim.on('back', function(){
                      $(".layui-m-layer").css('z-index','10');
                    });
                    //监听自定义工具栏点击，以添加代码为例
                    layim.off('tool(history)').on('tool(history)', function (insert, f, thatChat) {
                        var friendId = thatChat.data.id
                        var kefuName1 = thatChat.data.name
                        var selfId = layim.cache().mine.id;
                        var param = "?id=" + friendId + "&userId=" + layim.cache().mine.id;
                        $.get('/erp/layim/getChatLog/0/10000' + param, {}, function (res) {
                            console.log(res.data.data)
                            //弹出一个更多聊天记录面板
                            layim.panel({
                                title: '与 ' + kefuName1 + ' 的聊天记录' //标题
                                , tpl: ['<div class="layim-chat-main"><ul id="LAY_view">'
                                    , '{{# layui.each(d.data, function(index, item){  if(item.id == '+selfId+'){ }}'
                                    , '    <li class="layim-chat-mine"><div class="layim-chat-user"><img src="{{ item.avatar }}" />'
                                    , '    <cite><i>{{ layui.data.date(item.timestamp) }}</i>{{ item.username }}</cite>'
                                    , '    </div><div class="layim-chat-text">{{layui.mobile.layim.content(item.content)}}</div></li>'
                                    , '  {{# } else { }}'
                                    , '    <li><div class="layim-chat-user"><img src="{{ item.avatar }}" /><cite>{{ item.username }}<i>{{ layui.data.date(item.timestamp) }}</i></cite></div><div class="layim-chat-text">{{ layui.mobile.layim.content(item.content) }}</div></li>'
                                    , '  {{# } }); }}'
                                    , '</ul></div>'
                                ].join('') //模版
                                , data: res.data.data
                            });
                        });
                        // layer.prompt({
                        //     title: '插入代码'
                        //     ,formType: 2
                        //     ,shade: 0
                        // }, function(text, index){
                        //     layer.close(index);
                        //     insert('[pre class=layui-code]' + text + '[/pre]'); //将内容插入到编辑器
                        // });
                    });

                    //监听查看更多记录
                    layim.off('chatlog').on('chatlog', function (data, ul) {
                        console.log(data); //得到当前会话对象的基本信息
                        console.log(ul); //得到当前聊天列表所在的ul容器，比如可以借助他来实现往上插入更多记录
                        var param = "?id=" + data.id + "&userId=" + layim.cache().mine.id;
                        $.get('/erp/layim/getChatLog/0/10000' + param, {}, function (res) {
                            console.log(res.data.data)
                            var html = laytpl(
                                [
                                    '<textarea title="消息模版" id="LAY_tpl" style="display:none;">'
                                    , '{{# layui.each(d.data, function(index, item){  if(item.id == 200512){ }}'
                                    , '    <li class="layim-chat-mine"><div class="layim-chat-user"><img src="{{ item.avatar }}" />'
                                    , '    <cite><i>{{ layui.data.date(item.timestamp) }}</i>{{ item.username }}</cite>'
                                    , '    </div><div class="layim-chat-text">{{ layui.mobile.layim.content(item.content) }}</div></li>'
                                    , '  {{# } else { }}'
                                    , '    <li><div class="layim-chat-user"><img src="{{ item.avatar }}" /><cite>{{ item.username }}<i>{{ layui.data.date(item.timestamp) }}</i></cite></div><div class="layim-chat-text">{{ layui.mobile.layim.content(item.content) }}</div></li>'
                                    , '  {{# } }); }}'
                                    , '</textarea> '
                                ].join('')
                            ).render({
                                data: res.data.data
                            });

                            // var html = laytpl(
                            //     [
                            //       '<textarea title="消息模版" id="LAY_tpl" style="display:none;">'
                            //     ,'{{# layui.each(d.data, function(index, item){  if(item.id == 200512){ }}'
                            //     ,'    <li class="layim-chat-mine"><div class="layim-chat-user"><img src="{{ item.avatar }}" />'
                            //     ,'    <cite><i>{{ layui.data.date(item.timestamp) }}</i>{{ item.username }}</cite>'
                            //     ,'    </div></li>'
                            //     ,'  {{# } else { }}'
                            //     ,'  {{# } }); }}'
                            //     ,'</textarea> '
                            //     ].join('')
                            // ).render({
                            //     data: res.data.data
                            // });

                            //$('#LAY_view').html(html);
                            //弹出一个更多聊天记录面板
                            layim.panel({
                                title: '与 ' + data.username + ' 的聊天记录' //标题
                                , tpl: ['<div class="layim-chat-main"><ul id="LAY_view">'
                                    , '{{# layui.each(d.data, function(index, item){  if(item.id == layui.mobile.layim.cache().mine.id){ }}'
                                    , '    <li class="layim-chat-mine"><div class="layim-chat-user"><img src="{{ item.avatar }}" />'
                                    , '    <cite><i>{{ layui.data.date(item.timestamp) }}</i>{{ item.username }}</cite>'
                                    , '    </div><div class="layim-chat-text">{{layui.mobile.layim.content(item.content)}}</div></li>'
                                    , '  {{# } else { }}'
                                    , '    <li><div class="layim-chat-user"><img src="{{ item.avatar }}" /><cite>{{ item.username }}<i>{{ layui.data.date(item.timestamp) }}</i></cite></div><div class="layim-chat-text">{{ layui.mobile.layim.content(item.content) }}</div></li>'
                                    , '  {{# } }); }}'
                                    , '</ul></div>'
                                ].join('') //模版
                                , data: res.data.data
                            });
                        });

                    });
                });
            });
        },
        // 复制
        clipboardData(e){
            return Toast('复制成功');
        },
        // 复制失败
         copyFail(e) {
            return Toast('复制失败');
        },
    },
    mounted() {
        // this.height2 = true;
    },
    computed: {
        ...mapGetters([
            'orderStatus'
        ]),
        linkShopTel() {
            return `tel//${this.orderDetailData.shopPhone}`;
        },
        height2() {
            if (this.orderDetailData.groupSuccess === 2 && this.orderDetailData.orderStatus !== 'WAIT_PAY') return true;
            else if (this.orderDetailData.orderStatus === 'PAY_WAIT_AUDIT' && this.orderDetailData.groupSuccess == 1) return true;
            else if (this.orderDetailData.orderStatus === 'DELIVERED' && this.orderDetailData.groupSuccess == 1) return true;
            else if (this.orderDetailData.orderStatus === 'PACKING' && this.orderDetailData.groupSuccess == 1) return true;
            else if (this.orderDetailData.orderStatus === 'CLOSE' && this.orderDetailData.groupSuccess == 2) return true;
            else if (this.orderDetailData.orderStatus === 'CLOSE' && this.orderDetailData.groupSuccess == 1) return true;
            else if (this.orderDetailData.orderStatus === 'FINISH' && this.orderDetailData.isComment && this.orderDetailData.groupSuccess == 1) return true;
            else if (this.orderDetailData.orderStatus === 'FINISH' && !this.orderDetailData.isComment && this.orderDetailData.groupSuccess == 1) return true;
        },
        width100() {
            if (this.orderDetailData.groupSuccess === 2) return true;
            else if (this.orderDetailData.orderStatus === 'PAY_WAIT_AUDIT' && this.orderDetailData.groupSuccess == 1) return true;
            else if (this.orderDetailData.orderStatus === 'DELIVERED' && this.orderDetailData.groupSuccess == 1) return true;
            else if (this.orderDetailData.orderStatus === 'PACKING' && this.orderDetailData.groupSuccess == 1) return true;
            else if (this.orderDetailData.orderStatus === 'CLOSE' && this.orderDetailData.groupSuccess == 2) return true;
            else if (this.orderDetailData.orderStatus === 'CLOSE' && this.orderDetailData.groupSuccess == 1) return true;
            else if (this.orderDetailData.orderStatus === 'FINISH' && this.orderDetailData.isComment && this.orderDetailData.groupSuccess == 1) return true;
            else if (this.orderDetailData.orderStatus === 'FINISH' && !this.orderDetailData.isComment && this.orderDetailData.groupSuccess == 1) return true;
        }
    },
    watch: {

    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','订单详情');
        // 获取订单详情
        this.getListDetail().then((res) =>{
            this.orderDetailData = res.data;
            this.copyOrderNo = 123;
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
                // console.log(this.orderListDetail.subOrder.length);
            });
            // 获取商家信息
            this.shopInfo.shopName = res.data.shopName;
            this.shopInfo.orgId = res.data.sellerOrgId;
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
}
</script>

<style lang="less" scoped>
    @import '~@/styles/order/detail.less';
    .height2{
        height: auto!important;
        padding-top: 0.36rem!important;
    }
    .width100{
        width: 100%;
    }
    .groupping{
        display: block!important;
        .countdown{
            // width: 2.62rem;
            height: 0.50rem;
            padding: 0.18rem 0.1rem 0.12rem 0.2rem;
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
    }
    .groupping-member-info{
        flex-wrap: wrap;
        padding-bottom: 0.3rem;
        .groupping-member-icon{
            margin-top: 0.3rem;
            position: relative;
            width: 1.00rem;
            height: 1.00rem;
            margin-right: 0.30rem;
            justify-content: center;
            background-color: #fe9900;
            border-radius: 50%;
            img{
                width: 1.04rem!important;
                height: 1.04rem!important;
                margin-left: -0.01rem;
                &:nth-child(1){
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
    /* 联系商家 */
    .chat-with-seller{
        padding: 0.32rem 0;
        background-color: #fff;
        border-top: 0.01rem solid #e6e6e6;
        text-align: center;
        .text{
            font-size: 0.28rem;
            color: #333;
        }
    }

    .detail .order_date .order_date_item{
        display: block;
    }
</style>
