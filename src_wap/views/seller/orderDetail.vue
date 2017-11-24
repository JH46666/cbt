<template>
    <div id="order-detail">
        <section class="main-wrap">
            <section class="head">
                <div class="left">
                    <span class="icon-wrap"><i class="icon-daifukuan"></i></span>
                    <span class="green">待付款</span>
                </div>
                <div class="right">
                    订单号： 205465464849464
                </div>
            </section>
            <section class="text-pannel">
                <div class="top">
                    <h4 class="left">收货人信息</h4>
                    <div class="right"><i class="icon-dingdanliebiaobianji"></i></div>
                </div>
                <p class="user">
                    向我哲人说过呀&nbsp;&nbsp;&nbsp;&nbsp;发射点发射点
                </p>
                <p class="detail limit-2">
                    很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                </p>
                <div class="top">
                    <h4 class="left">买家留言</h4>
                    <!-- <div class="right"><i class="icon-dingdanliebiaobianji"></i></div> -->
                </div>
                <div class="detail-wrap">
                    <p class="detail" :class="{'limit-3':!showMore}">
                        很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                    </p>
                    <span @click="showMoreTxt"><i :class="{'icon-single-down':!showMore,'icon-shang':showMore}"></i></span>
                </div>
                <div class="remark" @click="showRemark">
                    备注：<span class="remark-txt">{{ remark.length > 0 ? remark : '买家不可见' }}</span> 
                </div>
            </section>
            <section class="goods-pannel">
                <h3 class="title">商品信息</h3>
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
            </section>
            <section class="price-pannel">
                <div class="item">
                    <div class="left">商品金额</div>
                    <div class="right">￥999.00</div>
                </div>
                <div class="item">
                    <div class="left">运费</div>
                    <div class="right">￥999.00</div>
                </div>
                <div class="item">
                    <div class="left">实际收入</div>
                    <div class="right gold">￥999.00</div>
                </div>
            </section>
            <section class="date-pannel">
                <div class="item">
                    <div class="left">下单时间</div>
                    <div class="right">2017-11-11 19:00:00</div>
                </div>
                <div class="item">
                    <div class="left">下单时间</div>
                    <div class="right">2017-11-11 19:00:00</div>
                </div>
            </section>
        </section>
        <section class="btn-bar">
            <mt-button size="small" class="btn" @click="closeUp = true">关闭订单</mt-button>
            <mt-button size="small" class="btn gold">发货</mt-button>
        </section>
        
        <!-- 修改备注弹框 -->
        <transition name="down-slow" mode="out-in">
            <div class="edit-remark" v-show="remarkDialog">
                <div class="remark-main">
                    <h4>修改留言</h4>
                    <textarea class="textarea" placeholder="请输入备注" v-model="cloneRemark"></textarea>
                    <div class="btn-wrap">
                        <mt-button size="small" class="btn" @click="remarkDialog = false">取消</mt-button>
                        <mt-button size="small" class="btn gold" @click="confirmRemark">修改</mt-button>
                    </div>
                </div>
            </div>
        </transition>
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
    export default {
        data() {
            return {
                showMore: false,
                remark: '',
                cloneRemark: '',
                remarkDialog: false,
                closeUp: false
            }
        },
        methods: {
            // 买家留言显示更多
            showMoreTxt() {
                this.showMore = !this.showMore;
            },
            // 填写备注
            showRemark() {
                this.cloneRemark = this.remark;
                this.remarkDialog = true;
            },
            // 保存备注
            confirmRemark() {
                this.remark = this.cloneRemark;
                this.remarkDialog = false;
            },
            // 选择关闭订单
            pickClose() {
                this.closeUp = false;
            }
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/seller/orderDetail.less');
</style>