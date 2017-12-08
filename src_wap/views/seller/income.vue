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
        <router-link :to="{name: '卖家订单明细'}" tag="div" class="income_content">
            <i class="iconfont">&#xe67e;</i>
            <span>订单明细</span>
            <i class="iconfont">&#xe744;</i>
        </router-link>
        <div class="income_content">
            <i class="iconfont">&#xe67b;</i>
            <span>今日交易额</span>
            <span>3000.00</span>
        </div>
        <div class="income_list">
            <div class="list_item" v-for="(item,i) in list">
                <p>
                    <span>{{ item.orderNo }}</span>
                    <span>{{ $store.state.order.status[item.orderStatus] }}</span>
                </p>
                <p>
                    <span>{{ item.createTime }}</span>
                    <span>{{ item.orderAllSum | toFix2 }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import store from 'store';
export default {
    data() {
        return {
            list: []
        }
    },
    created() {
        this.$api.post('/oteao/order/preSellerOrderList',{
            pageNumber: 1,
            pageSize: 10,
            device: 'WAP'
        },res => {
            this.list = res.data.order || [];
        })
    },
    // 判断登陆
    beforeRouteEnter (to, from, next) {
        if(!store.state.member.member.id) {
            store.dispatch('getMemberData').then((res) => {
                next();
            }).catch(res => {
                next(vm => {
                    vm.$router.push('/');
                })
            })
        } else {
            next();
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/seller/income.less';
</style>
