<template>
    <div class="newshelves3_wrapper">
        <div class="floor main-imgs">
            <h3>商品图片</h3>
            <p class="color_9"><span class="color_f33">1-5张，</span>建议800*800像素，单张图片小于8M的清晰商品照片</p>
            <div class="main-img-box" :class="{on: resize.imgs.mainImg.length>0}">
                <mt-swipe :show-indicators="false" :auto="0" @change="handleChangeMain">
                    <mt-swipe-item  v-for="(item,index) in resize.imgs.mainImg" :key="index">
                        <img :src="item" />
                        <a class="delete-btn" href="javascript: void(0);" @click="deleteImg(index,'main')"><i class="iconfont">&#xe651;</i></a>
                        <div class="small-camera" v-if="resize.imgs.mainImg.length<5">
                            <label>
                                <img src="../../assets/images/camera.png" />
                                <input type="file" accept="image/*" hidden @change="onPreview('main',$event)">
                            </label>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
                <div class="len_num">
                    <span>{{ changeIndex.main }}</span>/{{ resize.imgs.mainImg.length }}
                </div>
            </div>
            <div class="upload-box" v-if="resize.imgs.mainImg.length<1">
                <label class="camera-bg">
                    <input type="file" accept="image/*" hidden @change="onPreview('main',$event)">
                </label>
            </div>
        </div>
        <div class="floor detail-imgs">
            <h3>商品详情展示图片</h3>
            <p class="color_9"><span class="color_f33">1-3项必须上传，</span>建议尺寸保持一致，单张图片小于8M</p>
            <div class="upload-step">
                <h4><span class="serial-num">1</span>高清实拍，清晰展示商品外形细节，最多可上传<span class="color_f33">3</span>张</h4>
                <div class="proview_box" v-if="resize.imgs.detailImg1.length > 0">
                    <mt-swipe :show-indicators="false" :auto="0" @change="handleChangeOne">
                        <mt-swipe-item  v-for="(item,index) in resize.imgs.detailImg1" :key="index">
                            <img :src="item" />
                            <a class="delete-btn" href="javascript: void(0);" @click="deleteImg(index,'one')"><i class="iconfont">&#xe651;</i></a>
                            <div class="small-camera" v-if="resize.imgs.detailImg1.length<3">
                                <label>
                                    <img src="../../assets/images/camera.png" />
                                    <input type="file" accept="image/*" hidden @change="onPreview('one',$event)">
                                </label>
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                    <div class="len_num">
                        <span>{{ changeIndex.one }}</span>/{{ resize.imgs.detailImg1.length }}
                    </div>
                </div>
                <div class="flex example-box" v-if="resize.imgs.detailImg1.length === 0">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg">
                            <input type="file" accept="image/*" hidden @change="onPreview('one',$event)">
                        </label>
                    </div>
                    <div class="flex-1">
                        <img src="../../assets/upload-eg1.jpg" />
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入外形描述" v-model="resize.textMs1"></textarea>
            </div>
            <div class="upload-step">
                <h4><span class="serial-num">2</span>拒绝盗图，清晰展示商品内在细节，如茶汤，最多可上传<span class="color_f33">3</span>张</h4>
                <div class="proview_box" v-if="resize.imgs.detailImg2.length > 0">
                    <mt-swipe :show-indicators="false" :auto="0" @change="handleChangeTwo">
                        <mt-swipe-item  v-for="(item,index) in resize.imgs.detailImg2" :key="index">
                            <img :src="item" />
                            <a class="delete-btn" href="javascript: void(0);" @click="deleteImg(index,'two')"><i class="iconfont">&#xe651;</i></a>
                            <div class="small-camera" v-if="resize.imgs.detailImg2.length<3">
                                <label>
                                    <img src="../../assets/images/camera.png" />
                                    <input type="file" accept="image/*" hidden @change="onPreview('two',$event)">
                                </label>
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                    <div class="len_num">
                        <span>{{ changeIndex.two }}</span>/{{ resize.imgs.detailImg2.length }}
                    </div>
                </div>
                <div class="flex example-box" v-if="resize.imgs.detailImg2.length === 0">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg">
                            <input type="file" accept="image/*" hidden @change="onPreview('two',$event)">
                        </label>
                    </div>
                    <div class="flex-1">
                        <img src="../../assets/upload-eg2.jpg" />
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入内在细节描述1，如茶汤" v-model="resize.textMs2"></textarea>
            </div>
            <div class="upload-step">
                <h4><span class="serial-num">3</span>拒绝盗图，清晰展示商品内在细节，如叶底，最多可上传<span class="color_f33">3</span>张</h4>
                <div class="proview_box" v-if="resize.imgs.detailImg3.length > 0">
                    <mt-swipe :show-indicators="false" :auto="0" @change="handleChangeThree">
                        <mt-swipe-item  v-for="(item,index) in resize.imgs.detailImg3" :key="index">
                            <img :src="item" />
                            <a class="delete-btn" href="javascript: void(0);" @click="deleteImg(index,'three')"><i class="iconfont">&#xe651;</i></a>
                            <div class="small-camera" v-if="resize.imgs.detailImg3.length<3">
                                <label>
                                    <img src="../../assets/images/camera.png" />
                                    <input type="file" accept="image/*" hidden @change="onPreview('three',$event)">
                                </label>
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                    <div class="len_num">
                        <span>{{ changeIndex.three }}</span>/{{ resize.imgs.detailImg3.length }}
                    </div>
                </div>
                <div class="flex example-box" v-if="resize.imgs.detailImg3.length === 0">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg">
                            <input type="file" accept="image/*" hidden @change="onPreview('three',$event)">
                        </label>
                    </div>
                    <div class="flex-1">
                        <img src="../../assets/upload-eg3.jpg" />
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入内在细节描述2，如叶底" v-model="resize.textMs3"></textarea>
            </div>
            <div class="upload-step up-step4">
                <h4><span class="serial-num">4</span>其他商品细节，最多可上传<span class="color_f33">3</span>张</h4>
                <div class="step4-img-box" :class="{on: resize.imgs.imgsStep4.length > 0}">
                    <mt-swipe :show-indicators="false" :auto="0" @change="handleChangeFour">
                        <mt-swipe-item  v-for="(item,index) in resize.imgs.imgsStep4" :key="index">
                            <img :src="item" />
                            <a class="delete-btn" href="javascript: void(0);" @click="deleteImg(index,'four')"><i class="iconfont">&#xe651;</i></a>
                            <div class="small-camera" v-if="resize.imgs.imgsStep4.length < 3">
                                <label>
                                    <img src="../../assets/images/camera.png" />
                                    <input type="file" accept="image/*" hidden @change="onPreview('four',$event)">
                                </label>
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                    <div class="len_num">
                        <span>{{ changeIndex.four }}</span>/{{ resize.imgs.imgsStep4.length }}
                    </div>
                </div>
                <div class="flex example-box" v-if="resize.imgs.imgsStep4.length<1">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg">
                            <input type="file" accept="image/*" hidden @change="onPreview('four',$event)">
                        </label>
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入其他商品细节" v-model="resize.textMs4"></textarea>
            </div>
        </div>
        <div class="flex btns">
            <mt-button type="primary" @click="$router.go(-1)">上一步</mt-button>
            <mt-button type="primary" :disabled="disabledBol || loading1" @click="saveMethod('0')">
                <img src="../../assets/images/loading3.gif" height="20" width="20" slot="icon" :class="{on: loading1 && !flag}">
                保存
            </mt-button>
        </div>
        <div class="save-rackup" v-if="onlySaveBtn">
            <mt-button type="primary" :disabled="disabledBol || loading2" @click="saveMethod('1')">
                <img src="../../assets/images/loading3.gif" height="20" width="20" slot="icon" :class="{on: loading2 && flag}">
                保存并上架
            </mt-button>
        </div>
        <!-- 成功上架弹窗 -->
        <div class="popup suc_popup" v-show="sucFlag">
            <div class="popup_inner suc_inner">
                <div class="algin_c">
                    <p class="suc-tip">{{ sussTips }}</p>
                </div>
                <div class="flex pop-btns">
                    <a class="flex-1 see" href="javascript:void(0);" @click="goShopMange">查看商品</a>
                    <a class="flex-1 go-on" href="javascript:void(0);" @click="goCreated">创建商品</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import { Toast,MessageBox } from 'mint-ui';
import { mapState } from 'vuex'
import store from 'store';
import $api from 'api';
    export default{
        data(){
            return {
                sucFlag: false,         //是否成功上架
                changeIndex: {
                    main: 1,
                    one: 1,
                    two: 1,
                    three: 1,
                    four: 1
                },
                region: 'oss-cn-hangzhou',
                bucket: 'imgcbt',
                urls: {
                    main: [],
                    one: [],
                    two: [],
                    third: [],
                    four: []
                },
                path: 'test_path/',
                flag: null,
                sussTips: '成功上架！',
                onlySaveBtn: false,
                loading1: false,
                loading2: false,
            }
        },
        computed:{
            imgsStep4Len(){
                if(this.resize.imgs.imgsStep4.length>0){
                    return true;
                }else{
                    return false;
                }
            },
            ...mapGetters([
                'resize'
            ]),
            disabledBol() {
                if(this.resize.imgs.mainImg.length>0 && this.resize.imgs.detailImg1.length>0 && this.resize.imgs.detailImg2.length>0 && this.resize.imgs.detailImg3.length>0 && this.resize.textMs1 != ''&& this.resize.textMs2 != ''&& this.resize.textMs3 != ''){
                    return false;
                }else{
                    return true;
                }
            }
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','商品修改');
            if(process.env.NODE_ENV != 'development'){
                this.path = 'online_img/';
            }
            let state = this.$route.query.state;
            if(state != 'ON_SHELF'){
                this.onlySaveBtn = true;
            }
        },
        methods:{
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
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            saveMethod(flag) {
                this.disabledBol = true;
                this.loading1 = true;
                this.loading2 = true;
                if(flag === '0'){
                    this.flag = 0;
                }else{
                    this.flag = 1;
                }
                if(this.resize.mainImgFile.length != 0 || this.resize.oneImgFile.length != 0 || this.resize.secondImgFile.length != 0 || this.resize.thirdImgFile.length != 0 || this.resize.fourImgFile.length != 0){
                    this.doUpload().then(() => {
                        this.onlySave(this.flag);
                    })
                }else{
                    this.onlySave(this.flag);
                }
            },
            doUpload () {
                let flags =  {
                    main: 0,
                    one: 0,
                    two: 0,
                    third: 0,
                    four: 0
                }
                console.log(flags);
                let isFlag = (resolve,reject) => {
                    if( flags.main != this.resize.mainImgFile.length) return;
                    if( flags.one != this.resize.oneImgFile.length) return;
                    if( flags.two != this.resize.secondImgFile.length) return;
                    if( flags.third != this.resize.thirdImgFile.length) return;
                    if( flags.four != this.resize.fourImgFile.length) return;
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
                        for(let i=0; i<this.resize.mainImgFile.length; i++){            // 主图
                            if(this.resize.mainImgFile[i]){
                                let random_name =res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.mainImgFile[i].name.split('.').pop()
                                client.multipartUpload(random_name, this.resize.mainImgFile[i]).then((results) => {
                                    const url = '//img0.oteao.com/'+ results.name;
                                    this.urls.main.push(url);
                                    flags.main++;
                                    isFlag(resolve,reject);
                                }).catch((err) => {
                                    flags.main++;
                                    isFlag(resolve,reject);
                                })
                            }else{
                                this.urls.main.push(this.resize.imgs.mainImg[i]);
                                flags.main++;
                                isFlag(resolve,reject);
                            }
                        }
                        for(let i=0; i<this.resize.oneImgFile.length; i++){            // 1图
                            if(this.resize.oneImgFile[i]){
                                let random_name = res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.oneImgFile[i].name.split('.').pop()
                                client.multipartUpload(random_name, this.resize.oneImgFile[i]).then((results) => {
                                    const url = '//img1.oteao.com/'+ results.name;
                                    this.urls.one.push(url);
                                    flags.one++;
                                    isFlag(resolve,reject);
                                }).catch((err) => {
                                    flags.one++;
                                    isFlag(resolve,reject);
                                })
                            }else{
                                this.urls.one.push(this.resize.imgs.detailImg1[i]);
                                flags.one++;
                                isFlag(resolve,reject);
                            }
                        }
                        for(let i=0; i<this.resize.secondImgFile.length; i++){            // 2图
                            if(this.resize.secondImgFile[i]){
                                let random_name = res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.secondImgFile[i].name.split('.').pop()
                                client.multipartUpload(random_name, this.resize.secondImgFile[i]).then((results) => {
                                    const url = '//img2.oteao.com/'+ results.name;
                                    this.urls.two.push(url);
                                    flags.two++;
                                    isFlag(resolve,reject);
                                }).catch((err) => {
                                    flags.two++;
                                    isFlag(resolve,reject);
                                })
                            }else{
                                this.urls.two.push(this.resize.imgs.detailImg2[i]);
                                flags.two++;
                                isFlag(resolve,reject);
                            }
                        }
                        for(let i=0; i<this.resize.thirdImgFile.length; i++){            // 3图
                            if(this.resize.thirdImgFile[i]){
                                let random_name = res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.thirdImgFile[i].name.split('.').pop()
                                client.multipartUpload(random_name, this.resize.thirdImgFile[i]).then((results) => {
                                    const url = '//img3.oteao.com/'+ results.name;
                                    this.urls.third.push(url);
                                    flags.third++;
                                    isFlag(resolve,reject);
                                }).catch((err) => {
                                    flags.third++;
                                    isFlag(resolve,reject);
                                })
                            }else{
                                this.urls.third.push(this.resize.imgs.detailImg3[i]);
                                flags.third++;
                                isFlag(resolve,reject);
                            }
                        }
                        for(let i=0; i<this.resize.fourImgFile.length; i++){            // 4图
                            if(this.resize.fourImgFile[i]){
                                let random_name = res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.fourImgFile[i].name.split('.').pop()
                                client.multipartUpload(random_name, this.resize.fourImgFile[i]).then((results) => {
                                    const url = '//img4.oteao.com/'+ results.name;
                                    this.urls.four.push(url);
                                    flags.four++;
                                    isFlag(resolve,reject);
                                }).catch((err) => {
                                    flags.four++;
                                    isFlag(resolve,reject);
                                })
                            }else{
                                this.urls.four.push(this.resize.imgs.imgsStep4[i])
                                flags.four++;
                                isFlag(resolve,reject);
                            }
                        }
                    })
                })
            },
            onlySave(stata) {
                let mainImg = [];
                for(let i=0;i<this.urls.main.length;i++){
                    mainImg.push({
                        imgUrl: this.urls.main[i]
                    })
                }
                let oneImg = {
                    title: '外形细节展示',
                    content: this.resize.textMs1,
                    imgArray: []
                };
                for(let obj of this.urls.one){
                    oneImg.imgArray.push({
                        imgUrl: obj
                    })
                }
                let twoImg = {
                    title: '汤色细节展示',
                    content: this.resize.textMs2,
                    imgArray: []
                }
                for(let obj of this.urls.two){
                    twoImg.imgArray.push({
                        imgUrl: obj
                    })
                }
                let threeImg = {
                    title: '叶底细节展示',
                    content: this.resize.textMs3,
                    imgArray: []
                }
                for(let obj of this.urls.third){
                    threeImg.imgArray.push({
                        imgUrl: obj
                    })
                }
                let fourImg = {
                    title: '其它细节展示',
                    content: this.resize.textMs4,
                    imgArray: [],
                };
                if(this.urls.four.length != 0){
                    for(let i=0;i<this.urls.four.length;i++){
                        fourImg.imgArray.push({
                            imgUrl: this.urls.four[i]
                        })
                    }
                }
                let allContent = {
                    oneImgContent: oneImg,
                    twoImgContent: twoImg,
                    threeImgContent: threeImg,
                    fourImgContent: fourImg
                }
                let data = {
                    "catProps": [],
                    "productDetails": [
                        {
                            "content": JSON.stringify(allContent),
                        }
                    ],
                    "productImgs": mainImg
                }
                for(let i=0;i<this.resize.proValList.length;i++){
                    if(this.resize.proValList[i].propValList.length === 0){
                        data.catProps.push({
                            propType: 2,
                            propId: this.resize.proValList[i].id,
                            propertyVal: this.resize.proValList[i].proVal
                        })
                    }else{
                        data.catProps.push({
                            propType: 1,
                            propId: this.resize.proValList[i].id,
                            propertyVal: this.resize.proValList[i].proVal,
                            propValId: this.resize.proValList[i].proValId
                        })
                    }
                }
                if(this.resize.selId.pp){
                    this.$api.post(`/oteao/productInfo/updateProductInfo` +
                        `?frontOrgProInfoDetailVo.proId=${ encodeURI(this.resize.mainId) }`+
                        `&frontOrgProInfoDetailVo.catId=${ encodeURI(this.resize.twoClass) }` +
                        `&frontOrgProInfoDetailVo.brandId=${ encodeURI(this.resize.selId.pp) }` +
                        `&frontOrgProInfoDetailVo.proName=${ encodeURI(this.resize.form.goodsName) }` +
                        `&frontOrgProInfoDetailVo.unint=${ encodeURI(this.resize.form.goodsDw) }` +
                        `&frontOrgProInfoDetailVo.weight=${ encodeURI(this.resize.form.goodsMz) }` +
                        `&frontOrgProInfoDetailVo.netWeight=${ encodeURI(this.resize.form.goodsJz) }` +
                        `&frontOrgProInfoDetailVo.reason=${ encodeURI(this.resize.form.goodsSell) }` +
                        `&frontOrgProInfoDetailVo.stockNum=${ encodeURI(this.resize.form.goodsKc) }` +
                        `&frontOrgProInfoDetailVo.proPrice=${ encodeURI(this.resize.form.goodsSx) }` +
                        `&frontOrgProInfoDetailVo.retailPrice=${encodeURI(this.resize.form.goodsPtsj) }` +
                        `&frontOrgProInfoDetailVo.isSaveOnShelf=${ encodeURI(stata) }`,JSON.stringify(data),res => {
                            this.sucFlag = true;
                            this.loading1 = false;
                            this.loading2 = false;
                            if(stata == 0){
                                this.sussTips = '修改成功！';
                            }else{
                                this.sussTips = '成功上架！';
                            }
                    },res=>{
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                }else{
                    this.$api.post(`/oteao/productInfo/updateProductInfo` +
                        `?frontOrgProInfoDetailVo.proId=${ encodeURI(this.resize.mainId) }`+
                        `&frontOrgProInfoDetailVo.catId=${ encodeURI(this.resize.twoClass) }` +
                        `&frontOrgProInfoDetailVo.proName=${ encodeURI(this.resize.form.goodsName) }` +
                        `&frontOrgProInfoDetailVo.unint=${ encodeURI(this.resize.form.goodsDw) }` +
                        `&frontOrgProInfoDetailVo.weight=${ encodeURI(this.resize.form.goodsMz) }` +
                        `&frontOrgProInfoDetailVo.netWeight=${ encodeURI(this.resize.form.goodsJz) }` +
                        `&frontOrgProInfoDetailVo.reason=${ encodeURI(this.resize.form.goodsSell) }` +
                        `&frontOrgProInfoDetailVo.stockNum=${ encodeURI(this.resize.form.goodsKc) }` +
                        `&frontOrgProInfoDetailVo.proPrice=${ encodeURI(this.resize.form.goodsSx) }` +
                        `&frontOrgProInfoDetailVo.retailPrice=${encodeURI(this.resize.form.goodsPtsj) }` +
                        `&frontOrgProInfoDetailVo.isSaveOnShelf=${ encodeURI(stata) }`,JSON.stringify(data),res => {
                            this.sucFlag = true;
                            this.loading1 = false;
                            this.loading2 = false;
                            if(stata == 0){
                                this.sussTips = '修改成功！';
                            }else{
                                this.sussTips = '成功上架！';
                            }
                    },res=>{
                        return this.$messageBox({
                            title:'提示',
                            message:res.errorMsg,
                            confirmButtonText: '我知道了'
                        })
                    })
                }
            },
            handleChangeMain(index) {
                this.changeIndex.main = index+1;
            },
            handleChangeOne(index) {
                this.changeIndex.one = index+1;
            },
            handleChangeTwo(index) {
                this.changeIndex.two = index+1;
            },
            handleChangeThree(index) {
                this.changeIndex.three = index+1;
            },
            handleChangeFour(index) {
                this.changeIndex.four = index+1;
            },
            //继续创建
            goCreated(){
                this.$store.commit('SET_RESIZE');
                this.$router.push({
                    name: '新品上架-1'
                });
            },
            //预览图片
            onPreview(type,e){
                console.log(str);
                if(e.target.files[0].size > 8*1024*1024) return Toast({
                    message: '图片不能超出8M哦~',
                    iconClass: 'icon icon-info'
                });
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                if(type === 'main'){
                    reader.onload = (e)=>{
                        this.resize.imgs.mainImg.push(e.target.result);
                    }
                    this.resize.mainImgFile.push(e.target.files[0]);
                }else if(type === 'one'){
                    reader.onload = (e)=>{
                        this.resize.imgs.detailImg1.push(e.target.result);
                    }
                    this.resize.oneImgFile.push(e.target.files[0]);
                }else if(type === 'two'){
                    reader.onload = (e)=>{
                        this.resize.imgs.detailImg2.push(e.target.result);
                    }
                    this.resize.secondImgFile.push(e.target.files[0]);
                }else if(type === 'three'){
                    reader.onload = (e)=>{
                        this.resize.imgs.detailImg3.push(e.target.result);
                    }
                    this.resize.thirdImgFile.push(e.target.files[0]);
                }else if(type === 'four'){
                    reader.onload = (e)=>{
                        this.resize.imgs.imgsStep4.push(e.target.result);
                    }
                    this.resize.fourImgFile.push(e.target.files[0]);
                }
            },
            goShopMange() {
                let state = this.$route.query.state;
                if(state == 'OFF_SHELF' && this.sussTips === '成功上架！'){
                    state == 'ON_SHELF';
                }else if(state == 'ON_SHELF' && this.sussTips === '修改成功！'){
                    state == 'ON_SHELF';
                }else if(state == 'OFF_SHELF' && this.sussTips === '修改成功！'){
                    state == 'OFF_SHELF';
                }
                this.$router.push({
                    name: '商品管理',
                    query: {
                        state: state
                    }
                })
            },
            //删除图片
            deleteImg(index,type){
                if(type === 'main'){
                    this.resize.imgs.mainImg.splice(index,1);
                    this.resize.mainImgFile.splice(index,1);
                }else if(type === 'one'){
                    this.resize.imgs.detailImg1.splice(index,1);
                    this.resize.oneImgFile.splice(index,1);
                }else if(type === 'two'){
                    this.resize.imgs.detailImg2.splice(index,1);
                    this.resize.secondImgFile.splice(index,1);
                }else if(type === 'three'){
                    this.resize.imgs.detailImg3.splice(index,1);
                    this.resize.thirdImgFile.splice(index,1);
                }else if(type === 'four'){
                    this.resize.imgs.imgsStep4.splice(index,1);
                    this.resize.fourImgFile.splice(index,1);
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
@import '~@/styles/seller/newshelves2.less';
</style>
