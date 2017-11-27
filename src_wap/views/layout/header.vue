<template>
    <mt-header :title="title" class="cbt-header">
        <mt-button icon="back" slot="left" @click="$router.go(-1)">返回</mt-button>
        <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
</template>

<script>
    export default {
        name: 'header',
        computed: {
            title() {
                return this.$store.state.seo.title
            }
        }
    }
</script>