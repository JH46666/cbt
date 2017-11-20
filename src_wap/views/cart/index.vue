<template>
    <div class="cart_wrapper">
            <div class="edit_floor"><a @click="edit=!edit">{{edit==true?'完成':'编辑'}}</a></div>
        <div class="product_floor">
            <!-- 商品分组 -->
            <div class="group normal_product" v-for="list in groupCollect">
                <div>
                    <!-- 所属店铺 -->
                    <div class="flex align_items_c shop_caption">
                        <div class="left_check flex justify_content_c" :class="{'checked':list.checkedAll}" @click="selectGroupAll(list)">
                            <p class="flex">
                                <input type="checkbox" name="" :id="list.id" hidden>
                                <!-- <label :for="list.id"></label> -->
                                <span class="check_cir"></span>
                            </p>
                        </div>
                        <template v-if="list.isSelf">
                            <div class="self"><img src="../../assets/images/small_logo.png" alt=""></div>
                            <p>自营</p>
                        </template>
                        <template v-else>
                            <div class="other"><img src="../../assets/images/shop_icon.png" alt=""></div>
                            <p>{{list.shopName}}</p>
                        </template>
                    </div>
                    <!-- 商品 -->
                    <div class="pro_item" v-for="item in list.products" :class="{'no_border':item.tipsFlag}" :key="item.proId">
                        <!-- 活动&赠品caption -->
                        <div class="pro_free_caption" v-if="item.isFree">
                            <span class="full_free">满赠</span>
                            <span>满358元送金骏眉</span>
                        </div>
                        <div class="flex">
                            <!-- 复选按钮 -->
                            <div class="left_check flex justify_content_c" :class="{'checked':item.checkedFlag,'visi_h': item.isFree}" @click="selectOne(list,item)">
                                <p class="flex align_items_c pro_label">
                                    <input type="checkbox" name="" :id="item.proId" v-model="selectIds" hidden>
                                    <!-- <label :for="item.proId"></label> -->
                                    <span class="check_cir"></span>
                                </p>
                            </div>
                            <div class="right_info flex-1">
                                <div class="pro_info flex">
                                    <div class="pro_img">
                                        <div class="tag_img" v-if="item.tagImg">
                                            <img :src="item.tagImg" alt="">
                                        </div>
                                        <a :href="item.proHref"><img :src="item.proImg" alt=""></a>
                                    </div>
                                    <div class="flex-1 pro_detail">
                                        <div class="flex flex_col detail_inner">
                                            <a :href="item.proHref">
                                                <h4>{{item.proName}}</h4>
                                            </a>
                                            <!-- 正常商品 -->
                                            <div class="flex-1 flex align_items_end" v-if="!item.isFree">
                                                <div class="pro_price"><span class="money">{{item.proPrice}}</span>元/{{item.proWeight}}</div>
                                                <div class="pro_number clearfix">
                                                    <span class="decrease" @click="numDecrease(item)"><i class="iconfont">&#xe851;</i></span>
                                                    <input class="input-num" type="text" :value="item.proNum" @blur="numChange($event.target.value,item)">
                                                    <span class="plus" @click="numPlus(item)"><i class="iconfont">&#xe638;</i></span>
                                                </div>
                                            </div>
                                            <!-- 赠品 -->
                                            <div class="flex-1 flex align_items_end" v-else>
                                                <div class="pro_price"><span class="money">￥{{toFixed(item.proPrice)}}</span><span class="market_price">￥<del>{{toFixed(item.marketPice)}}</del></span></div>
                                                <div class="pro_number clearfix">
                                                    <p>× {{item.proNum}}</p>
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
                            <p>每单限购5件，您超出最高购买量啦~</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="group expired_product">
                <!-- 失效商品 -->
                <div class="pro_item" v-for="item in mayProducts">
                    <div class="flex">
                        <div class="right_info flex-1">
                            <div class="pro_info flex">
                                <div class="pro_img">
                                    <a :href="item.proHref"><img :src="item.proImg" alt=""></a>
                                    <div class="expired_txt">
                                        <p>失效</p>
                                    </div>
                                </div>
                                <div class="flex-1 pro_detail">
                                    <div class="flex flex_col detail_inner">
                                        <a :href="item.proHref">
                                            <h4>{{item.proName}}</h4>
                                        </a>
                                        <div class="flex-1 flex align_items_end">
                                            <div class="pro_price"><span class="money">￥{{toFixed(item.proPrice)}}</span></div>
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
            </div>
        </div>
        <may-like></may-like>
        <!-- 底部结算 -->
        <div class="cart_bottom flex">
            <div class="select_all left_check flex" :class="{'flex-1':edit}">
                <p class="flex align_items_c" @click="selectAll">
                    <input type="checkbox" name="" hidden>
                    <span class="check_cir"></span>
                </p>
                <p>已选(<span class="selectProductNum">100</span>)</p>
            </div>
            <div class="flex-1 money_total" v-show="!edit">
                <p class="color_f08">￥<span>238.00</span></p>
                <p class="inte-subtotal-box" style="display: none;">
                    <span>
                        -<span class="inte-subtotal">0</span>
                    </span>
                    <img class="icon_jf" src="https://m.zuipin.cn/wap/images/ic_jiesuan_jifen.png" alt="">
                </p>
            </div>
            <div class="go_pay">
                <a v-if="!edit" href="javascript:void(0);" id="toCheckout">去结算</a>
                <a v-else href="javascript:void(0);">删除</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                selectIds:[],   //选择的商品
                edit: false,    //编辑
                groupCollect:[
                    {
                        isSelf: false,  //是否自营
                        shopName: "我是啦啦啦啦", //店铺名称
                        id: 1,   //店铺id
                        checkedAll: false,   //是否全选
                        count:  0,         //计算选择商品的个数
                        products:[
                            {   
                                proId: 11,
                                tagImg: '../src_wap/assets/images/specail_tag.png',  //商品图片
                                proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                                proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                                proPrice: 300, //商品价格
                                proWeight: "斤",
                                proNum: 1,  //商品数量
                                maxNum: 5,   //购买最大数量
                                proHref: "/login",
                                tips: '每单限购5件，您超出最高购买量啦~',
                                tipsFlag: false,
                                checkedFlag: false,  //是否被选中
                                isFree: false,       //是否是赠品
                                isSpecial: true,    //是否为特价商品
                            },
                            {
                                proId: 12,
                                tagImg: null,
                                proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                                proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                                proPrice: 330, //商品价格
                                proWeight: "斤",
                                proNum: 3,  //商品数量
                                maxNum: 9999,   //购买最大数量
                                proHref: "/login",
                                tips: '',
                                tipsFlag: false,
                                checkedFlag: false,  //是否被选中
                                isFree: false,       //是否是赠品
                                isSpecial: false,    //是否为特价商品
                            },
                            {
                                proId: 12,
                                tagImg: null,
                                proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                                proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                                proPrice: 0, //商品价格
                                proWeight: "斤",
                                proNum: 1,  //商品数量
                                maxNum: 9999,   //购买最大数量
                                proHref: "/login",
                                tips: '',
                                tipsFlag: false,
                                checkedFlag: false,  //是否被选中
                                isFree: true,       //是否是赠品
                                isSpecial: false,    //是否为特价商品
                                marketPice: 59,   //市场价
                            },
                        ]
                        
                    },
                    {
                        isSelf: true,  //是否自营
                        shopName: "自营", //店铺名称
                        id: 2,   //店铺id
                        checkedAll: false,   //是否全选
                        count:  0,         //计算选择商品的个数
                        products:[
                            {
                                proId: 21,
                                tagImg: '../src_wap/assets/images/specail_tag.png',  //商品图片
                                proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                                proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                                proPrice: 30, //商品价格
                                proWeight: "克",
                                proNum: 3,  //商品数量
                                maxNum: 9999,   //购买最大数量
                                proHref: "/login",
                                tips: '',
                                tipsFlag: false,
                                checkedFlag: false,  //是否被选中
                                isFree: false,       //是否是赠品
                            },
                            {
                                proId: 22,
                                tagImg: null,
                                proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                                proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                                proPrice: 300, //商品价格
                                proWeight: "克",
                                proNum: 3,  //商品数量
                                maxNum: 5,   //购买最大数量
                                proHref: "/login",
                                tips: '每单限购5件，您超出最高购买量啦~',
                                tipsFlag: true,
                                checkedFlag: false,  //是否被选中
                                isFree: false,       //是否是赠品
                            },
                        ]
                        
                    }
                ],
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
        created(){

        },
        methods:{
            //保留两位小数
            toFixed(num) { 
                if(isNaN(num)) {
                    return '0.00'
                }else{
                    return Number(num).toFixed(2);
                }
            },
            // 减
            numDecrease(item){
                console.log(0.1+0.2);
                 if(item.proNum > 1){
                    item.proNum--;
                 }else{
                    item.proNum = 1;
                 }
            },
            //input输入数量
            numChange(val,item){
                if(Number(val) >= Number(item.maxNum)){
                    val = item.maxNum;
                    item.tipsFlag = true;
                }else if(Number(val)<=1){
                    val = 1;
                }
                this.$nextTick(()=>{
                    item.proNum = val;
                });
                 
            },
            // 加
            numPlus(item){
                 if(item.proNum == item.maxNum){
                    item.proNum = item.maxNum;
                    item.tipsFlag = true;
                 }else{
                    item.proNum++;
                 }
            },
            //单个选择或取消选择
            selectOne(list,item){
                let sum = 0;
                for(let pro of list.products){
                    if(!pro.isFree){
                        sum++;
                    }
                }
                if(item.checkedFlag){
                    let index = this.selectIds.indexOf(item.proId);
                    this.selectIds.splice(index,1);
                    list.count--;
                }else{
                    this.selectIds.push(item.proId);
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
                    for(let item of list.products){
                        item.checkedFlag = false;
                    }
                }else{
                    for(let item of list.products){
                        item.checkedFlag = true;
                    }
                }
                list.checkedAll = !list.checkedAll;
            },
            selectAll(){
                console.log(111);
            }
        }
    }
</script>
<style lang="less">
@import '~@/styles/less/cart.less';
</style>