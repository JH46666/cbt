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
        <section class="sort-bar">
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
        </section>
        <!-- 商品列表 -->
        <section class="goods-list">
            <goods-item v-for="item in 20"></goods-item>
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
            }
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/search/index.less');
</style>