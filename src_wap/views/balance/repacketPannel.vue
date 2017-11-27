<template>
    <section class="readpacket-pannel">
        <div class="redpacket-wrap">
            <mt-navbar v-model="selected">
                <mt-tab-item id="active">可使用(4)</mt-tab-item>
                <mt-tab-item id="disabled">不可使用(0)</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="active">
                    <div class="active-red">
                        <mt-button type="default" @click="showActiveRed">激活红包</mt-button>
                    </div>
                    <div class="redpacket-item active">
                        <div class="hd">
                            <div class="left">
                                <p>
                                    <span class="type">￥</span>
                                    <span class="num">10</span>
                                </p>
                                <p class="limit-text">满 50 可用</p>
                            </div>
                            <div class="right">
                                <p class="title">
                                    <span class="sell-type">自营</span>
                                    中秋红包
                                </p>
                                <p class="date">有效期至 2017-10-11 19:00:00</p>
                            </div>
                            <div class="round-wrap">
                                <span class="round" v-for="n in 5"></span>
                            </div>
                        </div>
                        <div class="bd">
                            <p class="tips" :class="{onlyone:one}">这是很长很长的说明这是很长很长的说明这是很长很长的说明这是很长很长的说明这是很长很长的说明这是很长很长的说明这是很长很长的说明</p>
                            <div class="direction" @click="showMore">
                                <i class="icon-single-down" v-if="one"></i>
                                <i class="icon-shang" v-else="one"></i>
                            </div>
                        </div>
                    </div>
                    <div class="redpacket-item">
                        <div class="hd">
                            <div class="left">
                                <p>
                                    <span class="type">￥</span>
                                    <span class="num">10</span>
                                </p>
                                <p class="limit-text">满 50 可用</p>
                            </div>
                            <div class="right">
                                <p class="title">
                                    <span class="sell-type">自营</span>
                                    中秋红包
                                </p>
                                <p class="date">有效期至 2017-10-11 19:00:00</p>
                            </div>
                            <div class="round-wrap">
                                <span class="round" v-for="n in 5"></span>
                            </div>
                        </div>
                        <div class="bd">
                            <p class="tips" :class="{onlyone:one}">这是很长很长的说明这是很长很长的说明这是很长很长的说明这是很长很长的说明这是很长很长的说明这是很长很长的说明这是很长很长的说明</p>
                            <div class="direction" @click="showMore">
                                <i class="icon-single-down" v-if="one"></i>
                                <i class="icon-shang" v-else="one"></i>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="disabled">
                   <div class="no-redpacket">
                       <img src="../../assets/images/nored.png" alt="">
                       <p>没有红包呀~</p>
                   </div>
                </mt-tab-container-item>
            </mt-tab-container>
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
                one: true
            }
        },
        methods:{
            // 显示更多文字
            showMore() {
                this.one = !this.one;
            },
            // 激活红包
            showActiveRed() {
                this.$messageBox({
                    title: '激活红包',
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
                this.$emit('close');
            },
            // 确定按钮
            confirm() {
                this.$emit('close');
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
    .mint-msgbox-wrapper .mint-msgbox-header{
        display: none;
    }
    .mint-msgbox-confirm{
        color: #fff;
        background: #f08200;
    }
</style>