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
                <mt-swipe-item>
                    <img src="../../assets/banner_1.jpg" />
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="../../assets/banner_2.jpg" />
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="../../assets/banner_3.jpg" />
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="../../assets/banner_4.png" />
                </mt-swipe-item>
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
                    <div class="swiper-slide" v-for="(item,index) in userSay" :key="index">
                        <div class="user_img">
                            <img :src="item.imgUrl" />
                        </div>
                        <div class="user_shop">
                            <i class="iconfont">&#xe690;</i>
                            <p>{{ item.shopName }}</p>
                            <span>{{ item.shopType }}</span>
                        </div>
                        <div class="user_key_word">
                            {{ item.keyWord }}
                        </div>
                        <div class="user_content">
                            {{ item.content }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 为你推荐 -->
        <div class="suggest_wrapper">
            <div class="suggest_head">
                <div class="suggest_title">
                    <div class="suggest_logo">
                        为你<div>
                            推荐
                        </div>
                    </div>
                    <div class="suggest_right">
                        平台精选，用心推荐
                    </div>
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
                ],
                userSay: [
                    {
                        imgUrl: '//img0.oteao.com/WAPIMG/usersay/i_img_01.jpg',
                        shopType: '茶店',
                        shopName: '--黑龙江哈尔滨松北区某茶叶店',
                        keyWord: '0经营风险，无需围货',
                        content: '采购茶叶一直是我最为头疼的事情，我们小店是小本经营，采购量其实不大，导致很多茶厂茶企都不愿意小量批发给我们。但是茶帮通就很好，1斤都可以批发，卖多少进多少，不用囤货，而且价格也比市场上便宜，真正的物美价廉！'
                    },
                    {
                        imgUrl: '//img1.oteao.com/WAPIMG/usersay/i_img_01.jpg',
                        shopType: '茶馆',
                        shopName: '--福建省泉州某茶馆',
                        keyWord: '降低采购成本30~50%',
                        content: '以前买茶都要自己跑茶企茶厂，一次采购下来要三四天，费事有费力。自从用了茶帮通，平台上的茶叶资源应有尽有，一键采购，极大地节约了采购成本，而且多了很多时间可以陪家人！'
                    },
                    {
                        imgUrl: '//img2.oteao.com/WAPIMG/usersay/i_img_01.jpg',
                        shopType: '茶店',
                        shopName: '--厦门市思明区某茶叶店',
                        keyWord: '超长退换货期',
                        content: '我们买茶很怕买到以次充好的茶叶，而茶帮通很好地解决了这一点，平台上不仅汇聚了全国茶业资源，而且可以查看对方的信用认证，还有最高长达三个月的退换货周期，极大地保障了我们采购的利益！'
                    },
                    {
                        imgUrl: '//img3.oteao.com/WAPIMG/usersay/i_img_01.jpg',
                        shopType: '茶店',
                        shopName: '--深圳罗湖区某茶叶店',
                        keyWord: '覆盖名优品种90%',
                        content: '茶帮通对于我来说，最大的改变就是平台透明，茶叶产地、质量等全部都在明细中写得清清楚楚，供应商的资质等都可以查看，一点也不用担心买到质量不好的产品。'
                    },
                    {
                        imgUrl: '//img4.oteao.com/WAPIMG/usersay/i_img_01.jpg',
                        shopType: '茶企',
                        shopName: '--福建省某茶企',
                        keyWord: '最专业的垂直化B2B+O2O平台',
                        content: '做茶叶其实很累，靠的就是一颗喜欢茶的心。而“卖“茶更是劳心劳力，市场上各种真假难辨的分销商、茶铺总是好茶坏茶掺着卖，我不想自己辛苦做的茶卖给”黑心商人“，而茶帮通很好地帮我筛选分销商，让我能把好茶卖给好的客户！'
                    }
                ]
            }
        },
        created(){
            // 设置title
            this.$store.commit('SET_TITLE','茶帮通商城');
            this.$store.dispatch('getBlock','USER_SAY').then((res)=>{
                console.log(res);
            })
            if(location.href.indexOf('?wxpaycallback=') !== -1 ){
                // 表示微信支付回调
                // let src = location.href.split('?')[1].split('#')[0].split('=')[1];
                let src = location.href.split('?')[1].split('#')[0].split('%20');
                let payId = src[0].split('=')[1];
                location.replace(location.origin + `/#/balance/payview?payId=${payId}&wx=wxpaycallback&type=${src[1]}`);
            }
            console.log(JSON.stringify(this.userSay))
        },
        mounted() {
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 'auto',
                spaceBetween: 25,
                freeMode: true
            });
        }
    }
</script>

<style lang="less">
@import '~@/styles/index/index.less';
</style>
