<template>
    <div id="container">
        <!-- <cbt-header v-if="!$tool.isWx && $route.name !== '首页'"></cbt-header> -->
        <layinner></layinner>
        <!-- <cbt-Footer></cbt-Footer> -->
    </div>
</template>
<script>
    import layinner from './layinner.vue';
    // import cbtHeader from '../layout/header.vue';
    // import cbtFooter from '../layout/footer.vue';
    import store from 'store';
    export default {
        name: 'layimdemo',
        components: {
            layinner,
            // cbtFooter,
            // cbtHeader
        },
        data() {
            return {

            }
        },
        created() {
            this.$store.commit('SET_TITLE', '我的消息');
        },
        // 判断会员状态
        beforeRouteEnter(to, from, next) {
            store.dispatch('getMemberData').then((res) => {
                next();
            }).catch(res => {
                next(vm => {
                    vm.$router.replace('/login');
                })
            });
        },
    }
</script>