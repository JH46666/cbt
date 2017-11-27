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
            <div class="upload-box">
                <label class="camera-bg">
                    <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('main_img',$event)">
                </label>
                <div class="one-img"><img :src="imgs.main_img" alt=""></div>
                <div class="small-camera" v-show="imgs.main_img!=''">
                    <label>
                        <img src="../../assets/images/camera.png" alt="">
                        <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('main_img',$event)">
                    </label>
                </div>
            </div>
        </div>
        <div class="floor detail-imgs">
            <h3>商品详情展示图片</h3>
            <p class="color_9"><span class="color_f33">1-3项必须上传，</span>建议尺寸保持一致,单张图片小于300kb</p>
            <div class="upload-step">
                <h4><span class="serial-num">1</span>高清实拍，清晰展示商品外形细节</h4>
                <div class="flex example-box">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg">
                            <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detail_img1',$event)">
                        </label>
                        <div class="one-img"><img :src="imgs.detail_img1" alt=""></div>
                        <div class="small-camera" v-show="imgs.detail_img1!=''">
                            <label>
                                <img src="../../assets/images/camera.png" alt="">
                                <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detail_img1',$event)">
                            </label>
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
                        <label class="camera-bg">
                            <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detail_img2',$event)">
                        </label>
                        <div class="one-img"><img :src="imgs.detail_img2" alt=""></div>
                        <div class="small-camera" v-show="imgs.detail_img2!=''">
                            <label>
                                <img src="../../assets/images/camera.png" alt="">
                                <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detail_img2',$event)">
                            </label>
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
                        <label class="camera-bg">
                            <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detail_img3',$event)">
                        </label>
                        <div class="one-img"><img :src="imgs.detail_img3" alt=""></div>
                        <div class="small-camera" v-show="imgs.detail_img3!=''">
                            <label>
                                <img src="../../assets/images/camera.png" alt="">
                                <input type="file" name="" value="" accept="image/*" hidden @change="onPreview('detail_img3',$event)">
                            </label>
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
                <div class="step4-img-box" v-for="(item,index) in imgs_step4">
                    <img :src="item.imgSrc" alt="" :key="index">
                    <div class="small-camera" v-show="item.imgSrc">
                        <label>
                            <img src="../../assets/images/camera.png" alt="">
                            <input type="file" name="" value="" accept="image/*" hidden @change="onPreview(index,$event)">
                        </label>
                    </div>
                </div>
                <div class="flex example-box" v-if="imgs_step4.length<3">
                    <div class="flex-1 upload-box">
                        <label class="camera-bg">
                            <input type="file" name="" value="" accept="image/*" hidden @change="onPreview(imgs_step4.length,$event)">
                        </label>
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入内在细节描述2，如叶底"></textarea>
            </div>
        </div>
        <div class="flex btns">
            <a class="flex-1 go-step2" href="/seller/newshelves-2">上一步</a>
            <a class="flex-1 save" href="javascript:void(0);">保存</a>
        </div>
        <div class="save-rackup"><a href="javascript:void(0);">保存并上架</a></div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                imgs:{
                    main_img: '',        //主图
                    detail_img1: '',     //详情图片1   
                    detail_img2: '',     //详情图片2   
                    detail_img3: '',     //详情图片3   
                    detail_img4: '',     //详情图片4   
                },
                imgs_step4:[],
                // imgs_step4:[{aa:'dfsdfs'},{aa:'dfsdfs'}],
                
            }
        },
        created(){

        },
        computed:{
            imgsStep4Len(){
                if(this.imgs_step4.length>0){
                    return true;
                }else{
                    return false;
                }
            },
        },
        methods:{
            onPreview(str,e){
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                if(typeof str === 'string'){
                    reader.onload = (e)=>{
                        this.imgs[str] = e.target.result;
                    }
                }else if(typeof str === 'number'){
                    reader.onload = (e)=>{
                        if(this.imgs_step4.length>str){
                            this.imgs_step4[str].imgSrc = e.target.result;
                        }else{
                            this.imgs_step4.push({'imgSrc':e.target.result});
                        }
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    @import '~@/styles/seller/newshelves3.less';
</style>