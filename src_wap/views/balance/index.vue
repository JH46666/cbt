<template>
    <div id="balance">
        <div class="main-top" ref="main">
            <div class="address">
                <div class="left"><i class="icon-dizhi"></i></div>
                <div class="center">
                    <p class="user">陈伟欸 &nbsp;&nbsp; 18006062601</p>
                    <p>很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址</p>
                </div>
                <div class="right"><i class="icon-icon07"></i></div>
            </div>

            <section class="goods-pannel">
                <div class="title">
                    <img src="../../assets/images/logo.png" alt="">
                    自营
                </div>
                <div class="goods-item">
                    <goods-img style="width:1.6rem;height:1.6rem;"></goods-img>
                    <div class="right">
                        <p class="goods-title">醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型</p>
                        <p class="goods-bd">
                            <span class="price">￥500</span>
                            <span class="num">×1</span>
                        </p>
                    </div>
                </div>
                <div class="pro_free_caption">
                    <span class="full_free">满赠</span>
                    <span>满358元送金骏眉</span>
                </div>
                <div class="goods-item">
                    <goods-img style="width:1.6rem;height:1.6rem;"></goods-img>
                    <div class="right">
                        <p class="goods-title">醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型</p>
                        <p class="goods-bd">
                            <span class="price">￥0.00</span>
                            <span class="num">×1</span>
                        </p>
                    </div>
                </div>
                <div class="sum">
                    商品总额: <span class="gold">1314.00 + 111积分</span>
                </div>
            </section>

            <section class="pay-pannel">
                <div class="express" @click="upPayType">
                    <div class="left">
                        <i class="icon-wuliu"></i> 支付配送
                    </div>
                    <div class="center">
                        <p>在线支付  申通快递</p>
                        <p>运费： <span class="gold">15.00</span></p>
                    </div>
                    <div class="right">
                        <i class="icon-xiangyou"></i>
                    </div>
                </div>
                <div class="redpacket" @click="upRedpacket">
                    <div class="left">
                        红包
                    </div>
                    <div class="center">
                        -10.00
                    </div>
                    <div class="right">
                        <i class="icon-xiangyou"></i>
                    </div>
                </div>
                <div class="redpacket-list-wrap">
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

            <section class="invoice-pannel">
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
            </section>

            <section class="goods-pannel">
                <div class="title">
                    <i class="icon-dianpu"></i>
                    这是一家第三发地铺
                </div>
                <div class="goods-item">
                    <goods-img style="width:1.6rem;height:1.6rem;"></goods-img>
                    <div class="right">
                        <p class="goods-title">醉品朴茶 安溪铁观音2017</p>
                        <p class="goods-bd">
                            <span class="price">￥500</span>
                            <span class="num">×1</span>
                        </p>
                    </div>
                </div>
                <div class="sum">
                    商品总额: <span class="gold">1314.00 + 111积分</span>
                </div>
            </section>

            <section class="bd-address" @click="gotoTop">
                收货地址：横穿横穿横穿横穿横穿横穿横穿横穿横穿横穿横穿横穿横穿横穿&nbsp;&nbsp;&nbsp;&nbsp;陈校团 18206062601
            </section>
        </div>
        <section class="save-order">
            <p class="price">应付：<span class="gold">￥1813.00</span></p>
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
    export default{
        components: {
            payType,
            redpacketPannel
        },
        data() {
            return {
                showPayType: false,         // 支付方式与快递弹窗
                showRedpacket: false,       // 红包弹窗
                timer: null,                // 返回顶部的定时器
            }
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
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('~@/styles/balance/index.less');
</style>