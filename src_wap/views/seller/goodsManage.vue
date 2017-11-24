<template>
    <div class="goods_manage_wrapper" @scroll="doScroll" ref="scroll_wrapper">
        <!-- 搜索框 -->
        <div class="search-wrapper flex">
            <div class="flex search-inner">
                <div class="search-txt">
                    <input type="text" name="" value="" v-model="searchTxt" placeholder="搜索商品">
                    <a href="javascript:void(0)" class="clear-txt" v-show="clearFlag" @click="clearTxt">
                        <i class="iconfont">&#xe651;</i>
                    </a>
                </div>
                <a class="flex-1 search-btn" href="javascript:void(0)">
                    <i class="iconfont">&#xe649;</i>
                </a>
            </div>
            <div class="cancel">取消</div>
        </div>
        <!-- tab按钮 -->
        <div class="tab-btn-wrapper" ref="tabs">
            <div class="flex">
                <a class="flex-1" :class="{on: tabId == 'yes'}" @click="tabId = 'yes'" href="javascript:void(0);">已上架（90）</a>
                <a class="flex-1" :class="{on: tabId == 'no'}" @click="tabId = 'no'" href="javascript:void(0);">未上架（5）</a>
            </div>
        </div>
        <!-- 排序条件 -->
        <div class="sort-wrapper flex" :class="{'fixed-sort': fixedFlag,'wx-fixed':wxFixedFlag}">
            <label class="flex-1 sort-item" :class="{on:sortCondition=='time'}">
                创建时间
                <input type="radio" name="" value="time" hidden v-model="sortCondition" @click="descFlag = !descFlag">
                <span class="sort-icons">
                    <i class="iconfont sort-asce" :class="{on: !descFlag}">&#xe610;</i>
                    <i class="iconfont sort-desc" :class="{on: descFlag}">&#xe950;</i>
                </span>
            </label>
            <label class="flex-1 sort-item" :class="{on:sortCondition=='saleNum'}">
                销量
                <input type="radio" name="" value="saleNum" hidden v-model="sortCondition" @click="descFlag = !descFlag">
                <span class="sort-icons">
                    <i class="iconfont sort-asce" :class="{on: !descFlag}">&#xe610;</i>
                    <i class="iconfont sort-desc" :class="{on: descFlag}">&#xe950;</i>
                </span>
            </label>
            <label class="flex-1 sort-item" :class="{on:sortCondition=='stock'}">
                库存
                <input type="radio" name="" value="stock" hidden v-model="sortCondition" @click="descFlag = !descFlag">
                <span class="sort-icons">
                    <i class="iconfont sort-asce" :class="{on: !descFlag}">&#xe610;</i>
                    <i class="iconfont sort-desc" :class="{on: descFlag}">&#xe950;</i>
                </span>
            </label>
        </div>
        <!-- 商品 -->
        <div class="tab-content-wrapper">
            <div v-show="tabId == 'yes'" class="rack-up">
                <div class="good-item" v-for="item in products">
                    <!-- 头部 caption -->
                    <div class="item-caption flex">
                        <div class="cap-l flex flex-1 align_items_c">
                            <!-- <label class="check-cir">
                                <input type="checkbox" name=""  v-model="selectIdsNo" hidden>
                            </label>  -->
                            <span>创建 {{item.createdTime}}</span>
                        </div>
                        <div class="cap-r algin_r">
                            <span class="saled">已售<span class="number">{{item.saleNum}}</span></span>
                            <span class="stock">库存<span class="number">{{item.stock}}</span></span>
                        </div>
                    </div>
                    <!-- 中间商品 -->
                    <div class="good-info flex">
                        <div class="pro-img">
                            <img :src="item.proImg" alt="">
                        </div>
                        <div class="flex-1 pro-txt">
                            <h4 class="tit">{{item.proTit}}</h4>
                            <p class="price">￥{{toFixed(item.proPrice)}}</p>
                        </div>
                    </div>
                    <!-- 商品操作按钮 -->
                    <div class="flex options">
                        <a href="javascript:void(0);" class="flex-1 algin_c"><i class="iconfont">&#xe681;</i>预览</a>
                        <a href="javascript:void(0);" class="flex-1 algin_c"><i class="iconfont">&#xe682;</i>编辑</a>
                        <a href="javascript:void(0);" class="flex-1 algin_c"><i class="iconfont">&#xe683;</i>下架</a>
                    </div>
                </div>
            </div>
            <div v-show="tabId == 'no'" class="no-shelves">
                <div class="good-item" v-for="item in products">
                    <!-- 头部 caption -->
                    <div class="item-caption flex">
                        <div class="cap-l flex flex-1 align_items_c">
                            <label class="check-cir" :class="{'checked':item.checkedFlag}">
                                <input type="checkbox" name=""  v-model="selectIdsNo" hidden @click="item.checkedFlag = !item.checkedFlag">
                            </label> 
                            <span>创建 {{item.createdTime}}</span>
                        </div>
                        <div class="cap-r algin_r">
                            <span class="saled">已售<span class="number">{{item.saleNum}}</span></span>
                            <span class="stock">库存<span class="number">{{item.stock}}</span></span>
                        </div>
                    </div>
                    <!-- 中间商品 -->
                    <div class="good-info flex">
                        <div class="pro-img">
                            <img :src="item.proImg" alt="">
                        </div>
                        <div class="flex-1 pro-txt">
                            <h4 class="tit">{{item.proTit}}</h4>
                            <p class="price">￥{{toFixed(item.proPrice)}}</p>
                        </div>
                    </div>
                    <!-- 商品操作按钮 -->
                    <div class="flex options">
                        <a href="javascript:void(0);" class="flex-1 algin_c"><i class="iconfont">&#xe681;</i>预览</a>
                        <a href="javascript:void(0);" class="flex-1 algin_c"><i class="iconfont">&#xe682;</i>编辑</a>
                        <a href="javascript:void(0);" class="flex-1 algin_c"><i class="iconfont">&#xe683;</i>上架</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部fixed栏 -->
        <div class="flex fix-bottom align_items_c seller-bottom" v-show="tabId == 'yes'">
            <div class="flex-1 seller-center">
                <i class="iconfont">&#xe676;</i>
                <p>卖家中心</p>
            </div>
            <a class="noshelves-btn batch-btn" href="javascript:void(0);">批量处理</a>
            <a class="noshelves-btn created-btn" href="javascript:void(0);">创建商品</a>  
        </div>
        <!-- 底部fixed栏 -->
        <div class="flex fix-bottom align_items_c" v-show="tabId == 'no'">
            <div class="flex-1 flex align_items_c">
                <label class="check-cir">
                    <input type="checkbox" name=""  v-model="selectIdsNo" hidden>
                </label>
                <span>已选（<span>5</span>）</span>
            </div>
            <a class="delete-btn" href="javascript:void(0);">删除</a>  
            <a class="rackup-btn" href="javascript:void(0);">上架</a>  
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                searchTxt: "",            //搜索内容
                fixedFlag: false,         //tab是否固定
                wxFixedFlag: false,         //tab是否固定 wx环境
                sortCondition: 'time',    //排序条件
                descFlag: false,          //是否是降序
                tabId: 'yes',             //tab切换，yes表示已上架  no表示未上架
                selectIdsNo: [],           //已选的未上架商品
                products: [
                    {
                        createdTime: '2017-11-11 19:00:08',        //创建时间
                        saleNum: 5000,                             //已售
                        stock: 2000,                               //库存
                        proId: 1,                                  //id
                        proImg: '../src_wap/assets/cart_img1.png', //商品图片
                        proTit: '醉品朴茶 安溪铁观', //商品title
                        proHref: '/detail',                        //商品链接
                        proPrice: 5000,                            //商品价格
                        checkedFlag: false,                        //是否被选中
                    },
                    {
                        createdTime: '2017-11-11 19:00:08',        
                        saleNum: 5000,                             
                        stock: 2000,                            
                        proId: 2,   
                        proTit: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                        proImg: '../src_wap/assets/cart_img1.png', 
                        proHref: '/detail',                        
                        proPrice: 5000,  
                        checkedFlag: false,                          
                    },
                    {
                        createdTime: '2017-11-11 19:00:08',        
                        saleNum: 5000,                             
                        stock: 2000,                            
                        proId: 2,   
                        proTit: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型铁观音2017秋铁观音2017秋',
                        proImg: '../src_wap/assets/cart_img1.png', 
                        proHref: '/detail',                        
                        proPrice: 5000,  
                        checkedFlag: false,                          
                    }
                ]
            }
        },
        computed:{
            clearFlag(){
                if(this.searchTxt.length>0){
                    return true;
                }else{
                    return false;
                }
            }
        },
        methods:{
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
            sortCondition(val){
                this.descFlag = false;
            }
        }
    }
</script>
<style lang="less">
    @import '~@/styles/seller/goodsManage.less';
</style>