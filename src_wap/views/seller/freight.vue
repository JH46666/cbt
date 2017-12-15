<template>
    <div class="freight_wrapper">
        <div class="caption flex">
            <p>全国包邮，除以下省份</p>
        </div>
        <div class="f5-2"></div>
        <div class="input-box" v-for="(item,index) in postArray" :key="index" v-if="!item.delFlag">
            <div class="input-item">
                <div class="input-inner no-free clearfix">
                    <span class="color_6 lab" style="float:left;">不包邮省份</span>
                    <p class="cities empty" v-if="item.areaText.length === 0">请选择</p>
                    <p class="cities" v-else>{{ item.areaText }}</p>
                    <a class="r-select" href="javascript:void(0);" @click="showDialog(index)"><i class="iconfont color_ad">&#xe744;</i></a>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner">
                    <span class="flex-1 color_6">首重(1kg)</span>
                    <input class="algin_r" type="number" placeholder="请输入首重运费" v-model="item.sweight" @blur="toFixedTwo(item.sweight,'sweight',index)" />
                    <span>元</span>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner">
                    <span class="flex-1 color_6">续重(每增加1kg增加)</span>
                    <input class="algin_r" type="number" placeholder="请输入金额" v-model="item.xweight" />
                    <span>元</span>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner no-border">
                    <span class="flex-1 color_6">购满包邮</span>
                    <input class="algin_r" type="number" placeholder="不填默认不包邮"  v-model="item.buyer" />
                    <span>元</span>
                </div>
            </div>
            <div class="deleted-item" v-if="index>0" @click="delectMethod(index)">
                <i class="iconfont">&#xe60d;</i>
            </div>
            <div class="f5-2"></div>
        </div>

        <div class="add-box" @click="addFree">
            <a class="add-btns" href="javascript:void(0);"><i class="iconfont">&#xe67a;</i>添加指定省份运费</a>
        </div>
        <div class="save-box">
            <mt-button type="primary" :disabled="saveDisable" @click.native="savePost">保存</mt-button>
        </div>
        <!-- 选择省份弹窗 -->
        <mt-popup v-model="popupVisible" position="right" class="popup-city">
            <mt-header title="选择省份" class="cbt-header" v-if="!$tool.isWx">
                <mt-button slot="left" @click="popupVisible=false">关闭</mt-button>
            </mt-header>
            <div class="pop-content" :class="{on: !$tool.isWx}">
                <div class="city-box often-box">
                    <h4 class="city-caption flex align_items_c">
                        <label class="check-cir" :class="{'checked': checkedAll.one}" @click="selectAll('one')"></label>
                        <span>江浙沪</span>
                    </h4>
                    <div class="city-inner clearfix">
                        <mt-button type="primary" :disabled="item.disabled" class="city-item" v-for="(item,index) in addressType.one" :class="{on: item.flag && !item.disabled}" :key="index" @click.native="item.flag = !item.flag">
                            {{item.name}}
                        </mt-button>
                    </div>
                </div>
                <div class="city-box other-box">
                    <h4 class="city-caption flex align_items_c">
                        <label class="check-cir" :class="{'checked': checkedAll.two}" @click="selectAll('two')"></label>
                        <span>偏远地区</span>
                    </h4>
                    <div class="city-inner clearfix">
                        <mt-button type="primary" :disabled="item.disabled" class="city-item" v-for="(item,index) in addressType.two" :class="{on: item.flag && !item.disabled}" :key="index" @click.native="item.flag = !item.flag">
                            {{item.name}}
                        </mt-button>
                    </div>
                </div>
                <div class="city-box other-box">
                    <h4 class="city-caption flex align_items_c">
                        <label class="check-cir" :class="{'checked': checkedAll.three}" @click="selectAll('three')"></label>
                        <span>东北三省</span>
                    </h4>
                    <div class="city-inner clearfix">
                        <mt-button type="primary" :disabled="item.disabled" class="city-item" v-for="(item,index) in addressType.three" :class="{on: item.flag && !item.disabled}" :key="index" @click.native="item.flag = !item.flag">
                            {{item.name}}
                        </mt-button>
                    </div>
                </div>
                <div class="city-box other-box">
                    <h4 class="city-caption flex align_items_c">
                        <label class="check-cir" :class="{'checked': checkedAll.four}" @click="selectAll('four')"></label>
                        <span>其它省份</span>
                    </h4>
                    <div class="city-inner clearfix">
                        <mt-button type="primary" :disabled="item.disabled" class="city-item" v-for="(item,index) in addressType.four" :class="{on: item.flag && !item.disabled}" :key="index" @click.native="item.flag = !item.flag">
                            {{item.name}}
                        </mt-button>
                    </div>
                </div>
            </div>
            <div class="f-b">
                <div class="flex">
                    <div class="flex-1 flex align_items_c">
                        <label class="check-cir" :class="{checked: allCheckedFlag}" @click="selectAllCheck"></label>
                        <span class="color_6">已选<span class="color_f08"> {{ checkedNum }} </span>省</span>
                        <span class="cancel_link" v-if="$tool.isWx" @click="popupVisible=false">取消</span>
                    </div>
                    <div class="selected-btn">
                        <mt-button type="primary" @click.native="selectOk">选好了</mt-button>
                    </div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { MessageBox,Toast } from 'mint-ui';
import { mapState } from 'vuex'
import store from 'store';
import $api from 'api';
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
                postArray: [],
                selectPro: [],
                selectIndex: null,
                flag: false,
            }
        },
        created(){
            this.$api.get('oteao/baseRegion/getRegionTree',{},res => {
                for(let i=0;i<res.data.length-3;i++){
                    if(res.data[i].regionName === '江苏省' || res.data[i].regionName === '上海市' || res.data[i].regionName === '浙江省'){
                        this.addressType.one.push({
                            code: res.data[i].id,
                            name: res.data[i].regionName,
                            flag: false,
                            disabled: false
                        })
                    }
                    if(res.data[i].regionName === '新疆维吾尔自治区' || res.data[i].regionName === '西藏自治区' || res.data[i].regionName === '甘肃省' || res.data[i].regionName === '青海省' || res.data[i].regionName === '宁夏回族自治区' || res.data[i].regionName === '内蒙古自治区'){
                        this.addressType.two.push({
                            code: res.data[i].id,
                            name: res.data[i].regionName,
                            flag: false,
                            disabled: false
                        })
                    }
                    if(res.data[i].regionName === '辽宁省' || res.data[i].regionName === '吉林省' || res.data[i].regionName === '黑龙江省'){
                        this.addressType.three.push({
                            code: res.data[i].id,
                            name: res.data[i].regionName,
                            flag: false,
                            disabled: false
                        })
                    }
                    if(res.data[i].regionName != '江苏省' && res.data[i].regionName != '上海市' && res.data[i].regionName != '浙江省' && res.data[i].regionName != '辽宁省' && res.data[i].regionName != '吉林省' && res.data[i].regionName != '黑龙江省' && res.data[i].regionName != '新疆维吾尔自治区' && res.data[i].regionName != '西藏自治区' && res.data[i].regionName != '甘肃省' && res.data[i].regionName != '青海省' && res.data[i].regionName != '宁夏回族自治区' && res.data[i].regionName != '内蒙古自治区'){
                        this.addressType.four.push({
                            code: res.data[i].id,
                            name: res.data[i].regionName,
                            flag: false,
                            disabled: false
                        })
                    }
                }
            },res => {
                return Toast({
                    message: res.errorMsg,
                    iconClass: 'icon icon-fail'
                });
            })
            this.getOldList().then((res) => {
                let result = res.data;
                for(let i=0;i<result.length;i++){
                    if(result[i] == null){
                        result.splice(i,1);
                        i--;
                    }
                }
                if(result.length==0){
                    this.postArray.push({
                        area: [],
                        areaText: '',
                        sweight: '',
                        xweight: '',
                        buyer: '',
                        delFlag: 0,
                        templateId: null
                    })
                }else{
                    this.flag = true;
                    for(let i=0;i<result.length;i++){
                        this.postArray.push({
                            area: [],
                            areaText: '',
                            delFlag: 0,
                            sweight: result[i].firstHeavyCost,
                            xweight: result[i].continuedHeavyCost,
                            buyer: result[i].freeCost,
                            templateId: result[i].templateId
                        })
                        let newArray = [];
                        for(let j=0;j<result[i].baseRegionVoList.length;j++){
                            this.postArray[i].area.push(result[i].baseRegionVoList[j].id);
                            newArray.push(result[i].baseRegionVoList[j].regionName)
                        }
                        this.postArray[i].areaText = newArray.join(',');
                    }
                }
            })
        },
        computed:{
            // disabledBol() {
            //     let arr = this.addressType.one.concat(this.addressType.two,this.addressType.three,this.addressType.four);
            //     for(let i=0;i<arr.length;i++){
            //         if(arr[i].flag){
            //             return false;
            //         }
            //     }
            //     return true;
            // },
            checkedNum() {
                let arr = this.addressType.one.concat(this.addressType.two,this.addressType.three,this.addressType.four);
                let num = 0;
                for(let i=0;i<arr.length;i++){
                    if(arr[i].flag && !arr[i].disabled){
                        num++;
                    }
                }
                return num;
            },
            saveDisable() {
                for(let i=0;i<this.postArray.length;i++){
                    if(this.postArray[i].area.length > 0 && this.postArray[i].sweight!='' && this.postArray[i].xweight != ''){
                        return false;
                    }else if(this.postArray[i].area.length === 0){
                        return false;
                    }else{
                        return true;
                    }
                }
            },
            allCheckedFlag() {
                let arr = this.addressType.one.concat(this.addressType.two,this.addressType.three,this.addressType.four);
                let isTrue = arr.every((item)=>{
                    return item.flag === true;
                })
                if(isTrue){
                    return true;
                }else{
                    return false;
                }
            }
        },
        methods:{
            getOldList() {
                let data = {};
                return new Promise((resolve,reject) => {
                    this.$api.post('/oteao/orgFreightTemplate/listOrgFreightTemplateVo',data,res => {
                        resolve(res);
                    },res=>{
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            selectAllCheck() {
                let arr = this.addressType.one.concat(this.addressType.two,this.addressType.three,this.addressType.four);
                if(this.allCheckedFlag){
                    for(let obj of arr){
                        obj.flag = false;
                    }
                }else{
                    for(let obj of arr){
                        obj.flag = true;
                    }
                }
            },
            savePost() {
                this.addFreight().then((res) => {
                    Toast({
                        message: '运费配置成功',
                        iconClass: 'icon icon-success'
                    });
                    setTimeout(()=>{
                        this.$router.push({
                            name: '卖家中心'
                        })
                    },200)
                })
            },
            addFreight() {
                let data = {
                    "orgFreightTemplateVoList": []
                }
                for(let i=0;i<this.postArray.length;i++){
                    if(this.postArray[i].sweight !='' && this.postArray[i].xweight != '' && this.postArray[i].buyer != '' && this.postArray[i].area.length > 0){
                        data.orgFreightTemplateVoList.push({
                            "baseRegionVoList": [],
                            "continuedHeavyCost": this.postArray[i].sweight,
                            "firstHeavyCost": this.postArray[i].xweight,
                            "freeCost": this.postArray[i].buyer,
                            "templateId": this.postArray[i].templateId,
                            "delFlag": this.postArray[i].delFlag
                        })
                        let areaArray = this.postArray[i].area,
                            areaNameArray = this.postArray[i].areaText.split(',');
                        if(areaArray.length==0){
                            return Toast({
                                message: '请先选择省份',
                                iconClass: 'icon icon-fail'
                            });
                        }
                        for(let obj of areaArray){
                            data.orgFreightTemplateVoList[i].baseRegionVoList.push({
                                "id": obj,
                                "regionName": ''
                            })
                        }
                        for(let obj of areaNameArray){
                            data.orgFreightTemplateVoList[i].baseRegionVoList.regionName = obj;
                        }
                    }
                }
                return new Promise((resolve,reject) => {
                    this.$api.post('/oteao/orgFreightTemplate/createOrUpdateOrgFreightTemplate',JSON.stringify(data),res => {
                        resolve(res);
                    },res=>{
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            toFixedTwo(val,str,index) {
                let delTrim = String(val).trim();
                this.postArray[index].sweight = parseFloat(delTrim).toFixed(2);
            },
            delectMethod(index) {
                // this.postArray.splice(index,1);
                this.postArray[index].delFlag = 1;
            },
            selectOk() {
                this.postArray[this.selectIndex].area = [];
                let nameArray = [];
                let arr = this.addressType.one.concat(this.addressType.two,this.addressType.three,this.addressType.four);
                for(let obj of arr){
                    if(obj.flag && !obj.disabled){
                        this.postArray[this.selectIndex].area.push(obj.code);
                        nameArray.push(obj.name)
                    }
                }
                this.postArray[this.selectIndex].areaText = nameArray.join(',');
                this.popupVisible = false;
            },
            showDialog(index) {
                let selectAreaArray = [];
                for(let obj of this.postArray){
                    selectAreaArray = selectAreaArray.concat(obj.area);
                }
                this.selectIndex = index;
                this.selectPro = [];
                let arr = this.addressType.one.concat(this.addressType.two,this.addressType.three,this.addressType.four);
                let selectCode = this.postArray[index].area;
                for(let obj of arr){
                    obj.disabled = false;
                    if(selectAreaArray.indexOf(obj.code) != -1){
                        obj.disabled = true;
                        if(selectCode.indexOf(obj.code) != -1){
                            obj.disabled = false;
                            obj.flag = true;
                        }
                    }
                }
                this.popupVisible = true;
            },
            addFree() {
                this.postArray.push({
                    area: [],
                    areaText: '',
                    sweight: '',
                    xweight: '',
                    buyer: '',
                    delFlag: 0
                })
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
                        return item.flag === true && item.disabled === false
                    })
                    if(isTrue1){
                        this.checkedAll.one = true;
                    }else{
                        this.checkedAll.one = false;
                    }
                    let isTrue2 = curVal.two.every((item) => {
                        return item.flag === true && item.disabled === false
                    })
                    if(isTrue2){
                        this.checkedAll.two = true;
                    }else{
                        this.checkedAll.two = false;
                    }
                    let isTrue3 = curVal.three.every((item) => {
                        return item.flag === true && item.disabled === false
                    })
                    if(isTrue3){
                        this.checkedAll.three = true;
                    }else{
                        this.checkedAll.three = false;
                    }
                    let isTrue4 = curVal.four.every((item) => {
                        return item.flag === true && item.disabled === false
                    })
                    if(isTrue4){
                        this.checkedAll.four = true;
                    }else{
                        this.checkedAll.four = false;
                    }
    　　　　　　　},
    　　　　　　　deep:true
            }
        },
        beforeRouteEnter(to, from, next) {
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
        head: {
            title() {
                return {
                    inner : '运费配置'
                }
            }
        }
    }
</script>
<style lang="less">
    @import '~@/styles/seller/freight.less';
</style>
