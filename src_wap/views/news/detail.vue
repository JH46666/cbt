<template>
    <div class="news-detail">
        <section class="title">
            {{ myData.mainTitle }}
        </section>
        <section class="date">
            {{ myData.createdTime | sliceDate  }} | 茶帮通
        </section>
        <section class="detail-content" v-html="myData.content">

        </section>
    </div>
</template>


<script>

    export default {
        data() {
            return {
                myData: {}
            }
        },
        created() {
            this.$store.commit('SET_TITLE','茶帮通新闻详情');
            this.$api.get('/oteao/newsInfo/findNewsInfoDetail',{
                sysId: 1,
                id: this.$route.query.id,
                isIncreaseRealNum: 1
            },res => {
                this.myData = res.data;
            })
        }
    }

</script>


<style lang="less">
    @import '~@/styles/news/detail.less';
</style>