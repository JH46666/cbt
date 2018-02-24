<!--
    props           type            default
    myProducts      array           []       //商品集合列表信息


-->
<template>
    <div class="product_collection clearfix">
        <template v-for="(item,index) in productData">
            <div class="pro-item" :class="{noPadding: item.isSoldOut == 1}">
                <router-link v-if="item.isSoldOut != 1" :to="'/detail?proSku='+item.proSku" class="cbt-collection-item">
                    <div class="tag-img" v-if="item.tagImage">
                        <img v-lazy="item.tagImage" :src="item.tagImage">
                    </div>
                    <div class="pro_img">
                        <img v-lazy="item.proImg" :src="item.proImg">
                    </div>
                    <div class="pro-txt">
                        <h4>{{item.proName}}</h4>
                        <p class="attr-txt">{{item.subTitle}}</p>
                        <p class="price-box">
                            <span class="pro-price" v-if="!$tool.isLogin()">询价</span>
                            <span class="pro-price" v-else>￥{{item.proPrice}}</span>
                            <!-- 其他的类型加other  class就行   ['茶厂','合作社','茶企','批发商','自营','自营']-->
                            <span class="type" :class="{'other':item.tagNum <= 4}">{{bussinessType[item.tagNum-1]}}</span>
                        </p>
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

<style scoped>
.product_collection .noPadding{
    padding:0rem
}
</style>

