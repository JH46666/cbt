<template>
    <div class="index" @scroll="scrollTopMethod" ref="box">
        <!-- 搜索框 -->
        <div class="search_wrapper">
            <div class="search_item">
                <div class="logo">
                    <img src="../../assets/images/index_logo.png" />
                </div>
                <div class="search_text_wrapper">
                    <input type="text" readonly placeholder="搜索您喜欢的好茶！" @click="$router.push({name: '搜索'})" />
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
            <div class="news_item clearfix">
                <div class="news_item_left">
                    茶帮通
                    <div class="news_logo">头条</div>
                </div>
                <div class="news_item_right" @click="$router.push({name: '新闻列表'})">
                    <div class="swiper-container-2">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in newsList" :key="index">
                                {{ item.remark || sliceTag(item.content) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 红包茶叶 -->
        <div class="packet_wrapper">
            <div class="packet_item item_1" @click="$router.push({name: '红包馆'})" v-html="packetEnter"></div>
            <div class="packet_item item_2">
                <router-link class="items" v-html="samllHall" :to="{ path: '/page/branchHall', query: { collectinNo: 'wap-smallcrowd' }}" tag='div'>
                </router-link>
                <router-link class="items" v-html="goodHall" :to="{ path: '/page/branchHall', query: { collectinNo: 'wap-seasonal' }}" tag='div'>
                </router-link>
            </div>
        </div>
        <!-- 卖家招募 -->
        <div class="seller_wrapper">
            <div class="seller_pro_wrapper">
                <div class="seller_pro_item clearfix">
                    <div class="seller_pro_logo">
                        最新
                        <div>交易</div>
                    </div>
                    <div class="seller_pro">
                        <div class="swiper-container-3">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(item,index) in onePro" :key="index">
                                    <div class="pro_box">
                                        <p>{{ item.proName }}</p>
                                        <span>{{ item.totalPrice | toFix2 }}元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seller_link clearfix" v-html="recruit" @click="iSeller"></div>
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
            <div class="swiper-container-1">
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
                <div class="suggest_item" v-for="(item,index) in listData" :key="index" @click="$router.push({name: '商品详情',query:{proSku: item.proSku}})">
                    <div class="sugget_img"><img :src="item.proImg" /></div>
                    <p class="suggest_text">{{ item.proName }}</p>
                    <div class="product-price">
                        <template  v-if="!$tool.isLogin()">
                            <div class="off_shelf_tips">
                                ￥{{item.hidePriceGroups}}
                            </div>
                            <div class="detail_suggest_price">￥{{ item.marketPrice | toFix2 }}</div>
                        </template>
                        <template v-else>
                            <div class="detail_now_price">
                                ￥{{item.priceGroups | toFix2  }}
                            </div>
                            <div class="detail_suggest_price">￥{{ item.marketPrice | toFix2 }}</div>
                        </template>
                    </div>
                    <!-- <p class="seggest_resaon">{{ item.subTitle }}</p>
                    <div class="suggest_type">
                        <span v-if="!$tool.isLogin()">询价</span>
                        <span v-else>￥{{ item.priceGroups | toFix2 }}</span>
                        <span v-if="item.businessType === 'SELF_SALES'">自营</span>
                        <span :class="{'on':item.tagNum <= 4}">{{ sellerType[item.tagNum-1] }}</span>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- 到底啦 -->
        <div class="bottom_wrapper">到底啦~</div>
        <!-- 返回顶部 -->
        <div class="top_wrapper" @click="topMethod" :class="{on: topFlag}"></div>
    </div>
</template>

<script>
import store from 'store';
import { mapState } from 'vuex'
    export default {
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
                recruit: '',
                newsList: [],
                onePro: [],
                packetEnter: '',
                topFlag: false,
                sellerType: ['茶厂','合作社','茶企','批发商','自营','自营'],
            }
        },
        methods: {
            // 去除标签
            sliceTag(str) {
                let div = document.createElement('div');
                div.innerHTML = str;
                return div.innerText.trim();
            },
            selectCat(item,index) {
                this.catIndex = index;
                this.catId = item.catId;
                this.childCat = item.chidren;
            },
            golink(item) {
                if(item.link.length>0){
                  this.$router.push(item.link)
                    // if(item.flag){
                    //     this.$router.push({
                    //         name: '商品详情',
                    //         query: {
                    //             proSku: item.link
                    //         }
                    //     })
                    // }else{
                    //     console.log('活动！！！！');
                    // }
                }
            },
            getHot() {
                let data = {
                    'page.pageSize': 3,
                    'page.pageNumber': 1,
                    'hotNewsTag': 1,
                    'sysId': 1
                };
                return new Promise((resolve,reject) => {
                    this.$api.get('/oteao/newsInfo/getNewsInfoList',data,res => {
                        resolve(res);
                    },res=>{
                        return this.$toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            scrollTopMethod() {
                let scrollTop = this.$refs.box.scrollTop,
                    scrollHeight = this.$refs.box.offsetHeight;
                if(scrollTop-scrollHeight>0){
                    this.topFlag = true;
                }else{
                    this.topFlag = false;
                }
            },
            topMethod() {               // 滚动到顶部
                this.$refs.box.scrollTop = 0;
            },
            getPro() {
                let data = {
                    'minPrice': 50,
                    'count': 50,
                    'sysId': 1
                };
                return new Promise((resolve,reject) => {
                    this.$api.get('/oteao/productExtInfo/findRandomProduct',data,res => {
                        resolve(res);
                    },res=>{
                        return this.$toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            iSeller() {
                store.dispatch('getMemberData').then(()=>{
                    let memberStatus = store.state.member.memberAccount.status;
                    if(memberStatus === 'FREEZE'){
                        return this.$messageBox({
                            title:'提示',
                            message:`您的账号因违规操作而被冻结~若有疑问，请联系客服400-996-3399`,
                            confirmButtonText: '我知道了'
                        }).then(res => {
                            this.$api.get('/oteao/login/logout',{},res => {
                                this.$router.push('/login');
                                store.commit('SET_MEMBERDATA',{type:'member',val:{}})
                            },res => {
                                this.$router.push('/login')
                                store.commit('SET_MEMBERDATA',{type:'member',val:{}})
                            })
                        })
                    }
                    if(memberStatus === 'INACTIVE'){
                        return this.$router.push({name: '茶帮通注册2'});
                    }
                    if(!store.state.member.member.id){
                        return this.$router.push({name: '茶帮通注册1'});
                    }else{
                       if(memberStatus === 'ACTIVE' && !store.state.member.shop){
                           return this.$router.push({name: '卖家招募'});
                       }
                       if(store.state.member.shop){
                           let status = store.state.member.shop.shopStatus;
                           if(memberStatus === 'ACTIVE' && status != 2 && status != -2){
                                return this.$router.push({name: '茶帮通注册7'});
                           }
                           if(status == 2){
                               return this.$toast(`您己经是卖家了，不用再申请了哟~`)
                           }
                           if(status == -2){
                               return this.$messageBox({
                                   title:'提示',
                                   message:`您的卖家身份因违规操作而被冻结~若有疑问，请联系客服400-996-3399`,
                                   confirmButtonText: '我知道了'
                               }).then(res => {
                                    console.log(`cancel!`);
                               })
                           }
                           if((memberStatus != 'ACTIVE' && memberStatus != 'FREEZE') || (status != 2 && status != -2)){
                               return this.$router.push({name: '茶帮通注册3'});
                           }
                       }else{
                           if(memberStatus != 'ACTIVE' && memberStatus != 'FREEZE'){
                               return this.$router.push({name: '茶帮通注册3'});
                           }
                           return this.$router.push({name: '卖家招募'});
                       }
                    }
                    return;
                }).catch((res)=>{
                    return this.$router.push({name: '茶帮通注册1'});
                })
            }
        },
        created(){
            // 设置title
            store.commit('SET_TITLE','茶帮通商城');
            store.dispatch('getBlock','WAP_CAT').then((res)=>{
                this.catList = JSON.parse(res.data.htmlText);
                this.childCat = this.catList[0].chidren;
            })
            store.dispatch('getBlock','WAP_BANNER').then((res)=>{
                this.banner = JSON.parse(res.data.htmlText);
            })
            store.dispatch('getBlock','WAP_SELLER').then((res)=>{
                this.recruit = res.data.htmlText;
            })
            store.dispatch('getBlock','WAP_SAMLL').then((res)=>{
                this.samllHall = res.data.htmlText;
            })
            store.dispatch('getBlock','WAP_GOOD').then((res)=>{
                this.goodHall = res.data.htmlText;
            })
            store.dispatch('getBlock','WAP_PACKET_ENTER').then((res)=>{
                this.packetEnter = res.data.htmlText;
            })
            store.dispatch('getBlock','USER_SAY').then((res)=>{
                this.userSay= JSON.parse(res.data.htmlText);
                this.$nextTick(()=>{
                    var swiper = new Swiper('.swiper-container-1', {
                        slidesPerView: 'auto',
                        spaceBetween: 25,
                        // freeMode: true,
                        centeredSlides: true
                    });
                    swiper.slideTo(1, 200, false);
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
            this.getHot().then((res)=>{
                this.newsList = res.data;
                this.$nextTick(()=>{
                    var swiper2 = new Swiper('.swiper-container-2', {
                        direction: 'vertical',
                        autoplay: true,
                        loop: true
                    });
                })
            })
            this.getPro().then((res)=>{
                this.onePro = res.data;
                this.$nextTick(()=>{
                    var swiper3 = new Swiper('.swiper-container-3', {
                        direction: 'vertical',
                        autoplay: true,
                        loop: true
                    });
                })
            })
        },
        beforeRouteEnter(to, from, next) {
            if(!store.state.member.member.id) {
                store.dispatch('getMemberData').then((res) => {
                    next();
                }).catch(res => {
                    next();
                })
            } else {
                next();
            }
        }
    }
</script>

<style lang="less">
@import '~@/styles/index/index.less';
</style>
