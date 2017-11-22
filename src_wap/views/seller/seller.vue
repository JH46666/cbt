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
            <div class="goback" @click="$router.go(-1)">
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
                <router-link to="#" class="entry">
                    全部订单 <i class="icon-icon07"></i>
                </router-link>
            </div>
            <div class="order-entry">
                <router-link to="#" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-daifukuan"></i></span>
                    <p>待付款</p>
                </router-link>
                <router-link to="#" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-daifahuo"></i></span>
                    <p>代发货</p>
                </router-link>
                <router-link to="#" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-daishouhuo"></i></span>
                    <p>待收货</p>
                </router-link>
                <router-link to="#" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-shangpinpingjia"></i></span>
                    <p>待评价</p>
                </router-link>
            </div>
        </section>
        <section class="tools-pannel">
            <div class="tools-row">
                <router-link to="#" class="item">
                    <span><i class="icon-xiaoshouguanli blue"></i></span>
                    <p>商品管理</p>
                </router-link>
                <router-link to="#" class="item">
                    <span><i class="icon-daishouhuo"></i></span>
                    <p>运费配置</p>
                </router-link>
                <router-link to="#" class="item">
                    <span><i class="icon-tejiaguanli"></i></span>
                    <p>限时特价</p>
                </router-link>
                <router-link to="#" class="item">
                    <span><i class="icon-daishouhuo"></i></span>
                    <p>我的收入</p>
                </router-link>
            </div>
            <div class="tools-row">
                <router-link to="#" class="item">
                    <span><i class="icon-daishouhuo blue"></i></span>
                    <p>店铺信息</p>
                </router-link>
            </div>
        </section>
        <div class="new-up">
            <mt-button type="default"><span class="add"><i class="icon-xinzeng"></i></span>新品上架</mt-button>
        </div>
    </div>
</template>





<style lang="less" scoped>
    @import url('~@/styles/center/seller.less');
</style>