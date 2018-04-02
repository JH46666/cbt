<template>
    <!-- 您可能喜欢 -->
    <div class="may_like" v-if="mayProducts.length > 0">
        <h4 class="tit_like"><span>猜你喜欢</span></h4>
        <div class="search_pros">
            <ul class="may_pros_list clearfix">
                <li class="may_pro_item" v-for="mayItem in mayProducts" :key="mayItem.proSku">
                    <router-link :to="'/detail?proSku=' + mayItem.proSku">
                        <goods-img imgWidth="2.6rem" :imgUrl="mayItem.proImg" :tagUrl="mayItem.tagImage"></goods-img>
                        <div class="pro_txt">
                            <h4>{{mayItem.proTitle}}</h4>
                            <p>{{mayItem.subTitle}}</p>
                            <p class="pro_price">￥{{   mayItem.activityPrice || mayItem.proPrice | toFix2}}</p>
                        </div>
                    </router-link>
                    <!-- <span class="cart_cir" @click.self="addCart(mayItem)"></span> -->
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
                mayProducts:[]
            }
        },
        methods:{
            // 获取数据
            getData() {
                this.$api.post('/oteao/productInterestingRecord/query',{
                    'productInterestingRecord.sysId': 1,
                    'productInterestingRecord.device': 'WAP',
                    'pageSize': 10
                },res => {
                    this.mayProducts = res.data || []
                },res => {
                    this.mayProducts = []
                })
            },
            // 加入购物车
            addCart(item) {
                this.$store.dispatch('addCart',{proId: item.proId,buyNum:1}).then(res => {
                    this.$emit('addCart');
                })
            }

        },
        created(){
            this.getData();
        }
    }
</script>
<style lang="less">
    @import '~@/styles/base/tools.less';
    .may_like{
        margin-top: 0.2rem;
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
                background: url('../assets/images/may_like.png') no-repeat left center,url('../assets/images/may_like.png') no-repeat right center;
                background-size: .22rem;
                // background-position: left center;
                padding: 0 .32rem;
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
                            .fontSize(.28rem);
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
                    .cbt-goods-img{
                        margin: 0 auto .2rem;
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
                .h(.8rem);
                .line(.8rem);
                .bg(#f5f5f5);
                .color(#adadad);
                .algin(c);
                .fontSize(.28rem);
                margin: .1rem auto;
                cursor: pointer;
            }
        }
    }
</style>
