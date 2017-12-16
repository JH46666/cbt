<template>
    <!-- <mt-tabbar v-model="selected" class="cbt-footer">
        <mt-tab-item id="外卖">
            <i class="icon-home" slot="icon"></i>
            首页
        </mt-tab-item>
        <mt-tab-item id="订单">
            <i class="icon-fenlei" slot="icon"></i>
            分类
        </mt-tab-item>
        <mt-tab-item id="发现">
            <i class="icon-shopcar" slot="icon"></i>
            购物车
            <mt-badge type="error" size="small">99+</mt-badge>
        </mt-tab-item>
        <mt-tab-item id="我的">
            <i class="icon-wode" slot="icon"></i>
            我的
        </mt-tab-item>
    </mt-tabbar> -->
    <div class="cbt_footer">
        <router-link v-for="(item,index) in footerData" :class="{on: item.path === classIndex}" :to="item.path" :key="index">
            <i class="iconfont" :class="item.icon"></i>
            {{ item.name }}
            <mt-badge type="error" size="small" v-if="index === 2 && id">{{ cartTotal | ninenineAdd }}</mt-badge>
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
                        icon: 'icon-home',
                        name: '首页',
                        path: '/',
                    },
                    {
                        icon: 'icon-fenlei',
                        name: '分类',
                        path: '/category/',
                    },
                    {
                        icon: 'icon-shopcar',
                        name: '购物车',
                        path: '/cart/',
                    },
                    {
                        icon: 'icon-wode',
                        name: '我的',
                        path: '/center/',
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
            // this.$store.dispatch('queryCartTotal');
        }
    }
</script>

<style lang="less">
@import '~@/styles/base/tools.less';
.cbt_footer{
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
    a{
        &.on{
            .bg(#eaeaea);
            .color(@mainCol);
            i{
                .color(@mainCol);
            }
        }
        i{
            .color(#333);
            .fontSize(.4rem);
            .line(1);
        }
        padding: .1rem 0 0;
        .fontSize(.18rem);
        .color(#333);
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
