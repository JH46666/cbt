<template>
    <div class="detail">
        <div class="detail_wrapper">
            <div class="detail_img">
                <mt-swipe :auto="2000" :show-indicators="false" @change="handleChange">
                    <mt-swipe-item v-for="(item,index) in goodsDetail.swiperImg" :key="index">
                        <img :src="item" :key="index">
                    </mt-swipe-item>
                </mt-swipe>
                <div class="detail_img_index">
                    <span>{{ imgIndex }}</span>/{{ goodsDetail.swiperImg.length }}
                </div>
            </div>
            <div class="detail_describe">
                <div class="detail_describe_wrapper">
                    <div class="detail_describe_text">
                        <p class="detail_text">{{ goodsDetail.goodsText }}</p>
                        <p class="detail_now_price">￥{{ goodsDetail.goodsPrice.toFixed(2) }}</p>
                        <p class="detail_suggest_price">建议零售价：￥{{ goodsDetail.suggestPrice.toFixed(2) }}</p>
                    </div>
                    <div class="detail_describe_count">
                        <label class="label_text">采购量</label>
                        <plusOreduce :maxNum="goodsDetail.maxGoodsNum" @countNum="goodsCounts"></plusOreduce>
                    </div>
                </div>
            </div>
            <div class="detail_tab">
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">详情</mt-tab-item>
                    <mt-tab-item id="2">规格</mt-tab-item>
                    <mt-tab-item id="3">评论</mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="selected" :swipeable="true">
                    <mt-tab-container-item id="1">
                        <mt-cell v-for="n in 10" :title="'内容 ' + n" />
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <mt-cell v-for="n in 4" :title="'测试 ' + n" />
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <mt-cell v-for="n in 6" :title="'选项 ' + n" />
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <mt-tabbar v-model="selected" class="cbt-footer detail_footer">
            <mt-tab-item id="客服">
                <i class="icon-rexian" slot="icon"></i>
                客服
            </mt-tab-item>
            <mt-tab-item id="购物车">
                <i class="icon-shopcar" slot="icon"></i>
                购物车
                <mt-badge type="error" size="small">99+</mt-badge>
            </mt-tab-item>
            <mt-tab-item id="加入购物车">
                <mt-button type="default">加入购物车</mt-button>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
import plusOreduce from '@/components/plusOreduce.vue'
export default {
    components: {
        plusOreduce
    },
    data() {
        return {
            selected: null,
            imgIndex: 1,
            goodsCount: 0,
            goodsDetail: {
                swiperImg: ['../src_wap/assets/detail.png','../src_wap/assets/detail.png','../src_wap/assets/detail.png'],
                goodsText: '安溪西坪 清香型（消酸）铁观音 303-5072015秋茶外形稍肥状较结安溪西坪 清香型（消酸）铁观音 303-5072015秋茶外形稍肥状较结',
                goodsPrice: 362,
                suggestPrice: 800,
                maxGoodsNum: 100,
            }
        }
    },
    methods: {
        handleChange(index) {
            this.imgIndex = index+1;
        },
        goodsCounts(val) {
            this.goodsCount = val;
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/less/detail.less';

</style>
