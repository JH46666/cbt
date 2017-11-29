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
                        <a class="get_code" href="javascript:void(0);" @click="verifyFlag = true">获取短信验证码</a>
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
        <!-- 验证码弹窗 -->
        <div class="popup verify_popup" v-show="verifyFlag">
            <div class="popup_inner verify_inner">
                <a class="close_popup"  @click="verifyFlag = !verifyFlag"><i class="iconfont">&#xe79a;</i></a>
                <p class="error_tips" v-show="errorTips != ''"><i class="iconfont">&#xe667;</i>{{errorTips}}</p>
                <div class="flex img_box">
                    <div class="img_code" ref="imgcode"></div>
                    <a class="refresh" @click="getCode"><i class="iconfont">&#xe665;</i></a>
                </div>
                <div class="flex img_code_input" ref="forms">
                    <input class="flex-1" :class="{on: i==curIndex}" v-for="(c,i) in codes" type="text" :name="i" v-model="c.code" maxlength="1" @click="setIndex(i)" @input="setFocus(i,$event.target.value)">
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
               regInfo: {                          //表单
                    phone: "",              
                    mesCode:"",
                    password:"",
                },
                visFlag: false,                     //密码是否可见
                illegalFlag: false,                 //是否违规操作
                verifyFlag: false,                  //验证码弹窗是否可见
                // disabledFlag: true,              //立即登录是否亮起
                phoneFlag: false,                   //手机验证是否通过            
                passwordFlag: false,                //密码验证是否通过
                mescodeFlag: false,                 //短信验证是否
                getFlag: false,                     //获取短信验证码按钮是否可点击
                getCount: 0,                        //获取短信的次数          
                codes:[
                    {code: ''},                   //验证码
                    {code: ''},                   //验证码
                    {code: ''},                   //验证码
                    {code: ''},                   //验证码
                ],      
                curIndex: 0,                      //当前验证码输入框的下标
                errorTips: '',                    //错误提示
                timeCount: 60,                    //倒计时
                successFlag: false,               //是否修改成功
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
                    return false;
                }
            }
        },
        methods:{
            //获取图片验证码
            getCode(){
                let str = `<img src="api/recaptcha/getReCaptha?v=${Math.random()*100}" alt="">`;
                this.$refs.imgcode.innerHTML = str;
                this.$refs.forms.childNodes[this.curIndex].focus();
            },
            //设置curIndex
            setIndex(i){
                this.curIndex = i;
            },
            //聚焦
            setFocus(i,val){
                if(val != ''){
                    this.$nextTick(()=>{
                        this.curIndex = i+1;
                        if(this.curIndex == 4){
                            this.$refs.forms.childNodes[this.curIndex-1].focus();
                        }else{
                            this.$refs.forms.childNodes[this.curIndex].focus();
                        }
                    });
                }
            },
            //提交登录信息
            submit(){
                if(!this.disabledFlag){
                    let data = {
                        memberAccount: this.regInfo.phone,
                        password: this.regInfo.password,
                        sysId:1
                    }
                    this.$api.post('/oteao/login/doLoginByPwd',data,
                    res=>{
                        this.$router.push('/');
                    },res=>{
                        Toast('账号或密码错误，请核实后重新输入');
                    });
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
                }
            },
            //获取短信验证码
            getMsg(){
                if(this.getFlag && this.phoneFlag){
                    this.verifyFlag = true;
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
            }
        },
        watch:{
            verifyFlag(val){
                if(val){
                    this.$nextTick(()=>{
                        this.getCode();
                    });
                }else{
                    this.$refs.imgcode.innerHTML = '';
                    this.codes = [{code:''},{code:''},{code:''},{code:''}];
                    this.curIndex = 0;
                }
            },
            curIndex(val){
                if(val===4){
                    let strCode = '';
                    for(let item of this.codes){
                        console.log(item);
                        strCode += item.code;
                    }
                    let data = {
                        mobilePhone: this.regInfo.phone,
                        sendType: 'LOGINING',
                        reCaptcha: strCode,
                    }
                    //获取短信验证码
                    this.$api.get('/oteao/login/doSendSms',data,res=>{
                        this.verifyFlag = false;
                        this.getFlag = false;
                        this.getCount++;
                        this.countTime();
                    },res=>{
                        this.errorTips = "您输入的短信验证码错误，请核对后重新输入";
                        this.curIndex = 0;
                        this.codes = [{code:''},{code:''},{code:''},{code:''}];
                        this.getCode();
                    });
                }
            },
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
    @import '~@/styles/login/forget.less';
</style>