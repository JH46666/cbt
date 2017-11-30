<template>
    <div id="seller">
        <section class="head">
            <div class="left">
                <span class="icon-wrap">
                    <i class="icon-zhongxindianpu"></i>
                </span>
            </div>
            <div class="right">
                <p class="user">
                    不可秒速的店铺
                </p>
                <div class="level-wrap">
                    <div class="level-left">
                        <span class="level level-4" v-for="n in 3"></span>
                    </div>
                    <div class="level-right">100000分</div>
                </div>
                <p class="sum-count">
                    您在茶帮通已收入 ￥5000.00 元
                </p>
            </div>
            <div class="goback" @click="$router.push({name: '个人中心'})">
                返回买家中心
            </div>
        </section>
        <section class="count-entry">
            <router-link to="#" tag="div" class="count-item">
                <p class="num">0.00</p>
                <p class="tips">当月收入</p>
            </router-link>
            <router-link to="#" tag="div" class="count-item">
                <p class="num">0</p>
                <p class="tips">当月订单数</p>
            </router-link>
        </section>
        <section class="order-wrap">
            <div class="title">
                <h3>卖家订单中心</h3>
                <router-link to="/seller/orderlist?type=null" class="entry">
                    全部订单 <i class="icon-icon07"></i>
                </router-link>
            </div>
            <div class="order-entry">
                <router-link to="/seller/orderlist?type=waitPay" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-gerenzhongxin_daifukuan"></i></span>
                    <p>待付款</p>
                </router-link>
                <router-link to="/seller/orderlist?type=waitSend" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-gerenzhongxin_daifahuo"></i></span>
                    <p>待发货</p>
                </router-link>
                <router-link to="/seller/orderlist?type=waitRec" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-gerenzhongxin_yifahuo"></i></span>
                    <p>已发货</p>
                </router-link>
                <!-- <router-link to="#" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-gerenzhongxin_daipingjia"></i></span>
                    <p>待评价</p>
                </router-link> -->
            </div>
        </section>
        <section class="tools-pannel">
            <div class="tools-row">
                <router-link to="#" class="item">
                    <span><i class="icon-xiaoshouguanli blue"></i></span>
                    <p>商品管理</p>
                </router-link>
                <router-link to="#" class="item">
                    <span><i class="icon-yunfeipeizhi"></i></span>
                    <p>运费配置</p>
                </router-link>
                <router-link to="#" class="item">
                    <span><i class="icon-tejiaguanli"></i></span>
                    <p>限时特价</p>
                </router-link>
                <router-link to="#" class="item">
                    <span><i class="icon-shouru small"></i></span>
                    <p>我的收入</p>
                </router-link>
            </div>
            <div class="tools-row">
                <router-link to="#" class="item">
                    <span><i class="icon-xiaoxi blue small"></i></span>
                    <p>店铺信息</p>
                </router-link>
            </div>
        </section>
        <div class="new-up">
            <mt-button type="default" @click="$router.push({name: '新品上架-1'})"><span class="add"><i class="icon-xinzeng"></i></span>创建商品</mt-button>
        </div>
    </div>
</template>





<style lang="less" scoped>
    @import url('~@/styles/seller/seller.less');
</style>