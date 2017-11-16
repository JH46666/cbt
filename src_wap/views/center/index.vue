<template>
    <component :is="componentId" id="center"></component>
</template>


<script>
    import buyers from './buyers.vue';
    export default {
        computed: {
            componentId() {
                return buyers
            }
        }
    }
</script>