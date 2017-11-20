<template>
    <div class="detail">
        <div class="dialog" :class="{'on': showOrHide}" @touchmove="closeDialog">
            <div class="dialog_wrapper_1"  v-if="!isThird">
                <div class="dialog_title">
                    <i class="iconfont icon-kefu1"></i>
                    <span>茶帮通客服</span>
                </div>
                <div class="dialog_content">
                    <div class="item_1">
                        客服热线：<span>400-996-3399<a href="tel:400-996-3399"></a></span>
                    </div>
                    <div class="item_2">
                        服务时间：<span>08:40 - 22:30（周一至周日</span>）
                    </div>
                </div>
            </div>
            <div class="dialog_wrapper_2" v-if="isThird">
                <div class="dialog_title">
                    <i class="iconfont icon-dianpu"></i>
                    <span>2425364646</span>
                </div>
                <div class="dialog_content">
                    <div class="item_1">
                        <i class="iconfont">&#xe670;</i>
                        <span>234242422</span>
                    </div>
                    <div class="item_2">
                        <i class="iconfont">&#xe66f;</i>
                        <span>11111111<a href="tel:111"></a></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail_wrapper" @scroll="docScroll" ref="wrapper">
            <div class="goIndex" v-if="!(tabFixed || wxFixed)">
                <span>去首页</span>
                <i class="iconfont">&#xe61b;</i>
            </div>
            <div class="top" :class="{on: tabFixed || wxFixed}" @click="topMethod">
                <i class="iconfont">&#xe618;</i>
            </div>
            <div class="detail_img">
                <mt-swipe :auto="2000" :show-indicators="false" @change="handleChange">
                    <mt-swipe-item v-for="(item,index) in goodsDetail.swiperImg" :key="index">
                        <img :src="item" :key="index">
                    </mt-swipe-item>
                </mt-swipe>
                <div class="detail_special">
                    <div class="detail_special_wrapper">
                        <div class="detail_special_price">
                            <span>特价</span>
                            <span>￥</span>
                            <span>362.00</span>
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
                    <span>{{ imgIndex }}</span>/{{ goodsDetail.swiperImg.length }}
                </div>
            </div>
            <div class="detail_describe">
                <div class="detail_describe_wrapper">
                    <div class="detail_describe_text">
                        <p class="detail_text">{{ goodsDetail.goodsText }}</p>
                        <p class="detail_now_price">￥{{ goodsDetail.goodsPrice.toFixed(2) }}</p>
                        <p class="detail_suggest_price">建议零售价：￥{{ goodsDetail.suggestPrice.toFixed(2) }}</p>
                    </div>
                    <div class="detail_describe_count">
                        <label class="label_text">采购量</label>
                        <plusOreduce :maxNum="goodsDetail.maxGoodsNum" @countNum="goodsCounts"></plusOreduce>
                    </div>
                </div>
            </div>
            <div class="detail_tab" ref="tab">
                <mt-navbar v-model="tabSelected" :class="{'on': tabFixed , 'wxon': wxFixed}">
                    <i class="iconfont fixIndex" :class="{'on': tabFixed || wxFixed }" v-if="tabFixed || wxFixed">&#xe61b;</i>
                    <mt-tab-item id="1">详情</mt-tab-item>
                    <mt-tab-item id="2">规格</mt-tab-item>
                    <mt-tab-item id="3">评论</mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="tabSelected" :swipeable="true">
                    <mt-tab-container-item id="1">
                        <div class="detail_img_title" :class="{'on': tabFixed,'wxon': wxFixed}">图片详情</div>
                        <div class="mint_cell_wrapper mint_cell_img_wrapper">
                            <mt-cell v-for="(item,index) in goodsDetail.detailImgArray" :key="index">
                                <img :src="item" />
                            </mt-cell>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="reguler_wrapper">
                            <div class="reguler_item">
                                <div>推荐理由</div>
                                <div>戎羯逼我兮为室家，将我行兮向天涯。云山万重兮归路遐，疾风千里兮扬尘沙。人多暴猛兮如虺蛇，控弦被甲兮为骄奢。两拍张弦兮弦欲绝，志摧心折兮自悲嗟。</div>
                            </div>
                            <div class="reguler_item">
                                <div>香气</div>
                                <div class="x_star">
                                    <span class="x_grey on">偏淡</span>
                                    <span class="x_grey on"">一般</span>
                                    <span class="x_grey">香</span>
                                    <span class="x_grey">高香</span>
                                    <span class="x_grey">极香</span>
                                </div>
                            </div>
                            <div class="reguler_item">
                                <div>滋味</div>
                                <div class="z_star">
                                    <span class="z_grey on">偏淡</span>
                                    <span class="z_grey on">一般</span>
                                    <span class="z_grey on">浓</span>
                                    <span class="z_grey">很浓</span>
                                    <span class="z_grey">极浓</span>
                                </div>
                            </div>
                            <div class="reguler_item">
                                <div>产地</div>
                                <div>想要哪里的</div>
                            </div>
                            <div class="reguler_item">
                                <div>工艺</div>
                                <div>想要哪里的</div>
                            </div>

                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <div class="comment_wrapper" ref="commentTotal" :class="{'on': tabFixed,'wxon': wxFixed}">
                            <div class="comment_title">商品评价</div>
                            <div class="comment_number">
                                <div class="comment_star">好评 <span>97%</span></div>
                                <div class="comment_total">共 <span>{{ commentArray.length }}</span> 条</div>
                            </div>
                        </div>
                        <div class="mint_cell_wrapper">
                            <mt-cell v-for="(item,index) in commentArray" :key="index">
                                <div class="comment_head">
                                    <div class="comment_head_wrapper">
                                        <div class="comment_head_mumber">{{ regStar(item.memberNum) }}</div>
                                        <div class="comment_head_mumberlevel">{{ item.memberLevel }}</div>
                                    </div>
                                    <div class="comment_head_time">{{ item.time }}</div>
                                </div>
                                <p class="comment_footer" ref="comment">
                                    {{ item.content }}
                                    <i class="iconfont down" @click="pullOrDown(index)" :key="index+'11'">&#xe619;</i>
                                    <i class="iconfont pull" @click="pullOrDown(index)" :key="index+'12'">&#xe618;</i>
                                </p>
                            </mt-cell>
                        </div>
                        <div class="comment_more_btn" @click="moreComment" v-if="commentArray.length > 2">
                            查看更多评论<i class="iconfont">&#xe619;</i>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <mt-tabbar v-model="selected" class="cbt-footer detail_footer" :isZiYing="isThird" ref="footers">
            <mt-tab-item id="1" @click.native="openDialog" v-if="!isThird">
                <i class="icon-kefu1" slot="icon"></i>
                客服
            </mt-tab-item>
            <mt-tab-item id="1" @click.native="openDialog" v-if="isThird">
                <i class="icon-dianpu" slot="icon"></i>
                店铺
            </mt-tab-item>
            <mt-tab-item id="2">
                <i class="icon-shopcar" slot="icon"></i>
                购物车
                <mt-badge type="error" size="small">99+</mt-badge>
            </mt-tab-item>
            <mt-tab-item id="3">
                <mt-button type="default">加入购物车</mt-button>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
import plusOreduce from '@/components/plusOreduce.vue'
import { Toast } from 'mint-ui'
export default {
    components: {
        plusOreduce
    },
    data() {
        return {
            selected: null,
            imgIndex: 1,
            goodsCount: 0,
            goodsDetail: {
                swiperImg: ['../src_wap/assets/detail.png','../src_wap/assets/detail.png','../src_wap/assets/detail.png'],
                goodsText: '安溪西坪 清香型（消酸）铁观音 303-5072015秋茶外形稍肥状较结安溪西坪 清香型（消酸）铁观音 303-5072015秋茶外形稍肥状较结',
                goodsPrice: 362,
                suggestPrice: 800,
                maxGoodsNum: 100,
                detailImgArray: ['../src_wap/assets/detail_1.png','../src_wap/assets/detail_2.png','../src_wap/assets/detail_3.png']
            },
            tabSelected: '2',
            commentArray: [
                {
                    memberNum: '17605062109',
                    memberLevel: '10级营销商',
                    time: '2017-10-22',
                    content: '适意行，安心坐，渴时饮饥时餐醉时歌，困来时就向莎茵卧。日月长，天地阔，闲快活！旧酒投，新醅泼，老瓦盆边笑呵呵，共山僧野叟闲吟和。他出一对鸡，我出一个鹅，闲快活！意马收，心猿锁，跳出红尘恶风波，槐阴午梦谁惊破？离了利名场，钻入安乐窝，闲快活！南亩耕，东山卧，世态人情经历多，闲将往事思量过。贤的是他，愚的是我，争甚么？'
                },
                {
                    memberNum: '17605',
                    memberLevel: '1000级营销商',
                    time: '2017-10-22',
                    content: '戎羯逼我兮为室家，将我行兮向天涯。云山万重兮归路遐，疾风千里兮扬尘沙。人多暴猛兮如虺蛇，控弦被甲兮为骄奢。两拍张弦兮弦欲绝，志摧心折兮自悲嗟。'
                },
                {
                    memberNum: 'menmer12',
                    memberLevel: '100000级营销商',
                    time: '2017-10-22',
                    content: '适意行，安心坐，渴时饮饥时餐醉时歌，困来时就向莎茵卧。日月长，天地阔，闲快活！旧酒投，新醅泼，老瓦盆边笑呵呵，共山僧野叟闲吟和。他出一对鸡，我出一个鹅，闲快活！意马收，心猿锁，跳出红尘恶风波，槐阴午梦谁惊破？离了利名场，钻入安乐窝，闲快活！南亩耕，东山卧，世态人情经历多，闲将往事思量过。贤的是他，愚的是我，争甚么？'
                }
            ],
            tabTop: 0,
            tabFixed: false,
            special: {
                day: '',
                hour: '',
                min: '',
                sec: ''
            },
            endTime: '2017/12/01 00:00:00',
            flag : false,
            wxFlag: false,
            wxFixed: false,
            showOrHide: false,
            isThird: false,
            headHeight: 44,
        }
    },
    methods: {
        closeDialog() {
            this.selected = null;
            this.showOrHide = false;
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
        moreComment() {             // 加载更多请求数据
            this.commentArray = this.commentArray.concat(this.commentArray);
            this.$nextTick(()=>{
                this.setLine();
            })
        },
        docScroll() {               // 判断页面滚动
            let scrollTop = this.$refs.wrapper.scrollTop;
            let scrollHeight = this.$refs.wrapper.offsetHeight;
            console.log(scrollTop - scrollHeight);
            if(scrollTop - scrollHeight > 0){
                if(!this.wxFlag){
                    this.tabFixed = true;
                }else{
                    this.wxFixed = true;
                }
                return;
            }else{
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
           const endTime = new Date(this.endTime)
           const nowTime = new Date();
           let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
           let d = parseInt(leftTime/(24*60*60))
           let h = this.formate(parseInt(leftTime/(60*60)%24))
           let m = this.formate(parseInt(leftTime/60%60))
           let s = this.formate(parseInt(leftTime%60))
           if(leftTime <= 0){
               this.flag = true
               Toast({
                   message: '倒计时已经结束！',
                   position: 'center',
                   duration: 2000
               });
           }
           this.special.day = d;
           this.special.hour = d;
           this.special.min = m;
           this.special.sec = s;
       },
       openDialog() {
           this.showOrHide = true;
       }
    },
    created() {

    },
    watch: {
        commentArray() {
            this.setLine();
        }
    },
    mounted () {
        this.setLine();             // 判断超出隐藏或者显示
        let time = setInterval(()=>{            // 倒计时
           if(this.flag == true){
               clearInterval(time)
           }
           this.timeDown()
       },500)
       this.wxFlag = this.$tool.isWx;
       this.headHeight = document.querySelector('.cbt-header').offsetHeight;
  　}
}
</script>

<style lang="less">
@import '~@/styles/less/detail.less';
</style>
