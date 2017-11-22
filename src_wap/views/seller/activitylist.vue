<template lang="html">
    <div class="list">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">未开始</mt-tab-item>
            <mt-tab-item id="3">进行中</mt-tab-item>
            <mt-tab-item id="4">已结束</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1" class="on">
                <mt-cell v-for="(item,index) in activeData" :key="index">
                    <div class="active_head">
                        <div class="head_left">
                            <img src="../../assets/images/%.png" />
                            <span>{{ item.name }}</span>
                        </div>
                        <div class="head_right" :class="{on: item.status != '已结束'}">{{ item.status }}</div>
                    </div>
                    <div class="active_section">
                        <div class="section_left">
                            <div class="section_img" v-for="(img,num) in item.proImg" :key="num">
                                <img :src="img" />
                            </div>
                        </div>
                        <div class="section_right">
                            <i class="iconfont">&#xe744;</i>
                            共{{ item.proImg.length }}件
                        </div>
                    </div>
                    <div class="active_foot">
                        {{ item.date }}
                        <i class="iconfont">&#xe60d;</i>
                    </div>
                </mt-cell>
                <div class="add_activily">
                    <div class="plus_icon">+</div>
                    添加活动
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :title="'测试 ' + n" :key="n"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="3" class="on">
                <mt-cell v-for="n in 6" :title="'选项 ' + n" :key="n"></mt-cell>
                <div class="add_activily">
                    <div class="plus_icon">+</div>
                    添加活动
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <mt-cell v-for="n in 6" :title="'选项 ' + n" :key="n"></mt-cell>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: '1',
            activeData: [
                {
                    name: '坐过路过不要错过，全场两块',
                    status: '进行中',
                    proImg: [
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                    ],
                    code: 1,
                    date: '2017-11-10 10:00:00 至 2017-11-11 00:00:00'
                },
                {
                    name: '坐过路过不要错过，全场两块',
                    status: '已结束',
                    proImg: [
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                    ],
                    code: 1,
                    date: '2017-11-10 10:00:00 至 2017-11-11 00:00:00'
                },
                {
                    name: '坐过路过不要错过，全场两块',
                    status: '未开始',
                    proImg: [
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                    ],
                    code: 1,
                    date: '2017-11-10 10:00:00 至 2017-11-11 00:00:00'
                },
                {
                    name: '坐过路过不要错过，全场两块',
                    status: '未开始',
                    proImg: [
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                        '../src_wap/assets/list_img.png',
                    ],
                    code: 1,
                    date: '2017-11-10 10:00:00 至 2017-11-11 00:00:00'
                }
            ]
        }
    },
    head: {
        title: {
          inner: '活动列表'
        }
    },
}
</script>

<style lang="less">
@import '~@/styles/base/tools.less';
.list{
    .ipScroll;
    .fontSize(.28rem);
    .color(#666);
    .line(1);
    .paddingT(.94rem);
    .mint-navbar{
        .position(f);
        width: 100%;
        left: 0;
        top: 0;
        z-index: 6;
        &.on{
            top: .88rem;
        }
        .mint-tab-item {
            padding: .33rem 0;
            .fontSize(.28rem);
            .color(#666);
            &.is-selected{
                border-bottom: 0 none;
                .color(@mainCol);
                margin-bottom: -3px;
            }
            .mint-tab-item-label{
                .fontSize(.28rem);
            }
        }
    }
    .mint-tab-container{
        .mint-tab-container-item{
            &.on{
                .paddingB(.98rem);
            }
            .add_activily{
                .position(f);
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 6;
                // width: 100%;
                height: .98rem;
                .flex;
                .flex-dir(row);
                .justify-content;
                .align-items;
                .bg(@mainCol);
                .plus_icon{
                    width: .32rem;
                    height: .32rem;
                    .reduis(50%);
                    .bg(#fff);
                    .color(@mainCol);
                    .fontSize(.28rem);
                    .algin(c);
                    .line(.32rem);
                    margin-right: .16rem;
                }
            }
        }
        .mint-cell{
            .bg(#fff);
            margin-top: .2rem;
            .mint-cell-wrapper{
                padding: 0;
                background-image: none;
                display: block;
                .mint-cell-value{
                    .flex;
                    .flex-dir;
                }
            }

            .active_head{
                width: 100%;
                padding: 0 .3rem;
                height: .86rem;
                border-bottom: 1px solid #e5e5e5;
                .flex;
                .flex-dir(row);
                .justify-content(space-between);
                .align-items;
                .fontSize(.28rem);
                .color(#333);
                .head_left{
                    .flex;
                    .flex-dir(row);
                    .align-items;
                    img{
                        width: .41rem;
                        height: .41rem;
                    }
                    span{
                        margin-left: .1rem;
                        width: 3.2rem;
                        .oneLine;
                        .color(#333);
                    }
                }
                .head_right{
                    .color(#666);
                    .fontSize(.3rem);
                    &.on{
                        .color(@lightGreen);
                    }
                }
            }
            .active_section{
                width: 100%;
                padding: 0 .3rem;
                height: 1.8rem;
                .flex;
                .flex-dir(row);
                .align-items;
                .justify-content(space-between);
                .section_left{
                    width: 5.4rem;
                    overflow: hidden;
                    .flex;
                    .flex-dir(row);
                    .section_img{
                        width: 1.2rem;
                        height: 1.2rem;
                        overflow: hidden;
                        .position(r);
                        margin-left: .2rem;
                        &:first-child{
                            margin-left: 0;
                        }
                        img{
                            width: 100%;
                        }
                    }
                }
                .section_right{
                    .flex;
                    .flex-dir(row-reverse);
                    .color(#333);
                    .fontSize(.24rem);
                    i{
                        .color(#ccc);
                    }
                }
            }
            .active_foot{
                width: 100%;
                padding: 0 .3rem;
                height: .8rem;
                .bg(#fafafa);
                .flex;
                .flex-dir(row);
                .align-items;
                .justify-content(space-between);
                .color(#333);
                .fontSize(.24rem);
                i{
                    .color(#ccc);
                }
            }
        }
    }

}
</style>
