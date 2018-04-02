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
    price           Number          0               团购价格
    garyPrice       Number          0               单买价格
    hideGroupsPrice Number          0               隐藏价格
    unit            String          斤              单位
    isLogin         Boolean         false

    新增prop
    salesPrice      Number          0               特价











-->

<template>
    <router-link :to="'/detail?proSku='+link" class="cbt-goods-item" tag="div">
        <div class="left-text-wrap">
            <div class="goods-title" style="-webkit-box-orient: vertical">
                <div class="goods-type" :class="{'other': businessType && businessType <= 4}">
                    {{ businessName[businessType - 1] || businessName[4] }}
                </div>
                <div class="goods-mTit" v-html="mainTit"></div>
            </div>
            <!-- <div class="goods-title one-line" v-if="subTit" v-html="subTit">
            </div> -->
            <!-- <div class="goods-attr-wrap" v-if="isShowAttr">
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
            </div> -->
            <div class="goods-bd">
                <div class="goods-price">
                    <template v-if="isLogin">
                        <span>{{'￥'+ toFixed(price)}}</span>
                        <span class="goods-garyPrice">{{'￥'+ toFixed(garyPrice)}}</span>
                    </template>
                    <template v-else>
                        <span>{{'￥'+ hideGroupsPrice}}</span>
                        <span class="goods-garyPrice">{{'￥'+ toFixed(garyPrice)}}</span>
                    </template>
                </div>
            </div>
        </div>
        <goods-img :imgWidth="imgWidth" :imgUrl="imgUrl" :tagUrl="tagUrl"></goods-img>
    </router-link>
</template>


<script>
export default {
    name: 'goodsItem',
    props: {
        isShowAttr: {
            type: Number,
            default: 1
        },
        mainTit: {
            type: String,
            default: ''
        },
        subTit: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        },
        garyPrice: {
            type: Number,
            default: 0
        },
        hideGroupsPrice: {
            type: String,
            default: ''
        },
        unit: {
            type: String,
            default: '斤'
        },
        link: {
            type: String,
            default: '#'
        },
        businessType: {
            type: Number,
            default: 5
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
        tasteStar: {
            type: Number,
            default: 0
        },
        aromaName: {
            type: String,
            default: ''
        },
        tasteName: {
            type: String,
            default: ''
        },
        isLogin: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        businessName() {
            return this.$tool.shopType
        }
    },
    methods: {
        toFixed(v) {
            return Number(v).toFixed(2);
        }
    }
}
</script>
