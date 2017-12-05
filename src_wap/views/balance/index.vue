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
                                    <span class="price">￥{{ todo.actualPayPrice | toFix2  }}</span>
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
                            - {{ myData.redPacketDeduction | toFix2   }}
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
            <p class="price">应付：<span class="gold">￥{{ myData.proTotalAmount | toFix2 }}</span></p>
            <mt-button type="default" :disabled="disabled">提交订单</mt-button>
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

            },
            ...mapState({
                id: state => state.member.member.id
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
                            this.$router.go(-1)
                        }
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
                        "useRedPacketId": 0
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
            // 修改地址
            editAddress() {
                sessionStorage.setItem('edit',true);
                sessionStorage.setItem('cart',this.cartList);
                sessionStorage.setItem('remark',JSON.stringify(this.getRemark()))
                this.$router.push('/center/address');
            },
            // 得到备注
            getRemark() {
                return this.pannel.map(val => {
                    return val.remark;
                })
            },
            setRemark(data) {
                this.pannel.forEach((val, i) => {
                    val.remark = data[i];
                })
            }
        },
        created() {
            this.cartList = this.$route.query.cart;
            sessionStorage.setItem('edit',false);
            this.initData().then(res => {

                // 判断是不是去修改地址
                let cart = sessionStorage.cart;
                let address = sessionStorage.address;
                let remark = sessionStorage.remark;

                if(this.cartList === cart && address) {
                    this.address = JSON.parse(address);
                    this.setRemark(JSON.parse(remark));
                    delete sessionStorage.cart;
                    delete sessionStorage.address;
                    delete sessionStorage.remark;
                    this.upDate();
                } else {
                    this.address = this.myData.receiveAddrList.filter(val => val.isDefault)[0]
                }
            })
        }
    }
</script>


<style lang="less" scoped>
    @import url('~@/styles/balance/index.less');
</style>