<template>
  <div class="detailspf-container" v-if="detailspfData">
     <h5 class="title">{{detailspfData.title.title1}}</h5>
     <div class="steps">
         <p>{{detailspfData.steps1.text}}</p>
         <img :src="detailspfData.steps1.imgSrc" alt="">
     </div>
     <h5 class="title">{{detailspfData.title.title2}}</h5>
     <div class="steps">
         <img style="width:100%;" :src="detailspfData.steps2.imgSrc" alt="">
         <p style=" text-align: center;padding:0.48rem 0 0.2rem 0;">{{detailspfData.steps2.text}}</p>
         <div v-for="item in detailspfData.steps2.imgArr">
           <img :src="item.imgSrc" alt="">
         </div>
     </div>
     <h5 class="title">{{detailspfData.title.title3}}</h5>
     <div class="steps last-step">
         <p>{{detailspfData.steps3.text1}}</p>
         <div v-for="item in detailspfData.steps3.imgAText">
           <p class="tips-text-wrap"> <span class="tips_icons"><img :src="detailspfData.steps3.iconSrc" alt=""></span>{{item.text}}</p>
            <img :src="item.imgSrc" alt="">
         </div>
          <p class="tips-text-wrap"> <span class="tips_icons"><img :src="detailspfData.steps3.iconSrc" alt=""></span> {{detailspfData.steps3.text}}</p>
         <img class="last-img" :src="detailspfData.steps3.imgSrc" alt="">
         <p>{{detailspfData.steps3.text2}}</p>
     </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailspfData:""
      // {
      //   "title":{
      //     "title1":"尺寸规范",
      //     "title2":"建议内容模板",
      //     "title3":"特别说明"
      //   },
      //   "steps1":{
      //     "text":"建议使用宽度750像素的图片，每张图片可单屏展示效果更佳（大约在750*900像素）",
      //     "imgSrc":"http://img0.oteao.com/WAPIMG/share/01xqgf.png"
      //   },
      //   "steps2":{
      //     "imgSrc":"http://img0.oteao.com/WAPIMG/share/02xqgf.png",
      //     "text":"示例",
      //     "imgArr":[
      //       {
      //         "imgSrc":"http://img1.oteao.com/WAPIMG/share/03xqgf.png"
      //       },
      //       {
      //         "imgSrc":"http://img1.oteao.com/WAPIMG/share/04xqgf.png"
      //       },
      //       {
      //         "imgSrc":"http://img1.oteao.com/WAPIMG/share/05xqgf.png"
      //       },
      //       {
      //         "imgSrc":"http://img1.oteao.com/WAPIMG/share/06xqgf.png"
      //       },
      //       {
      //         "imgSrc":"http://img1.oteao.com/WAPIMG/share/07xqgf.png"
      //       },
      //       {
      //         "imgSrc":"http://img1.oteao.com/WAPIMG/share/08xqgf.png"
      //       }
      //     ]
      //   },
      //   "steps3":{
      //     "text1":"1.产品图片必须与信息内容所介绍的产品保持一致且产品照片存在以下任一问题请勿使用：",
      //     "text2":"2.图片尽量为实物图片，可以适当提供具有说明性的图片包装，条件允许的话可上传茶叶的质检报告、品牌简介、产品的资质证明等。",
      //     "iconSrc":"http://img2.oteao.com/WAPIMG/share/cbt_icxqgfjq.png",
      //     "imgAText":[
      //       {
      //         "text":"图片不清晰、变形；光线太暗，产品看不清",
      //         "imgSrc":"http://img0.oteao.com/WAPIMG/share/09xqgf.png"
      //       },
      //       {
      //         "text":"背景太乱或反光有倒影；产品不突出",
      //         "imgSrc":"http://img0.oteao.com/WAPIMG/share/10xqgf.png"
      //       }
      //     ],
      //     "text":"盗用他人版权图片，图中含有其他网站logo，色情等其他违法的信息、描述或图形。",
      //     "imgSrc":"http://img0.oteao.com/WAPIMG/share/11xqgf.png"
      //   }
      // }
    };
  },

  created() {
    this.$store.dispatch("getBlock", "WAP_DETAILSPL").then(res => {
      console.log(res.data.htmlText);
      this.detailspfData =  JSON.parse(res.data.htmlText);
       console.log(this.detailspfData);
    });
    this.$store.commit("SET_TITLE", "茶帮通商品详情规范");

    // this.getHot();
    // this.getData();
  },
  methods: {
  
  }
};
</script>
<style scoped>
.title {
  width: 7.5rem;
  height: 0.8rem;
  background-color: #fafafa;
  line-height: 0.8rem;
  padding-left: 0.3rem;
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.8rem;
  letter-spacing: 0rem;
  color: #333333;
  position: relative;
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
  border-color: transparent transparent #f5f5f5 transparent;
  position: absolute;
  left: 0.2rem;
  top: 0.44rem;
}
.steps {
  padding: 0.42rem 0.31rem 0.31rem 0.31rem;
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




img {
  display: block;
  width: 70%;
  margin: 0 auto 0.12rem;
}
.tips-text-wrap {
  position: relative;
  padding-left: 0.36rem;
}
.tips_icons {
  width: 0.31rem;
	height: 0.31rem;
  display: inline-block;
  margin: 0;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0.07rem;
}
.last-step img{
  margin-bottom: 0.45rem;
  width: 90%;
}
.last-step  .last-img{
  width: 2rem;
	height: 1.49rem;
  margin-left: 5%;
}
</style>

