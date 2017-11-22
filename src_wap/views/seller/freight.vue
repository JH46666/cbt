<template>
    <div class="freight_wrapper">
        <div class="caption flex">
            <p>全国包邮，除以下省份</p>
        </div>
        <div class="f5-2"></div>
        <div class="input-box">
            <div class="input-item">
                <div class="input-inner">
                    <span class="color_6">不包邮省份</span>
                    <div>
                        <input class="algin_r" type="text" name="" value="" placeholder="请选择" disabled>
                        <i class="iconfont color_ad r-select">&#xe744;</i>
                    </div>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner">
                    <span class="flex-1 color_6">首重(1kg)</span>
                    <input class="algin_r" type="text" name="" value="" placeholder="请输入首重运费">
                    <span>元</span>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner">
                    <span class="flex-1 color_6">续重（每增加1kg增加）</span>
                    <input class="algin_r" type="text" name="" value="" placeholder="请输入金额">
                    <span>元</span>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner no-border">
                    <span class="flex-1 color_6">购满包邮</span>
                    <input class="algin_r" type="text" name="" value="" placeholder="不填默认不包邮">
                    <span>元</span>
                </div>
            </div>
        </div>
        <div class="f5-2"></div>
        <div class="add-box">
            <a class="add-btns" href="javascript:void(0);"><i class="iconfont">&#xe67a;</i>添加指定省份运费</a>
        </div>
        <div class="save-box">
            <a class="add-btns" href="javascript:void(0);">保存</a>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                  
            }
        }
    }
</script> 
<style lang="less">
    @import '~@/styles/seller/freight.less';
</style>