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
                        <img src="../../assets/images/logo.png" alt="" v-if="item.shopName === '自营'">
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
                        商品总额: <span class="gold">{{ item.totalProductAmountAfterPromotion | toFix2 }}</span>
                    </div>
                </section>
                <section class="pay-pannel">
                    <div class="express" @click="upPayType">
                        <div class="left">
                            <i class="icon-wuliu"></i> 支付配送
                        </div>
                        <div class="center">
                            <p>在线支付  {{ expressName[item.currentDeliveryMethod] }}</p>
                            <p>运费： <span class="gold">15.00</span></p>
                        </div>
                        <div class="right">
                            <i class="icon-xiangyou"></i>
                        </div>
                    </div>
                    <div class="redpacket" @click="upRedpacket" v-if="item.shopName === '自营'">
                        <div class="left">
                            红包
                        </div>
                        <div class="center">
                            -{{ myData.redPacketDeduction | toFix2   }}
                        </div>
                        <div class="right">
                            <i class="icon-xiangyou"></i>
                        </div>
                    </div>
                    <div class="redpacket-list-wrap" v-if="item.shopName === '自营'">
                        <div class="redpacket-list">
                            <div class="left">2017春节促销</div>
                            <div class="right">- 5.00</div>
                        </div>
                        <div class="redpacket-list">
                            <div class="left">2017春节促销</div>
                            <div class="right">- 5.00</div>
                        </div>
                        <div class="redpacket-list">
                            <div class="left">2017春节促销</div>
                            <div class="right">- 5.00</div>
                        </div>
                    </div>
                    <div class="remark">
                        <div class="left">备注</div>
                        <div class="right">
                            <input type="text" placeholder="对订单特殊要求进行描述" maxlength="50">
                            <p class="count">0/50</p>
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
            <mt-button type="default">提交订单</mt-button>
        </section>

        <!-- 选择快递弹出 -->
        <transition name="fadeUp" mode="out-in">
            <pay-type v-show="showPayType" @confirm="confirmPayType"></pay-type>
        </transition>

        <!-- 红包窗口 -->
        <transition name="fadeUp" mode="out-in">
            <redpacket-pannel v-show="showRedpacket" @close="closeRedpacket"></redpacket-pannel>
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
                cartList: '',               // 购物车id列表
                showPayType: false,         // 支付方式与快递弹窗
                showRedpacket: false,       // 红包弹窗
                timer: null,                // 返回顶部的定时器
                myData: {},                 // 结算数据,
                address: {},                // 地址数据
                expressName: {              // 快递名称
                    ship_ems: 'EMS',
                    ship_sf: '顺丰快递',
                    ship_sto: '申通快递'
                }
            }
        },
        computed: {
            pannel() {
                return this.myData.oteaoCart ? this.myData.oteaoCart : [];
            },
            ...mapState({
                id: state => state.member.member.id
            })
        },
        methods: {
            // 弹出付款方式弹窗
            upPayType() {
                this.showPayType = true;
            },
            // 点击付款方式弹窗的确定
            confirmPayType() {
                this.showPayType = false;
            },
            // 显示红包弹窗
            upRedpacket() {
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
            // 修改地址
            editAddress() {
                sessionStorage.setItem('edit',true);
                sessionStorage.setItem('cart',this.cartList);
                this.$router.push('/center/address');
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