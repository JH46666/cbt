<template>
    <div id="pay-view">
        <div class="hd">
            <!-- 失败 -->
            <template v-if="$route.name === '结算显示' && $route.query.fail">
                <div class="fail-text">
                    <i class="icon-zhifushibai"></i>支付失败
                </div>
                <div class="fail-btn-wrap">
                    <mt-button type="default" @click="$router.push('/order/buyerlist?orderStatus=null')">查看订单</mt-button>
                    <mt-button type="default" @click="$router.push({name: '收银台',query: {payId: $route.query.payId,type:$route.query.type}})">立即支付</mt-button>
                </div>
            </template>
            <!-- 成功 -->
            <template v-if="$route.name === '结算显示' && !$route.query.fail">
              <template v-if="myData.payOrder.groupType==0">
                <div class="success-text">
                    <i class="icon-zhifuchenggong"></i>支付成功
                </div>
                <div class="success-btn-wrap">
                    <mt-button type="default" @click="$router.push('/order/buyerdetail?orderNo='+myData.orderInfo.orderNo)">查看订单</mt-button>
                </div>
              </template>
              <template v-if="myData.payOrder.groupType!=0">
                <div class="success-text" v-if="groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber==0">
                    <i class="icon-zhifuchenggong"></i>拼团成功
                </div>
                <div class="success-text" v-else-if="myData.payOrder.groupType==1">
                    <i class="icon-zhifuchenggong"></i>已开团，离成团仅剩<span>{{groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber}}</span>人
                </div>
                <div class="success-text" v-else-if="myData.payOrder.groupType==2">
                    <i class="icon-zhifuchenggong"></i>已参团，离成团仅剩<span>{{groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber}}</span>人
                </div>
                <div class="last-time" v-if="groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber!=0">
                  {{formateDate(leftTime)}}后结束
                </div>
                <div class="success-btn-wrap">
                    <mt-button type="default" @click="$router.push('/order/buyerdetail?orderNo='+myData.orderInfo.orderNo)">查看订单</mt-button>
                    <mt-button type="default"  v-if="groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber!=0" @click="$router.push('/share?orderId='+myData.orderInfo.id+'&open=true')">分享拼团</mt-button>
                </div>
              </template>

            </template>
            <!-- 货到付款 -->
            <!-- <template v-if="$route.name === '货到付款结算'">
                <div class="delivery-text">
                    <i class="icon-zhifuchenggong"></i>货到付款订单提交成功
                </div>
                <p class="wait">还需支付<span class="gold">￥{{ order.orderSum - order.cashDeliverySum | toFix2 }}</span></p>
                <div class="delivery-btn-wrap">
                    <mt-button type="default" @click="$router.push('/order/buyerlist?orderStatus=null')">查看订单</mt-button>
                    <mt-button type="default" @click="$router.push({name: '收银台',query: {payId: $route.query.payId,type:$route.query.type}})">立即支付</mt-button>
                </div>
            </template> -->
            <!-- 货到付款成功 -->
            <!-- <template v-if="$route.name === '货到付款成功'">
                <div class="delivery-text">
                    <i class="icon-zhifuchenggong"></i>货到付款订单提交成功
                </div>
                <p class="wait">还需支付<span class="gold">￥{{ order.orderSum | toFix2 }}</span></p>
                <div class="delivery-btn-wrap">
                    <mt-button type="default" @click="$router.push('/order/buyerlist?orderStatus=null')">查看订单</mt-button>
                    <mt-button type="default" @click="$router.push('/')">返回首页</mt-button>
                </div>
            </template> -->
            <div class="back-home" @click="$router.push('/')"  v-if="$route.name === '结算显示' && !$route.query.fail">返回首页</div>
        </div>
        <div class="bd">
            <div class="text-item">
                <div class="left">{{ address.receiptName }}</div>
                <div class="right">{{ address.phone }}</div>
            </div>
            <div class="text-item">
                <p>{{ address.address }}</p>
            </div>
            <div class="text-item" v-if="$route.name === '货到付款结算'">
                <div class="left">待付金额：</div>
                <div class="right"><span class="gold">￥{{ order.orderSum - order.cashDeliverySum | toFix2 }}</span></div>
            </div>
            <div class="text-item" v-if="$route.name === '结算显示' && !$route.query.fail">
                <div class="left">已付金额：</div>
                <div class="right"><span class="gold">￥{{ order.onlinePayAmount | toFix2 }}</span></div>
            </div>
            <div class="text-item" v-if="$route.name === '货到付款成功'">
                <div class="left">待付金额：</div>
                <div class="right"><span class="gold">￥{{ order.orderSum | toFix2 }}</span></div>
            </div>
            <div class="text-item" v-if="$route.query.fail">
                <div class="left">待付金额：</div>
                <div class="right"><span class="gold">￥{{ order.orderSum - order.cashDeliverySum | toFix2 }}</span></div>
            </div>
            <div class="text-item">
                <div class="left">支付方式：</div>
                <div class="right">{{ payType[order.payType] }}</div>
            </div>
        </div>
        <!-- 猜你喜欢 -->
        <!-- <may-like v-if="$route.name === '结算显示' && !$route.query.fail || $route.name === '货到付款成功'"></may-like> -->
        <!-- 为你推荐 -->
        <div class="suggest_wrapper" v-if="$route.name === '结算显示' && !$route.query.fail || $route.name === '货到付款成功'">
            <div class="suggest_head">
                <div class="suggest_title">
                  <div>大家都在团</div>
                </div>
            </div>
            <div class="suggest_content">
                <div class="suggest_item" v-for="(item,index) in listData" :key="index" @click="$router.push({name: '商品详情',query:{proSku: item.proSku}})">
                    <div class="sugget_img"><img :src="item.proImg" /></div>
                    <p class="suggest_text">{{ item.proName }}</p>
                    <div class="product-price">
                      <template  v-if="!$tool.isLogin()">
                          <div class="off_shelf_tips">
                              ￥{{item.hidePriceGroups}}
                          </div>
                          <div class="detail_suggest_price">￥{{ item.proPrice | toFix2 }}</div>
                      </template>
                      <template v-else>
                          <div class="detail_now_price">
                              ￥{{item.priceGroups | toFix2  }}
                          </div>
                          <div class="detail_suggest_price">￥{{ item.proPrice | toFix2 }}</div>
                      </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="go-index" v-if="$route.query.fail">
            <mt-button type="default" @click="$router.push('/')" class="goback-index">返回首页</mt-button>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import store from 'store';
    import api from 'api';
    export default {
        data() {
            return {
                myData: {
                  payOrder:''
                },
                payType: {
                    ONLINE: '在线支付',
                    CASH_DELIVERY: '货到付款'
                },
                groupData:'',
                leftTime:'',
                listData:[]
            }
        },
        computed: {
            address() {
                return this.myData.OrderConsignee || {};
            },
            order() {
                return this.myData.payOrder || {};
            }
        },
        methods: {
            // 设置数据
            setData(data) {
                this.myData = data;
                this.searchGroup().then((res)=>{
                  this.groupData = res.data;
                  this.leftTime = this.sortTime(res.data.groupPurchase.createTime,res.data.groupPurchase.systemTime)
                  this.timeOut();
                })
            },
            searchGroup(){
              let data = {
                'payId': this.myData.payOrder.id
              }
              return new Promise((resolve,reject) =>{
                this.$api.post('/oteao/groupPurchase/seachGroupByPayId',data,res=>{
                    resolve(res);
                }),res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                }
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
              let leftTime = parseInt((endTime.getTime()-nowTime.getTime()))+24*60*60*1000
              return leftTime;
            },
            formateDate(time){
              let h = this.formate(parseInt(time/(1000*60*60)%24))
              let m = this.formate(parseInt(time/60/1000%60))
              let s = this.formate(parseInt(time/1000%60))
              let ms = parseInt(time/100%10)
              if(time <= 0){
                  return '00:00:00.0';
              }else{
                  return h+':'+m+':'+s+'.'+ms;
              }
            },
            // 倒计时
            timeOut(){
              let time = setInterval(()=>{            // 倒计时
                 this.leftTime = this.leftTime-100;
             },100)
           },

        },
        created() {
            if(this.$route.query.wx === 'wxpaycallback') {
                this.$api.post('/payOrder/queryWxPay',{
                    payId: this.$route.query.payId
                },res => {
                    if(res.data.trade_state_desc === '订单未支付') {
                        this.$router.replace({name: '结算显示',query: {payId: this.$route.query.payId,type: this.$route.query.type,fail: true}})
                    }
                })
            }
            //获取为您推荐集合
            this.$api.get('/oteao/productCollection/getCollectionDetail',{
                'device': 'WAP',
                'sysId': 1,
                'collection.collectionNo': 'wap_hometuijian'
            },res=>{
                this.listData = res.data.proExtInfoVoList;
            })

        },
        beforeRouteEnter(to, from, next) {

            // 判断付款单
            if(!to.query.payId) {
                next(vm => vm.$router.push('/'))
            }

            // 判断是否登陆
            let getData = () => {
                api.post('/oteao/payOrder/queryPayOrderById',{
                    payOrderId: to.query.payId
                },res => {
                    next(vm => {
                        vm.setData(res.data)
                    })
                },res => {
                    next(vm => {
                        vm.$toast(res.message);
                        vm.$router.go(0);
                    })
                })
            }

            if(store.state.member.member.id) {
                getData();
            } else {
                store.dispatch('getMemberData').then(res => {
                    getData();
                }).catch(res =>{
                    next(vm => {
                        vm.$router.push('/login')
                    })
                })
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('~@/styles/balance/payView.less');
</style>
