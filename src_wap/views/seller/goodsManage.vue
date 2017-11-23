<template>
    <div class="goods_manage_wrapper">
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
        <div class="tab-btn-wrapper">
            <div class="flex">
                <a class="flex-1" :class="{on: tabId == 'yes'}" @click="tabId = 'yes'" href="javascript:void(0);">已上架（90）</a>
                <a class="flex-1" :class="{on: tabId == 'no'}" @click="tabId = 'no'" href="javascript:void(0);">未上架（5）</a>
            </div>
        </div>
        <!-- 排序条件 -->
        <div class="sort-wrapper flex">
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
            <div v-show="tabId == 'yes'">
                <div class="good-item">
                    <div class="item-caption">
                        <div class="cap-l">
                            <label class="checkir-cir">
                                <input type="checkbox" name=""  v-model="selectIdsNo" hidden>
                            </label> 
                            <span>创建 2017-11-11 19:00:08</span>
                        </div>
                        <div class="cap-r">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="tabId == 'no'">
                    
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                searchTxt: "",            //搜索内容
                sortCondition: 'time',    //排序条件
                descFlag: false,          //是否是降序
                tabId: 'yes',             //tab切换，yes表示已上架  no表示未上架
                selectIdsNo: [],           //已选的未上架商品
                products: [
                    {
                        createdTime: '2017-11-11 19:00:08',        //创建时间
                        saleNum: 5000,                             //已售
                        stock: 2000,                               //库存
                        proId: 1,                               //id
                        proImg: '../src_wap/assets/cart_img1.png', //商品图片
                        proHref: '/detail',                        //商品链接
                        proPrice: 5000,                            //商品价格
                        checkedFlag: false,                        //是否被选中
                    },
                    {
                        createdTime: '2017-11-11 19:00:08',        
                        saleNum: 5000,                             
                        stock: 2000,                            
                        proId: 2,   
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