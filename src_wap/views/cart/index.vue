<template>
    <div class="cart_wrapper">
        <div class="edit_floor"><a href="javascript:void(0);">编辑</a></div>
        <div class="product_floor">
            <!-- 商品分组 -->
            <div class="group normal_product" v-for="list in groupCollect">
                <!-- 所属店铺 -->
                <div class="flex align_items_c shop_caption">
                    <div class="left_check flex justify_content_c" :class="{'checked':list.checkedAll}" @click="selectAll(list)">
                        <p class="flex">
                            <input type="checkbox" name="" :id="list.id" hidden>
                            <!-- <label :for="list.id"></label> -->
                            <span></span>
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
                <div class="pro_item" v-for="item in list.products" :class="{'no_border':item.tipsFlag}">
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
                                <span></span>
                            </p>
                        </div>
                        <div class="right_info flex-1">
                            <div class="pro_info flex">
                                <div class="pro_img">
                                    <a :href="item.proHref"><img :src="item.proImg" alt=""></a>
                                </div>
                                <div class="flex-1 pro_detail">
                                    <a :href="item.proHref" class="flex flex_col">
                                        <h4 class="flex-1">{{item.proName}}</h4>
                                        <!-- 正常商品 -->
                                        <div class="flex-1 flex align_items_end" v-if="!item.isFree">
                                            <div class="pro_price"><span class="money">{{item.proPrice}}</span>元/{{item.proWeight}}</div>
                                            <div class="pro_number clearfix">
                                                <span class="decrease"><i class="iconfont">&#xe851;</i></span>
                                                <input class="input-num" type="text" :value="item.proNum">
                                                <span class="plus"><i class="iconfont">&#xe638;</i></span>
                                            </div>
                                        </div>
                                        <!-- 赠品 -->
                                        <div class="flex-1 flex align_items_end" v-else>
                                            <div class="pro_price"><span class="money">￥{{toFixed(item.proPrice)}}</span><span class="market_price">￥<del>{{toFixed(item.marketPice)}}</del></span></div>
                                            <div class="pro_number clearfix">
                                                <p>× {{item.proNum}}</p>
                                            </div>
                                        </div>
                                    </a>
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
        <!-- 您可能喜欢 -->
        <div class="may_like">
            <h4 class="tit_like"><span>您可能喜欢</span></h4>
            <div class="search_pros">
                <ul class="may_pros_list clearfix">
                    <li class="may_pro_item">
                        <a href="##">
                            <div class="tag_img">
                                <img src="">
                            </div>
                            <div class="pro_img">
                                <img src="../../assets/cart_img2.png" />
                            </div>
                            <div class="pro_txt">
                                <h4>醉品朴茶 武夷岩茶 水仙 中火特级 本朴</h4>
                                <p>正岩核心产区 花香馥郁</p>
                                <p class="pro_price">￥469.00</p> 
                            </div>
                        </a>
                        <a class="cart_cir" href="javscript:void(0);"></a>
                    </li>
                </ul>
                <div class="no-more">没有更多了哟~</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                selectIds:[],   //选择的商品
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
                                proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                                proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                                proPrice: 300, //商品价格
                                proWeight: "斤",
                                proNum: 33,  //商品数量
                                proHref: "/login",
                                tips: '每单限购5件，您超出最高购买量啦~',
                                tipsFlag: true,
                                checkedFlag: false,  //是否被选中
                                isFree: false,       //是否是赠品
                                isSpecial: true,    //是否为特价商品
                            },
                            {
                                proId: 12,
                                proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                                proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                                proPrice: 330, //商品价格
                                proWeight: "斤",
                                proNum: 3,  //商品数量
                                proHref: "/login",
                                tips: '',
                                tipsFlag: false,
                                checkedFlag: false,  //是否被选中
                                isFree: false,       //是否是赠品
                                isSpecial: false,    //是否为特价商品
                            },
                            {
                                proId: 12,
                                proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                                proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                                proPrice: 0, //商品价格
                                proWeight: "斤",
                                proNum: 1,  //商品数量
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
                                proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                                proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                                proPrice: 30, //商品价格
                                proWeight: "克",
                                proNum: 3,  //商品数量
                                proHref: "/login",
                                tips: '',
                                tipsFlag: false,
                                checkedFlag: false,  //是否被选中
                                isFree: false,       //是否是赠品
                            },
                            {
                                proId: 22,
                                proImg: '../src_wap/assets/cart_img1.png',  //商品图片
                                proName: "安溪西坪 清香型（消酸）铁观音303-507  2015秋茶",  //商品名称
                                proPrice: 300, //商品价格
                                proWeight: "克",
                                proNum: 3,  //商品数量
                                proHref: "/login",
                                tips: '每单限购5件，您超出最高购买量啦~',
                                tipsFlag: true,
                                checkedFlag: false,  //是否被选中
                                isFree: false,       //是否是赠品
                            },
                        ]
                        
                    }
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
            //全选或全不选
            selectAll(list){
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
            }
        }
    }
</script>
<style lang="less">
@import '~@/styles/less/cart.less';
</style>