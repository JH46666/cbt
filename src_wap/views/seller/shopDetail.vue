<template>
    <div class="shop-detail">
        <div class="hd">
            <div class="shop-img" @click="bigImg = true">
                <img :src="myData.businessLicensePic" alt="">
            </div>
            <div class="detai-row">
                <h4>单位名称</h4>
                <p>{{ myData.shopName }}</p>
            </div>
            <div class="detai-row">
                <h4>详细地址</h4>
                <p>{{ myData.address }}</p>
            </div>
        </div>
        <div class="bd">
            <div class="type-row">
                <div class="left">类型</div>
                <div class="center"><span class="tag">{{ businessName[myData.shopType - 1] }}</span></div>
            </div>
            <div class="type-row">
                <div class="left">信誉</div>
                <div class="center"><span class="level" :class="level" v-for="n in $tool.levelNum(myData.growth)"></span></div>
            </div>
            <div class="type-row">
                <div class="left">联系人</div>
                <div class="center">{{ myData.contactor }}</div>
            </div>
            <div class="type-row" @click="showDialog('tel')">
                <div class="left">服务电话</div>
                <div class="center">{{ myData.businessTelephone }}</div>
                <div class="right"><i class="iconfont">&#xe744;</i></div>
            </div>
            <div class="type-row" @click="showDialog('pay')">
                <div class="left">支付宝</div>
                <div class="center">{{ myData.alipayAccount }}</div>
                <div class="right"><i class="iconfont">&#xe744;</i></div>
            </div>
        </div>
        <!-- 弹窗 -->
        <transition name="down-slow">
            <div class="dialog-bg" v-if="editTel || editAlipay">
                <div class="dialog" v-if="editTel">
                    <div class="title">修改服务电话</div>
                    <div class="input-row">
                        <input type="tel" maxlength="13" v-model="cloneTel" res="tel">
                    </div>
                    <p class="tips">用于买家联系您使用，请填写您常用的号码</p>
                    <div class="btn-bar">
                        <mt-button type="default" @click="editTel = editAlipay = false">取消</mt-button><mt-button type="default" @click="edit('tel')">修改</mt-button>
                    </div>
                </div>
                <div class="dialog" v-if="editAlipay">
                    <div class="title">修改支付宝</div>
                    <div class="input-row">
                        <input type="tel" maxlength="13" v-model="clonePay" res="pay">
                    </div>
                    <p class="tips">后续交易金额将转入此账户，请务必填写正确</p>
                    <div class="btn-bar">
                        <mt-button type="default" @click="editTel = editAlipay = false">取消</mt-button><mt-button type="default" @click="edit('pay')">修改</mt-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 大图 -->
        <transition name="down-slow">
            <div class="dialog-bg" v-if="bigImg" @click="bigImg = false">
                <img :src="myData.businessLicensePic" class="big-img">
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import store from 'store';
    export default {
        data() {
            return {
                editTel: false,             // 修改电话弹窗
                editAlipay: false,          // 修改支付宝弹窗
                cloneTel: '',               // 备份电话
                clonePay: '',               // 备份支付宝
                myData: {},
                bigImg: false,              // 大图
            }
        },
        computed: {
            ...mapState({
                orgDTO: state => state.member.orgDTO
            }),
            businessName() {
                return  this.$tool.shopType
            },
            // 等级图标
            level() {
                let g = this.myData.growth
                if(g <= 250) {
                    return 'level-1'
                } else if(g <= 10000) {
                    return 'level-2'
                } else if(g <= 500000) {
                    return 'level-3'
                } else {
                    return 'level-4'
                }
            }
        },
        methods: {
            // 显示弹框
            showDialog(type) {
                if(type === 'tel') {
                    this.cloneTel = this.myData.businessTelephone;
                    this.editTel = true;
                    this.$nextTick(() => this.$refs.tel.focus());
                } else if(type === 'pay') {
                    this.clonePay = this.myData.alipayAccount;
                    this.editAlipay = true;
                    this.$nextTick(() => this.$refs.pay.focus());
                }
            },
            // 修改数据
            edit(type) {

                if(type === 'tel') {
                    if(this.cloneTel === '') return this.$toast('服务电话不能为空')
                    if((/\d+/g).test(this.cloneTel)) {
                        if(this.cloneTel.length < 8) return this.$toast('电话号码最小长度为8')
                        this.$api.post('/orgShop/updateBusinessTelephone',{
                            businessTelephone: this.cloneTel
                        },res => {
                            this.$toast('服务电话修改成功~')
                            this.getData();
                            this.editTel = false;
                        },res => {
                            this.$toast('您输入的电话号码格式错误，请重新输入~')
                        })
                    } else {
                        this.$toast('您输入的电话号码格式错误，请重新输入~')
                        this.cloneTel = '';
                    }


                } else if(type === 'pay') {
                    if(this.clonePay === '') return this.$toast('支付宝不能为空')
                    this.$api.post('/orgShop/updateAlipayAccount',{
                        alipayAccount: this.clonePay
                    },res => {
                        this.$toast('支付宝修改成功~')
                        this.getData();
                        this.editAlipay = false;
                    })
                }


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
        created() {
            
            // 设置title
            this.$store.commit('SET_TITLE','店铺信息');

            // 拉取数据
            this.getData();
                
        },
        // 判断登陆
        beforeRouteEnter (to, from, next) {
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


<style lang="less" scoped>
    @import url('~@/styles/seller/shopDetail.less');
</style>