<template>
    <div id="order-list">
        <mt-navbar v-model="selected">
            <mt-tab-item id="null">全部</mt-tab-item>
            <mt-tab-item id="waitPay">待付款</mt-tab-item>
            <mt-tab-item id="groupping">拼团中</mt-tab-item>
            <mt-tab-item id="waitSend">待发货</mt-tab-item>
            <mt-tab-item id="waitRec">已发货</mt-tab-item>
        </mt-navbar>
        <!-- 订单面板 -->
        <section
            :key="selected" 
            class="order-list-wrap"
            v-infinite-scroll="loadMore"
            :infinite-scroll-disabled="false"
            infinite-scroll-distance="10">
            <template v-for="(item,i) in list">
                <router-link tag="div" :to="{name:'卖家订单详情',query:{orderNo:item.orderNo}}" class="order-pannel">
                    <div class="head">
                        <h3 class="title">
                            订单号: {{ item.orderNo }}
                        </h3>
                        <span class="type" v-if="item.lessGroup">待成团，还差<span style="color: #f08200">{{ item.lessGroup }}</span>人</span>
                        <span class="type" v-else>{{ $store.state.order.status[item.orderStatus] }}</span>
                    </div>
                    <template v-for="(todo,index) in item.products">
                        <div class="goods-item">
                            <goods-img style="width:1.6rem;height:1.6rem;" :imgUrl="todo.imageUrl || '/'"></goods-img>
                            <div class="right _fix-right">
                                <div class="goods-title">{{ todo.productName }}</div>
                                <p class="goods-bd _fix-goods-bd">
                                    <span class="price">￥{{ todo.productPrice | toFix2 }}</span>
                                    <span class="num">×{{ todo.productNum }}</span>
                                </p>
                            </div>
                        </div> 
                    </template>
                    <div class="foot">
                        <div class="text _fix-text">
                            <p class="left _fix-left">{{ item.createTime }}</p>
                            <p class="right _fix-right">订单金额：<span class="gold">￥{{ item.orderAllSum | toFix2 }}</span></p>
                        </div>
                        <div class="btn-wrap">
                            <template v-if="item.orderStatus === 'WAIT_PAY'">
                                <mt-button size="small" @click.stop="closeOrder(item)">关闭订单</mt-button>
                                <mt-button size="small" @click.stop="editPrice(item)">修改价格</mt-button>
                            </template>
                            <template v-if="item.orderStatus === 'PACKING' && item.groupSuccess!=2">
                                <mt-button size="small" @click.stop="closeOrder(item)">关闭订单</mt-button>
                                <mt-button size="small" class="gold" @click.stop="$router.push({name:'发货',query:{orderNo:item.orderNo}})">发货</mt-button>
                            </template>
                            <template v-if="item.orderStatus === 'DELIVERED'">
                                <mt-button size="small" @click.stop="closeOrder(item)">关闭订单</mt-button>
                                <mt-button size="small" @click.stop="$router.push({name:'修改配送方式',query:{orderNo:item.orderNo}})">修改快递</mt-button>
                            </template>
                        </div>
                    </div>
                </router-link>
            </template>
            <div class="goods-loading" v-if="loading">
                <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                <span class="loading-text">正在努力加载中</span>
            </div>
            <div class="no-more" v-if="nomore">没有更多了呦</div>
            <div class="mt_empty_wrapper" v-if="noOrder">
                <div class="empty_img">
                    <img src="../../assets/images/empty_list.png" />
                </div>
                <p class="empty_text">您还没有相关的订单哟~</p>
            </div>
        </section>
        <!-- 关闭订单部分 -->
        <!-- 待付款状态 -->
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
        <!-- 打包中，已发货状态 -->
        <mt-popup
            v-model="closeUpSend"
            position="bottom">
            <div class="close-wrap-send">
                <div class="hd">
                    <div class="top">
                        <div class="left">退款金额</div>
                        <div class="right">￥{{ activeOrder.orderAllSum | toFix2 }}</div>
                    </div>
                    <div class="bottom">
                        <i class="iconfont">&#xe68d;</i>关闭订单后，货款将立即退回给买家
                    </div>
                </div>
                <div class="bd">
                    <div class="title">
                        选择关闭订单原因
                    </div>
                    <div class="item-wrap">
                        <div class="item" @click="activeOrder.closeRemark = '缺货'">缺货<i class="iconfont" v-if="activeOrder && activeOrder.closeRemark === '缺货'">&#xe68e;</i></div>
                        <div class="item" @click="activeOrder.closeRemark = '买家不想买了'">买家不想买了<i class="iconfont" v-if="activeOrder && activeOrder.closeRemark === '买家不想买了'">&#xe68e;</i></div>
                        <div class="item" @click="activeOrder.closeRemark = '其他'">其他<i class="iconfont" v-if="activeOrder && activeOrder.closeRemark === '其他'">&#xe68e;</i></div>
                    </div>
                </div>
                <div class="btn-bar">
                    <mt-button type="default" @click="closeUpSend = false">取消</mt-button><mt-button type="default" @click="closeUpSend = false;closeConfirm = true">确定</mt-button>
                </div>
            </div>
        </mt-popup>
        <!-- 弹窗 -->
        <transition name="down-slow">
            <div class="dialog-bg" v-if="closeConfirm">
                <div class="dialog">
                    <div class="input-row">
                        确认退款，即将以下货款金额退给买家，需慎重选择噢~
                    </div>
                    <p class="tips">￥{{ activeOrder.orderAllSum | toFix2 }}</p>
                    <div class="btn-bar">
                        <mt-button type="default" @click="closeConfirm = false">取消</mt-button><mt-button type="default" @click="pickClose(activeOrder.closeRemark)">确定</mt-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>



<script>
    export default{
        data() {
            return {
                closeUp: false,         // 关闭订单弹出
                closeUpSend: false,     // 关闭订单弹出
                closeConfirm: false,    // 再次确认关闭
                pageNum: 1,             // 初始页面
                activeOrder: {},      // 当前激活的订单
            }
        },
        computed: {
            selected: {
                get() {
                    if(this.$route.query.type) {
                        return this.$route.query.type
                    } else {
                        this.$router.replace({name: '卖家订单列表',query: {type: 'null'}})
                        return 'null';
                    }
                },
                set(val) {
                    this.$router.replace({name: '卖家订单列表',query: {type: val}})
                }
            },
            list() {
                try {
                    return this.$store.state.seller.orderList[this.selected].order
                } catch (error) {
                    return []
                }
            },
            nomore() {
                try {
                    if(this.list.length === this.$store.state.seller.orderList[this.selected].orderNum && list.length !== 0) {
                        return true
                    } else {
                        return false
                    }
                } catch (error) {
                    return false
                }
            },
            loading() {
                try {
                    if(this.list.length < this.$store.state.seller.orderList[this.selected].orderNum) {
                        return true
                    } else {
                        return false
                    }
                } catch (error) {
                    return true
                }
            },
            noOrder() {
                try {
                    if(this.$store.state.seller.orderList[this.selected].orderNum) {
                        return false
                    } else {
                        return true
                    }
                    
                } catch (error) {
                    return true
                }
            }
        },
        watch: {
            selected(val) {
                this.$store.dispatch('getSellerOrder',{type: this.selected}).then(res => {
                    this.$store.commit('SET_ORDERLIST',{type:this.selected,data: res.data})
                })
                this.pageNum = 1;
            }
        },
        methods: {
            // 选择关闭订单
            pickClose(way) {
                if(way === '暂不关闭') return  this.closeUp = false;
                this.$api.post('/oteao/order/closeOteaoOrderBySeller',{
                    orderNo: this.activeOrder.orderNo,
                    closeReason: way
                },res => {
                    if(this.activeOrder.orderStatus === 'PACKING' || this.activeOrder.orderStatus === 'DELIVERED') {
                        this.$toast('订单关闭，退款成功~')
                    } else {
                        this.$toast('关闭成功')
                    }
                    this.closeUp = false;
                    this.closeConfirm = false;
                    this.activeOrder.orderStatus = 'CLOSE'
                    this.activeOrder = {};
                },res => {
                    this.$toast(res.message)
                    this.closeUp = false;
                    this.closeConfirm = false;
                    this.activeOrder = {};
                })
            },
            // 关闭订单
            closeOrder(order) {
                this.activeOrder = order;

                if(this.activeOrder.orderStatus === 'PACKING' || this.activeOrder.orderStatus === 'DELIVERED') {
                    this.closeUpSend = true;
                    this.$set(this.activeOrder,'closeRemark','');
                    // this.activeOrder.closeRemark = '';
                } else {
                    this.closeUp = true;
                }
            },
            // 关闭订单选择理由
            chooseWay(way) {
                this.activeOrder.closeRemark = way;
            },
            // 修改价格
            editPrice(data) {
                let math = this.$tool.math
                this.$editPrice({
                    goodsPrice: (math.eval(`${data.orderAllSum} - ${data.freightSum}`)).toFixed(2),
                    expressPrice:  Number(data.freightSum).toFixed(2)
                }).then(prices => {
                    this.$api.post('/oteao/order/updateOrderSum',{
                        orderId: data.orderId,
                        orderSum: prices.goodsPrice,
                        freightSum: prices.expressPrice
                    },res => {
                        this.$toast('成功修改价格！');
                        data.freightSum = prices.expressPrice;
                        data.orderAllSum = math.eval(`${prices.goodsPrice} + ${prices.expressPrice}`).toFixed(2);
                    },res => {
                        this.$toast(res.message)
                    })
                }).catch(res =>{})
            },
            // 无限滚动
            loadMore() {
                try {
                    if(this.list.length < this.$store.state.seller.orderList[this.selected].orderNum) {
                        this.pageNum++
                        this.$store.dispatch('getSellerOrder',{type: this.selected,page:this.pageNum}).then(res => {
                            // 小于10表示最后一页
                            if(res.data.order.length < 10) {
                                this.pageNum--
                            }
                            let data = this.list.concat(res.data.order)
                            this.$store.commit('SET_ORDERLIST',{type:this.selected,data: {
                                order: data,
                                orderNum: res.data.orderNum
                            }})
                        })
                    }
                } catch (error) {
                    return false
                }
            },
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','全部订单');
            
            // 进入页面拉取数据
            this.$store.dispatch('getSellerOrder',{type: this.selected}).then(res => {
                this.$store.commit('SET_ORDERLIST',{type:this.selected,data: res.data})
            })
        }
    }
</script>


<style lang="less">
    @import url('~@/styles/seller/orderList.less');
    /* _add为新增，_fix为修改 */

    /* 修改价格样式 */
    .goods-item{
        ._fix-right{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 0.2rem;
            padding-left: 0rem!important;
            ._fix-goods-bd{
                width: 100%;
                position: absolute;
                bottom: 0rem;
            }
        }
    }
    .foot{
        padding-bottom: 0.24rem!important;
        ._fix-left{
            color: #999;
        }
        ._fix-text{
            margin-bottom: 0rem!important;
        }
    }
        
</style>