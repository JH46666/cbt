<!--
    props           type            default
    myProducts      array           []       //商品集合列表信息


-->

<template>
    <div class="product_collection clearfix">
        <div class="pro-item" v-for="(item,index) in productData" :key="index">
            <router-link :to="'/detail?proSku='+item.proSku" class="cbt-collection-item">
                <!-- <div class="tag-img">
                    <img src="//img4.zuipin.cn/zpfx/common/2017-10-12-14-56-58-59df123a5d83217620.png">
                </div> -->
                <div class="pro_img">
                    <img src="../assets/guan.jpg">
                </div>
                <div class="pro-txt">
                    <h4>{{item.proName}}</h4>
                    <p class="attr-txt">{{item.subTitle}}</p>
                    <p class="price-box">
                        <span class="pro-price">￥{{item.proPrice}}</span>
                        <!-- 其他的类型加other  class就行 -->
                        <span class="type">自营</span>
                    </p>
                </div>
            </router-link>
        </div>
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
