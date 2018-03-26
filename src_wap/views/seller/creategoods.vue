<template>
<div class="creatgoods-container">
  <h5 class="title" @click="clickfun(1)">1.选择分类</h5>
  <div class="steps" v-if="isShowArr[0]" >
    <div class="steps-text">
      <p>点选“选择商品分类”，选择您要上架的茶对应的品类，如您要上架的商品是正山小种，即选择红茶-正山小种。</p>
    </div>
    <img src="http://img0.oteao.com/WAPIMG/share/01fb.png" alt="">
    <img src="http://img1.oteao.com/WAPIMG/share/02fb.png" alt="">
  </div>
  <h5 class="title" @click="clickfun(2)">2.商品基本信息</h5>
  <div class="steps" v-if="isShowArr[1]">
    <div class="steps-text">
      <p class="tips-text-wrap"> <span class="tips_icons"><img src="http://img2.oteao.com/WAPIMG/share/cbt_ts.png" alt=""></span>
      栏位均为 <span class="color-red">必填项</span> ，填写商品基本信息</p>
      <p><span class="small-t">商品卖点：</span><br>
      <span class="color-red">展示组成=商品卖点+商品品类+工艺+香型+采摘时间</span><br>如：黄勇大师手作，仅限100斤 获奖茶-铁观音清香型2018年春茶。
      限定30个字符（汉字、英文、标点都计算1个字符）<br>尽量简明扼要，能让买家即使瞄一眼，也能晓得商品的特点，知道它是什么商品，不能出现和商品不符、侵犯他人知识产权或违反广告法的关键词，比如品牌夸大“全国第一“、”最大“等字眼。</p>
      <p><span class="small-t">品牌：</span><br>默认其它品牌，可下拉选择您所要的品牌。
      </p>
      <p><span class="small-t">重量（含包装）:</span><br>
      <span class="color-red">计量单位为g</span>，纯数字填写，请填写一件商品的实际重量若您运费设定的是不包邮，则商品的重量会影响运费的计算。
      </p>
      <p><span class="small-t">库存：</span><br>纯整数数字填写，请填写商品的实际库存量。
      </p>
    </div>
      <img src="http://img3.oteao.com/WAPIMG/share/03fb.png" alt="">
  </div>
  <h5 class="title" @click="clickfun(3)">3.商品价格信息</h5>
  <div class="steps" v-if="isShowArr[2]">
    <div class="steps-text">
      <p class="tips-text-wrap">
      <span class="tips_icons">
      <img src="http://img4.oteao.com/WAPIMG/share/cbt_ts.png" alt="">
      </span>栏位均为 
      <span class="color-red">必填项</span> ，影响到商品的购买
      </p>
      <p><span class="small-t">市场价：</span><br>仅用于商品的建议价格展示，须大于单买价<br> 
      <p><span class="small-t">单买价：</span><br>一个人单独购买的价格，不需要与他人拼团，此价格需大于团购价。
      </p>
      <p><span class="small-t">团购价:</span><br>拼团价格，此栏位与团购人数是捆绑关系，用于拼团价格显示。
      </p>
      <p><span class="small-t">团购人数：</span><br>介于2-10人，即支付购买人数要满足“团购的人数”，才代表开团成功。
      </p>
    </div>
    <img src="http://img0.oteao.com/WAPIMG/share/04fb.png" alt="">
    <div id="small-m">对应价格在前台展示位置</div>
    <img src="http://img1.oteao.com/WAPIMG/share/05fb.png" alt="">
  </div>
  <h5 class="title" @click="clickfun(4)">4.商品属性信息</h5>
  <div class="steps" v-if="isShowArr[3]">
    <div class="steps-text">
      <p class="tips-text-wrap"> 
      <span class="tips_icons">
      <img src="http://img2.oteao.com/WAPIMG/share/cbt_ts.png" alt="">
      </span>属性信息为
      <span class="color-red">选填项</span> ，填写可提升商品的搜索曝光率
      </p>
      <p>属性信息如采摘季节、产地等，用于商品详情的展示</p>
    </div>
    <img src="http://img3.oteao.com/WAPIMG/share/06fb.png" alt="">
    <p>商品属性信息前台展示效果</p>
    <img src="http://img4.oteao.com/WAPIMG/share/07fb.png" alt="">
  </div>
  <h5 class="title" @click="clickfun(5)">5.商品轮播图</h5>
  <div class="steps" v-if="isShowArr[4]">
    <div class="steps-text">
      <p class="tips-text-wrap"> <span class="tips_icons"><img src="http://img0.oteao.com/WAPIMG/share/cbt_ts.png" alt=""></span>第一张图为商品主图即封面图，将展示于搜索页面、活动页面等，主图白底更佳哦~</p>
      <p>支持拍照或相册传图方式，最少需上传1张，最多可传5张商品图片，上传后若不满意，可点选右上角“×”按钮将图片移除重新上传。<br>上传的图片建议800*800像素，等宽高，单张图片小于8M的清晰商品照片。</p>
    </div>
    <img src="http://img1.oteao.com/WAPIMG/share/08fb.png" alt="">
    <!-- <div class="steps-text"> -->
    <p>商品轮播图前台展示效果</p>
    <!-- </div> -->
    <img src="http://img2.oteao.com/WAPIMG/share/09fb.png" alt="">
  </div>
  <h5 class="title" @click="clickfun(6)">6.商品详情展示</h5>
  <div class="steps" v-if="isShowArr[5]">
    <div class="steps-text">
      <p>支持图片拍照或相册图片上传，最多可传10张。建议图片宽度使用750像素，并且单张图片不得超过8M，系统会根据您上传的顺序，将图片拼接展示于商品详情中，考虑商品展示的美观度，图片尽量保持尺寸的一致及风格的统一。</p>
    </div>
    <img src="http://img3.oteao.com/WAPIMG/share/10fb.png" alt="">
    <div class="steps-text">
      <p>上一步：点选后，将返回商品信息填写页，系统会为您暂时保存你上传过的商品轮播图 及详情页面 。<br>
      “保存”：系统会将保存您的商品资料，但买家看不到您的商品，您可在商品管理-未上架商品中找到该商品；<br>
      “保存并上架”：商品成功上架，客户可以在茶帮通搜到这款商品啦~</p>
    </div>
  </div> 

</div>
</template>

<script>
export default {
  data() {
    return {
      isShowArr: [true, false, false, false, false, false]
    };
  },

  created() {
    // this.$store.dispatch("getBlock", "WAP_CREATE_GOODS").then(res => {
    //   console.log(res.data.htmlText);
    //   this.creategdDatas = res.data.htmlText;
    // });
    this.$store.commit("SET_TITLE", "如何创建商品");

    // this.getHot();
    // this.getData();
  },
  methods: {
    clickfun(index) {
      if (index == 1) {
        this.isShowArr[0] = !this.isShowArr[0];
        this.isShowArr.splice(this.isShowArr.length);
        //   console.log(this.isShowArr[0]);
        // console.log(!this.isShowArr[0]);
        //  this.isShowArr[0] = !this.isShowArr[0];
        //  this.$set(isShowArr,isShowArr[0],false)
        // this.isShowArr[0] = 2;
        // this.flag = !this.flag;
      }

      if (index == 2) {
        this.isShowArr[1] = !this.isShowArr[1];
        this.isShowArr.splice(this.isShowArr.length);
      }

      if (index == 3) {
        this.isShowArr[2] = !this.isShowArr[2];
        this.isShowArr.splice(this.isShowArr.length);
      }

      if (index == 4) {
        this.isShowArr[3] = !this.isShowArr[3];
        this.isShowArr.splice(this.isShowArr.length);
      }

      if (index == 5) {
        this.isShowArr[4] = !this.isShowArr[4];
        this.isShowArr.splice(this.isShowArr.length);
      }

      if (index == 6) {
        this.isShowArr[5] = !this.isShowArr[5];
        this.isShowArr.splice(this.isShowArr.length);
      }
      //  console.log(this.isShowArr[0])
      //  console.log(this.isShowArr[1])
      //  console.log(this.isShowArr[2])
      //  console.log(this.isShowArr[3])
      //  console.log(this.isShowArr[4]+"/")
    }
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
  border-color: transparent transparent #f5f5f5 transparent;
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
  line-height: 0.42rem;
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
  width: 70%;
  margin: 0 auto 0.29rem;
}
.tips-text-wrap {
  position: relative;
  padding-left: 0.36rem;
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
</style>

