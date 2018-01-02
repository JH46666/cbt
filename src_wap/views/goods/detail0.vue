<template>
    <div class="detail">
        <div class="detail_wrapper">
            <div class="banner">

            </div>
            <div class="center">
                <div class="center_wrapper">
                    <template v-if="proDetail.productExtInfo">
                        <p class="pro_text">{{ proDetail.productExtInfo.subTitle }}</p>
                        <p class="pro_one_price">￥{{ proDetail.productExtInfo.salesPrice | toFix2 }}</p>
                    </template>
                    <template v-if="proDetail.productPrice">
                        <p class="pro_two_price">建议零售价：￥{{ proDetail.productPrice[0].price | toFix2 }}</p>
                    </template>
                </div>
                <div class="rule">
                    <div class="rule_wrapper">
                        <div class="rule_item">
                            <span class="rule_logo">运费</span>
                            <template v-if="proDetail.productInfo.businessType == 'ORG_SALES'">
                                <span class="rule_text" v-if="!proDetail.orgFreightTemplateVoList || proDetail.orgFreightTemplateVoList.length == 0">本店商品全国包邮</span>
                                <span class="rule_text" v-else-if="proDetail.orgFreightTemplateVoList && proDetail.orgFreightTemplateVoList.length > 0">邮费依实际重量计算运费</span>
                            </template>
                            <template v-else>
                                <span class="rule_text">全场茶叶在线支付满500包邮</span>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="count">
                    <div class="count_wrapper">
                        <div class="count_label">采购量</div>
                        <div class="count_box">
                            <span>-</span>
                            <input type="number" v-model="counts" />
                            <span>+</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab">
                <div class="tab_wrapper">
                    <a href="#tab_1" class="on">详情</a>
                    <a href="#tab_2">规格</a>
                    <a href="#tab_3">评论</a>
                </div>
            </div>
            <div class="img_list" id="tab_1">
                
            </div>
        </div>
        <div class="detail_bottom">
            <!-- <div class="bottom_btn btn_1">
                <i class="iconfont icon-dianpu"></i>
                <span>店铺</span>
            </div> -->
            <div class="bottom_btn btn_1 on">
                <i class="iconfont icon-kefu1"></i>
                <span>客服</span>
            </div>
            <div class="bottom_btn btn_1">
                <i class="iconfont icon-chabangtongzhuanyongfenlei_gouwuche1"></i>
                <span>购物车</span>
            </div>
            <div class="bottom_btn btn_2">
                <mt-button type="default">加入购物车</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast,Indicator,MessageBox } from 'mint-ui'
import store from 'store';
import { mapState } from 'vuex'
export default {
    data() {
        return {
            proSku: null,
            proDetail: {
                productExtInfo: null,
                orgShopCenterVo: null,
                orgFreightTemplateVoList: null,
                integralPrice: null,
                productImgList: null,
                productInfo: null,
                productPrice: null,
            },
            counts: 1,
        }
    },
    computed:{
        ...mapState({
            cartTotal: state => state.cart.cartTotal
        })
    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','商品详情');
        // 获取购物车数量
        this.$store.dispatch('queryCartTotal');
        this.proSku = this.$route.query.proSku;
        this.getDetail().then((res)=>{
            this.proDetail = res.data;
        })
    },
    methods: {
        getDetail() {
            let data = {
                sysId: 1,
                device: 'WAP',
                productSku: this.proSku
            }
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/productInfo/getProExtInfo',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
    }
}
</script>

<style lang="less">
@import '~@/styles/less/detail0.less';
</style>
