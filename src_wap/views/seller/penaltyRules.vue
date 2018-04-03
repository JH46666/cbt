<template>
    <div class="penalty-rules"  v-if="penaltyRulesData ? true :false">
  
        <h4 class="title">{{penaltyRulesData.titletext.title1}}</h4>
        <div class="steps">
            <p v-html="penaltyRulesData.steps1.text"></p>
        </div>
        <h4 class="title">{{penaltyRulesData.titletext.title2}}</h4>
        <div class="steps">
            <p>{{penaltyRulesData.steps2.text.text1}}</p>
             <div class="preview-img-list">
                <img class="preview-img-item img" 
                    :src="penaltyRulesData.steps2.imgSrc" @click="$photoswipe.open(0, penaltyRulesData.items)">
            </div>
            <p>{{penaltyRulesData.steps2.text.text2}}</p>
        </div>
        <h4 class="title">{{penaltyRulesData.titletext.title3}}</h4>
         <div class="steps">
            <p>{{penaltyRulesData.steps3.text.text1}}</p>
             <div class="preview-img-list">
                <img class="preview-img-item img" 
                    :src="penaltyRulesData.steps3.imgSrc" @click="$photoswipe.open(1, penaltyRulesData.items)">
            </div>
            <p>{{penaltyRulesData.steps3.text.text2}}</p>
        </div>
        <h4 class="title">{{penaltyRulesData.titletext.title4}}</h4>
         <div class="steps">
            <p>{{penaltyRulesData.steps4.text.text1}}</p>
            <p class="thirdtitle" v-for="item in penaltyRulesData.steps4.texeOneContent">{{item.text}}</p>
            <p>{{penaltyRulesData.steps4.text.text2}}</p>
            <p class="thirdtitle" v-html="penaltyRulesData.steps4.texeTwoContent.text1"></p>
            <p class="thirdtitle">{{penaltyRulesData.steps4.texeTwoContent.text2}}</p>
            <div class="preview-img-list">
                <img class="preview-img-item spelImg" 
                    :src="penaltyRulesData.steps4.texeTwoContent.imgSrc" @click="$photoswipe.open(2, penaltyRulesData.items)">
            </div>
            <p class="thirdtitle">{{penaltyRulesData.steps4.texeTwoContent.text3}}</p>
            <p>{{penaltyRulesData.steps4.text.text3}}</p>
            <p>{{penaltyRulesData.steps4.text.text4}}</p>
            <div class="preview-img-list">
                <img class="preview-img-item img " 
                    :src="penaltyRulesData.steps4.text.imgSrc" @click="$photoswipe.open(3, penaltyRulesData.items)">
            </div>
            <p>{{penaltyRulesData.steps4.text.text5}}</p>
        </div>
        <h4 class="title">{{penaltyRulesData.titletext.title5}}</h4>
        <div class="steps">
            <p>{{penaltyRulesData.steps5.text.text1}}</p>
            <p>{{penaltyRulesData.steps5.text.text2}}</p>
            <div class="thirdtitle" v-for="item in penaltyRulesData.steps5.texeTwoContent">
                <p  class="thirdtitle" v-html="item.text"></p>
            </div>
            <p>{{penaltyRulesData.steps5.text.text3}}</p>
            <div v-for="item in penaltyRulesData.steps5.texeThirdContent">
                <p  class="thirdtitle" v-html="item.text"></p>
            </div>
            <p>{{penaltyRulesData.steps5.text.text4}}</p>
            <div class="preview-img-list">
                <img class="preview-img-item img" 
                    :src="penaltyRulesData.steps5.text.imgSrc" @click="$photoswipe.open(4, penaltyRulesData.items)">
            </div>
            <p>{{penaltyRulesData.steps5.text.text5}}</p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        penaltyRulesData:""
        // {
        //     "items": [{
        //             "src":"http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/cbt_mjcf01.jpg",
        //             "w": "1024",
        //             "h": "768"
        //         }, {
        //             "src": "http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/cbt_mjcf02.jpg",
        //             "w": "1024",
        //             "h": "768"
        //         }, {
        //             "src": "http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/cbt_mjcf03.jpg",
        //             "w": "1024",
        //             "h": "768"
        //         }, {
        //             "src": "http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/cbt_mjcf04.jpg",
        //             "w": "1024",
        //             "h": "768"
        //         }, {
        //             "src": "http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/cbt_mjcf05.jpg",
        //             "w": "1024",
        //             "h": "768"
        //         }],
        //     "titletext":{
        //         "title1":"1. 总则",
        //         "title2":"2. 发货时限",
        //         "title3":"3. 延迟发货的处理",
        //         "title4":"4. 虚假发货的处理",
        //         "title5":"5. 欺诈发货的处理"
        //     },
        //     "steps1":{
        //         "text":"1.1 除部分特殊类目商家与平台另行协商确定特殊发货时限外，茶帮通入驻商家必须在本规则规定的默认发货时限内完成商品的发货并在茶帮通后台上传真实的物流单号。"
        //     },
        //     "steps2":{
        //         "text":{
        //             "text1":"2.1  各类目默认发货时限如下：",
        //             "text2":"2.2 直邮类目是指商家从海外（中国大陆境外，包括香港、澳门、台湾）直接发货的商品；直供类目商品是指商家从中国大陆海关指定的保税仓发货的商品；常规类目商品是指商家在中国大陆范围内直接发货的商品。"
        //         },
        //         "imgSrc":"http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/cbt_mjcf01.jpg"
        //     },
        //     "steps3":{
        //         "text":{
        //             "text1":"3.1 延迟发货是指商家未在发货期限内完成发货。平台关于延迟发货的判定标准是，如果商家未在发货时限内上传已成团商品订单对应的真实的物流单号到茶帮通后台，则依据本规则及相应的技术标准，该订单被自动标识为延迟发货订单。",
        //             "text2":"3.2 上表中的“未发货”是指：商家未在发货时限内上传已成团商品订单对应的真实物流单号到茶帮通后台。"
        //         },
        //         "imgSrc":"http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/cbt_mjcf02.jpg"
        //     },
        //     "steps4":{
        //         "text":{
        //              "text1":"4.1 虚假发货是指商家已经上传商品物流单号至茶帮通后台，但是该物流单号对应的物流信息存在明显的物流轨迹放缓等异常情形或商家上传物流单号后消费者在合理期限内未实际收到所购商品。",
        //              "text2":"4.2  虚假发货包括但不限于以下情形：",
        //              "text3":"4.3   虚假发货订单的处理：",
        //              "text4":"4.4 虚假发货对应商家店铺处理商家在自然年内一旦发生虚假发货，茶帮通平台对虚假发货订单作出处理的同时，还有权对店铺采取相应的处理措施。具体处理措施如下：",
        //              "text5":"本条款所称“虚假发货”均指商家当日某商品的发货订单总量中，发送虚假发货的订单满10单，并且达到发货订单总量的5%（含）以上的情形。",
        //             "imgSrc":"http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/cbt_mjcf03.jpg"
        //         },
                
        //         "texeOneContent":[
        //             {
        //                 "text":"4.2.1 商家上传物流单号后的24小时内，该物流单号在相应物流公司官网没有揽件信息；"
        //             },
                    
        //             {
        //                 "text":"4.2.2 商家上传物流单号后的24小时内，改物流单号在相应物流公司官网有揽件信息，但此后的24小时内没有后续的物流信息更新；"
        //             },
        //             {
        //                 "text":"4.2.3 商家上传商品物流单号后的24小时内，该物流单号在相应物流公司官网有揽件信息，但存在多条异常重复揽件信息；"
        //             },
        //             {
        //                 "text":"4.2.4 商家上传商品的物流单号后，改物流单号对应的物流轨迹与消费者订单确认的收货地址不符；"
        //             },
        //             {
        //                 "text":"4.2.5 其他订单物流信息异常或者消费者在发货后合理期限内未实际收到所购商品的情形。"
        //             }
        //         ],
        //         "texeTwoContent":{
        //             "text1":"4.3.1 作虚假发货处理的订单数量按照以下方法确定在同一天内： <br>(1).若商家当日某商品的发货订单总量中，发生虚假发货的订单满10单，并且达到发货订单总量的5%（含）以上，则对当日发货的该商品全部订单按照4.3条、4.4条规定作虚假发货处理； <br>(2).若商家当日某商品的发货订单总量中，发送虚假发货的订单不满10单，或者未达到发货订单总量的5%，则对已发现的虚假发货订单按照4.3.2条、4.3.3条规定作虚假发货处理。",
        //             "text2":"4.3.2  商家发生虚假发货后，茶帮通平台有权从商家的账户余额及/或保证金中扣除对应的消费者赔付金，并且茶帮通平台有权将对应赔付金以50年有效期的无门槛现金券形式发放给虚假发货处理订单对应的消费者，赔付金额如下：",
        //             "text3":"4.3.3 茶帮通平台按照4.3.2条对商家虚假发货行为作出处理的同时，有权对商家账户余额采取限制提现措施至少15天（“限制提现期”），在此期间对虚假发货订单进行持续检测，并自限制提现期满之次日起对虚假发货订单处理完毕的商家进行账户余额<br>解冻。",
        //             "imgSrc":"http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/cbt_mjcf04.jpg"
        //         }
        //     },
        //     "steps5":{
        //         "text":{
        //              "text1":"5.1 欺诈发货是指商家在发货过程中向消费者发送空包裹或与商品描述明显不符的其他物品，或者实施其他情节严重的欺诈行为。",
        //              "text2":"5.2   欺诈发货包括但不限于下列情形：",
        //              "text3":"5.3   欺诈发货订单的处理 ",
        //              "text4":"5.4   欺诈发货对应商家店铺处理：商家在自然年内一旦发生欺诈发货，茶帮通平台在对欺诈发货订单进行处理的同时，还有对店铺采取相应的处理措施。具体处理措施如下：",
        //              "text5":"处罚本条款所称“欺诈发货”均指商家当日某商品的发货订单总量中，发生欺诈发货的订单满10单，并且达到发货订单总量的1%（含）以上的情形。",
        //             "imgSrc":"http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/cbt_mjcf05.jpg"
        //         },
        //         "texeTwoContent":[
        //             {
        //                 "text":"5.2.1 商家上传订单物流单号后，消费者收到空包裹的；"
        //             },
        //             {
        //                 "text":"5.2.2 商家上传订单物流单号后，消费者收到与商品描述明显不符的其他物品的；"
        //             },
        //             {
        //                 "text":"5.2.3 商家在发货过程中实施欺诈行为，导致消费者在收获后合理期限内未实际收到所购商品，情节严重的情形。"
        //             }
        //         ],
                
        //         "texeThirdContent":[
        //             {
        //                 "text":"5.3.1 作欺诈发货处理订单的数量按照以下方法确定：在同一天，<br>(1).若商家当日某商品的发货订单总量中，发生欺诈发货的订单满10单，并且达到发货订单总量的1%（含）以上，则对当日发货的该商品全部订单按照5.3条、5.4条规定作欺诈发货处理；<br>(2).若商家当日某商品的发货订单总量中，发生欺诈发货的订单不满10单，或者未达到发货总量的1%，则对已发现的欺诈发货订单按照5.3.2条、5.3.4条作欺诈发货处理。"
        //             },
        //             {
        //                 "text":"5.3.2 对于作欺诈发货处理的订单，茶帮通平台有权采取下列一项或多项措施： <br>(1).关闭交易并对消费者进行退款；<br>(2).自商家的账户余额及/或保证金中扣除相当于作欺诈发货处理订单金额一倍的消费者赔付金；<br> (3).将上述赔偿金以50年有效期的无门槛现金券形式发放给作欺诈发货处理订单所对应的消费者。"
        //             },
        //             {
        //                 "text":"5.3.3 茶帮通平台同时有权对商家账户余额采取限制提现措施至少15天，在此期间对欺诈发货订单进行持续监测，并自限制提现期满之次日起对欺诈发货订单全部处理完毕的商家进行账户余额解冻。"
        //             }
        //         ]

        //     }
            
        // }
    }
  },
 mounted(){
    //  this.openPhotoSwipe();
 },
  created() {
    this.$store.dispatch("getBlock", "WAP_PENALTYRULES").then(res => {
    //   console.log(res.data.htmlText);
      this.penaltyRulesData = JSON.parse(res.data.htmlText);
    });
    this.$store.commit("SET_TITLE", "茶帮通处罚规则");

    // this.getHot();
    // this.getData();
  },
  methods: {

  }
};
</script>

<style scoped>
.penalty-rules {
  background: #fafafa;
  position: relative;
  user-select: element;
}
.img{
    width: 100%;
    margin: 0.15rem 0 0.17rem;
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
  padding: 0.2rem 0.31rem 0.11rem 0.31rem;
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
  padding-bottom: 0.3rem;
}
.thirdtitle{
    padding-left: 0.6rem;
    padding-bottom: 0.29rem;
}
.spelImg{
    width: 90%;
    margin: 0.15rem 0 0.17rem 0.6rem;
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
/* img {
  display: block;
  width: 80%;
  margin: 0 auto 0.29rem;
} */
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