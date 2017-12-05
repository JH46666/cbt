<template>
    <div class="empty" v-if="cartData===[]">
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
            <div class="group normal_product" v-for="list in cartData.oteaoCart">
                <div>
                    <!-- 所属店铺 -->
                    <div class="flex align_items_c shop_caption">
                        <div class="left_check flex justify_content_c" :class="{'checked':list.checkedAll}" @click="selectGroupAll(list)">
                            <p class="flex">
                                <input type="checkbox" name="" :id="list.orgId" hidden>
                                <span class="check_cir"></span>
                            </p>
                        </div>
                        <div v-if="list.orgId" class="other"><img src="../../assets/images/shop_icon.png" alt=""></div>
                        <div v-else class="self"><img src="../../assets/images/logo_2.png" alt=""></div>
                        <p>{{list.shopName}}</p>
                    </div>
                    <!-- 正常商品 -->
                    <div class="pro_item" v-for="item in list.cartList"  :class="{'no_border':item.tipsFlag}" :key="item.proId">
                        <div class="flex">
                            <!-- 复选按钮 -->
                            <div class="left_check flex justify_content_c" :class="{'checked':item.checkedFlag}" @click="selectOne(list,item)">
                                <p class="flex align_items_c pro_label">
                                    <input type="checkbox" name="" :id="item.proId" v-model="selectIds" hidden>
                                    <span class="check_cir"></span>
                                </p>
                            </div>
                            <div class="right_info flex-1">
                                <div class="pro_info flex">
                                    <div class="pro_img">
                                        <!-- <div class="tag_img" v-if="item.tagImg">
                                            <img :src="item.tagImg" alt="">
                                        </div> -->
                                        <a href="javascript:void(0);" @click="goDetail(item.proSku)"><img :src="item.imageUrl" alt=""></a>
                                    </div>
                                    <div class="flex-1 pro_detail">
                                        <div class="flex flex_col detail_inner">
                                            <a href="javascript:void(0);" @click="goDetail(item.proSku)">
                                                <h4>{{item.proName}}</h4>
                                            </a>
                                            <div class="flex-1 flex align_items_end">
                                                <div class="pro_price"><span class="money">{{item.priorityPrice}}</span>元/{{item.unit}}</div>
                                                <div class="pro_number clearfix">
                                                    <span class="decrease" @click="numDecrease(item)"><i class="iconfont">&#xe851;</i></span>
                                                    <input class="input-num" type="text" :value="item.buyNum" @blur="numChange($event.target.value,item)">
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
                        <div class="tips_div" v-if="item.tipsFlag">
                            <p>{{item.tips}}</p>
                        </div>
                    </div>
                    <!-- 活动&赠品 -->
                    <div class="pro_item" v-if="list.cartList.giftList && list.cartList.giftList.length>0" v-for="item in list.cartList" :key="item.proId">
                        <!-- 活动&赠品caption -->
                        <div class="pro_free_caption">
                            <span class="full_free">{{item.ruleName}}</span>
                            <span>{{item.ruleName}}</span>
                        </div>
                        <div class="flex">
                            <!-- 复选按钮 -->
                            <div class="left_check flex justify_content_c visi_h" @click="selectOne(list,item)">
                                <p class="flex align_items_c pro_label">
                                    <input type="checkbox" name="" :id="item.proId" v-model="selectIds" hidden>
                                    <span class="check_cir"></span>
                                </p>
                            </div>
                            <div class="right_info flex-1">
                                <div class="pro_info flex">
                                    <div class="pro_img">
                                        <a href="javascript:void(0);" @click="goDetail(item.proSku)"><img :src="item.imageUrl" alt=""></a>
                                    </div>
                                    <div class="flex-1 pro_detail">
                                        <div class="flex flex_col detail_inner">
                                            <a href="javascript:void(0);" @click="goDetail(item.proSku)">
                                                <h4>{{item.proName}}</h4>
                                            </a>
                                            <!-- 赠品 -->
                                            <div class="flex-1 flex align_items_end">
                                                <div class="pro_price"><span class="money">￥{{toFixed(item.proPrice)}}</span><span class="market_price">￥<del>{{toFixed(item.formerPrice)}}</del></span></div>
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
                </div>
            </div>
            <div class="group expired_product">
                <!-- 失效商品 -->
                <div class="pro_item" v-for="item in cartData.disableList">
                    <div class="flex">
                        <div class="right_info flex-1">
                            <div class="pro_info flex">
                                <div class="pro_img">
                                    <a href="javascript:void(0);"><img :src="item.proImg" alt=""></a>
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
                                            <div class="pro_price"><span class="money">￥{{toFixed(item.priorityPrice)}}</span></div>
                                            <div class="pro_number clearfix">
                                                <p>× 1</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="clear_expired" href="javascript:void(0);">清空失效商品</a>
            </div>
        </div>
        <!-- 猜你喜欢 -->
        <may-like></may-like>
        <!-- 底部结算 -->
        <div class="cart_bottom flex">
            <div class="select_all left_check flex" :class="{'flex-1':edit,'checked':checkedAll}">
                <p class="flex align_items_c" @click="selectAll">
                    <input type="checkbox" name="" hidden>
                    <span class="check_cir"></span>
                </p>
                <p>已选(<span class="selectProductNum">{{sumCount}}</span>)</p>
            </div>
            <div class="flex-1 money_total" v-show="!edit">
                <p class="color_f08">￥<span>{{totalMoney}}</span></p>
                <p class="inte-subtotal-box" style="display: none;">
                    <span>
                        -<span class="inte-subtotal">0</span>
                    </span>
                    <img class="icon_jf" src="https://m.zuipin.cn/wap/images/ic_jiesuan_jifen.png" alt="">
                </p>
            </div>
            <div class="go_pay" :class="{'disabled': selectIds.length===0}">
                <a v-if="!edit" href="javascript:void(0);" id="toCheckout" @click="gotoBalance">去结算</a>
                <a v-else href="javascript:void(0);" @click="deletePro">删除</a>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {MessageBox,Toast} from 'mint-ui';
    export default {
        data(){
            return {
                selectIds:[],   //选择的商品
                edit: false,    //编辑
                checkedAll: false, //结算栏的全选或全不选
                totalNum:  0,      //有效商品总数（不包括赠品和失效）
                baseData:[],
                mayProducts:[
                    {   
                        proId: 11,
                        tagImg: '../src_wap/assets/images/specail_tag.png',  //商品图片
                        proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                        proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                        proDesc: "正岩核心产区 花香馥郁",
                        proPrice: 300, //商品价格
                        proWeight: "斤",
                        proHref: "/login",
                        isSpecial: true,    //是否为特价商品
                    },
                    {
                        proId: 12,
                        tagImg: null,
                        proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                        proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                        proDesc: "正岩核心产区 花香馥郁",
                        proPrice: 330, //商品价格
                        proWeight: "斤",
                        proHref: "/login",
                        isSpecial: false,    //是否为特价商品
                    },
                ]
            }
        },
        computed:{
            ...mapGetters([
                'cartData'
            ]),
            //选中数量是否等于购物车有效商品数量（不包括赠品和失效）
            sumCount(){
                if(this.selectIds.length == this.totalNum){
                    this.checkedAll = true;
                }else{
                    this.checkedAll = false;
                }
                return this.selectIds.length;
            },
            //选中商品总金额
            totalMoney(){
                let sumMoney = 0;
                if(this.selectIds.length > 0){
                    for(let item of this.selectIds){
                        sumMoney += item.num * (item.price * 100);
                    }
                }
                return this.toFixed(sumMoney/100);
            }
        },
        created(){
            this.$store.dispatch('queryCart',{}).then(res=>{
                this.baseData = res.data;
                this.totalNum = this.baseData.proTotalNum;
                for(let list of this.baseData.oteaoCart){
                    this.$set(list,'count',0);
                    this.$set(list,'checkedAll',false);
                    for(let item of list.cartList){
                        this.$set(item,'checkedFlag',false);
                        this.$set(item,'tipsFlag',false);
                        this.$set(item,'tips','');
                    }
                }
                this.$store.commit('SET_CART_LIST',this.baseData);
            },res=>{});
        },
        methods: {
            //删除商品
            deletePro(){
                if(this.selectIds.length>0){
                    let idStr = '';
                    for(let i=0; i<this.selectIds.length; i++){
                        idStr = this.selectIds[i].id + ',';
                    }
                    idStr = idStr.substr(0, idStr.length - 1); 
                    this.$api.post('/oteao/shoppingCart/del',{ids:idStr},res=>{
                        window.location.reload();
                    },res=>{
                        console.log(res);
                    })
                }
            },
            //去详情
            goDetail(val){
                this.$router.push({
                    path: '/detail',
                    query: {proSku:val}
                });
            },
            //保留两位小数
            toFixed(num) { 
                if(isNaN(num)) {
                    return '0.00'
                }else{
                    return Number(num).toFixed(2);
                }
            },
            //更新选中的数量
            updateSeleNum(id,val){
                for(let i=0; i<this.selectIds.length; i++){
                    if(this.selectIds[i].id == id){
                        this.selectIds[i].num = Number(val);
                        break;
                    }
                }
            },
            //取消选择时，删除selectIds的数据
            delSeleId(id){
                for(let i=0; i<this.selectIds.length; i++){
                    if(this.selectIds[i].id == id){
                        this.selectIds.splice(i,1);
                        break;
                    }
                }
            },
            // 减
            numDecrease(item){
                if(item.buyNum > 1){
                    let data = {
                        id: item.id,
                        proId: item.proId,
                        buyNum: item.buyNum-1,
                        device: 'WAP'
                    }
                    this.$api.post('/oteao/shoppingCart/updateBuyNum',data,res=>{
                        item.buyNum--;
                        this.updateSeleNum(item.id,item.buyNum);
                    },res=>{
                        item.tipsFlag = true;
                        item.tips = res.errorMsg;
                    })
                }
            },
            //input输入数量
            numChange(val,item){
                 let reg = /^[1-9]\d*$/;
                if(reg.test(val)){
                    let data = {
                        id: item.id,
                        proId: item.proId,
                        buyNum: val,
                        device: 'WAP'
                    }
                    this.$api.post('/oteao/shoppingCart/updateBuyNum',data,res=>{
                        item.buyNum = val;
                        this.updateSeleNum(item.id,item.buyNum);
                    },res=>{
                        item.tipsFlag = true;
                        item.tips = res.errorMsg;
                    })
                }else{
                    Toast('您输入的格式有误，请重新输入');
                    item.buyNum = 1;
                }
            },
            // 加
            numPlus(item){
                let data = {
                    id: item.id,
                    proId: item.proId,
                    buyNum: item.buyNum+1,
                    device: 'WAP'
                }
                this.$api.post('/oteao/shoppingCart/updateBuyNum',data,res=>{
                    item.buyNum++;
                    this.updateSeleNum(item.id,item.buyNum);
                },res=>{
                    item.tipsFlag = true;
                    item.tips = res.errorMsg;
                })
            },
            //单个选择或取消选择
            selectOne(list,item){
                let sum = list.cartList.length;
                if(item.checkedFlag){
                    this.delSeleId(item.id);
                    list.count--;
                }else{
                    this.selectIds.push({
                        id:item.id,
                        num: item.buyNum,
                        price: item.priorityPrice === null ? 0 : item.priorityPrice
                    });
                    list.count++;
                }
                if(list.count == sum){
                    list.checkedAll = true;
                }else{
                    list.checkedAll = false;
                }
                item.checkedFlag = !item.checkedFlag;
            },
            //分组全选或全不选
            selectGroupAll(list){
                if(list.checkedAll){
                    for(let item of list.cartList){
                        item.checkedFlag = false;
                        this.delSeleId(item.id);
                    }
                    list.count = 0;
                }else{
                    for(let item of list.cartList){
                        item.checkedFlag = true;
                        this.selectIds.push({
                            id:item.id,
                            num: item.buyNum,
                            price: item.priorityPrice === null ? 0 : item.priorityPrice
                        });
                    }
                    list.count = list.cartList.length;
                }
                list.checkedAll = !list.checkedAll;
            },
            //全选购物车或全部选
            selectAll(){
                if(this.cartData.oteaoCart){
                    for(let item of this.cartData.oteaoCart){
                        this.selectGroupAll(item);
                    }
                    this.checkedAll = !this.checkedAll;
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
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.$store.dispatch('queryCart',{}).then(res=>{
                    
                },res=>{
                    if(res.errorMsg == '您的账号审核中，请耐心等待~'){
                        MessageBox({
                            title:'提示', 
                            message:`${res.errorMsg}<br>若有疑问，请联系客服<br>4006-066-068`,
                            confirmButtonText: '我知道了'
                        });
                        vm.$router.push(from.fullPath);
                    }else if(res.errorMsg == '会员才能进入购物车哟~'){
                        MessageBox({
                            title:'提示', 
                            message:`您的账号审核未通过，只有正式会员才能进入购物车哟~`,
                            confirmButtonText: '完善资料',
                            showCancelButton: true
                        },action=>{
                            if(action == 'confirm'){
                                vm.$router.push('/regist/seller');
                                return;
                            }
                        });
                        vm.$router.push(from.fullPath);
                    }
                });
            });
        }
    }
</script>
<style lang="less">
@import '~@/styles/less/cart.less';
</style>