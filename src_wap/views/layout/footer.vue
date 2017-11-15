<template>
    <mt-tabbar v-model="selected" class="cbt-footer">
        <mt-tab-item id="外卖">
            <i class="icon-home" slot="icon"></i>
            首页
        </mt-tab-item>
        <mt-tab-item id="订单">
            <i class="icon-fenlei" slot="icon"></i>
            分类
        </mt-tab-item>
        <mt-tab-item id="发现">
            <i class="icon-shopcar" slot="icon"></i>
            购物车
            <mt-badge type="error" size="small">99+</mt-badge>
        </mt-tab-item>
        <mt-tab-item id="我的">
            <i class="icon-wode" slot="icon"></i>
            我的
        </mt-tab-item>
    </mt-tabbar>
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