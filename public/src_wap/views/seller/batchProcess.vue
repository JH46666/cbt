<template>
    <div class="goods_manage_wrapper batch_wrapper">
        <!-- 商品 -->
        <div class="tab-content-wrapper">
            <div class="no-shelves">
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
                            <div v-if="item.saleFinish" class="sale-finish">已售完</div>
                        </div>
                        <div class="flex-1 pro-txt">
                            <h4 class="tit">{{item.proTit}}</h4>
                            <p class="price">￥{{toFixed(item.proPrice)}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部fixed栏 -->
        <div class="flex fix-bottom align_items_c">
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
                wxFixedFlag: false,         //tab是否固定 wx环境
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
                        saleFinish: false,                         //是否售完
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
                        saleFinish: true,                         
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
                        saleFinish: false,                       
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
        }
    }
</script>
<style lang="less">
    @import '~@/styles/seller/goodsManage.less';
</style>