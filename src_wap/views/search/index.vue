<template>
    <div id="search">
        <section class="search-bar-wrapper">
            <search-bar v-model="text"></search-bar>
            <span class="cancel">取消</span>
        </section>
        <section class="hot-search">
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
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: ''
            }
        },
        methods: {
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/search/index.less');
</style>