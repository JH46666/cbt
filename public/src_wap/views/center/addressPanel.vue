<template>
    <div class="address-pannel">
        <div class="select-address">
            <div class="select-top">
                <div class="left">
                    <mt-navbar v-model="selected">
                        <mt-tab-item id="1">省份</mt-tab-item>
                        <mt-tab-item id="2">城市</mt-tab-item>
                        <mt-tab-item id="3">区县</mt-tab-item>
                    </mt-navbar>
                </div>
                <div class="right">
                    <span @touchend="confirm">确定</span>
                </div>
            </div>
            <div class="select-bottom">
                <div class="select-wrap" v-show="selected == 1" key="1">
                    <div class="select-cell" v-for="(item,index) in provinceList" :key="index" :class="{active:select.provinceCode === item.code}" @click="check('1',item.code)">
                        {{item.regionName}}
                    </div>
                </div>
                <div class="select-wrap" v-show="selected == 2" key="2">
                    <div class="select-cell" v-for="(item,index) in cityList" :key="index" :class="{active:select.cityCode === item.code}" @click="check('2',item.code)">
                        {{item.regionName}}
                    </div>
                </div>
                <div class="select-wrap" v-show="selected == 3" key="3">
                    <div class="select-cell" v-for="(item,index) in areaList" :key="index" :class="{active:select.areaCode === item.code}" @click="check('3',item.code)">
                        {{item.regionName}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'addressPannel',
        props: {
            provinceCode: {
                type: String,
                default: '110000'
            },
            cityCode: {
                type: String,
                default: '110100'
            },
            areaCode: {
                type: String,
                default: '110101'
            }
        },
        data() {
            return {
                selected: '1',
                select: {
                    provinceCode: this.provinceCode,
                    cityCode: this.cityCode,
                    areaCode: this.areaCode
                }
            }
        },
        watch: {
            provinceCode(val) {
                this.select.provinceCode = val;
            },
            cityCode(val) {
                this.select.cityCode = val;
            },
            areaCode(val) {
                this.select.areaCode = val;
            }
        },
        computed: {
            // 基础数据
            baseData() {
                if(this.$store.state.address.data.length === 0) {
                    this.$store.dispatch('getAddress');
                }
                return this.$store.state.address.data;
            },
            // 省数据
            provinceList() {
                return this.baseData;
            },
            cityList() {
                try {
                    let data = this.provinceList.filter(val => val.code === this.select.provinceCode);
                    data = data[0].childs === null ? [] : data[0].childs;
                    let isTrue = data.some(val => val.code === this.select.cityCode);
                    if(!isTrue) {
                        this.select.cityCode = data[0] ? data[0].code : '';
                    }
                    return data
                } catch (error) {
                    return []
                }
                
            },
            areaList() {
                try {
                    let data = this.cityList.filter(val => val.code === this.select.cityCode);
                    data = data[0].childs === null ? [] : data[0].childs;
                    let isTrue = data.some(val => val.code === this.select.areaCode);
                    if(!isTrue) {
                        this.select.areaCode = data[0] ? data[0].code : '';
                    }
                    return data
                } catch (error) {
                    return []
                }
            }
        },
        methods: {
            check(selected,code) {
                if(selected === '1') {
                    this.select.provinceCode = code;
                    this.selected = '2'
                } else if(selected === '2') {
                    this.select.cityCode = code;
                    this.selected = '3'
                } else {
                    this.select.areaCode = code;
                }
            },
            confirm() {
                this.$nextTick(() =>{
                    this.$emit('getAllData',this.getData())
                })
            },
            getData() {
                let obj = {};

                for (let attr in this.select) {
                    obj[attr] = this.select[attr]
                }

                this.provinceList.forEach(val => obj.provinceCode === val.code ? obj.provinceName = val.regionName : void(0))
                this.cityList.forEach(val => obj.cityCode === val.code ? obj.cityName = val.regionName : void(0))
                this.areaList.forEach(val => obj.areaCode === val.code ? obj.areaName = val.regionName : void(0))
                obj.address = obj.provinceName + obj.cityName + obj.areaName;
                
                return obj
            }
        }
    }    
</script>




<style lang="less" scoped>
    @import url('~@/styles/center/editAddress.less');
</style>