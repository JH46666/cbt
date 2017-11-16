<template>
    <div class="seller_wrapper">
        <div class="t_txt"><p class="color_9">恭喜您成功注册，请填写以下资料等待审核，审核后才可以询价和下单，如需帮助，请拨打 400-996-3399</p></div>
        <div class="seller_content">
            <div class="shop_img">
                <div class="camera_box">
                    <img src="../../assets/images/camera_cirle.png" alt="">
                    <p>上传门店照片</p>
                </div>
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
                            <p style="color:#ff3600;margin-top:.05rem;"></p>
                        </div>
                        <div class="form_item">
                            <div class="flex align_items_end error_color">
                                <label for="">店铺名称</label>
                                <input class="flex-1" type="text" name="" value="茶叶店" placeholder="请填写店铺名称">
                            </div>
                            <p style="color:#ff3600;margin-top:.05rem;">你错了你错了</p>
                        </div>
                        <div class="form_item">
                            <div class="flex align_items_end">
                                <label for="">联系人</label>
                                <input class="flex-1" type="text" name="" value="陈喂喂" placeholder="请填写联系人姓名">
                            </div>
                            <p style="color:#ff3600;margin-top:.05rem;"></p>
                        </div>
                        <div class="form_item">
                            <div class="flex align_items_end">
                                <label for="">地区</label>
                                <input class="flex-1" type="text" name="" value="福建/厦门/思明区" placeholder="请选择地区">
                                <a href="javascript:void(0);"><i class="iconfont">&#xe619;</i></a>
                            </div>
                            <p style="color:#ff3600;margin-top:.05rem;"></p>
                        </div>
                        <div class="form_item">
                            <div class="flex align_items_end">
                                <label for="">店铺地址</label>
                                <input class="flex-1" type="text" name="" value="江苏省苏州市姑苏区金阊新城虎殿路1999号中海御景湾25-3108" placeholder="请填写详细店铺地址">
                            </div>
                            <p style="color:#ff3600;margin-top:.05rem;"></p>
                        </div>
                    </form>
            </div>
            <mt-button size="large" type="primary">确定</mt-button>
            <div class="go_index"><a href="javascript:void(0);">去首页</a></div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
               
            }
        },
        methods:{
        }

    }
</script>
<style lang="less">
    @import '~@/styles/regist/seller.less';
</style>