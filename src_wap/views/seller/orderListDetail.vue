<template>
    <div id="order-list" class="detail">
        <section class="head-bar">
            <mt-navbar v-model="selected">
                <mt-tab-item id="allRevenue">全部</mt-tab-item>
                <mt-tab-item id="successed">已结算</mt-tab-item>
                <mt-tab-item id="unFinsh">未结算</mt-tab-item>
            </mt-navbar>
            <div class="screen-bar" :class="{active: filterVisible}" @click="filterVisible = true">
                <i class="iconfont">&#xe674;</i> 筛选
            </div>
        </section>
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
                        <span class="type">{{ $store.state.order.status[item.orderStatus] }}</span>
                    </div>
                    <template v-for="(todo,index) in item.products">
                        <div class="goods-item">
                            <goods-img style="width:1.6rem;height:1.6rem;" :imgUrl="todo.imageUrl || '/'"></goods-img>
                            <div class="right">
                                <div class="goods-title">{{ todo.productName }}</div>
                                <p class="goods-bd">
                                    <span class="price">￥{{ todo.productPrice | toFix2 }}</span>
                                    <span class="num">×{{ todo.productNum }}</span>
                                </p>
                            </div>
                        </div> 
                    </template>
                    <div class="foot">
                        <div class="text">
                            <p class="left">{{ item.createTime }}</p>
                            <p class="right">共{{ item.products.length }}件&nbsp;&nbsp;<span class="gold">￥{{ item.orderAllSum | toFix2 }}</span></p>
                        </div>
                        <!-- <div class="btn-wrap">
                            <template v-if="item.orderStatus === 'WAIT_PAY'">
                                <mt-button size="small" @click.stop="closeOrder(item)">关闭订单</mt-button>
                                <mt-button size="small" @click.stop="editPrice(item)">修改价格</mt-button>
                            </template>
                            <template v-if="item.orderStatus === 'PACKING' || item.orderStatus === 'PAY_WAIT_AUDIT'">
                                <mt-button size="small" @click.stop="closeOrder(item)">关闭订单</mt-button>
                                <mt-button size="small" class="gold" @click.stop="$router.push({name:'发货',query:{orderNo:item.orderNo}})">发货</mt-button>
                            </template>
                            <template v-if="item.orderStatus === 'DELIVERED'">
                                <mt-button size="small" @click.stop="$router.push({name:'修改配送方式',query:{orderNo:item.orderNo}})">修改快递</mt-button>
                            </template>
                        </div> -->
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
        <!-- 日期选择器 -->
        <mt-datetime-picker
            ref="start"
            :startDate="new Date('2010-01-01 00:00:00')"
            :endDate="new Date()"
            type="datetime"
            v-model="startTime">
        </mt-datetime-picker>
        <mt-datetime-picker
            ref="end"
            :startDate="new Date(startTime)"
            :endDate="new Date()"
            type="datetime"
            v-model="endTime">
        </mt-datetime-picker>
        <!-- 筛选弹窗 -->
        <mt-popup v-model="filterVisible" position="bottom" class="popup-filter">
            <h4 class="title">交易日期</h4>
            <div class="popup-content">
                <div class="date-row" @click="$refs.start.open()">
                    <div class="left">开始日期</div>
                    <div class="center">{{ $tool.formatDate(startTime) }}</div>
                    <div class="right"><i class="iconfont">&#xe612;</i></div>
                </div>
                <div class="date-row" @click="$refs.end.open()">
                    <div class="left">结束日期</div>
                    <div class="center">{{ $tool.formatDate(endTime) }}</div>
                    <div class="right"><i class="iconfont">&#xe612;</i></div>
                </div>
                <div class="date-block">
                    <div class="item" @click="setData(3)">近三个月</div>
                    <div class="item" @click="setData(7)">近一周</div>
                    <div class="item" @click="setData(1)">近一个月</div>
                </div>
                <div class="input-row">
                    <div class="left">收货人</div>
                    <div class="center"><input type="text" placeholder="请输入收货人姓名或者手机号" v-model="name"></div>
                </div>
                <div class="input-row">
                    <div class="left">商品名称</div>
                    <div class="center"><input type="text" placeholder="请输入商品名称" v-model="goodName"></div>
                </div>
            </div>
            <div class="pop-btns flex">
                <a class="flex-1" href="javscript:void(0)" @click="restScreen">重置</a>
                <a class="flex-1 confirm" href="javscript:void(0)" @click="confirm">确定</a>
            </div>
        </mt-popup>
    </div>
</template>



<script>
    import { mapState } from 'vuex'
    import store from 'store';
    export default{
        data() {
            return {
                filterVisible: false,    // 筛选
                startTime: null,         // 开始日期 
                endTime: null,           // 结束日期 
                name: '' ,               // 收货人
                goodName: '',            // 商品名
                pageNum: 1,              // 初始页面
                list: [],                // 订单列表
                total: 0,                // 订单个数 
                screen: {
                    startTime: '',
                    endTime: '',
                    name: '',
                    goodName: ''
                }
            }
        },
        computed: {
            selected: {
                get() {
                    if(this.$route.query.type) {
                        return this.$route.query.type
                    } else {
                        this.$router.replace({name: '卖家订单明细',query: {type: 'allRevenue'}})
                        return 'allRevenue';
                    }
                },
                set(val) {
                    this.$router.replace({name: '卖家订单明细',query: {type: val}})
                }
            },
            nomore() {
                if(this.list.length === this.total && this.list.length !==0){
                    return true;
                }
                return false;
            },
            loading() {
                
                if(this.list.length < this.total) {
                    return true;
                }
                return false;
            },
            noOrder() {
                return !this.list.length
            },
        },
        watch: {
            selected(val) {
                this.reset();
                this.handle();
            }
        },
        methods: {
            // 无限滚动
            loadMore() {
                if(this.list.length < this.total) {
                    this.pageNum++;
                    this.handle(this.pageNum).then(res => {
                        if(this.list.length >= this.total ) {
                            this.pageNum--;
                        }
                    })
                }
            },
            // 处理函数
            handle(page = 1) {
                return new Promise((resolve,reject) => {

                    let data = {
                        orderStatus: this.selected,
                        pageNumber: page,
                        pageSize: 10,
                        device: 'WAP',
                    }

                    if(this.screen.startTime) {
                        data.startCreateTime = this.screen.startTime
                    }
                    if(this.screen.endTime) {
                        data.endCreateTime = this.screen.endTime
                    }
                    if(this.screen.name) {
                        data.receiptManSeachKey = this.screen.name
                    }
                    if(this.screen.goodName) {
                        data.productName = this.screen.goodName
                    }

                    this.$api.post('/oteao/order/preSellerOrderList',data,res => {
                        let data = res.data.order || [];
                        this.list = this.list.concat(data);
                        this.total = res.data.orderNum;
                        resolve(res)
                    })
                })
            },
            // 设置日期
            setData(type) {
                let d = new Date();

                if(type === 3) {
                    d.setMonth(d.getMonth() - 3);
                    this.startTime = d;
                    this.$nextTick(() => {
                        this.endTime = new Date();
                    })
                }

                if(type === 7) {
                    d.setDate(d.getDate() - 7);
                    this.startTime = d;
                    this.$nextTick(() => {
                        this.endTime = new Date();
                    })
                }

                if(type === 1) {
                    d.setMonth(d.getMonth() - 1);
                    this.startTime = d;
                    this.$nextTick(() => {
                        this.endTime = new Date();
                    })
                }
            },
            // 重置选项
            reset() {
                this.pageNum = 1;
                this.list = [];
                this.total = 0;
                this.screen = {
                    startTime:'',
                    endTime: '',
                    name: '',
                    goodName: ''
                }
                this.startTime = new Date('2010-01-01 00:00:00');
                this.endTime = new Date();
                this.name = '';
                this.goodName = '';
            },
            // 保存筛选的快照
            flashScreen() {
                this.screen = {
                    startTime: this.$tool.formatDate(this.startTime),
                    endTime: this.$tool.formatDate(this.endTime),
                    name: this.name,
                    goodName: this.goodName
                }
            },
            // 重置筛选
            restScreen() {
                this.startTime = new Date('2010-01-01 00:00:00');
                this.endTime = new Date();
                this.name = '';
                this.goodName = '';
            },
            // 确定筛选
            confirm() {
                this.flashScreen();
                this.filterVisible = false;
                this.pageNum = 1;
                this.list = [];
                this.total = 0;
                this.handle();
            }
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','订单明细');
            this.endTime = new Date();
            // 进入页面拉取数据
            this.handle();

        },
        // 判断登陆
        beforeRouteEnter (to, from, next) {
            if(!store.state.member.member.id) {
                store.dispatch('getMemberData').then((res) => {
                    next();
                }).catch(res => {
                    next(vm => {
                        vm.$router.push('/');
                    })
                })
            } else {
                next();
            }
        },
        head: {
            title() {
                return {
                    inner : '订单明细'
                }
            }
        },
    }
</script>


<style lang="less" scoped>
    @import url('~@/styles/seller/orderList.less');
</style>