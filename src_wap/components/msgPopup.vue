<!-- 
    props           type            default
    errorTxt        String          ''             错误提示

    function        emit function         arg
    close           closePopup            ###      关闭弹窗
                    getMsgCode            strCode  校验图片验证码是否正确



-->

<template>
    <!-- 验证码弹窗 -->
    <div class="popup verify_popup">
        <div class="popup_inner verify_inner">
            <a class="close_popup"  @click="close"><i class="iconfont">&#xe79a;</i></a>
            <p class="error_tips" v-show="errorTxt != ''"><i class="iconfont">&#xe667;</i>{{errorTxt}}</p>
            <div class="flex img_box">
                <div class="img_code" ref="imgcode"></div>
                <a class="refresh" @click="reset"><i class="iconfont">&#xe665;</i></a>
            </div>
            <div class="flex img_code_input" ref="forms">
                <input class="flex-1" :id="'input'+i" :class="{on: i==curIndex}" v-for="(c,i) in codes" :key="i" type="tel" v-model="c.code" :maxlength="1" @click="setIndex(i)" @keyup.delete="dele(i)" @input="setFocus(i,$event.target.value)">
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'msgPopup',
        data(){
            return{
                codes:[
                    {code: ''},                   //验证码
                    {code: ''},                   //验证码
                    {code: ''},                   //验证码
                    {code: ''},                   //验证码
                ],      
                curIndex: 0,                      //当前验证码输入框的下标
            }
        },
        props:{
            'errorTxt':{
                type: String,
                default: ''
            }
        },
        mounted(){
            this.getCode();
        },
        methods:{
            close(){
                // this.$refs.imgcode.innerHTML = `<img src="api/oteao/recaptcha/getReCaptha?v=${Math.random()*100}" alt="">`;
                // this.codes = [{code:''},{code:''},{code:''},{code:''}];
                // this.curIndex = 0;
                this.$emit('closePopup');
            },
            // 由于ios限制，只能通过同步代码控制组件的显示与隐藏
            hide() {
                this.$el.style.display = 'none';
                this.$refs.imgcode.innerHTML = `<img src="api/oteao/recaptcha/getReCaptha?v=${Math.random()*100}" alt="">`;
                this.codes = [{code:''},{code:''},{code:''},{code:''}];
                this.curIndex = 0;
            },
            show() {
                this.$el.style.display = 'block';
                document.getElementById('input0').focus();
            },
            //获取图片验证码
            getCode(){
                let str = `<img src="api/oteao/recaptcha/getReCaptha?v=${Math.random()*100}" alt="">`;
                this.$refs.imgcode.innerHTML = str;
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
            // 重置信息，失败的时候重置
            reset() {
                this.curIndex = 0;
                this.codes = [{code:''},{code:''},{code:''},{code:''}];
                this.getCode();
                document.getElementById('input0').focus();
            },
            //backspace事件
            dele(i){
                if(i===0){
                    return true;
                }else{
                    this.codes[i-1].code = '';
                    this.curIndex = i-1;
                    this.$refs.forms.childNodes[i-1].focus();
                }
            }
        },
        watch:{
            curIndex(val){
                if(val===4){
                    let strCode = '';
                    for(let item of this.codes){
                        strCode += item.code;
                    }
                    this.$emit('getMsgCode',strCode);
                }
            },
        }
    }
</script>