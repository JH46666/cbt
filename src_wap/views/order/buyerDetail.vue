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
                    <span>{{ regStar('18012652595') }}</span>
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
            <!-- 店铺名称 是否自营 -->
            <div class="order_shop" v-if="!isThird">
                <img :src="shopLogo" /> 自营
            </div>
            <div class="order_shop" v-if="isThird">
                <i class="iconfont">&#xe66d;</i> 不可描述的店铺
            </div>
            <div class="order_address" v-if="isThird" :class="{ 'on': pullOrDownShop }">
                <div class="order_address_1">
                    <div class="order_address_num">
                        556226452
                    </div>
                    <div class="order_address_icon">
                        自提
                        <span @click="pullOrDownShopMethod">门店地址<i class="iconfont" :class="{ 'icon-single-down': !pullOrDownShop,'icon-shang': pullOrDownShop }"></i></span>
                    </div>
                </div>
                <div class="order_address_2">
                    <div class="order_addrss_text">
                        提货地址：西安市新城区长乐路高德茶业茶帮通运营中心
                    </div>
                    <div class="order_addrss_tel">
                        联系电话：<a href="tel://17656565656">17656565656</a>
                    </div>
                </div>
            </div>
            <!-- 订单列表 -->
            <div class="order_wrapper">
                <div class="order_item">
                    <div class="order_head" v-if="!isThird">
                        <div class="order_num">
                            6556460
                        </div>
                        <div class="order_express">
                            <img :src="sf.img" /> {{ sf.name }}
                            <span>1111111111</span>
                        </div>
                    </div>
                    <div class="list_wrapper">
                        <div class="list_item">
                            <div class="list_img">
                                <img src="../../assets/list_img.png" alt="">
                            </div>
                            <div class="list_content">
                                <p>醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型</p>
                                <div class="list_price_count">
                                    <span>￥500</span>
                                    <span>x23</span>
                                </div>
                            </div>
                        </div>
                        <div class="list_item">
                            <div class="list_img">
                                <img src="../../assets/list_img.png" alt="">
                            </div>
                            <div class="list_content">
                                <p>醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型</p>
                                <div class="list_price_count">
                                    <span>￥500</span>
                                    <span>x23</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                    <div class="list_wrapper">
                        <div class="list_item">
                            <div class="list_img">
                                <img src="../../assets/list_img.png" alt="">
                            </div>
                            <div class="list_content">
                                <p>醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型</p>
                                <div class="list_price_count">
                                    <span>￥500</span>
                                    <span>x23</span>
                                </div>
                            </div>
                        </div>
                        <div class="list_item">
                            <div class="list_img">
                                <img src="../../assets/list_img.png" alt="">
                            </div>
                            <div class="list_content">
                                <p>醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型</p>
                                <div class="list_price_count">
                                    <span>￥500</span>
                                    <span>x23</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 价格总 -->
        <div class="order_price">
            <div class="order_price_detail">
                <div class="price_detail_item">
                    <span>商品总价</span>
                    <span>￥756.00</span>
                </div>
                <div class="price_detail_item">
                    <span>红包抵扣</span>
                    <span>-￥756.00</span>
                </div>
                <div class="price_detail_item">
                    <span>浙江温州江南皮革厂大甩卖</span>
                    <span>-￥10.00</span>
                </div>
                <div class="price_detail_item">
                    <span>积分抵扣</span>
                    <span>-1000积分</span>
                </div>
                <div class="price_detail_item">
                    <span>运费</span>
                    <span>0.00</span>
                </div>
                <div class="price_detail_item">
                    <span>订单总价</span>
                    <span>￥756.00</span>
                </div>
            </div>
            <div class="order_price_total">
                <div class="price_total_item">
                    <span>返积分：686分</span>
                    <span>余额支付：￥56.00</span>
                </div>
                <div class="price_total_item">
                    <span>￥653.00</span>实际付款：
                </div>
            </div>
        </div>
        <!-- 下单时间 -->
        <div class="order_date">
            <div class="order_date_item">
                <span>下单时间</span>
                <span>2017-03-08 15:57:15</span>
            </div>
            <div class="order_date_item">
                <span>付款时间</span>
                <span>2017-03-08 15:57:15</span>
            </div>
            <div class="order_date_item">
                <span>发货时间</span>
                <span>2017-03-08 15:57:15</span>
            </div>
            <div class="order_date_item">
                <span>收货时间</span>
                <span>2017-03-08 15:57:15</span>
            </div>
            <div class="order_date_item">
                <span>评价时间</span>
                <span>2017-03-08 15:57:15</span>
            </div>
            <div class="order_date_item">
                <span>取消时间</span>
                <span>2017-03-08 15:57:15</span>
            </div>
        </div>
        <!-- 按钮 -->
        <div class="order_btn">
            <mt-button plain v-if="orderStatus === '待审核' || orderStatus === '待评价' || orderStatus === '待发货'" @click.native="confrimMethod">再次购买</mt-button>
            <mt-button plain v-if="orderStatus === '待评价'" @click.native="confrimMethod">评价</mt-button>
            <mt-button plain v-if="orderStatus === '待付款'" @click.native="confrimMethod">取消订单</mt-button>
            <mt-button plain v-if="orderStatus === '待付款'" class="pay_now" @click.native="confrimMethod">立即支付</mt-button>
            <mt-button plain v-if="orderStatus === '已发货'" @click.native="confrimMethod">确认收货</mt-button>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            orderStatus: '待付款',
            pullOrDownFlag: false,
            pullOrDownShop: false,
            shopLogo: '../src_wap/assets/images/list_logo.png',
            isThird: true,
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
        },
        pullOrDownShopMethod() {
            this.pullOrDownShop = !this.pullOrDownShop;
        },
        confrimMethod() {
            MessageBox.confirm('确定执行此操作?').then(action => {
                console.log(11111);
            },action => {
                console.log(22222);
            },);
        },
        regStar(val) {                 // 隐藏会员账号
            if(val.length <= 5){
                let len = val.length;
                val = val.substr(0,len-1) + '*';
                return val;
            }else{
                let len = val.length;
                let star = '';
                for(let i=0; i<len-5; i++){
                    star+='*';
                }
                val = val.substr(0,3) + star + val.substr(len-2,len+1);
                return val;
            }
        },
    }
}
</script>

<style lang="less">
@import '~@/styles/order/detail.less';
</style>
