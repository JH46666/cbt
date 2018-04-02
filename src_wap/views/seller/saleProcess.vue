<template>
<div class="buy-process">
<div class="steps-before">
<h4 class="max-title"><span class="titleicons"><img :src="buyProcessData.titleiconsrc1" alt=""></span>{{buyProcessData.title.titletext1}}</h4>
<p>{{buyProcessData.stepsBefore.text}} <span class="color-red" @click="toStep2()">{{buyProcessData.stepsBefore.span}}<i class="iconfont">&#xe744;</i></span></p>
<img :src="buyProcessData.stepsBefore.imgSrc" alt="">
</div>
<div class="line"></div>
<h4 class="max-title max-title-Two"><span class="titleicons"><img :src="buyProcessData.titleiconsrc2" alt=""></span>{{buyProcessData.title.titletext2}}</h4>
<h5 class="title">{{buyProcessData.steps.title1}}</h5>
<div class="steps">
<div v-for="item in buyProcessData.stepsOne.content">
<p class="small-t">{{item.minTitle}}</p>
<p v-html="item.text"></p>
</div>
<img v-bind:src="buyProcessData.stepsOne.imgSrc" alt="">
</div>
<h5 class="title" id="step2">{{buyProcessData.steps.title2}}</h5>
<div class="steps">
<p class="small-t">{{buyProcessData.stepsTwo.stepsTwoBeforeT1}}</p>
<img v-bind:src="buyProcessData.stepsTwo.stepsTwoBeforeSrcimg1" alt="">
<p class="small-t">{{buyProcessData.stepsTwo.stepsTwoBeforeT1}}</p>
<div v-for="item in buyProcessData.stepsTwo.T2steps">
<p v-html="item.text"></p>
</div>
<img v-bind:src="buyProcessData.stepsTwo.stepsTwoBeforeSrcimg2" alt="">
<div v-for="item in buyProcessData.stepsTwo.content">
<p class="small-t">{{item.minTitle}}</p>
<p v-html="item.text"></p>
<img :src="item.imgSrc" alt="">
</div>
<p >{{buyProcessData.stepsTwo.lastText}}</p>
</div>
<h5 class="title">{{buyProcessData.steps.title3}}</h5>
<div class="steps">
<div v-for="item in buyProcessData.stepsThird">
<p class="tips-text-wrap">
<span class="tips_icons">
<img class="iconImg" :src="item.iconSrc" alt="">
</span>
{{item.minTitle}}
</p>
<p v-html="item.text"></p>
<img :src="item.imgSrc" alt="">
</div>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      buyProcessData: ""
      // {
      // "title":{
      // "titletext1":"如果您已注册茶帮通会员",
      // "titletext2":"如果您还没注册茶帮通会员",
      // },
      // "titleiconsrc1":"http://img0.oteao.com/WAPIMG/share/cbt_mjzchy.png",
      // "titleiconsrc2":"http://img1.oteao.com/WAPIMG/share/cbt_mjzcfhy.png",
      // "steps": {
      // "title1": "1.填写注册手机号(已经是会员直接跳至第2步)",
      // "title2": "2.填写注册资质",
      // "title3": "3.提交信息页面"
      // },
      // "stepsBefore":{
      // "text":"可直接登录茶帮通 > 我的 > 申请成为卖家进入卖家申请页面",
      // "span":"然后跳至第2步",
      // "imgSrc":"http://img2.oteao.com/WAPIMG/share/cbt_mjzc01.png"
      // },
      // "stepsOne": {
      // "imgSrc":
      // "http://img3.oteao.com/WAPIMG/share/cbt_mjzc02.png",
      // "content": [
      // {
      // "minTitle": "注册的手机号：",
      // "text":
      // "填写您的注册手机号码，然后点选【获取验证码】，茶帮通将发送注册验证码到该手机，注册成功后该号码默认为登录时接收验证码的手机号。"
      // },

      // {
      // "minTitle": "设置密码：",
      // "text": "可使用6-16位的数字 / 字母 / 标点符号组合，不允许有空格。"
      // }
      // ]
      // },

      // "stepsTwo": {
      // "stepsTwoBeforeT1":"注册类型选择“成为卖家",
      // "stepsTwoBeforeSrcimg1":"http://img4.oteao.com/WAPIMG/share/cbt_mjzc03.png",
      // "stepsTwoBeforeT2":"根据您实际企业类型选择卖家类型：",
      // "T2steps":[
      // {
      // "text":"茶 企：茶叶品牌商。例如中茶、大益茶、八马等；",
      // },
      // {
      // "text":"合作社：茶叶专业合作社，众多由茶农、茶商组成的茶<br>叶专业合作社；",
      // },
      // {
      // "text":"批发商：茶叶流转中间商，批量采购上级供应商，转售<br>下一级需求者；",
      // },
      // {
      // "text":"茶 厂：茶叶生产加工商，批量生产、供应，不具有自<br>有品牌。",
      // }

      // ],
      // "stepsTwoBeforeSrcimg2":"http://img0.oteao.com/WAPIMG/share/cbt_mjzc04.png",
      // "content": [
      // {
      // "minTitle": "填写企业信息：",
      // "text": "企业名称：企业名称需与上传营业执照的企业名称一致<br>联 系 人：注册手机号的联系人姓名；<br>所在地区：企业所在地区，需选择真实的省、市、区；<br>企业地址：结合店铺所在地区，填写店铺的详细地址，如街道、楼号等。",
      // "imgSrc":"http://img4.oteao.com/WAPIMG/share/cbt_mjzc05.png"
      // },

      // {
      // "minTitle": "支付宝账号：",
      // "text":"填写正确的支付宝账号，此账户用于后续卖家货款的转账，请谨慎填写。<br>后续如需更改可在卖家中心>店铺信息中修改。",
      // "imgSrc":"http://img1.oteao.com/WAPIMG/share/cbt_mjzc06.png"
      // },
      // {
      // "minTitle": "营业执照：",
      // "text":"必填项，营业执照图片要求如下：<br>a.确保申请入驻的企业不在《经营异常名录》中且所销售的商品在其经营范围内;<br>b.复印件或扫描件需要加盖公司鲜章;<br>c.距离有效期截止时间应要大于3个月;<br>d.证件要清晰，图片不要倒置。",
      // "imgSrc":""
      // },
      // {
      // "minTitle": "生产许可证：",
      // "text":"选填项，若有填写，会对您的店铺资质考核加分 ",
      // "imgSrc":"http://img2.oteao.com/WAPIMG/share/cbt_mjzc07.png"
      // }

      // ],
      // "lastText":"点选提交，注册信息进入审核中，茶帮通将在24小时内对您的信息进行审核。"
      // },

      // "stepsThird": [
      // {
      // "iconSrc": "http://img3.oteao.com/WAPIMG/share/cbt_mjzcshz.png",
      // "minTitle": "审核中",
      // "text":"当您的卖家申请还在审核中时，您再次登录，会优先进<br>入店铺信息审核页面，若需要调整您的注册信息，可点<br>选【修改资料】进行编辑。",
      // "imgSrc":"http://img4.oteao.com/WAPIMG/share/cbt_mjzc08.png"
      // },

      // {
      // "iconSrc": "http://img3.oteao.com/WAPIMG/share/cbt_mjzcbtg.png",
      // "minTitle": "审核不通过",
      // "text":"若审核不通过，您将收到我们的审核结果信息，并可登<br> 录茶帮通-审核资料，我们会将您注册不通过的原因展示<br>于顶部。您需根据审核结果点选【修改资料】修改资质<br>信息然后重新提交审核。",
      // "imgSrc":"http://img2.oteao.com/WAPIMG/share/cbt_mjzc09.png"
      // },

      // {
      // "iconSrc": "http://img0.oteao.com/WAPIMG/share/cbt_mjzctg.png",
      // "minTitle": "审核通过",
      // "text": "审核通过后，您将收到我们的审核结果信息，审核成功后，即可登录茶帮通-卖家中心，进行商品上架。",
      // "imgSrc": ""
      // }
      // ]
      // }
    };
  },

  created() {
    this.$store.dispatch("getBlock", "WAP_SALEPROCESS").then(res => {
      console.log(res.data.htmlText);
      this.buyProcessData = JSON.parse(res.data.htmlText);
    });
    this.$store.commit("SET_TITLE", "注册为茶帮通卖家流程");

    // this.getHot();
    // this.getData();
  },
  methods:{
    toStep2(){
      document.getElementById('step2').scrollIntoView(true);
    }
  }
};
</script>
<style scoped>
.iconfont{
    font-family:"iconfont" !important;
    font-size: 0.28rem;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.max-title {
  font-size: 0.34rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.42rem;
    letter-spacing: 0rem;
    color: #333333;
  padding: 0.42rem 0 0.33rem 0.76rem;
  position: relative;
}
.max-title-Two {
  padding: 0.42rem 0 0.41rem 1.06rem;
}
.max-title-Two .titleicons {
  left: 0.32rem;
}
.line {
  width: 100%;
  height: 0.2rem;
  background: #f5f5f5;
}
.titleicons {
  width: 0.56rem;
    height: 0.56rem;
  position: absolute;
  left: 0;
  top: 0.32rem;
}
.titleicons img {
  width: 0.56rem;
    height: 0.56rem;
}
.steps-before {
  padding: 0 0.32rem;
}
.buy-process {
  background: #fafafa;
}
.title {
  width: 7.5rem;
  height: 0.8rem;
  background-color: #f5f5f5;
  line-height: 0.8rem;
  padding-left: 0.3rem;
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.8rem;
  letter-spacing: 0rem;
  color: #333333;
  position: relative;
  margin-bottom: 0.2rem;
}
.title:before {
  content: "";
  width: 0.08rem;
  height: 0.24rem;
  background-color: #f08200;
  position: absolute;
  top: 35%;
  left: 0;
}
.title:after {
  content: "";
  width: 0;
  height: 0;
  border-width: 0.22rem;
  border-bottom-width: 0.15rem;
  border-style: solid;
  border-color: transparent transparent #fafafa transparent;
  position: absolute;
  left: 0.2rem;
  top: 0.44rem;
}
.steps {
  padding: 0.11rem 0.31rem 0.31rem 0.31rem;
}
.steps-text {
  padding-bottom: 0.31rem;
}
p {
  font-size: 0.28rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.42rem;
  letter-spacing: 0rem;
  color: #666666;
  padding-bottom: 0.27rem;
}
.small-t {
  font-size: 0.28rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.28rem;
  letter-spacing: 0rem;
  color: #333333;
}

.color-red {
  color: #f08200;
}

#small-m {
  font-size: 0.28rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.42rem;
  letter-spacing: 0rem;
  color: #333333;
  padding-bottom: 0.29rem;
}
img {
  display: block;
  width: 80%;
  margin: 0 auto 0.29rem;
}
.tips-text-wrap {
  position: relative;
  padding-left: 0.46rem;
  font-size: 0.28rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.42rem;
  letter-spacing: 0rem;
  color: #333333;
}
.tips_icons {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin: 0;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0.05rem;
}
.iconImg {
  width: 100%;
}
</style>
