<template>
    <div class="detail">
        <mt-popup v-model="showOrHide" position="bottom">
            <div class="dialog_wrapper_2" v-if="detailData.productInfo.businessType === 'ORG_SALES'">
                <div class="dialog_title">
                    <i class="iconfont icon-dianpu"></i>
                    <span>{{ detailData.orgShopCenterVo.shopName }}</span>
                </div>
                <div class="dialog_content">
                    <div class="item_1">
                        <span>类型</span>
                        <span>
                            <span>{{ shopType[detailData.orgShopCenterVo.shopType] }}</span>
                        </span>
                    </div>
                    <div class="item_1">
                        <span>信誉</span>
                        <span>
                            <i class="star" :class="isLevelType(detailData.orgShopCenterVo.growth)" v-for="n in $tool.levelNum(detailData.orgShopCenterVo.growth)" :key="n"></i>
                        </span>
                    </div>
                    <div class="item_1">
                        <span>地址</span>
                        <span>{{ detailData.orgShopCenterVo.address }}</span>
                    </div>
                    <div class="item_1">
                        <span>电话</span>
                        <a :href="shopTel">{{ detailData.orgShopCenterVo.businessTelephone }}</a>
                    </div>
                </div>
            </div>
            <div class="dialog_wrapper_1" v-else>
                <div class="dialog_title">
                    <i class="iconfont icon-kefu1"></i>
                    <span>茶帮通客服</span>
                </div>
                <div class="dialog_content">
                    <div class="item_1">
                        客服热线：<span><a href="tel:400-996-3399">400-996-3399</a></span>
                    </div>
                    <div class="item_2">
                        服务时间：<span>08:40 - 22:30（周一至周日</span>）
                    </div>
                </div>
            </div>
        </mt-popup>
        <div class="detail_wrapper" @scroll="docScroll" ref="wrapper">
            <div class="goIndex" v-if="!(tabFixed || wxFixed)" @click="$router.push({name: '首页'})" :class="{on: wxFixed}">
                <span>回首页</span>
                <i class="iconfont">&#xe61b;</i>
            </div>
            <div class="top" :class="{on: tabFixed || wxFixed}" @click="topMethod"></div>
            <div ref="hel">
                <div class="detail_img">
                    <mt-swipe :auto="5000" :show-indicators="false" @change="handleChange">
                        <mt-swipe-item v-for="(item,index) in detailData.productImgList" :key="index">
                            <img :src="item.imgUrl" :key="index">
                        </mt-swipe-item>
                    </mt-swipe>
                    <!--   -->
                    <div class="detail_special" v-if="detailData.productExtInfo.isSales && detailData.productExtInfo.state === 'ON_SHELF' && loginId && state === 'ACTIVE'">
                        <div class="detail_special_wrapper">
                            <div class="detail_special_price">
                                <span>特价</span>
                                <span>￥</span>
                                <span>{{ detailData.productExtInfo.salesPrice | toFix2 }}</span>
                                <del>{{ detailData.productPrice[0].price | toFix2 }}</del>
                            </div>
                            <div class="detail_special_date">
                                <span class="date_num date_none">{{ special.day }}</span>
                                <span class="date_icon date_10">天</span>
                                <span class="date_num">{{ special.hour }}</span>
                                <span class="date_icon">:</span>
                                <span class="date_num">{{ special.min }}</span>
                                <span class="date_icon">:</span>
                                <span class="date_num">{{ special.sec }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail_img_index">
                        <span>{{ imgIndex }}</span>/{{ detailData.productImgList.length }}
                    </div>
                </div>
                <div class="detail_describe">
                    <div class="detail_describe_wrapper">
                        <div class="detail_describe_text">
                            <p class="detail_text">{{ detailData.productExtInfo.title }}</p>
                            <template  v-if="detailData.productExtInfo.state === 'OFF_SHELF' && loginId && state === 'ACTIVE'">
                                <div class="off_shelf_tips">
                                    暂无报价
                                </div>
                            </template>
                            <template  v-if="!loginId || state != 'ACTIVE'">
                                <div class="off_shelf_tips">
                                    询价
                                </div>
                            </template>
                            <template v-if="detailData.productPrice.length != 0 && detailData.productExtInfo.state === 'ON_SHELF' && loginId && state === 'ACTIVE'">
                                <p class="detail_now_price" v-if="!detailData.productExtInfo.isSales">￥{{ detailData.productPrice[0].price | toFix2 }}</p>
                                <p class="detail_suggest_price">建议零售价：￥{{ detailData.productPrice[1].price | toFix2 }}</p>
                            </template>
                        </div>
                        <template  v-if="detailData.productExtInfo.state === 'ON_SHELF'">
                            <div class="detail_active">
                                <div class="detail_active_list">
                                    <!-- <div class="detail_active_item" v-if="detailData.productExtInfo.isSales">
                                        <span>直降</span>
                                        <p>已优惠￥{{  (detailData.productPrice[0].price-detailData.productExtInfo.salesPrice)  | toFix2 }}</p>
                                    </div> -->
                                    <div class="detail_active_item">
                                        <span>运费</span>
                                        <template v-if="detailData.productInfo.businessType == 'ORG_SALES'">
                                            <p v-if="!detailData.orgFreightTemplateVoList || detailData.orgFreightTemplateVoList.length == 0">本店商品全国包邮</p>
                                            <p v-else-if="detailData.orgFreightTemplateVoList && detailData.orgFreightTemplateVoList.length > 0">邮费依实际重量计算运费</p>
                                        </template>
                                        <template v-else>
                                            <p>自营茶叶满500包邮</p>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div class="detail_describe_count">
                            <label class="label_text">采购量</label>
                            <div class="plusOreduce">
                                <span class="reduce btn" :class="{isGary:goodsCount === 1}" @click="reduceMethod">-</span>
                                <input v-model="goodsCount" type="number" class="countNum" @blur="limit">
                                <span class="plus btn" @click="plusMethod">+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail_tab" ref="tab">
                <mt-navbar v-model="tabSelected" :class="{'on': tabFixed , 'wxon': wxFixed}" ref='heihghj'>
                    <i class="iconfont fixIndex" :class="{'on': tabFixed || wxFixed }" v-if="tabFixed || wxFixed" @click="$router.push({name: '首页'})">&#xe61b;</i>
                    <mt-tab-item id="1">详情</mt-tab-item>
                    <mt-tab-item id="2">规格</mt-tab-item>
                    <mt-tab-item id="3"><span @click="showComment">评论</span> </mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="tabSelected" :swipeable="false">
                    <mt-tab-container-item id="1" ref="tabcontent1">
                        <div class="mint_cell_wrapper mint_cell_img_wrapper">
                            <template v-if="imgDetailHtml.length>0">
                                <div v-html="imgDetailHtml"></div>
                            </template>
                            <template v-else>
                                <mt-cell v-for="(item,index) in imgDetail" :key="index" v-if="item.content != '' && item.imgArray.length != 0">
                                    <div class="mint_cell_img_title">{{ item.title }}</div>
                                    <div class="mint_cell_img">
                                        <img :src="ur.imgUrl" v-for="(ur,k) in item.imgArray" :key="k" />
                                    </div>
                                    <p class="mint_cell_img_content">{{ item.content }}</p>
                                </mt-cell>
                            </template>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2" ref="tabcontent2">
                        <div class="reguler_wrapper">
                            <div class="reguler_item" style="height: .98rem; padding: 0;">
                                <div>商品编号</div>
                                <div>{{ detailData.productInfo.proSku }}</div>
                            </div>
                            <template v-if="isHasFlag">
                                <div class="reguler_item" style="height: 1.5rem; padding: 0;" v-if="detailData.productExtInfo.fragrance != null">
                                    <div>香气</div>
                                    <div class="x_star">
                                        <span class="x_grey" :class="{on: detailData.productExtInfo.fragrance === '偏淡' || detailData.productExtInfo.fragrance === '一般' || detailData.productExtInfo.fragrance === '香' || detailData.productExtInfo.fragrance === '高香' || detailData.productExtInfo.fragrance === '极香'}">偏淡</span>
                                        <span class="x_grey" :class="{on: detailData.productExtInfo.fragrance === '一般' || detailData.productExtInfo.fragrance === '香' || detailData.productExtInfo.fragrance === '高香' || detailData.productExtInfo.fragrance === '极香'}">一般</span>
                                        <span class="x_grey" :class="{on: detailData.productExtInfo.fragrance === '香' || detailData.productExtInfo.fragrance === '高香' || detailData.productExtInfo.fragrance === '极香'}">香</span>
                                        <span class="x_grey" :class="{on: detailData.productExtInfo.fragrance === '高香' || detailData.productExtInfo.fragrance === '极香'}">高香</span>
                                        <span class="x_grey" :class="{on: detailData.productExtInfo.fragrance === '极香'}">极香</span>
                                    </div>
                                </div>
                                <div class="reguler_item" style="height: 1.5rem; padding: 0;" v-if="detailData.productExtInfo.taste != null">
                                    <div>滋味</div>
                                    <div class="z_star">
                                        <span class="z_grey" :class="{on: detailData.productExtInfo.taste === '偏淡' || detailData.productExtInfo.taste === '一般' || detailData.productExtInfo.taste === '浓' || detailData.productExtInfo.taste === '很浓' || detailData.productExtInfo.taste === '极浓'}">偏淡</span>
                                        <span class="z_grey" :class="{on: detailData.productExtInfo.taste === '一般' || detailData.productExtInfo.taste === '浓' || detailData.productExtInfo.taste === '很浓' || detailData.productExtInfo.taste === '极浓'}">一般</span>
                                        <span class="z_grey" :class="{on: detailData.productExtInfo.taste === '浓' || detailData.productExtInfo.taste === '很浓' || detailData.productExtInfo.taste === '极浓'}">浓</span>
                                        <span class="z_grey" :class="{on: detailData.productExtInfo.taste === '很浓' || detailData.productExtInfo.taste === '极浓'}">很浓</span>
                                        <span class="z_grey" :class="{on: detailData.productExtInfo.taste === '极浓'}">极浓</span>
                                    </div>
                                </div>
                            </template>
                            <template v-for="(item,index) in attrImgDetail.propValList">
                                <div class="reguler_item" style="height: .98rem; padding: 0;">
                                    <div>{{ item.atrName }}</div>
                                    <div>{{ item.propertiesVal.propVal }}</div>
                                </div>
                            </template>
                            <div class="reguler_item" v-if="detailData.productExtInfo.reason!=''" style="height: 1.5rem; padding: 0;">
                                <div>推荐理由</div>
                                <div>{{ detailData.productExtInfo.reason }}</div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3" ref="tabcontent3">
                        <div class="comment_wrapper" ref="commentTotal" :class="{'on': tabFixed,'wxon': wxFixed}">
                            <div class="comment_title">商品评价</div>
                            <div class="comment_number">
                                <div class="comment_star">好评 <span>{{ prectent | toFix2 }}%</span></div>
                                <!-- commentRecond -->
                                <div class="comment_total">共 <span>{{ commentRecond }}</span> 条</div>
                            </div>
                        </div>
                        <div class="mint_cell_wrapper">
                            <template v-if="commentList.length === 0 ">
                                <div class="no-comment">
                                    <img src="../../assets/images/no-comment.png" alt="">
                                    <p>暂时还没有评价呦~</p>
                                </div>
                            </template>
                            <template v-else>
                                <mt-cell v-for="(item,index) in commentList" :key="index">
                                    <div class="comment_head">
                                        <div class="comment_head_wrapper">
                                            <div class="comment_head_mumber">{{ regStar(item.nickName) }}</div>
                                            <div class="comment_head_mumberlevel">{{ item.levelName }}</div>
                                        </div>
                                        <div class="comment_head_time">{{ item.createTime }}</div>
                                    </div>
                                    <p class="comment_footer" ref="comment" :class="{on:item.onFlag!==''&& item.onFlag}">
                                        {{ item.content }}
                                        <span v-if="item.replyContent"><span style="color:#c29e74;display:block;">回复：</span>{{item.replyContent}}</span>
                                        <span class="bg-white"><i class="iconfont down" :class="{on:item.pullFlag!=='' && item.pullFlag}" @click="pullOrDown(item)" :key="index+'11'">&#xe619;</i></span>
                                        <span class="bg-white"><i class="iconfont pull" :class="{on:item.upFlag!=='' && item.upFlag}" @click="pullOrDown(item)" :key="index+'12'">&#xe618;</i></span>
                                    </p>
                                </mt-cell>
                            </template>
                        </div>
                        <template v-if="commentList.length < commentRecond">
                            <div class="comment_more_btn" @click="getMoreComment">
                                查看更多评论<i class="iconfont">&#xe619;</i>
                            </div>
                        </template>
                        <template v-if="commentList.length >= commentRecond">
                            <div class="comment_more_btn">
                                没有更多了呦~
                            </div>
                        </template>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <div class="off_shelf" v-if="detailData.productExtInfo.state === 'OFF_SHELF'">
            该商品已下架哦~
        </div>
        <mt-tabbar v-model="selected" class="cbt-footer detail_footer" :isZiYing="isThird" ref="footers">
            <mt-tab-item class="self-kefu" id="1" @click.native="openKfDialog" v-if="!detailData.productInfo.orgId">
                <i class="icon-kefurukousvg" slot="icon"></i>
                茶帮通客服
            </mt-tab-item>
            <template v-else>
                <mt-tab-item class="org-item org-kefu" id="5" @click.native="openKfDialog">
                    <i class="icon-kefurukousvg" slot="icon"></i>
                    店铺客服
                </mt-tab-item>
                <mt-tab-item class="org-item" id="6" @click.native="openDialog" >
                    <i class="icon-dianpu" slot="icon"></i>
                    店铺
                </mt-tab-item>
            </template>
            <mt-tab-item class="org-item" :class="{'cart-btn':!detailData.productInfo.orgId}" id="2" @click.native="openCart">
                <i class="icon-jiarugouwuche" slot="icon"></i>
                购物车
                <mt-badge type="error" size="small" v-show="Number(cartTotal)>0">{{ cartTotal | ninenineAdd }}</mt-badge>
            </mt-tab-item>
            <mt-tab-item id="3" class="join-cart">
                <mt-button type="default" disabled v-if="detailData.productExtInfo.state === 'OFF_SHELF'">加入购物车</mt-button>
                <mt-button type="default" v-else-if="detailData.productExtInfo.isSoldOut == 1 && detailData.productExtInfo.compelOutStock == 0" @click.native="addCartInfo">加入购物车</mt-button>
                <mt-button type="default" disabled v-else>缺货</mt-button>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
import { Toast,Indicator,MessageBox  } from 'mint-ui'
import store from 'store';
import { mapState } from 'vuex'
export default {
    data() {
        return {
            selected: null,
            imgIndex: 1,
            goodsCount: 1,
            tabSelected: '1',
            tabTop: 0,
            tabFixed: false,
            special: {
                day: '',
                hour: '',
                min: '',
                sec: ''
            },
            endTime: '2017/12/12 00:00:00',
            flag : false,
            wxFlag: false,
            wxFixed: false,
            showOrHide: false,
            isThird: false,
            headHeight: 44,
            detailData: {
                integralPrice:null,
                productExtInfo: {},
                productImgList:[],
                productInfo:{},
                productPrice:[]
            },
            time: '',
            attrImgDetail: {},
            page: 1,
            commentList: [],
            commentRecond: 0,
            proSku: '',
            prectent: 0,
            imgDetail: {},
            shopTel: null,
            shopType: {
                1: '茶厂',
                2: '合作社',
                3: '茶企',
                4: '批发商'
            },
            starNum: 0,
            loginId: null,
            state: '',
            maxNum: 0,
            imgDetailHtml: '',
            commentFlag: false,
            timeData: [],
            isHasFlag: true,
        }
    },
    computed:{
        ...mapState({
            cartTotal: state => state.cart.cartTotal
        }),
        
    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','商品详情');
        // 获取购物车数量
        this.$store.dispatch('queryCartTotal');
        this.loginId = store.state.member.member.id;
        this.state = store.state.member.memberAccount.status;
        this.proSku = this.$route.query.proSku;
        this.isHas().then((res)=>{
            if(res.data){
                this.isHasFlag = true;
            }else{
                this.isHasFlag = false;
            }
        })
        this.getDetail().then((res) =>{
            this.detailData = res.data;
            this.maxNum = this.detailData.productExtInfo.stockNum;
            if(res.data.orgShopCenterVo){
                this.shopTel = `tel://${res.data.orgShopCenterVo.businessTelephone}`;
            }
            if(this.detailData.productInfo.orgId){
                this.visitLog();
            }
            this.getAttrOrImg().then((attr) => {
                this.attrImgDetail = attr.data;
                for(let obj of this.attrImgDetail.propValList){
                    let str = obj.propName.substr(0,4);
                    this.$set(obj,'atrName',str);
                }
                try {
                    this.imgDetail =  JSON.parse(attr.data.content)
                } catch (e) {
                    this.imgDetailHtml = attr.data.content;
                }
                this.getCommentList(res.data.productExtInfo.id).then((comment) => {
                    this.timeData = comment.data.evaluations;
                    for(let item of this.timeData){
                        this.$set(item,'onFlag','');
                        this.$set(item,'pullFlag','');
                        this.$set(item,'upFlag','');
                    }
                    this.commentRecond = comment.total_record;
                    this.prectent = comment.data.praiseRate == null ? 0 : comment.data.praiseRate;
                    if(this.commentRecond<=3){
                        this.commentList  = this.timeData;
                    }else{
                        this.commentList = this.timeData.slice(0,3);
                    }
                })
            })
        })
        this.addLike();
    },
    methods: {
        visitLog(){
            let visitData = {
                'visitLog.orgId': this.detailData.productInfo.orgId,
                'visitLog.visitLink': this.$route.fullPath,
                'visitLog.visitSku': this.proSku
            };
            this.$api.post("/oteao/visitLog/insert",visitData,res=>{
                // console.log(res); 
            });
        },
        plusMethod() {
            this.goodsCount++;
            if(this.goodsCount > this.maxNum){
                this.goodsCount = this.maxNum;
                Toast({
                    message: '您需购买的数量超出商品的现有库存！',
                    position: 'center',
                    duration: 500
                });
            }
        },
        reduceMethod() {
            this.goodsCount--;
            if(this.goodsCount < 1){
                this.goodsCount = 1;
            }
        },
        limit() {
            if(parseFloat(this.goodsCount)<1){
                Toast({
                    message: '请输入大于等于1的正整数',
                    position: 'center',
                    duration: 200
                });
                this.goodsCount = 1;
            }else{
                this.goodsCount = Math.floor(this.goodsCount);
                if(parseInt(this.goodsCount) > this.maxNum){
                    Toast({
                        message: '您需购买的数量超出商品的现有库存！',
                        position: 'center',
                        duration: 200
                    });
                    this.goodsCount = this.maxNum;
                }
            }
        },
        // 添加商品到猜你喜欢
        addLike() {
            this.$api.post('/oteao/productInterestingRecord/insert',{
                'productInterestingRecord.sysId': 1,
                'productInterestingRecord.sku': this.proSku,
                'productInterestingRecord.device': 'WAP'
            },res => {},res =>{})
        },
        isLevelType(val) {
            let g = Number(val)
            if(g <= 250) {
                return 'red'
            } else if(g <= 10000) {
                return 'cap'
            } else if(g <= 500000) {
                return 'crown'
            } else {
                return 'blur'
            }
        },
        addCartInfo() {
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
                this.$store.dispatch('addCart',{proId:this.detailData.productExtInfo.proId,buyNum:this.goodsCount}).then(res=>{
                    console.log(res);
                },res=>{});
            }).catch((res)=>{
                return this.$router.push({name: '账户登录'});
            })
        },
        showComment(){
            this.$nextTick(()=>{
                this.initOnFlag();
                this.initPullFlag();
                this.initUpFlag();
            });
        },
        //初始化评论是否超出5行
        initOnFlag(start=0){
            this.$nextTick(()=>{
                for(let i=start;i< this.$refs.comment.length; i++){
                    if(this.$refs.comment[i].offsetHeight > 95){
                        this.commentList[i].onFlag = true;
                    }else{
                        this.commentList[i].onFlag = '';
                    }
                }
            });
        },
        initPullFlag(){
            this.$nextTick(()=>{
                for(let item of this.commentList){
                    if(item.onFlag === ''){
                        item.pullFlag = '';
                    }else{
                        item.pullFlag = item.onFlag;
                    }
                }
            });
        },
        initUpFlag(){
            this.$nextTick(()=>{
                for(let item of this.commentList){
                    if(item.onFlag === ''){
                        item.upFlag = '';
                    }else{
                        if(item.pullFlag === true){
                            item.upFlag = false;
                        }else{
                            item.upFlag = true;
                        }
                    }
                }
            });
        },
        getMoreComment() {
            let oldLen = this.commentList.length;
            if(this.page == 1 && this.commentList.length<10){
                this.commentList = this.timeData;
            }else{
                this.page++;
                this.getCommentList(this.detailData.productExtInfo.id).then((res) => {
                    let temp = res.data.evaluations;
                    for(let item of temp){
                        this.$set(item,'onFlag','');
                        this.$set(item,'pullFlag','');
                        this.$set(item,'upFlag','');
                    }
                    this.commentList = this.commentList.concat(temp);
                    this.$nextTick(()=>{
                        this.initOnFlag(oldLen);
                        this.initPullFlag();
                        this.initUpFlag();
                    })
                })
            }
        },
        isHas() {
            let data ={
                'proSku': this.proSku,
                'sysId': 1
            };
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/productInfo/isShowtasteAndFranste',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        getCommentList(extendId) {
            let pageSize = 10;
            let data ={
                'eval.proExtId': extendId,
                'page.pageNumber': this.page,
                'page.pageSize': pageSize
            };
            return new Promise((resolve,reject) => {
                this.$api.post('/oteao/evaluation/seachEvaluation',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        getAttrOrImg() {
            let data ={
                sysId: 1,
                productSku: this.proSku,
                device: 'WAP'
            };
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/productInfo/getProExtDetail',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        getDetail() {
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
        handleChange(index) {           // 图片索引
            this.imgIndex = index+1;
        },
        regStar(val) {                 // 隐藏会员账号
            if(val.length <= 5){
                let len = val.length;
                val = val.substr(0,len-1) + '*';
                return val;
            }else{
                let len = val.length;
                let star = '';
                for(let i=0; i<len-5; i++){
                    star+='*';
                }
                val = val.substr(0,3) + star + val.substr(len-2,len+1);
                return val;
            }
        },
        setLine() {                 // 显示与隐藏（超出）
            // for(let obj of this.$refs.comment){
            //     if(obj.offsetHeight > 95){
            //         obj.className = obj.className + ' on';
            //         obj.children[0].className = obj.children[0].className + ' on';
            //     }
            // }
        },
        pullOrDown(item) {        // 显示与隐藏（超出）
            item.pullFlag = item.pullFlag?false:true;
            item.onFlag = item.onFlag?false:true;
            item.upFlag = item.upFlag?false:true;
            // if(this.$refs.comment[index].className.indexOf(' on') != -1){
            //     this.$refs.comment[index].className = 'comment_footer';
            // }else{
            //     this.$refs.comment[index].className = 'comment_footer on';
            // }
            // for(let i=0; i<this.$refs.comment[index].children.length; i++){
            //     if(this.$refs.comment[index].children[i].className.indexOf(' on') != -1){
            //         if(i == 0){
            //             this.$refs.comment[index].children[0].className = 'iconfont down'
            //             this.$refs.comment[index].children[1].className = 'iconfont pull on';
            //             return;
            //         }else{
            //             this.$refs.comment[index].children[0].className = 'iconfont down on'
            //             this.$refs.comment[index].children[1].className = 'iconfont pull';
            //             return;
            //         }
            //     }
            // }
        },
        docScroll() {               // 判断页面滚动
            let scrollTop = this.$refs.wrapper.scrollTop;
            let scrollHeight = this.$refs.wrapper.offsetHeight;
            let tabTop = this.$refs.tab.offsetTop;
            let allHideHeight = this.$refs.tab.children[0].offsetHeight+this.$refs.commentTotal.offsetHeight;
            if(scrollTop - tabTop >= 0){
                if(!this.wxFlag){
                    this.tabFixed = true;
                }else{
                    this.wxFixed = true;
                }
                return;
            }else if(scrollTop + allHideHeight - tabTop < 0){
                this.tabFixed = false;
                this.wxFixed = false;
                this.$refs.tabcontent1.$el.style['padding-top'] = 0;
                this.$refs.tabcontent2.$el.style['padding-top'] = 0;
                this.$refs.tabcontent3.$el.style['padding-top'] = 0;
                return;
            }
        },
        topMethod() {               // 滚动到顶部
            this.$refs.wrapper.scrollTop = 0;
        },
        formate (time) {            // 倒计时部分
            if(time>=10){
                return time
            }else{
                return `0${time}`
            }
        },
        timeDown () {
           const endTime = new Date(this.detailData.productExtInfo.salesEndTime);
           const nowTime = new Date();
           let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
           let d = parseInt(leftTime/(24*60*60))
           let h = this.formate(parseInt(leftTime/(60*60)%24))
           let m = this.formate(parseInt(leftTime/60%60))
           let s = this.formate(parseInt(leftTime%60))
           if(leftTime <= 0){
               this.flag = true;
               this.special.day = 0;
               this.special.hour = '00';
               this.special.min = '00';
               this.special.sec = '00';
               return Toast({
                   message: '倒计时已经结束！',
                   position: 'center',
                   duration: 1000
               });
           }else{
               this.special.day = d;
               this.special.hour = h;
               this.special.min = m;
               this.special.sec = s;
           }
       },
       openCart() {
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
                   })
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
                           return ;
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
                   })
               }
               this.$router.push({
                   name: '购物车'
               })
           }).catch((res)=>{
               return this.$router.push({name: '账户登录'});
           })
       },
       addFriend(){
            let kefuName = "茶帮通客服";
            if(this.detailData.productInfo.orgId){
                kefuName = this.detailData.orgShopCenterVo.shopName;
            }
           this.$http.get(`/erp/layim/addFriend/${store.state.member.member.id}`).then(res=>{
               let friendId = res.data;
               layui.config({
                    version: true,
                    base: '/static/mods/'
                }).use(['mobile','socket','req'], function(mobile,socket,req){
                    var layim = mobile.layim,
                        layer = mobile.layer;
                    var $ =layui.jquery;
                    var selfFlag = false; 
                    //基础配置
                    layim.config({
                        init: {
                        //设置我的基础信息
                        mine: {
                            "username": store.state.member.member.nickName //我的昵称
                            ,"id": store.state.member.member.id //我的ID
                            ,"avatar": "http://tp4.sinaimg.cn/1345566427/180/5730976522/0" //我的头像
                        }
                        //好友列表数据
                        ,friend: [] //见下文：init数据格式
                        }
                    });
                    //创建一个会话
                    layim.chat({
                        id: friendId
                        ,name: kefuName
                        ,type: 'friend' //friend、group等字符，如果是group，则创建的是群聊
                        ,avatar: 'http://tp1.sinaimg.cn/1571889140/180/40030060651/1'
                    });
                    socket.config({
                        log:true,
                        // token:'/erp/layim/getToKenById?id=204736',
                        token:'/erp/layim/token',
                        server:'ws://192.168.7.212:8888'
                    });
    
                    socket.on('open',function (e) {
                        console.log("监听到事件：open");
                    });
                    socket.on('close',function (e) {
                        console.log("监听到事件：close");
                    });
                    socket.on('error',function (e) {
                        console.log("监听到事件：error");
                    });
                    socket.on('msg',function (e) {
                        var msg = JSON.parse(e.data);
                        console.log(msg);
                        var handleChat = function (msg) {
                            if (selfFlag) {
                                selfFlag = false;
                                return;
                            }
                            layim.getMessage(msg);
                        }
                        var handleStatus=function (msg) {
                            var status ='';
                            if(typeof msg.count !== 'undefined'){
                                status = msg.count+'人在线';
                            }else{
                                status = msg.online?'在线':'离线';
                            }
                            layim.setChatStatus('<span style="color:#FF5722;">'+status+'</span>');
                        }
                        if (msg.mtype) {
                            switch (msg.mtype) {
                                case -1:
                                    return console.log(msg.msg);
                                case socket.mtype.chatFriend:
                                case socket.mtype.chatGroup:
                                    handleChat(msg);
                                    break;
                                case socket.mtype.checkIsOnline:
                                case socket.mtype.checkOnlineCount:
                                    handleStatus(msg);
                                    break;
                                case socket.mtype.serverNotice:
                                    layim.msgbox(msg.count);
                                    break;
                                case socket.mtype.addFriendNotice:
                                    layim.addList({
                                        type:msg.type,
                                        avatar:msg.avatar,
                                        username:msg.username,
                                        groupid:msg.groupid,
                                        sign:msg.sign,
                                        id:msg.id
                                    });
                                    msg.mtype=socket.mtype.chatFriend;
                                    msg.content="我们已经是好友啦，一起来聊天吧！";
                                    layim.getMessage(msg);
                                    break;
                                case socket.mtype.onofflineNotice:
                                    layim.setFriendStatus(msg.id,msg.status);
                                    break;
                            }
                        }
                    });
                    // console.log(socket.mtype);
                    //监听在线状态的切换事件
                    layim.on('online', function(data){
                        //console.log(data);
                    });
                    //监听签名修改
                    layim.on('sign', function(value){
                        //console.log(value);
                    });
                    //监听自定义工具栏点击，以添加代码为例
                    layim.on('tool(code)', function(insert){
                        layer.prompt({
                            title: '插入代码'
                            ,formType: 2
                            ,shade: 0
                        }, function(text, index){
                            layer.close(index);
                            insert('[pre class=layui-code]' + text + '[/pre]'); //将内容插入到编辑器
                        });
                    });
                    //监听layim建立就绪
                    layim.on('ready', function(){
                        req.loading = false;
                        req.get('/layim/apply-unread',{},function (res) {
                            res.data&&layim.msgbox(res.data);
                        });
                    console.log(layim.cache().friend);
                    });
                    //监听发送消息
                    layim.on('sendMessage', function(data){
                        var To = data.to;
                        var t = data.to.type=='friend';
                        if(!t){
                            selfFlag = true;
                        }
                        socket.send({mtype:(t?socket.mtype.chatFriend:socket.mtype.chatGroup),content:data.mine.content,toid:data.to.id});
                        return;
                    });
                    //监听查看群员
                    layim.on('members', function(data){
                        //console.log(data);
                    });
                    //监听天窗口的切换
                    layim.on('chatChange', function(res){
                        var t = res.data.type=='friend';
                        socket.send({
                            mtype:t? socket.mtype.checkIsOnline:socket.mtype.checkOnlineCount,
                            id:res.data.id
                        });
                    });
                });
           });
       },
       openKfDialog() {
        //    this.showOrHide = true;
            let data = {username: store.state.member.member.id,password: store.state.member.member.id};
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            this.$http.post("/erp/account/login",ret).then(res=>{
                this.addFriend();
            });
       },
       openDialog() {
           try {
               store.dispatch('getMemberData').then(()=>{
                   let status = store.state.member.memberAccount.status;
                   if(!store.state.member.member.id){
                       return this.$messageBox({
                           title:'提示',
                           message:`您尚未登录，无法查看商家信息`,
                           showCancelButton: true,
                           cancelButtonText: '取消',
                           confirmButtonText: '去登录'
                       }).then(res => {
                           if(res === 'cancel') {
                               this.selected = null;
                               return;
                           } else {
                               this.$router.push({name: '账户登录'})
                           }
                       })
                   }
                   if(status === 'WAIT_AUDIT') {
                       return this.$messageBox({
                           title:'提示',
                           message:`您的账号审核中，无法查看商家信息~若有疑问，请联系客服400-996-3399`,
                           confirmButtonText: '我知道了'
                       }).then(res => {
                            this.selected = null;
                       });
                   }
                   if(status === 'INACTIVE' || status == 'AUDIT_NO_PASS') {
                       return this.$messageBox({
                           title:'提示',
                           message:`您的账号审核未通过，只有正式会员才可查看，若有疑问，请联系客服400-996-3399`,
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
                           message:`您的账号因违规操作而被冻结无法查看商家信息~若有疑问，请联系客服400-996-3399`,
                           confirmButtonText: '我知道了'
                       }).then(res => {
                            this.selected = null;
                       });
                   }
                   this.showOrHide = true;
               }).catch((res)=>{
                   if(!store.state.member.member.id){
                       return this.$messageBox({
                           title:'提示',
                           message:`您尚未登录，无法查看商家信息`,
                           showCancelButton: true,
                           cancelButtonText: '取消',
                           confirmButtonText: '去登录'
                       }).then(res => {
                           if(res === 'cancel') {
                               this.selected = null;
                               return;
                           } else {
                               this.$router.push({name: '账户登录'})
                           }
                       })
                   }
               })
           } catch (e) {

           }
       }
    },
    watch: {
        // 'commentList':{
        //     handler(curVal,oldVal){
        //         this.setLine();
        //     },
        //     deep:true
        // },
        // commentList(val){
        //     this.setLine();
        // },
        flag(val) {
            if(val){
                clearInterval(this.time)
            }
        },
        showOrHide(val) {
            if(!val){
                this.selected = null;
            }
        },
        'detailData.productExtInfo.isSales': {
            handler(curVal,oldVal){
                if(curVal == 1){
                    this.time = setInterval(()=>{            // 倒计时
                       if(this.flag == true){
                           clearInterval(this.time)
                       }else{
                           this.timeDown();
                       }
                   },500)
                }
            },
            deep:true
        },
        tabSelected(val) {
            this.$refs.wrapper.scrollTop = this.$refs.hel.offsetHeight;
            this.tabFixed = true;
            console.log(this.$refs.heihghj.$el.offsetHeight);
            this.$refs.tabcontent1.$el.style['padding-top'] = this.$refs.heihghj.$el.offsetHeight + 'px';
            this.$refs.tabcontent2.$el.style['padding-top'] = this.$refs.heihghj.$el.offsetHeight + 'px';
            this.$refs.tabcontent3.$el.style['padding-top'] = this.$refs.heihghj.$el.offsetHeight + 'px';
            if(!this.wxFlag){
                this.tabFixed = true;
            }else{
                this.wxFixed = true;
            }
        }
    },
    mounted () {
        // this.setLine();             // 判断超出隐藏或者显示
        this.wxFlag = this.$tool.isWx;
        let sss = document.querySelectorAll('.mint-tab-container-item');
        for(let i=0;i<sss.length;i++){
            sss[i].style['min-height'] = window.screen.height + 'px'
        }
  　},
    // 进来先判断登陆与否
    beforeRouteEnter(to, from, next) {
        if(!store.state.member.member.id) {
            store.dispatch('getMemberData').then((res) => {
                next();
    }).catch(res => {
        next();
    })
    } else {
        next();
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/less/detail.less';
</style>
