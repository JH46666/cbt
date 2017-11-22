<template>
    <div class="pay-type-pannel">
        <div class="pay-type-content">
            <div class="pannel-wrap">
                <div class="pannel">
                    <h3 class="title">支付方式</h3>
                    <div class="check-item online">
                        <div class="left"><i class="icon-zaixianzhifu"></i> 在线支付</div>
                        <div class="right">
                            <label :class="{checked:payType === 'online'}">
                                <input type="radio" value="online" v-model="payType">
                            </label>
                        </div>
                    </div>
                    <div class="check-item delivery">
                        <div class="left"><i class="icon-huodaofukuan"></i> 货到付款</div>
                        <div class="right">
                            <label :class="{checked:payType === 'delivery'}">
                                <input type="radio" value="delivery" v-model="payType">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="pannel">
                    <h3 class="title">配送快递</h3>
                    <div class="check-item">
                        <div class="left"><span class="icon"><img src="../../assets/images/stkd.png" alt=""></span> 申通快递</div>
                        <div class="right">
                            <label :class="{checked:express === 'shentong'}">
                                <input type="radio" value="shentong" v-model="express">
                            </label>
                        </div>
                    </div>
                    <div class="check-item">
                        <div class="left"><span class="icon"><img src="../../assets/images/sfkd.png" alt=""></span> 顺丰快递</div>
                        <div class="right">
                            <label :class="{checked:express === 'delivery'}">
                                <input type="radio" value="delivery" v-model="express">
                            </label>
                        </div>
                    </div>
                    <div class="check-item">
                        <div class="left"><span class="icon"><img src="../../assets/images/emskd.png" alt=""></span> EMS</div>
                        <div class="right">
                            <label :class="{checked:express === 'delivery'}">
                                <input type="radio" value="delivery" v-model="express">
                            </label>
                        </div>
                    </div>
                    <div class="indoor-wrap">
                        <div class="check-item delivery">
                            <div class="left"><i class="icon-jifenshangcheng"></i> 门店自提</div>
                            <div class="right">
                                <label :class="{checked:express === 'delivery'}">
                                    <input type="radio" value="delivery" v-model="express">
                                </label>
                            </div>
                        </div>
                        <p class="tips">请与门店联系确认存货量以及门店营业时间</p>
                        <p class="contack">提货地址：西安市新城区长乐路高德茶业茶帮通运营中心--联系电话：15959233223</p>
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <mt-button type="default" @click="confirm">确定</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                payType: 'online',
                express: 'shentong'
            }
        },
        methods: {
            confirm() {
                this.$emit('confirm')
            }
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/balance/index.less');
</style>