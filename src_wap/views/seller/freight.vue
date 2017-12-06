<template>
    <div class="freight_wrapper">
        <div class="caption flex">
            <p>全国包邮，除以下省份</p>
        </div>
        <div class="f5-2"></div>
        <div class="input-box" v-for="(item,index) in postArray" :key="index">
            <div class="input-item">
                <div class="input-inner no-free clearfix">
                    <span class="color_6 lab" style="float:left;">不包邮省份</span>
                    <p class="cities empty" v-if="item.areaText.length === 0">请选择</p>
                    <p class="cities" v-else>{{ item.areaText }}</p>
                    <a class="r-select" href="javascript:void(0);" @click="popupVisible=true"><i class="iconfont color_ad">&#xe744;</i></a>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner">
                    <span class="flex-1 color_6">首重(1kg)</span>
                    <input class="algin_r" type="age" placeholder="请输入首重运费" v-model="item.sweight" />
                    <span>元</span>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner">
                    <span class="flex-1 color_6">续重（每增加1kg增加）</span>
                    <input class="algin_r" type="age" placeholder="请输入金额" v-model="item.xweight" @blur="toFixedTwo($event.target.value)" />
                    <span>元</span>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner no-border">
                    <span class="flex-1 color_6">购满包邮</span>
                    <input class="algin_r" type="age" placeholder="不填默认不包邮"  v-model="item.buyer" />
                    <span>元</span>
                </div>
            </div>
            <div class="f5-2"></div>
        </div>

        <div class="add-box" @click="addFree">
            <a class="add-btns" href="javascript:void(0);"><i class="iconfont">&#xe67a;</i>添加指定省份运费</a>
        </div>
        <div class="save-box">
            <mt-button type="primary" :disabled="saveDisable">保存</mt-button>
        </div>
        <!-- 选择省份弹窗 -->
        <mt-popup v-model="popupVisible" position="right" class="popup-city">
            <mt-header title="选择省份" class="cbt-header">
                <mt-button icon="back" slot="left" @click="popupVisible=false">返回</mt-button>
                <mt-button icon="more" slot="right"></mt-button>
            </mt-header>
            <div class="pop-content">
                <div class="city-box often-box">
                    <h4 class="city-caption flex align_items_c">
                        <label class="check-cir" :class="{'checked': checkedAll.one}" @click="selectAll('one')"></label>
                        <span>江浙沪</span>
                    </h4>
                    <div class="city-inner clearfix">
                        <a class="city-item" href="javascript:void(0);" v-for="(item,index) in addressType.one" :class="{on: item.flag}" :key="index" @click="item.flag = !item.flag">
                            <label>
                                <span>{{item.name}}</span>
                            </label>
                        </a>
                    </div>
                </div>
                <div class="city-box other-box">
                    <h4 class="city-caption flex align_items_c">
                        <label class="check-cir" :class="{'checked': checkedAll.two}" @click="selectAll('two')"></label>
                        <span>偏远地区</span>
                    </h4>
                    <div class="city-inner clearfix">
                        <a class="city-item" href="javascript:void(0);" v-for="(item,index) in addressType.two" :class="{on: item.flag}" :key="index" @click="item.flag = !item.flag">
                            <label>
                                <span>{{item.name}}</span>
                            </label>
                        </a>
                    </div>
                </div>
                <div class="city-box other-box">
                    <h4 class="city-caption flex align_items_c">
                        <label class="check-cir" :class="{'checked': checkedAll.three}" @click="selectAll('three')"></label>
                        <span>东北三省</span>
                    </h4>
                    <div class="city-inner clearfix">
                        <a class="city-item" href="javascript:void(0);" v-for="(item,index) in addressType.three" :class="{on: item.flag}" :key="index" @click="item.flag = !item.flag">
                            <label>
                                <span>{{item.name}}</span>
                            </label>
                        </a>
                    </div>
                </div>
                <div class="city-box other-box">
                    <h4 class="city-caption flex align_items_c">
                        <label class="check-cir" :class="{'checked': checkedAll.four}" @click="selectAll('four')"></label>
                        <span>其它省份</span>
                    </h4>
                    <div class="city-inner clearfix">
                        <a class="city-item" href="javascript:void(0);" v-for="(item,index) in addressType.four" :class="{on: item.flag}" :key="index" @click="item.flag = !item.flag">
                            <label>
                                <span>{{item.name}}</span>
                            </label>
                        </a>
                    </div>
                </div>
            </div>
            <div class="f-b">
                <div class="flex">
                    <div class="flex-1 flex align_items_c">
                        <label class="check-cir"></label>
                        <span class="color_6">已选<span class="color_f08">{{ checkedNum }}</span>款</span>
                    </div>
                    <div class="selected-btn">
                        <mt-button type="primary" :disabled="disabledBol">选好了</mt-button>
                    </div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { MessageBox,Toast } from 'mint-ui';
    export default{
        data(){
            return{
                addressType: {
                    'one': [],
                    'two': [],
                    'three': [],
                    'four': []
                },
                checkedAll: {
                    'one': false,
                    'two': false,
                    'three': false,
                    'four': false
                },
                popupVisible: false,
                postArray: [
                    {
                        area: '',
                        areaText: '',
                        sweight: '',
                        xweight: '',
                        buyer: ''
                    }
                ],
                saveDisable: true,
            }
        },
        created(){
            this.$api.get('baseRegion/getRegionTree',{},res => {
                for(let i=0;i<res.data.length-3;i++){
                    if(res.data[i].regionName === '江苏省' || res.data[i].regionName === '上海市' || res.data[i].regionName === '浙江省'){
                        this.addressType.one.push({
                            code: res.data[i].code,
                            name: res.data[i].regionName,
                            flag: false
                        })
                    }
                    if(res.data[i].regionName === '新疆维吾尔自治区' || res.data[i].regionName === '西藏自治区' || res.data[i].regionName === '甘肃省' || res.data[i].regionName === '青海省' || res.data[i].regionName === '宁夏回族自治区' || res.data[i].regionName === '内蒙古自治区'){
                        this.addressType.two.push({
                            code: res.data[i].code,
                            name: res.data[i].regionName,
                            flag: false
                        })
                    }
                    if(res.data[i].regionName === '辽宁省' || res.data[i].regionName === '吉林省' || res.data[i].regionName === '黑龙江省'){
                        this.addressType.three.push({
                            code: res.data[i].code,
                            name: res.data[i].regionName,
                            flag: false
                        })
                    }
                    if(res.data[i].regionName != '江苏省' && res.data[i].regionName != '上海市' && res.data[i].regionName != '浙江省' && res.data[i].regionName != '辽宁省' && res.data[i].regionName != '吉林省' && res.data[i].regionName != '黑龙江省' && res.data[i].regionName != '新疆维吾尔自治区' && res.data[i].regionName != '西藏自治区' && res.data[i].regionName != '甘肃省' && res.data[i].regionName != '青海省' && res.data[i].regionName != '宁夏回族自治区' && res.data[i].regionName != '内蒙古自治区'){
                        this.addressType.four.push({
                            code: res.data[i].code,
                            name: res.data[i].regionName,
                            flag: false
                        })
                    }
                }
            },res => {
                return Toast({
                    message: res.errorMsg,
                    iconClass: 'icon icon-fail'
                });
            })
        },
        computed:{
            disabledBol() {
                let arr = this.addressType.one.concat(this.addressType.two,this.addressType.three,this.addressType.four);
                for(let i=0;i<arr.length;i++){
                    if(arr[i].flag){
                        return false;
                    }
                }
                return true;
            },
            checkedNum() {
                let arr = this.addressType.one.concat(this.addressType.two,this.addressType.three,this.addressType.four);
                let num = 0;
                for(let i=0;i<arr.length;i++){
                    if(arr[i].flag){
                        num++;
                    }
                }
                return num;
            }
        },
        methods:{
            addFree() {
                this.postArray.push({
                    area: '',
                    areaText: '',
                    sweight: '',
                    xweight: '',
                    buyer: ''
                })
            },
            toFixedTwo(val) {
                let delTrim = String(val).trim();
                if(delTrim == ''){
                    return delTrim = '0.00'
                }else{
                    return delTrim  = parseFloat(delTrim).toFixed(2);
                }
            },
            selectAll(type) {
                if(type === 'one'){
                    if(this.checkedAll.one){
                        for(let obj of this.addressType.one){
                            obj.flag = false;
                        }
                    }else{
                        for(let obj of this.addressType.one){
                            obj.flag = true;
                        }
                    }

                }
                if(type === 'two'){
                    if(this.checkedAll.two){
                        for(let obj of this.addressType.two){
                            obj.flag = false;
                        }
                    }else{
                        for(let obj of this.addressType.two){
                            obj.flag = true;
                        }
                    }
                }
                if(type === 'three'){
                    if(this.checkedAll.three){
                        for(let obj of this.addressType.three){
                            obj.flag = false;
                        }
                    }else{
                        for(let obj of this.addressType.three){
                            obj.flag = true;
                        }
                    }
                }
                if(type === 'four'){
                    if(this.checkedAll.four){
                        for(let obj of this.addressType.four){
                            obj.flag = false;
                        }
                    }else{
                        for(let obj of this.addressType.four){
                            obj.flag = true;
                        }
                    }
                }
            },
        },
        watch:{
            'addressType': {
                handler(curVal,oldVal){
                    let isTrue1 = curVal.one.every((item) => {
                        return item.flag === true
                    })
                    if(isTrue1){
                        this.checkedAll.one = true;
                    }else{
                        this.checkedAll.one = false;
                    }
                    let isTrue2 = curVal.two.every((item) => {
                        return item.flag === true
                    })
                    if(isTrue2){
                        this.checkedAll.two = true;
                    }else{
                        this.checkedAll.two = false;
                    }
                    let isTrue3 = curVal.three.every((item) => {
                        return item.flag === true
                    })
                    if(isTrue3){
                        this.checkedAll.three = true;
                    }else{
                        this.checkedAll.three = false;
                    }
                    let isTrue4 = curVal.four.every((item) => {
                        return item.flag === true
                    })
                    if(isTrue4){
                        this.checkedAll.four = true;
                    }else{
                        this.checkedAll.four = false;
                    }
    　　　　　　　},
    　　　　　　　deep:true
            }
        }
    }
</script>
<style lang="less">
    @import '~@/styles/seller/freight.less';
</style>
