<template>
  <div style="overflow-x: hidden;">
    <!-- 评价 -->
    <div class="comment_wrapper">
        <div class="scroll-div" ></div>
        <div class="comment_title">商品评价</div>
        <div class="comment_number">
            <div class="comment_star">好评 <span>{{ prectent | toFix2 }}%</span></div>
            <!-- commentRecond -->
            <div class="comment_total">共 <span>{{ commentRecond }}</span> 条</div>
        </div>
    </div>
    <div class="mint_cell_wrapper"  >
        <template v-if="commentList.length === 0 ">
            <div class="no-comment" style="min-height: unset; padding: 0.50rem 0;">
                <!-- <img src="../../assets/images/no-comment.png" alt=""> -->
                <p>暂无评价呦~</p>
            </div>
        </template>
        <template v-else>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="true" infinite-scroll-distance="10">
            <mt-cell v-for="(item,index) in commentList" :key="index" >
                <div class="comment_head" style="padding: 0.10rem 0;">
                    <div class="comment_head_wrapper">
                        <div class="comment_head_mumber">{{ regStar(item.nickName) }}</div>
                        <div class="comment_head_mumberlevel">{{ item.levelName }}</div>
                    </div>
                    <div class="comment_head_time">{{ item.createTime }}</div>
                </div>
                <div class="comment_footer" ref="comment" :class="{on: item.onFlag}" @click="more($event)">
                    {{ item.content }}
                    <span v-if="item.replyContent"><span style="color:#c29e74;display:block;">回复：</span>{{item.replyContent}}</span>
                    <!-- <span class="bg-white"><i class="iconfont down" :class="{on:item.pullFlag!=='' && item.pullFlag}" @click="pullOrDown(item)" :key="index+'11'">&#xe619;</i></span>
                    <span class="bg-white"><i class="iconfont pull" :class="{on:item.upFlag!=='' && item.upFlag}" @click="pullOrDown(item)" :key="index+'12'">&#xe618;</i></span> -->
                    <i class="iconfont icon-single-down more"></i>
                    <i class="iconfont icon-shang more" style="display: none;"></i>
                </div>
            </mt-cell>
            <div class="goods-loading" v-if="commentList.length < commentRecond">
              <mt-spinner type="fading-circle" color="#f08200" ></mt-spinner>
              <span class="loading-text">正在努力加载中</span>
            </div>
            <div class="no-more" v-if="commentList.length === commentRecond">没有更多了呦</div>
          </div>
        </template>
    </div>
</div>
</template>

<script>
import store from 'store';
import { mapState } from 'vuex'
    export default {
        data(){
          return {
            pageNum:1,
            timeData:'',
            commentRecond:0,
            prectent:100,
            commentList:[],
            proSku:'',
            moreFlag: false,                        // 更多按钮
            upOrDwonFlag: false,
          }
        },
        created() {
          this.$store.commit('SET_TITLE','商品评论');
          this.proSku = this.$route.query.proSku;
            this.getCommentList().then((res)=>{
              this.timeData = res.data.evaluations;
              for(let item of this.timeData){
                  this.$set(item,'onFlag','');
                  this.$set(item,'pullFlag','');
                  this.$set(item,'upFlag','');
              }
              this.commentRecond = res.total_record;
              this.prectent = res.data.praiseRate == null ? 0 : res.data.praiseRate;
              this.commentList  = this.timeData;
            })
        },
        // updated里才能操作refs
        updated(){
            // console.log(this.$refs) 
            // console.log($(this.$refs.comment[0]).height());
            // console.log($(this.$refs.comment[0]).css('font-size').slice(0, -2));
            //  console.log($(item).height());
            for(let item of $(this.$refs.comment)){
                if($(item).height() >= 3 * $(item).css('font-size').slice(0, -2) * 1.5){
                    console.log($(item).height());
                    console.log(3 * $(item).css('font-size').slice(0, -2));
                    console.log($(item).height() >= Number(3 * $(item).css('font-size').slice(0, -2)))
                    $(item).addClass('on');
                    $(item).css({
                    // display: '-webkit-box',
                    // '-webkit-line-clamp': '3',
                    // overflow: 'hidden',
                    // 'word-break': 'break-all',
                    // 'text-overflow': 'ellipsis',
                    // '-webkit-box-orient': 'vertical',
                        'max-height': 65
                    })
                }
            }
        },
        methods: {
            // 点击查看完成评论
            more(e){
                // console.log($(e.target).hasClass('on'));
                if ($(e.target).hasClass('on active')) {
                    $(e.target).removeClass('active').find('.icon-single-down').stop().toggle('normal').end().find('.icon-shang').stop().toggle('normal');
                }
                else if ($(e.target).hasClass('on')) {
                    $(e.target).addClass('active').find('.icon-single-down').stop().toggle('normal').end().find('.icon-shang').stop().toggle('normal');
                }
            },
            // 获取评论列表
            getCommentList(extendId) {
                let pageSize = 10;
                let data ={
                    'eval.proExtId': this.proSku,
                    'page.pageNumber': this.pageNum,
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
            loadMore(){
              // alert(11)
              if (this.commentList.length < this.commentRecond) {
                this.pageNum++;
                this.getCommentList().then(res => {
                  let data = this.commentList.concat(res.data.evaluations);
                  this.commentList = data;
                  if (this.commentList.length === this.commentRecond) {
                    this.pageNum--;
                  }
                })
              }
            }

        }
    }
</script>

<style lang="less" >
// @import '../base/tools.less';
@import '~@/styles/base/tools.less';
.comment_wrapper{
    .position(r);
    .paddingAll(.3rem,.2rem,.31rem,.2rem);
    .flex;
    .flex-dir(row);
    .fontSize(.3rem);
    .bg(#fafafa);
    &.on{
        .position(f);
        top: 1.66rem;
        z-index: 7;
        width: 100%;
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
    }
    &.wxon{
        .position(f);
        top: .78rem;
        z-index: 7;
        width: 100%;
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
    }
    .comment_title{
        width: 1.2rem;
        .color(#333);
        .algin(l);
    }
    .comment_number{
        width: 1.2rem;
        .color(#333);
        .fontSize(.3rem);
        .algin(l);
        .flex-1;
        .flex;
        .flex-dir(row);
        .justify-content(space-between);
        .comment_star{
            margin-left: .4rem;
            .color(#666);
            span{
                .color(#f08200);
            }
        }
        .comment_total{
            .color(#999);
            span{
                .color(#333);
            }
            i{
                .iconfont;
            }
        }
    }
    .scroll-div{
        .position(a);
        .h(.88rem);
        .w(100%) ;
        top: -0.88rem;
    }
}
.mint_cell_wrapper{
    img{
        display: block;
        max-width: 100%;
    }
    .no-comment{
        img{
            width: 1.64rem;
            margin: 0 auto;
            padding: 1.5rem 0 .6rem;
        }
        .fontSize(.26rem);
        .color(#666);
        text-align: center;
        padding-bottom:1rem;
        min-height: 4rem;
    }
    .bg(#f5f5f5);
    .mint_cell_img_title{
        height: .56rem;
        width: 100%;
        padding: 0 .2rem;
        .line(.56rem);
        .bg(#fff8f0);
        .color(#cca67a);
        .fontSize(.26rem);
    }
    .mint_cell_img{
        // padding: 0 .2rem;
        img{
            max-width: 100%;
            &+ img{
                margin-top: .1rem;
            }
        }

    }
    .mint_cell_img_content{
        padding: .4rem .2rem 0;
        .line(1.5);
        .fontSize(.26rem);
        .color(#666);
        text-indent: .52rem;
        width: 100%;
    }
    &.mint_cell_img_wrapper{
        .mint-cell{
            border-top: 0 none;
            width: 100%;
            .mint-cell-wrapper{
                .padding(0);
                width: 100%;
                background-image: none;

            }
        }
    }
    .mint-cell{
        .paddingAll(.4rem,0,.4rem,0);
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        min-height: .98rem;
        margin-bottom: 0.2rem;
        .mint-cell-wrapper{
            background-image: unset;
            background-size: unset;
        }
        &:nth-child(1){
            border-top: 0 none;
        }
        &:last-child{
            border-bottom: 0 none;
        }
        .mint-cell-value{
            .flex;
            .flex-dir;
            .fontSize(.24rem);
            width: 100%;
            .comment_head{
                .flex;
                .flex-dir(row);
                width: 100%;
                .comment_head_wrapper{
                    .flex-1;
                    .flex;
                    .flex-dir(row);
                    .comment_head_mumber{
                        .color(#666);
                    }
                    .comment_head_mumberlevel{
                        .color(#f08200);
                        margin-left: .2rem;
                    }
                }
                .comment_head_time{
                    .algin(r);
                    .color(#999);
                }
            }
            .comment_footer{
                margin-top: .2rem;
                .color(#666);
                .line(1.5);
                max-height: 1.26rem;
                width: 100%;
                .fontSize(.28rem);

                // text-indent: .48rem;
                .position(r);
                /* display: -webkit-box;
                -webkit-line-clamp: 3;
                overflow: hidden;
                word-break: break-all;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical; */
                /* 更多图标 */
                &.on{
                    .more{
                        position: absolute;
                        right: -0.15rem;
                        bottom: -0.10rem;
                        display: block;
                        color: #f08200;
                    }
                }
                &.on.active{
                    /* -webkit-line-clamp: unset!important; */
                    max-height: unset!important;
                }
                .more{
                    position: absolute;
                    right: 0rem;
                    display: none;
                }
                .bg-white{
                    .position(a);
                    right: -.2rem;
                    bottom: 0;
                    display: inline-block;
                    background: url('../../assets/images/d1.png') no-repeat 100% 100%;
                    .w(1.2rem);
                    .h(.42rem);
                    .algin(r);

                }
                i{
                    .color(#666);
                    .fontSize(.3rem);
                    .line(.36rem);
                    .position(a);
                    right: .2rem;
                    .iconfont;
                    bottom: 0;
                    .algin(r);
                    z-index: 100;
                    cursor: pointer;
                    &.down{
                        display: none;
                        &.on{
                            display: block;
                        }
                    }
                    &.pull{
                        display: none;
                        &.on{
                            display: block;
                        }
                    }

                }
            }
        }

    }
}
.no-more{
  background: none;
}
.goods-loading{
    background: none;
}
</style>
