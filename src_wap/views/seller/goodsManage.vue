<template>
    <div class="goods_manage_wrapper" :class="{'empty':isEmpty}" @scroll="doScroll" ref="scroll_wrapper">
        <!-- 搜索框 -->
        <div class="search-wrapper flex" v-show="!isEmpty">
            <div class="flex search-inner">
                <div class="search-txt">
                    <input type="text" name="" value="" v-model="searchTxt" placeholder="搜索商品">
                    <a href="javascript:void(0)" class="clear-txt" v-show="clearFlag" @click="clearTxt">
                        <i class="iconfont">&#xe651;</i>
                    </a>
                </div>
                <a class="flex-1 search-btn" href="javascript:void(0)" @click="searchMethod">
                    <i class="iconfont">&#xe649;</i>
                </a>
            </div>
            <div class="cancel" @click="clearTxt">取消</div>
        </div>
        <!-- tab按钮 -->
        <div class="tab-btn-wrapper" ref="tabs">
            <div class="flex">
                <a class="flex-1" :class="{on: tabId == 'yes'}" @click="selTab('yes')" href="javascript:void(0);">出售中（{{ onShelf.totalPage }}）</a>
                <a class="flex-1" :class="{on: tabId == 'no'}" @click="selTab('no')" href="javascript:void(0);">未上架（{{ offShelf.totalPage }}）</a>
            </div>
        </div>
        <!-- 排序条件 -->
        <div class="sort-wrapper flex" :class="{'fixed-sort': fixedFlag,'wx-fixed':wxFixedFlag}" v-show="!isEmpty">
            <label class="flex-1 sort-item" :class="{on:sortCondition=='1'}">
                创建时间
                <input type="radio" name="" value="1" hidden v-model="sortCondition" @click="descFlag = !descFlag">
                <span class="sort-icons">
                    <i class="iconfont sort-asce" :class="{on: !descFlag}">&#xe610;</i>
                    <i class="iconfont sort-desc" :class="{on: descFlag}">&#xe950;</i>
                </span>
            </label>
            <label class="flex-1 sort-item" :class="{on:sortCondition=='2'}">
                销量
                <input type="radio" name="" value="2" hidden v-model="sortCondition" @click="descFlag = !descFlag">
                <span class="sort-icons">
                    <i class="iconfont sort-asce" :class="{on: !descFlag}">&#xe610;</i>
                    <i class="iconfont sort-desc" :class="{on: descFlag}">&#xe950;</i>
                </span>
            </label>
            <label class="flex-1 sort-item" :class="{on:sortCondition=='3'}">
                库存
                <input type="radio" name="" value="3" hidden v-model="sortCondition" @click="descFlag = !descFlag">
                <span class="sort-icons">
                    <i class="iconfont sort-asce" :class="{on: !descFlag}">&#xe610;</i>
                    <i class="iconfont sort-desc" :class="{on: descFlag}">&#xe950;</i>
                </span>
            </label>
        </div>
        <!-- 商品 -->
        <div class="tab-content-wrapper">
            <div v-show="tabId == 'yes'" class="rack-up">
                <div class="good-item" v-if="onShelf.listData.length>0" v-for="item in onShelf.listData">
                    <!-- 头部 caption -->
                    <div class="item-caption flex">
                        <div class="cap-l flex flex-1 align_items_c">
                            <span>创建 {{item.createTime}}</span>
                        </div>
                        <div class="cap-r algin_r">
                            <span class="saled">已售<span class="number">{{item.salesNum}}</span></span>
                            <span class="stock">库存<span class="number">{{item.stockNum}}</span></span>
                        </div>
                    </div>
                    <!-- 中间商品 -->
                    <div class="good-info flex">
                        <div class="pro-img">
                            <img :src="item.proImg" />
                        </div>
                        <div class="flex-1 pro-txt">
                            <h4 class="tit">{{item.proName}}</h4>
                            <p class="price">￥{{toFixed(item.proPrice)}}</p>
                            <p class="time_tag" v-if="item.isSales">限时特价</p>
                        </div>
                    </div>
                    <!-- 商品操作按钮 -->
                    <div class="flex options">
                        <a href="javascript:void(0);" class="flex-1 algin_c" @click="$router.push({name: '商品详情',query: {proSku:item.proSku}})"><i class="iconfont">&#xe681;</i>预览</a>
                        <a href="javascript:void(0);" class="flex-1 algin_c" @click="$router.push({name: '商品编辑-1',query: {edit:item.proId,proSku: item.proSku,state: 'ON_SHELF'}})"><i class="iconfont">&#xe682;</i>编辑</a>
                        <a href="javascript:void(0);" class="flex-1 algin_c" @click="stateMethod(item.proExtId,'down')"><i class="iconfont">&#xe683;</i>下架</a>
                    </div>
                </div>
                <div class="get_more" @click="getMore('up')" v-if="onShelf.listData.length < onShelf.totalPage">
                    点击加载更多~
                </div>
                <div v-if="onShelf.listData.length==0">
                    <div class="no-item">
                        <img src="../../assets/images/wusousoushuju.jpg" alt="">
                        <p>暂无已上架的商品~</p>
                    </div>
                </div>
            </div>
            <div v-show="tabId == 'no'" class="no-shelves">
                <div class="good-item" v-for="item in offShelf.listData" v-if="offShelf.listData.length>0">
                    <!-- 头部 caption -->
                    <div class="item-caption flex">
                        <div class="cap-l flex flex-1 align_items_c">
                            <!-- <label class="check-cir" :class="{'checked':item.checked}" @click="item.checked = !item.checked"></label> -->
                            <span>创建 {{item.createTime}}</span>
                        </div>
                        <div class="cap-r algin_r">
                            <span class="saled">已售<span class="number">{{item.salesNum}}</span></span>
                            <span class="stock">库存<span class="number">{{item.stockNum}}</span></span>
                        </div>
                    </div>
                    <!-- 中间商品 -->
                    <div class="good-info flex">
                        <div class="pro-img">
                            <img :src="item.proImg" />
                        </div>
                        <div class="flex-1 pro-txt">
                            <h4 class="tit">{{item.proName}}</h4>
                            <p class="price">￥{{toFixed(item.proPrice)}}</p>
                            <p class="time_tag" v-if="item.isSales">限时特价</p>
                        </div>
                    </div>
                    <!-- 商品操作按钮 -->
                    <div class="flex options">
                        <a href="javascript:void(0);" class="flex-1 algin_c" @click="$router.push({name: '商品详情',query: {proSku:item.proSku}})"><i class="iconfont">&#xe681;</i>预览</a>
                        <a href="javascript:void(0);" class="flex-1 algin_c" @click="$router.push({name: '商品编辑-1',query: {edit:item.proId,proSku:item.proSku,state: 'OFF_SHELF'}})"><i class="iconfont">&#xe682;</i>编辑</a>
                        <a href="javascript:void(0);" class="flex-1 algin_c" @click="stateMethod(item.proExtId,'up')"><i class="iconfont">&#xe683;</i>上架</a>
                    </div>
                </div>
                <div class="get_more" @click="getMore('down')" v-if="offShelf.listData.length < offShelf.totalPage">
                    点击加载更多~
                </div>
                <div v-if="offShelf.listData.length==0">
                    <div class="no-item">
                        <img src="../../assets/images/wusousoushuju.jpg" alt="">
                        <p>暂无未上架的商品~</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部fixed栏 -->
        <div class="flex fix-bottom align_items_c">
            <div class="seller-center" @click="$router.push({name: '卖家中心'})">
                <i class="iconfont">&#xe676;</i>
                <p>卖家中心</p>
            </div>
            <a v-show="!isEmpty" class="flex-1 noshelves-btn batch-btn" href="javascript:void(0);" @click="goBrect">批量处理</a>
            <a class="flex-1 noshelves-btn created-btn" href="javascript:void(0);" @click="$router.push({name: '新品上架-1'})">创建商品</a>
        </div>
        <!-- 底部fixed栏 -->
        <!-- <div class="fix-bottom">
            <div v-if="isEmpty" class="flex align_items_c">
                <div class="seller-center">
                    <i class="iconfont">&#xe676;</i>
                    <p>卖家中心</p>
                </div>
                <a class="flex-1 noshelves-btn created-btn" href="javascript:void(0);" @click="$router.push({name: '新品上架-1'})">创建商品</a>
            </div>
            <div v-else class="flex align_items_c pd_36">
                <div class="flex-1 flex align_items_c">
                    <label class="check-cir" @click="checkedAll" :class="{'checked': isAll}"></label>
                    <span>已选（<span>{{ checkedNum }}</span>）</span>
                </div>
                <a class="delete-btn" href="javascript:void(0);" @click="deleteMethod">删除</a>
                <a class="rackup-btn" href="javascript:void(0);" @click="plusMethod">上架</a>
            </div>
        </div> -->
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { mapState } from 'vuex'
import store from 'store';
import $api from 'api';
    export default{
        data(){
            return {
                searchTxt: "",            //搜索内容
                fixedFlag: false,         //tab是否固定
                wxFixedFlag: false,         //tab是否固定 wx环境
                sortCondition: '1',        //排序条件
                descFlag: false,          //是否是降序
                tabId: 'yes',             //tab切换，yes表示已上架  no表示未上架
                selectIdsNo: [],           //已选的未上架商品
                pageSize: 20,
                totalSize: 0,
                currentPage: 1,
                status: {
                    0: 'ON_SHELF',
                    1: 'OFF_SHELF'
                },
                onShelf: {
                    currentPage: 1,
                    listData: [],
                    totalPage: 0,
                    sorts: 1,
                    orderBy: 'desc'
                },
                offShelf: {
                    currentPage: 1,
                    listData: [],
                    totalPage: 0,
                    checkedId: [],
                    sorts: 1,
                    orderBy: 'desc'
                },
            }
        },
        created(){
            this.getList(this.onShelf.orderBy,this.onShelf.sorts,this.onShelf.currentPage,'ON_SHELF').then((res) => {
                this.onShelf.listData = res.data;
                this.onShelf.totalPage = res.total_record;
            })
            this.getList(this.offShelf.orderBy,this.offShelf.sorts,this.offShelf.currentPage,'OFF_SHELF').then((res) => {
                this.offShelf.listData = res.data;
                this.offShelf.totalPage = res.total_record;
                for(let obj of this.offShelf.listData){
                    this.$set(obj,'checked',false)
                }
            })
            if(this.$route.query.state == undefined || this.$route.query.state === 'ON_SHELF'){
                this.tabId = 'yes';
            }else{
                this.tabId = 'no';
            }
        },
        computed:{
            clearFlag(){
                if(this.searchTxt.length>0){
                    return true;
                }else{
                    return false;
                }
            },
            isEmpty(){
                if((this.tabId == 'yes' && this.onShelf.listData.length>0)||(this.tabId == 'no' && this.offShelf.listData.length>0)){
                    return false;
                }else{
                    return true;
                }
            },
            isAll() {
                let isTrue = this.offShelf.listData.every((item) =>{
                    return item.checked === true
                })
                if(isTrue){
                    return true;
                }else{
                    return false;
                }
            },
            checkedNum() {
                let num = 0;
                for(let obj of this.offShelf.listData){
                    if(obj.checked){
                        num++;
                    }
                }
                return num;
            }
        },
        methods:{
            goBrect() {
                if(this.tabId === 'yes'){
                    this.$router.push({
                        name: '批量处理',
                        query: {
                            state: 'ON_SHELF',
                            keyWord: this.searchTxt
                        }
                    })
                }else{
                    this.$router.push({
                        name: '批量处理',
                        query: {
                            state: 'OFF_SHELF',
                            keyWord: this.searchTxt
                        }
                    })
                }
            },
            checkedAll() {
                let isTrue = this.offShelf.listData.every((item) =>{
                    return item.checked === true
                })
                if(isTrue){
                    for(let obj of this.offShelf.listData){
                        obj.checked = false;
                    }
                }else{
                    for(let obj of this.offShelf.listData){
                        obj.checked = true;
                    }
                }
            },
            plusMethod() {
                let checkedId = [];
                for(let obj of this.offShelf.listData){
                    if(obj.checked){
                        checkedId.push(obj.proExtId)
                    }
                }
                let data = {
                    sysId: 1,
                    state: 'ON_SHELF',
                    proExtIds: checkedId.join(',')
                }
                this.$api.post('/oteao/productInfo/modifyOrgProInfoState',data,res => {
                    Toast({
                        message: '商品上架成功',
                        iconClass: 'icon icon-success'
                    });
                    setTimeout(() => {
                        window.location.reload();
                    },500)
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            },
            getMore(type) {
                if(type === 'up'){
                    this.onShelf.currentPage++;
                    this.getList(this.onShelf.orderBy,this.onShelf.sorts,this.onShelf.currentPage,'ON_SHELF').then((res) => {
                        let result = res.data;
                        for(let obj of result){
                            this.$set(obj,'checked',false)
                        }
                        this.onShelf.listData = this.onShelf.listData.concat(result);
                    })
                }else if(type === 'down'){
                    this.offShelf.currentPage++;
                    this.getList(this.offShelf.orderBy,this.offShelf.sorts,this.offShelf.currentPage,'OFF_SHELF').then((res) => {
                        let result = res.data;
                        for(let obj of result){
                            this.$set(obj,'checked',false)
                        }
                        this.offShelf.listData = this.offShelf.listData.concat(result);
                    })
                }
            },
            deleteMethod() {
                let checkedId = [];
                for(let obj of this.offShelf.listData){
                    if(obj.checked){
                        checkedId.push(obj.proExtId)
                    }
                }
                let data = {
                    proExtIds: checkedId.join(',')
                }
                this.$api.post('/oteao/productInfo/deleteFrontOrgProduct',data,res => {
                    Toast({
                        message: '商品删除成功',
                        iconClass: 'icon icon-success'
                    });
                    setTimeout(() => {
                        window.location.reload();
                    },500)
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            },
            stateMethod(id,type) {
                let data = {
                    proExtIds: id,
                    sysId: 1,
                    state: ''
                }
                if(type === 'down'){
                    data.state = 'OFF_SHELF';
                }else if(type === 'up'){
                    data.state = 'ON_SHELF';
                }
                this.$api.post('/oteao/productInfo/modifyOrgProInfoState',data,res => {
                    Toast({
                        message: res.message,
                        iconClass: 'icon icon-success'
                    });
                    setTimeout(() => {
                        window.location.reload();
                    },500)
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            },
            searchMethod() {
                if(this.$route.query.state == undefined || this.$route.query.state == 'ON_SHELF'){
                    this.getList(this.onShelf.orderBy,this.onShelf.sorts,this.onShelf.currentPage,'ON_SHELF').then((res) => {
                        this.onShelf.listData = res.data;
                        this.onShelf.totalPage = res.total_record;
                    })
                }else{
                    this.getList(this.offShelf.orderBy,this.offShelf.sorts,this.offShelf.currentPage,'OFF_SHELF').then((res) => {
                        this.offShelf.listData = res.data;
                        this.offShelf.totalPage = res.total_record;
                        for(let obj of this.offShelf.listData){
                            this.$set(obj,'checked',false)
                        }
                    })
                }
            },
            selTab(str) {
                this.tabId = str;
                if(str === 'yes'){
                    this.$router.replace({
                        name: '商品管理',
                        query: {
                            state: 'ON_SHELF'
                        }
                    })
                }else{
                    this.$router.replace({
                        name: '商品管理',
                        query: {
                            state: 'OFF_SHELF'
                        }
                    })
                }
            },
            getList(orderBy,sorts,pages,states) {
                let data = {
                        'page.pageNumber': pages,
                        'page.pageSize': this.pageSize,
                        'pro.sysId': 1,
                        'pro.device': 'WAP',
                        'pro.seachKey': this.searchTxt,
                        'pro.state': states,
                        'pro.sort': sorts,
                        'pro.orderBy': orderBy
                    }
                return new Promise((resolve,reject) => {
                    this.$api.post('/oteao/productInfo/seachFrontOrgProduct',data,res => {
                        resolve(res);
                    },res=>{
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            //清空搜索内容
            clearTxt(){
                this.searchTxt = "";
            },
            //升序或降序
            ascOrDes(){

            },
            //保留两位小数
            toFixed(num) {
                if(isNaN(num)) {
                    return '0.00'
                }else{
                    return Number(num).toFixed(2);
                }
            },
            doScroll(){
                let st = this.$refs.scroll_wrapper.scrollTop;
                let tab_th = this.$refs.tabs.offsetTop;
                if(st-tab_th>10){
                    if(this.$tool.isWx){
                        this.wxFixedFlag = true;
                    }else{
                        this.fixedFlag = true;
                    }
                }else{
                    if(this.$tool.isWx){
                        this.wxFixedFlag = false;
                    }else{
                        this.fixedFlag = false;
                    }
                }
            }
        },
        watch:{
            sortCondition(val) {
                this.descFlag = false;
            },
            descFlag(val) {
                if(val){
                    if(this.$route.query.state != undefined || this.$route.query.state === 'ON_SHELF'){
                        let state = 'ON_SHELF';
                        this.onShelf.orderBy = 'desc';
                        this.onShelf.currentPage = 1;
                        this.getList(this.onShelf.orderBy,Number(this.sortCondition),this.onShelf.currentPage,'ON_SHELF').then((res) => {
                            this.onShelf.listData = res.data;
                            this.onShelf.totalPage = res.total_record;
                        })
                    }else{
                        let state = 'OFF_SHELF';
                        this.offShelf.orderBy = 'desc';
                        this.offShelf.currentPage = 1;
                        this.getList(this.offShelf.orderBy,Number(this.sortCondition),this.offShelf.currentPage,'ON_SHELF').then((res) => {
                            this.offShelf.listData = res.data;
                            this.offShelf.totalPage = res.total_record;
                        })
                    }
                }else{
                    if(this.$route.query.state != undefined || this.$route.query.state === 'ON_SHELF'){
                        let state = 'ON_SHELF';
                        this.onShelf.orderBy = 'asc';
                        this.onShelf.currentPage = 1;
                        this.getList(this.onShelf.orderBy,Number(this.sortCondition),this.onShelf.currentPage,'ON_SHELF').then((res) => {
                            this.onShelf.listData = res.data;
                            this.onShelf.totalPage = res.total_record;
                        })
                    }else{
                        let state = 'OFF_SHELF';
                        this.offShelf.orderBy = 'asc';
                        this.offShelf.currentPage = 1;
                        this.getList(this.offShelf.orderBy,Number(this.sortCondition),this.offShelf.currentPage,'ON_SHELF').then((res) => {
                            this.offShelf.listData = res.data;
                            this.offShelf.totalPage = res.total_record;
                        })
                    }
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            if(store.state.member.member.id) {
                next();
            } else {
                store.dispatch('getMemberData').then(res => {
                    next();
                }).catch(res =>{
                    next(vm => {
                        vm.router.push('/login')
                    })
                })
            }
        }
    }
</script>
<style lang="less">
    @import '~@/styles/seller/goodsManage.less';
</style>
