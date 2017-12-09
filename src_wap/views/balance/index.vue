<template>
    <div id="balance">
        <div class="main-top" ref="main">
            <div class="address">
                <div class="left"><i class="icon-dizhi"></i></div>
                <div class="center">
                    <p class="user">{{ address.recName }} &nbsp;&nbsp; {{ address.mobilePhone }}</p>
                    <p>{{ (address.provinceName + address.cityName + address.areaName + address.detailAddress) || '&nbsp;' }}</p>
                </div>
                <div class="right" @click="editAddress"><i class="icon-icon07"></i></div>
            </div>

            <template v-for="(item,index) in pannel">
                <section class="goods-pannel">
                    <div class="title">
                        <img src="../../assets/images/logo.png" alt="" v-if="item.selfSupport === true">
                        {{ item.shopName }}
                    </div>
                    <template v-for="(todo,i) in item.cartList">
                        <div class="goods-item">
                            <goods-img style="width:1.6rem;height:1.6rem;" :imgUrl="todo.imageUrl"></goods-img>
                            <div class="right">
                                <p class="goods-title">{{ todo.proName }}</p>
                                <p class="goods-bd">
                                    <span class="price">￥{{ todo.priorityPrice | toFix2  }}</span>
                                    <span class="num">×{{ todo.buyNum }}</span>
                                </p>
                            </div>
                        </div>
                    </template>
                    <template v-if="item.giftList && item.giftList.length > 0">
                        <div class="pro_free_caption">
                            <span class="full_free">满赠</span>
                            <span>满358元送金骏眉</span>
                        </div>
                        <div class="goods-item" v-for="(todo,i) in item.giftList">
                            <goods-img style="width:1.6rem;height:1.6rem;" :imgUrl="todo.imageUrl"></goods-img>
                            <div class="right">
                                <p class="goods-title">{{ todo.proName }}</p>
                                <p class="goods-bd">
                                    <span class="price">￥{{ todo.actualPayPrice | toFix2  }}</span>
                                    <span class="num">×{{ todo.buyNum }}</span>
                                </p>
                            </div>
                        </div>
                    </template>
                    <div class="sum">
                        商品总额: <span class="gold">{{ item.totalProductAmount | toFix2 }}</span>
                    </div>
                </section>
                <section class="pay-pannel">
                    <div class="express" @click="upPayType(index)">
                        <div class="left">
                            <i class="icon-wuliu"></i> 支付配送
                        </div>
                        <div class="center">
                            <p>{{ payMethods[item.currentPayMethod] }}  {{ expressName[item.currentDeliveryMethod] }}</p>
                            <!-- 运费 -->
                            <p v-if="item.selfSupport === true">运费： 
                                <template v-if="item.currentPayMethod === 'ONLINE'">
                                    <span class="gold">{{ item.payAndDeliveryAndfreightMap.ONLINE[item.currentDeliveryMethod] | toFix2  }}</span>
                                </template> 
                                <template v-else>
                                    <span class="gold">{{ item.payAndDeliveryAndfreightMap.CASH_DELIVERY[item.currentDeliveryMethod] | toFix2  }}</span>
                                </template>
                            </p>
                            <p v-else>运费： <span class="gold">{{ item.shopExpress | toFix2  }}</span></p>
                        </div>
                        <div class="right">
                            <i class="icon-xiangyou"></i>
                        </div>
                    </div>
                    <div class="redpacket" @click="upRedpacket(index)" v-if="item.selfSupport === true">
                        <div class="left">
                            红包
                        </div>
                        <div class="center">
                            - {{ item.redPacketDeduction | toFix2   }}
                        </div>
                        <div class="right">
                            <i class="icon-xiangyou"></i>
                        </div>
                    </div>
                    <div class="redpacket-list-wrap" v-if="item.selfSupport === true">
                        <div class="redpacket-list" v-for="(todo,i) in item.canUseRuleSetList">
                            <div class="left">{{ todo.showName }}</div>
                            <div class="right">- {{ todo.giveNum | toFix2 }}</div>
                        </div>
                    </div>
                    <div class="remark">
                        <div class="left">备注</div>
                        <div class="right">
                            <input type="text" placeholder="对订单特殊要求进行描述" maxlength="50" v-model="item.remark">
                            <p class="count">{{ item.remark.length }}/50</p>
                        </div>
                    </div>
                </section>
            </template>

            <!-- 发票，暂时不做 -->
            <!-- <section class="invoice-pannel">
                <div class="invoice">
                    <div class="left">
                        发票信息
                    </div>
                    <div class="center">
                        不开发票
                    </div>
                    <div class="right">
                        <i class="icon-xiangyou"></i>
                    </div>
                </div>
                <div class="remark">
                    <div class="left">备注</div>
                    <div class="right">
                        <input type="text" placeholder="对订单特殊要求进行描述" maxlength="50">
                        <p class="count">0/50</p>
                    </div>
                </div>
            </section> -->


            <section class="bd-address" @click="gotoTop">
                收货地址：{{ (address.provinceName + address.cityName + address.areaName + address.detailAddress) || '&nbsp;' }}&nbsp;&nbsp;&nbsp;&nbsp;{{ address.recName }} {{ address.mobilePhone }}
            </section>
        </div>
        <section class="save-order">
            <p class="price">应付：<span class="gold">￥{{ totalPrice | toFix2 }}</span></p>
            <mt-button type="default" :disabled="disabled" @click="upOrder">提交订单</mt-button>
        </section>

        <!-- 选择快递弹出 -->
        <transition name="fadeUp" mode="out-in">
            <pay-type v-show="showPayType" @confirm="confirmPayType" ref="payType"></pay-type>
        </transition>

        <!-- 红包窗口 -->
        <transition name="fadeUp" mode="out-in">
            <redpacket-pannel v-show="showRedpacket" @close="closeRedpacket" ref="redpacket"></redpacket-pannel>
        </transition>
    </div>
</template>

<script>
    import payType from './payType.vue';
    import redpacketPannel from './repacketPannel.vue'
    import { mapState } from 'vuex'
    import store from 'store';
    export default{
        components: {
            payType,
            redpacketPannel
        },
        data() {
            return {
                disabled: true,             // 禁用提交按钮
                payMethods: {               // 支付方式
                    CASH_DELIVERY: '货到付款',
                    ONLINE: '在线支付'
                },
                cartList: '',               // 购物车id列表
                showPayType: false,         // 支付方式与快递弹窗
                showRedpacket: false,       // 红包弹窗
                timer: null,                // 返回顶部的定时器
                myData: {},                 // 结算数据,
                address: {},                // 地址数据
                expressName: {              // 快递名称
                    ship_ems: 'EMS',
                    ship_sf: '顺丰快递',
                    ship_sto: '申通快递',
                    ship_express: '快递配送',
                    ship_self_pickup: '门店自提'
                },
                activePannel: {},           // 当前激活的店铺
            }
        },
        computed: {
            // 店铺面板
            pannel() {
                return this.myData.oteaoCart ? this.myData.oteaoCart : [];
            },
            // 总计价钱
            totalPrice() {
                let math = this.$tool.math;
                let sum = 0;
                this.pannel.forEach(val => {
                    sum = math.add(sum,val.totalProductAmountAfterPromotion);
                    // 计算运费
                    let map = val.payAndDeliveryAndfreightMap;
                    if(val.currentPayMethod === 'ONLINE') {
                        let price = map['ONLINE'][val.currentDeliveryMethod];
                        sum = math.add(sum,price);
                    } else {
                        let price = map['CASH_DELIVERY'][val.currentDeliveryMethod];
                        sum = math.add(sum,price);
                    }
                })
                return sum;
            },
            ...mapState({
                id: state => state.member.member.id,
                totalAmount: state => state.member.memberAccount.totalAmount
            })
        },
        methods: {
            // 弹出付款方式弹窗
            upPayType(index) {
                this.activePannel = this.pannel[index];
                this.$refs.payType.setActive(this.activePannel)
                this.showPayType = true;
            },
            // 点击付款方式弹窗的确定
            confirmPayType() {
                this.showPayType = false;
            },
            // 显示红包弹窗
            upRedpacket(index) {
                this.activePannel = this.pannel[index];
                this.$refs.redpacket.setActive(this.activePannel);
                this.showRedpacket = true;
            },
            // 红包弹窗关闭时，不管确定还是取消
            closeRedpacket(data) {
                this.showRedpacket = false;
                if(data === 'confirm') {
                    this.upDate();
                }
            },
            // 点击底下地址返回顶部
            gotoTop() {
                let top = this.$refs.main.scrollTop;
                this.timer = setInterval(() => {
                    top -= 50;
                    if(top <=0 ){
                        top = 0;
                        clearInterval(this.timer);
                    }
                    this.$refs.main.scrollTop = top
                },16)
            },
            // 初始化数据
            initData() {
                return new Promise((resolve,reject) => {
                    this.$api.post('/oteao/shoppingCart/initSettle',{
                        cartIds: this.cartList,
                        device: 'WAP'
                    },res => {
                        let shopList = res.data.oteaoCart;
                        // 设置备注
                        shopList.forEach(val => {

                            val.remark = '';

                        });
                        this.disabled = false;
                        this.myData = res.data;
                        resolve(res)
                    },res => {
                        if(res.code === 4065) {
                            this.$toast(res.message);
                        }
                        this.$router.go(-1)
                    })
                })
            },
            // 更新数据
            upDate() {

                let orgSettleRequestList = [];
                // 遍历每个店铺，更新数据
                this.pannel.forEach(val => {
                    orgSettleRequestList.push({
                        "deliveryMethodCode": val.currentDeliveryMethod,
                        "invoiceCode": "NOT_INVOICE",
                        "invoiceTitle": "string",
                        "isUseIntegral": 0,
                        "orderRemark": val.remark,
                        "payMethodCode": val.currentPayMethod,
                        "sellerOrgId": val.orgId,
                        "useRedPacketId": val.useRedPacketId
                    })
                })


                let data = {
                    "cartIds": this.cartList,
                    "device": "WAP",
                    orgSettleRequestList,
                    "receiveAddrId": this.address.id,
                    "sysId": 1,
                    "useBackBalance": 0,
                    "useStoreBalance": 0
                }

                this.$api.post('/oteao/shoppingCart/settle',JSON.stringify(data),res => {

                    // 恢复之前的订单备注
                    res.data.oteaoCart.forEach((val,i) => {
                        val.remark = this.getRemark()[i];
                    })
                    this.myData = res.data;

                })
            },
            // 提交订单
            upOrder() {
                let orgSettleRequestList = [];

                // 表示货到付款还是在线支付
                let online = false,delivery = false;

                // 遍历每个店铺，更新数据
                this.pannel.forEach(val => {
                    orgSettleRequestList.push({
                        "deliveryMethodCode": val.currentDeliveryMethod,
                        "invoiceCode": "NOT_INVOICE",
                        "invoiceTitle": "string",
                        "isUseIntegral": 0,
                        "orderRemark": val.remark,
                        "payMethodCode": val.currentPayMethod,
                        "sellerOrgId": val.orgId,
                        "useRedPacketId": val.useRedPacketId
                    })

                    // 获取支付状态 在线or货到付款
                    if(val.currentPayMethod === 'ONLINE') {
                        online = true;
                    } else {
                        delivery = true;
                    }


                })
                
                let data = {
                    "cartIds": this.cartList,
                    "device": "WAP",
                    orgSettleRequestList,
                    "receiveAddrId": this.address.id,
                    "sysId": 1,
                    "useBackBalance": 0,
                    "useStoreBalance": 0
                }
                // 禁用提交按钮，防止重复提交
                this.disabled = true;




                this.$api.post('/oteao/shoppingCart/submitOrder',JSON.stringify(data),res => {

                    // 都是在线支付
                    if(online && !delivery) {
                        this.$router.push({name: '收银台',query: {payId: res.data.payId,type:'online'}});
                    }

                    // 货到付款
                    if(!online && delivery) {
                        if(this.totalAmount > 0) {
                            this.$router.push({name: '结算显示',query: {payId: res.data.payId,type:'delivery'}});
                        } else {
                            this.$router.push({name: '货到付款结算',query: {payId: res.data.payId,type:'delivery'}});
                        }
                    }

                    // 在线支付 + 货到付款
                    if(online && delivery) {
                        this.$router.push({name: '货到付款结算',query: {payId: res.data.payId,type:'onlineanddelivery'}});
                    }

                })
            },
            // 修改地址
            editAddress() {
                sessionStorage.setItem('edit',true);
                sessionStorage.setItem('cart',this.cartList);
                this.backupsData();
                this.$router.push('/center/address');
            },
            // 得到备注
            getRemark() {
                return this.pannel.map(val => {
                    return val.remark;
                })
            },
            // 备份数据
            backupsData() {
                // 离开当前页去改地址与发票需要备份备注，红包以及付款方式

                // 备注
                sessionStorage.setItem('remark',JSON.stringify(this.getRemark()));

                // 激活的红包
                sessionStorage.setItem('redpacket',JSON.stringify(this.pannel.map(val => val.useRedPacketId)));

                // 支付方式
                sessionStorage.setItem('paymethod',JSON.stringify(this.pannel.map(val => val.currentPayMethod)));

                // 快递方式
                sessionStorage.setItem('express',JSON.stringify(this.pannel.map(val => val.currentDeliveryMethod)));

            },
            // 恢复数据
            recoveryData() {
                let remark = JSON.parse(sessionStorage.remark);
                let redpacket = JSON.parse(sessionStorage.redpacket);
                let paymethod = JSON.parse(sessionStorage.paymethod);
                let express = JSON.parse(sessionStorage.express);


                this.pannel.forEach((val, i) => {
                    val.remark = remark[i];
                    val.useRedPacketId = redpacket[i];
                    val.currentPayMethod = paymethod[i];
                    val.currentDeliveryMethod = express[i];
                })

                delete sessionStorage.remark;
                delete sessionStorage.redpacket;
                delete sessionStorage.paymethod;
                delete sessionStorage.express;

            }
        },
        created() {
            this.cartList = this.$route.query.cart;
            sessionStorage.setItem('edit',false);
            this.initData().then(res => {

                // 判断是不是去修改地址
                let cart = sessionStorage.cart;
                let address = sessionStorage.address;

                if(this.cartList === cart && address) {
                    this.address = JSON.parse(address);
                    delete sessionStorage.cart;
                    delete sessionStorage.address;
                    this.recoveryData();
                    this.upDate();
                } else {
                    this.address = this.myData.receiveAddrList.filter(val => val.isDefault)[0]
                }
            })
        },
        beforeRouteEnter(to, from, next){

            // 先获取会员的id
            if(!store.state.member.member.id) {
                store.dispatch('getMemberData').then((res) => {
                    next();
                }).catch(res => {
                    if(res.code === 2000){
                        next(vm => {
                            vm.$router.go(-1);
                        })
                    }
                })
            } else {
                next();
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('~@/styles/balance/index.less');
</style>