<template>
    <div class="newshelves3_wrapper">
        <div class="floor main-imgs">
            <h3>商品图片</h3>
            <p class="color_9"><span class="color_f33">1-5张，</span>建议800*800像素，单张图片小于8M的清晰商品照片</p>
            <div class="main-img-box" :class="{on: resize.mainImg.length>0}">
                <mt-swipe :show-indicators="false" :auto="0" @change="handleChange">
                    <mt-swipe-item  v-for="(item,index) in resize.mainImg" :key="index">
                        <img :src="item.imgSrc" />
                        <div v-show="item.imgSrc">
                            <a class="delete-btn" href="javascript: void(0);" @click="deleteImg(index,true)"><i class="iconfont">&#xe651;</i></a>
                            <div class="small-camera">
                                <label>
                                    <img src="../../assets/images/camera.png" />
                                    <input type="file" accept="image/*" hidden @change="onPreview(index,$event,true)">
                                </label>
                            </div>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
                <div class="len_num">
                    <span>{{ mainIndex }}</span>/{{ resize.mainImg.length }}
                </div>
            </div>
            <div class="upload-box" v-if="resize.mainImg.length<5">
                <label class="camera-bg">
                    <input type="file" accept="image/*" hidden @change="onPreview('main_img',$event,true)">
                </label>
            </div>
        </div>
        <div class="floor detail-imgs">
            <h3>商品详情展示图片</h3>
            <p class="color_9"><span class="color_f33">1-3项必须上传，</span>建议尺寸保持一致，单张图片小于8M</p>
            <div class="upload-step">
                <h4><span class="serial-num">1</span>高清实拍，清晰展示商品外形细节</h4>
                <div class="flex example-box">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg" v-show="resize.imgs.detailImg1==''">
                            <input type="file" accept="image/*" hidden @change="onPreview('detailImg1',$event)">
                        </label>
                        <div class="one-img"><img :src="resize.imgs.detailImg1" /></div>
                        <div v-show="resize.imgs.detailImg1!=''">
                            <a class="delete-btn" href="javascript: void(0);" @click="deleteImg('detailImg1')"><i class="iconfont">&#xe651;</i></a>
                            <div class="small-camera">
                                <label>
                                    <img src="../../assets/images/camera.png" />
                                    <input type="file" accept="image/*" hidden @change="onPreview('detailImg1',$event)">
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <img src="../../assets/upload-eg1.jpg" />
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入外形描述" v-model="resize.textMs1"></textarea>
            </div>
            <div class="upload-step">
                <h4><span class="serial-num">2</span>拒绝盗图，清晰展示商品内在细节，如茶汤</h4>
                <div class="flex example-box">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg" v-show="resize.imgs.detailImg2==''">
                            <input type="file" accept="image/*" hidden @change="onPreview('detailImg2',$event)">
                        </label>
                        <div class="one-img"><img :src="resize.imgs.detailImg2" alt=""></div>
                        <div v-show="resize.imgs.detailImg2!=''">
                            <a class="delete-btn" href="javascript: void(0);" @click="deleteImg('detailImg2')"><i class="iconfont">&#xe651;</i></a>
                            <div class="small-camera">
                                <label>
                                    <img src="../../assets/images/camera.png" />
                                    <input type="file" accept="image/*" hidden @change="onPreview('detailImg2',$event)">
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <img src="../../assets/upload-eg2.jpg" />
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入内在细节描述1，如茶汤" v-model="resize.textMs2"></textarea>
            </div>
            <div class="upload-step">
                <h4><span class="serial-num">3</span>拒绝盗图，清晰展示商品内在细节，如叶底</h4>
                <div class="flex example-box">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg" v-show="resize.imgs.detailImg3==''">
                            <input type="file" accept="image/*" hidden @change="onPreview('detailImg3',$event)">
                        </label>
                        <div class="one-img"><img :src="resize.imgs.detailImg3" /></div>
                        <div v-show="resize.imgs.detailImg3!=''">
                            <a class="delete-btn" href="javascript: void(0);" @click="deleteImg('detailImg3')"><i class="iconfont">&#xe651;</i></a>
                            <div class="small-camera">
                                <label>
                                    <img src="../../assets/images/camera.png" />
                                    <input type="file" accept="image/*" hidden @change="onPreview('detailImg3',$event)">
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <img src="../../assets/upload-eg3.jpg" />
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入内在细节描述2，如叶底" v-model="resize.textMs3"></textarea>
            </div>
            <div class="upload-step up-step4">
                <h4><span class="serial-num">4</span>其他商品细节，最多可再上传<span class="color_f33">3</span>张</h4>
                <div class="step4-img-box" :class="{on: resize.imgsStep4.length > 0}">
                    <mt-swipe :show-indicators="false" :auto="0" @change="handleChangeThird">
                        <mt-swipe-item  v-for="(item,index) in resize.imgsStep4" :key="index">
                            <img :src="item.imgSrc" />
                            <div v-show="item.imgSrc">
                                <a class="delete-btn" href="javascript: void(0);" @click="deleteImg(index)"><i class="iconfont">&#xe651;</i></a>
                                <div class="small-camera">
                                    <label>
                                        <img src="../../assets/images/camera.png" />
                                        <input type="file" accept="image/*" hidden @change="onPreview(index,$event)">
                                    </label>
                                </div>
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                    <div class="len_num">
                        <span>{{ thirdIndex }}</span>/{{ resize.imgsStep4.length }}
                    </div>
                </div>
                <div class="flex example-box" v-if="resize.imgsStep4.length<3">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg">
                            <input type="file" accept="image/*" hidden @change="onPreview(resize.imgsStep4.length,$event)">
                        </label>
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入其他商品细节" v-model="resize.textMs4"></textarea>
            </div>
        </div>
        <div class="flex btns">
            <mt-button type="primary" @click="$router.go(-1)">上一步</mt-button>
            <mt-button type="primary" :disabled="disabledBol" @click="saveMethod('0')">保存</mt-button>
        </div>
        <div class="save-rackup" v-if="onlySaveBtn">
            <mt-button type="primary" :disabled="disabledBol" @click="saveMethod('1')">保存并上架</mt-button>
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
                mainIndex: 1,
                thirdIndex: 1,
                ossImg: [],
                region: 'oss-cn-hangzhou',
                bucket: 'imgcbt',
                urlList: [],
                urls: {
                    main: [],
                    one: [],
                    two: [],
                    third: [],
                    four: []
                },
                path: 'test_path/',
                flag: 0,
                sussTips: '成功上架！',
                onlySaveBtn: false,
            }
        },
        computed:{
            imgsStep4Len(){
                if(this.resize.imgsStep4.length>0){
                    return true;
                }else{
                    return false;
                }
            },
            ...mapGetters([
                'resize'
            ]),
            disabledBol() {
                if(this.resize.mainImg.length>0 && this.resize.imgs.detailImg1!= '' && this.resize.imgs.detailImg2!= '' && this.resize.imgs.detailImg3!= '' && this.resize.textMs1 != ''&& this.resize.textMs2 != ''&& this.resize.textMs3 != ''){
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
            this.urls.one = [this.resize.imgs.detailImg1];
            this.urls.two = [this.resize.imgs.detailImg2];
            this.urls.third = [this.resize.imgs.detailImg3];
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
                                this.urls.main.push(this.resize.mainImg[i].imgSrc);
                                flags.main++;
                                isFlag(resolve,reject);
                            }
                        }
                        for(let i=0; i<this.resize.oneImgFile.length; i++){            // 1图
                            if(this.resize.oneImgFile[i]){
                                let random_name = res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.oneImgFile[i].name.split('.').pop()
                                client.multipartUpload(random_name, this.resize.oneImgFile[i]).then((results) => {
                                    const url = '//img1.oteao.com/'+ results.name;
                                    this.urls.one = [url];
                                    flags.one++;
                                    isFlag(resolve,reject);
                                }).catch((err) => {
                                    flags.one++;
                                    isFlag(resolve,reject);
                                })
                            }else{
                                flags.one++;
                                isFlag(resolve,reject);
                            }
                        }
                        for(let i=0; i<this.resize.secondImgFile.length; i++){            // 2图
                            if(this.resize.secondImgFile[i]){
                                let random_name = res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.secondImgFile[i].name.split('.').pop()
                                client.multipartUpload(random_name, this.resize.secondImgFile[i]).then((results) => {
                                    const url = '//img2.oteao.com/'+ results.name;
                                    this.urls.two = [url];
                                    flags.two++;
                                    isFlag(resolve,reject);
                                }).catch((err) => {
                                    flags.two++;
                                    isFlag(resolve,reject);
                                })
                            }else{
                                flags.two++;
                                isFlag(resolve,reject);
                            }
                        }
                        for(let i=0; i<this.resize.thirdImgFile.length; i++){            // 3图
                            if(this.resize.thirdImgFile[i]){
                                let random_name = res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.thirdImgFile[i].name.split('.').pop()
                                client.multipartUpload(random_name, this.resize.thirdImgFile[i]).then((results) => {
                                    const url = '//img3.oteao.com/'+ results.name;
                                    this.urls.third = [url];
                                    flags.third++;
                                    isFlag(resolve,reject);
                                }).catch((err) => {
                                    flags.third++;
                                    isFlag(resolve,reject);
                                })
                            }else{
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
                                this.urls.four.push(this.resize.imgsStep4[i])
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
                let oneImgContent = {
                    imgUrl: [this.urls.one[0]],
                    content: this.resize.textMs1
                }
                let twoImgContent = {
                    imgUrl: [this.urls.two[0]],
                    content: this.resize.textMs2
                }
                let threeImgContent = {
                    imgUrl: [this.urls.third[0]],
                    content: this.resize.textMs3
                }
                let fourImgContent = {
                    imgUrl: [],
                    content: this.resize.textMs4
                };
                if(this.urls.four.length != 0){
                    for(let i=0;i<this.urls.four.length;i++){
                        fourImgContent.imgUrl.push(this.urls.four[i])
                    }
                }
                let allContent = {
                    oneImgContent: oneImgContent,
                    twoImgContent: twoImgContent,
                    threeImgContent: threeImgContent,
                    fourImgContent: fourImgContent
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
                            if(stata == 0){
                                this.sussTips = '修改成功！';
                            }else{
                                this.sussTips = '成功上架！';
                            }
                    },res=>{
                        MessageBox('提示', res.errorMsg);
                    })
                }
            },
            handleChangeThird(index) {
                this.thirdIndex = index+1;
            },
            handleChange(index) {
                this.mainIndex = index+1;
            },
            //继续创建
            goCreated(){
                this.$store.commit('SET_RESIZE');
                this.$router.push({
                    name: '新品上架-1'
                });
            },
            //预览图片
            onPreview(str,e,ismain){
                console.log(str);
                if(e.target.files[0].size > 8*1024*1024) return Toast({
                    message: '图片不能超出8M哦~',
                    iconClass: 'icon icon-info'
                });
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                if(ismain){
                    reader.onload = (e)=>{
                        if(this.resize.mainImg.length>str){
                            this.resize.mainImg[str].imgSrc = e.target.result;
                        }else{
                            this.resize.mainImg.push({'imgSrc':e.target.result});
                        }
                    }
                    if(this.resize.mainImg.length>str){
                        this.resize.mainImgFile[str] = e.target.files[0];
                    }else{
                        this.resize.mainImgFile.push(e.target.files[0])
                    }
                }else{
                    if(typeof str === 'string'){
                        reader.onload = (e)=>{
                            this.resize.imgs[str] = e.target.result;
                        }
                        if(str === 'detailImg1'){
                            this.resize.oneImgFile[0] = e.target.files[0];
                        }else if(str === 'detailImg2'){
                            this.resize.secondImgFile[0] = e.target.files[0];
                        }else if(str === 'detailImg3'){
                            this.resize.thirdImgFile[0] = e.target.files[0];
                        }
                    }else if(typeof str === 'number'){
                        reader.onload = (e)=>{
                            if(this.resize.imgsStep4.length>str){
                                this.resize.imgsStep4[str].imgSrc = e.target.result;
                            }else{
                                this.resize.imgsStep4.push({'imgSrc':e.target.result});
                            }
                        }
                        if(this.resize.imgsStep4.length>str){
                            this.resize.fourImgFile[str] = e.target.files[0];
                        }else{
                            this.resize.fourImgFile.push(e.target.files[0]);
                        }
                    }
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
            deleteImg(arg,ismain){
                if(ismain){
                    this.resize.mainImg.splice(arg,1);
                    this.resize.mainImgFile.splice(arg,1);
                }else{
                    if(typeof arg === 'string'){
                        this.resize.imgs[arg] = '';
                        if(arg === 'detailImg1'){
                            this.resize.oneImgFile = [];
                        }else if(arg === 'detailImg2'){
                            this.resize.secondImgFile = [];
                        }else if(arg === 'detailImg3'){
                            this.resize.thirdImgFile = [];
                        }
                    }else if(typeof arg === 'number'){
                        this.resize.imgsStep4.splice(arg,1);
                        this.resize.fourImgFile.splice(arg,1);
                    }
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
