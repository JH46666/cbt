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
                    {{ memberAccount.growthValue || 0 }} &nbsp;/&nbsp; {{ level.cumulativeConsume }}
                </div>
            </div>
            <div class="bd">
                <p class="bd-text">累积消费￥{{ memberAccount.cumulativeConsume || 0 | toFix2 }}，还差￥{{ level.cumulativeConsume - memberAccount.cumulativeConsume | toFix2 }}晋升{{ level.lever + level.memberLevelName  }}</p>
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
                    <mt-badge size="small" type="error" :class="{one:count.waitSend < 10}" v-if="count.waitPay > 0">{{ count.waitPay | ninenineAdd }}</mt-badge>
                    <span><i class="icon-gerenzhongxin_daifukuan"></i></span>
                    <p>待付款</p>
                </router-link>
                <router-link :to="{name: '订单列表',query: {orderStatus:'waitSend'}}" class="item">
                    <mt-badge size="small" type="error" :class="{one:count.waitSend < 10}" v-if="count.waitSend > 0">{{ count.waitSend | ninenineAdd }}</mt-badge>
                    <span><i class="icon-gerenzhongxin_daifahuo"></i></span>
                    <p>待发货</p>
                </router-link>
                <router-link :to="{name: '订单列表',query: {orderStatus:'waitRec'}}" class="item">
                    <mt-badge size="small" type="error" :class="{one:count.waitSend < 10}" v-if="count.send > 0">{{ count.send | ninenineAdd }}</mt-badge>
                    <span><i class="icon-gerenzhongxin_yifahuo"></i></span>
                    <p>待收货</p>
                </router-link>
                <router-link :to="{name: '订单列表',query: {orderStatus:'waitComment'}}" class="item">
                    <mt-badge size="small" type="error" :class="{one:count.waitSend < 10}" v-if="count.waitCommentNum > 0">{{ count.waitCommentNum | ninenineAdd }}</mt-badge>
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
            <router-link :to="{name: '修改密码'}" class="tools-entry">
                <div class="left"><i class="icon-xiugaimima"></i>修改密码</div>
                <div class="right"><i class="icon-icon07"></i></div>
            </router-link>
            <router-link :to="{name: '卖家招募'}" class="tools-entry" v-if="!shop">
                <div class="left"><i class="icon-zhongxindianpu"></i>申请为卖家</div>
                <div class="right"><i class="icon-icon07"></i></div>
            </router-link>
            <router-link :to="{name: '茶帮通注册3',query: {edit: 'seller'}}" class="tools-entry" v-if="shop ? shop.shopStatus === 1 || shop.shopStatus === 3 : false ">
                <div class="left"><i class="icon-zhongxindianpu"></i>卖家中心</div>
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
    import store from 'store';
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
                this.$api.post('/oteao/member/memberRecord/createSignInLog',{
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
                this.$messageBox({
                    title:'提示',
                    message:`是否退出登录`,
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonText: '确定'
                }).then(res => {
                    if(res === 'cancel') {
                        return;
                    } else {
                        this.$api.get('/oteao/login/logout',{},res => {
                            this.$router.push('/');
                            this.$store.commit('SET_MEMBERDATA',{type:'member',val:{}})
                        },res => {
                            this.$router.push('/')
                            this.$store.commit('SET_MEMBERDATA',{type:'member',val:{}})
                        })
                    }
                })
            }
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','我的中心');

            // 获取订单数量
            this.$api.post('/oteao/order/countOrderNum',{},res => {
                this.count = res.data;
            })
        },
        // 判断会员状态
        beforeRouteEnter (to, from, next) {
            let vm = vm => {
                let status = store.state.member.memberAccount.status;
                if(status === 'ACTIVE') {
                    vm.$store.dispatch('viewSign')
                    vm.$store.dispatch('getRedTotal')
                    vm.$api.get('/oteao/member/memberLevel/findNextLevelByMemberIdAndSysId',{
                        memberId: store.state.member.member.id,
                        sysId:1
                    },res =>{
                        vm.level = res.data;
                    })
                    return;
                };
                if(status === 'WAIT_AUDIT') {
                    vm.$messageBox({
                        title:'提示',
                        message:`您的账号审核中，只有正式会员才可查看，若有疑问，请联系客服400-996-3399`,
                        confirmButtonText: '我知道了'
                    });
                }
                if(status === 'FREEZE') {
                    vm.$messageBox({
                        title:'提示',
                        message:`您的账号因违规操作而被冻结无法进入~若有疑问，请联系客服400-996-3399`,
                        confirmButtonText: '我知道了'
                    }).then(res => {
                        vm.$api.get('/oteao/login/logout',{},res => {})
                    })
                }
                if(status === 'INACTIVE') {
                    vm.$messageBox({
                        title:'提示',
                        message:`您的账号审核未通过，只有正式会员才可查看，若有疑问，请联系客服400-996-3399`,
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        confirmButtonText: '完善资料'
                    }).then(res => {
                        if(res === 'cancel') {
                            return;
                        } else {
                            if(store.state.member.orgDTO){
                                vm.$router.push({
                                    name: '茶帮通注册5',
                                    query: {
                                        edit: 'buyer'
                                    }
                                })
                            }else{
                                vm.$router.push({
                                    name: '茶帮通注册2'
                                })
                            }
                        }
                    })
                }
                if(status === 'AUDIT_NO_PASS') {
                    vm.$messageBox({
                        title:'提示',
                        message:`您的账号审核未通过，只有正式会员才可查看，若有疑问，请联系客服400-996-3399`,
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        confirmButtonText: '完善资料'
                    }).then(res => {
                        if(res === 'cancel') {
                            return;
                        } else {
                            if(store.state.member.orgDTO){
                                vm.$router.push({
                                    name: '茶帮通注册5',
                                    query: {
                                        edit: 'buyer'
                                    }
                                })
                            }else{
                                vm.$router.push({
                                    name: '茶帮通注册2'
                                })
                            }
                        }
                    })
                }
                return vm.$router.go(-1);
            }
            store.dispatch('getMemberData').then((res) => {
                next(vm);
            }).catch(res => {
                next(vm => {
                    vm.$router.push('/login');
                })
            })
        }
    }
</script>

<style lang="less" scoped>
    @import url('~@/styles/center/index.less');
</style>
