<template lang="html">
    <div class="activity">
        <div class="f5-2"></div>
        <div class="activity_name">
            <label for="activeName">111111</label>
            <input type="text" id="activeName" placeholder="输入2-15个汉字" maxlength="15" v-model="activeName" />
        </div>
        <div class="f5-2"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="less">
@import '~@/styles/activity/add.less';
</style>
