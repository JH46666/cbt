<!-- 
    props           type            default
    link`           String          #               跳转的链接
    businessType    String          self/join       自营or联营
    imgUrl          String          /               图片地址
    imgWidth        String          1.76rem         图片宽度
    tagUrl          String                          标签的地址
    aromaStar       Number          0               香气等级
    tasteStar       Number          0               味道等级
    mainTit         String          ''              主标题
    subTit          String          ''              副标题
    price           Number          0               价格
    unit            String          斤              单位













-->

<template>
    <router-link :to="'/detail?proSku='+link" class="cbt-goods-item" tag="div">
        <div class="left-text-wrap">
            <div class="goods-title">
                {{mainTit}}
            </div>
            <div class="goods-title">
                {{subTit}}
            </div>
            <div class="goods-attr-wrap">
                <div class="goods-attr">
                    <div class="attr-left">香气{{aromaName}}</div>
                    <div class="attr-right">
                        <template v-for="n in 5">
                            <span class="attr-tea" :class="{active:n <= aromaStar}"></span>
                        </template>
                    </div>
                </div>
                <div class="goods-attr">
                    <div class="attr-left">滋味{{tasteName}}</div>
                    <div class="attr-right">
                        <template v-for="n in 5">
                            <span class="attr-xiang" :class="{active:n <= tasteStar}"></span>
                        </template>
                    </div>
                </div>
            </div>
            <div class="goods-bd">
                <div class="goods-price">
                    {{price}}元/{{unit}}
                </div>
                <div class="goods-type self">
                    {{businessType}}
                </div>
            </div>
        </div>
        <goods-img :imgWidth="imgWidth" :imgUrl="imgUrl" :tagUrl="tagUrl"></goods-img>
    </router-link>
</template>


<script>
    export default{
        name: 'goodsItem',
        props: {
            mainTit: {
                type: String,
                default: ''
            },
            subTit: {
                type: String,
                default: ''
            },
            price:{
                type: Number,
                default: 0
            },
            unit:{
                type:String,
                default: '斤'
            },
            link: {
                type: String,
                default: '#'
            },
            businessType: {
                type: String,
                default: '自营'
            },
            imgUrl: {
                type: String,
                default: '/'
            },
            imgWidth: {
                type: String,
                default: '1.76rem'
            },
            tagUrl: {
                type: String,
                default: ''
            },
            aromaStar: {
                type: Number,
                default: 0
            },
            tasteStar : {
                type: Number,
                default: 0
            },
            aromaName:{
                type: String,
                default: ''
            },
            tasteName:{
                type: String,
                default: ''
            }
        }
    }
</script>