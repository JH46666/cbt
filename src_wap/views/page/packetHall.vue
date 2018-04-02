<template lang="html">
    <div class="packet">
        <div class="packet_banner">
            <img src="../../assets/img_hbs.jpg" />
        </div>
        <div class="packet_user">
            <div class="pactet_bg"></div>
            <div class="packet_user_wrapper">
                <div class="packet_user_logo"></div>
                <div class="packet_user_text">
                    <div class="swiper-container-2">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in getList">
                                {{ item }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="packet_sign">
            <div class="packet_sign_wrapper">
                <div class="packet_sign_left">
                    <div class="packet_sign_left_head">
                        <i class="packet_sign_user_icon iconfont">&#xe69f;</i>
                        <div class="packet_sign_user_sign">签到领钱</div>
                    </div>
                    <div class="packet_sign_left_bottom">会员每日签到可获随机现金红包及积分噢~</div>
                </div>
                <div class="packet_sign_right">
                    <mt-button :disabled="member.id ? sign.returnResult : false" @click="signIn">{{ signText }}</mt-button>
                </div>
            </div>
        </div>
        <div class="packet_new_user">
            <div class="packet_new_user_head">
                <i class="packet_new_user_icon iconfont">&#xe69d;</i>
                <div class="packet_new_user_sign">新客专享红包</div>
                <div class="packet_new_user_text">仅限新注册会员领取~</div>
            </div>
            <div class="packet_item item_1">
                <div class="packet_item_left">
                    <span>￥1000</span>
                    <span>新人红包，内含6个红包~</span>
                </div>
                <div class="packet_item_right" @click="getRed(packetCode.newUser,'new')">立即领取</div>
            </div>
        </div>
        <div class="packet_old_user">
            <div class="packet_old_user_head">
                <i class="packet_old_user_icon iconfont">&#xe69e;</i>
                <div class="packet_old_user_sign">老客专享红包</div>
                <div class="packet_old_user_text">仅限10级经销商等级以上会员可领取~</div>
            </div>
        </div>
        <div class="packet_old_list">
            <div class="packet_old_list_wrapper">
                <div class="packet_old_item" :class="{on: item.id}" v-for="(item,i) in oldList">
                    <div class="grey_2 left"></div>
                    <div class="grey_2 right"></div>
                    <div class="packet_old_item_head">
                        <div class="packet_logo"><img src="../../assets/images/ic_hbzy.png" /></div>
                        <div class="packet_price">
                            <div class="packet_sum">
                                <template v-if="item.amount">
                                    <span class="small">￥</span>
                                    <span class="big">{{ formatPrice( item.amount ) }} </span>
                                </template>
                                <template v-if="item.discount">
                                    <span class="big">{{ item.discount }}</span>
                                    <span class="small">折</span>
                                </template>
                                <span>满{{ formatPrice(item.fullAmountUse) }}元可用</span>
                            </div>
                            <div class="packet_name">{{ item.limitExplain }}</div>
                        </div>
                        <div class="packet_btn" v-if="!item.id">
                            <mt-button :plain="item.id" @click="getRed([item.useRuleId],'old')">立即领取</mt-button>
                        </div>
                        <div class="packet_btn" v-else>
                            <mt-button :plain="Boolean(item.id)" @click="$router.push('/category/')">去使用</mt-button>
                        </div>
                    </div>
                    <div class="packet_old_item_bottom">有效期至{{ item.endTime }}</div>
                </div>
            </div>
            <div class="no_packet">到底啦~</div>
        </div>
        <div class="packet_dialog_1" v-if="signDialog">
            <div class="sign_wrapper">
                <div class="sign_top">
                    <img src="../../assets/images/img_hbtc.png" />
                </div>
                <p class="sign_success">签到成功</p>
                <p class="sign_text">获得<span>{{ successSign.balanceGetBySignIn }}</span>元现金+<span>{{ successSign.signInteger }}</span>积分呦~</p>
                <mt-button @click="signDialog = false">收入囊中</mt-button>
            </div>
        </div>
        <div class="packet_dialog_2" v-if="newUserDialog">
            <div class="packet_wrapper">
                <div class="packet_head">
                    <div class="title_logo"></div>
                    <div class="title_text">恭喜您获得</div>
                    <div class="title_pcice">￥1000新人红包</div>
                </div>
                <div class="packet_content">
                    <div class="packet_content_wrapper">
                        <div class="packet_old_item" v-for="(item,i) in newList">
                            <div class="grey_2 left"></div>
                            <div class="grey_2 right"></div>
                            <div class="packet_old_item_head">
                                <!-- <div class="packet_logo"><img src="../../assets/images/ic_hbdsf.png" /></div> -->
                                <div class="packet_logo"><img src="../../assets/images/ic_hbzy.png" /></div>
                                <div class="packet_price new">
                                    <div class="packet_sum align_left">
                                        <template v-if="item.amount">
                                            <span class="small">￥</span>
                                            <span class="big">{{ formatPrice(item.amount) }}</span>
                                        </template>
                                        <template v-if="item.discount">
                                            <span class="big">{{ item.discount }}</span>
                                            <span class="small">折</span>
                                        </template>
                                        <span>满{{ formatPrice(item.fullAmountUse) }}元可用</span>
                                    </div>
                                    <div class="packet_name align_left">{{ item.limitExplain }}</div>
                                </div>
                            </div>
                            <div class="packet_old_item_bottom align_left">有效期至{{ item.endTime }}</div>
                        </div>
                    </div>
                </div>
                <div class="packet_bottom">
                    <mt-button @click="$router.push('/')">立即使用</mt-button>
                    <p>已放入您的红包，可进入我的 >  我的红包查看</p>
                </div>
                <div class="close" @click="newUserDialog = false"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import store from 'store';
export default {
    data() {
        return {
            plain1: true,
            user1: '去使用',
            plain2: false,
            user2: '立即领用',
            signText: '签到抢现金',
            iSign: false,
            signDialog: false,          // 签到弹窗
            successSign: {},            // 签到成功后的数据
            newUserDialog: false,       // 新客红包弹窗
            packetCode: {
                oldUser: [],
                newUser: []
            },
            newList: [],                // 新客红包列表
            oldList: [],                // 老客红包列表
            successNew: [],             // 新客成功的列表
            getList: [],                // 随机签到记录
        }
    },
    computed: {
        ...mapState({
            member: state => state.member.member,
            memberAccount: state => state.member.memberAccount,
            sign: state => state.member.sign
        }),
    },
    mounted() {
        this.$api.post('/oteao/member/redPacket/findRandomSignInMember',{
            count: 10,
            sysId:1
        },res => {
            this.getList = res.data;
            this.$nextTick(() => {
                var swiper2 = new Swiper('.swiper-container-2', {
                    direction: 'vertical',
                    autoplay: true,
                    loop: true,
                    slidesPerView :1.8 
                });
            })
        })
    },
    methods: {
        // 签到
        signIn() {
            if(!this.member.id) {
                return this.$router.push('/login');
            }

            if(!this.memberActive()) {
                return this.$toast('只有正式会员才可以签到哟~')
            }

            this.$api.post('/oteao/member/memberRecord/createSignInLog',{
                memberId: this.member.id,
                sysId: 1
            },res => {
                this.signDialog = true;
                this.successSign = res.data;
                this.$store.dispatch('viewSign');
                // 从新拉取会员信息
                this.$store.dispatch('getMemberData')
            },res=> {
                this.$toast(res.cnMessage);
            })

        },
        // 会员是否激活
        memberActive() {
            return this.memberAccount.status === 'ACTIVE' ? true : false;
        },
        // 领取红包
        getRed(list,type) {
            if(!this.member.id) {
                return this.$router.push('/login');
            }

            if(!this.memberActive()) {
                if(type === 'new') {
                    return this.$toast('只有正式注册会员才能领取哟~')
                } else {
                    return this.$toast('只有10级经销商等级以上会员才能领取哟')
                }
            }

            if(type === 'old') {

                if(this.memberAccount.memberLevelId === 28) return this.$toast('只有10级经销商等级以上会员才能领取哟~')
                this.$api.post('/oteao/member/redPacket/doActivateByRuleId',{
                    sysId: 1,
                    ruleId: list[0]
                },res => {
                    this.$toast('领取成功，己放入您的红包账户~')
                    this.getRedLIst();
                },res => {
                    if(res.code === 3013) {
                        this.$toast('红包被抢光啦~')
                    }
                    if(res.code === 4060) {
                        this.$toast('红包还未启用~')
                    }
                    if(res.code === 4042) {
                        this.$toast('只有10级经销商等级以上会员才能领取哟~')
                    }
                    if(res.code === 4064) {
                        this.$toast('只有10级经销商等级以上会员才能领取哟~')
                    }
                })

            } else {
                if(this.memberAccount.memberLevelId !== 28) return this.$toast('只有正式注册会员才能领取哟~')
                this.$api.post('/oteao/member/redPacket/doActivateByRuleIdList?sysId=1',JSON.stringify(list),res => {
                    this.successNew = [];
                    let limitList = [];
                    for (let attr in res.data) {
                        if(res.data[attr] === 1) {
                            this.successNew.push(Number(attr));
                        }
                        if(res.data[attr] === '获取数量超出限制') {
                            limitList.push(Number(attr))
                        }
                    }
                    if(limitList.length === this.newList.length) {
                        return this.$toast('您己领过该新人礼包，不要贪心哟~')
                    }
                    if(this.successNew.length === 0) {
                        return this.$toast('红包领取失败~')
                    }
                    this.$api.post('/oteao/member/redPacket/findRedPacketListByRuleSetIds?sysId=1',JSON.stringify(this.successNew),res => {
                        this.newList = res.data || [];
                        this.newUserDialog = true;
                    })
                },res => {
                    this.$toast(res.message);
                })
            }


        },
        // 拉取红包数据
        getRedLIst() {
            this.$api.post('/oteao/member/redPacket/findRedPacketListByRuleSetIds?sysId=1',JSON.stringify(this.packetCode.newUser),res => {
                this.newList = res.data || [];
            })
            this.$api.post('/oteao/member/redPacket/findRedPacketListByRuleSetIds?sysId=1',JSON.stringify(this.packetCode.oldUser),res => {
                this.oldList = res.data || [];
            })
        },
        // 强制保留两位小数
        toDecimal2(x) {
            var f = parseFloat(x);
            if (isNaN(f)) {
                return false;
            }
            var f = Math.round(x * 100) / 100;
            var s = f.toString();
            var rs = s.indexOf('.');
            if (rs < 0) {
                rs = s.length;
                s += '.';
            }
            while (s.length <= rs + 2) {
                s += '0';
            }
            return s;
        },
        // 格式化价格
        formatPrice(val) {
            // val = val.toString()
            val = this.toDecimal2(val);
            if(val.indexOf('.') !== -1){
                if (val.indexOf('.0') !== -1) {
                    console.log(val.substring(0, val.length - 3));
                    return val.substring(0, val.length - 3);
                }else {
                    console.log(val.substring(0, val.length - 1));
                    return val.substring(0, val.length-1);
                }
            }
            // console.log(val);
        }
    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','红包馆');
        // 获取红包code并拉取红包信息
        this.$store.dispatch('getBlock','PACKET_CODE').then((res)=>{
            this.packetCode = JSON.parse(res.data.htmlText);
            // 拉取红包的列表
            this.getRedLIst();
        })
        // 已经登录要判断是否签到
        if(this.member.id) {
            this.$store.dispatch('viewSign');
        }
    },
    // 进来先判断登陆与否
    beforeRouteEnter(to, from, next) {
        if(!store.state.member.member.id) {
            store.dispatch('getMemberData').then((res) => {
                next();
            }).catch(res => {
                next();
            })
        } else {
            next();
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/page/packet.less';
</style>
