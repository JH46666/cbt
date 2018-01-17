<template>
    <div class="news-list-wrap"
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="false"
    infinite-scroll-distance="10">
        <router-link tag="section" :to="{name:'新闻详情',query:{id: hotNews.id}}" class="big-news">
            <div class="hd">
                <img :src="getCover(hotNews.newsInfoImgs)">
                <div class="text-wrap">
                    <h4>{{ hotNews.createdTime | sliceDate }} | 茶帮通</h4>
                </div>
            </div>
            <div class="bd">
                <div class="title">
                    {{ hotNews.mainTitle }}
                </div>
                <div class="detail">
                    {{ hotNews.remark || sliceTag(hotNews.content) }}
                </div>
            </div>
        </router-link>
        <section class="news-list">
            <router-link tag="div" :to="{name:'新闻详情',query:{id: item.id}}" class="item" v-for="(item,i) in list" :key="i">
                <div class="left">
                    <div class="title">
                        {{ item.mainTitle}}
                    </div>
                    <div class="date">
                        {{ item.createdTime }}
                    </div>
                </div>
                <div class="right">
                    <img src="../../assets/images/p.gif"  v-lazy="getCover(item.newsInfoImgs)">
                </div>
            </router-link>
        </section>
        <div class="goods-loading" v-if="list.length + 1 < total">
            <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
            <span class="loading-text">正在努力加载中</span>
        </div>
        <div class="no-more" v-if="list.length + 1 === total">没有更多了呦~</div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                list: [],
                hotNews: {},
                total: 0,
                pageNum: 1,
                count: 0
            }
        },
        methods: {
            // 获取热讯
            // getHot() {
            //     this.$api.get('/oteao/newsInfo/getNewsInfoList',{
            //         'page.pageSize': 1,
            //         'page.pageNumber': 1,
            //         'newsTypeId': 402,
            //         'hotNewsTag': 1,
            //         'sysId': 1
            //     },res => {
            //         this.hotNews = res.data[0] || {};
            //     })
            // },
            // 获取新闻
            getData(page = 1) {
                this.count++;
                return new Promise((resolve,reject) => {
                    this.$api.get('/oteao/newsInfo/getNewsInfoList',{
                        'page.pageNumber': page,
                        'page.pageSize': 10,
                        'newsTypeId': 402,
                        // 'hotNewsTag': 0,
                        'sysId': 1,
                    },res => {
                        this.total = res.total_record
                        let data = this.list.concat(res.data || []);
                        if(this.count === 1) {
                            this.hotNews = data.splice(0,1)[0];
                        }
                        this.list = data;
                        resolve(res)
                    })
                })
            },
            // 无限滚动
            loadMore() {
                if(this.list.length < this.total) {
                    this.pageNum++
                    this.getData(this.pageNum).then(res => {
                        let data = res.data || [];
                        if(this.list.length === this.total) {
                            this.pageNum--
                        }
                    })
                }
            },
            // 获取封面图
            getCover(list) {
                if(list instanceof Array) {
                    return list.filter(val => val.type === 'COVER')[0] ? list.filter(val => val.type === 'COVER')[0].imgUrl : ''
                } else {
                    return '';
                }
            },
            // 去除标签
            sliceTag(str) {
                let div = document.createElement('div');
                div.innerHTML = str;
                return div.innerText.trim();
            }
        },
        created() {
            this.$store.commit('SET_TITLE','茶帮通头条');
            // this.getHot();
            this.getData();
        }
    }
</script>



<style lang="less">
    @import '~@/styles/news/index.less';
</style>