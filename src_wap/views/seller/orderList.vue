<template>
    <div id="order-list">
        <mt-navbar v-model="selected">
            <mt-tab-item id="null">全部</mt-tab-item>
            <mt-tab-item id="waitPay">待付款</mt-tab-item>
            <mt-tab-item id="waitSend">待发货</mt-tab-item>
            <mt-tab-item id="waitRec">已发货</mt-tab-item>
        </mt-navbar>
        <!-- 订单面板 -->
        <section 
            class="order-list-wrap"
            v-infinite-scroll="loadMore"
            :infinite-scroll-disabled="scroll">
            <div class="order-pannel" v-for="(item,i) in list">
                <div class="head">
                    <h3 class="title">
                        订单号: {{ item.orderNo }}
                    </h3>
                    <span class="type"> {{ orderType(item.orderStatus) }}</span>
                </div>
                <template v-for="(todo,index) in item.products">
                    <router-link tag="div" :to="{name:'卖家订单详情',query:{orderno:item.orderNo}}" class="goods-item">
                        <goods-img style="width:1.6rem;height:1.6rem;" :imgUrl="todo.imageUrl || '/'"></goods-img>
                        <div class="right">
                            <div class="goods-title">{{ todo.productName }}</div>
                            <p class="goods-bd">
                                <span class="price">￥{{ todo.productPrice | toFix2 }}</span>
                                <span class="num">×{{ todo.productNum }}</span>
                            </p>
                        </div>
                    </router-link> 
                </template>
                <div class="foot">
                    <div class="text">
                        <p class="left">{{ item.createTime }}</p>
                        <p class="right">共{{ item.products.length }}件&nbsp;&nbsp;<span class="gold">￥{{ item.productPaySum | toFix2 }}</span></p>
                    </div>
                    <div class="btn-wrap">
                        <template v-if="item.orderStatus === 'WAIT_PAY'">
                            <mt-button size="small">关闭订单</mt-button>
                            <mt-button size="small">修改价格</mt-button>
                        </template>
                        <template v-if="item.orderStatus === 'PACKING' || item.orderStatus === 'PAY_WAIT_AUDIT'">
                            <mt-button size="small">关闭订单</mt-button>
                            <mt-button size="small" class="gold">发货</mt-button>
                        </template>
                        <template v-if="item.orderStatus === 'DELIVERED'">
                            <mt-button size="small">修改快递</mt-button>
                        </template>
                    </div>
                </div>
            </div>
            <div class="goods-loading" v-if="!scroll && list.length >= 10">
                <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                <span class="loading-text">正在努力加载中</span>
            </div>
            <div class="no-more" v-if="scroll">没有更多了呦</div>
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
                closeUp: false,         // 关闭订单弹出
                scroll: false,          // 无限滚动
                pageNum: 0,             // 初始页面
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
            pickClose() {
                this.closeUp = false;
            },
            // 无限滚动
            loadMore() {
                this.pageNum++
                this.$store.dispatch('getSellerOrder',{type: this.selected,page:this.pageNum}).then(res => {
                    // 小于10表示最后一页
                    if(res.data.order < 10) {
                        this.pageNum--
                    }
                    console.log(res)
                })
            },
            // 订单状态
            orderType(status) {
                let state = ''
                switch(status) {
                    case 'WAIT_PAY':
                    state = '待付款'
                    break;
                    case 'PACKING':
                    state = '待发货'
                    break;
                    case 'PAY_WAIT_AUDIT':
                    state = '支付成功，待审核'
                    break;
                    case 'DELIVERED':
                    state = '已发货'
                    break;
                    case 'CANCEL':
                    state = '已取消'
                    break;
                    case 'CLOSE':
                    state = '已取消'
                    break;
                }
                return state
            }
        },
        created() {
            this.$store.dispatch('getSellerOrder',{type: this.selected}).then(res => {
                this.$store.commit('SET_ORDERLIST',{type:this.selected,data: res.data})
            })
        }
    }
</script>


<style lang="less" scoped>
    @import url('~@/styles/seller/orderList.less');
</style>