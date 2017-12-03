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
            <mt-button type="primary" :disabled="disabledBol" @click="onlySave">保存</mt-button>
        </div>
        <div class="save-rackup">
            <mt-button type="primary" :disabled="disabledBol">保存并上架</mt-button>
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
<script src="http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js"></script>
<script>
import {mapGetters} from 'vuex';
import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                sucFlag: true,         //是否成功上架
                mainIndex: 1,
                thirdIndex: 1,
                ossImg: [],
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
            var ossData = new FormData();
            ossData.append('OSSAccessKeyId','obj.accessid');
            console.log(ossData);
        },
        methods:{

            onlySave() {
                this.postImg('img').then((res) => {
                    var ossObj = res.data;
                    for(let i=0;i<this.resize.allImg.length;i++){
                        let datas = this.ossMethod(ossObj,this.resize.allImg[i]);
                        this.postOss(datas,ossObj.host);
                    }
                })
            },
            ossMethod(obj,filename) {
                var ossData = new FormData();
                ossData.append('OSSAccessKeyId',obj.accessid);
                ossData.append('policy', obj.policy);
                ossData.append('Signature', obj.signature);
                ossData.append('key', obj.dir + '/' +);
                ossData.append('file', );
                return ossData;
            },
            postOss(data,url) {
                // return new Promise((resolve,reject) => {
                    this.$api.post(url,data,res => {
                        console.log(res)
                    },res=>{
                        console.log(res)
                    })
                // })
            },
            postImg(path) {
                let data = {
                        path: path
                    }
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
                this.resize.allImg.push(e.target.files[0].name)
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
                }else{
                    if(typeof str === 'string'){
                        reader.onload = (e)=>{
                            this.resize.imgs[str] = e.target.result;
                        }
                    }else if(typeof str === 'number'){
                        reader.onload = (e)=>{
                            if(this.resize.imgsStep4.length>str){
                                this.resize.imgsStep4[str].imgSrc = e.target.result;
                            }else{
                                this.resize.imgsStep4.push({'imgSrc':e.target.result});
                            }
                        }
                    }
                }
            },
            //删除图片
            deleteImg(arg,ismain){
                if(ismain){
                    this.resize.mainImg.splice(arg,1);
                }else{
                    if(typeof arg === 'string'){
                        this.resize.imgs[arg] = '';
                    }else if(typeof arg === 'number'){
                        this.resize.imgsStep4.splice(arg,1);
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    @import '~@/styles/seller/newshelves2.less';
</style>
