<template>
    <div class="set_wrapper" :class="{'suc_bg':successFlag}">
        <div class="logo_img"><img src="../../assets/images/logo.png" alt=""></div>
        <div>
            <!-- 表单 -->
            <div class="form_wrapper com_wrapper" v-show="!successFlag">
                <div class="form_item">
                    <input type="tel" placeholder="手机号码" v-model="regInfo.phone" maxlength="11">
                </div>
                <div class="form_item">
                    <div class="flex">
                        <input class="mes_code" type="tel" placeholder="短信验证码" v-model.number="regInfo.mesCode" maxlength="4" @input="checkMsg($event.target.value)">
                        <a v-if="(getCount==0 || getFlag)" class="get_code" :class="{'on':activeFlag}" @click="showPopup">{{getCount==0?'获取短信验证码':'重新获取验证码'}}</a>
                        <a v-else class="get_code">{{timeCount}}s后重新获取</a>
                    </div>
                </div>
                <div class="form_item">
                    <input v-if="visFlag" type="text" placeholder="设置6-16位登录密码" v-model="regInfo.password" maxlength="16" @input="checkPassWord($event.target.value)">
                    <input v-else type="password" placeholder="设置6-16位登录密码" v-model="regInfo.password" maxlength="16" @input="checkPassWord($event.target.value)">
                    <a @click="visFlag = !visFlag" class="vis_flag color_ad"><i class="iconfont" :class="{'icon-xianshimima': visFlag,'icon-yincangmima': !visFlag}"></i></a>
                </div>
                <mt-button size="large" type="primary" :class="{'is-disabled':disabledFlag}" :title="activeFlag" @click="submit">确定</mt-button>

            </div>
            <!-- 成功找回密码 -->
            <div class="success_wrapper" v-show="successFlag">
                <div class="icon_img"><img src="../../assets/images/forget_gou.png" alt=""></div>
                <h3 class="color_3">成功找回密码</h3>
                <p class="color_9">客官，牢记登录密码下次登录不麻烦~</p>
                <p class="tips"><span>{{ n }}s</span>后将返回登录</p>
                <a class="go_login" href="javascript:" @click="nowLogin">立即去登录</a>
            </div>
        </div>
        <!-- 验证码弹窗 -->
        <msg-popup v-if="verifyFlag" @closePopup="closePopup" @getMsgCode="getMsgCode" :errorTxt="errorTips" ref="imgCode"></msg-popup>
    </div>
</template>
<script>
    import Verify from '../../../utils/validator.js';
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                selected: '1',               //tab切换
               regInfo: {                          //表单
                    phone: "",              
                    mesCode:"",
                    password:"",
                },
                visFlag: false,                     //密码是否可见
                illegalFlag: false,                 //是否违规操作
                verifyFlag: false,                  //验证码弹窗是否可见
                phoneFlag: false,                   //手机验证是否通过            
                passwordFlag: false,                //密码验证是否通过
                mescodeFlag: false,                 //短信验证是否
                getFlag: false,                     //获取短信验证码按钮是否可点击
                getCount: 0,                        //获取短信的次数          
                errorTips: '',                    //错误提示
                timeCount: 60,                    //倒计时
                successFlag: false,               //是否修改成功
                n: 5,
                timer: null,                        // 定时器
            }
        },
        computed:{
            //登录按钮是否亮起
            disabledFlag(){
                if(this.regInfo.phone != '' && this.regInfo.password != '' && this.regInfo.mesCode != ''){
                    if(this.phoneFlag && this.passwordFlag && this.mescodeFlag){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            },
            //获取短信验证码是否激活
            activeFlag(){
                if(this.regInfo.phone.length == 11){
                    let flag = Verify.checkPhone(this.regInfo.phone);
                    this.phoneFlag = flag;
                    if(this.getCount == 0){
                        this.getFlag = flag;
                    }
                    flag = this.phoneFlag && this.getFlag;
                    return flag;
                }else{
                    this.phoneFlag = false;
                    return false;
                }
            }
        },
        methods:{
            //关闭弹窗
            closePopup(){
                this.verifyFlag = false;
                this.errorTips = "";
            },
            //提交图片验证码获取短信验证码
            getMsgCode(val){
                let data = {
                    mobilePhone: this.regInfo.phone,
                    sendType: 'MOD_PASSWORD',
                    reCaptcha: val,
                }
                this.$api.get('/oteao/login/doSendSms',data,res=>{
                    this.verifyFlag = false;   
                    this.getFlag = false;
                    this.errorTips = "";        
                    Toast('验证码己发至您的手机，5分钟内有效，请注意查收');
                    this.getCount++;
                    this.countTime();
                },res=>{
                    this.$refs.imgCode.reset();
                    this.errorTips = "您输入的图片验证码错误，请核对后重新输入";
                });
            },
            //提交信息
            submit(){
                if(!this.disabledFlag){
                    let data = {
                        memberAccount: this.regInfo.phone,
                        smsCode: this.regInfo.mesCode,
                        password: this.regInfo.password
                    }
                    this.$api.post('/oteao/memberAccount/findPwd',data,
                    res=>{
                        this.successFlag = true;
                        this.$nextTick(() => {
                            this.timer = setInterval(() => {
                                console.log(this)
                                this.n--;
                                if(this.n === 0) {
                                    clearInterval(this.timer);
                                    this.$router.go(-1);
                                }
                            },1000)
                        })
                    },res=>{
                        if(res.code === 3011) {
                            Toast('新密码不能等于旧密码');
                        }
                        if(res.code === 1000) {
                            Toast('短信验证码过期，请重新获取');
                        }
                        if(res.code === 1001) {
                            Toast('您输入的短信验证码错误，请核对后从新输入');
                        }
                    });
                }
            },
            nowLogin() {
                clearInterval(this.timer);
                this.$router.go(-1);
            },
            //手机号验证
            checkPhone(val){
                if(val != ''){
                    if(Verify.checkPhone(val)){
                        this.phoneFlag = true;
                    }else{
                        Toast('您输入的账号格式有误，请核实后重新输入');
                        this.phoneFlag = false;
                    }
                }
            },
            //密码验证
            checkPassWord(val){
                if (val.length <6 || val.length>16) {
                    this.passwordFlag = false;
                }else{
                    this.passwordFlag = true;
                }
            },
            //短信验证码
            checkMsg(val){
                if(val.length==4){
                    if(Verify.checkMsgCode(val)){
                        this.mescodeFlag = true;
                    }else{
                        this.mescodeFlag = false;
                        Toast('您输入的验证码格式有误，请核实后重新输入');
                    }
                }else{
                    this.mescodeFlag = false;
                }
            },
            //获取短信验证码
            showPopup(){
                if(this.getFlag && this.phoneFlag){
                    this.$api.get('/oteao/memberAccount/searchIsExist',{memberAccount:this.regInfo.phone},res=>{
                        if(res.data.returnResult) {
                            this.verifyFlag = true;
                        } else {
                            Toast('您输入的手机号未注册，请重新输入');
                        }
                    },res=>{
                         Toast(res.cnMessage);
                    });
                }
            },
            //倒计时
            countTime(){
                let st = setInterval(()=>{
                    if(this.timeCount == 0){
                        this.getFlag = true;
                        clearInterval(st);
                        this.timeCount = 60;
                    }else{
                        this.timeCount--;
                    }
                },1000);
            },
            
        },
        created() {
            
            // 设置title
            this.$store.commit('SET_TITLE','忘记密码');
            
        }
    }
</script>
<style lang="less">
    @import '~@/styles/login/forget.less';
</style>