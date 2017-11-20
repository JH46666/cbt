<template>
    <div id="editAddress">
        <label class="address-wrap error">
            <input type="text" placeholder="姓名">
            <p class="error-text">姓名不能为空</p>
        </label>
        <label class="address-wrap error">
            <input type="text" placeholder="手机号码">
            <p class="error-text">手机号码不能为空</p>
            <p class="error-text">手机号码格式不正确</p>
        </label>
        <label class="address-wrap error">
            <input type="text" placeholder="省份 城市 区县" readonly @click="showAddress">
            <p class="error-text">省市区县不能为空</p>
        </label>
        <label class="address-wrap error">
            <input type="text" placeholder="详细地址，如街道、门牌号等">
            <p class="error-text">详细地址不能为空</p>
        </label>
        <div class="default-address">
            <mt-switch v-model="defaultAddress"></mt-switch>
            <p>设为默认地址</p>
        </div>
        <div class="save-wrap">
            <mt-button type="default">保存</mt-button>
        </div>
        <transition name="fadeUp" mode="out-in">
            <selsect-address v-show="pannel"></selsect-address>
        </transition>
    </div>
</template>



<script>
    import selsectAddress from './addressPanel.vue'
    export default{
        components: {
            selsectAddress
        },
        data() {
            return {
                defaultAddress: true,
                pannel: true
            }
        },
        methods: {
            showAddress() {
                this.pannel = !this.pannel;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('~@/styles/center/editAddress.less');
</style>
<style>
    .mint-switch-input:checked + .mint-switch-core{
        border-color: #f08200;
        background-color: #f08200;
    }
</style>