<template>
    <div id="order-detail">
        <section class="main-wrap">
            <section class="head">
                <div class="left">
                    <span class="icon-wrap"><i class="icon-daifukuan"></i></span>
                    <span class="green">{{ $store.state.order.status[myData.orderStatus] }}</span>
                </div>
                <div class="right">
                    订单号： {{ myData.orderNo }}
                </div>
            </section>
            <section class="text-pannel">
                <div class="top">
                    <h4 class="left">收货人信息</h4>
                    <div class="right"><i class="icon-dingdanliebiaobianji"></i></div>
                </div>
                <p class="user">
                    {{ myData.receiptName }}&nbsp;&nbsp;&nbsp;&nbsp;{{ myData.receiptPhone }}
                </p>
                <div class="detail-wrap">
                    <p class="detail" :class="{'limit-2':!showMoreAddress}">
                        {{ myData.detailAddress }}
                    </p>
                    <span @click="showMoreAddress = !showMoreAddress" v-if="myData.detailAddress ? myData.detailAddress.length >44 : false"><i :class="{'icon-single-down':!showMoreAddress,'icon-shang':showMoreAddress}"></i></span>
                </div>
                <div class="top">
                    <h4 class="left">买家留言</h4>
                    <!-- <div class="right"><i class="icon-dingdanliebiaobianji"></i></div> -->
                </div>
                <div class="detail-wrap">
                    <p class="detail" :class="{'limit-3':!showMore}">
                        {{ myData.orderRemark || '&nbsp;' }}
                    </p>
                    <span @click="showMore = !showMore" v-if="myData.detailAddress ? myData.detailAddress.length >66 : false"><i :class="{'icon-single-down':!showMore,'icon-shang':showMore}"></i></span>
                </div>
                <div class="remark" @click="showRemark">
                    备注：<span class="remark-txt">{{ remark.length > 0 ? remark : '买家不可见' }}</span> 
                </div>
            </section>
            <section class="goods-pannel">
                <h3 class="title">商品信息</h3>
                <div class="goods-item" v-for="(item,index) in list">
                    <goods-img style="width:1.6rem;height:1.6rem;" :imgUrl="item.imageUrl || '/'"></goods-img>
                    <div class="right">
                        <p class="goods-title">{{ item.productName }}</p>
                        <p class="goods-bd">
                            <span class="price">￥{{ item.productPrice }}</span>
                            <span class="num">×{{ item.productNum }}</span>
                        </p>
                    </div>
                </div>
            </section>
            <section class="price-pannel">
                <div class="item">
                    <div class="left">商品金额</div>
                    <div class="right">￥{{ orderPrice | toFix2  }}</div>
                </div>
                <div class="item">
                    <div class="left">运费</div>
                    <div class="right">￥{{ myData.freightSum | toFix2  }}</div>
                </div>
                <div class="item">
                    <div class="left">实际收入</div>
                    <div class="right gold">￥{{ myData.orderSum | toFix2  }}</div>
                </div>
            </section>
            <section class="date-pannel">
                <div class="item" v-if="myData.createTime">
                    <div class="left">下单时间</div>
                    <div class="right">{{ myData.createTime }}</div>
                </div>
                <div class="item" v-if="myData.payTime">
                    <div class="left">付款时间</div>
                    <div class="right">{{ myData.payTime }}</div>
                </div>
                <div class="item" v-if="myData.sendTime">
                    <div class="left">发货时间</div>
                    <div class="right">{{ myData.sendTime }}</div>
                </div>
                <div class="item" v-if="myData.recTime">
                    <div class="left">确认收货</div>
                    <div class="right">{{ myData.recTime }}</div>
                </div>
                <div class="item">
                    <div class="left">评价</div>
                    <div class="right">2017-11-11 19:00:00</div>
                </div>
                <div class="item" v-if="myData.cancelTime">
                    <div class="left">取消时间</div>
                    <div class="right">{{ myData.cancelTime }}</div>
                </div>
            </section>
        </section>
        <section class="btn-bar">
            <template v-if="myData.orderStatus === 'WAIT_PAY'">
                <mt-button size="small" class="btn" @click="closeUp = true">关闭订单</mt-button>
                <mt-button size="small" class="btn" @click="editPrice">修改价格</mt-button>
            </template>
            <template v-if="myData.orderStatus === 'PACKING' || myData.orderStatus === 'PAY_WAIT_AUDIT'">
                <mt-button size="small" class="btn" @click="closeUp = true">关闭订单</mt-button>
                <mt-button size="small" class="btn gold" @click.stop="$router.push({name:'发货',query:{orderNo:myData.orderNo}})">发货</mt-button>
            </template>
            <template v-if="myData.orderStatus === 'DELIVERED'">
                <mt-button size="small" class="btn" @click.stop="$router.push({name:'修改配送方式',query:{orderNo:myData.orderNo}})">修改快递</mt-button>
            </template>
        </section>
        
        <!-- 修改备注弹框 -->
        <transition name="down-slow" mode="out-in">
            <div class="edit-remark" v-show="remarkDialog">
                <div class="remark-main">
                    <h4>修改留言</h4>
                    <textarea class="textarea" placeholder="请输入备注" v-model="cloneRemark"></textarea>
                    <p class="tip">该备注买家不可见</p>
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
                <p class="close-tip" @click="pickClose('缺货')">缺货</p>
                <p class="close-tip" @click="pickClose('买家不想买了')">买家不想买了</p>
                <p class="close-tip" @click="pickClose('其他')">其他</p>
                <p class="close-tip" @click="pickClose('暂不关闭')">暂不关闭</p>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showMore: false,                // 留言更多
                showMoreAddress: false,         // 地址更多
                remark: '',                     // 备注
                cloneRemark: '',                // 备注备份
                remarkDialog: false,            // 备注弹框
                closeUp: false,                 // 关闭订单
                myData: {},                     // 订单详情
                list: [],                       // 商品列表
                orderPrice: ''
            }
        },
        methods: {
            // 填写备注
            showRemark() {
                this.cloneRemark = this.remark;
                this.remarkDialog = true;
            },
            // 保存备注
            confirmRemark() {
                this.$api.post('/oteao/order/updateOrderRemark',{
                    orderId: this.myData.orderId,
                    customerRemark: this.cloneRemark
                },res => {
                    this.remark = this.cloneRemark;
                    this.remarkDialog = false;
                    this.$toast('备注修改成功')
                },res => {
                    this.$toast(res.message)
                })
            },
            // 选择关闭订单
            pickClose(way) {
                if(way === '暂不关闭') return  this.closeUp = false;
                this.$api.post('/oteao/order/closeOteaoOrderBySeller',{
                    orderNo: this.myData.orderNo,
                    closeReason: way
                },res => {
                    this.$toast('关闭成功')
                    this.closeUp = false;
                    this.myData.orderStatus = 'CLOSE'
                },res => {
                    this.$toast(res.message)
                    this.closeUp = false;
                })
            },
            // 修改价格
            editPrice() {
                let math = this.$tool.math
                this.$editPrice({
                    goodsPrice: (math.eval(`${this.myData.orderAllSum} - ${this.myData.freightSum}`)).toFixed(2),
                    expressPrice:  Number(this.myData.freightSum).toFixed(2)
                }).then(prices => {
                    this.$api.post('/oteao/order/updateOrderSum',{
                        orderId: this.myData.orderId,
                        orderSum: prices.goodsPrice,
                        freightSum: prices.expressPrice
                    },res => {
                        this.$toast('成功修改价格！');
                        this.myData.freightSum = prices.expressPrice;
                        this.myData.orderAllSum = math.eval(`${prices.goodsPrice} + ${prices.expressPrice}`).toFixed(2);
                    },res => {
                        this.$toast(res.message)
                    })
                }).catch(res =>{})
            },
        },
        created() {
            let orderNo = this.$route.query.orderNo;
            this.$api.post('/oteao/order/findOrderByNo',{
                orderNo,
                delYes: 0
            },res =>{
                this.myData = res.data || {};
                this.remark = this.myData.customerRemark || '';
                this.orderPrice = this.$tool.math.eval(`${this.myData.orderSum} - ${this.myData.freightSum}`);

                this.$api.post('/oteao/order/orderProductList',{orderId: this.myData.orderId,device: 'WAP'},res => {
                    this.list = res.data.mainOrder.products
                })
            })
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/seller/orderDetail.less');
</style>