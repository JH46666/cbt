<template>
    <div id="search">
        <section class="search-bar-wrapper">
            <!-- 搜索通过更改地址栏，检测地址栏变动来进行处理 -->
            <search-bar v-model="text" @searchClick="search"></search-bar>
            <span class="cancel" @click="$router.go(-1)">取消</span>
        </section>
        <!-- 开始搜索时 -->
        <section class="hot-search" v-if="noSearch">
            <div class="left">大家都在搜</div>
            <div class="right">
                <div class="tag-wrap">
                    <router-link :to="todo.path" :key="i" class="tag" tag="div" v-for="(todo,i) in hotList" replace>{{ todo.name }}</router-link>
                </div>
            </div>
        </section>
        <section class="history-pannel" v-if="noSearch">
            <div class="title"><h3>历史搜索</h3></div>
            <ul class="history-wrap">
                <template v-for="(item,i) in history">
                    <router-link :key="i" :to="{name: '搜索',query: {q: item.searchContent,c: '1',sort: 'desc'}
                        }" tag="div" class="history-item">
                        {{ item.searchContent }}
                    </router-link>
                </template>
            </ul>
            <div class="btn-wrap" v-if="history.length > 0">
                <button @click="clearHistory">清空历史搜索</button>
            </div>
        </section>
        <!-- 搜索列表 -->
        <section class="sort-bar" v-if="!noSearch && list.length">
            <label class="sort-item" :class="{active:sortClass === '1'}">
                销量
                <input type="radio" value="1" v-model="sortClass">
            </label>
            <label class="sort-item" :class="{active:sortClass === '2'}">
                新品
                <input  type="radio" value="2" v-model="sortClass">
            </label>
            <label class="sort-item" :class="{active:sortClass === '3'}" @click.self="editPriceSort">
                价格
                <input  type="radio" value="3" v-model="sortClass">
                <span class="sort-btn" :class="{top:sortClass === '3' && priceSort,bottom:sortClass === '3' && !priceSort}">
                    <i class="icon-shouqi"></i>
                    <i class="icon-zhankai"></i>
                </span>
            </label>
            <label class="sort-item" :class="{active:sortClass === '4'}" @click.self="filterVisible = true">
                <i class="iconfont ic-sele">&#xe674;</i>
                筛选
                <input  type="radio" value="4" v-model="sortClass">
            </label>
        </section>
        <!-- 商品列表 -->
        <section class="goods-list" v-if="!noSearch && list.length">
            <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="true"
                infinite-scroll-distance="10"
            >
                <goods-item
                v-for="(item,index) in list"
                :key="index"
                :mainTit="item.proTitle"
                :subTit="item.subTitle"
                :link="item.proSku"
                :price="item.proPrice"
                :unit="item.unint"
                :imgUrl="item.proImg"
                :businessType="item.tagNum"
                :tasteStar="item.tasteStar"
                :tagUrl="item.tagImgUrl"
                :aromaStar="item.aromaStar"
                :isLogin="$tool.isLogin()">
                </goods-item>
            </div>
            <div class="goods-loading" v-if="list.length < total">
                <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                <span class="loading-text">正在努力加载中</span>
            </div>
            <div class="no-more" v-if="list.length === total">没有更多了呦</div>
        </section>
        <section class="no-search" v-if="!noSearch && noList">
            <div class="sorry-img">
                <img src="../../assets/images/55.png" alt="">
            </div>
            <div class="sorry">
                抱歉，没有搜索到与<span class="gold">“{{ $route.query.q }}”</span>有关的商品
            </div>
            <p class="sorry-tip">
                请检查您的输入是否有误
            </p>
            <p class="sorry-tip">
                如有任何意见或者建议，期待您反馈给我们
            </p>
        </section>
        <!-- 筛选弹窗 -->
        <div class="mupop_dialog" :class="{on: filterVisible}">
            <div class="mup_bg" @click="filterVisible = false"></div>
            <div class="mupop_dialog_wrapper">
                <div class="popup-content">
                    <div class="con-item">
                        <h4>供货价</h4>
                        <input class="price-input" type="number" v-model="minSupplyPrice" placeholder="最低价" @blur="toFixedMinZero()"> —
                        <input class="price-input" type="number" v-model="maxSupplyPrice" placeholder="最高价" @blur="toFixedMaxZero()">
                    </div>
                    <div class="con-item">
                        <h4>品牌</h4>
                        <ul class="clearfix">
                            <li :class="{on:'' == selectedBrandId}" @click="selectBrand('')">全部</li>
                            <li :class="{on:item.id == selectedBrandId}" v-for="(item,index) in brandList" :key="index" @click="selectBrand(item.id)">{{item.brandName}}</li>
                        </ul>
                    </div>
                </div>
                <div class="pop-btns flex">
                    <a class="flex-1" href="javscript:void(0)" @click="resetConditions">重置</a>
                    <a class="flex-1 confirm" href="javscript:void(0)" @click="confirmConditions">确定</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import store from 'store';
    export default {
        data() {
            return {
                filterVisible: false,  //筛选弹窗是否显示
                selectSort: '',
                text: '',               // 搜索关键字
                sortClass: '1',         // 排序方式
                priceSort: false,       // 价格排序，降序
                hotList: [              // 热搜
                    {
                        name: '安溪铁观音',
                        path: {
                            name: '搜索',
                            query: {
                                q: '安溪铁观音',
                                c: '1',
                                sort: 'desc'
                            }
                        }
                    },
                    {
                        name: '金骏眉',
                        path: {
                            name: '搜索',
                            query: {
                                q: '金骏眉',
                                c: '1',
                                sort: 'desc'
                            }
                        }
                    },
                    {
                        name: '大红袍',
                        path: {
                            name: '搜索',
                            query: {
                                q: '大红袍',
                                c: '1',
                                sort: 'desc'
                            }
                        }
                    },
                    {
                        name: '正山小种',
                        path: {
                            name: '搜索',
                            query: {
                                q: '正山小种',
                                c: '1',
                                sort: 'desc'
                            }
                        }
                    },
                    {
                        name: '云南滇红',
                        path: {
                            name: '搜索',
                            query: {
                                q: '云南滇红',
                                c: '1',
                                sort: 'desc'
                            }
                        }
                    },
                    {
                        name: '龙井',
                        path: {
                            name: '搜索',
                            query: {
                                q: '龙井',
                                c: '1',
                                sort: 'desc'
                            }
                        }
                    },
                ],
                noSearch: true,         // 未搜索
                list: [],               // 搜索结果
                total: 0,               // 总条目
                pageNum: 1,             // 页码
                noList: false,          // 没有搜索到
                maxSupplyPrice: '', //最大供货价
                minSupplyPrice: '',//最小供货价
                brandList:[],//筛选品牌列表
                selectedBrandId:'', //被选中的品牌
                history: [],            // 历史记录
                filterConditions:[],
                propertiesValList:{},  //筛选属性值
            }
        },
        computed: {
            ...mapState({
                id: state => state.member.member.id,
            })
        },
        watch: {
            '$route'(val) {
                this.reset();
                try {
                    this.handle().then(res => {
                        this.list = [];
                        let data = this.list.concat(res.data);
                        if(data.length === 0) {
                            this.noList = true;
                        }
                        this.list = data;
                        this.total = res.total_record;
                    })
                } catch (error) {
                    return false;
                }
            },
            sortClass(val) {
                if(val !== 4){
                    this.reset();
                    this.$router.replace({name: '搜索',query: {q: this.$route.query.q,c: val,sort: 'desc'}})
                }else{

                }
            }
        },
        methods: {
            // 筛选
            selectFilter(list,item,index){
                list.filterIndex = index;
                this.propertiesValList[list.id] = {
                    propId: item.catPropId,
                    propValId: item.id
                };
            },
            //重置筛选条件
            resetConditions(){
                for(let item of this.filterConditions){
                    item.filterIndex = 0;
                }
                for(let item in this.propertiesValList){
                    this.propertiesValList[item].propValId = 'all';
                }
            },
            //筛选条件查询
            confirmConditions(){
                this.resultData = [];
                this.pageNumber = 1;
                this.totalSize = 0;
                // this.searchResult();
            },
            // 重置
            reset() {
                this.pageNum = 1;
                // this.list = [];
                this.total = 0;
                this.noList = false;
            },
            // 价格排序发生改变
            editPriceSort() {
                // 上一次的选项
                let to = this.sortClass;
                this.$nextTick(() =>{
                    let now = this.sortClass;
                    if(to !== now) {
                        this.priceSort = false;
                    } else {
                        this.priceSort = !this.priceSort;
                        this.reset();
                        this.$router.replace({name: '搜索',query: {q: this.$route.query.q,c: '3',sort: this.priceSort ? 'asc' : 'desc'}})
                    }
                })
            },
            // 无限滚动
            loadMore() {
                if(this.list.length < this.total) {
                    this.pageNum++;
                    this.handle(this.pageNum).then(res => {
                        let data = this.list.concat(res.data);
                        this.list = data;
                        this.total = res.total_record;
                        if(this.list.length === this.total) {
                            this.pageNum--;
                        }
                    })
                }
            },
            // 清空历史记录
            clearHistory() {
                this.$api.post('/oteao/searchProductRecord/clear',{
                    sysId: 1,
                    device: 'WAP'
                },res =>{
                    this.history = [];
                })
            },
            // 搜索
            search() {
                if(this.text === '') return;
                this.$router.replace({name: '搜索',query: {q: this.text,c: '1',sort: 'desc'}})
            },
            // 搜索处理函数
            handle(page = 1) {
                let query = this.$route.query;
                // 检查地址栏是否带参，没有的话返回
                if(Object.keys(query).length === 0) return this.noSearch = true;
                try {
                    // 开始搜索
                    this.noSearch = false;

                    // 设置参数
                    this.text = query.q;
                    this.sortClass = query.c;

                    let data = {
                        "device": "WAP",
                        "isExchangeIntegral": 0,
                        "orderBy": query.sort,
                        "proType": "PRO",
                        "seachKey": query.q,
                        "sort": query.c,
                        "sysId": 1
                    }


                    // 储存搜索历史
                    let historyData = {
                        // 'searchProductRecord.memberId': this.id || '',
                        'searchProductRecord.sysId': 1,
                        'searchProductRecord.searchContent': query.q,
                        'searchProductRecord.device': 'WAP'
                    }
                    if(this.id) {
                        historyData['searchProductRecord.memberId'] = this.id
                    }
                    this.$api.post('/oteao/searchProductRecord/insert',historyData,res => {})

                    return new Promise((resolve,reject) => {
                        this.$api.post(`/oteao/productInfo/seachProduct?page.pageNumber=${page}&page.pageSize=20`,JSON.stringify(data),res => {
                            let tempArr = res.data;
                            for(let item of tempArr){
                                let star = 0;
                                if(item.fragrance === '偏淡'){
                                    star = 1;
                                }else if(item.fragrance === '一般'){
                                    star = 2;
                                }else if(item.fragrance === '香'){
                                    star = 3;
                                }else if(item.fragrance === '高香'){
                                    star = 4;
                                }else if(item.fragrance === '极香'){
                                    star = 5;
                                }else {
                                    star = 0;
                                }
                                item.aromaStar = star;

                                let stars = 0;
                                if(item.taste === '偏淡'){
                                    stars = 1;
                                }else if(item.taste === '一般'){
                                    stars = 2;
                                }else if(item.taste === '浓'){
                                    stars = 3;
                                }else if(item.taste === '很浓'){
                                    stars = 4;
                                }else if(item.taste === '极浓'){
                                    stars = 5;
                                }else {
                                    stars = 0;
                                }
                                item.tasteStar = stars;
                            }
                            resolve(res)
                        })
                    })


                } catch (error) {
                    // 地址栏如果参数错误，从定向当前页
                    this.$router.replace({name: '搜索'})
                }
            },
            // 格式化价格
            toFixedMinZero() {
                let delTrim = String(this.minSupplyPrice).trim();
                if(delTrim == ''){
                    this.minSupplyPrice = '';
                }else if(parseFloat(delTrim) > 0){
                    this.minSupplyPrice = parseFloat(delTrim).toFixed(0);
                }else if(parseFloat(delTrim) < 0){
                    this.minSupplyPrice = Math.abs(parseFloat(delTrim).toFixed(0));
                }
            },
            toFixedMaxZero() {
                let delTrim = String(this.maxSupplyPrice).trim();
                if(delTrim == ''){
                    this.maxSupplyPrice = '';
                }else if(parseFloat(delTrim) > 0){
                    this.maxSupplyPrice = parseFloat(delTrim).toFixed(0);
                }else if(parseFloat(delTrim) < 0){
                    this.maxSupplyPrice = Math.abs(parseFloat(delTrim).toFixed(0));
                }
            },
            // 判断最大供货价不得小于最小供货价
            sortPrice(){
                if(this.maxSupplyPrice<this.minSupplyPrice){
                    let temp = this.maxSupplyPrice;
                    this.maxSupplyPrice = this.minSupplyPrice;
                    this.minSupplyPrice = temp;
                }
            },
            // 打开筛选弹窗
            openFilter(){

                let data = {
                    catId: this.activeSubId,
                }
                // 获取分类品牌列表
                this.$api.get('/oteao/productBrand/findProductBrandByCatId?',data,res=>{
                    this.brandList = res.data;
                    this.filterVisible = true;
                })
            },
            // 品牌筛选
            selectBrand(id){
                this.selectedBrandId =id;
            },
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','搜索');

            // 根据地址栏获取条件
            try {
                this.handle().then(res => {
                    let data = this.list.concat(res.data);
                    if(data.length === 0) {
                        this.noList = true;
                    }
                    this.list = data;
                    this.total = res.total_record;
                })
            } catch (error) {
                // 获取搜索历史
                this.$api.post('/oteao/searchProductRecord/query',{
                    pageSize: 10,
                    // 'searchProductRecord.memberId': this.id,
                    'searchProductRecord.sysId': 1,
                    'searchProductRecord.device': 'WAP'
                },res => {
                    res.data = res.data || [];
                    this.history = res.data;
                },res =>{})
            }
            this.$store.dispatch('getBlock','hotsearch').then(res => {
                try {
                    this.hotList = JSON.parse(res.data.htmlText);
                } catch (error) {

                }
            })
        },
        // 进来先判断登陆与否
        beforeRouteEnter(to, from, next) {
            if(!store.state.member.member.id) {
                store.dispatch('getMemberData').then((res) => {
                    next();
                }).catch(res => {
                    next();
                })
            } else {
                next();
            }
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/search/index.less');
</style>
