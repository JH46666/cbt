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
            <p class="color_9"><span class="color_f33">1-3项必须上传，</span>建议尺寸保持一致,单张图片小于8M</p>
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
                <h4><span class="serial-num">2</span>拒绝盗图，清晰展示商品内在细节,如茶汤</h4>
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
                <h4><span class="serial-num">3</span>拒绝盗图，清晰展示商品内在细节,如叶底</h4>
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
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入内在细节描述2，如叶底" v-model="resize.textMs4"></textarea>
            </div>
        </div>
        <div class="flex btns">
            <mt-button type="primary" @click="$router.go(-1)">上一步</mt-button>
            <mt-button type="primary" :disabled="disabledBol" @click="saveMethod('0')">保存</mt-button>
        </div>
        <div class="save-rackup">
            <mt-button type="primary" :disabled="disabledBol" @click="saveMethod('1')">保存并上架</mt-button>
        </div>
        <!-- 成功上架弹窗 -->
        <div class="popup suc_popup" v-show="sucFlag">
            <div class="popup_inner suc_inner">
                <div class="algin_c">
                    <p class="suc-tip">成功上架</p>
                </div>
                <div class="flex pop-btns">
                    <a class="flex-1 see" href="javascript:void(0);" @click="sucFlag = false">查看商品</a>
                    <a class="flex-1 go-on" href="javascript:void(0);" @click="goCreated">继续创建</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import { Toast } from 'mint-ui';
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
            if(process.env.NODE_ENV != 'development'){
                this.path = 'online_img/';
            }
            alert(process.env.NODE_ENV);
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
                this.doUpload(flag).then(() => {
                    this.onlySave(this.flag);
                })
            },
            doUpload (flag) {
                let flags =  {
                    main: 0,
                    one: 0,
                    two: 0,
                    third: 0,
                    four: 0
                }
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
                        }
                        for(let i=0; i<this.resize.oneImgFile.length; i++){            // 1图
                            let random_name = res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.oneImgFile[i].name.split('.').pop()
                            client.multipartUpload(random_name, this.resize.oneImgFile[i]).then((results) => {
                                const url = '//img0.oteao.com/'+ results.name;
                                this.urls.one.push(url);
                                flags.one++;
                                isFlag(resolve,reject);
                            }).catch((err) => {
                                flags.one++;
                                isFlag(resolve,reject);
                            })
                        }
                        for(let i=0; i<this.resize.secondImgFile.length; i++){            // 2图
                            let random_name = res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.secondImgFile[i].name.split('.').pop()
                            client.multipartUpload(random_name, this.resize.secondImgFile[i]).then((results) => {
                                const url = '//img0.oteao.com/'+ results.name;
                                this.urls.two.push(url);
                                flags.two++;
                                isFlag(resolve,reject);
                            }).catch((err) => {
                                flags.two++;
                                isFlag(resolve,reject);
                            })
                        }
                        for(let i=0; i<this.resize.thirdImgFile.length; i++){            // 3图
                            let random_name = res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.thirdImgFile[i].name.split('.').pop()
                            client.multipartUpload(random_name, this.resize.thirdImgFile[i]).then((results) => {
                                const url = '//img0.oteao.com/'+ results.name;
                                this.urls.third.push(url);
                                flags.third++;
                                isFlag(resolve,reject);
                            }).catch((err) => {
                                flags.third++;
                                isFlag(resolve,reject);
                            })
                        }
                        for(let i=0; i<this.resize.fourImgFile.length; i++){            // 4图
                            let random_name = res.data.basePath + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.fourImgFile[i].name.split('.').pop()
                            client.multipartUpload(random_name, this.resize.fourImgFile[i]).then((results) => {
                                const url = '//img0.oteao.com/'+ results.name;
                                this.urls.four.push(url);
                                flags.four++;
                                isFlag(resolve,reject);
                            }).catch((err) => {
                                flags.four++;
                                isFlag(resolve,reject);
                            })
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
                let oneImgContent = `<div class="mint_cell_img_title">茶韵展示</div><div class="mint_cell_img"><img src="${this.urls.one[0]}" /></div><p class="mint_cell_img_content">${this.resize.textMs1}</p>`;
                let twoImgContent = `<div class="mint_cell_img_title">茶韵展示</div><div class="mint_cell_img"><img src="${this.urls.two[0]}" /></div><p class="mint_cell_img_content">${this.resize.textMs2}</p>`;
                let threeImgContent = `<div class="mint_cell_img_title">茶韵展示</div><div class="mint_cell_img"><img src="${this.urls.third[0]}" /></div><p class="mint_cell_img_content">${this.resize.textMs3}</p>`
                let fourImgContent = '';
                if(this.urls.four.length != 0){
                    let fourStr = '';
                    for(let i=0;i<this.urls.four.length;i++){
                        fourStr += `<img src="${this.urls.four[i]}" />`
                    }
                    fourImgContent = `<div class="mint_cell_img_title">茶韵展示</div><div class="mint_cell_img">${fourStr}</div><p class="mint_cell_img_content">${this.resize.textMs4}</p>`
                }
                let data = {
                    "catProps": [],
                    "productDetails": [
                        {
                            "content": oneImgContent,
                        },
                        {
                            "content": twoImgContent,
                        },
                        {
                            "content": threeImgContent,
                        },
                        {
                            "content": fourImgContent,
                        }
                    ],
                    "productImgs": mainImg
                }
                if(this.resize.form.goodsXq != ''){
                    data.catProps.push({
                        propType: 2,
                        propName: '香气',
                        propertyVal: this.resize.form.goodsXq
                    })
                }
                if(this.resize.form.goodsZw != ''){
                    data.catProps.push({
                        propType: 2,
                        propName: '商品属性',
                        propertyVal: this.resize.form.goodsZw
                    })
                }
                if(this.resize.form.goodsGoodType != ''){
                    data.catProps.push({
                        propType: 2,
                        propName: '商品属性',
                        propertyVal: this.resize.form.goodsGoodType
                    })
                }
                if(this.resize.form.goodsJj != '') {
                    data.catProps.push({
                        propType: 2,
                        propName: '采摘季节',
                        propertyVal: this.resize.form.goodsJj
                    })
                }
                if(this.resize.form.goodsCd != '') {
                    data.catProps.push({
                        propType: 2,
                        propName: '产地',
                        propertyVal: this.resize.form.goodsCd
                    })
                }
                if(this.resize.form.goodsGg != '') {
                    data.catProps.push({
                        propType: 2,
                        propName: '规格',
                        propertyVal: this.resize.form.goodsGg
                    })
                }
                if(this.resize.form.goodsCc != '') {
                    data.catProps.push({
                        propType: 2,
                        propName: '存储方法',
                        propertyVal: this.resize.form.goodsCc
                    })
                }
                this.$api.post(`/oteaoProduct/createProductInfo
                    ?frontOrgProInfoDetailVo.catId=${ encodeURI(this.resize.twoClass) }
                    &frontOrgProInfoDetailVo.brandId=${ encodeURI(this.resize.selId.pp) }
                    &frontOrgProInfoDetailVo.proName=${ encodeURI(this.resize.form.goodsName) }
                    &frontOrgProInfoDetailVo.unint=${ encodeURI(this.resize.form.goodsDw) }
                    &frontOrgProInfoDetailVo.weight=${ encodeURI(this.resize.form.goodsMz) }
                    &frontOrgProInfoDetailVo.netWeight=${ encodeURI(this.resize.form.goodsJz) }
                    &frontOrgProInfoDetailVo.reason=${ encodeURI(this.resize.form.goodsSell) }
                    &frontOrgProInfoDetailVo.stockNum=${ encodeURI(this.resize.form.goodsKc) }
                    &frontOrgProInfoDetailVo.specifications=${ encodeURI(this.resize.form.goodsGg) }
                    &frontOrgProInfoDetailVo.proPrice=${ encodeURI(this.resize.form.goodsSx) }
                    &frontOrgProInfoDetailVo.retailPrice=${encodeURI(this.resize.form.goodsPtsj) }
                    &frontOrgProInfoDetailVo.isSaveOnShelf=${ encodeURI(stata) }`,JSON.stringify(data),res => {
                    console.log(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            },
            handleChangeThird(index) {
                this.thirdIndex = index+1;
            },
            handleChange(index) {
                this.mainIndex = index+1;
            },
            //继续创建
            goCreated(){
                this.$router.push({
                    name: '新品上架-1'
                });
            },
            //预览图片
            onPreview(str,e,ismain){
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
        }
    }
</script>
<style lang="less">
@import '~@/styles/seller/newshelves2.less';
</style>
