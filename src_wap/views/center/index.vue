<template>
    <div class="buyers" id="center">
        <section class="header">
            <div class="hd">
                <div class="user-wrap">
                    <div class="user" v-if="member.unitName">{{ member.unitName }}</div>
                    <div class="user" v-else>{{ member.phone | filterPhone }}</div>
                    <div class="sign">
                        <div class="sign-btn">
                            <span>+ {{ sign.returnResult ? sign.signed : sign.nextSign }}积分</span>
                            <mt-button size="small" @click="signTo" :disabled="sign.returnResult">
                                <template v-if="!sign.returnResult">
                                    签到领取
                                </template>
                                <template v-else>
                                    已领取
                                </template>
                            </mt-button>
                        </div>
                    </div>
                </div>
                <div class="level">
                    {{ memberAccount.memberLevelName }}
                </div>
                <div class="experience-wrap">
                    <div class="experience-bar">
                        <div class="experience" :style="{width:memberAccount.growthValue / level.cumulativeConsume * 100 + '%'}"></div>
                    </div>
                    {{ memberAccount.growthValue }} &nbsp;/&nbsp; {{ level.cumulativeConsume }}
                </div>
            </div>
            <div class="bd">
                <p class="bd-text">累积消费￥{{ memberAccount.growthValue || 0 }}，还差￥{{ level.cumulativeConsume - memberAccount.growthValue }}晋升{{ level.lever + level.memberLevelName  }}</p>
            </div>
        </section>
        <section class="count-entry">
            <router-link :to="{name: '账户余额'}" tag="div" class="entry-item">
                <div class="num">{{ memberAccount.totalAmount | toFix2 }}</div>
                <p class="count-text">账户余额(元)</p>
            </router-link>
            <router-link :to="{name: '积分记录'}" tag="div" class="entry-item">
                <div class="num">{{ memberAccount.totalIntegral }}</div>
                <p class="count-text">我的积分</p>
            </router-link>
            <router-link :to="{name: '红包列表',query:{type: 'UNUSED'}}" tag="div" class="entry-item">
                    <div class="num">{{ redpacket.total }}</div>
                    <p class="count-text">红包个数</p>
            </router-link>
        </section>
        <section class="order">
            <div class="title">
                <h3>我的订单</h3>
                <router-link :to="{name: '订单列表',query: {orderStatus:'null'}}" class="all-order">
                    全部订单 <i class="icon-icon07"></i>
                </router-link>
            </div>
            <div class="order-entry">
                <router-link :to="{name: '订单列表',query: {orderStatus:'waitPay'}}" class="item">
                    <mt-badge size="small" type="error" :class="{one:count.waitSend < 10}" v-if="count.waitPay > 0">{{ count.waitPay }}</mt-badge>
                    <span><i class="icon-gerenzhongxin_daifukuan"></i></span>
                    <p>待付款</p>
                </router-link>
                <router-link :to="{name: '订单列表',query: {orderStatus:'waitSend'}}" class="item">
                    <mt-badge size="small" type="error" :class="{one:count.waitSend < 10}" v-if="count.waitSend > 0">{{ count.waitSend }}</mt-badge>
                    <span><i class="icon-gerenzhongxin_daifahuo"></i></span>
                    <p>待发货</p>
                </router-link>
                <router-link :to="{name: '订单列表',query: {orderStatus:'waitRec'}}" class="item">
                    <mt-badge size="small" type="error" :class="{one:count.waitSend < 10}" v-if="count.send > 0">{{ count.send }}</mt-badge>
                    <span><i class="icon-gerenzhongxin_yifahuo"></i></span>
                    <p>待收货</p>
                </router-link>
                <router-link :to="{name: '订单列表',query: {orderStatus:'waitComment'}}" class="item">
                    <mt-badge size="small" type="error" :class="{one:count.waitSend < 10}" v-if="count.waitCommentNum > 0">{{ count.waitCommentNum }}</mt-badge>
                    <span><i class="icon-shangpinpingjia"></i></span>
                    <p>待评价</p>
                </router-link>
                <!-- <router-link to="#" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-tuikuandingdan"></i></span>
                    <p>退款</p>
                </router-link> -->
            </div>
        </section>
        <section class="tools">
            <router-link :to="{name: '地址管理'}" class="tools-entry">
                <div class="left"><i class="icon-maijiadizhiguanli"></i>地址管理</div>
                <div class="right"><i class="icon-icon07"></i></div>
            </router-link>
            <router-link :to="{name: '忘记密码'}" class="tools-entry">
                <div class="left"><i class="icon-xiugaimima"></i>修改密码</div>
                <div class="right"><i class="icon-icon07"></i></div>
            </router-link>
            <router-link :to="{name: '卖家招募'}" class="tools-entry" v-if="!shop">
                <div class="left"><i class="icon-zhongxindianpu"></i>申请为卖家</div>
                <div class="right"><i class="icon-icon07"></i></div>
            </router-link>
            <router-link :to="{name: '卖家中心'}" class="tools-entry" v-else>
                <div class="left"><i class="icon-zhongxindianpu"></i>卖家中心</div>
                <div class="right"><i class="icon-icon07"></i></div>
            </router-link>
        </section>
        <section class="quit">
            <mt-button type="default" @click="quit">退出登录</mt-button>
        </section>
    </div>
</template>


<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                count: {},
                level: {}
            }
        },
        computed: {
            ...mapState({
                member: state => state.member.member,
                memberAccount: state => state.member.memberAccount,
                orgDTO: state => state.member.orgDTO,
                shop: state => state.member.shop,
                thirdAccount: state => state.member.thirdAccount,
                sign: state => state.member.sign,
                redpacket: state => state.member.redpacket
            })
        },
        methods: {
            // 签到
            signTo() {
                this.$api.post('/member/memberRecord/createSignInLog',{
                    memberId: this.member.id,
                    sysId: 1
                },res => {
                    this.$toast(`签到成功,${this.sign.nextSign}积分己放于您的账户~`)
                    this.$store.dispatch('viewSign');
                    // 从新拉取会员信息
                    this.$store.dispatch('getMemberData')
                })
            },
            // 推出登陆
            quit() {
                try {
                    this.$api.get('/oteao/login/logout',{},res => {
                        this.$router.push('/')
                    },res => {
                        this.$router.push('/')
                    })
                } catch (error) {
                    this.$router.push('/')
                }
            }
        },
        created() {
            this.$api.post('/oteao/order/countOrderNum',{},res => {
                this.count = res.data;
            })
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.$store.dispatch('getMemberData').then(res =>{
                    let status = res.shop.shopStatus;
                    if(status === 2) {
                        vm.$store.dispatch('viewSign')
                        vm.$store.dispatch('getRedTotal')
                        vm.$api.get('/member/memberLevel/findNextLevelByMemberIdAndSysId',{
                            memberId: vm.$store.state.member.member.id,
                            sysId:1
                        },res =>{
                            vm.level = res.data;
                        })
                        return;
                    };
                    if(status === 1) {
                        vm.$messageBox({
                            title:'提示', 
                            message:`您的账号审核中，请耐心等待~~<br>若有疑问，请联系客服<br>4006-066-068`,
                            confirmButtonText: '我知道了'
                        });
                    }
                    // 未通过返回
                    vm.$router.go(-1);
                })
            })
        }
    }
</script>

<style lang="less" scoped>
    @import url('~@/styles/center/index.less');
</style>