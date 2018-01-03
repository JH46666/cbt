<template>
    <div class="cashier_wrapper">
        <div class="flex cashier-caption">
            <p class="flex-1 color_6">应付</p>
            <p class="flex-1 algin_r color_f08">￥{{ $route.query.type === 'onlineanddelivery' ? myData.orderSum - myData.cashDeliverySum : myData.orderSum | toFix2 }}</p>
        </div>
        <div class="floor1" v-if="totalAmount > 0">
            <p class="remaining color_6">余额 <span class="color_9">￥{{ totalAmount | toFix2 }}</span></p>
            <ul class="flex use_box">
                <li class="flex-1" @click="isUse = true" :class="{'on': isUse}">使用 ￥{{ totalAmount > usePrice ? usePrice : totalAmount | toFix2 }}</li>
                <li class="flex-1" @click="isUse = false" :class="{'on': !isUse}">不使用</li>
            </ul>
        </div>
        <div class="floor2" :class="{iswx: $tool.isWx}" v-if="( ($route.query.type === 'onlineanddelivery' ?  totalAmount < myData.orderSum - myData.cashDeliverySum : totalAmount < myData.orderSum) || isUse === false) && $route.query.type !== 'delivery'">
            <mt-radio
                align="right"
                title="选择支付方式"
                v-model="payMethod"
                :options="options">
            </mt-radio>
        </div>
        <div class="floor3"><button class="confirm-pay" @click="pay" :disabled="disabled">确定支付 <span>￥{{ comfirnPrice | toFix2 }}</span></button></div>
        <div id="form" v-html="form"></div>
        <a :href="wxhost" ref="wxhost"></a>
        <div class="juhua" v-if="loading">
            <img src="../../assets/images/loading.gif" alt="">
            <p>正在提交，请稍等~</p>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import store from 'store';
    import $api from 'api';
    export default {
        data(){
            return{
                type: '',               // 支付方式
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
                disabled: false,
                loading: false,         
            }
        },
        computed: {
            ...mapState({
                // id: state => state.member.member.id,
                totalAmount: state => state.member.memberAccount.totalAmount,
                id: state => state.member.member.id
            }),
            comfirnPrice() {
                try {
                    let orderSum = this.$route.query.type === 'onlineanddelivery' ? this.myData.orderSum - this.myData.cashDeliverySum : this.myData.orderSum;
                    if(this.isUse) {
                        if(this.totalAmount > orderSum) {
                            return orderSum
                        } else {
                            if(this.$route.query.type === 'delivery') {
                                return this.totalAmount
                            } else {
                                return orderSum - this.totalAmount
                            }
                        }
                    } else {
                        return orderSum
                    }
                } catch (error) {
                    return 0
                }
            },
            // 要支付的金额
            usePrice() {
                return this.$route.query.type === 'onlineanddelivery' ? this.myData.orderSum - this.myData.cashDeliverySum : this.myData.orderSum
            }
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
                    this.loading = true;
                    this.$api.post('/oteao/payOrder/modityOrderStoreValue',{
                        payOrderId: this.payId,
                    },res => {
                        this.$store.dispatch('getMemberData');
                        if(res.data.orderSum > 0) {
                            // 余额不够了,还需配合在线支付
                            // 需要判断是不是纯货到付款，如果是，就不需要在线支付了
                            if(this.$route.query.type === 'delivery') {
                                this.$router.push({name: '货到付款成功',query: {payId:this.payId,type:'delivery'}});
                            } else {
                                payUp.call(this)
                            }
                        } else {
                            // 交易成功
                            this.$router.push({name: '结算显示',query:{payId:this.payId}})
                        }
                    })

                } else {

                    if(this.$route.query.type === 'delivery') {
                        this.$router.push({name: '货到付款成功',query: {payId:this.payId,type:'delivery'}});
                    } else {
                        payUp.call(this)
                    }

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
                                // 调试专用，通过地址栏传值
                                /*let data = {
                                    "appId":this.$route.query.appId,     //公众号名称，由商户传入
                                    "timeStamp":this.$route.query.timeStamp,         //时间戳，自1970年以来的秒数
                                    "nonceStr":this.$route.query.nonceStr, //随机串
                                    "package": `prepay_id=${this.$route.query.package}`,
                                    "signType":this.$route.query.signType,         //微信签名方式：
                                    "paySign":this.$route.query.paySign //微信签名
                                }*/
                                // return alert(JSON.stringify(res.data.h5pay));
                                let data = JSON.parse(res.data.h5pay);
                                let self = this;
                                function onBridgeReady(){
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest', {
                                            "appId": data.appid,     //公众号名称，由商户传入
                                            "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数
                                            "nonceStr": data.nonceStr, //随机串
                                            "package":  data.packageWithPrepayId,
                                            "signType":  data.signType, //微信签名方式：
                                            "paySign": data.paySign //微信签名
                                        },
                                        /*'getBrandWCPayRequest', data,*/
                                        function(res){
                                            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                                return self.$router.push({name: '结算显示',query:{payId: self.payId}})
                                            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                            return self.$router.push({name: '结算显示',query:{payId: self.payId,fail:true,type: self.$route.query.type}})
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
                                this.$router.push({name: '结算显示',query:{payId: this.payId,fail:true,type: this.$route.query.type}})
                                // window.location = res.data.mweb_url;
                            })


                        } else {
                            // 在浏览器
                            this.$api.post('/payOrder/wxPay',{
                                payId: this.payId,
                                ip: '192.168.1.1',
                                tradeType: 'MWEB'
                            },res => {


                                // 某些浏览器重定向问题，这个地方需要写入session，用来唤醒弹框
                                // sessionStorage.h5wxpay = true;
                                // sessionStorage.payId = this.payId;
                                let src = res.data.mweb_url;
                                if(this.$tool.isiOS) {
                                    src += `&redirect_url=` + encodeURI(location.origin + `/?wxpaycallback=${this.payId}+${this.$route.query.type}`);
                                }
                                if(this.$tool.isAndroid) {
                                    setTimeout(() => {
                                        this.$messageBox({
                                            title:'提示',
                                            message:`是否完成支付?`,
                                            showCancelButton: true,
                                            cancelButtonText: '更换支付方式',
                                            confirmButtonText: '完成支付'
                                        }).then(res => {
                                            if(res === 'cancel') {
                                                this.loading = false;
                                                this.disabled = false;
                                            } else {
                                                this.$router.push({name: '结算显示',query:{payId: this.payId,wx: 'wxpaycallback',type: this.$route.query.type}})
                                            }
                                        })
                                    },2000)
                                }
                                this.wxhost = src;
                                this.$nextTick(() =>{
                                    this.$refs.wxhost.click();
                                })
                            },res => {
                                this.$toast(res.message)
                            })
                        }

                    }
                }

            }

        },
        created(){
            // 设置title
            this.$store.commit('SET_TITLE','收银台');

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
            this.type = this.$route.query.type;
            // alert(this.payId)
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
