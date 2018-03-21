<template lang="html">
    <div class="newshelves">
        <div class="good_type_box">
            <div class="good_type_wrapper">
                <div class="good_type_list bg_gray" style="background: #f5f5f5;">
                    <p class="rhctitle">如何创建商品</p>
                    <span><i class="iconfont icon-chuangjianshangpinshuoming" style="color: #f08200"></i></span>
                </div>
                <div class="good_type_list">
                    <div class="good_type_list_wrapper">
                        <div class="item" @click="selectGoodType">
                            <label class="item-left" for="2">
                                商品分类：
                            </label>
                            <div class="item-right">
                                <input type="text" id="goodType" readonly placeholder="必填项，请选择商品分类" v-model="resize.form.goodTypes" />
                            </div>
                        </div>

                        <div class="item">
                            <label class="item-left spmtitle" for="2">
                                商品卖点 ：
                            </label>
                            <span><i class="iconfont icon-chuangjianshangpinshuoming"></i></span>
                            <div class="item-right">
                                <textarea id="2" rows="2" maxlength="30" placeholder="非必填项，最多可写30个字" v-model="resize.form.goodsSell"></textarea>
                                <div class="text_count">
                                    <span>{{ resize.form.goodsSell.length }}</span>/30
                                </div>
                            </div>
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
                            <label class="item-left" for="8">
                                重量（含包装）：
                            </label>
                            <div class="item-right">
                                <input styl="float:left" type="number" id="8" placeholder="必填项，运费计算使用" v-model="resize.form.goodsMz" @blur="toFixedZero(resize.form.goodsMz,'goodsMz')"
                                />
                                <p style="float:right">g</p>
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="9">
                                库存：
                            </label>
                            <div class="item-right">
                                <input styl="float:left" type="number" id="8" placeholder="必填项，请填写商品库存" v-model="resize.form.goodsKc" @blur="toFixedZero(resize.form.goodsMz,'goodsMz')"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="good_type_list bg_gray" style="background: #f5f5f5;">
                    <p>价格设定</p>
                </div>
                <div class="good_type_list">
                    <div class="good_type_list_wrapper">
                        <div class="item">
                            <label class="item-left" for="10">
                                市场价：
                            </label>
                            <div class="item-right">
                                <input type="number" id="10" placeholder="必填,市场价高于单买价" v-model="resize.form.goodsSx" @blur="changePtsj(resize.form.goodsSx,'goodsSx')"
                                />
                                <p style="float:right">元</p>
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="16" style="white-space: nowrap;">
                                单买价：
                            </label>
                            <div class="item-right">
                                <input type="number" id="10" placeholder="必填,应高于商品团购价格" v-model="resize.form.goodsSx" @blur="changePtsj(resize.form.goodsSx,'goodsSx')"
                                />
                                <p style="float:right">元</p>
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="16" style="white-space: nowrap;">
                                团购价：
                            </label>
                            <div class="item-right">
                                <input type="number" id="10" placeholder="必填,应低于商品单买价格" v-model="resize.form.goodsGroup" @blur="changePtsj(resize.form.goodsSx,'goodsSx')"
                                />
                                <p style="float:right">元</p>
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="16" style="white-space: nowrap;">
                                团购人数：
                            </label>
                            <div class="item-right">
                                <input type="number" id="16" placeholder="必填，不低于2" v-model="resize.form.goodsGroupNum" @blur="toFixedTwo(resize.form.goodsPtsj,'goodsPtsj')"
                                />
                                <p style="float:right">人</p>
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
                                <input type="text" :readonly="item.propValList.length>0" :id="index+12" v-model="item.proVal" placeholder="非必填" />
                            </div>
                            <i class="iconfont" @click="clickSelProVal(index)" v-if="item.propValList.length>0">&#xe744;</i>
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
                <div class="good_type_list bg_gray" style="background: #f5f5f5;height:16px">
                    <p style="float:left;">属性信息</p>
                    <p style="float:right;margin-right:25%;font-size:12px;color:#c7c7c7">选填，填写可提升商品的搜索曝光率</p>
                </div>
                <div class="good_type_list">
                    <div class="good_type_list_wrapper">
                        <div class="item">
                            <label class="item-left" for="4">
                                采摘季节：
                            </label>
                            <div class="item-right" @click="clickSel('pinpai')">
                                <input type="text" id="4" readonly placeholder="例如雨前/春茶之类" v-model="resize.form.goodssdsd" />
                            </div>
                            <i class="iconfont" @click="clickSel('pinpai')">&#xe744;</i>
                        </div>
                        <div class="item">
                            <label class="item-left" for="4">
                                产地：
                            </label>
                            <div class="item-right">
                                <input type="text" id="4" readonly placeholder="例如福鼎太姥山" v-model="resize.form.sdsd" />
                            </div>
                            <i class="iconfont" @click="clickSel('pinpai')">&#xe744;</i>
                        </div>
                        <div class="item">
                            <label class="item-left" for="4">
                                规格：
                            </label>
                            <div class="item-right">
                                <input type="text" id="4" readonly placeholder="商品规格" v-model="resize.form.goodssdsd" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="4">
                                储存方法：
                            </label>
                            <div class="item-right">
                                <input type="text" id="9" placeholder="例如避光密封等" v-model="resize.form.goodsKc" @blur="toFixedZero(resize.form.goodsKc,'goodsKc')"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="btn_wrapper" v-if="showOfHideStep">
                <mt-button type="primary" :disabled="disabledBol" @click="goStep3">下一步</mt-button>
            </div>
        </div>
        <mt-popup v-model="closeUp" position="bottom">
            <div class="close-wrap">
                <p class="close-tip" v-for="(item,index) in selList" :class="{on: index === selectClass}" :key="index" @click="selectRightList(index)">{{ item.name }}
                    <i class="iconfont">&#xe684;</i>
                </p>
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
                        <div class="type_2_wrapper clearfix">
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
                clickSure: true,
                device: 'WAP',
                showOfHideStep: true,
            }
        },
        watch: {
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
            selectPro(item, index, secobj) {
                item.proIndex = index;
                item.proVal = secobj.propVal;
                item.proValId = secobj.id;
                item.proShowHide = false;
            },
            selectDefaultProp(item, index, secobj) {
                item.select = index;
                item.content = secobj;
                item.showOfHide = false;
            },
            selectDefault(index) {
                for (let i = 0; i < this.resize.defaultArray.length; i++) {
                    this.resize.defaultArray[i].showOfHide = false;
                    this.resize.defaultArray[index].showOfHide = true;
                }
            },
            clickSelProVal(index) {
                for (let i = 0; i < this.resize.proValList.length; i++) {
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
            sureType() {
                this.dialogTypeBol = false;
                this.resize.form.goodTypes = this.oneTypeList[this.resize.oneIndex].name + '-' + this.twoTypeList[this.resize.twoIndex].name;
            },
            selectOneType(id, index) {
                this.twoTypeList = [];
                this.resize.oneClass = id;
                this.resize.oneIndex = index;
                this.getTypeList(id).then((res) => {
                    let parentList = res.data;
                    for (let obj of parentList) {
                        this.twoTypeList.push({
                            id: obj.id,
                            name: obj.catName
                        })
                    }
                })
            },
            selectTwoType(id, index) {
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
            getDwList() {
                let data = {
                    dictionaryId: 14
                }
                return new Promise((resolve, reject) => {
                    this.$api.get('/oteao/dictionaryData/getDataByType', data, res => {
                        resolve(res);
                    }, res => {
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
                if (this.resize.form.goodsName != '' && this.resize.form.goodsDw != '' && this.resize.form.goodsBrand != '' && this.resize.form.goodsJz != '' && this.resize.form.goodsMz != '' && this.resize.form.goodsKc != '' && this.resize.form.goodsSx != '' && this.resize.form.goodTypes != '' && this.resize.form.goodsPtsj != '') {
                    return false;
                } else {
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

            this.getOneTypeList().then((res) => {
                let parentList = res.data;
                for (let obj of parentList) {
                    this.oneTypeList.push({
                        id: obj.id,
                        name: obj.catName
                    })
                }
            });
            this.getBrandList().then((res) => {
                let parentList = res.data;
                for (let obj of parentList) {
                    this.brandList.push({
                        id: obj.id,
                        name: obj.brandName
                    })
                }
            });
            this.getDwList().then((res) => {
                let parentList = res.data;
                for (let obj of parentList) {
                    this.danWei.push({
                        id: obj.id,
                        name: obj.dataName
                    })
                }
            });
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
    @import '~@/styles/seller/123.less';
    .good_type_list.bg_gray {
        /* // background: green;
    // border:1px solid red */
    }
</style>