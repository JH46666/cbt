<template lang="html">
    <div class="newshelves">
        <div class="good_type_box">
            <div class="good_type_wrapper">
                <div class="good_type_list bg_gray" style="background: #f5f5f5;">
                    <div class="_add-tips">
                        <p class="_add-tips-title" @click="funcHowToCreat">如何创建商品</p>
                        <i class="iconfont icon-chuangjianshangpinshuoming" @click="funcHowToCreat"></i>
                    </div>
                </div>
                <div class="good_type_list">
                    <div class="good_type_list_wrapper">
                        <div class="item" @click="selectGoodType">
                            <label class="item-left" for="goodType">
                                商品分类
                            </label>
                            <div class="item-right">
                                <input type="text" id="goodType" readonly placeholder="必填项，请选择商品分类" v-model="resize.form.goodTypes" />
                            </div>
                            <i class="iconfont" @click="selectGoodType">&#xe619;</i>
                        </div>

                        <div class="item" style="position: relative;">
                            <label for="2">
                                <p class="item-left spmtitle" for="2">
                                    商品卖点
                                    <i class="iconfont icon-chuangjianshangpinshuoming" style="color:#f08200;" @click="flagGoodsOwnGood = !flagGoodsOwnGood"></i>
                                </p>
                            </label>
                            <div class="item-right">
                                <textarea id="2" rows="2" maxlength="30" placeholder="必填项，最多可写30个字" v-model="resize.form.goodsSell"></textarea>
                                <div class="text_count">
                                    <span>{{ resize.form.goodsSell.length }}</span>/30
                                </div>
                            </div>
                            <!-- 创建商品tips -->
                            <div class="_add-goods-good-tips" v-if="flagGoodsOwnGood">
                               <div class="_add-tips">
                                    <div>商品标题组成</div>
                                    商品卖点+商品品类+工艺+香型+采摘时间
                                </div>
                                <div class="_add-geometric-3"></div>
                                <div class="_add-geometric-X" @click="flagGoodsOwnGood = !flagGoodsOwnGood">
                                    <i class="iconfont icon-danchuangguanbianniu" style="font-size: 0.48rem"></i>
                                </div>
                            </div>
                        </div>

                        <div class="item">
                            <label class="item-left" for="4">
                                品牌
                            </label>
                            <div class="item-right" @click="clickSel('pinpai')">
                                <input type="text" id="4" readonly placeholder="必填项，请选择商品品牌" v-model="resize.form.goodsBrand" />
                            </div>
                            <i class="iconfont" @click="clickSel('pinpai')">&#xe619;</i>
                        </div>
                        <div class="item">
                            <label class="item-left" for="8">
                                重量(含包装)
                            </label>
                            <div class="item-right">
                                <input styl="float:left" type="number" id="8" placeholder="必填项，运费计算使用" v-model="resize.form.goodsMz" @blur="toFixedZero(resize.form.goodsMz,'goodsMz')"
                                />
                                <p style="float:right">g</p>
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="9">
                                库存
                            </label>
                            <div class="item-right">
                                <input styl="float:left" type="number" id="9" placeholder="必填项，请填写商品库存" v-model="resize.form.goodsKc" @blur="toFixedZero(resize.form.goodsKc,'goodsKc')"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="good_type_list bg_gray" style="background: #f5f5f5;"> 
                    <div class="_add-tips-title" style="display: flex;">
                        <div class="_add-small-box"></div> 
                        价格设定
                    </div>
                </div>
                <div class="good_type_list">
                    <div class="good_type_list_wrapper">
                        <div class="item">
                            <label class="item-left" for="10">
                                市场价
                            </label>
                            <div class="item-right">
                                <input type="number" id="10" placeholder="必填，市场价高于单买价" v-model="resize.form.goodsPtsj" @blur="comparePrice(resize.form.goodsPtsj,'goodsPtsj')"
                                />
                                <p style="float:right">元</p>
                            </div>
                        </div>
                        <div class="item _fix-item">
                            <label class="item-left" for="11" style="white-space: nowrap;">
                                单买价
                            </label>
                            <div class="item-right">
                                <input type="number" id="11" placeholder="必填，应高于商品团购价格" v-model="resize.form.goodsSj" @blur="comparePrice(resize.form.goodsSj,'goodsSj')"
                                />
                                <p style="float:right">元</p>
                            </div>
                            <div class="_add-price-error-tips" v-if="flagGoodsSj">
                                <i class="iconfont icon-tishi"> 市场价需高于单买价</i>
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="12" style="white-space: nowrap;">
                                团购价
                            </label>
                            <div class="item-right">
                                <input type="number" id="12" placeholder="必填，应低于商品单买价格" v-model="resize.form.goodsGroup" @blur="comparePrice(resize.form.goodsGroup,'goodsGroup')"
                                />
                                <p style="float:right">元</p>
                            </div>
                        </div>
                        <div class="item _fix-item">
                            <label class="item-left" for="13" style="white-space: nowrap;">
                                团购人数
                            </label>
                            <div class="item-right">
                                <input type="number" id="13" placeholder="必填，不低于2" v-model="resize.form.goodsGroupNum" @blur="toFixedBelow(resize.form.goodsGroupNum,'goodsGroupNum')"
                                />
                                <p style="float:right">人</p>
                            </div>
                            <div class="_add-price-error-tips" v-if="flagGoodsGroup">
                                <i class="iconfont icon-tishi"> 团购价需低于单买价</i>
                            </div>
                            <div class="_add-num-error-tips" v-if="flagGoodsGroupNum">
                                <i class="iconfont icon-tishi"> 人数需介于2和10之间</i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 不明真相的吃瓜群众？↓↓↓ -->
                <!-- <div class="good_type_list" v-if="resize.proValList.length != 0">
                    <div class="good_type_list_wrapper">
                        <div class="item">
                            <label class="item-left" for="11">
                                商品属性
                            </label>
                        </div>
                        <div class="item" v-for="(item,index) in resize.proValList" :key="index">
                            <label class="item-left" :for="index+12">
                                {{ item.propName }}
                            </label>
                            <div class="item-right" @click="clickSelProVal(index)">
                                <input type="text" :readonly="item.propValList.length>0" :id="index+12" v-model="item.proVal" placeholder="非必填" />
                            </div>
                            <i class="iconfont" @click="clickSelProVal(index)" v-if="item.propValList.length>0">&#xe619;</i>
                            <mt-popup v-model="item.proShowHide" position="bottom" v-if="item.propValList.length>0">
                                <div class="close-wrap">
                                    <p class="close-tip" v-for="(secobj,secindex) in item.propValList" :class="{on: secindex == item.proIndex}" :key="secindex"
                                        @click="selectPro(item,secindex,secobj)">{{ secobj.propVal }}
                                        <i class="iconfont">&#xe684;</i>
                                    </p>
                                </div>
                            </mt-popup>
                        </div>
                    </div>
                </div> -->
                <!-- 不明真相的吃瓜群众？↑↑↑ -->

                <!-- 商品属性 -->
                <div class="good_type_list bg_gray" style="background: #f5f5f5; position: relative;" v-if="resize.proValList.length != 0">
                    <div class="_add-tips-title" style="display: flex;">
                        <div class="_add-small-box"></div>
                        <p>属性信息</p>
                        <p style="font-size:0.2rem; color:#c7c7c7; margin-left: 0.2rem;">选填，填写可提升商品的搜索曝光率~</p>
                    </div>
                </div>
                <div class="good_type_list" v-if="resize.proValList.length != 0">
                    <div class="good_type_list_wrapper">
                        <div class="item" v-for="(item,index) in resize.proValList" :key="index">
                            <label class="item-left" :for="index+14">
                                {{ item.propName }}
                            </label>
                            <div class="item-right" @click="clickSelProVal(index)">
                                <input type="text" :readonly="item.propValList.length>0" :id="index+14" v-model="item.proVal" placeholder="非必填" />
                            </div>
                            <i class="iconfont" @click="clickSelProVal(index)" v-if="item.propValList.length>0">&#xe619;</i>
                            <mt-popup v-model="item.proShowHide" position="bottom" v-if="item.propValList.length>0">
                                <div class="close-wrap">
                                    <p class="close-tip" v-for="(secobj,secindex) in item.propValList" :class="{on: secindex == item.proIndex}" :key="secindex"
                                        @click="selectPro(item,secindex,secobj)">{{ secobj.propVal }}
                                        <i class="iconfont">&#xe684;</i>
                                    </p>
                                </div>
                            </mt-popup>
                        </div>
                    </div>
                </div>



                <!-- <div class="good_type_list bg_gray" style="background: #f5f5f5; position: relative;">
                    <div class="_add-tips-title" style="display: flex;">
                        <div class="_add-small-box"></div>
                        <p>属性信息</p>
                        <p style="font-size:0.2rem; color:#c7c7c7; margin-left: 0.2rem;">选填，填写可提升商品的搜索曝光率~</p>
                    </div>
                </div>
                <div class="good_type_list">
                    <div class="good_type_list_wrapper">
                        <div class="item">
                            <label class="item-left" for="14">
                                采摘季节
                            </label>
                            <div class="item-right">
                                <input type="text" id="14" placeholder="例如雨前/春茶之类" v-model="resize.form.goodsCzjj" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="15">
                                产地
                            </label>
                            <div class="item-right">
                                <input type="text" id="15" placeholder="例如福鼎太姥山" v-model="resize.form.goodsCd" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="16">
                                规格
                            </label>
                            <div class="item-right">
                                <input type="text" id="16" placeholder="商品规格" v-model="resize.form.goodsSize" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="17">
                                储存方法
                            </label>
                            <div class="item-right">
                                <input type="text" id="17" placeholder="例如避光密封等" v-model="resize.form.goodsSave"/>
                            </div>
                        </div>
                    </div>
                </div> -->

            </div>
            <!-- <div class="btn_wrapper" v-if="showOfHideStep"> -->
            <div class="btn_wrapper">
                <mt-button type="primary" :disabled="disabledBol" @click="goStep3">下一步</mt-button>
            </div>
        </div>

        <!-- 品牌弹出框 -->
        <mt-popup v-model="closeUp" position="bottom">
            <div class="close-wrap">
                <p class="close-tip" v-for="(item, index) in selList" :class="{on: index === selectClass}" :key="index" @click="selectRightList(index)">{{ item.name }}
                    <i class="iconfont">&#xe684;</i>
                </p>
                <p class="close-tip" @click="cancelList">取消选择</p>
            </div>
        </mt-popup>

        <!-- 商品分类弹出框 -->
        <mt-popup v-model="dialogTypeBol" position="bottom" style="height: 8.88rem; margin-bottom: 0.99rem;" :closeOnClickModal=false>
            <div class="dialog_type_wrapper" style="height: 100%;">
                <div v-if="twoTypeUsedList.length > 0">
                    <div class="dialog_type_title">
                        常用品类
                    </div>
                    <div class="dialog_type_content _fix-dialog_type_content">
                        <div class="type_1 _add-type_1">
                            <div class="type_item _add-type_item" v-for="(item, index) in twoTypeUsedList" :key="index" :class="{on: item.id === resize.twoClass}" @click="selectUsedTwoType(item, index)">
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog_type_title">
                    选择品类
                </div>
                <div class="dialog_type_content" style="display: unset;">
                    <div class="type_1">
                        <div class="type_item" v-for="(item, index) in oneTypeList" :key="index" :class="{on: item.id === resize.oneClass}" @click="selectOneType(item, index)">
                            {{ item.name }}
                        </div>
                    </div>
                    <div class="type_2">
                        <div class="type_2_wrapper clearfix">
                            <div class="type_item" v-for="(item, index) in twoTypeList" :key="index" :class="{on: item.id === resize.twoClass}" @click="selectTwoType(item, index)">
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="dialog_type_bottom _fix-dialog_type_bottom">
                    <mt-button type="primary" @click.native="cancelType">取消</mt-button>
                    <mt-button type="primary" @click.native="sureType" :disabled="clickSure">确定</mt-button>
                </div> -->
            </div>
        </mt-popup>
        <div v-if="dialogTypeBol" class="dialog_type_wrapper" style="position: fixed; z-index: 2020; bottom: 0rem; height: 0.99rem;">
            <div class="dialog_type_bottom _fix-dialog_type_bottom">
                <mt-button type="primary" @click.native="cancelType">取消</mt-button>
                <mt-button type="primary" @click.native="sureType" :disabled="clickSure">确定</mt-button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
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
                oneTypeListName: '',
                twoTypeListName: '',
                clickSure: true,
                device: 'WAP',
                showOfHideStep: true,
                flagGoodsOwnGood: false,                            // 商品卖点
                flagGoodsSj:false,                                  // 单买价              
                flagGoodsGroup: false,                              // 团购价
                flagGoodsGroupNum: false,                           // 团购人数
                twoTypeUsedList: [],                                // 常用二级分类
            }
        },
        watch: {
            // 点击二级分类时获取属性后添加自定义属性
            'resize.twoClass': {
                handler(curVal, oldVal) {
                    this.getProVal(curVal).then((res) => {
                        this.resize.proValList = res.data;
                        if (this.resize.proValList.length != 0) {
                            for (let i = 0; i < this.resize.proValList.length; i++) {
                                this.$set(this.resize.proValList[i], 'proVal', '');
                                this.$set(this.resize.proValList[i], 'proIndex', null);
                                this.$set(this.resize.proValList[i], 'proShowHide', false);
                                this.$set(this.resize.proValList[i], 'proValId', '');
                            }
                        }
                    })
                },
                deep: true
            },
            'resize.defaultArray': {
                handler(curVal, oldVal) {
                    let isShow = curVal.every((item) => {
                        return item.showOfHide === false;
                    })
                    if (isShow) {
                        this.showOfHideStep = true;
                    } else {
                        this.showOfHideStep = false;
                    }
                },
                deep: true
            },
            'resize.proValList': {
                handler(curVal, oldVal) {
                    let isShow = curVal.every((item) => {
                        return item.proShowHide === false;
                    })
                    if (isShow) {
                        this.showOfHideStep = true;
                    } else {
                        this.showOfHideStep = false;
                    }
                },
                deep: true
            }
        },
        methods: {
            // 选择属性下的具体属性
            selectPro(item, index, secobj) {
                item.proIndex = index;
                item.proVal = secobj.propVal;
                item.proValId = secobj.id;
                item.proShowHide = false;
            },
            // 未知
            selectDefaultProp(item, index, secobj) {
                item.select = index;
                item.content = secobj;
                item.showOfHide = false;
            },
            // 未知
            selectDefault(index) {
                for (let i = 0; i < this.resize.defaultArray.length; i++) {
                    this.resize.defaultArray[i].showOfHide = false;
                    this.resize.defaultArray[index].showOfHide = true;
                }
            },
            // 选定属性值时弹出框
            clickSelProVal(index) {
                for (let i = 0; i < this.resize.proValList.length; i++) {
                    this.resize.proValList[i].proShowHide = false;
                    this.resize.proValList[index].proShowHide = true;
                }
            },
            // 点击二级分类时获取属性
            getProVal(id) {
                if(!id) return;
                let data = {
                    catId: id,
                    sysId: 1,
                    device: this.device,
                    position: 0,
                    isDisplay: 1,
                }
                return new Promise((resolve, reject) => {
                    this.$api.get('/oteao/propInfo/queryPropVal', data, res => {
                        resolve(res);
                    }, res => {
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            // 确定一二级分类按钮
            sureType() {
                // this.resize.form.goodTypes = this.oneTypeList[this.resize.oneIndex].name + '-' + this.twoTypeList[this.resize.twoIndex].name;
                this.resize.form.goodTypes = this.oneTypeListName + '-' + this.twoTypeListName;
                this.dialogTypeBol = false;
            },
            // 点击一级分类
            selectOneType(item, index) {
                this.twoTypeList = [];
                this.resize.twoClass = null;
                 this.clickSure = true;
                this.resize.oneClass = item.id;
                this.resize.oneIndex = index;
                this.oneTypeListName = item.name;
                console.log(item.catName)
                // 选择一级分类后确定二级分类
                this.getTypeList(item.id).then((res) => {
                    let parentList = res.data;
                    for (let obj of parentList) {
                        this.twoTypeList.push({
                            id: obj.id,
                            name: obj.catName
                        })
                    }
                })
            },
            // 选择二级分类
            selectTwoType(item, index) {
                this.resize.twoClass = item.id;
                this.resize.twoIndex = index;
                this.twoTypeListName = item.name;
                this.clickSure = false;
            },
            // 选择二级常用分类
            selectUsedTwoType(item, index){
                this.resize.twoClass = item.id;
                this.resize.oneClass = item.parentCatId;
                this.oneTypeListName = item.parentCatName;                
                this.twoTypeListName = item.name;
                // 选择二级常用分类后更新二级分类
                this.getTypeList(item.parentCatId).then((res) => {
                    let parentList = res.data;
                    this.twoTypeList = [];                    
                    for (let obj of parentList) {
                        this.twoTypeList.push({
                            id: obj.id,
                            name: obj.catName
                        })
                    }
                })
                this.clickSure = false;
            },
            // 分类取消按钮
            cancelType() {
                this.dialogTypeBol = false;
                this.resize.oneClass = null;
                this.resize.twoClass = null;
                this.resize.twoIndex = null;
                this.resize.oneIndex = null;
                this.clickSure = true;
                this.twoTypeList = [];
                this.resize.form.goodTypes = '';
            },
            selectGoodType() {
                this.dialogTypeBol = true;
            },
            // 获取二级分类
            getTypeList(parentId) {
                let data = {
                    sysId: 1,
                    parentId: parentId
                }
                return new Promise((resolve, reject) => {
                    this.$api.get('/oteao/proCat/queryCatChilds', data, res => {
                        resolve(res);
                    }, res => {
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            // 获取一级分类
            getOneTypeList() {
                let data = {
                    sysId: 1
                }
                return new Promise((resolve, reject) => {
                    this.$api.get('/oteao/proCat/getBaseTea', data, res => {
                        resolve(res);
                    }, res => {
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            toFixedTwo(val, str) {
                let delTrim = String(val).trim();
                if (delTrim == '') {
                    this.resize.form[str] = '0.00'
                } else {
                    this.resize.form[str] = parseFloat(delTrim).toFixed(2);
                }
            },
            // 保留整数
            toFixedZero(val, str) {
                let delTrim = String(val).trim();
                if (delTrim == '') {
                    this.resize.form[str] = '0'
                } else if (parseFloat(val) > 0) {
                    this.resize.form[str] = parseFloat(delTrim).toFixed(0);
                } else if (parseFloat(val) < 0) {
                    this.resize.form[str] = Math.abs(parseFloat(delTrim).toFixed(0));
                }
            },
            // 平台售价为建议零售价*2
            changePtsj(val, str) {
                let delTrim = String(val).trim();
                if (delTrim == '') {
                    this.resize.form[str] = '0.00'
                } else {
                    this.resize.form[str] = parseFloat(delTrim).toFixed(2);
                }
                this.resize.form['goodsPtsj'] = parseFloat(this.resize.form['goodsSx'] * 2).toFixed(2);
            },
            goStep3() {
                this.$router.push({
                    name: '新品上架-2'
                })
            },
            selectRightList(index) {
                this.selectClass = index;
                if (this.selList[this.selList.length - 1].name === this.brandList[this.brandList.length - 1].name) {          // 品牌选择
                    this.resize.form.goodsBrand = this.selList[index].name;
                    this.resize.selId.pp = this.selList[index].id;
                    this.resize.selIndex.pp = index;
                    this.closeUp = false;
                    return;
                }
                if (this.selList[this.selList.length - 1].name === this.danWei[this.danWei.length - 1].name) {             // 单位选择
                    this.resize.form.goodsDw = this.selList[index].name;
                    this.resize.selId.dw = this.selList[index].id;
                    this.resize.selIndex.dw = index;
                    this.closeUp = false;
                    return;
                }
            },
            cancelList() {
                if (this.selList[this.selList.length - 1].name === this.brandList[this.brandList.length - 1].name) {          // 品牌选择
                    this.resize.form.goodsBrand = '其它品牌';
                    this.resize.selIndex.pp = null;
                    this.resize.selId.pp = null;
                    this.closeUp = false;
                    return;
                }
                if (this.selList[this.selList.length - 1].name === this.danWei[this.danWei.length - 1].name) {             // 单位选择
                    this.resize.form.goodsDw = '';
                    this.resize.selIndex.dw = null;
                    this.resize.selId.dw = null;
                    this.closeUp = false;
                    return;
                }
            },
            clickSel(val) {
                this.closeUp = true;
                if (val === 'danwei') {
                    this.selList = this.danWei;
                    this.selectClass = null;
                    if (this.resize.selIndex.dw != null) {
                        this.selectClass = this.resize.selIndex.dw;
                    }
                    return;
                }
                if (val === 'pinpai') {
                    this.selList = this.brandList;
                    this.selectClass = null;
                    if (this.resize.selIndex.pp != null) {
                        this.selectClass = this.resize.selIndex.pp;
                    }
                    return;
                }
            },
            // 获取所有品牌列表
            getBrandList() {
                let data = {
                    sysId: 1
                }
                return new Promise((resolve, reject) => {
                    this.$api.get('/oteao/productBrand/findProductBrandByListSysId', data, res => {
                        resolve(res);
                    }, res => {
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            // 获取单位数据
            // getDwList() {
            //     let data = {
            //         dictionaryId: 14
            //     }
            //     return new Promise((resolve, reject) => {
            //         this.$api.get('/oteao/dictionaryData/getDataByType', data, res => {
            //             resolve(res);
            //         }, res => {
            //             return Toast({
            //                 message: res.errorMsg,
            //                 iconClass: 'icon icon-fail'
            //             });
            //         })
            //     })
            // },
            // 跳转如何创建商品页
            funcHowToCreat() {
                this.$router.push({
                    name: '如何创建商品'
                })
            },
            // 比较几个价格
            comparePrice(val, str) {
                let delTrim = String(val).trim();
                if (delTrim == '') {
                    this.resize.form[str] = '0.00'
                } else {
                    this.resize.form[str] = parseFloat(delTrim).toFixed(2);
                }
                // goodsPtsj市场价
                // goodsSj单买价
                // goodsGroup团购价
                // 字符串通过charCodeAt(0)转换成ASCII码比较大小
                this.flagGoodsSj = Number(this.resize.form.goodsSj) >= Number(this.resize.form.goodsPtsj);
                this.flagGoodsGroup = Number(this.resize.form.goodsGroup) >= Number(this.resize.form.goodsSj);  
                // if (Number(this.resize.form.goodsSj) >= Number(this.resize.form.goodsPtsj)) {
                //     this.flagGoodsSj = true;
                //     console.log('this.flagGoodsSj is true', this.flagGoodsSj)
                // }
                // if(Number(this.resize.form.goodsSj) < Number(this.resize.form.goodsPtsj)) {
                //     this.flagGoodsSj = false;
                //     console.log('this.flagGoodsSj is false', this.flagGoodsSj)
                // }
                // if (Number(this.resize.form.goodsGroup) >= Number(this.resize.form.goodsSj)) {
                //     this.flagGoodsGroup = true;
                //     console.log('this.flagGoodsGroup is true', this.flagGoodsGroup)
                // }
                // if(Number(this.resize.form.goodsGroup) < Number(this.resize.form.goodsSj)) {
                //     this.flagGoodsGroup = false;
                //     console.log('this.flagGoodsGroup is false', this.flagGoodsGroup)
                // }
            },
            // 控制人数在2-10
            toFixedBelow(val, str) {
                let delTrim = String(val).trim();
                if (delTrim == '') {
                    this.resize.form[str] = '0'
                } else if (parseFloat(val) > 0) {
                    this.resize.form[str] = parseFloat(delTrim).toFixed(0);
                } else if (parseFloat(val) < 0) {
                    this.resize.form[str] = Math.abs(parseFloat(delTrim).toFixed(0));
                }
                if (this.resize.form[str] < 2 || this.resize.form[str] > 10) {
                    this.flagGoodsGroupNum = true;
                }
                else{
                    this.flagGoodsGroupNum = false;
                }
            }
        },
        computed: {
            ...mapGetters([
                'resize'
            ]),
            disabledBol() {
                if(!this.flagGoodsSj && !this.flagGoodsGroup && !this.flagGoodsGroupNum){
                    if (this.resize.form.goodTypes != ''
                        && this.resize.form.goodsSell != ''
                        && this.resize.form.goodsMz != ''
                        && this.resize.form.goodsKc != ''
                        && this.resize.form.goodsSj != ''
                        && this.resize.form.goodsPtsj != ''
                        && this.resize.form.goodsGroup != ''
                        && this.resize.form.goodsGroupNum != ''
                        // && this.resize.form.goodsCzjj != ''
                        // && this.resize.form.goodsCd != ''
                        // && this.resize.form.goodsSize != ''
                        // && this.resize.form.goodsSave != ''
                    ) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else{
                    return true;
                }
            }
        },
        mounted() {
            this.wxFlag = this.$tool.isWx;
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE', '新品上架');
            // 获取一级分类
            this.getOneTypeList().then((res) => {
                let parentList = res.data;
                for (let obj of parentList) {
                    this.oneTypeList.push({
                        id: obj.id,
                        name: obj.catName
                    })
                }
            });
            // 获取常用分类
            this.$api.get('/oteao/productInfo/currentCategroyForSeller', {}, res => {
                let parentList = res.data;
                // 第一次创建商品时弹出商品卖点提示
                if(!parentList.length){
                    this.flagGoodsOwnGood = true;
                }
                for (let obj of parentList) {
                    this.twoTypeUsedList.push({
                        id: obj.catId,
                        name: obj.catName,
                        parentCatId: obj.parentCatId,
                        parentCatName: obj.parentCatName
                    })
                }
            }, res => {
                return Toast({
                    message: res.errorMsg,
                    iconClass: 'icon icon-fail'
                });
            })

            // 获取所有品牌列表
            this.getBrandList().then((res) => {
                let parentList = res.data;
                for (let obj of parentList) {
                    this.brandList.push({
                        id: obj.id,
                        name: obj.brandName
                    })
                }
            });
            // this.getDwList().then((res) => {
            //     let parentList = res.data;
            //     for (let obj of parentList) {
            //         this.danWei.push({
            //             id: obj.id,
            //             name: obj.dataName
            //         })
            //     }
            // });
        },
        beforeRouteEnter(to, from, next) {
            if (store.state.member.member.id) {
                next();
            } else {
                store.dispatch('getMemberData').then(res => {
                    next();
                }).catch(res => {
                    next(vm => {
                        vm.router.push('/login')
                    })
                })
            }
        },
    }
</script>

<style lang="less">
    @import '~@/styles/seller/newshelves1.less';
    /* _add为新增，_fix为修改 */

    /* 增加提示tips样式 */
    .good_type_wrapper{
        .item{
            padding: 0.56rem 0.3rem 0.3rem!important;
            .item-left{
                 width: 1.8rem!important;
            }
        }
        ._add-tips{
            display: flex;
            align-items: center;
            .iconfont{
                color:#f08200;
                margin-left: 0.06rem;
            }
        }
        ._add-tips-title{
            font-size: 0.26rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.7rem;
            letter-spacing: 0rem;
            color: #333;
            align-items: center;
            padding-left: 0.3rem;
        }
        ._add-small-box{
            width: 0.08rem;
	        height: 0.24rem;
            background-color: #f08200;
            position: absolute;
            left: 0rem;
        }
        ._add-goods-good-tips{
            width: 4.92rem;
            height: 1.12rem;
            background-color: #525150;
            box-shadow: 0rem 0.02rem 0.1rem 0rem rgba(0, 0, 0, 0.4);
            position: absolute;
            left: 2.05rem;
            top: 0.62rem;
            ._add-tips{
                padding: 0.21rem 0.23rem;
                width: 4.92rem;
                font-size: 0.24rem;
                line-height: 0.36rem;
                color: #ffffff;
                text-align: left;
                position: relative;
                z-index: 2;
                display: block;
            }
            ._add-geometric-3{
                width: 0rem;
                height: 0rem;
                border-top: 0.2rem #525150 solid;
                border-right: 0.2rem #525150 solid;
                border-bottom: 0.2rem solid transparent;
                border-left: 0.2rem solid transparent;
                z-index: 1;
                position: absolute;
                top: 0rem;
                left: -0.2rem;
            }
            ._add-geometric-X{
                color: #fff;
                position: absolute;
                top: 0.1rem;
                right: 0.1rem;
                z-index: 3;
            }
        }
        ._fix-item{
            position: relative;
            ._add-price-error-tips{
                position: absolute;
                top: 0rem;
                left: -0.3rem;
                .iconfont{
                font-size: 0.24rem;
                color: #f00;
                }
            }
            ._add-num-error-tips{
                position: absolute;
                bottom: -0.32rem;
                left: -0.3rem;
                .iconfont{
                font-size: 0.24rem;
                color: #f00;
                }
            }
        }
    }

    /* 新增选择类型常用样式 */
    .dialog_type_wrapper{
        height: 90%;
        ._fix-dialog_type_content{
            flex: unset!important;
            ._add-type_1{
                display: flex;
                /* justify-content: space-between; */
                padding-top: 0rem; 
                ._add-type_item {
                    width: unset!important;
                    padding-left: 0.20rem;
                    padding-right: 0.20rem; 
                    margin-top: 0.40rem!important;
                    /* width: auto!important; */
                    /* margin-right: 0.1rem!important; */
                }
            }
        }
        ._fix-dialog_type_bottom{
            position: absolute;
            bottom: 0rem;
        }
        
    }
</style>