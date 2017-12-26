<template>
    <div class="index">
        <!-- 搜索框 -->
        <div class="search_wrapper">
            <div class="search_item">
                <div class="logo">
                    <img src="../../assets/images/index_logo.png" />
                </div>
                <div class="search_text_wrapper">
                    <input type="text" readonly placeholder="搜索您喜欢的好茶！" />
                    <i class="iconfont">&#xe649;</i>
                </div>
            </div>
        </div>
        <!-- 轮播 -->
        <div class="banner_wrapper">
            <mt-swipe :auto="3000">
                <mt-swipe-item style="background-color: yellow;"></mt-swipe-item>
                <mt-swipe-item style="background-color: green;"></mt-swipe-item>
                <mt-swipe-item style="background-color: red;"></mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 四个馆 -->
        <div class="four_wrapper">
            <div class="four_bg"></div>
            <div class="four_item">
                <img src="../../assets/images/ic_xinpinguan.png" />
                <span>新品馆</span>
            </div>
            <div class="four_item">
                <img src="../../assets/images/ic_mingzhongguan.png" />
                <span>名枞馆</span>
            </div>
            <div class="four_item">
                <img src="../../assets/images/ic_pinpaiguan.png" />
                <span>品牌馆</span>
            </div>
            <div class="four_item">
                <img src="../../assets/images/ic_weihuo.png" />
                <span>品质尾货</span>
            </div>
        </div>
        <!-- 新闻 -->
        <div class="news_wrapper">
            <div class="news_item">
                <div class="news_item_left">

                </div>
                <div class="news_item_right">
                    
                </div>
            </div>
        </div>
        <!-- 红包茶叶 -->
        <div class="packet_wrapper">
            <div class="packet_item item_1">

            </div>
            <div class="packet_item item_2">
                <div class="items">

                </div>
                <div class="items">

                </div>
            </div>
        </div>
        <!-- 卖家招募 -->
        <div class="seller_wrapper">
            <div class="seller_pro_wrapper">
                <div class="seller_pro_item">

                </div>
            </div>
            <div class="seller_link">

            </div>
        </div>
        <!-- 分类 -->
        <div class="cat_wrapper">
            <div class="cat_top">
                <div class="cat_items">

                </div>
            </div>
            <div class="cat_bottom">

            </div>
        </div>
        <!-- 用户说 -->
        <div class="user_wrapper">
            <div class="user_item">

            </div>
        </div>
        <!-- 关键词 -->
        <div class="keyword_wrapper">

        </div>
        <!-- 为你推荐 -->
        <div class="suggest_wrapper">
            <div class="suggest_head">
                <div class="suggest_title">

                </div>
            </div>
            <div class="suggest_content">
                <div class="suggest_item">

                </div>
                <div class="suggest_item">

                </div>
            </div>
        </div>
        <!-- 到底啦 -->
        <div class="bottom_wrapper">到底啦~</div>
        <!-- 返回顶部 -->
        <div class="top_wrapper"></div>
    </div>
</template>

<script>
import cbtDate from '../../components/datePicker.vue'
    export default {
        components: {
            cbtDate
        },
        data() {
            return {
                title: '123'
            }
        },
        created(){
            // 设置title
            this.$store.commit('SET_TITLE','茶帮通商城');

            if(location.href.indexOf('?wxpaycallback=') !== -1 ){
                // 表示微信支付回调
                // let src = location.href.split('?')[1].split('#')[0].split('=')[1];
                let src = location.href.split('?')[1].split('#')[0].split('%20');
                let payId = src[0].split('=')[1];
                location.replace(location.origin + `/#/balance/payview?payId=${payId}&wx=wxpaycallback&type=${src[1]}`);
            }
        }
    }
</script>

<style lang="less">
@import '~@/styles/index/index.less';
</style>
