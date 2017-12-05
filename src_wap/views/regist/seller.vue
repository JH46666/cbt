<template>
    <div class="seller_wrapper">
        <div class="t_txt"><p class="color_9">恭喜您成功注册，请填写以下资料等待审核，审核后才可以询价和下单，如需帮助，请拨打 400-996-3399</p></div>
        <div class="seller_content">
            <div class="shop_img">
                <a class="camera_box" @click="exampleFlag = !exampleFlag">
                    <img src="../../assets/images/camera_cirle.png" alt="">
                    <p>上传门店照片</p>
                </a>
                <div class="uploaded_box" style="display:none;">
                    <img class="shop" src="../../assets/images/shop_img.jpg" alt="">
                    <a class="small_camera" href="javascript:void(0);"><img src="../../assets/images/camera.png" alt=""></a>
                </div>
            </div>
            <div class="shop_info">
                    <form>
                        <div class="form_item">
                            <div class="flex align_items_end">
                                <label for="">登录账号</label>
                                <input class="flex-1" type="text" name="" value="18720989159" disabled>
                            </div>
                            <p class="error_txt"></p>
                        </div>
                        <div class="form_item">
                            <div class="flex align_items_end error_color">
                                <label for="">店铺名称</label>
                                <input class="flex-1" type="text" name="" value="" placeholder="请填写店铺名称">
                            </div>
                            <p class="error_txt">你错了你错了</p>
                        </div>
                        <div class="form_item">
                            <div class="flex align_items_end">
                                <label for="">联系人</label>
                                <input class="flex-1" type="text" name="" value="" placeholder="请填写联系人姓名">
                            </div>
                            <p class="error_txt"></p>
                        </div>
                        <div class="form_item">
                            <div class="flex align_items_end">
                                <label for="">地区</label>
                                <input class="flex-1" type="text" name="" value="" placeholder="请选择地区">
                                <a href="javascript:void(0);"><i class="iconfont">&#xe619;</i></a>
                            </div>
                            <p class="error_txt"></p>
                        </div>
                        <div class="form_item">
                            <div class="flex align_items_end">
                                <label for="">店铺地址</label>
                                <input class="flex-1" type="text" name="" value="" placeholder="请填写详细店铺地址">
                            </div>
                            <p class="error_txt"></p>
                        </div>
                    </form>
            </div>
            <mt-button size="large" type="primary">确定</mt-button>
            <div class="go_index"><router-link to="/home">去首页</router-link></div>
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
                    <a class="flex-1 upload" href="javascript:void(0);">上传</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
               exampleFlag: false,    //首次点传图出现弹窗
            }
        },
        methods:{
        }

    }
</script>
<style lang="less">
    @import '~@/styles/regist/seller.less';
</style>
