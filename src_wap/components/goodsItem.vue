<!-- 
    props           type            default
    link`           String          #               跳转的链接
    businessType    String          self/join       自营or联营
    imgUrl          String          /               图片地址
    imgWidth        String          1.76rem         图片宽度
    tagUrl          String                          标签的地址
    aromaStar       Number          0               香气等级
    tasteStar       Number          0               味道等级















-->

<template>
    <router-link :to="link" class="cbt-goods-item" tag="div">
        <div class="left-text-wrap">
            <div class="goods-title">
                安溪西坪 清香型（消酸）铁观音303-507  2015秋茶安溪西坪 清香型（消酸）铁观音303-507  2015秋茶安溪西坪 清香型（消酸）铁观音303-507  2015秋茶
            </div>
            <div class="goods-attr-wrap">
                <div class="goods-attr">
                    <div class="attr-left">香气偏淡</div>
                    <div class="attr-right">
                        <template v-for="n in 5">
                            <span class="attr-tea" :class="{active:n <= aromaStar}"></span>
                        </template>
                    </div>
                </div>
                <div class="goods-attr">
                    <div class="attr-left">滋味很浓</div>
                    <div class="attr-right">
                        <template v-for="n in 5">
                            <span class="attr-xiang" :class="{active:n <= tasteStar}"></span>
                        </template>
                    </div>
                </div>
            </div>
            <div class="goods-bd">
                <div class="goods-price">
                    300元/斤
                </div>
                <div class="goods-type self" v-if="businessType === 'self'">
                    自营
                </div>
                <div class="goods-type" v-else>
                    联营
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
            link: {
                type: String,
                default: '#'
            },
            businessType: {
                type: String,
                default: 'self'
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
            }
        }
    }
</script>