<template>
    <section class="readpacket-pannel">
        <div class="redpacket-wrap">
            <mt-navbar v-model="selected">
                <mt-tab-item id="active">可使用({{ active.canUseRedPacketList ? active.canUseRedPacketList.length : 0 | ninenineAdd }})</mt-tab-item>
                <mt-tab-item id="disabled">不可使用({{ active.cannotUseRedPacketList ? active.cannotUseRedPacketList.length : 0 | ninenineAdd }})</mt-tab-item>
            </mt-navbar>
            <div class="redpacket-content">
                <div class="active-red" v-if="selected === 'active'">
                    <mt-button type="default" @click="showActiveRed">激活红包</mt-button>
                </div>
                <template v-for="(item,index) in list">
                    <div class="redpacket-item" :class="{active: item.id === active.activeRed.id }" v-if="index < listNum">
                        <div class="hd">
                            <div class="left">
                                <p>
                                    <template v-if="item.type === '1'">
                                        <span class="type">￥</span>
                                        <span class="num">{{ item.subAmount | toFix2  }}</span>
                                    </template>
                                    <template v-else>
                                        <span class="num">{{ item.discount  }}</span>
                                        <span class="type">折</span>
                                    </template>
                                </p>
                                <p class="limit-text">满 {{ item.fullAmount | toFix2 }} 可用</p>
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
                            <div class="direction" @click="showMore(index)" v-if="item.remark ? item.remark.length > 24 : false">
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
    export default {
        data(){
            return {
                selected: 'active',
                active: {},
                listNum: 3,
                one: true
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
            }
        },
        methods:{
            // 显示更多文字
            showMore(index) {
                this.list[index].one = !this.list[index].one;
            },
            // 激活红包
            showActiveRed() {
                this.$messageBox({
                    title: '',
                    message: '激活优惠码',
                    confirmButtonText: '立即激活',
                    showCancelButton: true,
                    showInput: true,
                    inputPlaceholder: '请输入优惠码'
                }).then((val) => {
                    console.log(val)
                })
            },
            // 取消按钮
            cancel() {
                this.emit();
            },
            // 确定按钮
            confirm() {
                this.emit();
            },
            emit() {
                this.selected = 'active';
                this.$emit('close');
            },
            setActive(val) {
                this.active = val;
                val.canUseRedPacketList.forEach(val => {
                    this.$set(val,'one',true);
                })
                val.cannotUseRedPacketList.forEach(val => {
                    this.$set(val,'one',true);
                })
                // 给定默认的红包
                if(!val.activeRed) {
                    this.$set(val,'activeRed',val.canUseRedPacketList[0] || {})
                }
            }
        }
    }
</script>




<style lang="less" scoped>
    @import url('~@/styles/balance/index.less');
</style>
<style>
    .mint-navbar .mint-tab-item-label{
        font-size: .3rem;
        border-right: 1px solid #e5e5e5;
    }
    .mint-navbar .mint-tab-item:nth-last-child(1) .mint-tab-item-label{
        border: none;
    }
    .mint-msgbox-wrapper .mint-msgbox-header{
        display: none;
    }
    .mint-msgbox-confirm{
        color: #fff;
        background: #f08200;
    }
</style>