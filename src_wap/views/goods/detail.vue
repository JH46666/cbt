<template>
    <div class="detail">
        <mt-popup v-model="showOrHide" position="bottom">
            <div class="dialog_wrapper_2" v-if="detailData.productInfo.businessType == 'ORG_SALES'">
                <div class="dialog_title">
                    <i class="iconfont icon-dianpu"></i>
                    <span>什么店铺名称呢</span>
                </div>
                <div class="dialog_content">
                    <div class="item_1">
                        <span>类型</span>
                        <span>
                            <span>合作社</span>
                        </span>
                    </div>
                    <div class="item_1">
                        <span>信誉</span>
                        <span>
                            <i class="star blur" v-for="n in 5" :key="n"></i>
                        </span>
                    </div>
                    <div class="item_1">
                        <span>地址</span>
                        <span>福建省厦门思明区会展南路7号109醉品集团福建省厦门思明区会展南路7号109醉品集团</span>
                    </div>
                    <div class="item_1">
                        <span>电话</span>
                        <a href="tel://17656565656">17656565656</a>
                    </div>
                </div>
            </div>
            <div class="dialog_wrapper_1"  v-else>
                <div class="dialog_title">
                    <i class="iconfont icon-kefu1"></i>
                    <span>茶帮通客服</span>
                </div>
                <div class="dialog_content">
                    <div class="item_1">
                        客服热线：<span><a href="tel://400-996-3399">400-996-3399</a></span>
                    </div>
                    <div class="item_2">
                        服务时间：<span>08:40 - 22:30（周一至周日</span>）
                    </div>
                </div>
            </div>
        </mt-popup>
        <div class="detail_wrapper" @scroll="docScroll" ref="wrapper">
            <div class="goIndex" v-if="!(tabFixed || wxFixed)" @click="$router.push({name: '首页'})">
                <span>回首页</span>
                <i class="iconfont">&#xe61b;</i>
            </div>
            <div class="top" :class="{on: tabFixed || wxFixed}" @click="topMethod">
                <i class="iconfont">&#xe618;</i>
            </div>
            <div class="detail_img">
                <mt-swipe :auto="2000" :show-indicators="false" @change="handleChange">
                    <mt-swipe-item v-for="(item,index) in detailData.productImgList" :key="index">
                        <img :src="item.imgUrl" :key="index">
                    </mt-swipe-item>
                </mt-swipe>
                <!--   -->
                <div class="detail_special" v-if="detailData.productExtInfo.isSales && detailData.productExtInfo.state === 'ON_SHELF'">
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
                        <p class="detail_text">{{ detailData.productInfo.proName }}</p>
                        <template v-if="detailData.productPrice.length != 0 && detailData.productExtInfo.state === 'ON_SHELF'">
                            <p class="detail_now_price" v-if="!detailData.productExtInfo.isSales">￥{{ detailData.productPrice[0].price | toFix2 }}</p>
                            <p class="detail_suggest_price">建议零售价：￥{{ detailData.productPrice[1].price | toFix2 }}</p>
                        </template>
                    </div>
                    <template  v-if="detailData.productExtInfo.isSales && detailData.productExtInfo.state === 'ON_SHELF'">
                        <div class="detail_active">
                            <label>促销</label>
                            <div class="detail_active_list">
                                <div class="detail_active_item">
                                    <span>直降</span>
                                    <p>已优惠￥{{  (detailData.productPrice[0].price-detailData.productExtInfo.salesPrice)  | toFix2 }}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="detail_describe_count">
                        <label class="label_text">采购量</label>
                        <plusOreduce :maxNum="detailData.productExtInfo.stockNum" @countNum="goodsCounts"></plusOreduce>
                    </div>
                </div>
            </div>
            <div class="detail_tab" ref="tab">
                <mt-navbar v-model="tabSelected" :class="{'on': tabFixed , 'wxon': wxFixed}">
                    <i class="iconfont fixIndex" :class="{'on': tabFixed || wxFixed }" v-if="tabFixed || wxFixed" @click="$router.push({name: '首页'})">&#xe61b;</i>
                    <mt-tab-item id="1">详情</mt-tab-item>
                    <mt-tab-item id="2">规格</mt-tab-item>
                    <mt-tab-item id="3">评论</mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="tabSelected" :swipeable="true">
                    <mt-tab-container-item id="1">
                        <!-- <div class="detail_img_title" :class="{'on': tabFixed,'wxon': wxFixed}" ref="imgHeight">图片详情</div> -->
                        <div class="mint_cell_wrapper mint_cell_img_wrapper">
                            <mt-cell v-for="(item,index) in imgDetail" :key="index">
                                <div class="mint_cell_img_title">{{ item.title }}</div>
                                <div class="mint_cell_img">
                                    <img :src="ur" v-for="(ur,k) in item.imgUrl" :key="k" />
                                </div>
                                <p class="mint_cell_img_content">{{ item.content }}</p>
                            </mt-cell>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="reguler_wrapper">
                            <div class="reguler_item">
                                <div>商品编号</div>
                                <div>{{ detailData.productInfo.proSku }}</div>
                            </div>
                            <template v-for="(item,index) in attrImgDetail.propValList">
                                <div class="reguler_item" v-if="item.propName === '香气'">
                                    <div>{{ item.propName }}</div>
                                    <div class="x_star">
                                        <span class="x_grey" :class="{on: item.propertiesVal.propVal === '偏淡' || item.propertiesVal.propVal === '一般' || item.propertiesVal.propVal === '香' || item.propertiesVal.propVal === '高香' || item.propertiesVal.propVal === '极香'}">偏淡</span>
                                        <span class="x_grey" :class="{on: item.propertiesVal.propVal === '一般' || item.propertiesVal.propVal === '香' || item.propertiesVal.propVal === '高香' || item.propertiesVal.propVal === '极香'}">一般</span>
                                        <span class="x_grey" :class="{on: item.propertiesVal.propVal === '香' || item.propertiesVal.propVal === '高香' || item.propertiesVal.propVal === '极香'}">香</span>
                                        <span class="x_grey" :class="{on: item.propertiesVal.propVal === '高香' || item.propertiesVal.propVal === '极香'}">高香</span>
                                        <span class="x_grey" :class="{on: item.propertiesVal.propVal === '极香'}">极香</span>
                                    </div>
                                </div>
                                <div class="reguler_item" v-if="item.propName === '滋味'">
                                    <div>{{ item.propName }}</div>
                                    <div class="z_star">
                                        <span class="z_grey" :class="{on: item.propertiesVal.propVal === '偏淡' || item.propertiesVal.propVal === '一般' || item.propertiesVal.propVal === '浓' || item.propertiesVal.propVal === '很浓' || item.propertiesVal.propVal === '极浓'}">偏淡</span>
                                        <span class="z_grey" :class="{on: item.propertiesVal.propVal === '一般' || item.propertiesVal.propVal === '浓' || item.propertiesVal.propVal === '很浓' || item.propertiesVal.propVal === '极浓'}">一般</span>
                                        <span class="z_grey" :class="{on: item.propertiesVal.propVal === '浓' || item.propertiesVal.propVal === '很浓' || item.propertiesVal.propVal === '极浓'}">浓</span>
                                        <span class="z_grey" :class="{on: item.propertiesVal.propVal === '很浓' || item.propertiesVal.propVal === '极浓'}">很浓</span>
                                        <span class="z_grey" :class="{on: item.propertiesVal.propVal === '极浓'}">极浓</span>
                                    </div>
                                </div>
                                <div class="reguler_item"v-if="item.propName != '香气' && item.propName != '滋味'" >
                                    <div>{{ item.propName }}</div>
                                    <div>{{ item.propertiesVal.propVal }}</div>
                                </div>
                            </template>
                            <div class="reguler_item" v-if="detailData.productExtInfo.reason!=''">
                                <div>推荐理由</div>
                                <div>{{ detailData.productExtInfo.reason }}</div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <div class="comment_wrapper" ref="commentTotal" :class="{'on': tabFixed,'wxon': wxFixed}">
                            <div class="comment_title">商品评价</div>
                            <div class="comment_number">
                                <div class="comment_star">好评 <span>{{ prectent }}%</span></div>
                                <!-- commentRecond -->
                                <div class="comment_total">共 <span>{{ commentRecond }}</span> 条</div>
                            </div>
                        </div>
                        <div class="mint_cell_wrapper">
                            <template v-if="commentList.length > 0">
                                <mt-cell v-for="(item,index) in commentList" :key="index">
                                    <div class="comment_head">
                                        <div class="comment_head_wrapper">
                                            <div class="comment_head_mumber">{{ regStar(item.nickName) }}</div>
                                            <div class="comment_head_mumberlevel">{{ item.level }}级营销商</div>
                                        </div>
                                        <div class="comment_head_time">{{ item.createTime }}</div>
                                    </div>
                                    <p class="comment_footer" ref="comment">
                                        {{ item.content }}
                                        <i class="iconfont down" @click="pullOrDown(index)" :key="index+'11'">&#xe619;</i>
                                        <i class="iconfont pull" @click="pullOrDown(index)" :key="index+'12'">&#xe618;</i>
                                    </p>
                                </mt-cell>
                            </template>
                        </div>
                        <template v-if="commentRecond > 3">
                            <div class="comment_more_btn" @click="getMoreComment" v-if="commentRecond > commentList.length">
                                查看更多评论<i class="iconfont">&#xe619;</i>
                            </div>
                        </template>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <mt-tabbar v-model="selected" class="cbt-footer detail_footer" :isZiYing="isThird" ref="footers">
            <mt-tab-item id="1" @click.native="openDialog" v-if="detailData.productInfo.businessType != 'ORG_SALES'">
                <i class="icon-kefu1" slot="icon"></i>
                客服
            </mt-tab-item>
            <mt-tab-item id="1" @click.native="openDialog" v-if="detailData.productInfo.businessType == 'ORG_SALES'">
                <i class="icon-dianpu" slot="icon"></i>
                店铺
            </mt-tab-item>
            <mt-tab-item id="2">
                <i class="icon-shopcar" slot="icon"></i>
                购物车
                <mt-badge type="error" size="small">99+</mt-badge>
            </mt-tab-item>
            <mt-tab-item id="3">
                <mt-button type="default" disabled v-if="detailData.productExtInfostate === 'OFF_SHELF'">已下架</mt-button>
                <mt-button type="default" v-else-if="detailData.productExtInfo.isSoldOut == 1" @click.native="addCartInfo">加入购物车</mt-button>
                <mt-button type="default" disabled v-else>缺货</mt-button>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
import plusOreduce from '@/components/plusOreduce.vue'
import { Toast,Indicator } from 'mint-ui'
import store from 'store';
export default {
    components: {
        plusOreduce
    },
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
        }
    },
    created() {
        this.proSku = this.$route.query.proSku;
        this.getDetail().then((res) =>{
            this.detailData = res.data;
            this.getAttrOrImg().then((res) => {
                this.attrImgDetail = res.data;
                this.imgDetail =  JSON.parse(res.data.content)
                this.getCommentList(this.detailData.productExtInfo.id).then((res) => {
                    this.commentList = res.data.evaluations;
                    this.commentRecond = res.total_record;
                    this.prectent = res.data.praiseRate == null ? 0 : res.data.praiseRate;
                })
            })
        })
    },
    methods: {
        addCartInfo() {
            this.$store.dispatch('addCart',{proId:this.detailData.productExtInfo.proId,buyNum:this.goodsCount}).then(res=>{
                console.log(res);

            },res=>{});
        },
        getMoreComment() {
            this.page++;
            this.getCommentList(this.detailData.productExtInfo.id).then((res) => {
                this.commentList = this.commentList.concat(res.data.evaluations);
                this.$nextTick(()=>{
                    this.setLine();
                })
            })
        },
        getCommentList(extendId) {
            let pageSize = 10;
            if(this.page == 1){
                pageSize = 3;
            }else if(this.page == 2){
                pageSize = 7;
            }else{
                pageSize = 10;
            }
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
        goodsCounts(val) {             // 购买数量
            this.goodsCount = val;
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
            for(let obj of this.$refs.comment){
                if(obj.offsetHeight > 95){
                    obj.className = obj.className + ' on';
                    obj.children[0].className = obj.children[0].className + ' on';
                }
            }
        },
        pullOrDown(index) {        // 显示与隐藏（超出）
            if(this.$refs.comment[index].className.indexOf(' on') != -1){
                this.$refs.comment[index].className = 'comment_footer';
            }else{
                this.$refs.comment[index].className = 'comment_footer on';
            }
            for(let i=0; i<this.$refs.comment[index].children.length; i++){
                if(this.$refs.comment[index].children[i].className.indexOf(' on') != -1){
                    if(i == 0){
                        this.$refs.comment[index].children[0].className = 'iconfont down'
                        this.$refs.comment[index].children[1].className = 'iconfont pull on';
                        return;
                    }else{
                        this.$refs.comment[index].children[0].className = 'iconfont down on'
                        this.$refs.comment[index].children[1].className = 'iconfont pull';
                        return;
                    }
                }
            }
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
       openDialog() {
           this.showOrHide = true;
       }
    },
    watch: {
        'commentList':{
            handler(curVal,oldVal){
                this.setLine();
            },
            deep:true
        },
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
    },
    mounted () {
        // this.setLine();             // 判断超出隐藏或者显示
        this.wxFlag = this.$tool.isWx;
  　}
}
</script>

<style lang="less">
@import '~@/styles/less/detail.less';
</style>
