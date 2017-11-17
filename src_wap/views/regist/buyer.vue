<template>
    <div class="set_wrapper">
        <div class="logo_img"><img src="../../assets/images/logo.png" alt=""></div>
        <div>
            <!-- 表单 -->
            <form action="" class="form_wrapper">
                <div class="form_item">
                    <input type="text" placeholder="手机号码" v-model="regInfo.phone" maxlength="11">
                    <label class="fl"></label>
                </div>
                <div class="form_item">
                    <div class="flex">
                        <input class="mes_code" type="text" placeholder="短信验证码" v-model="regInfo.mesCode">
                        <a class="get_code" @click="verifyFlag = true">获取短信验证码</a>
                    </div>
                    <label class="fl"></label>
                </div>
                <div class="form_item">
                    <input v-if="visFlag" type="text" placeholder="设置6-16位登录密码" v-model="regInfo.pwd" maxlength="11">
                    <input v-else type="password" placeholder="设置6-16位登录密码" v-model="regInfo.pwd">
                    <a @click="visFlag = !visFlag" class="vis_flag color_ad"><i class="iconfont" :class="{'icon-xianshimima': visFlag,'icon-yincangmima': !visFlag}"></i></a>
                    <label class="fl"></label>
                </div>
                <mt-button size="large" type="primary">立即注册</mt-button>
                <p class="color_9">点击 立即注册 即表示您同意遵守茶帮通 <a href="javascript:void(0);" class="color_f08">用户协议</a> 和 <a href="javascript:void(0);" class="color_f08">隐私政策</a></p>
            </form>
        </div>
        <!-- 验证码弹窗 -->
        <div class="popup verify_popup" v-show="verifyFlag">
            <div class="popup_inner verify_inner">
                <a class="close_popup" @click="verifyFlag = !verifyFlag"><i class="iconfont">&#xe79a;</i></a>
                <p class="error_tips"><i class="iconfont">&#xe667;</i>输入的验证码有误</p>
                <div class="flex img_box">
                    <div class="img_code"><img src="../../assets/images/code_img.png" alt=""></div>
                    <a class="refresh"><i class="iconfont">&#xe665;</i></a>
                </div>
                <div class="flex img_code_input">
                    <input class="flex-1 num1 on" type="number" name="" value="" maxlength="1">
                    <input class="flex-1 num2" type="number" name="" value="" maxlength="1">
                    <input class="flex-1 num3" type="number" name="" value="" maxlength="1">
                    <input class="flex-1 num4" type="number" name="" value="" maxlength="1">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                selected: '1',               //tab切换
                regInfo: {                   //表单
                    phone: "",              
                    mesCode:"",
                    pwd: ""
                },
                visFlag: false,             //密码是否可见
                verifyFlag: false,          //验证码弹窗是否可见
            }
        },
        methods:{
            submit: function () {
                console.log(this.$verify.check());
            }
        }

    }
</script>
<style lang="less">
    @import '~@/styles/login/forget.less';
</style>