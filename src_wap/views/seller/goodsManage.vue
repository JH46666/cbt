<template>
    <!-- 把底部fixed栏与滚动div同级 -->
    <div>
        <div class="goods_manage_wrapper content_inner" :class="{'empty':isEmpty}" @scroll="doScroll" ref="scroll_wrapper" :style="style">
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
                <div class="cancel" @click="cancelText">取消</div>
            </div>
            <!-- tab按钮 -->
            <div class="tab-btn-wrapper" ref="tabs">
                <div class="flex">
                    <a class="flex-1" :class="{on: tabId == 'yes'}" @click="selTab('yes')" href="javascript:void(0);">已上架({{ onShelf.totalPage }})</a>
                    <a class="flex-1" :class="{on: tabId == 'no'}" @click="selTab('no')" href="javascript:void(0);">未上架({{ offShelf.totalPage }})</a>
                </div>
            </div>
            <!-- 排序条件 -->
            <div class="sort-wrapper flex" :class="{'fixed-sort': fixedFlag,'wx-fixed':wxFixedFlag}" v-show="!isEmpty">
                <label class="flex-1 sort-item" :class="{on:sortCondition=='1'}">
                    {{ selectText }}
                    <input type="radio" name="" value="1" hidden v-model="sortCondition" @click="resMethod('1')">
                    <span class="sort-icons">
                        <i class="iconfont sort-asce" :class="{on: descFlag}">&#xe610;</i>
                        <i class="iconfont sort-desc" :class="{on: !descFlag}">&#xe950;</i>
                    </span>
                </label>
                <label class="flex-1 sort-item" :class="{on:sortCondition=='2'}">
                    销量
                    <input type="radio" name="" value="2" hidden v-model="sortCondition" @click="resMethod('2')">
                    <span class="sort-icons">
                        <i class="iconfont sort-asce" :class="{on: descFlag}">&#xe610;</i>
                        <i class="iconfont sort-desc" :class="{on: !descFlag}">&#xe950;</i>
                    </span>
                </label>
                <label class="flex-1 sort-item" :class="{on:sortCondition=='3'}">
                    库存
                    <input type="radio" name="" value="3" hidden v-model="sortCondition" @click="resMethod('3')">
                    <span class="sort-icons">
                        <i class="iconfont sort-asce" :class="{on: descFlag}">&#xe610;</i>
                        <i class="iconfont sort-desc" :class="{on: !descFlag}">&#xe950;</i>
                    </span>
                </label>
            </div>
            <!-- 商品 -->
            <div class="tab-content-wrapper">
                <!-- 已上架 -->
                <div v-show="tabId == 'yes'" class="rack-up" v-infinite-scroll="loadMore1" infinite-scroll-disabled="true" infinite-scroll-distance="10">
                    <div class="good-item" v-if="onShelf.listData.length>0" v-for="(item,index) in onShelf.listData" :key="index">
                        <!-- 头部 caption -->
                        <div class="item-caption flex">
                            <div class="cap-l flex flex-1 align_items_c">
                                <!-- <label class="check-cir" :class="{'checked':item.checked}" @click="item.checked = !item.checked"></label> -->
                                <span>上架 {{item.createTime}}</span>
                            </div>
                            <div class="cap-r algin_r">
                                <span class="saled">已售<span class="number" v-if="item.salesNum"> {{item.salesNum}} </span><span class="number" v-else> 0 </span></span>
                                <span class="stock">库存<span class="number"> {{item.stockNum}} </span></span>
                            </div>
                        </div>
                        <!-- 中间商品 -->
                        <div class="good-info flex">
                            <div class="pro-img">
                                <img :src="item.proImg" />
                            </div>
                            <div class="flex-1 pro-txt _fix-pro-txt">
                                <h4 class="tit">{{ item.proName }}</h4>
                                <!-- 成团 -->
                                <div class="_add-tuan">
                                    <div class="_add-groupnum">{{ item.memberNum }}人团价&emsp;&nbsp;</div>
                                    <div class="price _fix-price" style="position:static">￥{{ toFixed(item.priceFightGroup) }}</div>
                                    <div class="_add-single-price">单批价：￥{{ toFixed(item.proPrice) }}</div>
                                </div>
                                <p class="time_tag" v-if="item.isSales">限时特价</p>
                            </div>
                        </div>
                        <!-- 商品操作按钮 -->
                        <div class="flex options">
                            <a href="javascript:void(0);" class="flex-1 algin_c" @click="$router.push({name: '商品详情',query: {proSku:item.proSku}})"><i class="iconfont">&#xe681;</i>预览</a>
                            <a href="javascript:void(0);" class="flex-1 algin_c" @click="goEditPage(item,'ON_SHELF')"><i class="iconfont">&#xe682;</i>编辑</a>
                            <a href="javascript:void(0);" class="flex-1 algin_c" @click="stateMethod(item.proExtId,'down')"><i class="iconfont">&#xe683;</i>下架</a>
                        </div>
                    </div>
                    <div class="goods-loading" v-if="onShelf.listData.length < onShelf.totalPage">
                        <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                        <span class="loading-text">正在努力加载中~</span>
                    </div>
                    <div class="no-more" v-if="onShelf.listData.length == onShelf.totalPage && onShelf.totalPage > 0">没有更多了呦~</div>
                    <div v-if="onShelf.totalPage==0">
                        <div class="no-item">
                            <img src="../../assets/images/wusousoushuju.jpg" alt="">
                            <p>暂无已上架商品~</p>
                        </div>
                    </div>
                </div>
                <!-- 未上架 -->
                <div v-show="tabId == 'no'" class="no-shelves" v-infinite-scroll="loadMore2" infinite-scroll-disabled="true" infinite-scroll-distance="10">
                    <div class="good-item" v-for="(item,index) in offShelf.listData" v-if="offShelf.listData.length>0" :key="index">
                        <!-- 头部 caption -->
                        <div class="item-caption flex">
                            <div class="cap-l flex flex-1 align_items_c">
                                <!-- <label class="check-cir" :class="{'checked':item.checked}" @click="item.checked = !item.checked"></label> -->
                                <span>创建 {{item.createTime}}</span>
                            </div>
                            <div class="cap-r algin_r">
                                <span class="saled">已售<span class="number" v-if="item.salesNum"> {{item.salesNum}} </span><span class="number" v-else> 0 </span></span>
                                <span class="stock">库存<span class="number"> {{item.stockNum}} </span></span>
                            </div>
                        </div>
                        <!-- 中间商品 -->
                        <div class="good-info flex">
                            <div class="pro-img">
                                <img :src="item.proImg" />
                            </div>
                            <div class="flex-1 pro-txt _fix-pro-txt">
                                <h4 class="tit">{{item.proName}}</h4>
                                <!-- 成团 -->
                                <div class="_add-tuan">
                                    <div class="_add-groupnum">{{item.memberNum}}人团价&emsp;&nbsp;</div>
                                    <div class="price _fix-price">￥{{toFixed(item.priceFightGroup)}}</div>
                                    <div class="_add-single-price">单批价：￥{{toFixed(item.proPrice)}}</div>
                                </div>
                                <p class="time_tag" v-if="item.isSales">限时特价</p>
                            </div>
                        </div>
                        <!-- 商品操作按钮 -->
                        <div class="flex options">
                            <a href="javascript:void(0);" class="flex-1 algin_c" @click="$router.push({name: '商品详情',query: {proSku:item.proSku}})"><i class="iconfont">&#xe681;</i>预览</a>
                            <a href="javascript:void(0);" class="flex-1 algin_c" @click="goEditPage(item,'OFF_SHELF')"><i class="iconfont">&#xe682;</i>编辑</a>
                            <a href="javascript:void(0);" class="flex-1 algin_c" @click="stateMethod(item.proExtId,'up')"><i class="iconfont">&#xe680;</i>上架</a>
                        </div>
                    </div>
                    <div class="goods-loading" v-if="offShelf.listData.length < offShelf.totalPage">
                        <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                        <span class="loading-text">正在努力加载中~</span>
                    </div>
                    <div class="no-more" v-if="offShelf.listData.length == offShelf.totalPage && offShelf.totalPage > 0">没有更多了呦~</div>
                    <div v-if="offShelf.totalPage==0">
                        <div class="no-item">
                            <img src="../../assets/images/wusousoushuju.jpg" alt="">
                            <p>暂无未上架商品~</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="goods_manage_wrapper">
            <!-- 底部fixed栏 -->
            <div class="flex fix-bottom align_items_c">
                <div class="seller-center" @click="$router.push({name: '卖家中心'})">
                    <i class="iconfont">&#xe676;</i>
                    <p>卖家中心</p>
                </div>
                <a v-show="!isEmpty" class="flex-1 noshelves-btn batch-btn" href="javascript:void(0);" @click="goBrect">批量处理</a>
                <a class="flex-1 noshelves-btn created-btn" href="javascript:void(0);" @click="goCreate">创建商品</a>
            </div>
            <!-- 底部fixed栏 -->
            <!-- <div class="flex fix-bottom align_items_c">
                        <div class="flex-1 flex align_items_c" style="padding-left: .3rem;">
                            <label class="check-cir" :class="{checked: isAll}" @click="checkedAll"></label>
                            <span>已选 (<span>{{ checkedNum }}</span>)</span>
                        </div>
                        <a class="delete-btn" href="javascript:void(0);" @click="deleteMethod" v-if="tabId === 'no'">删除</a>
                        <a class="rackup-btn" href="javascript:void(0);" @click="downMethod" v-if="tabId === 'yes'">下架</a>
                        <a class="rackup-btn" href="javascript:void(0);" @click="downMethod" v-else>上架</a>
                    </div> -->
        </div>
    </div>
</template>
<script>
import { Toast,MessageBox } from 'mint-ui';
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
                state: {
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
                selectText: '上架时间',
                flag: false,
                isNum: '1',
            }
        },
        created(){
            // 设置title
            this.$store.commit('SET_TITLE','商品管理');
            // 初始化时拉取已上架商品信息
            this.getList(this.onShelf.orderBy,this.onShelf.sorts,this.onShelf.currentPage,'ON_SHELF').then((res) => {
                this.onShelf.listData = res.data;
                this.onShelf.totalPage = res.total_record;
                for (let obj of this.onShelf.listData) {
                    this.$set(obj, 'checked', false)
                }
            });
            // 初始化时拉取未上架商品信息
            this.getList(this.offShelf.orderBy,this.offShelf.sorts,this.offShelf.currentPage,'OFF_SHELF').then((res) => {
                this.offShelf.listData = res.data;
                this.offShelf.totalPage = res.total_record;
                for(let obj of this.offShelf.listData){
                    this.$set(obj,'checked',false)
                }
            });
            if(this.$route.query.state == undefined || this.$route.query.state === 'ON_SHELF'){
                this.tabId = 'yes';
                this.$router.replace({
                    name: '商品管理',
                    query: {
                        state: 'ON_SHELF'
                    }
                })
            }else{
                this.tabId = 'no';
                this.selectText = '创建时间';
            }
        },
        computed:{
            style() {
                let h = document.body.scrollHeight;
                return {
                    height: this.$tool.isWx ? `calc(${h}px)` : `calc(${h}px - .88rem)`
                }
            },
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
            // 全选
            isAll() {
                if (this.tabId === 'yes'){
                    let isTrue = this.onShelf.listData.every((item) => {
                        return item.checked === true
                    })
                    if (isTrue) {
                        return true;
                    } else {
                        return false;
                    }
                }
                if (this.tabId === 'no') {
                    let isTrue = this.offShelf.listData.every((item) => {
                        return item.checked === true
                    })
                    if (isTrue) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            // 已选数量
            checkedNum() {
                if (this.tabId === 'yes') {
                    let num = 0;
                    for (let obj of this.onShelf.listData) {
                        if (obj.checked) {
                            num++;
                        }
                    }
                    return num;
                }
                if (this.tabId === 'no') {
                    let num = 0;
                    for (let obj of this.offShelf.listData) {
                        if (obj.checked) {
                            num++;
                        }
                    }
                    return num;
                }
            }
        },
        methods:{
            loadMore1() {
                try {
                    if(this.onShelf.listData.length < this.onShelf.totalPage){
                        this.onShelf.currentPage++;
                        this.getList(this.onShelf.orderBy,this.onShelf.sorts,this.onShelf.currentPage,'ON_SHELF').then((res) =>{
                            let timeData = res.data;
                            for(let obj of timeData){
                                this.$set(obj,'checked',false)
                            }
                            this.onShelf.listData = this.onShelf.listData.concat(timeData);
                            if(this.onShelf.listData.length === this.onShelf.totalPage){
                                this.onShelf.currentPage--;
                            }
                        })
                    }
                } catch (e) {

                }
            },
            loadMore2() {
                try {
                    if(this.offShelf.listData.length < this.offShelf.totalPage){
                        this.offShelf.currentPage++;
                        this.getList(this.offShelf.orderBy,this.offShelf.sorts,this.offShelf.currentPage,'OFF_SHELF').then((res) =>{
                            let timeData = res.data;
                            for(let obj of timeData){
                                this.$set(obj,'checked',false)
                            }
                            this.offShelf.listData = this.offShelf.listData.concat(timeData);
                            if(this.offShelf.listData.length === this.offShelf.totalPage){
                                this.offShelf.currentPage--;
                            }
                        })
                    }
                } catch (e) {

                }
            },
            resMethod(num) {
                if(this.isNum == num){
                    this.descFlag = !this.descFlag;
                }else{
                    this.descFlag = false;
                }
                this.isNum = num;
                if(this.descFlag){
                    if(this.$route.query.state == undefined || this.$route.query.state === 'ON_SHELF'){
                        let state = 'ON_SHELF';
                        this.onShelf.orderBy = 'asc';
                        this.onShelf.currentPage = 1;
                        this.getList(this.onShelf.orderBy,Number(num),this.onShelf.currentPage,state).then((res) => {
                            this.onShelf.listData = res.data;
                            this.onShelf.totalPage = res.total_record;
                        })
                    }else{
                        let state = 'OFF_SHELF';
                        this.offShelf.orderBy = 'asc';
                        this.offShelf.currentPage = 1;
                        this.getList(this.offShelf.orderBy,Number(num),this.offShelf.currentPage,state).then((res) => {
                            this.offShelf.listData = res.data;
                            this.offShelf.totalPage = res.total_record;
                            for(let obj of this.offShelf.listData){
                                this.$set(obj,'checked',false)
                            }
                        })
                    }

                }else{
                    if(this.$route.query.state == undefined || this.$route.query.state === 'ON_SHELF'){
                        let state = 'ON_SHELF';
                        this.onShelf.orderBy = 'desc';
                        this.onShelf.currentPage = 1;
                        this.getList(this.onShelf.orderBy,Number(num),this.onShelf.currentPage,state).then((res) => {
                            this.onShelf.listData = res.data;
                            this.onShelf.totalPage = res.total_record;
                        })
                    }else{
                        let state = 'OFF_SHELF';
                        this.offShelf.orderBy = 'desc';
                        this.offShelf.currentPage = 1;
                        this.getList(this.offShelf.orderBy,Number(num),this.offShelf.currentPage,state).then((res) => {
                            this.offShelf.listData = res.data;
                            this.offShelf.totalPage = res.total_record;
                            for(let obj of this.offShelf.listData){
                                this.$set(obj,'checked',false)
                            }
                        })
                    }
                }
                this.flag = false;
            },
            goEditPage(item,type) {
                this.$store.commit('SET_RESIZE');
                this.$router.push({
                    name: '商品编辑-1',
                    query: {
                        edit:item.proId,
                        proSku: item.proSku,
                        state: type
                    }
                })
            },
            // 创建商品
            goCreate() {
                this.$store.commit('SET_RESIZE');
                this.$router.push({
                    name: '新品上架-1'
                })
            },
            // 批量处理
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
            // 全选时改变图标
            checkedAll() {
                if (this.tabId === 'yes') {
                    let isTrue = this.onShelf.listData.every((item) => {
                        return item.checked === true
                    })
                    if (isTrue) {
                        for (let obj of this.onShelf.listData) {
                            obj.checked = false;
                        }
                    } else {
                        for (let obj of this.onShelf.listData) {
                            obj.checked = true;
                        }
                    }
                }
                if (this.tabId === 'no') {
                    let isTrue = this.offShelf.listData.every((item) => {
                        return item.checked === true
                    })
                    if (isTrue) {
                        for (let obj of this.offShelf.listData) {
                            obj.checked = false;
                        }
                    } else {
                        for (let obj of this.offShelf.listData) {
                            obj.checked = true;
                        }
                    }
                }
            },
            // 上架商品
            plusMethod() {
                let status = store.state.member.shop.shopStatus;
                if(status == -2) {
                    return this.$messageBox({
                        title:'提示',
                        message:`您因违规操作而被冻结无法操作商品，若有疑问，请联系客服400-996-3399`,
                        confirmButtonText: '我知道了'
                    })
                }
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
                    return this.$messageBox({
                        title:'提示',
                        message: res.errorMsg,
                        confirmButtonText: '我知道了'
                    })
                })
            },
            // 下架商品
            downMethod() {
                let status = store.state.member.shop.shopStatus;
                if (status == -2) {
                    return this.$messageBox({
                        title: '提示',
                        message: `您因违规操作而被冻结无法操作商品，若有疑问，请联系客服400-996-3399`,
                        confirmButtonText: '我知道了'
                    })
                }
                let checkedId = [];
                for (let obj of this.onShelf.listData) {
                    if (obj.checked) {
                        checkedId.push(obj.proExtId);
                    }
                }
                let data = {
                    sysId: 1,
                    state: 'OFF_SHELF',
                    proExtIds: checkedId.join(',')
                }
                this.upOrDown(data).then(res => {
                    Toast({
                        message: '商品下架成功',
                        iconClass: 'icon icon-success'
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                });
            },
            upOrDown(data) {
                return new Promise((resolve, reject) => {
                    this.$api.post('/oteao/productInfo/modifyOrgProInfoState', data, res => {
                        resolve(res);
                    }, res => {
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    });
                });
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
            // 删除
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
                if(type === 'up'){
                    let status = store.state.member.shop.shopStatus;
                    if(status == -2) {
                        return this.$messageBox({
                            title:'提示',
                            message:`您因违规操作而被冻结无法上架商品，若有疑问，请联系客服400-996-3399`,
                            confirmButtonText: '我知道了'
                        })
                    }
                }
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
                        message: type == 'down' ? '商品下架成功！' : '商品上架成功！',
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
                        if(res.total_record==0){
                            return Toast({
                                message: `找不到该商品哦~`,
                                iconClass: 'icon icon-fail'
                            });
                        }
                        this.onShelf.listData = res.data;
                        this.onShelf.totalPage = res.total_record;
                    })
                }else{
                    this.getList(this.offShelf.orderBy,this.offShelf.sorts,this.offShelf.currentPage,'OFF_SHELF').then((res) => {
                        if(res.total_record==0){
                            return Toast({
                                message: `找不到该商品哦~`,
                                iconClass: 'icon icon-fail'
                            });
                        }
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
                    this.selectText = '上架时间';
                    this.$router.replace({
                        name: '商品管理',
                        query: {
                            state: 'ON_SHELF'
                        }
                    })
                }else{
                    this.selectText = '创建时间';
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
            cancelText() {
                this.searchTxt = "";
                this.searchMethod();
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
        },
    }
</script>
<style lang="less" scoped>
    @import '~@/styles/seller/goodsManage.less';
    /* _add为新增，_fix为修改 */

    /* 修改价格样式 */
    ._fix-pro-txt{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        ._fix-price{
            position: unset!important;
            flex: 1;
            width: 1.7rem;
        }
    }

    /* 增加成团人数描述 */
    ._add-tuan{
        display: flex;
        align-items: center;
        margin-top:0.3rem; 
        ._add-num{
        width: 33%;
        height: 0.38rem;
        background: linear-gradient(90deg,#ff5500 0%,#ff8200 100%);
        padding: 0.1rem 0.2rem;
        position: relative;
        }
        ._add-groupnum{
            width: 1.33rem;
            height: 0.4rem;
            background-image: linear-gradient(to right, #ff5500 0%, #ff8200 100%);
            font-size: 0.24rem;
            line-height: 0.4rem;
            letter-spacing: 0rem;
            color: #ffffff;
            padding-left: 0.1rem;
            margin-right: 0.1rem;
            position: relative;
            border-radius: 0.04rem 0rem 0rem 0.04rem;
            &:after{
                content: '';
                display: block;
                width: 0.25rem;
                height: 0.45rem;
                position: absolute;
                -webkit-transform: skewX(30deg);
                transform: skewX(30deg);
                background: #fff;
                top: -1px;
                right: -0.12rem;
            }
        }
        ._add-single-price{
            /* width: 1.92rem; */
            height: 0.33rem;
            font-size: 0.24rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.36rem;
            letter-spacing: 0rem;
            color: #666666;
        }
    }
</style>
