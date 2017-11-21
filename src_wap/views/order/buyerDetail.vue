<template lang="html">
    <div class="detail">
        <div class="detail_type">
            <div class="type">
                <!-- 待发货 -->
                <div v-if="orderStatus === '待发货'"><img src="../../assets/images/order_3.png" />待发货</div>
                <!-- 待收货 -->
                <div v-if="orderStatus === '待收货'"><img src="../../assets/images/order_2.png" />待收货</div>
                <!-- 待付款 -->
                <div v-if="orderStatus === '待付款'"><img src="../../assets/images/order_4.png" />待付款</div>
                <!-- 待评价 -->
                <div v-if="orderStatus === '待评价'"><img src="../../assets/images/order_1.png" />待评价</div>
            </div>
            <div class="number">
                订单编号：MO201711080019
            </div>
        </div>
        <div class="detail_address">
            <div class="address">
                <div class="line_1">
                    <i class="iconfont">&#xe670;</i>
                    <span>陈薇薇薇</span>
                    <span>18012652595</span>
                </div>
                <div class="line_2">福建省 厦门市 思明区 会展南路4号109 4楼 醉品集团</div>
            </div>
            <div class="invoice">
                <div class="line_1">
                    <i class="iconfont">&#xe623;</i>
                    <span>增值税发票</span>
                </div>
                <div class="line_2" :class="{ 'on': pullOrDownFlag }">
                    <div class="line_content">
                        <div class="line_item">
                            <span>公司名称</span>
                            <span>厦门北斗七星科技有限公司厦门北斗七星科技有限公司</span>
                        </div>
                        <div class="line_item">
                            <span>公司名称</span>
                            <span>厦门北斗七星科技有限公司</span>
                        </div>
                    </div>
                    <div class="line_btn">
                        <i class="iconfont" @click="pullOrDown" :class="{ 'icon-single-down': !pullOrDownFlag,'icon-shang': pullOrDownFlag }"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="order">
            <div class="order_shop" v-if="!isThird">
                <img :src="shopLogo" /> 自营
            </div>
            <div class="order_shop" v-if="isThird">
                <i class="iconfont">&#xe66d;</i> 不可描述的店铺
            </div>
            <div class="order_wrapper">
                <div class="order_item">
                    <div class="order_head">
                        <div class="order_num">
                            6556460
                        </div>
                        <div class="order_express">
                            <img :src="sf.img" /> {{ sf.name }}
                            <span>1111111111</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderStatus: '待付款',
            pullOrDownFlag: false,
            shopLogo: '../src_wap/assets/images/list_logo.png',
            isThird: false,
            sf: {
                img: '../src_wap/assets/images/sfkd.png',
                name: '顺丰快递'
            },
            st: {
                img: '../src_wap/assets/images/stkd.png',
                name: '申通快递'
            },
            ems: {
                img: '../src_wap/assets/images/emskd.png',
                name: 'EMS快递'
            }
        }
    },
    methods: {
        pullOrDown() {
            this.pullOrDownFlag = !this.pullOrDownFlag;
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/order/detail.less';
</style>
