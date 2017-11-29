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
        <section class="express-pannel" v-if="express === 'express'">
            <label class="express-row">
                <span class="head">快递公司</span><input type="text" placeholder="请选择快递公司" v-model="myData.expressDeliveryName">
            </label>
            <label class="express-row">
                <span class="head">快递单号</span><input type="text" placeholder="请填写快递单号" v-model="myData.expressNo">
            </label>
        </section>
        <section class="btn-bar">
            <mt-button type="default" class="save" @click="save" :disabled="!disabled">修改</mt-button>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                express: 'express',
                myData: {}
            }
        },
        methods: {
            // 保存信息
            save() {
                let data = {
                    orderNo: this.myData.orderNo,
                    orderId: this.myData.orderId,
                    isDelivered: false
                }

                if(this.express === 'member') {
                    data.expressDeliveryCode = 'get_self'
                    data.expressDeliveryName = '客户自提'
                } else {
                    data.expressDeliveryCode = this.myData.expressDeliveryCode
                    data.expressDeliveryName = this.myData.expressDeliveryName
                    data.expressNo = this.myData.expressNo
                }

                this.$api.post('/oteao/order/updateExpressInfo',data,res => {
                    let toast = this.$toast('修改快递成功');
                    setTimeout(() =>{
                        toast.close()
                        this.$router.go(-1);
                    },500)
                })
            }
        },
        computed: {
            disabled() {
                return this.express === 'member' ? true : Boolean(this.myData.expressDeliveryName && this.myData.expressNo)
            }
        },
        created() {
            let orderNo = this.$route.query.orderNo;
            this.$api.post('/oteao/order/findOrderByNo',{
                orderNo,
                delYes: 0
            },res =>{
                this.myData = res.data || {};

                // 根据本来信息部署
                if(this.myData.expressDeliveryCode === 'get_self') {
                    this.express = 'member'
                } else {
                    this.express = 'express'
                }

            })
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/seller/editExpress.less');
</style>