<!--
    props           type            default
    myProducts      array           []       //商品集合列表信息


-->
<template>
    <div class="product_collection clearfix">
        <template v-for="(item,index) in productData">
            <div class="pro-item">
                <router-link :to="'/detail?proSku='+item.proSku" class="cbt-collection-item">
                    <div class="tag-img" v-if="item.tagImage">
                        <img v-lazy="item.tagImage" :src="item.tagImage">
                    </div>
                    <div class="pro_img">
                        <img v-lazy="item.proImg" :src="item.proImg">
                    </div>
                    <div class="pro-txt">
                        <h4>{{item.proName}}</h4>
                        <div class="product-price">
                            <template  v-if="!$tool.isLogin()">
                                <div class="off_shelf_tips">
                                    ￥{{item.hidePriceGroups}}
                                </div>
                                <div class="detail_suggest_price">￥{{ item.marketPrice | toFix2 }}</div>
                            </template>
                            <template v-else>
                                <div class="detail_now_price">
                                    ￥{{item.priceGroups | toFix2  }}
                                </div>
                                <div class="detail_suggest_price">￥{{ item.marketPrice | toFix2 }}</div>
                            </template>
                        </div>
                            
                        <!-- <p class="attr-txt">{{item.subTitle}}</p>
                        <p class="price-box">
                            <span class="pro-price" v-if="!$tool.isLogin()">询价</span>
                            <span class="pro-price" v-else>￥{{item.proPrice}}</span> -->
                            <!-- 其他的类型加other  class就行   ['茶厂','合作社','茶企','批发商','自营','自营']-->
                            <!-- <span class="type" :class="{'other':item.tagNum <= 4}">{{bussinessType[item.tagNum-1]}}</span>
                        </p> -->
                    </div>
                </router-link>
            </div>
        </template>
    </div>

</template>


<script>

    export default{
        name: 'collection',
        props: {
            myProducts:{
                type: Array,
                default() {
                    return []
                }
            },

        },
        data(){
            return {
                bussinessType: ['茶厂','合作社','茶企','批发商','自营','自营'],
                productData:[],
            }
        },
        watch: {
            myProducts(val) {
                this.productData = JSON.parse(JSON.stringify(val));
            },
        },
    }
</script>

<style>
 /* .detail_now_price{
    color:#f08200;
    line-height: 1;
    font-size: 0.4rem;
    margin-right: 0.1rem;
}
.detail_suggest_price{
    color:#999;
    line-height: 1;
    font-size: 0.3rem;
    text-decoration: line-through;
} */
</style>

