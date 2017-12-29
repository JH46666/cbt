<template>
    <div class="branch-hall">
        <div class="hall-banner" v-html="bannerImg"></div>
        <collection :myProducts="listData"></collection>
         <!-- 到底啦 -->
        <div class="bottom_wrapper">到底啦~</div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                listData:[],
                bannerImg: ''
            }
        },
        computed: {
        },
        watch: {
        },
        methods: {
        },
        created() {
            let str = this.$route.query.collectinNo;
            switch (this.$route.query.collectinNo) {
                case 'wap-seasonal':
                    this.$store.commit('SET_TITLE','应季好茶');
                    this.$store.dispatch('getBlock','wap-seasonal').then(res => {
                        if(res.data.htmlText.trim() != ''){
                            this.bannerImg = res.data.htmlText;
                        }else{
                            this.bannerImg = '<img src="//img0.oteao.com/hallBanner/yjhc.jpg" alt="">';
                        }
                    });
                    break;
                case 'wap-smallcrowd':
                    this.$store.commit('SET_TITLE','小众茶');
                    this.$store.dispatch('getBlock','wap-smallcrowd').then(res => {
                        if(res.data.htmlText.trim() != ''){
                            this.bannerImg = res.data.htmlText;
                        }else{
                            this.bannerImg = '<img src="//img0.oteao.com/hallBanner/xzg.jpg" alt="">';
                        }
                    });
                    break;
                case 'wap-poop':
                    this.$store.commit('SET_TITLE','品质尾货');
                    this.$store.dispatch('getBlock','wap-poop').then(res => {
                        if(res.data.htmlText.trim() != ''){
                            this.bannerImg = res.data.htmlText;
                        }else{
                            this.bannerImg = '<img src="//img0.oteao.com/hallBanner/pzwh.jpg" alt="">';
                        }
                    });
                    break;
                case 'wap-afir':
                    this.$store.commit('SET_TITLE','名枞馆');
                    this.$store.dispatch('getBlock','wap-afir').then(res => {
                        if(res.data.htmlText.trim() != ''){
                            this.bannerImg = res.data.htmlText;
                        }else{
                            this.bannerImg = '<img src="//img0.oteao.com/hallBanner/mzg.jpg" alt="">';
                        }
                    });
                    break;
                case 'wap-newproduct':
                    this.$store.commit('SET_TITLE','新品馆');
                    this.$store.dispatch('getBlock','wap-newproduct').then(res => {
                        if(res.data.htmlText.trim() != ''){
                            this.bannerImg = res.data.htmlText;
                        }else{
                            this.bannerImg = '<img src="//img0.oteao.com/hallBanner/xpg.jpg" alt="">';
                        }
                    });
                    break;
                default:
                    break;
            }
            this.$api.get('/oteao/productCollection/getCollectionDetail',{
                'device': 'WAP',
                'sysId': 1,
                'collection.collectionNo': str
            },res=>{
                this.listData = res.data.proExtInfoVoList;
            },res=>{
                return this.$messageBox({
                    title:'提示',
                    message:res.errorMsg,
                    confirmButtonText: '我知道了'
                })
            })
        }

    }
</script>

<style lang="less">
.branch-hall{
    .hall-banner{
        img{
            width: 100%;
            display: block;
        }
    }
    .bottom_wrapper {
        width: 100%;
        height: .8rem;
        background-color: #f5f5f5;
        color: #adadad;
        text-align: center;
        line-height: 0.8rem;
    }
}
</style>
<style>
</style>
