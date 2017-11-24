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
                express: 'express'
            }
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/seller/sendGoods.less');
</style>