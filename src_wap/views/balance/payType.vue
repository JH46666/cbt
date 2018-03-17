<template>
    <div class="pay-type-pannel">
        <div class="pay-type-content">
            <div class="pannel-wrap">
                <div class="pannel">
                    <h3 class="title">
                        支付方式
                        <template v-if="active.selfSupport !== true">
                            ： ({{ payMethods[active.currentPayMethod] }})
                        </template>
                    </h3>
                    <template v-if="active.selfSupport === true">
                        <div class="check-item online" @click="active.currentPayMethod = 'ONLINE'">
                            <div class="left"><i class="icon-zaixianzhifu"></i> 在线支付</div>
                            <div class="right">
                                <label :class="{checked:active.currentPayMethod === 'ONLINE'}">
                                    <input type="radio" value="ONLINE" v-model="active.currentPayMethod">
                                </label>
                            </div>
                        </div>
                        <!-- <div class="check-item delivery edit-12-25" @click="active.currentPayMethod = 'CASH_DELIVERY'">
                            <div class="left"><i class="icon-huodaofukuan"></i>
                                <div class="text-right">
                                    <p>货到付款</p>
                                    <p class="tips">需依待付金额收取<span class="gold">3%</span>手续费，最低5元</p>
                                </div>
                            </div>
                            <div class="right">
                                <label :class="{checked:active.currentPayMethod === 'CASH_DELIVERY'}">
                                    <input type="radio" value="CASH_DELIVERY" v-model="active.currentPayMethod">
                                </label>
                            </div>
                        </div> -->
                    </template>
                </div>
                <div class="pannel">
                    <h3 class="title" v-if="active.selfSupport === true">配送快递</h3>
                    <h3 class="title" v-else>配送方式</h3>
                    <!-- 自营配送快递 -->
                    <template v-if="active.selfSupport === true">
                        <div class="check-item" @click="active.currentDeliveryMethod = 'ship_sto'">
                            <div class="left"><span class="icon"><img src="../../assets/images/stkd.png" alt=""></span> 申通快递 </div>
                            <div class="center">
                                <span class="gold" v-if="active.currentPayMethod === 'ONLINE'">￥{{ active.payAndDeliveryAndfreightMap.ONLINE['ship_sto'] | toFix2 }}</span>
                                <span class="gold" v-else>￥{{ active.payAndDeliveryAndfreightMap.CASH_DELIVERY['ship_sto'] | toFix2 }}</span>
                            </div>
                            <div class="right">
                                <label :class="{checked:active.currentDeliveryMethod === 'ship_sto'}">
                                    <input type="radio" value="ship_sto" v-model="active.currentDeliveryMethod">
                                </label>
                            </div>
                        </div>
                        <div class="check-item" @click="active.currentDeliveryMethod = 'ship_sf'">
                            <div class="left"><span class="icon"><img src="../../assets/images/sfkd.png" alt=""></span> 顺丰快递 </div>
                            <div class="center">
                                <span class="gold" v-if="active.currentPayMethod === 'ONLINE'">￥{{active.payAndDeliveryAndfreightMap.ONLINE['ship_sf'] | toFix2}}</span>
                                <span class="gold" v-else>￥{{ active.payAndDeliveryAndfreightMap.CASH_DELIVERY['ship_sf'] | toFix2 }}</span>
                            </div>
                            <div class="right">
                                <label :class="{checked:active.currentDeliveryMethod === 'ship_sf'}">
                                    <input type="radio" value="ship_sf" v-model="active.currentDeliveryMethod">
                                </label>
                            </div>
                        </div>
                        <div class="check-item" v-if="active.currentPayMethod === 'ONLINE'" @click="active.currentDeliveryMethod = 'ship_ems'">
                            <div class="left"><span class="icon"><img src="../../assets/images/emskd.png" alt=""></span> EMS </div>
                            <div class="center">
                                <span class="gold" v-if="active.currentPayMethod === 'ONLINE'">￥{{active.payAndDeliveryAndfreightMap.ONLINE['ship_ems'] | toFix2}}</span>
                                <span class="gold" v-else>￥{{ active.payAndDeliveryAndfreightMap.CASH_DELIVERY['ship_ems'] | toFix2 }}</span>
                            </div>
                            <div class="right">
                                <label :class="{checked:active.currentDeliveryMethod === 'ship_ems'}">
                                    <input type="radio" value="ship_ems" v-model="active.currentDeliveryMethod">
                                </label>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="check-item" @click="active.currentDeliveryMethod = 'ship_express'">
                            <div class="left"><span class="tip-third">快递配送</span></div>
                            <div class="center">
                                <span class="gold">￥{{ active.payAndDeliveryAndfreightMap.ONLINE['ship_express'] | toFix2}}</span>
                            </div>
                            <div class="right">
                                <label :class="{checked:active.currentDeliveryMethod === 'ship_express'}">
                                    <input type="radio" value="ship_express" v-model="active.currentDeliveryMethod">
                                </label>
                            </div>
                        </div>
                    </template>
                    <div class="indoor-wrap" v-if="(active.canPickUpBySelf && active.selfSupport === true) || active.selfSupport !== true">
                        <div class="check-item delivery">
                            <div class="left" v-if="active.selfSupport === true"><i class="icon-jifenshangcheng"></i> 门店自提 </div>
                            <div class="left" v-else><span class="tip-third">门店自提</span></div>
                            <div class="center">
                                <span class="gold">￥0.00</span>
                            </div>
                            <div class="right">
                                <label :class="{checked:active.currentDeliveryMethod === 'get_self'}">
                                    <input type="radio" value="get_self" v-model="active.currentDeliveryMethod">
                                </label>
                            </div>
                        </div>
                        <p class="tips" :class="{border: active.selfSupport !== true}" v-if="active.currentDeliveryMethod === 'get_self'">请与门店联系确认存货量以及门店营业时间</p>
                        <p class="contack" v-if="active.currentDeliveryMethod === 'get_self'">提货地址：{{ active.shopAddress }}--联系电话：{{ active.contactMobile }}</p>
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <mt-button type="default" @click="confirm">确定</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                payMethods: {           // 支付方式
                    CASH_DELIVERY: '货到付款',
                    ONLINE: '在线支付'
                },
                active: {},             // 激活的面板
            }
        },
        watch: {
            'active.currentPayMethod'(val) {
                if(this.active.selfSupport === true) {
                    this.active.currentDeliveryMethod = 'ship_sto'
                }
            }
        },
        methods: {
            confirm() {
                this.$emit('confirm')
            },
            setActive(data) {
                this.active = data;
            }
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/balance/index.less');
</style>
