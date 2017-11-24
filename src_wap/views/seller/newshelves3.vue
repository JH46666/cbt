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
                    <input type="file" name="" value="" hidden>
                </label>
            </div>
        </div>
        <div class="floor detail-imgs">
            <h3>商品详情展示图片</h3>
            <p class="color_9"><span class="color_f33">1-3项必须上传，</span>建议尺寸保持一致,单张图片小于300kb</p>
            <h4><span class="serial-num">1</span>高清实拍，清晰展示商品外形细节</h4>
            <div class="upload-box">
                <label class="camera-bg">
                    <input type="file" name="" value="" hidden>
                </label>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        created(){

        },
        methods:{

        }
    }
</script>
<style lang="less">
    @import '~@/styles/seller/newshelves3.less';
</style>