<template>
    <div id="pay-view">
        <div class="hd">
            <!-- 失败 -->
            <template v-if="$route.name === '结算失败'">
                <div class="fail-text">
                    <i class="icon-zhifushibai"></i>支付失败
                </div>
                <div class="fail-btn-wrap">
                    <mt-button type="default">查看订单</mt-button>
                    <mt-button type="default">立即支付</mt-button>
                </div>
            </template>
            <!-- 成功 -->
            <template v-if="$route.name === '结算成功'">
                <div class="success-text">
                    <i class="icon-zhifuchenggong"></i>支付成功
                </div>
                <div class="success-btn-wrap">
                    <mt-button type="default">查看订单</mt-button>
                    <mt-button type="default">返回首页</mt-button>
                </div>
            </template>
            <!-- 货到付款 -->
            <template v-if="$route.name === '货到付款结算'">
                <div class="delivery-text">
                    <i class="icon-zhifuchenggong"></i>货到付款订单提交成功
                </div>
                <p class="wait">还需支付<span class="gold">￥500.00</span></p>
                <div class="delivery-btn-wrap">
                    <mt-button type="default">查看订单</mt-button>
                    <mt-button type="default">立即支付</mt-button>
                </div>
            </template>
        </div>
        <div class="bd">
            <div class="text-item">
                <div class="left">陈达团子</div>
                <div class="right">18606062601</div>
            </div>
            <div class="text-item">
                <p>公交总站对面公交总站对面公交总站对面公交总站对面公交总站对面公交总站对面公交总站对面公交总站对面公交总站对面公交总站对面公交总站对面公交总站对面公交总站对面公交总站对面</p>
            </div>
            <div class="text-item">
                <div class="left">待付金额：</div>
                <div class="right"><span class="gold">￥5000</span></div>
            </div>
            <div class="text-item">
                <div class="left">支付方式：</div>
                <div class="right">在线支付</div>
            </div>
        </div>
        <!-- 猜你喜欢 -->
        <may-like v-if="$route.name === '结算成功'"></may-like>
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


<style lang="less" scoped>
    @import url('~@/styles/balance/payView.less');
</style>