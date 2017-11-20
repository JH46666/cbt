<template>
    <!-- 您可能喜欢 -->
    <div class="may_like">
        <h4 class="tit_like"><span>您可能喜欢</span></h4>
        <div class="search_pros">
            <ul class="may_pros_list clearfix">
                <li class="may_pro_item" v-for="mayItem in mayProducts">
                    <a href="##">
                        <div class="tag_img">
                            <img :src="mayItem.tagImg">
                        </div>
                        <div class="pro_img">
                            <img :src="mayItem.proImg" />
                        </div>
                        <div class="pro_txt">
                            <h4>{{mayItem.proName}}</h4>
                            <p>{{mayItem.proDesc}}</p>
                            <p class="pro_price">￥{{toFixed(mayItem.proPrice)}}</p> 
                        </div>
                    </a>
                    <a class="cart_cir" href="javscript:void(0);"></a>
                </li>
            </ul>
            <div class="no-more">没有更多了哟~</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'mayLike',
        data(){
            return {
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
            }
           
           
        }
    }
</script>
<style lang="less">
    @import '~@/styles/base/tools.less';
    .may_like{
        .tit_like{
            .algin(c);
            .position(r);
            .h(.88rem);
            .line(.88rem);
            .bg(#fff);
            border-bottom: 1px solid #e6e6e6;
            &::before,&::after{
                content: "";
                .position(a);
                .w(2.35rem);
                .h(2px);
                top: 50%;
                margin-top: -1px;
            }
            &::before{
                left: .3rem;
                background: -webkit-linear-gradient(left,#fff 12.5%,#f2f1f1 50%,#e6e5e6 100%);
                background: -o-linear-gradient(right,#fff 12.5%,#f2f1f1 50%,#e6e5e6 100%);
                background: linear-gradient(to right, #fff 12.5%,#f2f1f1 50%,#e6e5e6 100%);
            }
            &::after{
                right: .3rem;
                background: -webkit-linear-gradient(left,#e6e5e6 6.25%,#f2f1f1 50%,#fff 87.5%);
                background: -o-linear-gradient(right,#e6e5e6 6.25%,#f2f1f1 50%,#fff 87.5%);
                background: linear-gradient(to right, #e6e5e6 6.25%,#f2f1f1 50%,#fff 87.5%);
            }
            span{
                display: inline-block;
                background: url('../assets/images/may_like.png') no-repeat;
                background-size: .22rem;
                background-position: left center;
                padding-left: .32rem;
                .fontSize(.26rem);
            }
        }
        .search_pros{
            .bg(#fff);
            .may_pros_list{
                .bg(#fff);
                li{
                    float: left;
                    width: 50%;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                    border-bottom: 1px solid #f7f7f7;
                    &:nth-of-type(odd){
                        border-right: 1px solid #f7f7f7;
                    }
                    &:nth-of-type(even){
                        border-right: 1px solid rgba(0,0,0,0);
                    }
                    a{
                        .position(r);
                    }
                }
                .may_pro_item{
                    .position(r);
                    padding: .2rem;
                    .pro_txt{
                        .algin(l);
                        .color(#999);
                        .fontSize(.24rem);
                        .position(r);
                        h4{
                            .color(#333);
                            .fontSize(.268rem);
                            .moreLine(2);
                            .h(.8rem);
                            .line(.4rem);
                            font-weight: normal;
                        }
                        p:nth-child(2){
                            .oneLine;
                            .w(3.2rem);
                            .h(.5rem);
                            .line(.5rem);
                            margin-bottom: .1rem;
                        }
                        .pro_price{
                            .color(#f08200);
                            .fontSize(.28rem);
                            .line(.5rem);
                        }
                    }
                    .tag_img{
                        .position(a);
                        top: 0;
                        left: 0;
                        max-width: .8rem;
                        max-height: .8rem;
                    }
                    .pro_img{
                        .w(2.6rem);
                        .h(2.6rem);
                        overflow: hidden;
                        margin: 0 auto .1rem;
                        img{
                            .w(100%);
                            .position(r);
                            top: 50%;
                            -webkit-transform: translateY(-50%);
                            -o-transform: translateY(-50%);
                            transform: translateY(-50%);
                        }
                    }
                    .cart_cir{
                        .position(a);
                        .w(.72rem);
                        .h(.72rem);
                        right: .2rem;
                        bottom: .12rem;
                        background: url('../assets/images/ic_cart.png') no-repeat;
                        background-size: 100%;
                    }
                }
            }
            .no-more{
                .h(.6rem);
                .line(.6rem);
                .color(#adadad);
                .algin(c);
                .fontSize(.3rem);
                border-radius: 10px;
                margin: .1rem auto;
                cursor: pointer;
            }
        }
    }
</style>