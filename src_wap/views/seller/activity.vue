<template lang="html">
    <div class="activity">
        <div class="f5-2"></div>
        <div class="activity_name">
            <label for="activeName">活动名称</label>
            <input type="text" id="activeName" placeholder="输入2-15个汉字" maxlength="15" v-model="activeName" />
        </div>
        <div class="f5-2"></div>
        <div class="activityt_date">
            <div class="activityt_date_wrapper">
                <label for="activeStartDate">开始时间</label>
                <input type="text" id="activeStartDate" placeholder="请选择" v-model="activeStartDate" />
                <i class="iconfont">&#xe744;</i>
            </div>
        </div>
        <div class="activityt_date">
            <div class="activityt_date_wrapper border_none">
                <label for="activeEndDate">结束时间</label>
                <input type="text" id="activeEndDate" placeholder="请选择" v-model="activeEndDate" />
                <i class="iconfont">&#xe744;</i>
            </div>
        </div>
        <div class="f5-2"></div>
        <div class="activity_name">
            <label for="activeLimit">每人限购</label>
            <input type="text" id="activeLimit" placeholder="不填表示不限制" v-model="activeLimit" />
        </div>
        <div class="f5-2"></div>
        <div class="activity_name">
            特价商品（{{ specialNum }}）件
        </div>
        <div class="f5-2"></div>
        <div class="activity_name" @click="selectPro = true">
            <div class="plus_icon">+</div>
            <div class="add_text">添加商品</div>
        </div>
        <mt-button type="primary">保存</mt-button>
        <div class="dialog" :class="{on: selectPro}">
            <div class="dialog_wrapper">
                <div class="dialog_search">
                    <div class="search_wrapper">
                        <input type="text" placeholder="搜索商品">
                        <i class="iconfont">&#xe649;</i>
                    </div>
                </div>
                <div class="dialig_list">
                    <div class="dialig_list_wrapper">
                        <div class="item" v-for="(item,index) in list" :key="index" @click="checkedOne(item)" :class="{on: item.checked}">
                            <div class="item_left">
                                <div class="checkedBox" :class="{on: item.checked}"></div>
                            </div>
                            <div class="item_center">
                                <img :src="item.imgUrl" />
                            </div>
                            <div class="item_right">
                                <p class="item_text">{{ item.text }}</p>
                                <p class="item_price">￥ {{ item.price }}</p>
                                <div class="item_bottom">
                                    <div class="selled">
                                        已售<span>{{ item.selled }}</span>
                                    </div>
                                    <div class="totaled">
                                        库存<span>{{ item.total }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="select_wrapper">
                    <div class="select_count">
                        <div class="checkedAll" :class="{on: selectAll}" @click="checkedAllMethod"></div>
                        <div class="checkedNum">已选<span>{{ selectNum }}</span>款</div>
                    </div>
                    <mt-button type="primary" @click.native="selectEnd">选好了</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: '',
            activeStartDate: '',
            activeEndDate: '',
            activeLimit: '',
            specialNum: 3,
            selectAll: false,
            selectPro: false,
            list: [
                {
                    checked: false,
                    imgUrl: '../src_wap/assets/list_img.png',
                    text: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                    price: 500,
                    selled: 5000,
                    total: 5000
                },
                {
                    checked: false,
                    imgUrl: '../src_wap/assets/list_img.png',
                    text: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                    price: 500,
                    selled: 5000,
                    total: 5000
                },
                {
                    checked: false,
                    imgUrl: '../src_wap/assets/list_img.png',
                    text: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                    price: 500,
                    selled: 5000,
                    total: 5000
                },
                {
                    checked: false,
                    imgUrl: '../src_wap/assets/list_img.png',
                    text: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                    price: 500,
                    selled: 5000,
                    total: 5000
                },
                {
                    checked: false,
                    imgUrl: '../src_wap/assets/list_img.png',
                    text: '醉品朴茶 安溪铁观音2017秋茶 乌龙茶 清香型',
                    price: 500,
                    selled: 5000,
                    total: 5000
                }
            ],
            selectNum: 0,
        }
    },
    methods: {
        checkedAllMethod() {
            if(!this.selectAll){
                this.selectAll = true;
                this.selectNum = this.list.length;
                for(let obj of this.list){
                    obj.checked = true;
                }
                return ;
            }else{
                this.selectAll = false;
                this.selectNum = 0;
                for(let obj of this.list){
                    obj.checked = false;
                }
                return ;
            }
        },
        checkedOne(obj) {
            obj.checked = !obj.checked;
            let num = 0;
            for(let obj of this.list){
                if(obj.checked === true){
                    num++;
                }
            }
            this.selectNum = num;
        },
        selectEnd() {
            this.selectPro = false;
        }
    },
    watch: {
        selectNum(val) {
            let len = this.list.length;
            if(val === len){
                this.selectAll = true;
            }else{
                this.selectAll = false;
            }
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/activity/add.less';
</style>
