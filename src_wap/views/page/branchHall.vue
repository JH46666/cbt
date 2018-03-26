<template>
    <div class="branch-hall">
        <div class="hall-banner" v-html="bannerImg"></div>
        <collection :myProducts="listData"></collection>
         <!-- 到底啦 -->
        <div v-show="showTip" class="bottom_wrapper">没有更多了哟~</div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                listData:[],
                bannerImg: '',
                showTip: false,
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
                console.log(res.data.proExtInfoVoList)
                this.showTip = true;
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
    .product-price{
        margin-top: 0.29rem;
        overflow: hidden;
        }
    .detail_now_price{
    color:#f08200;
    line-height: 1;
    font-size: 0.4rem;
    margin-right: 0.1rem;
    display: inline-block;
}
.detail_suggest_price{
    color:#999;
    line-height: 1;
    font-size: 0.3rem;
    text-decoration: line-through;
    display: inline-block;
}
.off_shelf_tips{
            
            font-size: 0.3rem;
            margin-right: 0.1rem;
            font-size: 0.4rem;
            line-height: 0.34rem;
            letter-spacing: 0rem;
            color: #f08200;
            display: inline-block;
        }
    
}
</style>
<style>
</style>
