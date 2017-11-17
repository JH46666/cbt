<template>
    <div class="login_wrapper">
        <div class="logo_img"><img src="../../assets/images/logo.png" alt=""></div>
        <div>
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">短信登录</mt-tab-item>
                <mt-tab-item id="2">密码登录</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <div class="form_item">
                        <input type="text" placeholder="手机号码" v-model="regInfo.phone" maxlength="11">
                        <label class="fl"></label>
                    </div>
                    <div class="form_item">
                        <div class="flex">
                            <input class="mes_code" type="text" placeholder="短信验证码" v-model="regInfo.mesCode">
                            <a class="get_code"  @click="verifyFlag = true">获取短信验证码</a>
                        </div>
                        <label class="fl"></label>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="form_item">
                        <input type="text" placeholder="手机号码" v-model="regInfo.phone" v-verify="regInfo.phone">
                        <label class="fl"></label>
                    </div>
                    <div class="form_item">
                        <input v-if="visFlag" type="text" placeholder="登录密码" v-model="regInfo.mesCode" maxlength="11">
                        <input v-else type="password" placeholder="登录密码" v-model="regInfo.mesCode">
                        <a @click="visFlag = !visFlag" class="vis_flag color_ad"><i class="iconfont" :class="{'icon-xianshimima': visFlag,'icon-yincangmima': !visFlag}"></i></a>
                        <label class="fl"></label>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
            <mt-button size="large" type="primary">立即登录</mt-button>
            <div class="flex btns">
                <router-link class="flex-1 color_3" to="/regist/buyer">立即注册</router-link>
                <router-link class="flex-1 color_3 algin_r" v-if="selected==='2'" to="forget">忘记密码</router-link>
            </div>
        </div>
        <!-- 违规弹窗 -->
        <div class="popup illegal_popup" v-show="illegalFlag">
            <div class="popup_inner illegal_inner">
                <p>您的账号因违规操作而被冻结！<br/>若有疑问请联系客服4006-066-068</p>
                <a class="color_f08" href="javascript:void(0);">确定</a>
            </div>
        </div>
        <!-- 验证码弹窗 -->
        <div class="popup verify_popup" v-show="verifyFlag">
            <div class="popup_inner verify_inner">
                <a class="close_popup"  @click="verifyFlag = !verifyFlag"><i class="iconfont">&#xe79a;</i></a>
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
                    mesCode:""
                },
                visFlag: false,             //密码是否可见
                illegalFlag: false,         //是否违规操作
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
    @import '~@/styles/login/login.less';
</style>