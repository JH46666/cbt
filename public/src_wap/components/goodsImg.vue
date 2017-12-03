<!-- 
    props           type            default
    imgUrl          String          /               图片地址
    imgWidth        String          1.76rem         图片宽度
    tagUrl          String                          标签的地址





 -->

<template>
    <div class="cbt-goods-img" :style="{width: imgWidth,height:imgWidth}">
        <div class="img-wrap">
            <img v-lazy="imgUrl" class="goods-img">
            <div class="tag-wrap" v-if="tagUrl !== ''">
                <img src="../assets/images/特价.png" class="goods-tag">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'goodsImg',
        props: {
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
            }
        }
    }
</script>