<template lang="html">
    <div class="list">
        <mt-navbar v-model="selected" :class="{on: !wxFlag}">
            <mt-tab-item id="0">全部</mt-tab-item>
            <mt-tab-item id="1">未开始</mt-tab-item>
            <mt-tab-item id="2">进行中</mt-tab-item>
            <mt-tab-item id="3">已结束</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item :id="selected" class="on">
                <div class="mt_cell_wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="noInfinity" infinite-scroll-distance="5">
                <template v-if="actiiveList.length == 0">
                    <div class="f5-2"></div>
                    <div class="active_empty">
                        <img src="../../assets/images/empty_activily.png" />
                        <span>没有任何特价活动哟~</span>
                    </div>
                </template>
                <template v-else>
                    <mt-cell v-for="(item,index) in actiiveList" :key="index">
                        <div class="f5-2"></div>
                            <div class="active_head">
                                <div class="head_left">
                                    <img src="../../assets/images/%.png" />
                                    <span>{{ item.showName }}</span>
                                </div>
                                <div class="head_right on" v-if="new Date(item.startTime) < new Date() && new Date(item.endTime) > new Date()">进行中</div>
                                <div class="head_right" v-else-if="new Date(item.endTime) < new Date()">已结束</div>
                                <div class="head_right" v-else>未开始</div>
                            </div>
                            <div class="active_section" @click="goEdit(item)">
                                <div class="section_left">
                                    <template v-for="(img,num) in item.specialPriceList">
                                        <div class="section_img" :key="num" v-if="num < 4">
                                            <img :src="img.mainImgUrl" />
                                        </div>
                                    </template>
                                    <div class="white_wrapper"></div>
                                </div>
                                <div class="section_right">
                                    <i class="iconfont">&#xe744;</i>
                                    共{{ item.specialPriceList.length }}件
                                </div>
                            </div>
                            <div class="active_foot">
                                {{ item.startTime }}至{{ item.endTime }}
                                <i class="iconfont" @click="deleteActive(item)">&#xe60d;</i>
                            </div>
                        </mt-cell>
                    </template>
                    <div class="goods-loading" v-if="!noInfinity && actiiveList.length < orderNum">
                        <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                        <span class="loading-text">正在努力加载中~</span>
                    </div>
                    <div class="no-more" v-if="actiiveList.length == orderNum">没有更多了呦~</div>
                </div>
                <div class="add_activily" @click="goAdd" v-if="selected == '0' || selected == '2'">
                    <div class="plus_icon">+</div>
                    添加活动
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import { Toast,MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            selected: '0',
            wxFlag: false,
            statusType: {
                0: '全部',
                1: '未开始',
                2: '进行中',
                3: '已结束'
            },
            pageSize: 1,
            actiiveList: [],
            orderNum: 0,
            noInfinity: false,
        }
    },
    head: {
        title: {
          inner: '活动列表'
        }
    },
    watch: {
        selected(val) {
            if(val === '0'){
                this.$router.replace({
                    name: '活动列表',
                    query: {
                        sort: 0
                    }
                })
                this.getList(0).then(res => {
                    this.actiiveList = res.data;
                })
            }else if(val === '1'){
                this.$router.replace({
                    name: '活动列表',
                    query: {
                        sort: 1
                    }
                })
                this.getList(1).then(res => {
                    this.actiiveList = res.data;
                })
            }else if(val === '2'){
                this.$router.replace({
                    name: '活动列表',
                    query: {
                        sort: 2
                    }
                })
                this.getList(2).then(res => {
                    this.actiiveList = res.data;
                })
            }else if(val === '3'){
                this.$router.replace({
                    name: '活动列表',
                    query: {
                        sort: 3
                    }
                })
                this.getList(3).then(res => {
                    this.actiiveList = res.data;
                })
            }
        },
    },
    created() {
        if(this.$route.query.sort != undefined){
            this.getList(this.$route.query.sort).then(res => {
                this.actiiveList = res.data;
                this.orderNum = res.total_record;
                this.selected = this.$route.query.sort;
            })
        }else{
            this.getList(0).then(res => {
                this.actiiveList = res.data;
                this.orderNum = res.total_record;
                this.selected = '0';
            })
        }
    },
    methods: {
        loadMore() {
            try {
                if(this.actiiveList.length >= this.orderNum) return this.noInfinity = true;
                this.pageSize++;
                this.getList().then((res) =>{
                    let timeData = res.data.order;
                    this.actiiveList = this.actiiveList.concat(timeData);
                    this.noInfinity = false;
                })
            } catch (e) {

            }
        },
        deleteActive(obj) {
            let data = {
                ruleId: obj.id
            }
            MessageBox.confirm(`确定删除活动【${obj.showName}】`).then(action => {
                this.$api.post('/oteao/ruleSet/special/deleteRuleSet',data,res => {
                    Toast({
                        message: `活动已删除，页面将刷新`,
                        iconClass: 'icon icon-success'
                    });
                    return window.location.reload();
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            },action => {
                console.log('cancel!');
            });
        },
        getList(state) {
            let data = {
                    'page.pageNumber': this.pageSize,
                    'page.pageSize': 20,
                    'sysId': 1,
                    'device': 'WAP',
                    'sort': state
                }
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/productExtInfo/searchSpecialPrice',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        goAdd() {
            this.$router.push({
                name: '添加活动'
            });
        },
        goEdit(item) {
            const nowDate = new Date();
            if(new Date(item.endTime)>nowDate || new Date(item.startTime)>nowDate){
                return this.$router.push({
                    name: '编辑活动',
                    query: {
                        edit: item.id
                    }
                });
            }else{
                return Toast({
                    message: '只有进行中和未开始的可以编辑',
                    iconClass: 'icon icon-fail'
                });
            }
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
