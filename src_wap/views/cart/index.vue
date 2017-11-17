<template>
    <div class="cart_wrapper">
        <div class="edit_floor"><a href="javascript:void(0);">编辑</a></div>
        <div class="product_floor">
            <!-- 商品分组 -->
            <div class="group normal_product">
                <!-- 所属店铺 -->
                <div class="flex">
                    <div class="left_check flex">
                        <p><input type="checkbox" name="" id="a1" hidden><label for="a1"></label></p>
                    </div>
                    <div><img src="../../assets/images/small_logo.png" alt=""></div>
                    <p>自营</p>
                </div>
                <!-- 商品 -->
                <!-- <div class="pro-item flex">
                    <div class="left-check flex">
                        <p><input type="checkbox" name="" id="a1" hidden><label for="a1"></label></p>
                    </div>
                    <div class="right-info zuipin-section">
                        <div class="pro-info flex">
                            <div class="pro-img">
                                <a href="##"><img src="" alt=""></a>
                            </div>
                            <div class="zuipin-section pro-detail">
                                <a href="##">
                                    <h3>醉品朴茶黄山毛峰2016明前茶绿茶特级真朴</h3>
                                    <div class="info-bot clearfix">
                                        <span class="pro-price">￥342.00</span>
                                        <span class="pro-number clearfix"><span class="decrease">-</span><input class="input-num" type="text" value="1"><span class="plus">+</span></span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="pro-delete"><a href="##"><i class="iconfont">&#xe60d;</i></a></div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
    export default {
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
@import '~@/styles/less/cart.less';
</style>