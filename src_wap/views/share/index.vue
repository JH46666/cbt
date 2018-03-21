<template>
  <div class="share">
    <div class="product-info">
      <div class="product-img">
        <img />
      </div>
      <div class="product-data">
        <div class="product-title">元正 正山小种 2017春茶 临江 240g 特级 红茶</div>
        <div class="product-price">
          <!-- <div class="detail-groupnum">
              10人拼团价
          </div>
          <template  v-if="detailData.productExtInfo.state === 'OFF_SHELF' && loginId && state === 'ACTIVE'">
              <div class="off_shelf_tips">
                  暂无报价
              </div>
          </template>
          <template  v-if="!loginId || state != 'ACTIVE'">
              <div class="off_shelf_tips">
                  ￥{{detailData.productInfo.hideGroupsPrice}}
              </div>
          </template>
          <template v-if="detailData.productPrice.length != 0 && detailData.productExtInfo.state === 'ON_SHELF' && loginId && state === 'ACTIVE'">
                  <div class="detail_now_price">
                      ￥{{detailData.productInfo.priceFightGrops | toFix2  }}
                  </div>
                  <div class="detail_suggest_price">￥{{ detailData.productPrice[0].price | toFix2 }}</div>
          </template> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  created(){
    // 设置title
    this.$store.commit('SET_TITLE','茶帮通拼团');
    this.proSku = this.$route.query.proSku;
  }
}
</script>
<style lang="less" scoped>
@import '~@/styles/share/share.less';
</style>
