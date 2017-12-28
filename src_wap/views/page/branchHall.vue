<template>
    <div class="branch-hall">
        <div class="hall-banner"><img src="../../../wap/static/img/mzg.jpg" alt=""></div>
        <collection :myProducts="listData"></collection>
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
            let str = 'wap_hometuijian';
            this.$api.get('/oteao/productCollection/getCollectionDetail',{
                'device': 'WAP',
                'sysId': 1,
                'collection.collectionNo': str
            },res=>{
                this.listData = res.data.productCollection.products;
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
}
</style>
<style>
</style>
