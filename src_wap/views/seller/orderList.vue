<template>
    <div id="order-list">
        <mt-navbar v-model="selected">
            <mt-tab-item id="all">全部(99+)</mt-tab-item>
            <mt-tab-item id="waitpay">待付款(99+)</mt-tab-item>
            <mt-tab-item id="waitexpress">代发货(99+)</mt-tab-item>
            <mt-tab-item id="waitreceive">待收货(99+)</mt-tab-item>
        </mt-navbar>
        <!-- 订单面板 -->
        <section class="order-list-wrap">
            <div class="order-pannel">
                <div class="head">
                    <h3 class="title">
                        订单号: 201546464sadas
                    </h3>
                    <span class="type">待付款</span>
                </div>
                <div class="goods-item">
                    <goods-img style="width:1.6rem;height:1.6rem;"></goods-img>
                    <div class="right">
                        <router-link to="#" class="goods-title">醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型</router-link>
                        <p class="goods-bd">
                            <span class="price">￥500</span>
                            <span class="num">×1</span>
                        </p>
                    </div>
                </div>
                <div class="goods-item">
                    <goods-img style="width:1.6rem;height:1.6rem;"></goods-img>
                    <div class="right">
                        <p class="goods-title">醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型</p>
                        <p class="goods-bd">
                            <span class="price">￥500</span>
                            <span class="num">×1</span>
                        </p>
                    </div>
                </div>
                <div class="foot">
                    <div class="text">
                        <p class="left">2017-11-11 00:00:00</p>
                        <p class="right">共3件&nbsp;&nbsp;<span class="gold">￥2000.00</span></p>
                    </div>
                    <div class="btn-wrap">
                        <mt-button size="small" @click="show1">发货</mt-button>
                    </div>
                </div>
            </div>
        </section>
        <!-- 关闭订单部分 -->
        <mt-popup
            v-model="closeUp"
            position="bottom">
            <div class="close-wrap">
                <h3>选择关闭订单原因</h3>
                <p class="close-tip" @click="pickClose()">缺货</p>
                <p class="close-tip" @click="pickClose()">买家不想买了</p>
                <p class="close-tip" @click="pickClose()">其他</p>
                <p class="close-tip" @click="pickClose()">暂不关闭</p>
            </div>
        </mt-popup>
    </div>
</template>


<script>
    export default{
        data() {
            return {
                closeUp: false,         //关闭订单弹出
            }
        },
        computed: {
            selected: {
                get() {
                    if(this.$route.query.type) {
                        return this.$route.query.type
                    } else {
                        this.$router.replace({name: '卖家订单列表',query: {type: 'all'}})
                        return 'all';
                    }
                },
                set(val) {
                    this.$router.replace({name: '卖家订单列表',query: {type: val}})
                }
            }
        },
        methods: {
            // 选择关闭订单
            pickClose() {
                this.closeUp = false;
            },
            show1() {
                this.closeUp = true;
                // console.log(this.$editPrice)
                // this.$editPrice().then((resolve) =>{
                //     console.log(resolve)
                // }).catch(() => {})
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('~@/styles/seller/orderList.less');
</style>