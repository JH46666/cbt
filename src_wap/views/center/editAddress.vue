<template>
    <div id="editAddress" :style="style" ref="editAddress">
        <label class="address-wrap">
            <input type="text" placeholder="姓名" v-model="data.name" maxlength="20">
        </label>
        <label class="address-wrap">
            <input type="text" placeholder="手机号码" v-model="data.phone" maxlength="11">
        </label>
        <label class="address-wrap">
            <input type="text" placeholder="省份 城市 区县" readonly @click="showAddress($event)" v-model="data.address">
        </label>
        <label class="address-wrap">
            <input type="text" placeholder="详细地址，如街道、门牌号等" maxlength="200" v-model="data.detail">
        </label>
        <div class="default-address" v-if="$route.name !== '卖家修改地址'">
            <mt-switch v-model="defaultAddress"></mt-switch>
            <p>设为默认地址</p>
        </div>
        <div class="save-wrap">
            <mt-button type="default" :disabled="!disabled" @click="save">保存</mt-button>
        </div>
        <transition name="fadeUp" mode="out-in">
            <selsect-address v-show="pannel" @getAllData="selectAddress" @closePannel="closeAddress" :provinceCode="detail.provinceCode" :cityCode="detail.cityCode" :areaCode="detail.areaCode"></selsect-address>
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
                defaultAddress: false,          // 是否默认
                pannel: false,                  // 地址面板
                data: {
                    name: '',
                    phone: '',
                    address: '',
                    detail: ''
                },
                detail: {           // 默认地址
                    address: "北京市北京市东城区",
                    areaCode: "110101",
                    areaName: "东城区",
                    cityCode: "110100",
                    cityName: "北京市",
                    provinceCode: "110000",
                    provinceName: "北京市"
                },
                myData: {},         // 基础数据   
            }
        },
        computed: {
            disabled() {
                return Boolean(this.data.name && this.data.phone && this.data.address && this.data.detail)
            },
            style() {
                let h = document.body.scrollHeight;
                return {
                    height: this.$tool.isWx ? `calc(${h}px)` : `calc(${h}px - .88rem)`
                } 
            }
        },
        methods: {
            // 显示地址弹框
            showAddress(ev) {
                this.pannel = !this.pannel;
                this.$nextTick(() => {
                    ev.target.blur();
                })
            },
            //关闭地址弹窗
            closeAddress() {
                this.pannel = false;
            },
            // 选择完地址回调
            selectAddress(data) {
                this.pannel = !this.pannel;
                this.data.address = data.address;
                this.detail = data;
            },
            // 保存
            save() {

                if(this.data.name.length < 2) {
                    return this.$toast('姓名不能少于2字符')
                }

                // 验证手机号
                if(!(/^1[34578]\d{9}$/.test(this.data.phone))){ 
                    return this.$toast('您输入的手机号格式有误');  
                }

                // 卖家更新地址
                if(this.$route.name === '卖家修改地址') {
                    let data = {
                        "address": this.data.address,
                        "cityCode": this.detail.cityCode,
                        "countyCode": this.detail.areaCode,
                        "orderConsigneId": this.myData.orderConsigneId,
                        "phone": this.data.phone,
                        "provinceCode": this.detail.provinceCode,
                        "receiptName": this.data.name,
                        "streetAddress": this.data.detail,
                      }
                      this.$api.post('/oteao/order/updateOrderConsignee',JSON.stringify(data),res => {
                          let toast = this.$toast('新增成功')
                          setTimeout(() => {
                            toast.close();
                            this.$router.go(-1)
                          },200)
                      })
                } else {
                    let data = {
                        "areaCode": this.detail.areaCode,
                        "cityCode": this.detail.cityCode,
                        "detailAddress": this.data.detail,
                        "isDefault": Number(this.defaultAddress),
                        "mobilePhone": this.data.phone,
                        // "phone": "string",
                        "provinceCode": this.detail.provinceCode,
                        "recName": this.data.name,
                        "sysId": 1,
                        // "zipCode": "string"
                    }
                    if (this.$route.name === '编辑地址') {
                        data.id = this.myData.id
                    }
                    this.$api.post('/oteao/deliveryAddress/addOrUpdateDeliveryAddress',JSON.stringify(data),res => {
                        let toast = this.$toast('保存成功')
                        setTimeout(() => {
                            toast.close();
                            this.$router.go(-1)
                        },200)
                    })
                }

            }
        },
        created() {
            // 判断时哪个路由进来的
            if(this.$route.name === '卖家修改地址') {
                // 设置title
                this.$store.commit('SET_TITLE','修改地址');
                
                let orderNo = this.$route.query.orderNo
                this.$api.post('/oteao/order/findSellerOrderByNo',{
                    orderNo
                },res => {
                    this.myData = res.data
                    let data = this.myData;
                    // console.log(data.detailAddress)                    
                    // console.log(data.detailAddress.slice(0,-data.streetAddress.length))
                    // 对应表单 
                    this.data.name = data.receiptName
                    this.data.phone = data.receiptPhone
                    this.data.address = data.detailAddress.replace(data.streetAddress,'')
                    this.data.detail = data.streetAddress

                    this.detail.provinceCode = data.provinceCode
                    this.detail.cityCode = data.cityCode
                    this.detail.areaCode = data.countyCode
                })
            } else if(this.$route.name === '新增地址') {
                // 设置title
                this.$store.commit('SET_TITLE','新增地址');
                
                // 判断默认地址
                this.$api.get('/oteao/deliveryAddress/searchDefauleAddress',{},res => {
                    this.defaultAddress = ! res.data;
                })
            } else if (this.$route.name === '编辑地址') {
                // 设置title
                this.$store.commit('SET_TITLE','编辑地址');
                
                let id = this.$route.query.id
                this.$api.get('/oteao/deliveryAddress/findById',{deliveryAddressId: id},res => {
                    this.myData = res.data
                    let data = this.myData;
                    // 对应表单 
                    this.data.name = data.recName
                    this.data.phone = data.mobilePhone
                    this.data.address = data.provinceName + data.cityName + data.areaName
                    this.data.detail = data.detailAddress
                    this.defaultAddress = !! data.isDefault

                    this.detail.provinceCode = data.provinceCode
                    this.detail.cityCode = data.cityCode
                    this.detail.areaCode = data.areaCode
                })
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