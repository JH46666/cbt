<template>
    <div id="redpacket">
        <mt-navbar v-model="selected">
            <mt-tab-item id="notUsed">未使用(99+)</mt-tab-item>
            <mt-tab-item id="used">已使用(99+)</mt-tab-item>
            <mt-tab-item id="disable">已失效(99+)</mt-tab-item>
        </mt-navbar>
        <section class="redpacket-main">
            <div class="redpacket-item disabled">
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
            <div class="no-redpacket">
                <img src="../../assets/images/nored.png" alt="">
                <p>没有红包呀~</p>
            </div>
        </section>
        <section class="redpacket-bd">
            <mt-button type="default">激活红包</mt-button>
        </section>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                selected: 'notUsed',
                one: true,
            }
        },
        methods: {
            showMore() {

            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('~@/styles/center/redpacket.less');
</style>