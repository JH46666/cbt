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
                <mt-swipe-item v-for="(item,index) in banner" :key="index" @click.native="golink(item)">
                    <img :src="item.imgUrl" />
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 四个馆 -->
        <div class="four_wrapper">
            <div class="four_bg"></div>
            <router-link class="four_item" :to="{ path: '/page/branchHall', query: { collectinNo: 'wap-newproduct' }}">
                <img src="../../assets/images/ic_xinpinguan.png" />
                <span>新品馆</span>
            </router-link>
            <router-link class="four_item" :to="{ path: '/page/branchHall', query: { collectinNo: 'wap-afir' }}">
                <img src="../../assets/images/ic_mingzhongguan.png" />
                <span>名枞馆</span>
            </router-link>
            <router-link  class="four_item" :to="{ path: '/center/brandVenue', query: { collectinNo: 'wap-afir' }}">
                <img src="../../assets/images/ic_pinpaiguan.png" />
                <span>品牌馆</span>
            </router-link>
            <router-link  class="four_item" :to="{ path: '/page/branchHall', query: { collectinNo: 'wap-poop' }}">
                <img src="../../assets/images/ic_weihuo.png" />
                <span>品质尾货</span>
            </router-link>
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
                <router-link class="items" v-html="samllHall" :to="{ path: '/page/branchHall', query: { collectinNo: 'wap-smallcrowd' }}" tag='div'>
                    <!-- <div></div> -->
                </router-link>
                <router-link class="items" v-html="goodHall" :to="{ path: '/page/branchHall', query: { collectinNo: 'wap-seasonal' }}" tag='div'>
                    <!-- <div></div> -->
                </router-link>
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
                        <span @click="$router.push({name: '分类',query: {parent: catId}})">更多</span>
                    </div>
                    <div class="cat_items_content">
                        <span v-for="(item,index) in childCat" :key="item.id" @click="$router.push({name: '分类',query: {parent: item.parent,child: item.id}})">
                            <img :src="item.imgUrl" />
                            <i>{{ item.name }}</i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="cat_bottom">
                <div class="cat_list">
                    <div class="cat_list_wrapper">
                        <span v-for="(cat,index) in catList" :key="index" :catid="cat.catId" :class="{on: catIndex == index}" @click="selectCat(cat,index)">{{ cat.catName }}</span>
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
                <collection :myProducts="listData"></collection>
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
                listData:[],
                catIndex: 0,
                catList: [],
                userSay: [],
                childCat: [],
                catId: 26,
                banner: [],
                samllHall: '',
                goodHall: '',
            }
        },
        methods: {
            selectCat(item,index) {
                this.catIndex = index;
                this.catId = item.catId;
                this.childCat = item.chidren;
            },
            golink(item) {
                if(item.link.length>0){
                    if(item.flag){
                        this.$router.push({
                            name: '商品详情',
                            query: {
                                proSku: item.link
                            }
                        })
                    }else{
                        console.log('活动！！！！');
                    }
                }
            }
        },
        created(){
            // 设置title
            this.$store.commit('SET_TITLE','茶帮通商城');
            this.$store.dispatch('getBlock','WAP_CAT').then((res)=>{
                this.catList = JSON.parse(res.data.htmlText);
                this.childCat = this.catList[0].chidren;
            })
            this.$store.dispatch('getBlock','WAP_BANNER').then((res)=>{
                this.banner = JSON.parse(res.data.htmlText);
            })
            this.$store.dispatch('getBlock','WAP_SAMLL').then((res)=>{
                this.samllHall = JSON.parse(res.data.htmlText);
            })
            this.$store.dispatch('getBlock','WAP_GOOD').then((res)=>{
                this.goodHall = JSON.parse(res.data.htmlText);
            })
            this.$store.dispatch('getBlock','USER_SAY').then((res)=>{
                this.userSay= JSON.parse(res.data.htmlText);
                this.$nextTick(()=>{
                    var swiper = new Swiper('.swiper-container', {
                        slidesPerView: 'auto',
                        spaceBetween: 25,
                        freeMode: true,
                        centeredSlides: true
                    });
                    swiper.slideTo(2, 200, false);
                })
            })
            if(location.href.indexOf('?wxpaycallback=') !== -1 ){
                // 表示微信支付回调
                // let src = location.href.split('?')[1].split('#')[0].split('=')[1];
                let src = location.href.split('?')[1].split('#')[0].split('%20');
                let payId = src[0].split('=')[1];
                location.replace(location.origin + `/#/balance/payview?payId=${payId}&wx=wxpaycallback&type=${src[1]}`);
            }
            //获取为您推荐集合
            this.$api.get('/oteao/productCollection/getCollectionDetail',{
                'device': 'WAP',
                'sysId': 1,
                'collection.collectionNo': 'wap_hometuijian'
            },res=>{
                this.listData = res.data.proExtInfoVoList;
            })
        },
        mounted() {

        }
    }
</script>

<style lang="less">
@import '~@/styles/index/index.less';
</style>
