<template lang="html">
    <div class="recruit">
        <div class="recruit_head">
            <p>欢迎入驻茶帮通</p>
        </div>
        <div class="recruit_section">
        <template v-if="block.trim() === ''">
            <div>
                <div class="recruit_box">
                    <p><span>百万</span>收入不是梦</p>
                    <img src="../../assets/images/seller_zm.png" />
                    <p>茶帮通，产地茶全渠道运营服务平台</p>
                    <p>让茶叶买卖更轻松</p>
                </div>
            </div>
        </template>
        <template v-else>
            <div v-html="block">
                
            </div>
        </template>
            <mt-button type="primary" @click.native="goRegist">注册为卖家</mt-button>
            <!-- <p class="look_item">查看注册要求<i class="iconfont">&#xe744;</i></p> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            block: ''
        }
    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','卖家招募');
        
        this.$store.dispatch('getBlock','waprecruit').then(res => {
            this.block = res.data.htmlText
        })

    },
    methods: {
        goRegist() {
            this.$router.push({
                name: '茶帮通注册4'
            });
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/seller/selleRecruit.less';
</style>
