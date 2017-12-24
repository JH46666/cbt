<template>
    <div id="sendGoods">
        <div class="send-wrap">
            <div class="address">
                <div class="left"><i class="icon-dizhi"></i></div>
                <div class="center">
                    <p class="user">{{ myData.receiptName }} &nbsp;&nbsp; {{ myData.receiptPhone }}</p>
                    <p>{{ myData.detailAddress }}</p>
                </div>
                <!-- <div class="right"><i class="icon-icon07"></i></div> -->
            </div>
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
            <h3 class="title">需发货商品</h3>
            <div class="goods-item" v-for="(item,index) in list">
                <goods-img style="width:1.6rem;height:1.6rem;" :imgUrl="item.imageUrl || '/'"></goods-img>
                <div class="right">
                    <p class="goods-title">{{ item.productName }}</p>
                    <p class="goods-bd">
                        <span class="price">￥{{ item.productPrice }}</span>
                        <span class="num">×{{ item.productNum }}</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="btn-bar">
            <mt-button type="default" @click="save" :disabled="!disabled">确定发货</mt-button>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                express: 'express',
                myData: {},
                list: []
            }
        },
        computed: {
            disabled() {
                return this.express === 'member' ? true : Boolean(this.myData.expressDeliveryName && this.myData.expressNo)
            }
        },
        methods: {
            // 保存信息
            save() {
                let data = {
                    orderNo: this.myData.orderNo,
                    orderId: this.myData.orderId,
                    isDelivered: true
                }

                if(this.express === 'member') {
                    data.expressDeliveryCode = 'get_self'
                    data.expressDeliveryName = '客户自提'
                } else {
                    data.expressDeliveryCode = 'ship_sto'
                    data.expressDeliveryName = this.myData.expressDeliveryName
                    data.expressNo = this.myData.expressNo
                }

                this.$api.post('/oteao/order/updateExpressInfo',data,res => {
                    let toast = this.$toast('己成功发货');
                    setTimeout(() =>{
                        toast.close()
                        this.$router.go(-1);
                    },500)
                })
            }
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','商品发货');
               
            let orderNo = this.$route.query.orderNo;
            this.$api.post('/oteao/order/findSellerOrderByNo',{
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
                this.$api.post('/oteao/order/preSellerOrderList',{orderId: this.myData.orderId,device: 'WAP'},res => {
                    this.list = res.data.mainOrder.products
                })
            })
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/seller/sendGoods.less');
</style>