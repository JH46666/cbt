<template>
    <div class="seller_wrapper">
        <div class="t_txt" v-if="imgFlag == 0"><p class="color_9">恭喜您成功注册，请填写以下资料等待审核，审核后才可以询价和下单，如需帮助，请拨打 400-996-3399</p></div>
        <div class="t_txt red" v-else>
            <p class="color_9" :class="{on: !flhdh}">审核不通过，{{ remark }}，如需帮助请拨打400-996-3399</p>
            <i class="iconfont icon-single-down" @click="clickPr" v-if="flhdh"></i>
            <i class="iconfont icon-shang" @click="clickPr" v-else></i>
        </div>
        <div class="seller_content">
            <div class="shop_info">
                <form>
                    <div class="form_item">
                        <div class="flex align_items_end">
                            <label for="">企业名称</label>
                            <p  class="flex-1">{{ orgDTO.orgName }}</p>
                        </div>
                    </div>
                    <div class="form_item">
                        <div class="flex align_items_end">
                            <label for="">注册类型</label>
                            <p  class="flex-1">卖家({{ sellerType[$store.state.member.shop.shopType-1] }})</p>
                        </div>
                        <p  class="error_txt"></p>
                    </div>
                    <div class="form_item">
                        <div class="flex align_items_end">
                            <label for="">服务电话</label>
                            <p  class="flex-1">{{ myData.businessTelephone }}</p>
                        </div>
                        <p class="error_txt"></p>
                    </div>
                    <div class="form_item">
                        <div class="flex align_items_end">
                            <label for="">支付宝</label>
                            <p  class="flex-1">{{ myData.alipayAccount }}</p>
                        </div>
                        <p class="error_txt"></p>
                    </div>
                </form>
                <div class="examine_img" v-if="imgFlag == 0"><img src="../../assets/images/examine.png" alt=""></div>
                <div class="examine_img" v-else><img src="../../assets/images/shbtg.png" alt=""></div>
            </div>
            <template>
                <div class="shop_img shop_img_2" v-if="$store.state.member.shop.shopType == 1">
                    <template v-if="$store.state.member.shop.businessLicensePic && $store.state.member.shop.produceLicensePic">
                        <div class="uploaded_box_2">
                            <img class="shop" :src="$store.state.member.shop.businessLicensePic" />
                        </div>
                        <div class="uploaded_box_2">
                            <img class="shop" :src="$store.state.member.shop.produceLicensePic" />
                        </div>
                    </template>
                    <template v-else>
                        <div class="uploaded_box">
                            <img class="shop" :src="$store.state.member.shop.businessLicensePic" />
                        </div>
                    </template>
                </div>
                <div class="shop_img shop_img_2" v-if="$store.state.member.shop.shopType == 2">
                    <template v-if="$store.state.member.shop.businessLicensePic && $store.state.member.shop.qsLicensePic">
                        <div class="uploaded_box_2">
                            <img class="shop" :src="$store.state.member.shop.businessLicensePic" />
                        </div>
                        <div class="uploaded_box_2">
                            <img class="shop" :src="$store.state.member.shop.qsLicensePic" />
                        </div>
                    </template>
                    <template v-else>
                        <div class="uploaded_box">
                            <img class="shop" :src="$store.state.member.shop.businessLicensePic" />
                        </div>
                    </template>
                </div>
                <div class="shop_img" v-if="$store.state.member.shop.shopType == 3 || $store.state.member.shop.shopType == 4">
                    <div class="uploaded_box">
                        <img class="shop" :src="$store.state.member.shop.businessLicensePic" />
                    </div>
                </div>
            </template>
            <mt-button size="large"  @click="goEdit">修改资料</mt-button>
            <div class="go_index"><a href="javascript:void(0);" @click="$router.push('/')">去首页</a></div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import store from 'store';
    export default {
        data(){
            return {
               edit: false,
               myData: {},
               imgFlag: 0,
               sellerType: ['茶厂','合作社','茶企','批发商'],
               flag: '',
               remark: '',
               flhdh: true,
            }
        },
        computed: {
            ...mapState({
                member: state => state.member.member,
                memberAccount: state => state.member.memberAccount,
                orgDTO: state => state.member.orgDTO,
                shop: state => state.member.shop,
                thirdAccount: state => state.member.thirdAccount,
            })
        },
        methods: {
            clickPr() {
                this.flhdh = !this.flhdh;
            },
            goEdit() {
                this.$router.push({
                    name: '茶帮通注册6'
                })
            },
            // 获取数据
            getData() {
                this.$api.post('/orgShop/getOrgShop',{
                    orgId: this.orgDTO.orgID,
                    sysId: 1
                },res => {
                    this.myData = res.data;
                })
            }
        },
        created(){
            // 设置title
            this.$store.commit('SET_TITLE','茶帮通注册');
            try {
                this.remark = store.state.member.auditRecord.remark;
            } catch (e) {

            }
            // 拉取数据
            if(store.state.member.shop){
                this.getData();
            }
            if(store.state.member.shop.shopStatus == 1){
                return this.imgFlag = 0;
            }
            if(store.state.member.shop.shopStatus == 3){
                return this.imgFlag = 1;
            }
        },
        // 进来先判断登陆与否
        beforeRouteEnter(to, from, next) {
            store.dispatch('getMemberData').then((res) => {
                next();
            }).catch(res => {
                next(vm => vm.$router.push('/login'));
            })
        }

    }
</script>
<style lang="less">
    @import '~@/styles/regist/seller.less';
</style>
