<template>
    <div class="news-list-wrap">
        <section class="big-news">
            <div class="hd">
                <img src="../../assets/images/p.gif" alt="">
                <div class="text-wrap">
                    <h4>2017-09-21 | 茶帮通</h4>
                </div>
            </div>
            <div class="bd">
                <div class="title">
                    很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                </div>
                <div class="detail">
                    很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                </div>
            </div>
        </section>
        <section class="news-list">
            <router-link tag="div" to="#" class="item" v-for="n in 10">
                <div class="left">
                    <div class="title">
                        很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                    </div>
                    <div class="date">
                        2017-12-31 19:00:00
                    </div>
                </div>
                <div class="right">
                    <img src="../../assets/images/p.gif"  v-lazy="item">
                </div>
            </router-link>
        </section>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                item: 'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg'
            }
        },
        created() {
            this.$store.commit('SET_TITLE','茶帮通头条');
        }
    }
</script>



<style lang="less">
    @import '~@/styles/news/index.less';
</style>