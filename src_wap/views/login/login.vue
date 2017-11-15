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
                        <input type="text" placeholder="手机号码" v-model="regInfo.phone" v-verify="regInfo.phone">
                        <label class="fl" v-remind="regInfo.phone"></label>
                    </div>
                    <div class="form_item">
                        <div class="flex">
                            <input class="mes_code" type="text" placeholder="短信验证码" v-model="regInfo.mesCode" v-verify="regInfo.mesCode">
                            <a class="get_code" href="javascript:void(0);">获取短信验证码</a>
                        </div>
                        <label class="fl" v-remind="regInfo.mesCode"></label>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="form_item">
                        <input type="text" placeholder="手机号码" v-model="regInfo.phone" v-verify="regInfo.phone">
                        <label class="fl" v-remind="regInfo.phone"></label>
                    </div>
                    <div class="form_item">
                        <input v-if="visFlag" type="text" placeholder="登录密码" v-model="regInfo.mesCode" v-verify="regInfo.password">
                        <input v-else type="password" placeholder="登录密码" v-model="regInfo.mesCode" v-verify="regInfo.password">
                        <a @click="visFlag = !visFlag" class="vis_flag color_ad"><i class="iconfont" :class="{'icon-xianshimima': visFlag,'icon-yincangmima': !visFlag}"></i></a>
                        <label class="fl" v-remind="regInfo.phone"></label>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
            <mt-button size="large" type="primary">立即登录</mt-button>
            <div class="flex btns">
                <a class="flex-1 color_3" href="javascript:void(0);">立即注册</a>
                <a class="flex-1 color_3 algin_r" v-if="selected==='2'" href="javascript:void(0);">忘记密码</a>
            </div>
        </div>
        <!-- 弹窗 -->
        <div>
            
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import verify from "vue-verify-plugin";
    Vue.use(verify,{
        blur:true,
        rules:myRules
    });
    var myRules={
        myRequired:{
            test:function(val){
                if(val.length === 0) {
                    return false
                }
                return true;
            },
            message:"最大为6位"
        }
        
    };
    export default {
        data(){
            return {
                selected: '1',               //tab切换
                regInfo: {                   //表单
                    phone: "",              
                    mesCode:""
                },
                visFlag: false,             //密码是否可见
            }
        },
        verify: {
            regInfo: {
                phone: ["required","mobile"],
                mesCode: ["required","mobile"]
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
    @import '~@/styles/base/tools.less';
    .login_wrapper{
        padding: 0 .4rem;
        .bg(#fff);
        .logo_img{
            .w(3.1rem);
            margin: .6rem auto;
            img{
                .w(100%);
            }
        }
        .mint-navbar{
            padding: 0 1.3rem;
            margin-bottom: .3rem;
            .mint-tab-item{
                padding: .15rem 0;
                .color(#999);
                &+.mint-tab-item{
                    margin-left: 1rem;
                }
                .mint-tab-item-label{
                    .fontSize(.3rem);
                }
            }
            .is-selected{
                border-bottom: 2px solid #f08200;
                .color(@mainTitle);
            }
        }
        .mint-tab-container-item{
            .form_item{
                margin-bottom: .3rem;
                position: relative;
                label{
                    color:#ff3600;
                }
                .vis_flag{
                    position: absolute;
                    line-height: .48rem;
                    right: 0;
                    padding: .25rem .4rem;
                    top: 0;
                }
                .mes_code{
                    .flex_num(6);
                    margin-right: .3rem;
                }
                .get_code{
                    .flex_num(4);
                    .line(.98rem);
                    border: 1px solid #e5e5e5;
                    border-radius: 5px;
                    border: 1px solid #f08200;
                    .algin(c);
                    .color(#f08200);
                    font-size: .3rem;
                }
            }
            input{
                padding: .25rem 0;
                text-indent: .3rem;
                .w(100%);
                outline: none;
                border: 1px solid #e5e5e5;
                .reduis(3px);
                .line(.48rem);
                .fontSize(.26rem);
            }
            .verify-error{
                border: 1px solid #ff3600;
            }
        }
        .mint-button{
            height: .98rem;
            font-size: .3rem;
            color: #fff;
            .bg(#f08200);
        }
        .btns{
            margin-top: .34rem;
            font-size: .3rem;
        }
    }
</style>