<template>
    <div class="login_wrapper">
        <router-link to="/" tag="div" class="logo_img" v-if="logoImg === ''"><img src="../../assets/images/logo.png" alt=""></router-link>
        <router-link to="/" tag="div" class="logo_img" v-else v-html="logoImg"></router-link>
        <div>
            <mt-navbar v-model="selected">
                <mt-tab-item id="2">密码登录</mt-tab-item>
                <mt-tab-item id="1">短信登录</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <!-- 短信登录 -->
                <mt-tab-container-item id="1" class="com_wrapper">
                    <div class="form_item">
                        <input type="tel" placeholder="手机号码" v-model="regInfo.phone" maxlength="11" @blur="checkPhone($event.target.value)">
                    </div>
                    <div class="form_item">
                        <div class="flex">
                            <input class="mes_code" type="tel" placeholder="短信验证码" v-model.number="regInfo.mesCode" maxlength="4" @input="checkMsg($event.target.value)">
                            <a v-if="(getCount==0 || getFlag)" class="get_code" :class="{'on':activeFlag}" @click="showPopup">{{getCount==0?'获取短信验证码':'重新获取验证码'}}</a>
                            <a v-else class="get_code">{{timeCount}}s后重新发送</a>
                        </div>
                    </div>
                </mt-tab-container-item>
                <!-- 密码登录 -->
                <mt-tab-container-item id="2" class="com_wrapper">
                    <div class="form_item">
                        <input type="tel" placeholder="手机号码" v-model="regInfo.phone" maxlength="11" @blur="checkPhone($event.target.value)">
                    </div>
                    <div class="form_item">
                        <input v-if="visFlag" type="text" placeholder="登录密码" v-model="regInfo.password" maxlength="16" @input="checkPassWord($event.target.value)">
                        <input v-else type="password" placeholder="登录密码" v-model="regInfo.password" maxlength="16" @input="checkPassWord($event.target.value)">
                        <a @click="visFlag = !visFlag" class="vis_flag color_ad"><i class="iconfont" :class="{'icon-xianshimima': visFlag,'icon-yincangmima': !visFlag}"></i></a>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
            <mt-button size="large" type="primary" :class="{'is-disabled':disabledFlag}" :title="activeFlag" @click="submit">立即登录</mt-button>
            <div class="flex btns">
                <div class="flex-1"><router-link class="color_3" to="/regist/buyer">立即注册</router-link></div>
                <div class="flex-1 algin_r"><router-link class="color_3" v-if="selected==='2'" to="forget">忘记密码</router-link></div>
            </div>
        </div>
        <!-- 违规弹窗 -->
        <div class="popup illegal_popup" v-show="illegalFlag">
            <div class="popup_inner illegal_inner">
                <p>您的账号因违规操作而被冻结！<br/>若有疑问请联系客服4006-066-068</p>
                <a class="color_f08" href="javascript:void(0);" @click="illegalFlag = false">确定</a>
            </div>
        </div>
        <!-- 验证码弹窗 -->
        <msg-popup @closePopup="closePopup" @getMsgCode="getMsgCode" :errorTxt="errorTips" ref="imgCode"></msg-popup>
    </div>
</template>
<script>
    import Verify from '../../../utils/validator.js';
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                selected: '2',                      //tab切换
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
                errorTips: '',                      //错误提示
                timeCount: 60,                      //倒计时
                logoImg: '',                        //logo的图片
                openId: '',
            }
        },
        computed:{
            //登录按钮是否亮起
            disabledFlag(){
                if(this.regInfo.phone != '' && (this.regInfo.password != '' || this.regInfo.mesCode != '')){
                    if(this.phoneFlag && (this.passwordFlag || this.mescodeFlag)){
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
                this.$refs.imgCode.hide();
            },
            //提交图片验证码获取短信验证码
            getMsgCode(val){
                let data = {
                    mobilePhone: this.regInfo.phone,
                    sendType: 'LOGINING',
                    reCaptcha: val,
                }
                this.$api.get('/oteao/login/doSendSms',data,res=>{
                    if(res.data){
                        Toast('您输入的账号不存在，请重新输入');
                        this.$refs.imgCode.hide();
                    }
                    else{
                        this.verifyFlag = false;
                        this.getFlag = false;
                        this.errorTips = "";
                        this.$refs.imgCode.hide();
                        this.errorTips = "";
                        Toast('验证码己发至您的手机，5分钟内有效，请注意查收');
                        this.getCount++;
                        this.countTime();
                    }
                },res=>{
                    this.$refs.imgCode.reset();
                    this.errorTips = "您输入的图片验证码错误，请核对后重新输入";
                });
            },
            //提交登录信息
            submit(){
                if(!this.disabledFlag){
                    // 密码登录
                    if(this.selected == '2'){
                        this.getOpenId().then(openIdres => {
                            let data = {
                                memberAccount: this.regInfo.phone,
                                password: this.regInfo.password,
                                device: 'WAP',
                                sysId:1,
                                openId: this.openId,
                            }
                            this.$api.post('/oteao/login/doLoginByPwd', data,
                                res => {
                                    for (let attr in res.data) {
                                        this.$store.commit('SET_MEMBERDATA', { type: attr, val: res.data[attr] })
                                    }
                                    let status = this.$store.state.member.memberAccount.status;
                                    if (status === 'WAIT_AUDIT' || status === 'AUDIT_NO_PASS') {
                                        return this.$router.push({ name: '茶帮通注册3' })
                                    }
                                    if (status === 'INACTIVE') {
                                        return this.$router.push({ name: '茶帮通注册2' })
                                    }
                                    if (this.$store.state.address.from.name === '忘记密码' || this.$store.state.address.from.name === this.$route.name) {
                                        return this.$router.push('/')
                                    } else {
                                        // Toast(this.$store.state.address.from.fullPath)
                                        return this.$router.push(this.$store.state.address.from.fullPath);
                                    }
                                }, res => {
                                    if (res.code === 4064) {
                                        return this.illegalFlag = true;
                                    } else {
                                        return Toast('账号或密码错误，请核实后重新输入');
                                    }
                                }
                            )
                        });
                    }
                    // 短信登录
                    else if(this.selected == '1'){
                        this.getOpenId().then(openIdres => {
                            let data = {
                                memberAccount: this.regInfo.phone,
                                smsCode: this.regInfo.mesCode,
                                device: 'WAP',
                                openId: this.openId,
                            }
                            this.$api.post('/oteao/login/doLoginBySms', data,
                                res => {
                                    for (let attr in res.data) {
                                        this.$store.commit('SET_MEMBERDATA', { type: attr, val: res.data[attr] })
                                    }
                                    let status = res.data.memberAccount.status;
                                    if (status === 'WAIT_AUDIT' || status === 'AUDIT_NO_PASS') {
                                        return this.$router.push({ name: '茶帮通注册3' })
                                    }
                                    if (status === 'INACTIVE') {
                                        return this.$router.push({ name: '茶帮通注册2' })
                                    }
                                    if (this.$store.state.address.from.name === '忘记密码' || this.$store.state.address.from.name === this.$route.name) {
                                        return this.$router.push('/')
                                    }
                                    else {
                                        return this.$router.push(this.$store.state.address.from.fullPath);
                                    }
                                }, res => {
                                    if (res.code === 2000) {
                                        return Toast('该账户未注册');
                                    }
                                    Toast('您输入的验证码错误，请核实后重新输入');
                                }
                            );
                        })
                    }
                }
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
                    // this.verifyFlag = true;
                    this.$refs.imgCode.show();
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
            // 获取openId
            getOpenId(){
                return new Promise((resolve, reject) => {
                    this.$api.get('/oteao/memberAccount/getOpenId', {}, res => {
                        this.openId = res.data;
                        this.$store.commit('SET_OPENID',res.data);
                        resolve(res);
                    }, res => {
                        reject(res);
                    })
                })
            }
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','账户登录');
            this.$store.dispatch('getBlock','waplogin').then(res => {
                this.logoImg = res.data.htmlText;
            })

        },
        watch:{
            selected(val){
                this.regInfo.phone = '';
                this.regInfo.mesCode = '';
                this.regInfo.password = '';
                this.phoneFlag = false;
                this.passwordFlag = false;
                this.mescodeFlag = false;
            },

        }

    }
</script>
<style lang="less">
    @import '~@/styles/login/login.less';
</style>
