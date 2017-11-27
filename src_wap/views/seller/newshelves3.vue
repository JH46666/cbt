<template>
    <div class="newshelves3_wrapper">
        <div class="shelves_step">
            <div class="step">
                <span>1</span>选择品类
            </div>
            <div class="step">
                <span>2</span>填写信息
            </div>
            <div class="step">
                <span>3</span>上传图片
            </div>
        </div>
        <div class="floor main-imgs">
            <h3>商品图片</h3>
            <p class="color_9"><span class="color_f33">1-10张，</span>建议800*800像素，单张图片小于1M的清晰商品照片</p>
            <div class="main-img-box" v-for="(item,index) in mainImg">
                <img :src="item.imgSrc" alt="" :key="index">
                <div v-show="item.imgSrc">
                    <a class="delete-btn" href="javascript: void(0);" @click="deleteImg(index,true)"><i class="iconfont">&#xe651;</i></a>
                    <div class="small-camera">
                        <label>
                            <img src="../../assets/images/camera.png" alt="">
                            <input type="file" name="" value="" accept="image/*" hidden @change="onPreview(index,$event,true)">
                        </label>
                    </div>
                </div>
            </div>
            <div class="upload-box" v-if="mainImg.length<10">
                <label class="camera-bg">
                    <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('main_img',$event,true)">
                </label>
            </div>
        </div>
        <div class="floor detail-imgs">
            <h3>商品详情展示图片</h3>
            <p class="color_9"><span class="color_f33">1-3项必须上传，</span>建议尺寸保持一致,单张图片小于300kb</p>
            <div class="upload-step">
                <h4><span class="serial-num">1</span>高清实拍，清晰展示商品外形细节</h4>
                <div class="flex example-box">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg" v-show="imgs.detailImg1==''">
                            <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detailImg1',$event)">
                        </label>
                        <div class="one-img"><img :src="imgs.detailImg1" alt=""></div>
                        <div v-show="imgs.detailImg1!=''">
                            <a class="delete-btn" href="javascript: void(0);" @click="deleteImg('detailImg1')"><i class="iconfont">&#xe651;</i></a>
                            <div class="small-camera">
                                <label>
                                    <img src="../../assets/images/camera.png" alt="">
                                    <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detailImg1',$event)">
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <img src="../../assets/upload-eg1.jpg" alt="">
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入外形描述"></textarea>
            </div>
            <div class="upload-step">
                <h4><span class="serial-num">2</span>拒绝盗图，清晰展示商品内在细节,如茶汤</h4>
                <div class="flex example-box">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg" v-show="imgs.detailImg2==''">
                            <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detailImg2',$event)">
                        </label>
                        <div class="one-img"><img :src="imgs.detailImg2" alt=""></div>
                        <div v-show="imgs.detailImg2!=''">
                            <a class="delete-btn" href="javascript: void(0);" @click="deleteImg('detailImg2')"><i class="iconfont">&#xe651;</i></a>
                            <div class="small-camera">
                                <label>
                                    <img src="../../assets/images/camera.png" alt="">
                                    <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detailImg2',$event)">
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <img src="../../assets/upload-eg2.jpg" alt="">
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入内在细节描述1，如茶汤"></textarea>
            </div>
            <div class="upload-step">
                <h4><span class="serial-num">3</span>拒绝盗图，清晰展示商品内在细节,如叶底</h4>
                <div class="flex example-box">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg" v-show="imgs.detailImg3==''">
                            <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detailImg3',$event)">
                        </label>
                        <div class="one-img"><img :src="imgs.detailImg3" alt=""></div>
                        <div v-show="imgs.detailImg3!=''">
                            <a class="delete-btn" href="javascript: void(0);" @click="deleteImg('detailImg3')"><i class="iconfont">&#xe651;</i></a>
                            <div class="small-camera">
                                <label>
                                    <img src="../../assets/images/camera.png" alt="">
                                    <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detailImg3',$event)">
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <img src="../../assets/upload-eg3.jpg" alt="">
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入内在细节描述2，如叶底"></textarea>
            </div>
            <div class="upload-step up-step4">
                <h4><span class="serial-num">4</span>其他商品细节，最多可再上传<span class="color_f33">3</span>张</h4>
                <div class="step4-img-box" v-for="(item,index) in imgsStep4">
                    <img :src="item.imgSrc" alt="" :key="index">
                    <div v-show="item.imgSrc">
                        <a class="delete-btn" href="javascript: void(0);" @click="deleteImg(index)"><i class="iconfont">&#xe651;</i></a>
                        <div class="small-camera">
                            <label>
                                <img src="../../assets/images/camera.png" alt="">
                                <input type="file" name="" value="" accept="image/*" hidden @change="onPreview(index,$event)">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="flex example-box" v-if="imgsStep4.length<3">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg">
                            <input type="file" name="" value="" accept="image/*" hidden @change="onPreview(imgsStep4.length,$event)">
                        </label>
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入内在细节描述2，如叶底"></textarea>
            </div>
        </div>
        <div class="flex btns">
            <a class="flex-1 go-step2" href="javascript:void(0);" @click="$router.go(-1)">上一步</a>
            <a class="flex-1 save" href="javascript:void(0);">保存</a>
        </div>
        <div class="save-rackup"><a href="javascript:void(0);">保存并上架</a></div>
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
    export default{
        data(){
            return {
                imgs:{
                    detailImg1: '',     //详情图片1   
                    detailImg2: '',     //详情图片2   
                    detailImg3: '',     //详情图片3   
                },
                mainImg: [],            //主图
                imgsStep4:[],           //详情4      
                sucFlag: true,         //是否成功上架
            }
        },
        created(){

        },
        computed:{
            imgsStep4Len(){
                if(this.imgsStep4.length>0){
                    return true;
                }else{
                    return false;
                }
            },
        },
        methods:{
            //继续创建
            goCreated(){
                this.$router.push('/seller/newshelves-1');
            },
            //预览图片
            onPreview(str,e,ismain){
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                if(ismain){
                    reader.onload = (e)=>{
                        if(this.mainImg.length>str){
                            this.mainImg[str].imgSrc = e.target.result;
                        }else{
                            this.mainImg.push({'imgSrc':e.target.result});
                        }
                    }
                }else{
                    if(typeof str === 'string'){
                        reader.onload = (e)=>{
                            this.imgs[str] = e.target.result;
                        }
                    }else if(typeof str === 'number'){
                        reader.onload = (e)=>{
                            if(this.imgsStep4.length>str){
                                this.imgsStep4[str].imgSrc = e.target.result;
                            }else{
                                this.imgsStep4.push({'imgSrc':e.target.result});
                            }
                        }
                    }
                }
                
            },
            //删除图片
            deleteImg(arg,ismain){
                if(ismain){
                    this.mainImg.splice(arg,1);
                }else{
                    if(typeof arg === 'string'){
                        this.imgs[arg] = '';
                    }else if(typeof arg === 'number'){
                        this.imgsStep4.splice(arg,1);
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    @import '~@/styles/seller/newshelves3.less';
</style>