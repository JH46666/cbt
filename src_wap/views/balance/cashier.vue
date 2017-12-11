<template>
    <div class="cashier_wrapper">
        <div class="flex cashier-caption">
            <p class="flex-1 color_6">应付</p>
            <p class="flex-1 algin_r color_f08">￥{{ myData.orderSum | toFix2 }}</p>
        </div>
        <div class="floor1" v-if="totalAmount > 0">
            <p class="remaining color_6">余额 <span class="color_9">￥{{ totalAmount | toFix2 }}</span></p>
            <ul class="flex use_box">
                <li class="flex-1" @click="isUse = true" :class="{'on': isUse}">使用 ￥{{ totalAmount > myData.orderSum ? myData.orderSum : totalAmount | toFix2 }}</li>
                <li class="flex-1" @click="isUse = false" :class="{'on': !isUse}">不使用</li>
            </ul>
        </div>
        <div class="floor2" :class="{iswx: $tool.isWx}" v-if="totalAmount < myData.orderSum || isUse === false">
            <mt-radio
                align="right"
                title="选择支付方式"
                v-model="payMethod"
                :options="options">
            </mt-radio>
        </div>
        <div class="floor3"><button class="confirm-pay" @click="pay" :disabled="disabled">确定支付 <span>￥{{ myData.orderSum | toFix2 }}</span></button></div>
        <div id="form" v-html="form"></div>
        <a :href="wxhost" ref="wxhost"></a>
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
                    },
                    {
                        label: '微信支付',
                        value: 'WECHAT'
                    }
                ],
                form: '',
                wxhost: '',             // 微信回调
                disabled: false
            }
        },
        computed: {
            ...mapState({
                // id: state => state.member.member.id,
                totalAmount: state => state.member.memberAccount.totalAmount,
                id: state => state.member.member.id
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
                this.disabled = true;

                if(this.isUse) {
                    // 使用余额

                    
                    // 使用余额支付的话需要判断当前的余额是否够用，需要配合在线支付

                    this.$api.post('/oteao/payOrder/modityOrderStoreValue',{
                        payOrderId: this.payId,
                    },res => {

                        if(res.data.orderSum > 0) {
                            // 余额不够了,还需配合在线支付
                            payUp.call(this)

                        } else {
                            // 交易成功
                            this.$router.push({name: '结算显示',query:{payId:this.payId}})
                        }
                    })




                } else {
                    payUp.call(this)
                }

                // 在线支付，支付宝or微信
                function payUp() {
                    // 在线支付
                    if(method === 'ALIPAY') {
                        // 支付宝

                        this.$api.post('/payOrder/aliPay',{
                            payId: this.payId,
                            device: 'WAP'
                        },res => {
                            // 过滤传过来的script标签
                            let str = res.data.replace(/<script.*?>.*?<\/script>/ig, '');
                            this.form = str;
                            this.$nextTick(() =>{
                                document.forms[0].submit();
                            })
                        })
                    } else {
                        // 微信支付

                        // 微信支付需要判断是在浏览器还是微信内

                        let isWx = this.$tool.isWx;
                        if(isWx) {
                            // 微信内部
                            this.$api.post('/payOrder/wxPay',{
                                payId: this.payId,
                                ip: '192.168.1.1',
                                tradeType: 'JSAPI'
                            },res => {
                                function onBridgeReady(){
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest', {
                                            "appId":res.data.appid,     //公众号名称，由商户传入     
                                            "timeStamp":res.data.timeStamp,         //时间戳，自1970年以来的秒数     
                                            "nonceStr":res.data.nonce_str, //随机串  
                                            "package": `prepay_id=${res.data.prepay_id}`,
                                            "signType":"HMACSHA256",         //微信签名方式：     
                                            "paySign":res.data.sign //微信签名 
                                        },
                                        function(res){     
                                            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                                return alert('支付成功')
                                            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                                            alert(JSON.stringify(res))
                                        }
                                    ); 
                                }
                                if (typeof WeixinJSBridge == "undefined"){
                                    if( document.addEventListener ){
                                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                    }else if (document.attachEvent){
                                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                    }
                                }else{
                                    onBridgeReady();
                                }
                            },res => {
                                alert(JSON.stringify(res))
                                // window.location = res.data.mweb_url;
                            })


                        } else {
                            // 在浏览器
                            this.$api.post('/payOrder/wxPay',{
                                payId: this.payId,
                                ip: '192.168.1.1',
                                tradeType: 'MWEB'
                            },res => {
                                let src = res.data.mweb_url + `&redirect_url=` + encodeURI(location.origin + `/?wxpaycallback=${this.payId}`);
                                this.wxhost = src;
                                this.$nextTick(() =>{
                                    this.$refs.wxhost.click();
                                })
                            },res => {
                                let src = res.data.mweb_url + `&redirect_url=` + encodeURI(location.origin + `/?wxpaycallback=${this.payId}`);
                                this.wxhost = src;
                                this.$nextTick(() =>{
                                    this.$refs.wxhost.click();
                                })
                            })
                        }

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
            if(store.state.member.member.id) {
                next();
            } else {
                store.dispatch('getMemberData').then(res => {
                    next();
                }).catch(res =>{
                    next(vm => {
                        vm.router.push('/login')
                    })
                })
            }
        }
    }
</script>
<style lang="less">
    @import "~@/styles/balance/cashier.less";
</style>