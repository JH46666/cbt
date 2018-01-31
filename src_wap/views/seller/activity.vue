<template lang="html">
    <div class="activity add">
        <div class="f5-2"></div>
        <div class="activity_name">
            <label for="activeName">活动名称</label>
            <input type="text" id="activeName" placeholder="输入2-15个汉字" maxlength="15" v-model="activeName" />
        </div>
        <div class="f5-2"></div>
        <div class="activityt_date">
            <div class="activityt_date_wrapper">
                <label for="activeStartDate">开始时间</label>
                <input type="text" id="activeStartDate" readonly placeholder="请选择" v-model="activeStartDate" @click="openPicker('start')" />
                <i class="iconfont">&#xe744;</i>
            </div>
        </div>
        <div class="activityt_date">
            <div class="activityt_date_wrapper border_none">
                <label for="activeEndDate">结束时间</label>
                <input type="text" id="activeEndDate" readonly placeholder="请选择" v-model="activeEndDate"  @click="openPicker('end')" />
                <i class="iconfont">&#xe744;</i>
            </div>
        </div>
        <div class="f5-2"></div>
        <div class="activity_name">
            <label for="activeLimit">每单限购</label>
            <input type="number" id="activeLimit" placeholder="不填表示不限制" v-model="activeLimit" @blur="longInt" />
        </div>
        <div class="f5-2"></div>
        <div class="activity_name">
            特价商品({{ selProList.length }})件
        </div>
        <div class="activity_pro">
            <div class="activity_pro_item" v-for="(item,index) in selProList" :key="index">
                <div class="activity_pro_item_top">
                    <div class="activity_pro_item_top_left">
                        <img :src="item.proImg" />
                    </div>
                    <div class="activity_pro_item_top_right">
                        <p>{{ item.proName }}</p>
                        <p>￥{{ item.proPrice }}</p>
                    </div>
                </div>
                <div class="activity_pro_item_bottom">
                    <div><label>折扣：</label><input type="number" v-model="item.discount" @change="getPriceOrDiscount(index,'discount')" /></div>
                    <div><label>折扣价：</label><input type="number" v-model="item.discountPrice" @change="getPriceOrDiscount(index,'discountPrice')" /></div>
                    <i class="iconfont" @click="deteledPro(index)">&#xe60d;</i>
                </div>
            </div>
        </div>
        <div class="f5-2"></div>
        <div class="activity_name" @click="addProMethod">
            <div class="plus_icon">+</div>
            <div class="add_text">添加商品</div>
        </div>
        <mt-button type="primary" :disabled="isSave" @click.native="saveActive">保存</mt-button>
        <mt-popup v-model="selectPro" position="bottom">
            <div class="dialog_wrapper">
                <div class="dialog_search">
                    <div class="search_wrapper">
                        <input type="text" placeholder="搜索商品" v-model="searchKeyWord" />
                        <i class="iconfont" @click="searchMethod">&#xe649;</i>
                        <span @click="resetList">取消</span>
                        <i class="iconfont icon-guanbi2" :class="{on: searchKeyWord.length>0}" @click="resetSeachText"></i>
                    </div>
                </div>
                <div class="dialig_list">
                    <div class="dialig_list_wrapper">
                        <div class="item" v-for="(item,index) in proList" :key="index" @click="item.checked = !item.checked" :class="{on: item.checked}">
                            <div class="item_left">
                                <div class="checkedBox" :class="{on: item.checked}"></div>
                            </div>
                            <div class="item_center">
                                <img :src="item.proImg" />
                            </div>
                            <div class="item_right">
                                <p class="item_text">{{ item.proName }}</p>
                                <p class="item_price">￥ {{ item.proPrice }}</p>
                                <div class="item_bottom">
                                    <div class="selled">
                                        已售<span v-if="item.salesNum">{{ item.salesNum }}</span><span v-else> 0 </span>
                                    </div>
                                    <div class="totaled">
                                        库存<span>{{ item.stockNum }}</span>
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
                    <mt-button type="primary" :disabled="selDisable" @click.native="selProMethod">选好了</mt-button>
                </div>
            </div>
        </mt-popup>
        <template>
            <mt-datetime-picker ref="picker1" type="datetime" @confirm="handleConfirm1" :startDate="new Date('2017/01/01 00:00:00')"></mt-datetime-picker>
        </template>
        <template>
            <mt-datetime-picker ref="picker2" type="datetime" @confirm="handleConfirm2" :startDate="new Date('2017/01/01 00:00:00')"></mt-datetime-picker>
        </template>
    </div>
</template>

<script>
import { MessageBox,Toast } from 'mint-ui';
import { mapState } from 'vuex'
import store from 'store';
import $api from 'api';
export default {
    data() {
        return {
            activeName: '',
            activeStartDate: '',
            activeEndDate: '',
            activeLimit: '',
            selectPro: false,
            proList: [],
            searchKeyWord: '',
            selProList: [],
        }
    },
    methods: {
        resetSeachText() {
            this.searchKeyWord = '';
        },
        resetList() {
            this.searchKeyWord = '';
            this.getSearchList(this.searchKeyWord).then((res) => {
                this.proList = res.data;
                for(let obj of this.proList){
                    this.$set(obj,'checked',false);
                }
            })
            this.selectPro = false;
        },
        getPriceOrDiscount(index,type) {
            if(type === 'discount'){
                this.selProList[index].discount = parseFloat(this.selProList[index].discount).toFixed(2);
                this.selProList[index].discountPrice = ((parseFloat(this.selProList[index].discount)/10)*this.selProList[index].proPrice).toFixed(2);
                return ;
            }else if(type === 'discountPrice'){
                this.selProList[index].discountPrice = parseFloat(this.selProList[index].discountPrice).toFixed(2);
                this.selProList[index].discount = (parseFloat(this.selProList[index].discountPrice)*10/parseFloat(this.selProList[index].proPrice)).toFixed(2);
                return ;
            }
        },
        addProMethod() {
            this.getSearchList(this.searchKeyWord).then((res) => {
                this.proList = res.data;
                for(let obj of this.proList){
                    this.$set(obj,'checked',false);
                }
            })
            this.selectPro = true
        },
        longInt() {
            this.activeLimit = Math.floor(this.activeLimit);
        },
        saveActive() {
            let data = {
                "device": 'WAP',
                "endTime": this.activeEndDate,
                "isLimitBuyNum": this.activeLimit == '' ? 0 : 1,
                "numTop": this.activeLimit == '' ? null : Math.floor(this.activeLimit),
                "proRuleList": [],
                "showName": this.activeName,
                "startTime": this.activeStartDate,
                "sysId": 1
            }
            for(let obj of this.selProList){
                if(obj.discount == '' && obj.discountPrice != ''){
                    obj.discount = (parseFloat(obj.discountPrice)*10/parseFloat(obj.proPrice)).toFixed(2);
                }else if(obj.discountPrice == '' && obj.discount != ''){
                    obj.discountPrice = ((parseFloat(obj.discount)/10)*obj.proPrice).toFixed(2);
                }else if(obj.discountPrice == '' && obj.discount == ''){
                    return Toast ({
                        message:`请填写特价商品的折扣价或折扣`,
                        iconClass: 'icon icon-fail'
                    })
                }
                data.proRuleList.push({
                    "discount": obj.discount,
                    "price": obj.proPrice,
                    "proName": obj.proName,
                    "proSku": obj.proSku,
                    "specialPrice": obj.discountPrice,
                    'subAmount': parseFloat(obj.proPrice) - parseFloat(obj.discountPrice)
                })
            }
            this.$api.post('/oteao/ruleSet/special/addOrModityRule',JSON.stringify(data),res => {
                Toast ({
                    message:`活动保存成功`,
                    iconClass: 'icon icon-success'
                })
                setTimeout(() => {
                    this.$router.push({
                        name: '活动列表'
                    })
                },500)
            },res=>{
                return Toast({
                    message: res.errorMsg,
                    iconClass: 'icon icon-fail'
                });
            })
        },
        deteledPro(index) {
            this.selProList.splice(index,1)
        },
        selProMethod() {
            for(let obj of this.proList){
                if(obj.checked){
                    this.selProList.push(obj)
                }
            }
            for(let obj of this.selProList){
                this.$set(obj,'discount','');
                this.$set(obj,'discountPrice','');
            }
            this.proList = [];
            this.selectPro = false;
        },
        searchMethod() {
            this.getSearchList(this.searchKeyWord).then((res) => {
                this.proList = res.data;
                for(let obj of this.proList){
                    this.$set(obj,'checked',false);
                }
            })
        },
        getSearchList(keyWord) {
            let data = {
                    'pro.sysId': 1,
                    'pro.device': 'WAP',
                    'pro.seachKey': keyWord
                }
            return new Promise((resolve,reject) => {
                this.$api.post('/oteao/productInfo/searchCreateSpecialProductList',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        openPicker(type) {
            if(type === 'start'){
                this.$refs.picker1.open();
            }else if(type === 'end'){
                this.$refs.picker2.open();
            }
        },
        handleConfirm1(val) {
            let start  = new Date(val);
            this.activeStartDate = `${start.getFullYear()}-${this.addZero(start.getMonth()+1)}-${this.addZero(start.getDate())} ${this.addZero(start.getHours())}:${this.addZero(start.getMinutes())}:${this.addZero(start.getSeconds())}`;
        },
        handleConfirm2(val) {
            let end  = new Date(val);
            this.activeEndDate = `${end.getFullYear()}-${this.addZero(end.getMonth()+1)}-${this.addZero(end.getDate())} ${this.addZero(end.getHours())}:${this.addZero(end.getMinutes())}:${this.addZero(end.getSeconds())}`;
        },
        addZero(val) {
            if(Number(val)<9){
                return `0${Number(val)}`;
            }else{
                return val;
            }
        },
        checkedAllMethod() {
            let isTrue = this.proList.every((item) => {
                return item.checked === true;
            })
            if(isTrue){
                for(let obj of this.proList){
                    obj.checked = false;
                }
            }else{
                for(let obj of this.proList){
                    obj.checked = true;
                }
            }
        },

    },
    computed: {
        selectNum() {
            let num = 0;
            for(let obj of this.proList){
                if(obj.checked){
                    num++;
                }
            }
            return num;
        },
        selectAll() {
            let isTrue = this.proList.every((item) => {
                return item.checked === true;
            })
            if(isTrue){
                return true;
            }else{
                return false;
            }
        },
        selDisable() {
            for(let obj of this.proList){
                if(obj.checked){
                    return false;
                }
            }
            return true;
        },
        isSave() {
            if(this.activeName.length >= 2 && this.activeStartDate != '' && this.activeEndDate != '' && this.selProList.length > 0){
                return false;
            }else{
                return true;
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        if(from.name === '活动列表'){
            next(vm => {
                vm.$router.go(0);
            })
        }
        if(store.state.member.member.id) {
            next();
        } else {
            store.dispatch('getMemberData').then(res => {
                next();
            }).catch(res =>{
                next(vm => {
                    vm.router.push('/login')
                })
            })
        }
    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','添加活动');

    }
}
</script>

<style lang="less">
@import '~@/styles/activity/add.less';
</style>
