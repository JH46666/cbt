<template>
    <div class="detail">
        <div class="detail_wrapper" @scroll="docScroll" ref="wrapper">
            <div class="detail_img">
                <mt-swipe :auto="2000" :show-indicators="false" @change="handleChange">
                    <mt-swipe-item v-for="(item,index) in goodsDetail.swiperImg" :key="index">
                        <img :src="item" :key="index">
                    </mt-swipe-item>
                </mt-swipe>
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
                <mt-navbar v-model="tabSelected" :class="{on: tabFixed}">
                    <mt-tab-item id="1">详情</mt-tab-item>
                    <mt-tab-item id="2">规格</mt-tab-item>
                    <mt-tab-item id="3">评论</mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="tabSelected" :swipeable="true">
                    <mt-tab-container-item id="1">
                        <div class="detail_img_title" :class="{on: tabFixed}">图片详情</div>
                        <div class="mint_cell_wrapper mint_cell_img_wrapper">
                            <mt-cell v-for="(item,index) in goodsDetail.detailImgArray" :key="index">
                                <img :src="item" />
                            </mt-cell>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <mt-cell v-for="n in 4" :title="'测试 ' + n" />
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <div class="comment_wrapper" ref="commentTotal" :class="{on: tabFixed}">
                            <div class="comment_title">商品评价</div>
                            <div class="comment_number">
                                <div class="comment_star">好评 <span>97%</span></div>
                                <div class="comment_total">共 <span>{{ commentArray.length }}</span> 条</div>
                            </div>
                        </div>
                        <div class="mint_cell_wrapper">
                            <mt-cell v-for="(item,index) in commentArray">
                                <div class="comment_head">
                                    <div class="comment_head_wrapper">
                                        <div class="comment_head_mumber">{{ regStar(item.memberNum) }}</div>
                                        <div class="comment_head_mumberlevel">{{ item.memberLevel }}</div>
                                    </div>
                                    <div class="comment_head_time">{{ item.time }}</div>
                                </div>
                                <p class="comment_footer" ref="comment">
                                    {{ item.content }}
                                    <i class="iconfont down" @click="pullOrDown(index)">&#xe619;</i>
                                    <i class="iconfont pull" @click="pullOrDown(index)">&#xe618;</i>
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
        <mt-tabbar v-model="selected" class="cbt-footer detail_footer">
            <mt-tab-item id="客服">
                <i class="icon-rexian" slot="icon"></i>
                客服
            </mt-tab-item>
            <mt-tab-item id="购物车">
                <i class="icon-shopcar" slot="icon"></i>
                购物车
                <mt-badge type="error" size="small">99+</mt-badge>
            </mt-tab-item>
            <mt-tab-item id="加入购物车">
                <mt-button type="default">加入购物车</mt-button>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
import plusOreduce from '@/components/plusOreduce.vue'
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
            tabSelected: '3',
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
        }
    },
    methods: {
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
        setLine() {
            for(let obj of this.$refs.comment){
                if(obj.offsetHeight > 95){
                    obj.className = obj.className + ' on';
                    obj.children[0].className = obj.children[0].className + ' on';
                }
            }
        },
        pullOrDown(index) {
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
        moreComment() {
            this.commentArray = this.commentArray.concat(this.commentArray);
            this.$nextTick(()=>{
                this.setLine();
            })
        },
        docScroll() {
            let scrollTop = this.$refs.wrapper.scrollTop;
            let scrollHeight = this.$refs.wrapper.offsetHeight;
            if(scrollTop-scrollHeight > 0){
                this.tabFixed = true;
                return;
            }else{
                this.tabFixed = false;
                return;
            }
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
        this.setLine();
  　}
}
</script>

<style lang="less">
@import '~@/styles/less/detail.less';

</style>
