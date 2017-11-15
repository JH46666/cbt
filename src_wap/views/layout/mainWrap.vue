<template>
    <div id="container">
        <cbt-header v-if="!$tool.isWx()"></cbt-header>
        <router-view class="content"></router-view>
        <cbt-Footer></cbt-Footer>
    </div>
</template>

<script>
    import cbtHeader from './header.vue';
    import cbtFooter from './footer.vue'
    export default {
        components: {
            cbtHeader,
            cbtFooter
        }
    }
</script>