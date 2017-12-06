<template>
    <div class="cashier_wrapper">
        <div class="flex cashier-caption">
            <p class="flex-1 color_6">应付</p>
            <p class="flex-1 algin_r color_f08">￥{{ myData.productPaySum | toFix2 }}</p>
        </div>
        <div class="floor1" v-if="totalAmount > 0">
            <p class="remaining color_6">余额 <span class="color_9">￥{{ totalAmount | toFix2 }}</span></p>
            <ul class="flex use_box">
                <li class="flex-1" @click="isUse = true" :class="{'on': isUse}">使用 ￥{{ totalAmount > myData.productPaySum ? myData.productPaySum : totalAmount | toFix2 }}</li>
                <li class="flex-1" @click="isUse = false" :class="{'on': !isUse}">不使用</li>
            </ul>
        </div>
        <div class="floor2" :class="{iswx: $tool.isWx}" v-if="totalAmount < myData.productPaySum || isUse === false">
            <mt-radio
                align="right"
                title="选择支付方式"
                v-model="payMethod"
                :options="options">
            </mt-radio>
        </div>
        <div class="floor3"><a class="confirm-pay" href="javscript:void(0);" @click="pay">确定支付 <span>￥{{ myData.productPaySum | toFix2 }}</span></a></div>
        <form ref="alipay" action="https://openapi.alipaydev.com/gateway.do?charset=UTF-8&method=alipay.trade.page.pay&sign=Y%2FdvjwbmIzgbvNvCsRAegEUfRX828pEULShZmpcc5oiYetBDSYWSXkx3BTc31AZ0s8%2BttSqxqb1Jz3ddfiRXRMEZ6SaRQ1HPlhwMk8dz0EkojiQ0Qh8id67yySJFN6lXFXziXozyMk6BKeNoYwPJ%2BfhJHiLC0VyaRr0fMo2ZVE%2BF%2F%2F5pqiLx39u1pAHQvoOgpVtUXc%2FMuz%2FpS5u%2BugZeFP2TDlpJxAJVi%2BW6jhCT6GgX4MHaCka3W0XOnCzfuNxKiBeztbZcc%2F6by9pw2Dj5ad2YlsOEsUD45ScT4bgT0n43txLjMKBYoCpuPHpg7HmB11gn6ohxR7K0w72Uu%2Bwg7w%3D%3D&return_url=https%3A%2F%2Fwww.baidu.com%2F&notify_url=http%3A%2F%2Ftest.oteao.com%2Fapi%2FpayOrder%2FaliNotice&version=1.0&app_id=2016082100305706&sign_type=RSA2&timestamp=2017-12-06+17%3A58%3A21&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json" method="post"></form>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import store from 'store';
    import $api from 'api';
    export default {
        data(){
            return{
                payId: '',              // 付款单id
                isUse: false,           // 是否使用余额
                payMethod: 'ALIPAY',    // 支付方式
                myData: {},
                options:[
                    {
                        label: '支付宝支付',
                        value: 'ALIPAY'
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                // id: state => state.member.member.id,
                totalAmount: state => state.member.memberAccount.totalAmount
            })
        },
        methods:{
            // 获取数据
            getData() {
                this.$api.post('/oteao/payOrder/queryPayOrderById',{
                    payOrderId: this.payId
                },res => {
                    this.myData = res.data.payOrder;
                })
            },
            // 支付
            pay() {
                let method = this.payMethod;

                if(this.isUse) {
                    // 使用余额
                } else {
                    // 在线支付
                    if(method === 'ALIPAY') {
                        // 支付宝

                        this.$api.post('/payOrder/aliPay',{
                            payId: this.payId
                        },res => {
                            console.log(res);
                            let div = document.createElement('div');
                            div.innerHTML = res.data + ``;
                            document.body.appendChild(div);
                            document.forms[0].submit();
                            // console.log(document.forms[0])
                            // this.$refs.alipay.submit();
                            // document.body.innerHTML = `<script>alert(1)<\/script>`;
                        })

                    }
                }

            }

        },
        created(){
            this.payId = this.$route.query.payId;

            if(this.$tool.isWx) {
                this.payMethod = 'WECHAT';
                this.options = [
                    {
                        label: '微信支付',
                        value: 'WECHAT'
                    }
                ]
            }

            this.getData();
            if(this.totalAmount > 0) {
                this.isUse = true;
            }
        },
        beforeRouteEnter(to, from, next) {
            if(!to.query.payId) {
                return next(vm => {
                    vm.$router.go(-1);
                })
            }
            if(store.state.member.member.id) {
                next();
            } else {
                store.dispatch('getMemberData').then(res => {
                    next();
                }).catch(res =>{
                    next(vm => {
                        vm.$toast('出错啦~')
                    })
                })
            }
        }
    }
</script>
<style lang="less">
    @import "~@/styles/balance/cashier.less";
</style>