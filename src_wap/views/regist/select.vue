<template lang="html">
    <div class="select">
        <div class="select_tips">
            恭喜您成功注册，请填写以下资料等待审核，审核后才可以询价和下单，如需帮助，请拨打 400-996-3399
        </div>
        <div class="select_top_wrapper">
            <div class="select_item">
                <div class="select_item_label">
                    <label for="1">登录账号</label>
                </div>
                <div class="select_item_content">
                    <input type="text" readonly v-model="loginNumber" />
                </div>
            </div>
            <div class="select_item">
                <div class="select_item_label">
                    <label for="1">注册类型</label>
                </div>
                <div class="select_item_content" id="1" v-if="flag">
                    <div class="mumber_type" v-for="(item,index) in registType" :key="index" :class="{on: index === registClass}" @click="selectRegistType(index)">{{ item }}</div>
                </div>
                <div class="select_item_content" v-else>
                    <input type="text" readonly v-model="onlyName" />
                </div>
            </div>
        </div>
        <div class="f5_2"></div>
        <div class="select_center_wrapper">
            <div class="select_item seller_type" v-if="registClass === 1">
                <div class="select_item_label">
                    <label for="6">卖家类型</label>
                </div>
                <div class="select_item_content" id="6">
                    <div class="mumber_type" v-for="(item,index) in sellerType" :key="index" :class="{on: index === sellerClass}" @click="selectSellerType(index)">{{ item }}</div>
                </div>
            </div>
            <div class="select_item">
                <div class="select_item_label">
                    <label for="2">企业名称</label>
                </div>
                <div class="select_item_content">
                    <input type="text" id="2" v-model="formData.shopName" placeholder="必填项，请填写企业名称" maxlength="30" />
                </div>
            </div>
            <div class="select_item">
                <div class="select_item_label">
                    <label for="3">联系人</label>
                </div>
                <div class="select_item_content">
                    <input type="text" id="3" v-model="formData.shopTel" placeholder="必填项，请填写联系人姓名" maxlength="10" />
                </div>
            </div>
            <div class="select_item">
                <div class="select_item_label">
                    <label for="4">地区</label>
                </div>
                <div class="select_item_content" @click="addressShowOrHide = true">
                    <input type="text" id="4" readonly v-model="formData.shopArea" placeholder="必填项，请选择地区" />
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
            <div class="select_item pay_item" v-if="registClass === 1">
                <div class="select_item_label">
                    <label for="7">支付宝</label>
                </div>
                <div class="select_item_content">
                    <input type="text" id="7" v-model="formData.shopPayNumber" placeholder="必填项，请填写支付宝账号" maxlength="50" />
                </div>
            </div>
        </div>
        <div class="pay_wrapper" v-if="registClass === 1">后续的交易货款将转入此账号</div>
        <div class="f5_2"></div>
        <div v-if="registClass === 0">
            <div class="select_upload_wrapper" v-if="shopImg.length != 0">
                <div class="select_upload">
                    <div class="select_img">
                        <img v-for="(item,index) in shopImg" :src="item.imgUrl" :key="index" />
                        <label class="reload_pic">
                            <img src="../../assets/images/camera.png" />
                            <input type="file" accept="image/*" hidden @change="onPreview('shop_pic',$event)" />
                        </label>
                    </div>
                </div>
            </div>
            <div class="select_upload_wrapper" v-else>
                <div class="select_upload">
                    <label class="select_icon" @click="exampleFlag = true">
                        <img src="../../assets/images/upload-camera.png" />
                        上传门店照片
                    </label>
                </div>
            </div>
        </div>
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
                <mt-button type="primary" :disabled="iSubmit" @click="submitMethod">提交资料</mt-button>
            </div>
            <mt-button type="primary" class="to_index" @click="$router.push({name:'首页'})">去首页</mt-button>
        </div>
        <!-- 示例弹窗 -->
        <div class="popup upload_popup" v-if="exampleFlag">
            <div class="popup_inner">
                <div class="see_here">
                    <i class="b_t"></i>
                    <i class="b_b"></i>
                    <img src="../../assets/shop1.png" alt="">
                </div>
                <div class="pd_35"><p class="eg_title">店铺门头照示例</p></div>
                <div class="pd_35 desc_tips">
                    <h4 class="color_3">照片须符合以下条件</h4>
                    <p>1.请保证照片中店铺门店信息完整，无反光无遮挡</p>
                    <p>2.照片为店铺正面照，需清晰可见</p>
                    <p>3.门店信息需与注册店铺名称一致</p>
                </div>
                <div class="btns_box flex">
                    <a class="flex-1 cancel" @click="exampleFlag = false">取消</a>
                    <label class="flex-1 upload" href="javascript:void(0);">上传
                        <input type="file" accept="image/*" hidden @change="onPreview('shop_pic',$event)" />
                    </label>
                </div>
            </div>
        </div>
        <address-panel v-show="addressShowOrHide" @getAllData="getAddress" :provinceCode="provinceNum" :cityCode="cityNum" :areaCode="areaNum"></address-panel>
    </div>
</template>

<script>
import addressPanel from '../center/addressPanel.vue'
import { mapState } from 'vuex'
import store from 'store';
import $api from 'api';
export default {
    components: {
        addressPanel
    },
    data() {
        return {
            loginNumber: 17605062109,
            registType: ['成为会员','成为卖家'],
            sellerType: ['茶厂','合作社','茶企','批发商'],
            registClass: 0,
            formData: {
                shopName: '',
                shopTel: '',
                shopArea: '',
                shopAddress: '',
                shopPayNumber: ''
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
            addreeObj: {
                pro: '110000',
                city: '110100',
                area: '110101'
            },
            flag: true,
            onlyName: '成为会员',
        }
    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','茶帮通注册');
        if(process.env.NODE_ENV != 'development'){
            this.path = 'online_img/';
        }
        this.loginNumber = store.state.member.member.memberAccount;
        if(this.$route.query.edit === 'true'){
            this.flag = false;
            if(store.state.member.orgDTO){
                this.formData.shopName = store.state.member.orgDTO.orgName;
                this.formData.shopTel = store.state.member.orgDTO.contactPerson;
                this.formData.shopAddress = store.state.member.orgDTO.address;
                this.shopImg = [{imgUrl: store.state.member.orgDTO.facadePics}];
                this.formData.shopArea = `${store.state.member.orgDTO.provinceName}${store.state.member.orgDTO.cityName}${store.state.member.orgDTO.countyName}`;
                this.addreeObj.pro = store.state.member.orgDTO.provinceID;
                this.addreeObj.city = store.state.member.orgDTO.cityID;
                this.addreeObj.area = store.state.member.orgDTO.countyID;
            }
        }
    },
    computed: {
        iSubmit() {
            if(this.registClass === 1){
                if(this.formData.shopName != '' && this.formData.shopTel != '' && this.formData.shopArea != '' && this.formData.shopAddress != '' && this.formData.shopPayNumber != '' && this.licenseImg.length === 1){
                    return false;
                }else{
                    return true;
                }
            }else{
                if(this.formData.shopName != '' && this.formData.shopTel != '' && this.formData.shopArea != '' && this.formData.shopAddress != '' && this.shopImg.length === 1){
                    return false;
                }else{
                    return true;
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
        getAddress(obj) {
            this.formData.shopArea = obj.address;
            this.addressObj = obj;
            this.addressShowOrHide = false;
        },
        selectRegistType(index) {
            this.registClass = index;
        },
        selectSellerType(index) {
            this.sellerClass = index;
        },
        onPreview(type,ev) {
            if(ev.target.files[0].size > 8*1024*1024) return Toast({
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
                    return this.$toast({
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
                        bucket: this.bucket
                    })
                    console.log(client);
                    for(let i=0; i<this.shopImgFile.length; i++){            // 主图
                        console.log(this.shopImgFile[i]);
                        let random_name =res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.shopImgFile[i].name.split('.').pop()
                        client.multipartUpload(random_name, this.shopImgFile[i]).then((results) => {
                            const url = '//img0.oteao.com/'+ results.name;
                            this.shopImgUrl = [url];
                            flag.shop++;
                            isFlag(resolve,reject);
                        }).catch((err) => {
                            flag.shop++;
                            isFlag(resolve,reject);
                        })
                    }
                    for(let i=0; i<this.licenseImgFile.length; i++){            // 主图
                        let random_name =res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.licenseImgFile[i].name.split('.').pop()
                        client.multipartUpload(random_name, this.licenseImgFile[i]).then((results) => {
                            const url = '//img0.oteao.com/'+ results.name;
                            this.licenseImgUrl = [url];
                            flag.lic++;
                            isFlag(resolve,reject);
                        }).catch((err) => {
                            flag.lic++;
                            isFlag(resolve,reject);
                        })
                    }
                    for(let i=0; i<this.productImgFile.length; i++){            // 主图
                        let random_name =res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.productImgFile[i].name.split('.').pop()
                        client.multipartUpload(random_name, this.productImgFile[i]).then((results) => {
                            const url = '//img0.oteao.com/'+ results.name;
                            this.productImgUrl = [url];
                            flag.pro++;
                            isFlag(resolve,reject);
                        }).catch((err) => {
                            flag.pro++;
                            isFlag(resolve,reject);
                        })
                    }
                })
            })
        },
        submitMethod() {
            this.doUpload().then(() => {
                this.postMember();
            })
        },
        // postApi(data) {
        //     return new Promise((resolve,reject) => {
        //         this.$api.post('/oteao/file/getSignature',data,res => {
        //             return Toast({
        //                 message: '信息资料已提交，待审核',
        //                 iconClass: 'icon icon-success'
        //             });
        //         },res=>{
        //             return Toast({
        //                 message: res.errorMsg,
        //                 iconClass: 'icon icon-fail'
        //             });
        //         })
        //     })
        // },
        postMember() {
            let data = {};
            if(this.registClass === 0){
                data = {
                    "areaCode": this.addressObj.areaCode,
                    "areaName": this.addressObj.areaName,
                    "cityCode": this.addressObj.cityCode,
                    "cityName": this.addressObj.cityName,
                    "contactor": this.formData.shopTel,
                    "detailAddress": this.formData.shopAddress,
                    "device": 'WAP',
                    "facadePics": this.shopImgUrl[0],
                    "orgName": this.formData.shopName,
                    "provinceCode": this.addressObj.provinceCode,
                    "provinceName": this.addressObj.provinceName
                }
                this.$api.post('/oteao/login/fillOrgInfo',JSON.stringify(data),res => {
                    this.$toast({
                        message: '信息资料已提交，待审核',
                        iconClass: 'icon icon-success'
                    });
                    return this.$router.push({
                        name: '茶帮通注册3'
                    })
                },res=>{
                    return this.$toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            }else{
                data = {
                    'alipayAccount': this.formData.shopPayNumber,
                    "areaCode": this.addressObj.areaCode,
                    "areaName": this.addressObj.areaName,
                    "cityCode": this.addressObj.cityCode,
                    "cityName": this.addressObj.cityName,
                    "contactor": this.formData.shopTel,
                    "detailAddress": this.formData.shopAddress,
                    "device": 'WAP',
                    "orgName": this.formData.shopName,
                    "provinceCode": this.addressObj.provinceCode,
                    "provinceName": this.addressObj.provinceName,
                    "shop": {}
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
                        message: '信息资料已提交，待审核',
                        iconClass: 'icon icon-success'
                    });
                    return this.$router.push({
                        name: '茶帮通注册3'
                    })
                },res=>{
                    return this.$toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            }
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
    },
}
</script>

<style lang="less">
@import '~@/styles/regist/select.less';
</style>
