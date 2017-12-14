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
                            <label class="item-left" for="7">
                                净重：
                            </label>
                            <div class="item-right">
                                <input type="number" id="7" placeholder="必填项，请输入商品净重展示使用（g）" v-model="resize.form.goodsJz" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="8">
                                毛重：
                            </label>
                            <div class="item-right">
                                <input type="number" id="8" placeholder="必填项，运费计算使用（g）" v-model="resize.form.goodsMz" @blur="toFixedZero(resize.form.goodsMz,'goodsMz')" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="9">
                                库存：
                            </label>
                            <div class="item-right">
                                <input type="number" id="9" placeholder="必填项，请填写商品库存" v-model="resize.form.goodsKc" @blur="toFixedZero(resize.form.goodsKc,'goodsKc')" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="10">
                                平台售价：
                            </label>
                            <div class="item-right">
                                <input type="number" id="10" placeholder="必填项，请填写平台售价" v-model="resize.form.goodsSx" @blur="toFixedTwo(resize.form.goodsSx,'goodsSx')" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="16" style="white-space: nowrap;">
                                建议零售价：
                            </label>
                            <div class="item-right">
                                <input type="number" id="16" placeholder="必填项，请填写建议零售价" v-model="resize.form.goodsPtsj" @blur="toFixedTwo(resize.form.goodsPtsj,'goodsPtsj')" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="good_type_list" v-if="resize.proValList.length != 0">
                    <div class="good_type_list_wrapper">
                        <div class="item">
                            <label class="item-left" for="11">
                                商品属性：
                            </label>
                        </div>
                        <div class="item" v-for="(item,index) in resize.proValList" :key="index">
                            <label class="item-left" :for="index+12">
                                {{ item.propName }}
                            </label>
                            <div class="item-right" @click="clickSelProVal(index)">
                                <input type="text" :id="index+12" v-model="item.proVal" placeholder="非必填" />
                            </div>
                            <i class="iconfont" @click="clickSelProVal(index)">&#xe744;</i>
                            <mt-popup v-model="item.proShowHide" position="bottom">
                                <div class="close-wrap">
                                    <!-- index === item.proIndex -->
                                    <p class="close-tip"  v-for="(secobj,secindex) in item.propValList" :class="{on: secobj.flag}" :key="index" @click="selectPro(item,secindex,secobj)">{{ secobj.propVal }}<i class="iconfont">&#xe684;</i></p>
                                </div>
                            </mt-popup>
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
                        <div class="type_item" v-for="(item,index) in oneTypeList" :key="index" :class="{on: item.id === resize.oneClass}" @click="selectOneType(item.id,index)">{{ item.name }}</div>
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
import { mapState } from 'vuex'
import store from 'store';
import $api from 'api';
export default {
    data() {
        return {
            wxFlag: false,          // 是否微信
            closeUp: false,         // 下拉框
            closeProValUp: false,
            brandList: [],
            danWei: [],
            selectClass: null,
            selList: [],
            dialogTypeBol: false,
            oneTypeList: [],
            twoTypeList: [],
            clickSure: true,
            device: 'WAP',
            proSku: null,
            detailObj: {},
            parentCatId: 0,
            getProvList: [],
            state: '',
        }
    },
    watch: {
        'resize.form.goodTypes': {
            handler(curVal,oldVal){
                if(this.resize.twoClass){
                    this.getProVal(this.resize.twoClass).then((res) => {
                        this.resize.proValList = res.data;
                        if(this.resize.proValList.length != 0){
                            for(let i=0;i<this.resize.proValList.length;i++){
                                this.$set(this.resize.proValList[i],'proVal','');
                                this.$set(this.resize.proValList[i],'proIndex',null);
                                this.$set(this.resize.proValList[i],'proShowHide',false);
                                this.$set(this.resize.proValList[i],'proValId','');
                                for(let obj of this.resize.proValList[i].propValList){
                                    this.$set(obj,'flag',false);
                                }
                            }
                            for(let i=0;i<this.resize.proValList.length;i++){
                                for(let j=0;j<this.getProvList.length;j++){
                                    if(this.resize.proValList[i].id == this.getProvList[j].id){
                                        this.resize.proValList[i].proValId = this.getProvList[j].content;
                                        this.resize.proValList[i].proIndex = i;
                                        this.resize.proValList[i].proVal = this.getProvList[j].selval;
                                        for(let obj of this.resize.proValList[i].propValList){
                                            if(obj.id == this.getProvList[j].content){
                                                obj.flag = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    })
                }
　　　　　　　},
　　　　　　　deep:true
        },
        twoTypeList(val) {
            for(let j=0;j<val.length;j++){
                if(this.twoTypeList[j].id == this.detailObj.productInfo.catId){
                     this.resize.twoIndex = j;
                }
            }
        },
        'resize': {
            handler(curVal,oldVal){
                if(curVal.oneIndex && curVal.twoIndex ){
                    this.clickSure = false;
                }
　　　　　　　},
　　　　　　　deep:true
        }
    },
    methods: {
        selectPro(item,index,secobj) {
            item.proIndex = index;
            item.proVal = secobj.propVal;
            item.proValId = secobj.id;
            item.proShowHide = false;
            for(let obj of item.propValList){
                obj.flag =false;
            }
            secobj.flag = true;
        },
        clickSelProVal(index) {
            for(let i=0;i<this.resize.proValList.length;i++){
                this.resize.proValList[i].proShowHide = false;
                this.resize.proValList[index].proShowHide = true;
            }
        },
        getProVal(id) {
            let data = {
                    catId: id,
                    sysId: 1,
                    device: this.device,
                    position: 0
                }
            return new Promise((resolve,reject) => {
                this.$api.get('/propInfo/queryPropVal',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        sureType() {
            this.dialogTypeBol = false;
            this.resize.form.goodTypes = this.oneTypeList[this.resize.oneIndex].name+'-'+this.twoTypeList[this.resize.twoIndex].name;
        },
        selectOneType(id,index) {
            this.twoTypeList = [];
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
        getOneTypeList() {
            let data = {
                    sysId: 1
                }
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/proCat/getBaseTea',data,res => {
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
                name: '商品编辑-2',
                query: {
                    state: this.state
                }
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
        },
        getBrandList() {
            let data = {
                sysId: 1
            }
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/productBrand/findProductBrandByListSysId',data,res => {
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
                this.$api.get('/data/getDataByType',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        getDetail() {
            let data = {
                    sysId: 1,
                    device: 'WAP',
                    productSku: this.proSku
                }
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/productInfo/getProExtInfo',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        getAttrOrImg() {
            let data ={
                sysId: 1,
                productSku: this.proSku,
                device: 'WAP'
            };
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/productInfo/getProExtDetail',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
        getCatDetail(child) {
            let data ={
                id: child,
                sysId: 1
            };
            return new Promise((resolve,reject) => {
                this.$api.get('/oteao/proCat/getSystemCategoryInfoById',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
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
        if(!this.resize.mainId){
            this.proSku = this.$route.query.proSku;
            this.resize.mainId = this.$route.query.edit;
            this.state = this.$route.query.state;
            this.getDetail().then((res) => {
                this.detailObj = res.data;
                this.resize.form.goodsName = this.detailObj.productInfo.proName;
                this.resize.form.goodsDw = this.detailObj.productInfo.unint;
                this.resize.form.goodsBrand = this.detailObj.productInfo.brandName ? this.detailObj.productInfo.brandName : '其它品牌';
                this.resize.form.goodsJz = this.detailObj.productInfo.netWeight;
                this.resize.form.goodsMz = this.detailObj.productInfo.weight;
                this.resize.form.goodsSx = this.detailObj.productPrice[0].price;
                this.resize.form.goodTypes = this.detailObj.productInfo.catName;
                this.resize.form.goodsPtsj = this.detailObj.productPrice[1].price;
                this.resize.form.goodsSell = this.detailObj.productExtInfo.reason;
                this.resize.form.goodsKc = this.detailObj.productExtInfo.stockNum;
                this.resize.oneImgFile = [null];
                this.resize.secondImgFile = [null];
                this.resize.thirdImgFile = [null];
                for(let obj of this.detailObj.productImgList){
                    this.resize.mainImg.push({
                        'imgSrc': obj.imgUrl
                    })
                    this.resize.mainImgFile.push(null);
                }
                this.getCatDetail(this.detailObj.productInfo.catId).then((reses) =>{
                     this.parentCatId = reses.data.parentId;
                     this.resize.form.goodTypes = reses.data.parentName+'-'+this.detailObj.productInfo.catName;
                     for(let i=0;i<this.oneTypeList.length;i++){
                         if(this.oneTypeList[i].id == this.parentCatId){
                             this.resize.oneIndex = i;
                             this.resize.oneClass = this.oneTypeList[i].id;
                             this.selectOneType(this.resize.oneClass,this.resize.oneIndex);
                             this.getTypeList(3).then((ress) => {
                                 let parentList = ress.data;
                                 for(let obj of parentList){
                                     this.twoTypeList.push({
                                         id: obj.id,
                                         name: obj.catName
                                     })
                                 }

                             })
                         }
                     }
                     this.resize.twoClass = this.detailObj.productInfo.catId;
                })
                this.getAttrOrImg().then((rs) => {
                    let proArr = rs.data.propValList;
                    for(let obj of proArr){
                        this.getProvList.push({
                            id: obj.propertiesVal.catPropId,
                            content:  obj.propertiesVal.id,
                            selval: obj.propertiesVal.propVal
                        })
                    }
                    // for(let i=0;i<this.getProvList.length;i++){
                    //     for(let j=0;j<this.resize.proValList.length;j++){
                    //         if(this.getProvList[i].id == this.resize.proValList[j].id){
                    //             console.log(this.getProvList[i].content,this.getProvList[i].selval);
                    //             this.resize.proValList[j].proValId = this.getProvList[i].content;
                    //             this.resize.proValList[j].proVal = this.getProvList[i].selval;
                    //         }
                    //     }
                    // }
                    let content = JSON.parse(rs.data.content);
                    this.resize.imgs.detailImg1 = content.oneImgContent.imgUrl[0];
                    this.resize.textMs1 = content.oneImgContent.content;
                    this.resize.imgs.detailImg2 = content.twoImgContent.imgUrl[0];
                    this.resize.textMs2 = content.twoImgContent.content;
                    this.resize.imgs.detailImg3 = content.threeImgContent.imgUrl[0];
                    this.resize.textMs3 = content.threeImgContent.content;
                    for(let obj of content.fourImgContent.imgUrl){
                        this.resize.imgsStep4.push(obj)
                        this.resize.fourImgFile.push(null);
                    }
                    this.resize.textMs4 = content.fourImgContent.content;
                })
                for(let i=0;i<this.brandList.length;i++){
                    if(this.brandList[i].name == this.resize.form.goodsBrand){
                        this.resize.selIndex.pp = i;
                        this.resize.selId.pp = this.brandList[i].id;
                    }
                }
                for(let i=0;i<this.danWei.length;i++){
                    if(this.danWei[i].name == this.resize.form.goodsDw){
                        this.resize.selIndex.dw = i;
                        this.resize.selId.dw = this.danWei[i].id;
                    }
                }
            })
        }
        this.getOneTypeList().then((res) => {
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
                inner : '商品修改'
            }
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/seller/newshelves1.less';
</style>
