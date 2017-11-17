<template>
    <div class="cbt-goods-item">
        <div class="left-text-wrap">
            <div class="goods-title">
                安溪西坪 清香型（消酸）铁观音303-507  2015秋茶安溪西坪 清香型（消酸）铁观音303-507  2015秋茶安溪西坪 清香型（消酸）铁观音303-507  2015秋茶
            </div>
            <div class="goods-attr-wrap">
                <div class="goods-attr">
                    <div class="attr-left">香气偏淡</div>
                    <div class="attr-right">
                        <template v-for="n in 5">
                            <span class="attr-tea" :class="{active:n <= 3}"></span>
                        </template>
                    </div>
                </div>
                <div class="goods-attr">
                    <div class="attr-left">滋味很浓</div>
                    <div class="attr-right">
                        <template v-for="n in 5">
                            <span class="attr-xiang" :class="{active:n <= 3}"></span>
                        </template>
                    </div>
                </div>
            </div>
            <div class="goods-bd">
                <div class="goods-price">
                    300元/斤
                </div>
                <div class="goods-type">
                    自营
                </div>
            </div>
        </div>
        <goods-img></goods-img>
    </div>
</template>


<script>
    export default{
        name: 'goodsItem'
    }
</script>