<!--
    props           type            default
    cartList        String          false       //结算页面调用


-->
<template>
    <section class="readpacket-pannel">
        <div class="redpacket-wrap">
            <mt-navbar v-model="selected">
                <mt-tab-item id="active">可使用({{ active.canUseRedPacketList ? active.canUseRedPacketList.length : 0 | ninenineAdd }})</mt-tab-item>
                <mt-tab-item id="disabled">不可使用({{ active.cannotUseRedPacketList ? active.cannotUseRedPacketList.length : 0 | ninenineAdd }})</mt-tab-item>
            </mt-navbar>
            <div class="redpacket-content" 
            :key="selected"
            v-infinite-scroll="loadMore"
            :infinite-scroll-disabled="false"
            infinite-scroll-distance="10">
                <div class="active-red" v-if="selected === 'active'">
                    <mt-button type="default" @click="showActiveRed" style="font-size:.28rem;">激活红包</mt-button>
                </div>
                <template v-for="(item,index) in list">
                    <div class="redpacket-item" :class="{active: item.id === activeRed,disabled:selected === 'disabled' }" v-if="index < listNum" @click="pick(item)">
                        <div class="hd">
                            <div class="left">
                                <p>
                                    <template v-if="item.type === '1'">
                                        <span class="type">￥</span>
                                        <span class="num">{{ formatPrice(item.subAmount) }}</span>
                                    </template>
                                    <template v-else>
                                        <span class="num">{{ item.discount  }}</span>
                                        <span class="type">折</span>
                                    </template>
                                </p>
                                <p class="limit-text">满 {{ formatPrice(item.fullAmount) }} 元可用</p>
                            </div>
                            <div class="right">
                                <p class="title">
                                    <span class="sell-type">自营</span>
                                    <span class="t">{{ item.name }}</span> 
                                </p>
                                <p class="date">有效期至 {{ item.deadline }}</p>
                            </div>
                            <div class="round-wrap">
                                <span class="round" v-for="n in 5"></span>
                            </div>
                        </div>
                        <div class="bd">
                            <p class="tips" :class="{onlyone:item.one}">{{ item.remark }}</p>
                            <div class="direction" @click.stop="showMore(index)" v-if="item.remark ? item.remark.length > 24 : false">
                                <i class="icon-single-down" v-if="item.one"></i>
                                <i class="icon-shang" v-else="!item.one"></i>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="goods-loading" v-if="listNum < list.length">
                    <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                    <span class="loading-text">正在努力加载中</span>
                </div>
                <div class="no-more" v-if="listNum >= list.length && list.length !== 0">没有更多了呦~</div>
                <div class="no-redpacket" v-if="list.length === 0">
                    <img src="../../assets/images/nored.png" alt="">
                    <p>没有红包呀~</p>
                </div>
            </div>
            <div class="btn-bar">
                <mt-button type="default" @click="cancel">取消</mt-button><mt-button type="default" @click="confirm">确定</mt-button>
            </div>
        </div>
    </section>
</template>


<script>
    import { mapState } from 'vuex'
    export default {
        props:{
            cartList:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                selected: 'active',
                active: {},
                activeRed: null,
                listNum: 3,
            }
        },
        watch: {
            selected() {
                this.listNum = 3;
            }
        },
        computed: {
            list() {
                if(this.active.canUseRedPacketList === undefined) {
                    return [];
                }
                if(this.selected === 'active') {
                    return this.active.canUseRedPacketList;
                } else {
                    return this.active.cannotUseRedPacketList; 
                }
            },
            ...mapState({
                id: state => state.member.member.id
            })
        },
        methods:{
            // 显示更多文字
            showMore(index) {
                this.list[index].one = !this.list[index].one;
            },
            // 激活红包
            showActiveRed() {
                this.$redActive().then(data => {
                    this.$api.post('/oteao/member/redPacket/doActivateBySerialNumber',{
                        device: 'WAP',
                        memberId: this.id,
                        sysId:1,
                        serialNumber: data.redCode
                    },res => {
                        this.$toast('激活成功，已放入我的红包');

                        // 从新拉取数据
                        this.$api.post('/oteao/shoppingCart/initSettle',{
                                cartIds: this.cartList,
                                device: 'WAP'
                            },res => {
                                this.setActive(res.data.oteaoCart[0]);
                            },res => {
                            })
                        this.pageNum = 1;

                    },res => {

                        let toast = {
                            1000: '该激活码己被使用！',
                            4044: '该激活优惠码己被使用！',
                            4018: '该激活码不存在或己过期！',
                            4041: '该激活码不存在或己过期！',
                            4060: '该激活码不存在或己过期！',
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
            // 无限滚动
            loadMore() {
                if(this.listNum < this.list.length) {
                    setTimeout(() => {
                        this.listNum += 3;
                        if(this.listNum > this.list.length) {
                            this.listNum = this.list.length;
                        }
                    },100)
                }
            },
            // 取消按钮
            cancel() {
                this.emit('close');
            },
            // 确定按钮
            confirm() {
                this.active.useRedPacketId = this.activeRed;
                this.emit('confirm');
            },
            // 选择红包
            pick(item){
                if(this.selected === 'disabled') return;
                if(item.id === this.activeRed) {
                    this.activeRed = -1;
                } else {
                    this.activeRed = item.id
                }
            },
            // 触发事件
            emit(type) {
                this.$emit('close',type);
                this.selected = 'active';
            },
            setActive(val) {
                this.active = val;
                val.canUseRedPacketList.forEach(val => {
                    this.$set(val,'one',true);
                })
                val.cannotUseRedPacketList.forEach(val => {
                    this.$set(val,'one',true);
                })
                this.activeRed = val.useRedPacketId;
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
        }
    }
</script>




<style lang="less" scoped>
    @import url('~@/styles/balance/index.less');
</style>