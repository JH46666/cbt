<template>
    <div id="search">
        <section class="search-bar-wrapper">
            <search-bar v-model="text"></search-bar>
            <span class="cancel">取消</span>
        </section>
        <!-- 开始搜索时 -->
        <!-- <section class="hot-search">
            <div class="left">热搜</div>
            <div class="right">
                <div class="tag-wrap">
                    <router-link to="#" class="tag" tag="div">安溪铁观音</router-link>
                    <router-link to="#" class="tag" tag="div">安溪铁观音</router-link>
                    <router-link to="#" class="tag" tag="div">安溪铁观音</router-link>
                    <router-link to="#" class="tag" tag="div">安溪铁观音</router-link>
                </div>
            </div>
        </section>
        <section class="history-pannel">
            <div class="title"><h3>历史搜索</h3></div>
            <ul class="history-wrap">
                <div class="history-item">
                    大红袍
                </div>
                <div class="history-item">
                    大红袍
                </div>
                <div class="history-item">
                    大红袍
                </div>
                <div class="history-item">
                    大红袍
                </div>
                <div class="history-item">
                    大红袍
                </div>
            </ul>
            <div class="btn-wrap">
                <button>清空历史搜索</button>
            </div>
        </section> -->
        <!-- 搜索列表 -->
        <!-- <section class="sort-bar">
            <label class="sort-item" :class="{active:sortClass === 'count'}">
                销量
                <input type="radio" value="count" v-model="sortClass">
            </label>
            <label class="sort-item" :class="{active:sortClass === 'new'}">
                新品
                <input  type="radio" value="new" v-model="sortClass">
            </label>
            <label class="sort-item" :class="{active:sortClass === 'price'}" @click.self="editPriceSort">
                价格
                <input  type="radio" value="price" v-model="sortClass">
                <span class="sort-btn" :class="{top:sortClass === 'price' && priceSort,bottom:sortClass === 'price' && !priceSort}">
                    <i class="icon-shouqi"></i>
                    <i class="icon-zhankai"></i>
                </span>
            </label>
        </section> -->
        <!-- 商品列表 -->
        <!-- <section class="goods-list">
            <div 
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="noInfinity"
                infinite-scroll-distance="10"
            >
                <goods-item v-for="item in list" :key="item"></goods-item>
            </div>
            <div class="goods-loading" v-if="!noInfinity">
                <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                <span class="loading-text">正在努力加载中</span>
            </div>
            <div class="no-more" v-if="noInfinity">没有更多了呦</div>
        </section> -->
        <section class="no-search">
            <div class="sorry-img">
                <img src="../../assets/images/wusousoushuju.jpg" alt="">
            </div>
            <div class="sorry">
                抱歉，没有搜索到与<span class="gold">“不可秒速”</span>有关的商品
            </div>
            <p class="sorry-tip">
                请检查您的输入是否有误
            </p>
            <p class="sorry-tip">
                如果有任何意见或者建议，期待您反馈给我们
            </p>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: '',
                sortClass: 'count',
                priceSort: true,
                list: 5,
                noInfinity: false
            }
        },
        methods: {
            // 价格排序发生改变
            editPriceSort() {
                // 上一次的选项
                let to = this.sortClass;
                this.$nextTick(() =>{
                    let now = this.sortClass;
                    if(to !== now) {
                        this.priceSort = false;
                    } else {
                        this.priceSort = !this.priceSort;
                    }
                })
            },
            // 无限滚动
            loadMore() {
                if(this.list >= 100) return this.noInfinity = true;
                setTimeout(() => {
                    this.list += 5;
                    this.noInfinity = false;
                },300)
            }
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/search/index.less');
</style>