<template>
<div class="buy-process">
<h5 class="title">{{buyProcessData.steps.title1}}</h5>
<div class="steps">
<div v-for="item in buyProcessData.stepsOne.content">
<p class="small-t">{{item.minTitle}}</p>
<p v-html="item.text"></p>
</div>
<img v-bind:src="buyProcessData.stepsOne.imgSrc" alt="">
</div>
<h5 class="title">{{buyProcessData.steps.title2}}</h5>
<div class="steps">
<div v-for="item in buyProcessData.stepsTwo.content">
<p class="small-t">{{item.minTitle}}</p>
<p v-html="item.text"></p>
<img :src="item.imgSrc" alt="">
</div>
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
      // "steps": {
      // "title1": "1.填写注册手机号",
      // "title2": "2.填写注册资质",
      // "title3": "3.提交信息页面"
      // },
      // "stepsOne": {
      // "imgSrc":
      // "http://img0.oteao.com/WAPIMG/share/cbt_mjzc02.png",
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
      // "lastText":
      // "点选提交，注册信息进入审核中，茶帮通将在24小时内对您的信息进行审核。",
      // "content": [
      // {
      // "minTitle": "注册类型选择“成为会员”",
      // "text": "",
      // "imgSrc":
      // "http://img1.oteao.com/WAPIMG/share/cbt_mj02.png"
      // },

      // {
      // "minTitle": "填写企业信息：",
      // "text":
      // "企业名称：企业名称需与上传门头照的企业名称一致<br>联 系 人：注册手机号的联系人姓名；<br>所在地区：企业所在地区，需选择真实的省、市、区；<br>企业地址：结合店铺所在地区，填写店铺的详细地址，如街道、楼号等。",
      // "imgSrc":
      // "http://img2.oteao.com/WAPIMG/share/cbt_mj03.png"
      // },
      // {
      // "minTitle": "企业门头照:",
      // "text":
      // "必填项，照片须符合以下条件：<br>a.请保证照片中店铺门店信息完整，无反光无遮挡;<br>b.照片为店铺正面照，需清晰可见;<br>c.门店信息需与注册店铺名称一致。",
      // "imgSrc":
      // "http://img3.oteao.com/WAPIMG/share/cbt_mj04.png"
      // }
      // ]
      // },

      // "stepsThird": [
      // {
      // "iconSrc": "http://img0.oteao.com/WAPIMG/share/cbt_mjzcshz.png",
      // "minTitle": "审核中",
      // "text":
      // "当您的账户还在审核中时，您登录时会优先进入店铺信<br>息审核页面，若您需要调整您的注册信息，可点选<br>【修改资料】进行编辑。",
      // "imgSrc":
      // "http://img3.oteao.com/WAPIMG/share/cbt_mj05.png"
      // },

      // {
      // "iconSrc": "http://img1.oteao.com/WAPIMG/share/cbt_mjzcbtg.png",
      // "minTitle": "审核不通过",
      // "text":
      // "若审核不通过，您将收到我们的审核结果信息，并可登录茶<br>帮通-审核资料，我们会将您注册不通过的原因展示于顶部。<br>您需根据审核结果点选【修改资料】修改资质信息然后重新<br>提交审核。",
      // "imgSrc":
      // "http://img2.oteao.com/WAPIMG/share/cbt_mj06.png"
      // },

      // {
      // "iconSrc": "http://img0.oteao.com/WAPIMG/share/cbt_mjzctg.png",
      // "minTitle": "审核通过",
      // "text":
      // "审核通过后，您将收到我们的审核结果信息，即可登录茶帮通-进行买买买啦~",
      // "imgSrc": ""
      // }
      // ]
      // }
    };
  },

  created() {
    this.$store.dispatch("getBlock", "WAP_BUYERPROCESS").then(res => {
      console.log(res.data.htmlText);
      this.buyProcessData = JSON.parse(res.data.htmlText);
    });
    this.$store.commit("SET_TITLE", "注册为茶帮通买家流程");

    // this.getHot();
    // this.getData();
  },
  methods: {}
};
</script>
<style scoped>
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
  color: red;
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