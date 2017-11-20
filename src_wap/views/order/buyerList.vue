<template lang="html">
    <div class="list">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">待付款</mt-tab-item>
            <mt-tab-item id="3">待发货</mt-tab-item>
            <mt-tab-item id="4">待收货</mt-tab-item>
            <mt-tab-item id="5">待评价</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <mt-cell v-for="n in 10" :title="'全部 ' + n" :key="n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :title="'待付款 ' + n" :key="n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-cell v-for="n in 6" :title="'待发货 ' + n" :key="n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <mt-cell v-for="n in 2" :title="'待收货 ' + n" :key="n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="5">
                <mt-cell v-for="n in 8" :title="'待评价 ' + n" :key="n" />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: '1'
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/order/list.less';
</style>
