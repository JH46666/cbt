<template>
    <div class="seller_wrapper">
        <div class="t_txt"><p class="color_9">恭喜您成功注册，请填写以下资料等待审核，审核后才可以询价和下单，如需帮助，请拨打 400-996-3399</p></div>
        <div class="seller_content">
            <div class="shop_info">
                <form>
                    <div class="form_item">
                        <div class="flex align_items_end">
                            <label for="">登录账号</label>
                            <p  class="flex-1">{{ member.phone }}</p>
                        </div>
                        <p  class="error_txt"></p>
                    </div>
                    <div class="form_item">
                        <div class="flex align_items_end">
                            <label for="">店铺名称</label>
                            <p  class="flex-1">{{ orgDTO.orgName }}</p>
                        </div>
                    </div>
                    <div class="form_item">
                        <div class="flex align_items_end">
                            <label for="">联系人</label>
                            <p  class="flex-1">{{ orgDTO.contactPerson }}</p>
                        </div>
                        <p  class="error_txt"></p>
                    </div>
                    <div class="form_item">
                        <div class="flex align_items_end">
                            <label for="">地区</label>
                            <p  class="flex-1">{{ orgDTO.provinceName }}/{{ orgDTO.cityName }}/{{ orgDTO.countyName }}</p>
                            <!-- <a href="javascript:void(0);"><i class="iconfont">&#xe619;</i></a> -->
                        </div>
                        <p  class="error_txt"></p>
                    </div>
                    <div class="form_item">
                        <div class="flex align_items_end">
                            <label for="">店铺地址</label>
                            <p  class="flex-1">{{ orgDTO.address }}</p>
                        </div>
                        <p class="error_txt"></p>
                    </div>
                </form>
                <div class="examine_img" v-if="imgFlag == 0"><img src="../../assets/images/examine.png" alt=""></div>
                <div class="examine_img" v-else><img src="../../assets/images/shbtg.png" alt=""></div>
            </div>
            <template v-if="$store.state.member.shop">
                <div class="shop_img">
                    <div class="uploaded_box">
                        <img class="shop" :src="orgDTO.facadePics" />
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="shop_img">
                    <div class="uploaded_box">
                        <img class="shop" :src="orgDTO.facadePics" />
                    </div>
                </div>
            </template>

            <mt-button size="large"  @click="$router.push({name: '茶帮通注册2',query: {edit: 'true'}})">修改资料</mt-button>
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
            // 拉取数据
            // this.getData();
            if(store.state.member.shop){
                if(store.state.member.shop.shopStatus == 1){
                    return this.imgFlag = 0;
                }
                if(store.state.member.shop.shopStatus == 3){
                    return this.imgFlag = 1;
                }
            }else{
                if(store.state.member.memberAccount.status == 'WAIT_AUDIT'){
                    return this.imgFlag = 0;
                }
                if(store.state.member.memberAccount.status == 'AUDIT_NO_PASS'){
                    return this.imgFlag = 1;
                }
            }
        },
        // 进来先判断登陆与否
        beforeRouteEnter(to, from, next) {
            if(!store.state.member.member.id) {
                store.dispatch('getMemberData').then((res) => {
                    next();
                }).catch(res => {
                    next(vm => vm.$router.push('/login'));
                })
            } else {
                next();
            }
        }

    }
</script>
<style lang="less">
    @import '~@/styles/regist/seller.less';
</style>
