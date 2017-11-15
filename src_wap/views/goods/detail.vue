<template>
    <div class="detail">
        <div class="detail_wrapper">
            <div class="detail_img">
                <img src="../../assets/detail.png" alt="">
            </div>
        </div>
        <div class="detail_footer">
            <mt-tabbar v-model="selected" class="cbt-footer">
                <mt-tab-item id="客服">
                    <i class="icon-rexian" slot="icon"></i>
                    客服
                </mt-tab-item>
                <mt-tab-item id="购物车">
                    <i class="icon-shopcar" slot="icon"></i>
                    购物车
                    <mt-badge type="error" size="small">99+</mt-badge>
                </mt-tab-item>
                <mt-tab-item id="加入购物车">
                    加入购物车
                </mt-tab-item>
            </mt-tabbar>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: null
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/less/detail.less';

</style>
