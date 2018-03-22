<template>
  <div class="rules-container">
      <ul class="rules-wrap">
          <li v-for="(collitem,index) in rulesData.collData" :key='index'>
              <ul>
                  <li class="title">{{collitem.title}}</li>
                  <li class="text">{{collitem.text}}</li>
              </ul>
          </li>
      </ul>
      <ul class="tips-wrap">
          <li  v-for="(detailitem,index) in rulesData.detailData" :key='index'>
              <ul>
                  <li class="tips-text"><i class="tips-order">{{index+1}}</i>{{detailitem.tips}}</li>
                 <img class="tips-img" v-bind:src="detailitem.img" alt="">
              </ul>
          </li>
        <div class="line"></div>
      </ul>
        <div class="footer">醉品集团在法律允许范围保留对规则最终解释权</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rulesData:""
      //  {
      //   collData: [
      //     {
      //       title: "什么是多人拼团？",
      //       text:
      //         "多人拼团（以下简称：拼团）是指由多人一起拼单购买的团购活动，通过拼团买家可以享受比一般网购更低的折扣。"
      //     },
      //     {
      //       title: "怎样算拼团成功？",
      //       text:
      //         "支付货款发起拼团，每个团的有效期为24小时，在有效期内找到满足人数的好友参加拼团，即可算拼团成功。"
      //     },
      //     {
      //       title: "拼团失败，怎样退款？",
      //       text:
      //         "若24小时内没有凑齐人数，即算作拼团失败。系统会自动将所支付的货款原路退回，具体到账时间以各银行为准。"
      //     },
      //     {
      //       title: "拼团流程",
      //       text: " * 以下截图均为案例，实际价格等以线上为主 *"
      //     }
      //   ],
      //   detailData: [
      //     {
      //       tips: "选择商品，点击商品的团购按钮",
      //       img:
      //         "http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/01.png"
      //     },

      //     {
      //       tips: "选择支付方式，完成付款，即可开团 ",
      //       img:
      //         "http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/02.png"
      //     },
      //     {
      //       tips: "支付成功，选择“分享拼团”",
      //       img:
      //         "http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/03.png"
      //     },
      //     {
      //       tips: "通过“微信分享”或者“复制链接”分享给好友 ",
      //       img:
      //         "http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/04.png"
      //     },
      //     {
      //       tips: "好友点击“参与拼团”完成支付后即成功参团",
      //       img:
      //         "http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/05.png"
      //     },
      //     {
      //       tips: "24小时内达拼团人数团购成功等待商家发货",
      //       img:
      //         "http://imgcbt.oss-cn-hangzhou.aliyuncs.com/WAPIMG/share/06.png"
      //     }
      //   ]
      // },
    };
  },

  created() {
    this.$store.dispatch("getBlock", "WAP_COLLAGE_RULES").then(res => {

      this.rulesData = JSON.parse(res.data.htmlText);
      console.log(this.rulesData)
    });
    this.$store.commit("SET_TITLE", "拼团需知");
    // this.getHot();
    // this.getData();
  }
};
</script>
<style lang="less" scoped>
@import "~@/styles/share/collageddetail.less";
</style>

