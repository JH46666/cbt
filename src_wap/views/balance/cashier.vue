<template>
    <div class="cashier_wrapper">
        <div class="flex cashier-caption">
            <p class="flex-1 color_6">应付</p>
            <p class="flex-1 algin_r color_f08">￥328.00</p>
        </div>
        <div class="floor1">
            <p class="remaining color_6">余额 <span class="color_9">￥400.00</span></p>
            <ul class="flex use_box">
                <li class="flex-1" @click="isUse = true" :class="{'on': isUse}">使用 ￥328.00</li>
                <li class="flex-1" @click="isUse = false" :class="{'on': !isUse}">不使用</li>
            </ul>
        </div>
        <div class="floor2">
            <mt-radio
                align="right"
                title="选择支付方式"
                v-model="payMethod"
                :options="options">
            </mt-radio>
        </div>
        <div class="floor3"><a class="confirm-pay" href="javscript:void(0);">确定支付 <span>￥328.00</span></a></div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                isUse: false,   //是否使用余额
                payMethod: '',  //支付方式
                options:[
                    {
                        label: '支付宝支付',
                        value: 'alipay'
                    },{
                        label: '微信支付',
                        value: 'wx'
                    }
                ]
            }
        },
        created(){

        },
        methods:{

        }
    }
</script>
<style lang="less">
    @import "~@/styles/balance/cashier.less";
</style>