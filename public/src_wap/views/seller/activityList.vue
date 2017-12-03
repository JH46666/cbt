<template lang="html">
    <div class="list">
        <mt-navbar v-model="selected" :class="{on: !wxFlag}">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">未开始</mt-tab-item>
            <mt-tab-item id="3">进行中</mt-tab-item>
            <mt-tab-item id="4">已结束</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1" class="on">
                <mt-cell v-for="(item,index) in activeData" :key="index">
                    <div class="f5-2"></div>
                    <div class="active_head">
                        <div class="head_left">
                            <img src="../../assets/images/%.png" />
                            <span>{{ item.name }}</span>
                        </div>
                        <div class="head_right" :class="{on: item.status != '已结束'}">{{ item.status }}</div>
                    </div>
                    <div class="active_section" @click="goEdit(item.code)">
                        <div class="section_left">
                            <template v-for="(img,num) in item.proImg">
                                <div class="section_img" :key="num" v-if="num < 4">
                                    <img :src="img" />
                                </div>
                            </template>
                            <div class="white_wrapper"></div>
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
                <div class="add_activily" @click="goAdd">
                    <div class="plus_icon">+</div>
                    添加活动
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="f5-2"></div>
                <div class="active_empty">
                    <img src="../../assets/images/empty_activily.png" />
                    <span>没有任何特价活动哟~</span>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3" class="on">
                <div class="f5-2"></div>
                <div class="active_empty">
                    <img src="../../assets/images/empty_activily.png" />
                    <span>没有任何特价活动哟~</span>
                </div>
                <div class="add_activily" @click="goAdd">
                    <div class="plus_icon">+</div>
                    添加活动
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <div class="f5-2"></div>
                <div class="active_empty">
                    <img src="../../assets/images/empty_activily.png" />
                    <span>没有任何特价活动哟~</span>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: '1',
            wxFlag: false,
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
                        '../src_wap/assets/list_img.png'
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
    methods: {
        goAdd() {
            this.$router.push('/seller/activity?add');
        },
        goEdit(id) {
            this.$router.push('/seller/activity?edit='+id);
        }
    },
    mounted () {
       this.wxFlag = this.$tool.isWx;
  　}
}
</script>

<style lang="less">
@import '~@/styles/activity/list.less';
</style>
