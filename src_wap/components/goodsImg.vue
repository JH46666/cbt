<template>
    <div class="cbt-goods-img">
        <div class="img-wrap">
            <img v-lazy="imgUrl" class="goods-img">
            <div class="tag-wrap">
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
            }
        }
    }
</script>