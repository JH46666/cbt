<template lang="html">
    <div class="newshelves">
        <div class="shelves_step">
            <div class="step on">
                <span>1</span>选择品类
            </div>
            <div class="step">
                <span>2</span>填写信息
            </div>
            <div class="step">
                <span>3</span>上传图片
            </div>
        </div>
        <div class="shelves_type" @click="selectType">
            <div><i class="iconfont">&#xe67f;</i>品类选择</div>
            <div v-if="!isSure">请选择<i class="iconfont">&#xe744;</i></div>
            <div class="on" v-if="isSure">{{ typeName }}</div>
        </div>
        <div class="shelves_second_type" :class="{on: isSure ,'wxClass': !wxFlag}">
            <div class="shelves_second_type_wrapper">
                <div class="shelves_second_type_head">
                    选择二级分类
                    <span v-if="secondTypeName!=''">{{ secondTypeName }}</span>
                </div>
                <div class="shelves_second_type_content">
                    <div class="shelves_second_type_content_wrapper">
                        <div class="shelves_second_type_content_item" :class="{on: index === secondClass}" v-for="(item,index) in secondList" :key="index" @click="selectSecondType(item,index)">
                            <div class="item_img">
                                <img :src="item.imgUrl" />
                            </div>
                            <div class="item_name">
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn_wrapper">
            <mt-button type="primary" :disabled="stepBol" @click.native="goStep2">下一步</mt-button>
        </div>
        <div class="dialog" :class="{on: typeDialog}">
            <div class="dialog_wrapper">
                <div class="dialog_head">
                    选择品类
                </div>
                <div class="dialog_content">
                    <div class="dialog_content_wrapper">
                        <input type="hidden" v-model="typeName" />
                        <div class="item" v-for="(item,index) in listType" :key="index" :class="{on: index === selClass}" @click="selectClass(item,index)">{{ item }}</div>
                    </div>
                </div>
                <div class="dialog_foot">
                    <mt-button type="primary" @click="cancelMethod">取消</mt-button>
                    <mt-button type="primary" @click="sureMethod">确定</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            wxFlag: false,
            stepBol: true,
            listType: ['乌龙茶','花茶','乌龙茶','花茶','乌龙茶','花茶','乌龙茶','花茶','乌龙茶','花茶','乌龙茶','花茶'],
            selClass: null,
            typeDialog: false,
            typeName: '',
            isSure: false,
            secondList: [
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'},
                {name: '冰红茶',imgUrl: '../src_wap/assets/second_type.png'}
            ],
            secondClass: null,
            secondTypeName: '',
        }
    },
    methods: {
        goStep2() {
            this.$router.push({
                path: '/seller/newshelves-2',
                query: {
                    name: 'select',
                    dataObj: this.typeName +'-'+ this.secondTypeName
                }
            });
        },
        selectType() {
            this.typeDialog = true;
        },
        selectClass(item,index) {
            this.selClass = index;
            this.typeName = item;
        },
        cancelMethod() {
            this.typeDialog = false;
            this.typeName = '';
        },
        sureMethod() {
            this.typeDialog = false;
            this.isSure = true;
        },
        selectSecondType(item,index) {
            this.secondClass = index;
            this.secondTypeName = item.name;
        }
    },
    watch: {
        secondTypeName(val) {
            if(val != ''){
                this.stepBol = false;
            }
        }
    },
    mounted () {
       this.wxFlag = this.$tool.isWx;
  　}
}
</script>

<style lang="less">
@import '~@/styles/seller/newshelves1.less';
</style>
