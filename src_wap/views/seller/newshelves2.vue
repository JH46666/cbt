<template lang="html">
    <div class="newshelves">
        <div class="shelves_step" :class="{on: !wxFlag}">
            <div class="step on">
                <span>1</span>选择品类
            </div>
            <div class="step on">
                <span>2</span>填写信息
            </div>
            <div class="step">
                <span>3</span>上传图片
            </div>
        </div>
        <div class="good_type_box">
            <div class="good_type_wrapper">
                <div class="good_type">
                    商品分类：<span>{{ msg }}</span>
                </div>
                <div class="good_type_list">
                    <div class="good_type_list_wrapper">
                        <div class="item">
                            <label class="item-left" for="1">
                                商品名称：
                            </label>
                            <div class="item-right">
                                <textarea id="1" rows="2" maxlength="30" placeholder="必填项，请输入展示商品名称" v-model="form.goodsName"></textarea>
                                <div class="text_count">
                                    <span>{{ form.goodsName.length }}</span>/30
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="2">
                                商品卖点：
                            </label>
                            <div class="item-right">
                                <textarea id="2" rows="2" maxlength="30" placeholder="非必填项，最多可写30个字" v-model="form.goodsSell"></textarea>
                                <div class="text_count">
                                    <span>{{ form.goodsSell.length }}</span>/30
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="3">
                                单位：
                            </label>
                            <div class="item-right" @click="clickSel('danwei')">
                                <input type="text" id="3" readonly placeholder="必填项，请选择商品单位" v-model="form.goodsDw" />
                            </div>
                            <i class="iconfont"  @click="clickSel('danwei')">&#xe744;</i>
                        </div>
                        <div class="item">
                            <label class="item-left" for="4">
                                品牌：
                            </label>
                            <div class="item-right" @click="clickSel('pinpai')">
                                <input type="text" id="4" readonly placeholder="必填项，请选择商品品牌" v-model="form.goodsBrand" />
                            </div>
                            <i class="iconfont" @click="clickSel('pinpai')">&#xe744;</i>
                        </div>
                        <div class="item">
                            <label class="item-left" for="5">
                                香气：
                            </label>
                            <div class="item-right" @click="clickSel('xiangqi')">
                                <input type="text" id="5" readonly placeholder="非必填项，请选择商品香气" v-model="form.goodsXq" />
                            </div>
                            <i class="iconfont" @click="clickSel('xiangqi')">&#xe744;</i>
                        </div>
                        <div class="item">
                            <label class="item-left" for="6">
                                滋味：
                            </label>
                            <div class="item-right" @click="clickSel('ziwei')">
                                <input type="text" id="6" readonly placeholder="非必填项，请选择商品滋味" v-model="form.goodsZw" />
                            </div>
                            <i class="iconfont" @click="clickSel('ziwei')">&#xe744;</i>
                        </div>
                        <div class="item">
                            <label class="item-left" for="7">
                                净重：
                            </label>
                            <div class="item-right">
                                <input type="age" id="7" placeholder="必填项，请输入商品净重展示使用（g）" v-model="form.goodsJz" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="8">
                                毛重：
                            </label>
                            <div class="item-right">
                                <input type="age" id="8" placeholder="必填项，运费计算使用（g）" v-model="form.goodsMz" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="9">
                                库存：
                            </label>
                            <div class="item-right">
                                <input type="age" id="9" placeholder="必填项，请填写商品库存" v-model="form.goodsKc" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="10">
                                售价：
                            </label>
                            <div class="item-right">
                                <input type="age" id="10" placeholder="必填项，请填写商品售价价格" v-model="form.goodsSx" />
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
                                <input type="text" id="11" placeholder="非必填" v-model="form.goodsDw" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="12">
                                采摘季节：
                            </label>
                            <div class="item-right">
                                <input type="text" id="12" placeholder="非必填，例如雨前/春茶之前" v-model="form.goodsJj" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="13">
                                产地：
                            </label>
                            <div class="item-right">
                                <input type="text" id="13" placeholder="非必填，例如福鼎太姥山" v-model="form.goodsCd" />
                            </div>
                        </div>
                        <div class="item">
                            <label class="item-left" for="14">
                                规格：
                            </label>
                            <div class="item-right">
                                <input type="text" id="14" placeholder="非必填，请填写商品规格" v-model="form.goodsGg" />
                            </div>
                        </div>
                        <div class="item" @click="closeUp = true">
                            <label class="item-left" for="15">
                                存储方法：
                            </label>
                            <div class="item-right">
                                <input type="text" id="15" placeholder="非必填，例如避光密封等" v-model="form.goodsCc" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn_wrapper">
            <mt-button type="primary" @click="$router.go(-1)">上一步</mt-button>
            <mt-button type="primary" :disabled="disabledBol" @click="goStep3">下一步</mt-button>
        </div>
        <mt-popup v-model="closeUp" position="bottom">
            <div class="close-wrap">
                <p class="close-tip"  v-for="(item,index) in selList" :class="{on: index === selectClass}" :key="index" @click="selectRightList(index)">{{ item }}<i class="iconfont">&#xe684;</i></p>
                <p class="close-tip" @click="cancelList">取消选择</p>
            </div>
        </mt-popup>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '',
            wxFlag: false,
            closeUp: false,
            disabledBol: true,
            form: {
                goodsName: '',
                goodsSell: '',
                goodsDw: '',
                goodsBrand: '其他品牌',
                goodsXq: '',
                goodsZw: '',
                goodsJz: '',
                goodsMz: '',
                goodsKc: '',
                goodsSj: '',
                goodsSx: '',
                goodsJj: '',
                goodsCd: '',
                goodsGg: '',
                goodsCc: '',
            },
            selIndex: {
                dw: null,
                pp: null,
                xq: null,
                zw: null
            },
            brandList: ['龙井','乌龙','冰红茶','大红袍','龙井','乌龙','冰红茶','大红袍','龙井','乌龙','冰红茶','大红袍','龙井','乌龙','冰红茶','大红袍','龙井','乌龙','冰红茶','大红袍','龙井','乌龙','冰红茶','大红袍','龙井','乌龙','冰红茶','大红袍'],
            xiangWei: ['偏淡','一般','香','高香','极香'],
            ziWei: ['偏淡','一般','浓','很浓','极浓'],
            danWei: ['美元','日元','人民币'],
            selectClass: null,
            selList: [],
            dialogBol: false,
        }
    },
    methods: {
        getParams () {
            let routerParams = this.$route.query.dataObj;
            this.msg = routerParams;
        },
        goStep3() {
            this.$router.push('/seller/newshelves3')
        },
        selectRightList(index) {
            this.selectClass = index;
            if(this.selList[this.selList.length-1] === this.brandList[this.brandList.length-1]){          // 品牌选择
                this.form.goodsBrand = this.selList[index];
                this.selIndex.pp = index;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1] === this.xiangWei[this.xiangWei.length-1]){           // 香味选择
                this.form.goodsXq = this.selList[index];
                this.selIndex.xq = index;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1] === this.ziWei[this.ziWei.length-1]){              // 滋味选择
                this.form.goodsZw = this.selList[index];
                this.selIndex.zw = index;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1] === this.danWei[this.danWei.length-1]){             // 单位选择
                this.form.goodsDw = this.selList[index];
                this.selIndex.dw = index;
                this.closeUp = false;
                return;
            }
        },
        cancelList() {
            if(this.selList[this.selList.length-1] === this.brandList[this.brandList.length-1]){          // 品牌选择
                this.form.goodsBrand = '';
                this.selIndex.pp = null;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1] === this.xiangWei[this.xiangWei.length-1]){           // 香味选择
                this.form.goodsXq = '';
                this.selIndex.xq = null;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1] === this.ziWei[this.ziWei.length-1]){              // 滋味选择
                this.form.goodsZw = '';
                this.selIndex.zw = null;
                this.closeUp = false;
                return;
            }
            if(this.selList[this.selList.length-1] === this.danWei[this.danWei.length-1]){             // 单位选择
                this.form.goodsDw = '';
                this.selIndex.dw = null;
                this.closeUp = false;
                return;
            }
        },
        clickSel(val) {
            this.closeUp = true;
            if(val === 'danwei'){
                this.selList = this.danWei;
                this.selectClass = null;
                if(this.selIndex.dw!=null){
                    this.selectClass = this.selIndex.dw;
                }
                return;
            }
            if(val === 'pinpai'){
                this.selList = this.brandList;
                this.selectClass = null;
                if(this.selIndex.pp!=null){
                    this.selectClass = this.selIndex.pp;
                }
                return;
            }
            if(val === 'xiangqi'){
                this.selList = this.xiangWei;
                this.selectClass = null;
                if(this.selIndex.xq!=null){
                    this.selectClass = this.selIndex.xq;
                }
                return;
            }
            if(val === 'ziwei'){
                this.selList = this.ziWei;
                this.selectClass = null;
                if(this.selIndex.zw!=null){
                    this.selectClass = this.selIndex.zw;
                }
                return;
            }
        }
    },
    watch: {
        '$route': 'getParams',
        'form': {
            deep: true,
            handler(val) {
                if(val.goodsName!= '' && val.goodsDw!= '' && val.goodsBrand!= '' && val.goodsJz!= '' && val.goodsMz!= '' && val.goodsKc!= '' && val.goodsSx!= ''){
                    console.log(val);
                    this.disabledBol = false;
                }
            }
        }
    },
    mounted() {
        this.getParams();
        this.wxFlag = this.$tool.isWx;
    }
}
</script>

<style lang="less">
@import '~@/styles/seller/newshelves2.less';
</style>
