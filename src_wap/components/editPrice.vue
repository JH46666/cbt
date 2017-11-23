<template>
    <div class="cbt-editprice" v-show="pannelShow" @click.self="close('cancel')">
        <transition name="down-slow" model="out-in">
            <div class="editprice-wrap " ref="pannel" v-show="mainShow">
                <h4 class="title">修改价格</h4>
                <div class="input-wrap">
                    <div class="input-row" :class="{error:goodsPriceVali}">
                        <label><span class="input-head">商品价格</span><input type="number" v-model="goodsPrice"/><span>元</span></label>
                    </div>
                    <div class="input-row" :class="{error:expressPriceVali}">
                        <label><span class="input-head">运费</span><input type="number" v-model="expressPrice"/><span>元</span></label>
                    </div>
                </div>
                <div class="btnwrap">
                    <mt-button type="default" @click="close('cancel')">取消</mt-button><mt-button type="default"@click="close('confirm')">确定</mt-button>
                </div>
            </div>
        </transition>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                goodsPrice: null,
                expressPrice: null,
                pannelShow: true,
                mainShow: false,
                goodsPriceVali: false,
                expressPriceVali: false
            }
        },
        methods: {
            close(status) {
                
                if(status === 'cancel') {
                    this.mainShow = false;
                    setTimeout(() => {
                        this.pannelShow = false;
                        return this.callBack({type:status})
                    },200)
                } else if(this.validate()){
                    this.mainShow = false;
                    setTimeout(() =>{
                        this.pannelShow = false;
                        this.callBack({type:status,goodsPrice:this.goodsPrice,expressPrice: this.expressPrice})
                    },200)
                }

            },
            validate() {
                let validated = true;
                if(this.goodsPrice === null) {
                    this.goodsPriceVali = true
                    validated = false;
                }
                if(this.expressPrice === null) {
                    this.expressPriceVali = true
                    validated = false;
                }
                if(!Number(this.goodsPrice)) {
                    this.goodsPriceVali = true
                    validated = false;
                }
                if(!Number(this.expressPrice)) {
                    this.expressPriceVali = true
                    validated = false;
                }

                return validated;
            }
        },
        mounted() {
            setTimeout(() => {
                this.mainShow = true;
            }, 200);
        }
    }
</script>

