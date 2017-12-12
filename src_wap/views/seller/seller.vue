<template>
    <div id="seller">
        <section class="head">
            <div class="left">
                <span class="icon-wrap">
                    <i class="icon-zhongxindianpu"></i>
                </span>
            </div>
            <div class="right">
                <p class="user">
                    {{ shop.shopName }}
                </p>
                <div class="level-wrap">
                    <div class="level-left">
                        <span class="level" :class="level" v-for="n in levelNum"></span>
                    </div>
                    <div class="level-right">{{ sellerData.growth }}分</div>
                </div>
                <p class="sum-count">
                    您在茶帮通已收入 ￥{{ count.allOrderSum | toFix2 }} 元
                </p>
            </div>
            <div class="goback" @click="$router.push({name: '个人中心'})">
                返回买家中心
            </div>
        </section>
        <section class="count-entry">
            <router-link to="" tag="div" class="count-item">
                <p class="num">{{ count.monthOrderSum | toFix2}}</p>
                <p class="tips">当月收入（元）</p>
            </router-link>
            <router-link to="" tag="div" class="count-item">
                <p class="num">{{ count.monthOrderNum }}</p>
                <p class="tips">当月订单数</p>
            </router-link>
        </section>
        <section class="order-wrap">
            <div class="title">
                <h3>卖家订单中心</h3>
                <!-- <router-link to="/seller/orderlist?type=null" class="entry">
                    全部订单 <i class="icon-icon07"></i>
                </router-link> -->
            </div>
            <div class="order-entry">
                <router-link to="/seller/orderlist?type=waitPay" class="item">
                    <mt-badge size="small" type="error" :class="{one:count.waitPay < 10}" v-if="count.waitPay > 0">{{ count.waitPay | ninenineAdd }}</mt-badge>
                    <span><i class="icon-gerenzhongxin_daifukuan"></i></span>
                    <p>待付款</p>
                </router-link>
                <router-link to="/seller/orderlist?type=waitSend" class="item">
                    <mt-badge size="small" type="error" :class="{one:count.waitSend < 10}" v-if="count.waitSend > 0">{{ count.waitSend | ninenineAdd }}</mt-badge>
                    <span><i class="icon-gerenzhongxin_daifahuo"></i></span>
                    <p>待发货</p>
                </router-link>
                <router-link to="/seller/orderlist?type=waitRec" class="item">
                    <mt-badge size="small" type="error" :class="{one:count.send < 10}" v-if="count.send > 0">{{ count.send | ninenineAdd }}</mt-badge>
                    <span><i class="icon-gerenzhongxin_yifahuo"></i></span>
                    <p>已发货</p>
                </router-link>
                <router-link to="/seller/orderlist?type=null" class="item">
                    <!-- <mt-badge size="small" type="error" :class="{one:allCount < 10}" v-if="allCount > 0">{{ allCount | ninenineAdd }}</mt-badge> -->
                    <span><i class="icon-gengduo"></i></span>
                    <p>全部</p>
                </router-link>
                <!-- <router-link to="#" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-gerenzhongxin_daipingjia"></i></span>
                    <p>待评价</p>
                </router-link> -->
            </div>
        </section>
        <section class="tools-pannel">
            <div class="tools-row">
                <router-link :to="{name: '商品管理'}" class="item">
                    <span><i class="icon-xiaoshouguanli blue"></i></span>
                    <p>商品管理</p>
                </router-link>
                <router-link :to="{name: '运费配置'}" class="item">
                    <span><i class="icon-yunfeipeizhi"></i></span>
                    <p>运费配置</p>
                </router-link>
                <router-link :to="{name: '活动列表'}" class="item">
                    <span><i class="icon-tejiaguanli"></i></span>
                    <p>限时特价</p>
                </router-link>
                <router-link :to="{name: '我的收入'}" class="item">
                    <span><i class="icon-shouru small"></i></span>
                    <p>我的收入</p>
                </router-link>
            </div>
            <div class="tools-row">
                <router-link :to="{name: '商品管理'}" class="item">
                    <span><i class="icon-xiaoxi blue small"></i></span>
                    <p>店铺信息</p>
                </router-link>
            </div>
        </section>
        <div class="new-up">
            <mt-button type="default" @click="$router.push({name: '新品上架-1'})"><span class="add"><i class="icon-xinzeng"></i></span>创建商品</mt-button>
        </div>
    </div>
</template>


<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                count: {},
                sellerData: {}
            }
        },
        computed: {
            allCount() {
                let sum = 0;
                for (let attr in this.count) {
                    sum += this.count[attr]
                }
                return sum;
            },
            ...mapState({
                member: state => state.member.member,
                memberAccount: state => state.member.memberAccount,
                orgDTO: state => state.member.orgDTO,
                shop: state => state.member.shop,
                thirdAccount: state => state.member.thirdAccount,
                sign: state => state.member.sign,
                redpacket: state => state.member.redpacket
            }),
            // 等级图标
            level() {
                let g = this.sellerData.growth
                if(g <= 250) {
                    return 'level-1'
                } else if(g <= 10000) {
                    return 'level-2'
                } else if(g <= 500000) {
                    return 'level-3'
                } else {
                    return 'level-4'
                }
            },
            // 等级数量
            levelNum() {
                let g = this.sellerData.growth
                let l = 0;

                if(g >= 0 && g <= 10 || g >= 251 && g <= 500 || g >= 10001 && g <= 20000 || g >= 500001 && g <= 1000000 ) {
                    l = 1;
                }

                if(g >= 11 && g <= 40 || g >= 501 && g <= 1000 || g >= 20001 && g <= 50000 || g >= 1000001 && g <= 2000000) {
                    l = 2;
                }

                if(g >= 41 && g <= 90 || g >= 1001 && g <= 2000 || g >= 50001 && g <= 100000 || g >= 2000001 && g <= 5000000) {
                    l = 3;
                }

                if(g >= 91 && g <= 150 || g >= 2001 && g <= 5000 || g >= 100001 && g <= 200000 || g >= 5000001 && g <= 10000000) {
                    l = 4;
                }

                if(g >= 151 && g <= 250 || g >= 5001 && g <= 10000 || g >= 200001 && g <= 500000 || g > 10000000) {
                    l = 5;
                }

                return l;
            }
        },
        created() {
            this.$api.post('/oteao/order/countOrderNumBySeller',{},res => {
                this.count = res.data;
            })
            this.$api.post('/orgShop/getShopCenterInfo',{},res => {
                this.sellerData = res.data;
            })
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(vm.$store.state.member.member.id) {
                    if(!vm.$store.state.member.shop) {
                        vm.$router.go(-1);
                    }
                } else {
                    vm.$store.dispatch('getMemberData').then(res =>{
                        if(!res.shop) {
                            // 未通过返回
                            vm.$router.go(-1);
                        }
                        if(res.shop.shopStatus === 2 || res.shop.shopStatus === -2) {
                        } else {
                            vm.$router.go(-1);
                        }
                    })
                }
            })
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/seller/seller.less');
</style>