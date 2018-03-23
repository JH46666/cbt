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
        <div v-if="onShelf && !groupComplete && !isOutTime">已开团，仅剩<span>{{groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber}}</span>人名额</div>
        <div v-else-if="onShelf && !groupComplete && isOutTime">来晚了，该团超时结束啦</div>
        <div v-else-if="groupComplete">拼团成功</div>
        <div v-else-if="!onShelf && !groupComplete">来晚了，商品售罄下架了</div>
      </div>
      <div class="group-lasttime" v-if="onShelf && !groupComplete && !isOutTime">{{formateDate(leftTime)}}后结束</div>
      <div class="group-lasttime" v-else-if="groupComplete">此团满员啦</div>
      <div class="group-lasttime" v-else-if="!onShelf || isOutTime">已结束</div>

      <div class="group-tip" v-if="onShelf && !groupComplete && !isOutTime">好货手慢无，快来拼团啦~</div>
      <div class="group-tip" v-else>您可以再开启或拼别人的团噢~</div>
      <div class="group-members" v-if="isOwn || onShelf || groupComplete">
        <div v-for="(item,index) in groupData.groupPurchaseDetails">
          <img :src="item.memberFace" v-if="item.memberFace">
          <div v-else class="noImg">{{String(item.memberUnitName).substr(0,2)}}</div>
          <div v-if="index == 0" class="first-target">团长</div>
        </div>
        <div v-if="!groupComplete" v-for="item in (groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber)">
          <img src="../../assets/cbt_icwctportrait.png">
        </div>
      </div>
      <div class="join-btn" v-if="!isOwn && onShelf && !groupComplete && !isOutTime"  @click="addCartInfo(2,groupData.groupPurchase.id)">
        参与拼团
      </div>
      <div class="join-btn" v-else-if="isOwn && onShelf && !groupComplete && !isOutTime">
        分享拼团
      </div>
      <div class="join-btn" v-else-if="isOwn && !onShelf ">
        去首页逛逛
      </div>
      <div class="join-btn" v-else @click="addCartInfo(1)">
        发起拼团
      </div>
      <div class="know-btn">
        拼团需知
      </div>
    </div>
    <!-- 其他拼团列表 -->
    <div class="groupbuy-list" v-if="(onShelf && !isOwn  && groupArray.length>0)||(onShelf && isOwn && !groupComplete && isOutTime  && groupArray.length>0)">
      <div class="groupbuy-title">
        <div>参加别人拼团</div>
      </div>
        <div class="groupbuy-item" v-for="(item,index) in groupArray" :key="index" v-if="index < 2">
            <div class="user-img" >
                <img :src="item.masterFaceImg" v-if="item.masterFaceImg"/>
                <div v-else>{{String(item.masterName).substr(0,2)}}</div>
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
    <div class="suggest_wrapper" v-if="groupComplete || !onShelf">
        <div class="suggest_head">
            <div class="suggest_title">大家都在团</div>
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
            <div v-else class="noImg">{{String(item.memberUnitName).substr(0,2)}}</div>
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
    <div class="share-mask" :class="{'off':!shareDialogFlag}" v-if="!groupComplete && !isOutTime && isOwn">
      <div class="share-dialog">
          <div class="share-title">还差<span>{{groupData.groupPurchase.groupNumber - groupData.groupPurchase.offerNumber}}</span>人，快邀请好友来拼团</div>
          <div class="share-subtitle">拼单已发起，人满后立即发货</div>
          <div class="share-function">或复制链接进行分享</div>
          <div class="copylink-btn">复制分享链接</div>
          <div class="close-btn" @click="closeShareDialog">
            <i class="iconfont">&#xe621;</i>
          </div>
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
      groupArray:[],
      infoDialogFlag:false,
      groupInfo:[],
      groupIndex:0,
      isOwn:false,
      listData:[],
      groupComplete:false,//true已成团false未成团
      isOutTime:false,//是否超时
      onShelf:true,
      shareDialogFlag:true
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
        if(this.loginId == this.groupData.groupPurchase.memberId)this.isOwn = true;
        if("ON_SHELF" == this.detailData.productExtInfo.state)this.onShelf = true;
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
                   message:`您的账号审核中，只有正式会员才以买买买，若有疑问，请联系客服400-996-3399`,
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
</style>
