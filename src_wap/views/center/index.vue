<template>
    <div class="buyers" id="center">
        <section class="header">
            <div class="hd">
                <div class="user-wrap">
                    <div class="user">18206062601</div>
                    <div class="sign">
                        <div class="sign-btn">
                            <span>+ 50积分</span>
                            <mt-button size="small">签到</mt-button>
                        </div>
                    </div>
                </div>
                <div class="level">
                    4级经销商
                </div>
                <div class="experience-wrap">
                    <div class="experience-bar">
                        <div class="experience" style="width:50%;"></div>
                    </div>
                    24,000 / 30,000
                </div>
            </div>
            <div class="bd">
                <p class="bd-text">累积消费￥24000，还差￥6000晋升3级经销商字多就走起来走起来字多就走起来走起来字多就走起来走起来就走起来走起来字多就走起来走起来字多就走起来走起来就走起来走起来字多就走起来走起来字多就走起来走起来就走起来走起来字多就走起来走起来字多就走起来走起来就走起来走起来字多就走起来走起来字多就走起来走起来就走起来走起来字多就走起来走起来字多就走起来走起来就走起来走起来字多就走起来走起来字多就走起来走起来</p>
            </div>
        </section>
        <section class="count-entry">
            <router-link :to="{name: '账户余额'}" tag="div" class="entry-item">
                <div class="num">100.00</div>
                <p class="count-text">账户余额(元)</p>
            </router-link>
            <router-link :to="{name: '积分记录'}" tag="div" class="entry-item">
                <div class="num">100</div>
                <p class="count-text">我的积分</p>
            </router-link>
            <router-link :to="{name: '红包列表'}" tag="div" class="entry-item">
                    <div class="num">100</div>
                    <p class="count-text">红包个数</p>
            </router-link>
        </section>
        <section class="order">
            <div class="title">
                <h3>我的订单</h3>
                <router-link :to="{name: '订单列表',query: {orderStatus:'null'}}" class="all-order">
                    全部订单 <i class="icon-icon07"></i>
                </router-link>
            </div>
            <div class="order-entry">
                <router-link :to="{name: '订单列表',query: {orderStatus:'waitPay'}}" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-gerenzhongxin_daifukuan"></i></span>
                    <p>待付款</p>
                </router-link>
                <router-link :to="{name: '订单列表',query: {orderStatus:'waitSend'}}" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-gerenzhongxin_daifahuo"></i></span>
                    <p>待发货</p>
                </router-link>
                <router-link :to="{name: '订单列表',query: {orderStatus:'waitRec'}}" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-gerenzhongxin_yifahuo"></i></span>
                    <p>待收货</p>
                </router-link>
                <router-link :to="{name: '订单列表',query: {orderStatus:'waitComment'}}" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-shangpinpingjia"></i></span>
                    <p>待评价</p>
                </router-link>
                <!-- <router-link to="#" class="item">
                    <mt-badge size="small" type="error">30</mt-badge>
                    <span><i class="icon-tuikuandingdan"></i></span>
                    <p>退款</p>
                </router-link> -->
            </div>
        </section>
        <section class="tools">
            <router-link :to="{name: '地址管理'}" class="tools-entry">
                <div class="left"><i class="icon-maijiadizhiguanli"></i>地址管理</div>
                <div class="right"><i class="icon-icon07"></i></div>
            </router-link>
            <router-link :to="{name: '忘记密码'}" class="tools-entry">
                <div class="left"><i class="icon-xiugaimima"></i>修改密码</div>
                <div class="right"><i class="icon-icon07"></i></div>
            </router-link>
            <router-link :to="{name: '地址管理'}" class="tools-entry">
                <div class="left"><i class="icon-zhongxindianpu"></i>申请为卖家</div>
                <div class="right"><i class="icon-icon07"></i></div>
            </router-link>
        </section>
        <section class="quit">
            <mt-button type="default">退出登录</mt-button>
        </section>
    </div>
</template>


<script>
    export default {
        created() {
            this.$api.get('/oteao/memberAccount/findByOneMember',{},res => {
                console.log(res)
            })
        }
    }
</script>

<style lang="less" scoped>
    @import url('~@/styles/center/index.less');
</style>