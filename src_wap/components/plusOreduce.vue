<template>
    <div class="plusOreduce">
        <span class="reduce btn" @click="reduceMethod">-</span>
        <input v-model.number="num" type="number" class="countNum" disabled>
        <span class="plus btn" @click="plusMethod">+</span>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    name: 'plusOreduce',
    data() {
        return {
            num: 0
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
            console.log(this.maxNum);
            this.num++;
            if(this.num > this.maxNum){
                this.num = this.maxNum;
                Toast({
                    message: '您需购买的数量超出商品的现有库存！',
                    position: 'bottom',
                    duration: 2000
                });
            }
            this.$emit('countNum',this.num);
        },
        reduceMethod() {
            this.num--;
            if(this.num < 0){
                this.num = 0;
            }
            this.$emit('countNum',this.num);
        }
    }
}
</script>

