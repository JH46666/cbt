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
                        <mt-button type="default">激活红包</mt-button>
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
                    </div>
                    <div class="redpacket-item">
                        <div class="hd">
                            <div class="left">
                                <p>
                                    <span class="num">10</span>
                                    <span class="type">折</span>
                                </p>
                                <p class="limit-text">满 50 可用</p>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="disabled">
                    555
                </mt-tab-container-item>
            </mt-tab-container>
            <div class="btn-bar">
                <mt-button type="default">取消</mt-button><mt-button type="default">确定</mt-button>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        data(){
            return {
                selected: 'active'
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
</style>