<template>
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
</template>
<script>
    export default{
        data(){
            return{
                codes:[
                    {code: ''},                   //验证码
                    {code: ''},                   //验证码
                    {code: ''},                   //验证码
                    {code: ''},                   //验证码
                ],      
                curIndex: 0,                      //当前验证码输入框的下标
                errorTips: '',                    //错误提示
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
        }
    }
</script>