<template>
    <div class="empty" v-if="listPannel.length === 0 && disabledList.length === 0">
        <div class="img-wrap">
            <img src="../../assets/images/empty.jpg" alt="">
        </div>
        <p class="tips">购物车还没有商品哟~</p>
        <router-link :to="{name: '首页',path:'/'}" class="to-index">去首页逛逛</router-link>
    </div>
    <div class="cart_wrapper" v-else>
        <div class="edit_floor"><a @click="edit=!edit">{{edit==true?'完成':'编辑'}}</a></div>
        <div class="product_floor">
            <!-- 商品分组 -->
            <template v-for="list in listPannel">
                <div class="group normal_product">
                    <div>
                        <!-- 所属店铺 -->
                        <div class="flex align_items_c shop_caption">
                            <div class="left_check flex justify_content_c" :class="{'checked':checkAll(list)}" @click="selectGroupAll(list)">
                                <p class="flex">
                                    <input type="checkbox" name="" :id="list.orgId" hidden>
                                    <span class="check_cir"></span>
                                </p>
                            </div>
                            <div v-if="!list.selfSupport" class="other"><img src="../../assets/images/shop_icon.png" alt=""></div>
                            <div v-else class="self"><img src="../../assets/images/logo_2.png" alt=""></div>
                            <p class="title" :class="{third: !list.selfSupport}">{{list.shopName}}</p>
                        </div>
                        <!-- 正常商品 -->
                        <div class="pro_item" v-for="item in list.cartList"  :class="{'no_border':item.tipsFlag,left: item.swiper}" :key="item.proId" @touchstart="touchstart($event,item)" @touchend="touchend($event,item)">
                            <div class="flex">
                                <!-- 复选按钮 -->
                                <div class="left_check flex justify_content_c" :class="{'checked':item.checked}" @click="selectOne(item)">
                                    <p class="flex align_items_c pro_label">
                                        <input type="checkbox" name="" :id="item.proId" v-model="selectIds" hidden>
                                        <span class="check_cir"></span>
                                    </p>
                                </div>
                                <div class="right_info flex-1">
                                    <div class="pro_info flex">
                                        <div class="pro_img">
                                            <router-link :to="{name: '商品详情',query:{proSku: item.proSku}}"><goods-img imgWidth="1.6rem" :tagUrl="item.tagImage" :imgUrl="item.imageUrl"></goods-img></router-link>
                                        </div>
                                        <div class="flex-1 pro_detail">
                                            <div class="flex flex_col detail_inner">
                                                <router-link :to="{name: '商品详情',query:{proSku: item.proSku}}">
                                                    <h4>{{item.proName}}</h4>
                                                </router-link>
                                                <div class="flex-1 flex align_items_end">
                                                    <div class="pro_price"><span class="money">{{item.priorityPrice}}</span>元/{{item.unit}}</div>
                                                    <div class="pro_number clearfix">
                                                        <span class="decrease" @click="numDecrease(item)"><i class="iconfont">&#xe851;</i></span>
                                                        <input class="input-num" type="number" v-model="item.buyNum" @blur="numChange(item)">
                                                        <span class="plus" @click="numPlus(item)"><i class="iconfont">&#xe638;</i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pro-delete"><a href="##"><i class="iconfont">&#xe60d;</i></a></div>
                            </div>
                            <!-- 提示信息 -->
                            <div class="tips_div" v-if="!!item.buyUpperLimit && item.buyNum > item.buyUpperLimit">
                                <p>每单限购{{item.buyUpperLimit}}，您超出最高购买数量啦~</p>
                            </div>
                            <div class="del-block" v-if="$tool.isiOS" @click="delItem(item,true)">
                                <i class="iconfont">&#xe60d;</i>
                            </div>
                        </div>
                        <!-- 活动&赠品 -->
                        <template v-if="list.giftList ? list.giftList.length > 0 : false">
                            <div class="pro_item"  v-for="todo in arrayGift(list.giftList)" :key="todo.proId">
                                <!-- 活动&赠品caption -->
                                <div class="pro_free_caption">
                                    <span class="full_free" v-if="ruleTypeList[todo.id] === 'GIVE_PRO'">满赠</span>
                                    <span class="ruletitle">{{todo.title}}</span>
                                </div>
                                <div class="flex" v-for="item in todo.list">
                                    <!-- 复选按钮 -->
                                    <div class="left_check flex justify_content_c visi_h" @click="selectOne(item)">
                                        <p class="flex align_items_c pro_label">
                                            <input type="checkbox" name="" :id="item.proId" v-model="selectIds" hidden>
                                            <span class="check_cir"></span>
                                        </p>
                                    </div>
                                    <div class="right_info flex-1">
                                        <div class="pro_info flex">
                                            <div class="pro_img">
                                                <router-link :to="{name: '商品详情',query:{proSku: item.proSku}}"><goods-img imgWidth="1.6rem" :tagUrl="item.tagImage" :imgUrl="item.imageUrl"></goods-img></router-link>
                                            </div>
                                            <div class="flex-1 pro_detail">
                                                <div class="flex flex_col detail_inner">
                                                    <router-link :to="{name: '商品详情',query:{proSku: item.proSku}}">
                                                        <h4><span class="gold">赠品</span>&nbsp;&nbsp;{{item.proName}}</h4>
                                                    </router-link>
                                                    <!-- 赠品 -->
                                                    <div class="flex-1 flex align_items_end">
                                                        <div class="pro_price"><span class="money">￥0.00</span><span class="market_price">￥<del>{{ item.formerPrice | toFix2}}</del></span></div>
                                                        <div class="pro_number clearfix">
                                                            <p>× {{item.giftNum}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pro-delete"><a href="##"><i class="iconfont">&#xe60d;</i></a></div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
            <div class="group expired_product">
                <!-- 失效商品 -->
                <div class="pro_item" :class="{haspadding: !edit,left: item.swiper}" v-for="item in disabledList" @touchstart="touchstart($event,item)" @touchend="touchend($event,item)">
                    <div class="flex">
                        <!-- 复选按钮 -->
                        <div class="left_check flex justify_content_c" :class="{'checked':item.checked}" @click="selectOne(item)" v-if="edit">
                            <p class="flex align_items_c pro_label">
                                <input type="checkbox" name="" :id="item.proId" v-model="selectIds" hidden>
                                <span class="check_cir"></span>
                            </p>
                        </div>
                        <div class="right_info flex-1">
                            <div class="pro_info flex">
                                <div class="pro_img">
                                    <a href="javascript:void(0);"><goods-img imgWidth="1.6rem" :imgUrl="item.imageUrl"></goods-img></a>
                                    <div class="expired_txt">
                                        <p>失效</p>
                                    </div>
                                </div>
                                <div class="flex-1 pro_detail">
                                    <div class="flex flex_col detail_inner">
                                        <a href="javascript:void(0);">
                                            <h4>{{item.proName}}</h4>
                                        </a>
                                        <div class="flex-1 flex align_items_end">
                                            <div class="pro_price"><span class="money">￥{{ item.priorityPrice | toFix2 }}</span></div>
                                            <div class="pro_number clearfix">
                                                <p>× {{ item.buyNum }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="del-block" v-if="$tool.isiOS" @click="delItem(item)">
                        <i class="iconfont">&#xe60d;</i>
                    </div>
                </div>
                <a class="clear_expired" href="javascript:void(0);" @click="clearDisabled" v-if="cartData.disableList ? cartData.disableList.length > 0 : false">清空失效商品</a>
            </div>
        </div>
        <!-- 猜你喜欢 -->
        <may-like></may-like>
        <!-- 底部结算 -->
        <div class="cart_bottom flex">
            <div class="select_all left_check flex" :class="{'flex-1':edit,'checked': edit ? disabledList.every(val => val.checked) && listPannel.every(val => checkAll(val)) : listPannel.every(val => checkAll(val)) &&  listPannel.length !== 0 }">
                <p class="flex align_items_c" @click="selectAll">
                    <input type="checkbox" name="" hidden>
                    <span class="check_cir"></span>
                </p>
                <p>已选(<span class="selectProductNum">{{ totalBuyNum }}</span>)</p>
            </div>
            <div class="flex-1 money_total" v-show="!edit">
                <p class="color_f08">￥<span>{{ totalMoney | toFix2 }}</span></p>
                <p class="inte-subtotal-box" style="display: none;">
                    <span>
                        -<span class="inte-subtotal">0</span>
                    </span>
                    <img class="icon_jf" src="https://m.zuipin.cn/wap/images/ic_jiesuan_jifen.png" alt="">
                </p>
            </div>
            <div class="go_pay" :class="{'disabled': edit ? selectAllIds.length === 0 : selectIds.length === 0 }">
                <a v-if="!edit" href="javascript:void(0);" id="toCheckout" @click="gotoBalance">去结算</a>
                <a v-else href="javascript:void(0);" @click="deleteSelect">删除</a>
            </div>
        </div>
    </div>
</template>
<script>
    import store from 'store';
    import {mapGetters} from 'vuex';
    import {MessageBox,Toast} from 'mint-ui';
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                edit: false,    // 编辑
            }
        },
        computed:{
            ...mapGetters([
                'cartData',
            ]),
            ...mapState({
                from: state => state.address.from,
                to: state => state.address.to,
            }),
            // 已经选择的商品
            selectIds() {
                let pannel = this.listPannel;
                let data = [];
                pannel.forEach(val => data =  data.concat(val.cartList.filter(val => val.checked)));
                return data
            },
            // 包含失效被选中的
            selectAllIds(){
                let pannel = this.listPannel;
                let data = [];
                pannel.forEach(val => data =  data.concat(val.cartList.filter(val => val.checked)));
                data =  data.concat(this.disabledList.filter(val => val.checked));
                return data
            },
            // 购物车面板
            listPannel() {
                if(this.cartData.oteaoCart) {
                    return this.cartData.oteaoCart;
                }
                return [];
            },
            // 禁用商品列表
            disabledList() {
                if(this.cartData.disableList) {
                    return this.cartData.disableList;
                }
                return [];
            },
            //选中商品总金额
            totalMoney(){
                let math = this.$tool.math;
                let sum = 0;
                this.selectIds.forEach(val => sum = math.add(sum,val.priorityPrice * val.buyNum));
                return sum;
            },
            // 购买数量合计
            totalBuyNum() {
                let sum = 0;
                let math = this.$tool.math;
                if(this.edit) {
                    this.selectAllIds.forEach(val => sum = math.add(sum,val.buyNum));
                } else {
                    this.selectIds.forEach(val => sum = math.add(sum,val.buyNum));
                }
                return sum;
            },
            // 购物车规则类型
            ruleTypeList() {
                let data = this.cartData.useRuleSetList || [];
                let obj = {};
                data.forEach(val => obj[val.ruleSetId] = val.showType)
                return obj;
            }
        },
        methods: {
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
            // 删除选中
            deleteSelect() {
                if(this.selectAllIds.length === 0) return;
                this.$messagebox({
                    title: '提示',
                    message: '确定删除所选商品?',
                    showCancelButton: true
                }).then(res => {
                    if(res === 'cancel') return;
                    this.deletePro(this.selectAllIds.map(val => val.id).join(','));
                })
            },
            //删除商品
            deletePro(ids){
                return new Promise((resolve,reject) => {
                    this.$api.post('/oteao/shoppingCart/del',{ids},res => {
                        this.getData();
                        resolve(res);
                    })
                })
            },
            // 清空失效商品
            clearDisabled() {
                if(this.cartData.disableList.length > 0) {
                    let ids = this.cartData.disableList.map(val => val.id).join();
                    this.$api.post('/oteao/shoppingCart/del',{ids},res=>{
                        this.getData();
                    },res=>{
                        this.$toast(res.cnMessage)
                    })
                }
            },
            //去详情
            // goDetail(val){
            //     this.$router.push({
            //         path: '/detail',
            //         query: {proSku:val}
            //     });
            // },
            // ios向左,手指按下
            touchstart(ev,item) {
                if(this.$tool.isiOS) {
                    item.startX = ev.targetTouches[0].clientX;
                }
            },
            // 左划抬起
            touchend(ev,item) {
                if(this.$tool.isiOS) {
                    item.endX = ev.changedTouches[0].clientX;
                    // 出现删除按钮
                    if(item.startX - item.endX > 70) {
                        this.listPannel.forEach(val => val.cartList.forEach(val => val.swiper = false));
                        this.disabledList.forEach(val => val.swiper = false);
                        item.swiper = true;
                    }
                    // 隐藏删除按钮
                    if(item.endX - item.startX > 70) {
                        item.swiper = false;
                    }
                }
            },
            // 按下滑动出现的删除按钮
            delItem(item,normal) {
                if(normal) {
                    this.$messagebox({
                        title: '提示',
                        message: '确定删除所选商品?',
                        showCancelButton: true
                    }).then(res => {
                        if(res === 'cancel') return;
                        this.deletePro(item.id)
                    })
                } else {
                    this.deletePro(item.id)
                }
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
                        this.$store.dispatch('queryCartTotal'); 
                        resolve(res);
                    },res => {
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
                        return this.getData();
                    }
                    item.buyNum = res.data.buyNum;
                    item.oldBuy = res.data.buyNum;
                }).catch(res => {})
            },
            // 加
            numPlus(item){
                // 旧的数量
                let oldVal = item.buyNum;       
                // 新的数量
                let newVal = item.buyNum + 1;

                if(!!item.buyUpperLimit) {
                    if(newVal > item.buyUpperLimit) return;
                }
                
                this.updateSeleNum(item,newVal,oldVal).then(res => {
                    if(res.data.isDisable) {
                        return this.getData();
                    }
                    item.buyNum = res.data.buyNum;
                    item.oldBuy = res.data.buyNum;
                }).catch(res => {})

            },
            //input输入数量
            numChange(item){
                let reg = /^[1-9]\d*$/;
                if(reg.test(item.buyNum)){

                    // 需要进行最大购买与最小购买判断
                    if(!!item.buyLowLimit) {
                        if(item.buyNum < item.buyLowLimit) {
                            item.buyNum = item.oldBuy;
                            return Toast('小于最低购买量')
                        }
                    }

                    if(!!item.buyUpperLimit) {
                        if(item.buyNum > item.buyUpperLimit) {
                            // item.buyNum = item.oldBuy;
                            Toast('超过最高购买量')
                        }
                    }
                    this.updateSeleNum(item,item.buyNum).then(res => {
                        if(res.data.isDisable) {
                            return this.getData();
                        }
                        item.buyNum = res.data.buyNum;
                        item.oldBuy = res.data.buyNum;
                    }).catch(res => {
                        item.buyNum = item.oldBuy;
                    })

                }else{
                    Toast('请输入正确的数值')
                    item.buyNum = item.buyLowLimit || 1;
                }
            },
            // 结算
            gotoBalance() {
                let map = this.selectIds.map(val => val.id);
                if(map.length === 0) return;
                this.$router.push({
                    name: '结算中心',
                    query: {
                        cart: map.join(',')
                    }
                })
            },
            // 全选判断
            checkAll(list) {
                return list.cartList.every(val => val.checked)
            },
            // 分组全选或全不选
            selectGroupAll(list){
                if(this.checkAll(list)) {
                    list.cartList.forEach(val => val.checked = false);
                } else {
                    list.cartList.forEach(val => val.checked = true);
                }
            },
            //单个选择或取消选择
            selectOne(item){
                item.checked = !item.checked;
            },
            // 底部全选
            selectAll(){
                // 需要判断编辑还是普通状态
                if(this.edit) {
                    // 编辑状态
                    if(this.disabledList.every(val => val.checked) && this.listPannel.every(val => this.checkAll(val))) {
                        this.listPannel.forEach(val => val.cartList.forEach(h => h.checked = false));
                        this.disabledList.forEach(val => val.checked = false);
                    } else {
                        this.listPannel.forEach(val => val.cartList.forEach(h => h.checked = true));
                        this.disabledList.forEach(val => val.checked = true);
                    }

                } else {
                    if(this.listPannel.every(val => this.checkAll(val))) {
                        this.listPannel.forEach(val => val.cartList.forEach(h => h.checked = false));
                    } else {
                        this.listPannel.forEach(val => val.cartList.forEach(h => h.checked = true));
                    } 
                }

                
            },
            // 查询购物车
            getData() {
                this.$store.dispatch('queryCart',{}).then(res=>{
                    let list = res.data.oteaoCart;
                    for ( let todo of list) {
                        for ( let i = 0; i < todo.cartList.length; i++) {
                            // 勾选
                            todo.cartList[i].checked = false;
                            // 设置旧的购买量
                            todo.cartList[i].oldBuy = todo.cartList[i].buyNum;
                            // 左划
                            todo.cartList[i].swiper = false;
                        }
                    }
                    for (let list of res.data.disableList) {
                        list.checked = false;
                        list.swiper = false;
                    }
                    this.$store.commit('SET_CART_LIST',res.data);
                    // 更新购物车数量
                    this.$store.dispatch('queryCartTotal'); 
                },res=>{
                    this.$store.commit('SET_CART_LIST',{});
                });
            }
        },
        created(){
            // 设置title
            this.$store.commit('SET_TITLE','购物车');

            this.getData();
        },
        // 判断会员状态
        beforeRouteEnter (to, from, next) {
            let vm = vm => {
                let status = store.state.member.memberAccount.status;
                if(status === 'ACTIVE') {
                    return;
                };
                if(status === 'WAIT_AUDIT') {
                    vm.$messageBox({
                        title:'提示', 
                        message:`您的账号审核中，只有正式会员才可买买买，若有疑问，请联系客服400-996-3399`,
                        confirmButtonText: '我知道了'
                    });
                }
                if(status === 'FREEZE') {
                    vm.$messageBox({
                        title:'提示', 
                        message:`您的账号因违规操作而被冻结无法买买买~若有疑问，请联系客服400-996-3399`,
                        confirmButtonText: '我知道了'
                    }).then(res => {
                        vm.$api.get('/oteao/login/logout',{},res => {})
                    })
                }
                if(status === 'INACTIVE') {
                    vm.$messageBox({
                        title:'提示', 
                        message:`您的账号审核未通过，只有正式会员才可买买买，若有疑问，请联系客服400-996-3399`,
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        confirmButtonText: '完善资料'
                    }).then(res => {
                        if(res === 'cancel') {
                            return;
                        } else {
                            vm.$router.push({name: '茶帮通注册2'})
                        }
                    })
                }
                if(status === 'AUDIT_NO_PASS') {
                    vm.$messageBox({
                        title:'提示', 
                        message:`您的账号审核未通过，只有正式会员才可买买买，若有疑问，请联系客服400-996-3399`,
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        confirmButtonText: '完善资料'
                    }).then(res => {
                        if(res === 'cancel') {
                            return;
                        } else {
                            vm.$router.push({name: '茶帮通注册3'})
                        }
                    })
                }
                return vm.$router.go(-1);
            }

            store.dispatch('getMemberData').then((res) => {
                next(vm);
            }).catch(res => {
                next(vm => {
                    vm.$router.push('/login');
                })
            })
        }
    }
</script>
<style lang="less">
@import '~@/styles/less/cart.less';
</style>