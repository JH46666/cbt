<template>
    <div id="pay-view">
        <div class="hd">
            <!-- 失败 -->
            <template v-if="$route.name === '结算显示' && $route.query.fail">
                <div class="fail-text">
                    <i class="icon-zhifushibai"></i>支付失败
                </div>
                <div class="fail-btn-wrap">
                    <mt-button type="default" @click="$router.push('/order/buyerlist?orderStatus=null')">查看订单</mt-button>
                    <mt-button type="default" @click="$router.push({name: '收银台',query: {payId: $route.query.payId,type:$route.query.type}})">立即支付</mt-button>
                </div>
            </template>
            <!-- 成功 -->
            <template v-if="$route.name === '结算显示' && !$route.query.fail">
                <div class="success-text">
                    <i class="icon-zhifuchenggong"></i>支付成功
                </div>
                <div class="success-btn-wrap">
                    <mt-button type="default" @click="$router.push('/order/buyerlist?orderStatus=null')">查看订单</mt-button>
                    <mt-button type="default" @click="$router.push('/')">返回首页</mt-button>
                </div>
            </template>
            <!-- 货到付款 -->
            <template v-if="$route.name === '货到付款结算'">
                <div class="delivery-text">
                    <i class="icon-zhifuchenggong"></i>货到付款订单提交成功
                </div>
                <p class="wait">还需支付<span class="gold">￥{{ order.orderSum - order.cashDeliverySum | toFix2 }}</span></p>
                <div class="delivery-btn-wrap">
                    <mt-button type="default" @click="$router.push('/order/buyerlist?orderStatus=null')">查看订单</mt-button>
                    <mt-button type="default" @click="$router.push({name: '收银台',query: {payId: $route.query.payId,type:$route.query.type}})">立即支付</mt-button>
                </div>
            </template>
            <!-- 货到付款成功 -->
            <template v-if="$route.name === '货到付款成功'">
                <div class="delivery-text">
                    <i class="icon-zhifuchenggong"></i>货到付款订单提交成功
                </div>
                <p class="wait">还需支付<span class="gold">￥{{ order.orderSum | toFix2 }}</span></p>
                <div class="delivery-btn-wrap">
                    <mt-button type="default" @click="$router.push('/order/buyerlist?orderStatus=null')">查看订单</mt-button>
                    <mt-button type="default" @click="$router.push('/')">返回首页</mt-button>
                </div>
            </template>
        </div>
        <div class="bd">
            <div class="text-item">
                <div class="left">{{ address.receiptName }}</div>
                <div class="right">{{ address.phone }}</div>
            </div>
            <div class="text-item">
                <p>{{ address.address }}</p>
            </div>
            <div class="text-item" v-if="$route.name === '货到付款结算'">
                <div class="left">待付金额：</div>
                <div class="right"><span class="gold">￥{{ order.orderSum - order.cashDeliverySum | toFix2 }}</span></div>
            </div>
            <div class="text-item" v-if="$route.name === '结算显示' && !$route.query.fail">
                <div class="left">已付金额：</div>
                <div class="right"><span class="gold">￥{{ order.orderSum | toFix2 }}</span></div>
            </div>
            <div class="text-item" v-if="$route.name === '货到付款成功' || $route.query.fail">
                <div class="left">待付金额：</div>
                <div class="right"><span class="gold">￥{{ order.orderSum | toFix2 }}</span></div>
            </div>
            <div class="text-item">
                <div class="left">支付方式：</div>
                <div class="right">{{ payType[order.payType] }}</div>
            </div>
        </div>
        <!-- 猜你喜欢 -->
        <may-like v-if="$route.name === '结算显示' && !$route.query.fail || $route.name === '货到付款成功'"></may-like>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import store from 'store';
    import api from 'api';
    export default {
        data() {
            return {
                myData: {},
                payType: {
                    ONLINE: '在线支付',
                    CASH_DELIVERY: '货到付款'
                }
            }
        },
        computed: {
            address() {
                return this.myData.OrderConsignee || {};
            },
            order() {
                return this.myData.payOrder || {};
            }
        },
        methods: {
            // 设置数据
            setData(data) {
                this.myData = data;
            }
        },
        created() {
            if(this.$route.query.wx === 'wxpaycallback') {
                this.$api.post('/payOrder/queryWxPay',{
                    payId: this.$route.query.payId
                },res => {
                    if(res.data.trade_state_desc === '订单未支付') {
                        this.$router.replace({name: '结算显示',query: {payId: this.$route.query.payId,type: this.$route.query.type,fail: true}})
                    }
                })
            }
        },
        beforeRouteEnter(to, from, next) {

            // 判断付款单
            if(!to.query.payId) {
                next(vm => vm.$router.push('/'))
            }

            // 判断是否登陆
            let getData = () => {
                api.post('/oteao/payOrder/queryPayOrderById',{
                    payOrderId: to.query.payId
                },res => {
                    next(vm => {
                        vm.setData(res.data)
                    })
                },res => {
                    next(vm => {
                        vm.$toast(res.message);
                        vm.$router.go(0);
                    })
                })
            }

            if(store.state.member.member.id) {
                getData();
            } else {
                store.dispatch('getMemberData').then(res => {
                    getData();
                }).catch(res =>{
                    next(vm => {
                        vm.$router.push('/login')
                    })
                })
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('~@/styles/balance/payView.less');
</style>