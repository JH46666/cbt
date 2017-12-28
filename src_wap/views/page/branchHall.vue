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
            this.$api.get('/oteao/admin/productCollection/getCollectionDetail',{
                'collection.id':3325
            },res=>{

                console.log(res);
            })
        }

    }
</script>

<style lang="less" scoped>
.branch-hall{
    .hall-banner{
        img{
            width: 100%;
        }
    }
}
</style>
<style>
</style>
