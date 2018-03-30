<template lang="html">
    <div class="select">
        <div class="select_tips">
            请填写以下资料等待审核，审核后就可以发布商品啦，如需帮助，请拨打 400-996-3399
        </div>
        <div class="select_center_wrapper">
            <div class="select_item">
                <div class="select_item_label">
                    <label for="2">企业名称</label>
                </div>
                <div class="select_item_content">
                    <textarea rows="2" id="2" v-model="formData.shopName" placeholder="必填项，请填写店铺名称"></textarea>
                </div>
            </div>
            <!-- 补全地址 -->
            <template v-if="addressIsComplete">
                <div class="select_item">
                    <div class="select_item_label">
                        <label for="4">地区</label>
                    </div>
                    <div class="select_item_content" @click="addressShowOrHide = true">
                        <input type="text" id="4" disabled v-model="formData.shopArea" placeholder="必填项，请选择地区" />
                    </div>
                    <i class="iconfont" @click="addressShowOrHide = true">&#xe744;</i>
                </div>
                <div class="select_item">
                    <div class="select_item_label">
                        <label for="5">详细地址</label>
                    </div>
                    <div class="select_item_content">
                        <input type="text" id="5" v-model="formData.shopAddress" placeholder="必填项，请填写详细地址" maxlength="50" />
                    </div>
                </div>
            </template>
            <div class="select_item seller_type" v-if="registClass === 1" style="padding-bottom: .28rem;border-bottom:1px solid #e5e5e5;">
                <div class="select_item_label">
                    <label for="6">卖家类型</label>
                </div>
                <div class="select_item_content" id="6">
                    <div class="mumber_type" v-for="(item,index) in sellerType" :key="index" :class="{on: index === sellerClass}" @click="selectSellerType(index)">{{ item }}</div>
                </div>
            </div>
            <div class="select_item" v-if="registClass === 1">
                <div class="select_item_label">
                    <label for="8">服务电话</label>
                </div>
                <div class="select_item_content">
                    <input type="tel" id="8" v-model="formData.shopResTel" placeholder="必填项，请填写服务电话" :maxlength="11" />
                </div>
            </div>
            <div class="select_item pay_item" v-if="registClass === 1">
                <div class="select_item_label">
                    <label for="7">支付宝</label>
                </div>
                <div class="select_item_content">
                    <input type="text" id="7" v-model="formData.shopPayNumber" placeholder="必填项，请填写支付宝账号" :maxlength="50" />
                </div>
            </div>
        </div>
        <div class="pay_wrapper" v-if="registClass === 1">后续的交易货款将转入此账号</div>
        <div class="f5_2"></div>
        <div v-if="registClass === 1">
            <div class="select_upload_wrapper_2">
                <div class="select_upload_2" :class="{on: sellerClass>1}">
                    <label class="select_icon_2" v-if="licenseImg.length === 0">
                        <img src="../../assets/images/upload.png" />
                        {{ sellerText[sellerClass].first }}
                        <input type="file" accept="image/*" hidden @change="onPreview('shop_lic',$event)" />
                    </label>
                    <div class="select_img_2" v-else>
                        <img v-for="(item,index) in licenseImg" :src="item.imgUrl" :key="index" />
                        <label class="reload_pic">
                            <img src="../../assets/images/camera.png" />
                            <input type="file" accept="image/*" hidden @change="onPreview('shop_lic',$event)" />
                        </label>
                    </div>
                </div>
                <div class="select_upload_2" v-if="sellerClass<2">
                    <label class="select_icon_2" v-if="productImg.length === 0">
                        <img src="../../assets/images/upload.png" />
                        {{ sellerText[sellerClass].second }}
                        <input type="file" accept="image/*" hidden @change="onPreview('shop_pro',$event)" />
                    </label>
                    <div class="select_img_2" v-else>
                        <img v-for="(item,index) in productImg" :src="item.imgUrl" :key="index" />
                        <label class="reload_pic">
                            <img src="../../assets/images/camera.png" />
                            <input type="file" accept="image/*" hidden @change="onPreview('shop_pro',$event)" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="f5_2"></div>
        <div class="select_bottom_wrapper">
            <div class="select_bottom_btn">
                <mt-button type="primary" :disabled="iSubmit || loading" @click="submitMethod">
                    <img src="../../assets/images/loading3.gif" height="20" width="20" slot="icon" v-if="loading" >
                    提交资料
                </mt-button>
            </div>
            <mt-button type="primary" class="to_index" @click="$router.push({name:'首页'})">去首页</mt-button>
        </div>
        <!-- 地址选择 -->
        <address-panel v-show="addressShowOrHide" @getAllData="getAddress" @closePannel="closeAddress" :provinceCode="provinceNum" :cityCode="cityNum" :areaCode="areaNum"></address-panel>
    </div>
</template>

<script>
import addressPanel from '../center/addressPanel.vue';
import { mapState } from 'vuex';
import store from 'store';
import $api from 'api';
import { Toast } from 'mint-ui';
export default {
    components: {
        addressPanel,
    },
    data() {
        return {
            loginNumber: 17605062109,
            registType: ['成为会员','成为卖家'],
            sellerType: ['茶厂','合作社','茶企','批发商'],
            registClass: 1,
            formData: {
                shopName: '',
                shopTel: '',
                shopArea: '',
                shopAddress: '',
                shopPayNumber: '',
                shopResTel: ''
            },
            shopImg: [],
            licenseImg: [],
            productImg: [],
            shopImgUrl: [],
            licenseImgUrl: [],
            productImgUrl: [],
            shopImgFile: [],
            licenseImgFile: [],
            productImgFile: [],
            sellerClass: 0,
            sellerText:[
                {
                    first: '上传营业执照（必传）',
                    second: '上传生产许可证'
                },
                {
                    first: '上传营业执照（必传）',
                    second: '上传QS'
                },
                {
                    first: '上传营业执照（必传）',
                },
                {
                    first: '上传营业执照（必传）',
                }
            ],
            exampleFlag: false,
            addressShowOrHide: false,
            addressObj: {},
            region: 'oss-cn-hangzhou',
            bucket: 'imgcbt',
            path: 'test_path/',
            eximain: false,
            registText: '立即注册',
            myData: {},
            loading: false,
            addreeObj: {                                                    // 地址
                pro: '110000',
                city: '110100',
                area: '110101'
            },
            addressIsComplete: false,                                       // 地址是否完整
        }
    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE', '茶帮通注册');
        this.getData(store.state.member.orgDTO.orgID);
        this.loginNumber = store.state.member.member.memberAccount;
        this.formData.shopName = store.state.member.member.unitName;
        this.$api.get('/oteao/login/checkArea', {}, res => {
            // console.log(res);
            this.addressIsComplete = false;
        }, res => {
            // Toast({
            //     message: res.errorMsg
            // })
            // 失败代表地址不完整
            this.addressIsComplete = true;
        })      
    },
    computed: {
        // 提交资料
        iSubmit() {
            if (this.registClass === 1) {
                if (this.addressIsComplete) {
                    if (this.licenseImg.length === 1 && this.formData.shopPayNumber != '' && this.formData.shopResTel != '' && this.formData.shopName != '' && this.formData.shopArea != '' && this.formData.shopAddress != '') {
                        return false;
                    } else {
                        return true;
                    }
                }
                else {

                    if (this.licenseImg.length === 1 && this.formData.shopPayNumber != '' && this.formData.shopResTel != '' && this.formData.shopName != '') {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        },
        provinceNum() {
            return this.addreeObj.pro;
        },
        cityNum() {
            return this.addreeObj.city;
        },
        areaNum() {
            return this.addreeObj.area;
        }
    },
    methods: {
        //关闭地址弹窗
        closeAddress() {
            this.addressShowOrHide = false;
        },
        getAddress(obj) {
            this.formData.shopArea = obj.address;
            this.addressObj = obj;
            this.addressShowOrHide = false;
        },
        // 获取数据
        getData(id) {
            this.$api.post('/orgShop/getOrgShop',{
                orgId: id,
                sysId: 1
            },res => {
                this.myData = res.data;
                this.formData.shopResTel = res.data.businessTelephone;
                this.formData.shopPayNumber = res.data.alipayAccount;
                this.sellerClass = res.data.shopType-1;
                if(res.data.shopType == 1){
                    this.licenseImgUrl = [res.data.businessLicensePic];
                    this.productImgUrl = [res.data.produceLicensePic];
                    this.licenseImg = [{imgUrl: res.data.businessLicensePic}];
                    this.productImg = [{imgUrl: res.data.produceLicensePic}];
                    this.licenseImgFile = [null];
                    this.productImgFile = [null];
                }else if(res.data.shopType == 2){
                    this.licenseImgUrl = [res.data.businessLicensePic];
                    this.productImgUrl = [res.data.qsLicensePic];
                    this.licenseImg = [{imgUrl: res.data.businessLicensePic}];
                    this.productImg = [{imgUrl: res.data.qsLicensePic}];
                    this.licenseImgFile = [null];
                    this.productImgFile = [null];
                }else{
                    this.licenseImgUrl = [res.data.businessLicensePic];
                    this.productImgUrl = [null];
                    this.licenseImg = [{imgUrl: res.data.businessLicensePic}];
                    this.productImg = [{imgUrl: null}];
                    this.licenseImgFile = [null];
                    this.productImgFile = [null];
                }
            })
        },
        selectSellerType(index) {
            this.sellerClass = index;
        },
        onPreview(type,ev) {
            if(ev.target.files[0].size > 8*1024*1024) return this.$toast({
                message: '图片不能超出8M哦~',
                iconClass: 'icon icon-info'
            });
            let reader = new FileReader();
            reader.readAsDataURL(ev.target.files[0]);
            if(type === 'shop_pic'){
                reader.onload = (e)=>{
                    this.shopImg =  [{'imgUrl': e.target.result}];
                    this.exampleFlag = false;
                }
                this.shopImgFile = [ev.target.files[0]];
            }else if(type === 'shop_lic'){
                reader.onload = (e)=>{
                    this.licenseImg =  [{'imgUrl': e.target.result}];
                }
                this.licenseImgFile = [ev.target.files[0]];
            }else if(type === 'shop_pro'){
                reader.onload = (e)=>{
                    this.productImg =  [{'imgUrl': e.target.result}];
                }
                this.productImgFile = [ev.target.files[0]];
            }
        },
        random_string(len) {
        　   　len = len || 32;
        　　  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        　　  var maxPos = chars.length;
        　　  var pwd = '';
        　　  for (let i = 0; i < len; i++) {
        　   　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        getToken() {
            let data ={};
            return new Promise((resolve,reject) => {
                this.$api.post('/oteao/file/getSignature',data,res => {
                    resolve(res);
                },res=>{
                    return this.$this.$toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        doUpload() {
            let flag = {
                shop: 0,
                lic: 0,
                pro: 0
            };
            let isFlag = (resolve,reject) => {
                if( flag.shop != this.shopImgFile.length) return;
                if( flag.lic != this.licenseImgFile.length) return;
                if( flag.pro != this.productImgFile.length) return;
                resolve()
            }
            return new Promise((resolve,reject) => {
                this.getToken().then((res) => {
                    let client = new OSS.Wrapper({
                        region: this.region,
                        accessKeyId: res.data.accessKeyId,
                        accessKeySecret: res.data.accessKeySecret,
                        stsToken: res.data.securityToken,
                        bucket: this.bucket,
                        secure:true
                    })
                    for(let i=0; i<this.shopImgFile.length; i++){            // 主图
                        if(this.shopImgFile[i]){
                            let random_name =res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.shopImgFile[i].name.split('.').pop()
                            client.multipartUpload(random_name, this.shopImgFile[i]).then((results) => {
                                const url = '//img3.oteao.com/'+ results.name;
                                this.shopImgUrl = [url];
                                flag.shop++;
                                isFlag(resolve,reject);
                            }).catch((err) => {
                                flag.shop++;
                                isFlag(resolve,reject);
                            })
                        }else{
                            flag.shop++;
                            isFlag(resolve,reject);
                        }
                    }
                    for(let i=0; i<this.licenseImgFile.length; i++){            // 主图
                        if(this.licenseImgFile[i]){
                            let random_name =res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.licenseImgFile[i].name.split('.').pop()
                            client.multipartUpload(random_name, this.licenseImgFile[i]).then((results) => {
                                const url = '//img3.oteao.com/'+ results.name;
                                this.licenseImgUrl = [url];
                                flag.lic++;
                                isFlag(resolve,reject);
                            }).catch((err) => {
                                flag.lic++;
                                isFlag(resolve,reject);
                            })
                        }else{
                            flag.lic++;
                            isFlag(resolve,reject);
                        }
                    }
                    for(let i=0; i<this.productImgFile.length; i++){            // 主图
                        if(this.productImgFile[i]){
                            let random_name =res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.productImgFile[i].name.split('.').pop()
                            client.multipartUpload(random_name, this.productImgFile[i]).then((results) => {
                                const url = '//img3.oteao.com/'+ results.name;
                                this.productImgUrl = [url];
                                flag.pro++;
                                isFlag(resolve,reject);
                            }).catch((err) => {
                                flag.pro++;
                                isFlag(resolve,reject);
                            })
                        }else{
                            flag.pro++;
                            isFlag(resolve,reject);
                        }
                    }
                })
            })
        },
        submitMethod() {
            this.loading = true;
            this.doUpload().then(() => {
                this.postMember();
            })
        },
        postMember() {
            let data={};
            // this.addressIsComplete为true代表地址不完整
            if(this.addressIsComplete){
                data = {
                    'alipayAccount': this.formData.shopPayNumber,
                    'businessTelephone': this.formData.shopResTel,
                    "areaCode": this.addressObj.area,                          // 区
                    "cityCode": this.addressObj.city,                          // 市
                    "provinceCode": this.addressObj.pro,                       // 省
                    "detailAddress": this.formData.shopAddress,               // 详细地址
                    "contactor": store.state.member.member.contactName,
                    "device": 'WAP',
                    "orgName": store.state.member.orgDTO.orgName,
                    "shop": {}
                }
            }
            else {
                data = {
                    'alipayAccount': this.formData.shopPayNumber,
                    'businessTelephone': this.formData.shopResTel,
                    "areaCode": store.state.member.member.areaCode,                          // 区
                    "cityCode": store.state.member.member.cityCode,                          // 市
                    "provinceCode": store.state.member.member.provinceCode,                  // 省
                    "detailAddress": store.state.member.orgDTO.address,                      // 详细地址
                    "contactor": store.state.member.member.contactName,
                    "device": 'WAP',
                    "orgName": store.state.member.orgDTO.orgName,
                    "shop": {}
                }
            }
            if(this.sellerClass === 0){
                data.shop = {
                    "businessLicensePic": this.licenseImgUrl[0],
                    "produceLicensePic": this.productImgUrl[0],
                    "shopType": 1,
                }
            }else if(this.sellerClass === 1){
                data.shop = {
                    "businessLicensePic": this.licenseImgUrl[0],
                    "qsLicensePic": this.productImgUrl[0],
                    "shopType": 2,
                }
            }else if(this.sellerClass === 2){
                data.shop = {
                    "businessLicensePic": this.licenseImgUrl[0],
                    "shopType": 3,
                }
            }else if(this.sellerClass === 3){
                data.shop = {
                    "businessLicensePic": this.licenseImgUrl[0],
                    "shopType": 4,
                }
            }
            this.$api.post('/oteao/login/fillShop',JSON.stringify(data),res => {
                this.$toast({
                    message: '资料填写成功，待审核',
                    iconClass: 'icon icon-fail'
                });
                return setTimeout(()=>{
                    this.$router.push({
                        name: '茶帮通注册3',
                        query: {
                            edit: 'seller',
                            flag: 'shut'
                        }
                    })
                },200)
            },res=>{
                return this.$toast({
                    message: res.errorMsg,
                    iconClass: 'icon icon-fail'
                });
            })
        }
    },
    beforeRouteEnter(to, from, next) {
        if(store.state.member.member.id) {
            next();
        } else {
            store.dispatch('getMemberData').then(res => {
                next();
            }).catch(res =>{
                next(vm => {
                    vm.router.push('/login')
                })
            })
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/regist/select.less';
</style>
