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

<style lang="less">
@import '~@/styles/base/tools.less';
.plusOreduce{
    display: inline-block;
    .fontSize(0);
    span{
        display: inline-block;
        width: .5rem;
        height: .5rem;
        border: 1px solid #e5e5e5;
        .bg(#fff);
        .color(#333);
        .line(.5rem);
        .algin(c);
        cursor: pointer;
        .fontSize(.3rem);
        vertical-align: top;
        &.plus{
            border-radius: 0 3px 3px 0;
        }
        &.reduce{
            border-radius: 3px 0 0 3px;
        }
    }
    input{
        display: inline-block;
        width: .8rem;
        height: .5rem;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        .bg(#fff);
        .color(#333);
        .line(.5rem);
        .algin(c);
        vertical-align: top;
        .fontSize(.24rem);
    }
}
</style>
