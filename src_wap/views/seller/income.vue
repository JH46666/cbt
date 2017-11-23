<template lang="html">
    <div class="income">
        <div class="income_head">
            <div class="income_head_top">
                <div>
                    <img src="../../assets/images/all_income.png" />总销售额
                </div>
                <div>400.00</div>
            </div>
            <div class="income_head_center">
                <div>
                    <span>4000.00</span>
                    <span>已结算（元）</span>
                </div>
                <div>
                    <span>4000.00</span>
                    <span>未结算（元）</span>
                </div>
            </div>
            <div class="income_head_bottom">订单状态为完成时，订单收入才会转到您的账上呦~</div>
        </div>
        <div class="income_content">
            <i class="iconfont">&#xe67e;</i>
            <span>订单明细</span>
            <i class="iconfont">&#xe744;</i>
        </div>
        <div class="income_content">
            <i class="iconfont">&#xe67b;</i>
            <span>今日交易额</span>
            <span>3000.00</span>
        </div>
        <div class="income_list">
            <div class="list_item">
                <p>
                    <span>TP25225252525252</span>
                    <span>待发货</span>
                </p>
                <p>
                    <span>2017-03-04  19:20:00</span>
                    <span>600.00</span>
                </p>
            </div>
            <div class="list_item">
                <p>
                    <span>TP25225252525252</span>
                    <span>待发货</span>
                </p>
                <p>
                    <span>2017-03-04  19:20:00</span>
                    <span>600.00</span>
                </p>
            </div>
            <div class="list_item">
                <p>
                    <span>TP25225252525252</span>
                    <span>待发货</span>
                </p>
                <p>
                    <span>2017-03-04  19:20:00</span>
                    <span>600.00</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="less">
@import '~@/styles/seller/income.less';
</style>
