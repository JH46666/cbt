<template>
    <div id="sendGoods">
        <div class="send-wrap">
            <div class="address">
                <div class="left"><i class="icon-dizhi"></i></div>
                <div class="center">
                    <p class="user">陈伟欸 &nbsp;&nbsp; 18006062601</p>
                    <p>很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址很长很长的地址</p>
                </div>
                <!-- <div class="right"><i class="icon-icon07"></i></div> -->
            </div>
            <h3 class="title">选择配送方式</h3>
            <section class="pick-pannel">
                <label class="pick-item" :class="{active:express === 'express'}">
                    快递配送
                    <input type="radio" value="express" class="hide" v-model="express">
                </label>
                <label class="pick-item" :class="{active:express === 'member'}">
                    客户自提
                    <input type="radio" value="member" class="hide" v-model="express">
                </label>
            </section>
            <section class="express-pannel">
                <label class="express-row">
                    <span class="head">快递公司</span><input type="text" placeholder="请选择快递公司">
                </label>
                <label class="express-row">
                    <span class="head">快递单号</span><input type="text" placeholder="请填写快递单号">
                </label>
            </section>
            <h3 class="title">需发货商品</h3>
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
        </div>

        <div class="btn-bar">
            <mt-button type="default">确定发货</mt-button>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                express: 'express',
                myData: {}
            }
        },
        computed: {
            list() {
                try {
                    let selected = this.$route.query.selected;
                    let index = this.$route.query.index;
                    return this.$store.state.seller.orderList[selected].order[index];
                } catch (error) {
                    return []
                }
            }
        },
        created() {
            let orderNo = this.$route.query.orderNo;
            this.$api.post('/oteao/order/findOrderByNo',{
                orderNo,
                delYes: 0
            },res =>{
                this.myData = res.data || {};

                // 根据本来信息部署
                if(this.myData.expressDeliveryCode === 'get_self') {
                    this.express = 'member'
                } else {
                    this.express = 'express'
                }

            })
            // 判断一开始时是否有信息，防止用户刷新信息丢失
            let selected = this.$route.query.selected;
            let index = this.$route.query.index;
            if(this.$store.state.seller.orderList[selected].order.length === 0) {
                this.$store.dispatch('getSellerOrder',{type: selected}).then(res => {
                    this.$store.commit('SET_ORDERLIST',{type:selected,data: res.data})
                })
            }
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/seller/sendGoods.less');
</style>