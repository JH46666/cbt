<template>
    <div class="cbt-goods-img">
        <div class="img-wrap">
            <img v-lazy="imgUrl">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'goodsImg',
        props: {
            imgUrl: {
                type: String,
                default: 'http://b.hiphotos.baidu.com/image/pic/item/faf2b2119313b07ee3e251c205d7912396dd8c98.jpg'
            }
        }
    }
</script>