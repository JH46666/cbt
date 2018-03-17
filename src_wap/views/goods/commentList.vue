<template>

</template>

<script>
import store from 'store';
import { mapState } from 'vuex'
    export default {
        data(){

        },
        created() {
            this.getCommentList('ZONGY0456-93')
        },
        methods: {
            // 获取评论列表
            getCommentList(extendId) {
                let pageSize = 10;
                let data ={
                    'eval.proExtId': extendId,
                    'page.pageNumber': this.page,
                    'page.pageSize': pageSize
                };
                return new Promise((resolve,reject) => {
                    this.$api.post('/oteao/evaluation/seachEvaluation',data,res => {
                        resolve(res);
                    },res=>{
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
        }
    }
</script>
