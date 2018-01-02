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

                </div>
            </div>
        </div>
        <div class="packet_sign">
            <div class="packet_sign_wrapper">
                <div class="packet_sign_left">
                    <div class="packet_sign_left_head">
                        <i class="packet_sign_user_icon iconfont">&#xe69f;</i>
                        <div class="packet_sign_user_sign">新客专享红包</div>
                    </div>
                    <div class="packet_sign_left_bottom">会员每日签到可获随机现金红包及积分噢</div>
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
                <div class="packet_item_right">立即领取</div>
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
                <div class="packet_old_item" :class="{on: plain1}">
                    <div class="grey_2 left"></div>
                    <div class="grey_2 right"></div>
                    <div class="packet_old_item_head">
                        <div class="packet_logo"><img src="../../assets/images/ic_hbzy.png" /></div>
                        <div class="packet_price">
                            <div class="packet_sum">
                                <span>￥</span>
                                <span>56</span>
                                <span>满100可用</span>
                            </div>
                            <div class="packet_name">真的，说要展示十五十五十五</div>
                        </div>
                        <div class="packet_btn">
                            <mt-button :plain="plain1">{{ user1 }}</mt-button>
                        </div>
                    </div>
                    <div class="packet_old_item_bottom">有效期至2019-04-14 16:00:00</div>
                </div>
                <div class="packet_old_item" :class="{on: plain2}">
                    <div class="grey_2 left"></div>
                    <div class="grey_2 right"></div>
                    <div class="packet_old_item_head">
                        <div class="packet_logo"><img src="../../assets/images/ic_hbdsf.png" /></div>
                        <div class="packet_price">
                            <div class="packet_sum">
                                <span>￥</span>
                                <span>56</span>
                                <span>满100可用</span>
                            </div>
                            <div class="packet_name">真的，说要展示十五十五十五</div>
                        </div>
                        <div class="packet_btn">
                            <mt-button :plain="plain2">{{ user2 }}</mt-button>
                        </div>
                    </div>
                    <div class="packet_old_item_bottom">有效期至2019-04-14 16:00:00</div>
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
                <p class="sign_text">获得<span>0.5</span>元现金+20<span>20</span>积分呦~</p>
                <mt-button>收入囊中</mt-button>
            </div>
        </div>
        <div class="packet_dialog_2">
            <div class="packet_wrapper">
                <div class="packet_head">
                    <div class="title_logo"></div>
                    <div class="title_text">恭喜您获得</div>
                    <div class="title_pcice">￥1000新人红包</div>
                </div>
                <div class="packet_content">
                    <div class="packet_content_wrapper">
                        <div class="packet_old_item">
                            <div class="grey_2 left"></div>
                            <div class="grey_2 right"></div>
                            <div class="packet_old_item_head">
                                <div class="packet_logo"><img src="../../assets/images/ic_hbdsf.png" /></div>
                                <div class="packet_price">
                                    <div class="packet_sum align_left">
                                        <span>￥</span>
                                        <span>56</span>
                                        <span>满100可用</span>
                                    </div>
                                    <div class="packet_name align_left">真的，说要展示十五十五十五</div>
                                </div>
                            </div>
                            <div class="packet_old_item_bottom align_left">有效期至2019-04-14 16:00:00</div>
                        </div>
                        <div class="packet_old_item">
                            <div class="grey_2 left"></div>
                            <div class="grey_2 right"></div>
                            <div class="packet_old_item_head">
                                <div class="packet_logo"><img src="../../assets/images/ic_hbdsf.png" /></div>
                                <div class="packet_price">
                                    <div class="packet_sum align_left">
                                        <span>￥</span>
                                        <span>56</span>
                                        <span>满100可用</span>
                                    </div>
                                    <div class="packet_name align_left">真的，说要展示十五十五十五</div>
                                </div>
                            </div>
                            <div class="packet_old_item_bottom align_left">有效期至2019-04-14 16:00:00</div>
                        </div>
                        <div class="packet_old_item">
                            <div class="grey_2 left"></div>
                            <div class="grey_2 right"></div>
                            <div class="packet_old_item_head">
                                <div class="packet_logo"><img src="../../assets/images/ic_hbdsf.png" /></div>
                                <div class="packet_price">
                                    <div class="packet_sum align_left">
                                        <span>￥</span>
                                        <span>56</span>
                                        <span>满100可用</span>
                                    </div>
                                    <div class="packet_name align_left">真的，说要展示十五十五十五</div>
                                </div>
                            </div>
                            <div class="packet_old_item_bottom align_left">有效期至2019-04-14 16:00:00</div>
                        </div>
                        <div class="packet_old_item">
                            <div class="grey_2 left"></div>
                            <div class="grey_2 right"></div>
                            <div class="packet_old_item_head">
                                <div class="packet_logo"><img src="../../assets/images/ic_hbdsf.png" /></div>
                                <div class="packet_price">
                                    <div class="packet_sum align_left">
                                        <span>￥</span>
                                        <span>56</span>
                                        <span>满100可用</span>
                                    </div>
                                    <div class="packet_name align_left">真的，说要展示十五十五十五</div>
                                </div>
                            </div>
                            <div class="packet_old_item_bottom align_left">有效期至2019-04-14 16:00:00</div>
                        </div>
                    </div>
                </div>
                <div class="packet_bottom">
                    <mt-button>立即使用</mt-button>
                    <p>已放入您的红包，可进入我的 >  我的红包查看</p>
                </div>
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
            oldUserPacket: [
                {
                    code: '0000000',    // 红包编码
                    iSelf: true,        // 是否自营  true 自营 false 店铺
                    sum: 56,            // 红包金额
                    sumUse: 100,        // 满额使用
                    name: '叫什么名字',  // 红包名称
                    endTime: '2020-12-20 00:00:00', // 截止时间
                    isUse: false        // 是否使用   默认 false 未使用  true 已使用
                }
            ],
            newUserPacket: [
                {
                    code: '0000000',    // 红包编码
                    iSelf: true,        // 是否自营  true 自营 false 店铺
                    sum: 56,            // 红包金额
                    sumUse: 100,        // 满额使用
                    name: '叫什么名字',  // 红包名称
                    endTime: '2020-12-20 00:00:00' // 截止时间
                }
            ],
            packetCode: {
                oldUser: [56910,56909,56908,56907,56906,56905],
                newUser: [56904,56903,56902,56901,56900,56899]
            }
        }
    },
    computed: {
        ...mapState({
            member: state => state.member.member,
            memberAccount: state => state.member.memberAccount,
            sign: state => state.member.sign
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

        },
        // 会员是否激活
        memberActive() {
            return this.memberAccount.status === 'ACTIVE' ? true : false;
        }
    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','茶帮通红包馆');
        // 获取红包code并拉取红包信息
        this.$store.dispatch('getBlock','PACKET_CODE').then((res)=>{
            this.packetCode = JSON.parse(res.data.htmlText);
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
