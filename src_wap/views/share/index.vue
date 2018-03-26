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
          <template  v-if="!loginId && state != 'ACTIVE'">
              <div class="detail_now_price">
                  ￥{{detailData.productInfo.hideGroupsPrice}}
              </div>
              <div class="detail_suggest_price">￥{{ detailData.productPrice[1].price | toFix2 }}</div>
          </template>
          <template v-if="detailData.productPrice.length != 0 &&  loginId && state === 'ACTIVE'">
                  <div class="detail_now_price">
                      ￥{{detailData.productInfo.priceFightGrops | toFix2  }}
                  </div>
                  <div class="detail_suggest_price">￥{{ detailData.productPrice[1].price | toFix2 }}</div>
          </template>
        </div>
      </div>
    </div>
    <div class="group-info">
      <div class="group-title">
        <div v-if="onShelf && !groupComplete && !isOutTime"><div>已开团，仅剩<span>{{groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber}}</span>人名额</div></div>
        <div v-else-if="onShelf && !groupComplete && isOutTime"><div>来晚了，该团超时结束啦</div></div>
        <div v-else-if="onShelf && groupComplete && !isOwn"><div>来晚了，该团人数已满</div></div>
        <div v-else-if="groupComplete" style="color: #13c21c;"><div>拼团成功</div></div>
        <div v-else-if="!onShelf && !groupComplete"><div>来晚了，商品售罄下架了</div></div>
      </div>
      <div class="group-lasttime one" v-if="onShelf && !groupComplete && !isOutTime"><i class="iconfont">&#xe6b1;</i>{{formateDate(leftTime)}}后结束</div>
      <div class="group-lasttime two" v-else-if="groupComplete"><i class="iconfont">&#xe6b0;</i>此团满员啦</div>
      <div class="group-lasttime three" v-else-if="!onShelf || isOutTime"><i class="iconfont">&#xe6b1;</i>已结束</div>

      <div class="group-tip" v-if="onShelf && !groupComplete && !isOutTime">好货手慢无，快来拼团啦~</div>
      <div class="group-tip" v-else-if="onShelf && groupComplete && isOwn">商家正在努力发货，您可以逛逛更多好货噢~</div>
      <div class="group-tip" v-else-if="!onShelf ">商品售罄，您可以再看看其他商品噢~</div>
      <div class="group-tip" v-else>您可以再开启或拼别人的团噢~</div>
      <div class="group-members">
        <div v-for="(item,index) in groupData.groupPurchaseDetails">
          <img :src="item.memberFace" v-if="item.memberFace">
          <div v-else class="noImg">{{item.memberUnitName!=''?String(item.memberUnitName).substr(0,2):'匿名'}}</div>
          <div v-if="index == 0" class="first-target">团长</div>
        </div>
        <div v-if="!groupComplete" v-for="item in (groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber)">
          <img src="../../assets/cbt_icwctportrait.png">
        </div>
      </div>
      <div class="join-btn" v-if="!isOwn && onShelf && !groupComplete && !isOutTime"  @click="addCartInfo(2,groupData.groupPurchase.id)">
        参与拼团
      </div>
      <div class="join-btn" v-if="isOwn && onShelf && !groupComplete && !isOutTime" @click="shareDialogFlag = true">
        分享拼团
      </div>
      <div class="join-btn" v-if="(isOwn && !onShelf)||(isOwn && groupComplete && onShelf)||(!isOwn && !onShelf) " @click="$router.push('/')">
        去首页逛逛
      </div>
      <div class="join-btn" v-if="(!groupComplete && isOutTime && onShelf)||(!isOwn && groupComplete && onShelf)" @click="addCartInfo(1)">
        发起拼团
      </div>
      <!-- <div class="know-btn" v-if="isOwn && groupComplete" @click="$router.push('/order/buyerdetail?orderNo='+orderNo)">
        查看订单
      </div> -->
      <div class="know-btn"  @click="$router.push('/rules')">
        拼团需知
      </div>

    </div>
    <!-- 其他拼团列表 -->
    <div class="groupbuy-list" v-if="((isOutTime||groupComplete) && onShelf && !isOwn && groupArray.length>0)||(onShelf && isOwn && !groupComplete && isOutTime  && groupArray.length>0)">
      <div class="groupbuy-title">
        <div>参加别人拼团</div>
      </div>
        <div class="groupbuy-item" v-for="(item,index) in groupArray" :key="index" v-if="index < 2">
            <div class="user-img" >
                <img :src="item.masterFaceImg" v-if="item.masterFaceImg"/>
                <div v-else>{{item.masterName!=''?String(item.masterName).substr(0,2):'匿名'}}</div>
            </div>
            <div class="groupbuy-username"><div>{{String(item.masterName).substr(0,6)}}</div></div>
            <div class="groupbuy-info">
                <div>还差<span>{{item.groupNumber - item.offerNumber }}</span>人</div>
                <div>剩余<span>{{formateDate(item.lastTime)}}</span></div>
            </div>
            <div class="to-groupbuy" @click="getGroupInfo(item.id,index)">
                <div class="to-groupbuy2">
                    <div>去拼团</div>
                    <div class="right"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- 为你推荐 -->
    <div class="suggest_wrapper" v-if="isOwn|| !onShelf">
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
                      <div class="detail_suggest_price">￥{{ item.marketPrice | toFix2 }}</div>
                  </template>
                  <template v-else>
                      <div class="detail_now_price">
                          ￥{{item.priceGroups | toFix2  }}
                      </div>
                      <div class="detail_suggest_price">￥{{ item.marketPrice | toFix2 }}</div>
                  </template>
                </div>
            </div>
        </div>
    </div>
    <div class="page-footer">
      到底啦~
    </div>
    <!-- 参团弹窗 -->
    <div class="groupDialog-mask" :class="{'on':infoDialogFlag}">
      <div class="group-dialog" v-if="groupArray.length>0">
        <div class="group-title">
          参与{{(groupArray[groupIndex].masterName).substr(0,6)}}的拼团
        </div>
        <div class="group-last-info">
          仅剩<span>{{groupArray[groupIndex].groupNumber - groupArray[groupIndex].offerNumber}}</span>个名额，{{formateDate(groupArray[groupIndex].lastTime)}}后结束
        </div>
        <div class="group-members">
          <div v-for="(item,index) in groupInfo.groupPurchaseDetails">
            <img :src="item.memberFace" v-if="item.memberFace">
            <div v-else class="noImg">{{item.memberUnitName!=''?String(item.memberUnitName).substr(0,2):'匿名'}}</div>
            <div v-if="index == 0" class="first-target">团长</div>
          </div>
          <div v-for="item in (groupArray[groupIndex].groupNumber - groupArray[groupIndex].offerNumber)">
            <img src="../../assets/cbt_icwctportrait.png">
          </div>
        </div>
        <div class="join-group-btn" @click="addCartInfo(2,groupArray[groupIndex].id)">
          参与拼团
        </div>
        <div class="close-btn" @click="closeInfoDialog">
          <i class="iconfont">&#xe621;</i>
        </div>
      </div>
    </div>
    <!-- 分享弹窗 -->
    <div class="share-mask" :class="{'off':!shareDialogFlag}" >
      <div class="share-dialog">
          <div class="share-title">还差<span>{{groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber}}</span>人，快邀请好友来拼团</div>
          <div class="share-subtitle">拼单已发起，人满后立即发货</div>
          <div class="share-function _fix-share-function">
                <div class="_add-left"></div>
                <div>或复制链接进行分享</div>
                <div class="_add-right"></div>
          </div>
          <div class="copylink-btn" v-clipboard:copy="copyShareTitle" v-clipboard:success="onCopy">
              复制分享链接
              <i class="iconfont icon-lianjie" style="margin-left: 0.05rem;"></i>
            </div>
          <div class="close-btn" @click="closeShareDialog">
            <i class="iconfont">&#xe621;</i>
          </div>
      </div>
      <div class="share-head" v-if="!$tool.isWx">
        <div>点选浏览器“分享”选择</div>
        <div>“发送给朋友”或“分享到朋友圈”</div>
        <div class="head"><i class="iconfont">&#xe6ad;</i></div>
      </div>
      <div class="sharewx-head" v-else>
        <div class="head"><i class="iconfont">&#xe6ad;</i></div>
        <div>点击“…”选择</div>
        <div>“发送给朋友”或“分享到朋友圈”</div>
      </div>
    </div>
  </div>
</template>
<script>
import store from 'store';
import wx from 'weixin-js-sdk';
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
      copyShareTitle:'',
      groupArray:[],
      infoDialogFlag:false,
      groupInfo:[],
      groupIndex:0,
      isOwn:false,
      listData:[],
      groupComplete:false,//true已成团false未成团
      isOutTime:false,//是否超时
      onShelf:true,
      shareDialogFlag:false,
      wxConfig:'',
      orderNo:''
    }
  },
  created(){

    this.$store.dispatch('getMemberData').then(()=>{
      this.loginId = store.state.member.member.id;
      this.state = store.state.member.memberAccount.status;
    }).catch((res)=>{
        console.log('未登录')
    })
    // 设置title
    this.$store.commit('SET_TITLE','茶帮通拼团');
    this.orderId = this.$route.query.orderId;
    if(this.$route.query.open){
      this.shareDialogFlag = true
    }
    this.getWxConfig().then((res)=>{
      this.wxConfig = res.data;
      this.setWxShare();
    })
    // 获取团购信息
    this.searchGroup().then((res) =>{
      this.groupData = res.data;
      this.proSku = this.groupData.groupPurchase.proSku;
      this.groupComplete = this.groupData.groupPurchase.groupNumber==this.groupData.groupPurchase.offerNumber?true:false;
      this.leftTime = this.sortTime(res.data.groupPurchase.createTime,res.data.groupPurchase.systemTime)
      this.isOutTime = this.leftTime<=0?true:false;
      // 获取团购列表
      this.getGroupPurchase().then((res)=>{
          this.groupArray = res.data.groups;
          for(let item of this.groupArray){
            this.$set(item,'lastTime',this.sortTime(item.createTime,item.systemTime));
          }
          this.timeOut();
      })
      // 获取商品信息
      this.getProInfo().then((res) =>{
        this.detailData = res.data
        for(let item of this.groupData.groupPurchaseDetails){
          if(item.memberId==this.loginId){
            this.isOwn = true;
          }
        }
        if("ON_SHELF" == this.detailData.productExtInfo.state){
          this.onShelf = true;
        }
        this.copyShareTitle = '【仅剩'+(this.groupData.groupPurchase.groupNumber - this.groupData.groupPurchase.offerNumber)+'个名额】我拼了'+this.detailData.productExtInfo.title+'，快来和我一起拼团吧'+window.location.href+'点击链接，参与拼团【来自茶帮通茶友分享】';
      })
      //获取为您推荐集合
      this.$api.get('/oteao/productCollection/getCollectionDetail',{
          'device': 'WAP',
          'sysId': 1,
          'collection.collectionNo': 'wap_hometuijian'
      },res=>{
          this.listData = res.data.proExtInfoVoList;
      })
    })
    if(this.isOwn){
      this.getOrderList(this.orderId).then((res) =>{
          this.orderNo = res.data.mainOrder.mainrNo;
      });
    }
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
    // 获取订单商品详情
    getOrderList(orderId) {
        let data = {
                orderId: orderId,
                device: 'WAP'
            }
        return new Promise((resolve,reject) => {
            this.$api.post('/oteao/order/orderProductList',data,res => {
                resolve(res);
            },res=>{
                return this.$toast({
                    message: res.errorMsg,
                    iconClass: 'icon icon-fail'
                });
            })
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
            return '0'+time;
        }
    },
    onCopy(e){
      this.$toast('复制成功')
    },
    sortTime(startTime,systemTime){
      startTime = startTime.replace(/\-/g, "/");
      systemTime = systemTime.replace(/\-/g, "/");
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
         if(this.groupArray.length>0){
           for(let item of this.groupArray){
             item.lastTime = item.lastTime - 100
           }
         }
     },100)
   },
   // 参与拼团
   addCartInfo(groupType,groupId='') {
       this.$store.dispatch('getMemberData').then(()=>{
           let status = store.state.member.memberAccount.status;
           if(!store.state.member.member.id){
              return this.$router.push({name: '账户登录'});
           }
           if(status === 'WAIT_AUDIT') {
               return this.$messageBox({
                   title:'提示',
                   message:`您的账号审核中，只有正式会员才可以买买买，若有疑问，请联系客服400-996-3399`,
                   confirmButtonText: '我知道了'
               }).then(res => {
                    this.selected = null;
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
                       this.selected = null;
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

           // 立即购买
           let buyLowLimit = this.detailData.productExtInfo.buyLowLimit?this.detailData.productExtInfo.buyLowLimit:1;
           this.$store.dispatch('addCart',{proId:this.detailData.productExtInfo.proId,buyNum:buyLowLimit,groupType:groupType,groupId:groupId}).then(res=>{
               console.log(res);
               this.$router.push({
                   name: '结算中心',
                   query: {
                       cart: res.data.cartId
                   }
               })
           },res=>{});
       }).catch((res)=>{
           return this.$router.push({name: '账户登录'});
       })
   },
   getWxConfig(){
     console.log(window.location.href.split('#')[0] + '#' + window.location.href.split('#')[1])
     let data = {
       'url':window.location.href.split('#')[0] + '#' + window.location.href.split('#')[1]
     }
     return new Promise((resolve,reject)=>{
       this.$api.get('/wap/wechatShareConfig',data,res=>{
         resolve(res)
       })
     })
   },
   setWxShare(){
       wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: this.wxConfig.appId, // 必填，公众号的唯一标识
          timestamp: this.wxConfig.timestamp,  // 必填，生成签名的时间戳
          nonceStr: this.wxConfig.nonceStr,  // 必填，生成签名的随机串
          signature: this.wxConfig.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      let shareTitle = '【仅剩'+(this.groupData.groupPurchase.groupNumber - this.groupData.groupPurchase.offerNumber)+'个名额】我超低价拼了'+this.detailData.productExtInfo.title+'，快来和我一起拼团吧'+window.location.href+'点击链接，参与拼团【来自茶帮通茶友分享】';
      let shareDesc = '雷军、李开复领投茶电商交易平台，茶帮通让茶叶买卖更轻松【茶帮通】';
      let shareLink = window.location.href;
      let shareImg = 'https:'+this.detailData.productImgList[0].imgUrl;
        wx.ready(function(){
          wx.onMenuShareAppMessage({
              title: shareTitle, // 分享标题
              desc: shareDesc, // 分享描述
              link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: shareImg, // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                  // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }

          });

          wx.onMenuShareTimeline({
              title: shareTitle+' '+shareDesc, // 分享标题
              link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: shareImg, // 分享图标
              success: function () {
                  // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
          });
      });
   },
   // 获取拼团信息
   getGroupPurchase(){
     let data= {
         'groupPurchase.proId':this.groupData.groupPurchase.proId,
         'groupPurchase.groupState':1,
         'groupPurchase.isJoin':2,
         'page.pageNumber':1,
         'page.pageSize':2,
     }
     return new Promise((resolve,reject) =>{
         this.$api.post('/oteao/groupPurchase/seachGroupPurchase',data,res=>{
             resolve(res);
         }),res=>{
             return Toast({
                 message: res.errorMsg,
                 iconClass: 'icon icon-fail'
             });
         }
     })
   },
   // 获取单个拼团信息
   getGroupInfo(id,index){
     let data = {
       "groupId":id
     }
     return new Promise((resolve,reject) => {
         this.$api.post('/oteao/groupPurchase/seachGroupById',data,res => {
             resolve(res);
             this.infoDialogFlag = true;
             this.groupInfo = res.data;
             this.groupIndex = index;
         },res=>{
             return Toast({
                 message: res.errorMsg,
                 iconClass: 'icon icon-fail'
             });
         })
     })
   },
   closeInfoDialog(){
     this.infoDialogFlag = false;
   },
   closeShareDialog(){
     this.shareDialogFlag = false;
   }
  }
}
</script>
<style lang="less" scoped>
    @import '~@/styles/share/share.less';
    /* _add为新增，_fix为修改 */

    /* 修改分享链接 */
    ._fix-share-function{
        display: flex;
        justify-content: center;
        align-items: center;
        ._add-left{
                width: 0.74rem;
                height: 0.02rem;
                align-self: center;
                position: relative;
                background: linear-gradient(to left, #f5c187, #fff);
                margin-right: 0.25rem;
                display: flex;
            &::after{
                content: "";
                background-color: #f5c187;
                width: 0.10rem;
                height: 0.10rem;
                position: absolute;
                right: -0.12rem;
                display: flex;
                align-self: center;
                transform: rotateZ(45deg);
                /* transform-origin: 0% 0%; */
            }
        }
        ._add-right{
                width: 0.74rem;
                height: 0.02rem;
                align-self: center;
                position: relative;
                background: linear-gradient(to right, #f5c187, #fff);
                margin-left: 0.25rem;
                display: flex;
            &::before{
                content: "";
                background-color: #f5c187;
                width: 0.10rem;
                height: 0.10rem;
                position: absolute;
                left: -0.12rem;
                display: flex;
                align-self: center;
                transform: rotateZ(45deg);
                /* transform-origin: 0% 0%; */
            }
        }
    }
</style>
