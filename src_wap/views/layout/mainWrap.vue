<template>
    <div id="container">
        <cbt-header v-if="!$tool.isWx && $route.name !== '首页'"></cbt-header>
        <div class="content" :class="{'no-footer':$route.meta.hideFooter,'no_header': wxFlag}">
            <transition :name="model" mode="out-in">
                <router-view  class="content_inner"></router-view>
            </transition>
        </div>
        <cbt-Footer v-if="!$route.meta.hideFooter"></cbt-Footer>
    </div>
</template>

<script>
    import cbtHeader from './header.vue';
    import cbtFooter from './footer.vue'
    export default {
        components: {
            cbtHeader,
            cbtFooter
        },
        data() {
            return {
                model: 'fade',
            }
        },
        computed: {
            wxFlag() {
                return this.$tool.isWx || this.$route.name === '首页'
            }
        },
        // 判断动画效果
        beforeRouteUpdate  (to, from, next) {
            if(to.meta.transition !== undefined || from.meta.transition !== undefined) {
                this.model = to.meta.transition || from.meta.transition;
            } else {
                this.model ='fade';
            }
            next();
        },
        beforeRouteLeave (to, from, next) {
            if(to.meta.transition !== undefined || from.meta.transition !== undefined) {
                this.model = to.meta.transition || from.meta.transition;
            } else {
                this.model ='fade';
            }
            next();
        }
    }
</script>


