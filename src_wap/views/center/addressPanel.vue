<template>
    <div class="address-pannel">
        <div class="select-address">
            <div class="select-top">
                <div class="left">
                    <mt-navbar v-model="selected">
                        <mt-tab-item id="1">省份</mt-tab-item>
                        <mt-tab-item id="2">城市</mt-tab-item>
                        <mt-tab-item id="3">区县</mt-tab-item>
                    </mt-navbar>
                </div>
                <div class="right">
                    <span @touchend="confirm">确定</span>
                </div>
            </div>
            <div class="select-bottom">
                <mt-tab-container v-model="selected" :swipeable="true">
                    <mt-tab-container-item id="1">
                        123
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        456
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        789
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'addressPannel',
        data() {
            return {
                selected: '1'
            }
        },
        methods: {
            confirm() {
                alert(1)
            }
        }
    }    
</script>




<style lang="less" scoped>
    @import url('~@/styles/center/editAddress.less');
</style>