<template>
    <div class="set_wrapper" :class="{'suc_bg':successFlag}">
        <div class="logo_img"><img src="../../assets/images/logo.png" alt=""></div>
        <div>
            <!-- 表单 -->
            <form action="" class="form_wrapper" v-show="!successFlag">
                <div class="form_item">
                    <input type="text" placeholder="手机号码" v-model="regInfo.phone" maxlength="11">
                    <label class="fl"></label>
                </div>
                <div class="form_item">
                    <div class="flex">
                        <input class="mes_code" type="text" placeholder="短信验证码" v-model="regInfo.mesCode">
                        <a class="get_code" href="javascript:void(0);">获取短信验证码</a>
                    </div>
                    <label class="fl"></label>
                </div>
                <div class="form_item">
                    <input v-if="visFlag" type="text" placeholder="设置6-16位登录密码" v-model="regInfo.pwd" maxlength="11">
                    <input v-else type="password" placeholder="设置6-16位登录密码" v-model="regInfo.pwd">
                    <a @click="visFlag = !visFlag" class="vis_flag color_ad"><i class="iconfont" :class="{'icon-xianshimima': visFlag,'icon-yincangmima': !visFlag}"></i></a>
                    <label class="fl"></label>
                </div>
                <mt-button size="large" type="primary">确定</mt-button>
            </form>
            <!-- 成功找回密码 -->
            <div class="success_wrapper" v-show="successFlag">
                <div class="icon_img"><img src="../../assets/images/forget_gou.png" alt=""></div>
                <h3 class="color_3">成功找回密码</h3>
                <p class="color_9">客官，牢记登录密码下次登录不麻烦~</p>
                <p class="tips"><span>5s</span>后将返回登录</p>
                <a class="go_login" href="javscript:void(0);">立即去登录</a>
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
                successFlag: false,         //是否修改成功
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