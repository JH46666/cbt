<template>
    <div id="edit-express">
        <h3 class="title">选择配送方式</h3>
        <section class="pick-pannel">
            <label class="pick-item" :class="{active:express === 'express'}">
                快递配送
                <input type="radio" value="express" class="hide" v-model="express">
            </label>
            <label class="pick-item" :class="{active:express === 'member'}">
                客户自提
                <input type="radio" value="member" class="hide" v-model="express">
            </label>
        </section>
        <section class="express-pannel">
            <label class="express-row">
                <span class="head">快递公司</span><input type="text" placeholder="请选择快递公司">
            </label>
            <label class="express-row">
                <span class="head">快递单号</span><input type="text" placeholder="请填写快递单号">
            </label>
        </section>
        <section class="btn-bar">
            <mt-button type="default" class="save">修改</mt-button>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                express: 'express'
            }
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/seller/editExpress.less');
</style>