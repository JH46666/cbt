<template>
    <div class="cbt_footer">
        <router-link v-for="(item,index) in footerData" :class="{on: item.routeName === $route.name}" :to="item.path" :key="index">
            <i class="iconfont" :class="item.path === classIndex ? item.select : item.icon"></i>
            <span class="nav-name">{{ item.name }}</span>
            <mt-badge type="error" size="small" v-if="index === 3 && id" v-show="Number(cartTotal)>0">{{ cartTotal | ninenineAdd }}</mt-badge>
        </router-link>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                selected: null,
                footerData: [
                    {
                        icon: 'icon-shouyeweixuan',
                        name: '首页',
                        routeName: '首页',
                        path: '/',
                        select: 'icon-shouye1'
                    },
                    {
                        icon: 'icon-chabangtongzhuanyongfenlei_weixuan',
                        name: '分类',
                        routeName: '分类',
                        path: '/category/',
                        select: 'icon-chabangtongzhuanyongfenlei_yixuan'
                    },
                    {
                        icon: 'icon-chabangtongzhuanyong_xiaoxiweixuan',
                        name: '消息',
                        routeName: '消息',
                        path: '/message/',
                        select: 'icon-chabangtongzhuanyong_xiaoxiyixuansvg'
                    },
                    // {
                    //     icon: 'icon-chabangtongzhuanyongfenlei_gouwuche1',
                    //     name: '购物车',
                    //     routeName: '购物车',
                    //     path: '/cart/',
                    //     select: 'icon-chabangtongzhuanyongfenlei_gouwuche'
                    // },
                    {
                        icon: 'icon-chabangtongzhuanyongfenlei_geren1',
                        name: '我的',
                        routeName: '个人中心',
                        path: '/center/',
                        select: 'icon-chabangtongzhuanyongfenlei_geren'
                    }
                ],
            }
        },
        computed:{
            classIndex() {
                return this.$route.path
            },
            ...mapState({
                cartTotal: state => state.cart.cartTotal,
                id: state => state.member.member.id
            })
        },
        created() {
            // 更新购物车数量
            this.$store.dispatch('queryCartTotal');
        }
    }

    /*layui.config({
        version: true
        ,base: '/static/mods/'
    }).extend({
        socket: 'socket',
        //req:'req',
        //fly: 'index'
    });*/
</script>

<style lang="less">
@import '~@/styles/base/tools.less';
.cbt_footer{
    .bg(#fff);
    .flex;
    .flex-dir(row);
    .position(f);
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    height: .98rem;
    border-top: 1px solid #e5e5e5;
    .line(1);
    .nav-name{
        .position(r);
        top: -.05rem;
    }
    a{
        &.on{
            .color(@mainCol);
            i{
                .color(@mainCol);
            }
        }
        i{
            .color(#424140);
            .fontSize(.38rem);
            .line(1);
        }
        padding: .1rem 0 0;
        .fontSize(.22rem);
        .color(#666);
        .position(r);
        .flex-1;
        .flex;
        .flex-dir;
        .align-items;
        .justify-content(space-around);
        .mint-badge {
            position: absolute;
            border-radius: 20px;
            line-height: 1.2;
            top: .05rem;
            left: 50%;
            margin-left: .05rem;
        }
    }
}
</style>
