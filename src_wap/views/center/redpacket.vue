<template>
    <div id="redpacket">
        <mt-navbar v-model="selected">
            <mt-tab-item id="UNUSED">未使用({{ total.UNUSEDNUM | ninenineAdd }})</mt-tab-item>
            <mt-tab-item id="USED">已使用({{ total.USEDNUM | ninenineAdd }})</mt-tab-item>
            <mt-tab-item id="EXPIRED">已失效({{ total.EXPIREDNUM | ninenineAdd }})</mt-tab-item>
        </mt-navbar>
        <section 
            class="redpacket-main" 
            :class="{'no-foot': selected !== 'UNUSED'}" 
            :key="selected"
            v-infinite-scroll="loadMore"
            :infinite-scroll-disabled="false"
            infinite-scroll-distance="10">
            <div class="no-redpacket" v-if="list.length === 0">
                <img src="../../assets/images/nored.png" alt="">
                <p>没有红包呀~</p>
            </div>
            <template v-else>
                <div class="redpacket-item" v-for="(item,index) in list" :class="{disabled: selected === 'EXPIRED' || selected === 'USED'}">
                    <div class="hd">
                        <div class="left">
                            <p>
                                <template v-if="item.redPacketType === 'DISCOUNT_AMOUNT'">
                                    <span class="type">￥</span>
                                    <span class="num">{{ formatPrice(item.amountOrDiscount) }}</span>
                                </template>
                                <template v-else>
                                    <span class="num">{{ item.discount  }}</span>
                                    <span class="type">折</span>
                                </template>
                            </p>
                            <p class="limit-text">满 {{ formatPrice(item.fullAmountUse) }} 元可用</p>
                        </div>
                        <div class="right">
                            <p class="title">
                                <span class="sell-type">自营</span>
                                <span class="t">{{ item.showName }}</span>
                            </p>
                            <p class="date">有效期至 {{ item.endTime }}</p>
                        </div>
                        <div class="round-wrap">
                            <span class="round" v-for="n in 5"></span>
                        </div>
                    </div>
                    <div class="bd">
                        <p class="tips" :class="{onlyone:!item.showMore}">{{ item.limitExplain }}</p>
                        <div class="direction" @click="showMore(index)" v-if="item.limitExplain ? item.limitExplain.length > 50 : false">
                            <i class="icon-single-down" v-if="!item.showMore"></i>
                            <i class="icon-shang" v-else="item.showMore"></i>
                        </div>
                    </div>
                </div>
            </template>
            <div class="goods-loading" v-if="loading">
                <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                <span class="loading-text">正在努力加载中</span>
            </div>
            <div class="no-more" v-if="nomore && list.length !== 0">没有更多了呦~</div>
        </section>
        <section class="redpacket-bd" v-if="selected === 'UNUSED' && id">
            <mt-button type="default" @click="activeRed">激活红包</mt-button>
        </section>
    </div>
</template>


<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                pageNum: 1
            }
        },
        computed: {
            // 选择
            selected: {
                get() {
                    if(this.$route.query.type) {
                        return this.$route.query.type
                    } else {
                        this.$router.replace({name: '红包列表',query: {type: 'UNUSED'}})
                        return 'null';
                    }
                },
                set(val) {
                    this.$router.replace({name: '红包列表',query: {type: val}})
                }
            },
            nomore() {
                return Boolean(this.list.length === this.total[this.selected + 'NUM'])
            },
            loading() {
                return Boolean(this.list.length < this.total[this.selected + 'NUM'])
            },
            ...mapState({
                list(state) {
                    return state.member.redpacket[this.selected]
                },
                total(state) {
                    return {
                        UNUSEDNUM: state.member.redpacket.UNUSEDNUM,
                        USEDNUM: state.member.redpacket.USEDNUM,
                        EXPIREDNUM: state.member.redpacket.EXPIREDNUM,
                    }
                },
                id: state => state.member.member.id
            }),
        },
        watch: {
            selected(val) {
                this.$store.dispatch('getRedList',{type: this.selected}).then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].showMore = false;
                    }
                    this.$store.commit('SET_REDPACKET',{type: this.selected + 'NUM',val: res.total_record})
                    this.$store.commit('SET_REDPACKET',{type:this.selected,val: res.data})
                })
                this.pageNum = 1;
            }
        },
        methods: {
            // 展开
            showMore(index) {
                this.list[index].showMore = !this.list[index].showMore;
            },
            // 无限滚动
            loadMore() {
                if(this.list.length < this.total[this.selected + 'NUM']) {
                    this.pageNum++
                    this.$store.dispatch('getRedList',{type: this.selected,page:this.pageNum}).then(res => {
                        // 小于10表示最后一页
                        if(res.data.length < 10) {
                            this.pageNum--
                        }
                        // 设置展开
                        let data = this.list.concat(res.data)
                        for (let i = 0; i < data.length; i++) {
                            if(!data[i].showMore) {
                                data[i].showMore = false;
                            }
                        }

                        this.$store.commit('SET_REDPACKET',{type: this.selected,val: data})
                        this.$store.commit('SET_REDPACKET',{type: this.selected + 'NUM',val: res.total_record})
                    })
                }
            },
            // 激活红包
            activeRed() {
                this.$redActive().then(data => {
                    this.$api.post('/oteao/member/redPacket/doActivateBySerialNumber',{
                        device: 'WAP',
                        memberId: this.id,
                        sysId:1,
                        serialNumber: data.redCode
                    },res => {
                        this.$toast('激活成功，已放入我的红包');

                        // 从新拉取数据
                        this.$store.dispatch('getRedList',{type: this.selected}).then(res => {
                            for (let i = 0; i < res.data.length; i++) {
                                res.data[i].showMore = false;
                            }
                            this.$store.commit('SET_REDPACKET',{type: this.selected + 'NUM',val: res.total_record})
                            this.$store.commit('SET_REDPACKET',{type:this.selected,val: res.data})
                        })
                        this.pageNum = 1;

                    },res => {

                        let toast = {
                            1000: '该激活码己被使用！',
                            4044: '该激活优惠码己被使用！',
                            4060: '该激活码不存在或己过期！',
                            4018: '该激活码不存在或己过期！',
                            4041: '该激活码不存在或己过期！',
                            4042: '您的等级不允许领取该红包哟~',
                            4043: '超出领用次数，请勿重复领取！',
                            4061: '该激活码已超出领取时间，不可领取！',
                            4048: '该激活码码仅在wap/pc平台领取',
                            7010: '该激活码码仅在pc平台领取',
                        }

                        this.$toast(toast[res.code])
                    })
                }).catch(() =>{})
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
                if (val.indexOf('.') !== -1) {
                    if (val.indexOf('.0') !== -1) {
                        console.log(val.substring(0, val.length - 3));
                        return val.substring(0, val.length - 3);
                    } else {
                        console.log(val.substring(0, val.length - 1));
                        return val.substring(0, val.length - 1);
                    }
                }
                // console.log(val);
            }
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','我的红包');
            
            this.$store.dispatch('getRedList',{type: this.selected}).then(res => {
                
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].showMore = false;
                }
                this.$store.commit('SET_REDPACKET',{type: this.selected + 'NUM',val: res.total_record})
                this.$store.commit('SET_REDPACKET',{type: this.selected,val: res.data})

                // 拉取其他的数量
                let obj = {
                    UNUSED: 'UNUSED',
                    USED: 'USED',
                    EXPIRED: 'EXPIRED'
                }
                delete obj[this.selected];

                for (let attr in obj) {
                    this.$store.dispatch('getRedList',{type: attr}).then(res => {
                        this.$store.commit('SET_REDPACKET',{type: attr + 'NUM',val: res.total_record})
                        this.$store.commit('SET_REDPACKET',{type: attr,val: res.data})
                    })
                }

            }).catch(res =>{
                if(res.code === 2000){
                    this.$toast('您还没有登陆呦~')
                    this.$router.push('/login')
                }
            })
        }
    }
</script>

<style lang="less" scoped>
    @import url('~@/styles/center/redpacket.less');
</style>
<style>
</style>