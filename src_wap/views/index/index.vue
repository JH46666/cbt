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
                    茶帮通
                    <div class="news_logo">头条</div>
                </div>
                <div class="news_item_right">
                    醉品茶集全国招商大会再度引爆茶业茶业醉品茶集全国招商大会再度引爆茶业茶业
                </div>
            </div>
        </div>
        <!-- 红包茶叶 -->
        <div class="packet_wrapper">
            <div class="packet_item item_1">
                <div class="packet_item_left">
                    <span>签到得现金红包</span>
                    <span>茶帮通会员抢红包进行中</span>
                </div>
                <div class="packet_item_right">去抢红包</div>
            </div>
            <div class="packet_item item_2">
                <div class="items">
                    <img src="../../assets/img_xiaozhongcha.jpg" />
                </div>
                <div class="items">
                    <img src="../../assets/img_yingji.jpg" />
                </div>
            </div>
        </div>
        <!-- 卖家招募 -->
        <div class="seller_wrapper">
            <div class="seller_pro_wrapper">
                <div class="seller_pro_item">
                    <div class="seller_pro_logo">
                        最新
                        <div>交易</div>
                    </div>
                    <div class="seller_pro">
                        <p>醉品朴茶】特色奇种系列 正山小醉品朴茶】特色奇种系列 正山小</p>
                        <span>18652.63元</span>
                    </div>
                </div>
            </div>
            <div class="seller_link">
                <div class="seller_link_logo">
                    <img src="../../assets/images/img_ruzhu.png" />
                </div>
                <div class="seller_link_text">
                    <p>入驻茶帮通，百万收入不是梦</p>
                    <p>茶帮通卖家火热招募中</p>
                </div>
            </div>
        </div>
        <!-- 分类 -->
        <div class="cat_wrapper">
            <div class="cat_top">
                <div class="cat_items">
                    <div class="cat_items_head">
                        <span>精选品类</span>
                        <span>更多</span>
                    </div>
                    <div class="cat_items_content">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                    </div>
                </div>
            </div>
            <div class="cat_bottom">
                <div class="cat_list">
                    <div class="cat_list_wrapper">
                        <span v-for="(cat,index) in catList" :key="index" :catid="cat.catId" :class="{on: catIndex == index}" @click="catIndex = index">{{ cat.catName }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 用户说 -->
        <div class="user_wrapper">
            <div class="user_item">
                <div class="user_item_logo">
                    用户<div>说</div>
                </div>
                <div class="user_item_right">
                    50000家店主的选择
                </div>
            </div>
        </div>
        <!-- 关键词 -->
        <div class="keyword_wrapper">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">Slide 1</div>
                    <div class="swiper-slide">Slide 2</div>
                    <div class="swiper-slide">Slide 3</div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
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
<script src="https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.2/js/swiper.min.js"></script>
<script>
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
</script>
<script>
import cbtDate from '../../components/datePicker.vue'
    export default {
        components: {
            cbtDate
        },
        data() {
            return {
                title: '123',
                catIndex: 0,
                catList: [
                    {
                        catId: 0,
                        catName: '精选'
                    },
                    {
                        catId: 27,
                        catName: '乌龙茶'
                    },
                    {
                        catId: 72,
                        catName: '红茶'
                    },
                    {
                        catId: 34,
                        catName: '绿茶'
                    },
                    {
                        catId: 40,
                        catName: '黑茶'
                    },
                    {
                        catId: 61,
                        catName: '黄茶'
                    },
                    {
                        catId: 108,
                        catName: '花茶'
                    }
                ]
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
