<template>
  <div class="share">
    <div class="product-info">
      <div class="product-img">
        <img :src="detailData.productImgList[0].imgUrl"/>
      </div>
      <div class="product-data">
        <div class="product-title">{{ detailData.productExtInfo.title }}</div>
        <div class="product-price">
          <div class="detail-groupnum">
                {{detailData.productInfo.memberNum}}人拼团价
          </div>
          <template  v-if="detailData.productExtInfo.state === 'OFF_SHELF' &&  loginId && state === 'ACTIVE'">
              <div class="off_shelf_tips">
                  暂无报价
              </div>
          </template>
          <template  v-if="!loginId && state != 'ACTIVE'">
              <div class="off_shelf_tips">
                  ￥{{detailData.productInfo.hideGroupsPrice}}
              </div>
          </template>
          <template v-if="detailData.productPrice.length != 0 && detailData.productExtInfo.state === 'ON_SHELF' &&  loginId && state === 'ACTIVE'">
                  <div class="detail_now_price">
                      ￥{{detailData.productInfo.priceFightGrops | toFix2  }}
                  </div>
                  <div class="detail_suggest_price">￥{{ detailData.productPrice[0].price | toFix2 }}</div>
          </template>
        </div>
      </div>
    </div>

    <div class="group-info">
      <div class="group-title">
        <div>已开团，仅剩<span>{{groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber}}</span>人名额</div>
      </div>
      <div class="group-lasttime">
          {{formateDate(leftTime)}}后结束
      </div>
      <div class="group-tip">
        好货手慢无，开来拼团啦~
      </div>
    </div>
  </div>
</template>
<script>
import store from 'store';
export default {
  data(){
    return{
      leftTime:'',
      orderId:'',
      groupData:'',
      proSku:'',
      loginId: null,
      state: '',
      detailData: {
          integralPrice:null,
          productExtInfo: {},
          productImgList:[],
          productInfo:{},
          productPrice:[]
      },
    }
  },
  created(){

    this.$store.dispatch('getMemberData').then(()=>{
        let status = store.state.member.memberAccount.status;
        if(!store.state.member.member.id){
           return this.$router.push({name: '账户登录'});
        }
        if(status === 'WAIT_AUDIT') {
            return this.$messageBox({
                title:'提示',
                message:`您的账号审核中，只有正式会员才以买买买，若有疑问，请联系客服400-996-3399`,
                confirmButtonText: '我知道了'
            }).then(res => {
            });
        }
        if(status === 'INACTIVE' || status == 'AUDIT_NO_PASS') {
            return this.$messageBox({
                title:'提示',
                message:`您的账号审核未通过，只有正式会员才可以买买买，若有疑问，请联系客服400-996-3399`,
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonText: '完善资料'
            }).then(res => {
                if(res === 'cancel') {
                    return;
                } else {
                    if(store.state.member.orgDTO){
                        this.$router.push({
                            name: '茶帮通注册3',
                            query: {
                                edit: 'buyer'
                            }
                        })
                    }else{
                        this.$router.push({
                            name: '茶帮通注册2'
                        })
                    }
                }
            })
        }
        if(status === 'FREEZE') {
            return this.$messageBox({
                title:'提示',
                message:`您的账号因违规操作而被冻结无法买买买~若有疑问，请联系客服400-996-3399`,
                confirmButtonText: '我知道了'
            }).then(res => {
                 this.selected = null;
            });
        }
        // 设置title
        this.$store.commit('SET_TITLE','茶帮通拼团');
        this.orderId = this.$route.query.orderId;
        this.loginId = store.state.member.member.id;
        this.state = store.state.member.memberAccount.status;
        this.searchGroup().then((res) =>{
          this.groupData = res.data;
          this.proSku = res.data.groupPurchase.proSku;
          this.leftTime = this.sortTime(res.data.groupPurchase.createTime,res.data.groupPurchase.systemTime)
          this.timeOut();
          this.getProInfo().then((res) =>{
            this.detailData = res.data
          })
        })
    }).catch((res)=>{
        return this.$router.push({name: '账户登录'});
    })
  },
  methods: {
    searchGroup(){
      let data = {
        'orderId': this.orderId
      }
      return new Promise((resolve,reject) =>{
        this.$api.post('/oteao/groupPurchase/seachGroupByOrder ',data,res=>{
            resolve(res);
        }),res=>{
            return Toast({
                message: res.errorMsg,
                iconClass: 'icon icon-fail'
            });
        }
      })
    },
    getProInfo(){
      let data = {
          sysId: 1,
          device: 'WAP',
          productSku: this.proSku
      }
      return new Promise((resolve,reject) => {
          this.$api.get('/oteao/productInfo/getProExtInfo',data,res => {
              resolve(res);
          },res=>{
              return Toast({
                  message: res.errorMsg,
                  iconClass: 'icon icon-fail'
              });
          })
      })
    },
    formate (time) {            // 倒计时部分
        if(time>=10){
            return time
        }else{
            return `0${time}`
        }
    },
    sortTime(startTime,systemTime){
      const endTime = new Date(startTime);
      const nowTime = new Date(systemTime);
      let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)+24*60*60
      return leftTime;
    },
    formateDate(time){
      let h = this.formate(parseInt(time/(60*60)%24))
      let m = this.formate(parseInt(time/60%60))
      let s = this.formate(parseInt(time%60))
      if(time <= 0){
          return '00:00:00';
      }else{
          return h+':'+m+':'+s;
      }
    },
    // 倒计时
    timeOut(){
      let time = setInterval(()=>{            // 倒计时
         this.leftTime --;
     },1000)
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/styles/share/share.less';
</style>
