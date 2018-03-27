<template>
    <div id="balance">
        <div class="main-top" ref="main">
            <div class="address" @click="editAddress">
                <div class="left"><i class="icon-dizhi"></i></div>
                <div class="center" v-if="Object.keys(address).length > 0">
                    <p class="user">{{ address.recName }} &nbsp;&nbsp; {{ address.mobilePhone }}</p>
                    <p>{{ (address.provinceName + address.cityName + address.areaName + address.detailAddress) || '&nbsp;' }}</p>
                </div>
                <div class="center" v-else>
                    <p>您还没有收货地址哦~</p>
                </div>
                <div class="right"><i class="icon-icon07"></i></div>
            </div>

            <template v-for="(item,index) in pannel">
                <section class="goods-pannel">
                    <div class="title">
                        <img src="../../assets/images/small_logo.png" alt="" v-if="item.selfSupport === true" style="vertical-align: baseline;">
                        <img src="../../assets/images/shop_icon.png" class="third-shop" alt="" v-else style="vertical-align: baseline; top: 0.06rem;">
                        {{ item.shopName }}
                    </div>
                    <template v-for="(todo,i) in item.cartList">
                        <div class="goods-item">
                            <goods-img style="width:1.6rem;height:1.6rem;" :imgUrl="todo.imageUrl"></goods-img>
                            <div class="right">
                                <p class="goods-title">{{ todo.proName }}</p>
                                <p class="goods-bd">
                                    <span class="price">￥{{ todo.priorityPrice | toFix2  }}</span>
                                    <span class="pro_number clearfix">
                                        <span class="decrease" :class="{isGary:todo.buyNum === 1||todo.buyNum == todo.buyLowLimit}" @click="numDecrease(todo)"><i class="iconfont">&#xe851;</i></span>
                                        <input class="input-num" type="number" maxlength="4" v-model="todo.buyNum" @blur="numChange(todo)">
                                        <span class="plus" @click="numPlus(todo)"><i class="iconfont">&#xe638;</i></span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </template>
                    <template v-if="item.giftList && item.giftList.length > 0">
                        <template v-for="list in arrayGift(item.giftList)">
                            <div class="pro_free_caption">
                                <span class="full_free" v-if="ruleTypeList[list.id] === 'GIVE_PRO'">满赠</span>
                                <span class="ruletitle">{{ list.title }}</span>
                            </div>
                            <div class="goods-item" v-for="(todo,i) in list.list">
                                <goods-img style="width:1.6rem;height:1.6rem;" :imgUrl="todo.imageUrl"></goods-img>
                                <div class="right">
                                    <p class="goods-title"><span class="gold">赠品</span>&nbsp;&nbsp;{{ todo.proName }}</p>
                                    <p class="goods-bd">
                                        <span class="price">￥{{ todo.actualPayPrice | toFix2  }}</span>
                                        <span class="num">×{{ todo.giftNum }}</span>
                                    </p>
                                </div>
                            </div>
                        </template>
                    </template>
                    <div class="sum">
                        商品总额: <span class="gold">{{ item.totalProductAmount | toFix2 }}</span>
                    </div>
                </section>
                <section class="pay-pannel">
                    <div class="express" @click="upPayType(index)">
                        <div class="left">
                            <i class="icon-wuliu"></i> 支付配送
                        </div>
                        <div class="center">
                            <p>{{ payMethods[item.currentPayMethod] }}  {{ expressName[item.currentDeliveryMethod] }}</p>
                            <!-- 运费 -->
                            <p>运费：
                                <template v-if="item.currentPayMethod === 'ONLINE'">
                                    <span class="gold">{{ item.payAndDeliveryAndfreightMap.ONLINE[item.currentDeliveryMethod] | toFix2  }}</span>
                                </template>
                                <template v-else>
                                    <span class="gold">{{ item.payAndDeliveryAndfreightMap.CASH_DELIVERY[item.currentDeliveryMethod] | toFix2  }}</span>
                                </template>
                            </p>
                            <!-- <p v-else>运费：
                                <template v-if="item.currentPayMethod === 'ONLINE'">
                                    <span class="gold">{{ item.payAndDeliveryAndfreightMap.ONLINE[item.currentDeliveryMethod] | toFix2  }}</span>
                                </template>
                                <template v-else>
                                    <span class="gold">{{ item.payAndDeliveryAndfreightMap.CASH_DELIVERY[item.currentDeliveryMethod] | toFix2  }}</span>
                                </template>
                            </p> -->
                        </div>
                        <div class="right">
                            <i class="icon-xiangyou"></i>
                        </div>
                    </div>
                    <div class="redpacket" @click="upRedpacket(index)" v-if="item.selfSupport === true">
                        <div class="left">
                            红包
                        </div>
                        <div class="center">
                        <template v-if="item.redPacketDeduction > 0">
                            - {{ item.redPacketDeduction | toFix2   }}
                        </template>
                        </div>
                        <div class="right">
                            <i class="icon-xiangyou"></i>
                        </div>
                    </div>
                    <div class="redpacket-list-wrap" v-if="item.selfSupport === true && item.canUseRuleSetList.length">
                        <template v-for="(todo,i) in item.canUseRuleSetList">
                            <div class="redpacket-list" v-if="todo.showType === 'SUB_AMOUNT'">
                                <div class="left">{{ todo.showName }}</div>
                                <div class="right">- {{ todo.giveNum | toFix2 }}</div>
                            </div>
                        </template>
                    </div>
                    <div class="remark">
                        <div class="left">备注</div>
                        <div class="right">
                            <textarea class="textarea" rows="2" placeholder="对订单特殊要求进行描述" maxlength="50" v-model="item.remark"></textarea>
                            <p class="count">{{ item.remark.length }}/50</p>
                        </div>
                    </div>
                </section>
            </template>

            <!-- 发票，暂时不做 -->
            <!-- <section class="invoice-pannel">
                <div class="invoice">
                    <div class="left">
                        发票信息
                    </div>
                    <div class="center">
                        不开发票
                    </div>
                    <div class="right">
                        <i class="icon-xiangyou"></i>
                    </div>
                </div>
                <div class="remark">
                    <div class="left">备注</div>
                    <div class="right">
                        <input type="text" placeholder="对订单特殊要求进行描述" maxlength="50">
                        <p class="count">0/50</p>
                    </div>
                </div>
            </section> -->


            <!-- <section class="bd-address" @click="gotoTop" v-if="Object.keys(address).length > 0">
                收货地址：{{ (address.provinceName + address.cityName + address.areaName + address.detailAddress) || '&nbsp;' }}&nbsp;&nbsp;&nbsp;&nbsp;{{ address.recName }} {{ address.mobilePhone }}
            </section> -->
        </div>
        <section class="save-order">
            <div class="left" :class="{serverPrice: serverPrice > 0}">
                <p class="price">应付：<span class="gold">￥{{ totalPrice | toFix2 }}</span></p>
                <p class="tips" v-if="serverPrice > 0">含手续费： ￥{{ serverPrice | toFix2 }}</p>
            </div>
            <mt-button type="default" :disabled="disabled" @click="upOrder">提交订单</mt-button>
        </section>

        <!-- 选择快递弹出 -->
        <transition name="fadeUp" mode="out-in">
            <pay-type v-show="showPayType" @confirm="confirmPayType" ref="payType"></pay-type>
        </transition>

        <!-- 红包窗口 -->
        <transition name="fadeUp" mode="out-in">
            <redpacket-pannel :cartList="cartList" v-show="showRedpacket" @redPacketList="redPacketList" @close="closeRedpacket" ref="redpacket"></redpacket-pannel>
        </transition>
    </div>
</template>

<script>
    import payType from './payType.vue';
    import redpacketPannel from './repacketPannel.vue'
    import { mapState } from 'vuex'
    import store from 'store';
    export default{
        components: {
            payType,
            redpacketPannel
        },
        data() {
            return {
                disabled: true,             // 禁用提交按钮
                payMethods: {               // 支付方式
                    CASH_DELIVERY: '货到付款',
                    ONLINE: '在线支付'
                },
                cartList: '',               // 购物车id列表
                showPayType: false,         // 支付方式与快递弹窗
                showRedpacket: false,       // 红包弹窗
                timer: null,                // 返回顶部的定时器
                myData: {},                 // 结算数据,
                address: {},                // 地址数据
                expressName: {              // 快递名称
                    ship_ems: 'EMS',
                    ship_sf: '顺丰快递',
                    ship_sto: '申通快递',
                    ship_express: '快递配送',
                    get_self: '门店自提'
                },
                activePannel: {},           // 当前激活的店铺
                oldVal:1 //商品数量旧值
            }
        },
        computed: {
            // 店铺面板
            pannel() {
                return this.myData.oteaoCart ? this.myData.oteaoCart : [];
            },
            // 总计价钱
            totalPrice() {
                let math = this.$tool.math;
                let sum = 0;
                this.pannel.forEach(val => {
                    sum = math.add(sum,val.totalProductAmountAfterPromotion);
                    // 计算运费
                    let map = val.payAndDeliveryAndfreightMap;
                    if(val.currentPayMethod === 'ONLINE') {
                        let price = map['ONLINE'][val.currentDeliveryMethod];
                        sum = math.add(sum,price);
                    } else {
                        let price = map['CASH_DELIVERY'][val.currentDeliveryMethod];
                        sum = math.add(sum,price);
                    }
                })
                return sum;
            },
            // 购物车规则类型
            ruleTypeList() {
                let data = this.myData.useRuleSetList || [];
                let obj = {};
                data.forEach(val => obj[val.ruleSetId] = val.showType)
                return obj;
            },
            // 手续费
            serverPrice() {
                let result = 0;
                this.pannel.forEach(val => {
                    if(val.selfSupport && val.currentPayMethod === 'CASH_DELIVERY') {
                        result = val.payAndDeliveryAndfreightMap.feeForCashDeliveryMap[val.currentDeliveryMethod];
                    }
                })
                return result;
            },
            ...mapState({
                id: state => state.member.member.id,
                totalAmount: state => state.member.memberAccount.totalAmount
            })
        },
        methods: {
            // 激活红包，立即获取红包信息更新
            redPacketList(list){
                this.myData.redPacketList = list;
            },
            // 赠品分组函数
            arrayGift(list) {
                let data = [];

                list.forEach(val => {
                    // 初始化data
                    if(data.length === 0) {
                        data.push({
                            title: val.ruleName,
                            id: val.ruleSetId,
                            list: []
                        })
                    }
                    if(data.some(v => v.id === val.ruleSetId)) {
                        data.forEach(v => {
                            if(v.id === val.ruleSetId) {
                                v.list.push(val);
                            }
                        })
                    } else {
                        data.push({
                            title: val.ruleName,
                            id: val.ruleSetId,
                            list: [val]
                        })
                    }

                })
                return data;
            },
            // 弹出付款方式弹窗
            upPayType(index) {
                if(this.pannel[0].cartList[0].businessType=='ORG_SALES'){
                  return;
                }
                this.activePannel = this.pannel[index];
                this.$refs.payType.setActive(this.activePannel)
                this.showPayType = true;
            },
            // 点击付款方式弹窗的确定
            confirmPayType() {
                this.showPayType = false;
            },
            // 显示红包弹窗
            upRedpacket(index) {
                this.activePannel = this.pannel[index];
                this.$refs.redpacket.setActive(this.activePannel);
                this.showRedpacket = true;
            },
            // 红包弹窗关闭时，不管确定还是取消
            closeRedpacket(data) {
                this.showRedpacket = false;
                if(data === 'confirm') {
                    this.redpackUpdate();
                }
            },
            // 点击底下地址返回顶部
            gotoTop() {
                let top = this.$refs.main.scrollTop;
                this.timer = setInterval(() => {
                    top -= 50;
                    if(top <=0 ){
                        top = 0;
                        clearInterval(this.timer);
                    }
                    this.$refs.main.scrollTop = top
                },16)
            },
            // 初始化数据
            initData() {
                this.backupsData() //先备份
                return new Promise((resolve,reject) => {
                    this.$api.post('/oteao/shoppingCart/initSettle',{
                        cartIds: this.cartList,
                        device: 'WAP'
                    },res => {
                        let shopList = res.data.oteaoCart;
                        // 设置备注
                        shopList.forEach(val => {

                            val.remark = '';

                        });
                        this.disabled = false;
                        this.myData = res.data;
                        resolve(res)
                    },res => {
                        // if(res.code === 4065) {
                        //     this.$toast(res.message);
                        // }
                        // this.$toast(res.message);
                        // this.$router.go(-1)
                    })
                })
            },
            redpackUpdate(){
              let orgSettleRequestList = [];
              // 遍历每个店铺，更新数据
              this.pannel.forEach(val => {
                  orgSettleRequestList.push({
                      "deliveryMethodCode": val.currentDeliveryMethod,
                      "invoiceCode": "NOT_INVOICE",
                      "invoiceTitle": "string",
                      "isUseIntegral": 0,
                      "orderRemark": val.remark,
                      "payMethodCode": val.currentPayMethod,
                      "sellerOrgId": val.orgId,
                      "useRedPacketId": val.useRedPacketId === null ? -1 : val.useRedPacketId
                  })
              })


              let data = {
                  "cartIds": this.cartList,
                  "device": "WAP",
                  orgSettleRequestList,
                  "receiveAddrId": this.address.id,
                  "sysId": 1,
                  "useBackBalance": 0,
                  "useStoreBalance": 0
              }

              this.$api.post('/oteao/shoppingCart/settle',JSON.stringify(data),res => {

                  // 恢复之前的订单备注
                  res.data.oteaoCart.forEach((val,i) => {
                      val.remark = this.getRemark()[i];
                  })
                  this.myData = res.data;
              })
            },
            // 更新数据
            upDate() {
                this.initData().then((res)=>{
                  let orgSettleRequestList = [];
                  // 遍历每个店铺，更新数据
                  this.pannel.forEach(val => {
                      orgSettleRequestList.push({
                          "deliveryMethodCode": val.currentDeliveryMethod,
                          "invoiceCode": "NOT_INVOICE",
                          "invoiceTitle": "string",
                          "isUseIntegral": 0,
                          "orderRemark": val.remark,
                          "payMethodCode": val.currentPayMethod,
                          "sellerOrgId": val.orgId,
                          "useRedPacketId": val.useRedPacketId === null ? -1 : val.useRedPacketId
                      })
                  })


                  let data = {
                      "cartIds": this.cartList,
                      "device": "WAP",
                      orgSettleRequestList,
                      "receiveAddrId": this.address.id,
                      "sysId": 1,
                      "useBackBalance": 0,
                      "useStoreBalance": 0
                  }

                  this.$api.post('/oteao/shoppingCart/settle',JSON.stringify(data),res => {

                      // 恢复之前的订单备注
                      res.data.oteaoCart.forEach((val,i) => {
                          val.remark = this.getRemark()[i];
                      })
                      this.myData = res.data;

                      this.recoveryData();

                  })
                })

            },
            // 提交订单
            upOrder() {
                // 先判断是否选择地址
                if(!this.address.id) {
                    return this.$toast('请选择一个地址')
                }
                let orgSettleRequestList = [];

                // 表示货到付款还是在线支付
                let online = false,delivery = false;

                // 遍历每个店铺，更新数据
                this.pannel.forEach(val => {
                    orgSettleRequestList.push({
                        "deliveryMethodCode": val.currentDeliveryMethod,
                        "invoiceCode": "NOT_INVOICE",
                        "invoiceTitle": "string",
                        "isUseIntegral": 0,
                        "orderRemark": val.remark,
                        "payMethodCode": val.currentPayMethod,
                        "sellerOrgId": val.orgId,
                        "useRedPacketId": val.useRedPacketId === null ? -1 : val.useRedPacketId
                    })

                    // 获取支付状态 在线or货到付款
                    if(val.currentPayMethod === 'ONLINE') {
                        online = true;
                    } else {
                        delivery = true;
                    }


                })

                let data = {
                    "cartIds": this.cartList,
                    "device": "WAP",
                    orgSettleRequestList,
                    "receiveAddrId": this.address.id,
                    "sysId": 1,
                    "useBackBalance": 0,
                    "useStoreBalance": 0,
                }
                if(this.$tool.isWx){
                  data.faceImg = store.state.member.wechatHeadImg;
                }
                // 禁用提交按钮，防止重复提交
                this.disabled = true;

                this.$api.post('/oteao/shoppingCart/submitOrder',JSON.stringify(data),res => {

                    // 都是在线支付
                    if(online && !delivery) {
                        this.$router.push({name: '收银台',query: {payId: res.data.payId,type:'online'}});
                    }

                    // 货到付款
                    if(!online && delivery) {
                        // 门店自提不可使用余额
                        if(this.totalAmount > 0 && this.pannel[0].currentDeliveryMethod !== 'get_self') {
                            this.$router.push({name: '收银台',query: {payId: res.data.payId,type:'delivery'}});
                        } else {
                            this.$router.push({name: '货到付款成功',query: {payId: res.data.payId,type:'delivery'}});
                        }
                    }

                    // 在线支付 + 货到付款
                    if(online && delivery) {
                        this.$router.push({name: '货到付款结算',query: {payId: res.data.payId,type:'onlineanddelivery'}});
                    }

                },res => {
                    // console.log(1)
                    if(res.code === 4064) {
                        return this.$messageBox({
                            title:'提示',
                            message:`您的账号因违规操作而被冻结无法买买买~若有疑问，请联系客服400-996-3399`,
                            confirmButtonText: '我知道了'
                        }).then(res => {
                            this.$api.get('/oteao/login/logout',{},res => {});
                            this.$router.push('/')
                        })
                    }
                    this.$toast(res.cnMessage);
                    this.disabled = false;
                })
            },
            // 修改地址
            editAddress() {
                sessionStorage.setItem('edit',true);
                sessionStorage.setItem('cart',this.cartList);
                this.backupsData();
                this.$router.push('/center/address');
            },
            // 得到备注
            getRemark() {
                return this.pannel.map(val => {
                    return val.remark;
                })
            },
            // 备份数据
            backupsData() {
                // 离开当前页去改地址与发票需要备份备注，红包以及付款方式

                // 备注
                sessionStorage.setItem('remark',JSON.stringify(this.getRemark()));

                // 激活的红包
                sessionStorage.setItem('redpacket',JSON.stringify(this.pannel.map(val => val.useRedPacketId)));

                // 支付方式
                sessionStorage.setItem('paymethod',JSON.stringify(this.pannel.map(val => val.currentPayMethod)));

                // 快递方式
                sessionStorage.setItem('express',JSON.stringify(this.pannel.map(val => val.currentDeliveryMethod)));

            },
            // 恢复数据
            recoveryData() {
                let remark = JSON.parse(sessionStorage.remark);
                let redpacket = JSON.parse(sessionStorage.redpacket);
                let paymethod = JSON.parse(sessionStorage.paymethod);
                let express = JSON.parse(sessionStorage.express);

                this.pannel.forEach((val, i) => {
                    val.remark = remark[i];
                    val.useRedPacketId = redpacket[i];
                    val.currentPayMethod = paymethod[i];
                    val.currentDeliveryMethod = express[i];
                })
                delete sessionStorage.remark;
                delete sessionStorage.redpacket;
                delete sessionStorage.paymethod;
                delete sessionStorage.express;

            },
            //更新选中的数量
            updateSeleNum(item,newVal,oldVal){
                return new Promise((resolve,reject) => {
                    this.$api.post('/oteao/shoppingCart/updateBuyNum',{
                        id: item.id,
                        proId: item.proId,
                        buyNum: newVal,
                        device: 'WAP'
                    },res => {
                        item.buyLowLimit = res.data.buyLowLimit;
                        item.buyUpperLimit = res.data.buyUpperLimit;
                        // 更新购物车数量
                        // this.$store.dispatch('queryCartTotal');
                        // this.oldVal = newVal;
                        item.buyNum = res.data.buyNum;
                        this.upDate();
                        resolve(res);
                    },res => {
                      this.$api.post('/oteao/shoppingCart/getCartItemBuyNum',{
                          cartId: item.id,
                      },res => {
                        item.buyNum = res.data
                        this.upDate();
                      })
                        reject(res);
                    })
                })
            },
            // 减
            numDecrease(item){
                // 旧的数量
                let oldVal = item.buyNum;
                // 新的数量
                let newVal = item.buyNum - 1;

                // 判断是否小于0或者最低起购
                if(newVal < 1) return;

                if(!!item.buyLowLimit) {
                    if(newVal < item.buyLowLimit) return;
                }
                this.updateSeleNum(item,newVal,oldVal).then(res => {
                    // 禁用商品直接重新拉取数据
                    if(res.data.isDisable) {
                        return this.upDate();
                    }
                    item.buyNum = res.data.buyNum;
                    item.oldBuy = res.data.buyNum;
                }).catch(res => {
                  this.$toast(res.message);
                })
            },
            // 加
            numPlus(item){

                this.backupsData();
                // 旧的数量
                let oldVal = item.buyNum;
                // 新的数量
                let newVal = item.buyNum + 1;

                if(!!item.buyUpperLimit) {
                    if(newVal > item.buyUpperLimit) return;
                }

                this.updateSeleNum(item,newVal,oldVal).then(res => {
                    if(res.data.isDisable) {
                        return this.upDate();
                    }
                    item.buyNum = res.data.buyNum;
                    item.oldBuy = res.data.buyNum;
                }).catch(res => {
                  this.$toast(res.message);
                })

            },
            //input输入数量
            numChange(item){
                let reg = /^[1-9]\d*$/;
                if(reg.test(item.buyNum)){

                    // 需要进行最大购买与最小购买判断
                    if(!!item.buyLowLimit) {
                        if(item.buyNum < item.buyLowLimit) {
                            item.buyNum = item.buyLowLimit;
                            item.oldBuy = item.buyLowLimit;
                            this.$toast('小于最低购买量')
                        }
                    }

                    if(!!item.buyUpperLimit) {
                        if(item.buyNum > item.buyUpperLimit) {
                            // item.buyNum = item.oldBuy;
                            this.$toast('超过最高购买量')
                        }
                    }
                    this.updateSeleNum(item,item.buyNum).then(res => {
                        if(res.data.isDisable) {
                            return this.upDate();
                        }
                        item.buyNum = res.data.buyNum;
                        item.oldBuy = res.data.buyNum;
                    }).catch(res => {
                        this.$toast(res.message);
                        // item.buyNum = this.oldVal;
                    })

                }else{
                    this.$toast('请输入正确的数值')
                    item.buyNum = item.buyLowLimit || 1;
                }
            }
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','结算中心');

            this.cartList = this.$route.query.cart;
            sessionStorage.setItem('edit',false);
            this.initData().then(res => {

                // 判断是不是去修改地址
                let cart = sessionStorage.cart;
                let address = sessionStorage.address;

                if(this.cartList === cart && address) {
                    this.address = JSON.parse(address);
                    delete sessionStorage.cart;
                    delete sessionStorage.address;
                    this.recoveryData();
                    this.upDate();
                } else {
                    this.address = this.myData.receiveAddrList.filter(val => val.isDefault)[0] ? this.myData.receiveAddrList.filter(val => val.isDefault)[0] : {}
                }
            })
        },
        beforeRouteEnter(to, from, next){

            // 先获取会员的id
            if(!store.state.member.member.id) {
                store.dispatch('getMemberData').then((res) => {
                    next();
                }).catch(res => {
                    if(res.code === 2000){
                        next(vm => {
                            vm.$router.go(-1);
                        })
                    }
                })
            } else {
                next();
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('~@/styles/balance/index.less');
</style>
