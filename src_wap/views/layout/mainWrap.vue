<template>
    <div id="container">
        <cbt-header v-if="!$tool.isWx()"></cbt-header>
		<transition :name="model" mode="out-in">
            <router-view class="content" :class="{'no-footer':$route.meta.hideFooter}"></router-view>
		</transition>
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
                model: 'move'
            }
        },
        // 判断动画效果
        beforeRouteUpdate  (to, from, next) {
            if(to.meta.transition !== undefined || from.meta.transition !== undefined) {
                this.model = to.meta.transition || from.meta.transition;
            } else {
                this.model ='move';
            }
            next();
        },
        beforeRouteLeave (to, from, next) {
            if(to.meta.transition !== undefined || from.meta.transition !== undefined) {
                this.model = to.meta.transition || from.meta.transition;
            } else {
                this.model ='move';
            }
            next();
        }
    }
</script>