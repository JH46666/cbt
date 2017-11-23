<template>
    <div class="freight_wrapper">
        <div class="caption flex">
            <p>全国包邮，除以下省份</p>
        </div>
        <div class="f5-2"></div>
        <div class="input-box">
            <div class="input-item">
                <div class="input-inner no-free clearfix">
                    <span class="color_6 lab" style="float:left;">不包邮省份</span>
                    <p class="cities empty" v-if="cities.length==0">请选择</p>
                    <p class="cities" v-else>{{cities}}</p>
                    <a class="r-select" href="javascript:void(0);" @click="popupVisible=true"><i class="iconfont color_ad">&#xe744;</i></a>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner">
                    <span class="flex-1 color_6">首重(1kg)</span>
                    <input class="algin_r" type="text" name="" value="" placeholder="请输入首重运费">
                    <span>元</span>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner">
                    <span class="flex-1 color_6">续重（每增加1kg增加）</span>
                    <input class="algin_r" type="text" name="" value="" placeholder="请输入金额">
                    <span>元</span>
                </div>
            </div>
            <div class="input-item">
                <div class="flex input-inner no-border">
                    <span class="flex-1 color_6">购满包邮</span>
                    <input class="algin_r" type="text" name="" value="" placeholder="不填默认不包邮">
                    <span>元</span>
                </div>
            </div>
        </div>
        <div class="f5-2"></div>
        <div class="add-box">
            <a class="add-btns" href="javascript:void(0);"><i class="iconfont">&#xe67a;</i>添加指定省份运费</a>
        </div>
        <div class="save-box">
            <a class="add-btns" href="javascript:void(0);">保存</a>
        </div>
        <!-- 选择省份弹窗 -->
        <mt-popup v-model="popupVisible" position="right" class="popup-city">
            <mt-header title="选择省份" class="cbt-header">
                <mt-button icon="back" slot="left" @click="popupVisible=false">返回</mt-button>
                <mt-button icon="more" slot="right"></mt-button>
            </mt-header>
            <div class="pop-content">
                <div class="city-box often-box">
                    <h4 class="city-caption flex align_items_c" :name="countOftenCity">
                        <label class="checkir-cir" :class="{'checked':oftenAllFlag}" @click="handleAllOften"></label> 
                        <span>常用不包邮省份</span>
                    </h4>
                    <div class="city-inner clearfix">
                        <a class="city-item" href="javascript:void(0);" v-for="item in citiesNames" :class="{on:checkedNames1.indexOf(item.id)>=0}">
                            <label>
                                <input type="checkbox" :id="item.id" :value="item.id" v-model="checkedNames1" hidden>
                                <span>{{item.name}}</span>
                            </label>
                        </a>
                    </div>
                </div>
                <div class="city-box other-box">
                    <h4 class="city-caption flex align_items_c" :name="countOtherCity">
                        <label class="checkir-cir" :class="{'checked':otherAllFlag}" @click="handleAllOther"></label>
                        <span>常用不包邮省份</span>
                    </h4>
                    <div class="city-inner clearfix">
                        <a class="city-item" href="javascript:void(0);" v-for="item in otherNames" :class="{on:checkedNames2.indexOf(item.id)>=0}">
                            <label>
                                <input type="checkbox" :id="item.id" :value="item.id" v-model="checkedNames2" hidden>
                                <span>{{item.name}}</span>
                            </label>
                        </a>
                    </div>
                </div>
            </div>
            <div class="f-b">
                <div class="flex">
                    <div class="flex-1 flex align_items_c">
                        <label class="checkir-cir"></label>
                        <span class="color_6">已选<span class="color_f08">5</span>款</span>
                    </div>
                    <div class="selected-btn">
                        <a href="javascript:void(0);">选好了</a>
                    </div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                cities: "",   // 选中的不包邮城市
                popupVisible: false,  //弹窗是否显示
                oftenAllFlag: false,   //常用城市是否全选
                otherAllFlag: false,   //其他城市是否全选
                countOften: 0,
                countOther: 0,
                checkedNames1: [],     //选中的城市
                checkedNames2: [],     //选中的城市
                citiesNames:[        //常用不包邮省份
                    {
                        name: '北京',
                        id: 1
                    },
                    {
                        name: '上海',
                        id: 2
                    },
                    {
                        name: '河北',
                        id: 3
                    },
                    {
                        name: '山东',
                        id: 4
                    },
                    {
                        name: '河北',
                        id: 5
                    },
                    {
                        name: '山东',
                        id: 6
                    }
                ],       
                otherNames:[        //其他省份
                    {
                        name: '北京',
                        id: 1
                    },
                    {
                        name: '上海',
                        id: 2
                    },
                    {
                        name: '河北',
                        id: 3
                    },
                    {
                        name: '山东',
                        id: 4
                    },
                    {
                        name: '河北',
                        id: 5
                    },
                    {
                        name: '山东',
                        id: 6
                    }
                ], 
            }
        },
        created(){

        },
        computed:{
            countOftenCity(){
                this.countOften = this.checkedNames1.length;
                return this.countOften;
            },
            countOtherCity(){
                this.countOther = this.checkedNames2.length;
                return this.countOther;
            }
        },
        methods:{
            handleAllOften(){
                let arr = [];
                if(this.oftenAllFlag){
                    console.log(this.oftenAllFlag);
                    this.checkedNames1 = [];
                }else{
                    for(let item of this.citiesNames){
                        arr.push(item.id);
                    }
                    this.checkedNames1 = arr;
                }
                this.oftenAllFlag = !this.oftenAllFlag;
            },
            handleAllOther(){
                let arr = [];
                if(this.otherAllFlag){
                    this.checkedNames2 = [];
                }else{
                    for(let item of this.otherNames){
                        arr.push(item.id);
                    }
                    this.checkedNames2 = arr;
                }
                this.otherAllFlag = !this.otherAllFlag;
            }
        },
        watch:{
            countOften(val){
                if(val == this.citiesNames.length){
                    this.oftenAllFlag = true;
                }else{
                    this.oftenAllFlag = false;
                }
            },
            countOther(val){
                if(val == this.otherNames.length){
                    this.otherAllFlag = true;
                }else{
                    this.otherAllFlag = false;
                }
            }
        }
    }
</script> 
<style lang="less">
    @import '~@/styles/seller/freight.less';
</style>