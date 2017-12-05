<template>
    <div class="plusOreduce">
        <span class="reduce btn" @click="reduceMethod">-</span>
        <input v-model.number="num" type="tel" class="countNum">
        <span class="plus btn" @click="plusMethod">+</span>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    name: 'plusOreduce',
    data() {
        return {
            num: 1
        }
    },
    props: {
        maxNum: {
            type: Number,
            default: 99
        }
    },
    methods: {
        plusMethod() {
            this.num++;
            if(this.num > this.maxNum){
                this.num = this.maxNum;
                Toast({
                    message: '您需购买的数量超出商品的现有库存！',
                    position: 'center',
                    duration: 500
                });
            }
            this.$emit('countNum',this.num);
        },
        reduceMethod() {
            this.num--;
            if(this.num < 1){
                this.num = 1;
            }
            this.$emit('countNum',this.num);
        }
    },
    watch: {
        num(val) {
            if(val!=''){
                let reg = /^[1-9]\d*$/;
                if(!reg.test(val)){
                    Toast({
                        message: '请输入大于等于1的正整数',
                        position: 'center',
                        duration: 500
                    });
                    this.num = Math.floor(this.num);
                }else{
                    if(parseInt(val) > this.maxNum){
                        Toast({
                            message: '您需购买的数量超出商品的现有库存！',
                            position: 'center',
                            duration: 500
                        });
                        this.num = this.maxNum;
                    }
                }
            }else{
                Toast({
                    message: '请输入大于等于1的正整数',
                    position: 'center',
                    duration: 500
                });
                this.num = 1;
            }
        }
    }
}
</script>
