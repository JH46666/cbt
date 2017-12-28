<template>
    <div class="block-wrap" v-html="content">

    </div>
</template>



<script>
    export default {
        data() {
            return {
                content: '',
            }
        },
        created() {
            this.$store.commit('SET_TITLE','静态页');
            try {
                this.$store.dispatch('getBlock',this.$route.query.blockNo).then(res => {
                    this.$store.commit('SET_TITLE',res.data.htmlName);
                    this.content = res.data.htmlText
                })
            } catch (error) {
                this.content = '';
            }
        }
    }
</script>