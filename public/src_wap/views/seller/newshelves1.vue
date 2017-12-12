<template lang="html">
    <div class="newshelves">
        <div class="good_type_box">
            <div class="good_type_wrapper">
                <div class="good_type" @click="selectGoodType">
                    <label for="goodType">商品分类：</label>
                    <input type="text" id="goodType" readonly placeholder="必填项，请选择商品分类" v-model="resize.form.goodTypes" />
                </div>
                <div class="good_type_list">
                    <div class="good_type_list_wrapper">
                        <div class="item">
                            <label class="item-left" for="1">
                                商品名称：
                            </label>
                            <div class="item-right">
                                <textarea id="1" rows="2" maxlength="30" placeholder="必填项，请输入展示商品名称" v-model="resize.form.goodsName"></textarea>
                                <div class="text_count">
                                    <span>{{ resize.form.goodsName.length }}</span>/30
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="2">
                                商品卖点：
                            </label>
                            <div class="item-right">
                                <textarea id="2" rows="2" maxlength="30" placeholder="非必填项，最多可写30个字" v-model="resize.form.goodsSell"></textarea>
                                <div class="text_count">
                                    <span>{{ resize.form.goodsSell.length }}</span>/30
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="3">
                                单位：
                            </label>
                            <div class="item-right" @click="clickSel('danwei')">
                                <input type="text" id="3" readonly placeholder="必填项，请选择商品单位" v-model="resize.form.goodsDw" />
                            </div>
                            <i class="iconfont"  @click="clickSel('danwei')">&#xe744;</i>
                        </div>
                        <div class="item">
                            <label class="item-left" for="4">
                                品牌：
                            </label>
                            <div class="item-right" @click="clickSel('pinpai')">
                                <input type="text" id="4" readonly placeholder="必填项，请选择商品品牌" v-model="resize.form.goodsBrand" />
                            </div>
                            <i class="iconfont" @click="clickSel('pinpai')">&#xe744;</i>
                        </div>
                        <div class="item">
                            <label class="item-left" for="5">
                                香气：
                            </label>
                            <div class="item-right" @click="clickSel('xiangqi')">
                                <input type="text" id="5" readonly placeholder="非必填项，请选择商品香气" v-model="resize.form.goodsXq" />
                            </div>
                            <i class="iconfont" @click="clickSel('xiangqi')">&#xe744;</i>
                        </div>
                        <div class="item">
                            <label class="item-left" for="6">
                                滋味：
                            </label>
                            <div class="item-right" @click="clickSel('ziwei')">
                                <input type="text" id="6" readonly placeholder="非必填项，请选择商品滋味" v-model="resize.form.goodsZw" />
                            </div>
                            <i class="iconfont" @click="clickSel('ziwei')">&#xe744;</i>
                        </div>
                        <div class="item">
                            <label class="item-left" for="7">
                                净重：
                            </label>
                            <div class="item-right">
                                <input type="age" id="7" placeholder="必填项，请输入商品净重展示使用（g）" v-model="resize.form.goodsJz" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="8">
                                毛重：
                            </label>
                            <div class="item-right">
                                <input type="age" id="8" placeholder="必填项，运费计算使用（g）" v-model="resize.form.goodsMz" @blur="toFixedZero(resize.form.goodsMz,'goodsMz')" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="9">
                                库存：
                            </label>
                            <div class="item-right">
                                <input type="age" id="9" placeholder="必填项，请填写商品库存" v-model="resize.form.goodsKc" @blur="toFixedZero(resize.form.goodsKc,'goodsKc')" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="10">
                                平台售价：
                            </label>
                            <div class="item-right">
                                <input type="age" id="10" placeholder="必填项，请填写平台售价" v-model="resize.form.goodsSx" @blur="toFixedTwo(resize.form.goodsSx,'goodsSx')" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="16">
                                建议零售价：
                            </label>
                            <div class="item-right">
                                <input type="age" id="16" placeholder="必填项，请填写建议零售价" v-model="resize.form.goodsPtsj" @blur="toFixedTwo(resize.form.goodsPtsj,'goodsPtsj')" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="good_type_list">
                    <div class="good_type_list_wrapper">
                        <div class="item">
                            <label class="item-left" for="11">
                                商品属性：
                            </label>
                            <div class="item-right">
                                <input type="text" id="11" placeholder="非必填" v-model="resize.form.goodsGoodType" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="12">
                                采摘季节：
                            </label>
                            <div class="item-right">
                                <input type="text" id="12" placeholder="非必填，例如雨前/春茶之前" v-model="resize.form.goodsJj" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="13">
                                产地：
                            </label>
                            <div class="item-right">
                                <input type="text" id="13" placeholder="非必填，例如福鼎太姥山" v-model="resize.form.goodsCd" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="14">
                                规格：
                            </label>
                            <div class="item-right">
                                <input type="text" id="14" placeholder="非必填，请填写商品规格" v-model="resize.form.goodsGg" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="15">
                                存储方法：
                            </label>
                            <div class="item-right">
                                <input type="text" id="15" placeholder="非必填，例如避光密封等" v-model="resize.form.goodsCc" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn_wrapper">
                <mt-button type="primary" :disabled="disabledBol" @click="goStep3">下一步</mt-button>
            </div>
        </div>
        <mt-popup v-model="closeUp" position="bottom">
            <div class="close-wrap">
                <p class="close-tip"  v-for="(item,index) in selList" :class="{on: index === selectClass}" :key="index" @click="selectRightList(index)">{{ item.name }}<i class="iconfont">&#xe684;</i></p>
                <p class="close-tip" @click="cancelList">取消选择</p>
            </div>
        </mt-popup>
        <mt-popup v-model="dialogTypeBol" position="bottom">
            <div class="dialog_type_wrapper">
                <div class="dialog_type_title">
                    选择品类
                </div>
                <div class="dialog_type_content">
                    <div class="type_1">
                        <div class="type_item" v-for="(item,index) in oneTypeList" :key="index" :class="{on: item.id === resize.oneClass}" @click="selectOneType(item.id,index)" v-if="index <= 8">{{ item.name }}</div>
                    </div>
                    <div class="type_2">
                        <div class="type_2_wrapper">
                            <div class="type_item" v-for="(item,index) in twoTypeList" :key="index" :class="{on: item.id === resize.twoClass}" @click="selectTwoType(item.id,index)">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="dialog_type_bottom">
                    <mt-button type="primary" @click.native="cancelType">取消</mt-button>
                    <mt-button type="primary" @click.native="sureType" :disabled="clickSure">确定</mt-button>
                </div>
            </div>
        </mt-popup>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            wxFlag: false,          // 是否微信
            closeUp: false,         // 下拉框
            brandList: [],
            danWei: [],
            selectClass: null,
            selList: [],
            dialogTypeBol: false,
            oneTypeList: [],
            twoTypeList: [],
            clickSure: true,
        }
    },
    methods: {
        sureType() {
            this.dialogTypeBol = false;
            this.resize.form.goodTypes = this.oneTypeList[this.resize.oneIndex].name+'-'+this.twoTypeList[this.resize.twoIndex].name;
        },
        selectOneType(id,index) {
            this.resize.oneClass = id;
            this.resize.oneIndex = index;
            this.getTypeList(id).then((res) => {
                let parentList = res.data;
                for(let obj of parentList){
                    this.twoTypeList.push({
                        id: obj.id,
                        name: obj.catName
                    })
                }
            })
        },
        selectTwoType(id,index) {
            this.resize.twoClass = id;
            this.resize.twoIndex = index;
            this.clickSure = false;
        },
        cancelType() {
            this.dialogTypeBol = false;
            this.resize.oneClass = null;
            this.resize.twoClass = null;
            this.resize.twoIndex = null;
            this.resize.oneIndex = null;
            this.clickSure = true;
            this.twoTypeList = [];
        },
        selectGoodType() {
            this.dialogTypeBol = true;
        },
        getTypeList(parentId) {
            let data = {
                    sysId: 1,
                    parentId: parentId
                }
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/proCat/queryCatChilds',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        toFixedTwo(val,str) {
            let delTrim = String(val).trim();
            if(delTrim == ''){
                this.resize.form[str] = '0.00'
            }else{
                this.resize.form[str] = parseFloat(delTrim).toFixed(2);
            }
        },
        toFixedZero(val,str) {
            let delTrim = String(val).trim();
            if(delTrim == ''){
                this.resize.form[str] = '0'
            }else if(parseFloat(val) > 0){
                this.resize.form[str] = parseFloat(delTrim).toFixed(0);
            }else if(parseFloat(val) < 0){
                this.resize.form[str] = Math.abs(parseFloat(delTrim).toFixed(0));
            }
        },
        goStep3() {
            this.$router.push({
                name: '新品上架-2'
            })
        },
        selectRightList(index) {
            this.selectClass = index;
            if(this.selList[this.selList.length-1].name === this.brandList[this.brandList.length-1].name){          // 品牌选择
                this.resize.form.goodsBrand = this.selList[index].name;
                this.resize.selId.pp = this.selList[index].id;
                this.resize.selIndex.pp = index;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1].name === this.resize.xiangWei[this.resize.xiangWei.length-1].name){           // 香味选择
                this.resize.form.goodsXq = this.selList[index].name;
                this.resize.selId.xq = this.selList[index].id;
                this.resize.selIndex.xq = index;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1].name === this.resize.ziWei[this.resize.ziWei.length-1].name){              // 滋味选择
                this.resize.form.goodsZw = this.selList[index].name;
                this.resize.selId.zw = this.selList[index].id;
                this.resize.selIndex.zw = index;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1].name === this.danWei[this.danWei.length-1].name){             // 单位选择
                this.resize.form.goodsDw = this.selList[index].name;
                this.resize.selId.dw = this.selList[index].id;
                this.resize.selIndex.dw = index;
                this.closeUp = false;
                return;
            }
        },
        cancelList() {
            if(this.selList[this.selList.length-1].name === this.brandList[this.brandList.length-1].name){          // 品牌选择
                this.resize.form.goodsBrand = '';
                this.resize.selIndex.pp = null;
                this.resize.selId.pp = null;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1].name === this.resize.xiangWei[this.resize.xiangWei.length-1].name){           // 香味选择
                this.resize.form.goodsXq = '';
                this.resize.selIndex.xq = null;
                this.resize.selId.xq = null;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1].name === this.resize.ziWei[this.resize.ziWei.length-1].name){              // 滋味选择
                this.resize.form.goodsZw = '';
                this.resize.selIndex.zw = null;
                this.resize.selId.zw = null;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1].name === this.danWei[this.danWei.length-1].name){             // 单位选择
                this.resize.form.goodsDw = '';
                this.resize.selIndex.dw = null;
                this.resize.selId.dw = null;
                this.closeUp = false;
                return;
            }
        },
        clickSel(val) {
            this.closeUp = true;
            if(val === 'danwei'){
                this.selList = this.danWei;
                this.selectClass = null;
                if(this.resize.selIndex.dw!=null){
                    this.selectClass = this.resize.selIndex.dw;
                }
                return;
            }
            if(val === 'pinpai'){
                this.selList = this.brandList;
                this.selectClass = null;
                if(this.resize.selIndex.pp!=null){
                    this.selectClass = this.resize.selIndex.pp;
                }
                return;
            }
            if(val === 'xiangqi'){
                this.selList = this.resize.xiangWei;
                this.selectClass = null;
                if(this.resize.selIndex.xq!=null){
                    this.selectClass = this.resize.selIndex.xq;
                }
                return;
            }
            if(val === 'ziwei'){
                this.selList = this.resize.ziWei;
                this.selectClass = null;
                if(this.resize.selIndex.zw!=null){
                    this.selectClass = this.resize.selIndex.zw;
                }
                return;
            }
        },
        getBrandList() {
            let data = {}
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/productBrand/findProductBrand',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        getDwList() {
            let data = {
                    dictionaryId: 14
                }
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/data/getDataByType',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        }
    },
    computed: {
        ...mapGetters([
            'resize'
        ]),
        disabledBol() {
            if(this.resize.form.goodsName!= '' && this.resize.form.goodsDw!= '' && this.resize.form.goodsBrand!= '' && this.resize.form.goodsJz!= '' && this.resize.form.goodsMz!= '' && this.resize.form.goodsKc!= '' && this.resize.form.goodsSx!= '' && this.resize.form.goodTypes!= '' && this.resize.form.goodsPtsj!=''){
                return false;
            }else{
                return true;
            }
        }
    },
    mounted() {
        this.wxFlag = this.$tool.isWx;
    },
    created() {
        this.getTypeList(3).then((res) => {
            let parentList = res.data;
            for(let obj of parentList){
                this.oneTypeList.push({
                    id: obj.id,
                    name: obj.catName
                })
            }
        });
        this.getBrandList().then((res) => {
            let parentList = res.data;
            for(let obj of parentList){
                this.brandList.push({
                    id: obj.id,
                    name: obj.brandName
                })
            }
        });
        this.getDwList().then((res) => {
            let parentList = res.data;
            for(let obj of parentList){
                this.danWei.push({
                    id: obj.id,
                    name: obj.dataName
                })
            }
        })

    },
}
</script>

<style lang="less">
@import '~@/styles/seller/newshelves1.less';
</style>
