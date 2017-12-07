<template>
    <div id="integral"
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="false"
    infinite-scroll-distance="10">
        <div class="hd">
            <div class="title">账户积分</div>
            <div class="integral-num">{{ member.totalIntegral }}</div>
        </div>
        <div class="bd">
            <div class="empty" v-if="list.length === 0">
                <img src="../../assets/images/nodata.png" alt="">
                <p class="tip">您没有任何积分记录哟~</p>
            </div>
            <div class="item-wrap" v-else>
                <div class="item" v-for="(item,i) in list">
                    <div class="left">{{ item.remark }}</div>
                    <div class="right">
                        <div class="count">{{ item.afterPoint > item.beforePoint ? '+' : '' }}{{ item.alterPoint }}</div>
                        <div class="date">{{ item.updateTime }}</div>
                    </div>
                </div>
                <div class="goods-loading" v-if="list.length < total">
                    <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                    <span class="loading-text">正在努力加载中</span>
                </div>
                <div class="no-more" v-if="list.length === total">没有更多了呦~</div>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                list: [],
                total: 0,
                pageNum: 1
            }
        },
        computed: {
            ...mapState({
                member: state => state.member.memberAccount,
                id: state => state.member.member.id
            }),
        },
        methods: {
            getData(page = 1) {
                return new Promise((resolve,reject) => {
                    this.$api.get('/member/integralRecord/search',{
                        'page.pageNumber': page,
                        'page.pageSize': 10,
                        'memberId': this.id,
                        'sysId': 1,
                        'searchTime': 'ALL_AGO'
                    },res => {
                        this.total = res.total_record
                        let data = this.list.concat(res.data.records || []);
                        this.list = data;
                        resolve(res)
                    })
                })
            },
            loadMore() {
                if(this.list.length < this.total) {
                    this.pageNum++
                    this.getData(this.pageNum).then(res => {
                        let data = res.data.record || [];
                        if(data < 10) {
                            this.pageNum--
                        }
                    })
                }
            }
        },
        created() {
            // 判断是否刷新导致会员信息丢失
            if(this.id === undefined) {
                this.$store.dispatch('getMemberData').then(res => {
                    this.getData();
                }).catch(res => {
                    if(res.code === 2000){
                        this.$toast('您还没有登陆呦~')
                        this.$router.push('/login')
                    }
                })
            } else {
                this.getData();
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('~@/styles/center/integral.less');
</style>