<template>
    <div class="branch-hall">
        <div class="hall-banner"><img src="../../assets/mzg.jpg" alt=""></div>
        <collection :myProducts="listData"></collection>
         <!-- 到底啦 -->
        <div class="bottom_wrapper">到底啦~</div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                listData:[]
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
                    break;
                case 'wap-smallcrowd':
                    this.$store.commit('SET_TITLE','小众茶');
                    break;
                case 'wap-poop':
                    this.$store.commit('SET_TITLE','品质尾货');
                    break;
                case 'wap-afir':
                    this.$store.commit('SET_TITLE','名枞馆集合');
                    break;
                case 'wap-newproduct':
                    this.$store.commit('SET_TITLE','新品馆集合');
                    break;
                default:
                    this.$store.commit('SET_TITLE','为您推荐');
                    break;
            }
            this.$api.get('/oteao/productCollection/getCollectionDetail',{
                'device': 'WAP',
                'sysId': 1,
                'collection.collectionNo': str
            },res=>{
                this.listData = res.data.proExtInfoVoList;
                console.log(res);
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

<style lang="less" scoped>
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
