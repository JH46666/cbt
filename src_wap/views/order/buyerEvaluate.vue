<template lang="html">
    <div class="evaluate">
        <div class="evaluate_head" :class="{ 'on': !wxFlag }">
            <div class="count">
                共<span>4</span>件商品，<span>请至少对一件商品进行评价~</span>
            </div>
            <div class="submit">
                <mt-button type="primary">提交</mt-button>
            </div>
        </div>
        <div class="evaluate_content">
            <div class="evaluate_item">
                <div class="evaluate_item_wrapper">
                    <div class="star_head">
                        <div class="star_head_img">
                            <img src="../../assets/ev.png" />
                        </div>
                        <div class="star_head_icon">
                            <span class="star" v-for="index in 5" :class="{on: index <= hasNum1}" @click="hasStar1(index)" :key="index"></span>
                        </div>
                    </div>
                    <div class="text_content">
                        <textarea name="name" rows="5" maxlength="200" placeholder="分享你的感受，就有机会获得积分哦~" v-model="text1"></textarea>
                        <div class="text_num">
                            <span>{{ text1.length }}</span>/200
                        </div>
                    </div>
                </div>
            </div>
            <div class="evaluate_item">
                <div class="evaluate_item_wrapper">
                    <div class="star_head">
                        <div class="star_head_img">
                            <img src="../../assets/ev.png" />
                        </div>
                        <div class="star_head_icon">
                            <span class="star" v-for="index in 5" :class="{on: index <= hasNum2}" @click="hasStar2(index)" :key="index"></span>
                        </div>
                    </div>
                    <div class="text_content">
                        <textarea name="name" rows="5" maxlength="200" placeholder="分享你的感受，就有机会获得积分哦~" v-model="text2"></textarea>
                        <div class="text_num">
                            <span>{{ text2.length }}</span>/200
                        </div>
                    </div>
                </div>
            </div>
            <div class="evaluate_item">
                <div class="evaluate_item_wrapper">
                    <div class="star_head">
                        <div class="star_head_img">
                            <img src="../../assets/ev.png" />
                        </div>
                        <div class="star_head_icon">
                            <span class="star" v-for="index in 5" :class="{on: index <= hasNum3}" @click="hasStar3(index)" :key="index"></span>
                        </div>
                    </div>
                    <div class="text_content">
                        <textarea name="name" rows="5" maxlength="200" placeholder="分享你的感受，就有机会获得积分哦~" v-model="text3"></textarea>
                        <div class="text_num">
                            <span>{{ text3.length }}</span>/200
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            wxFlag: false,
            hasNum1: 0,
            hasNum2: 0,
            hasNum3: 0,
            text1: '',
            text2: '',
            text3: '',
        }
    },
    head: {
        title: {
          inner: '订单评论'
        }
    },
    methods: {
        hasStar1(index) {
            this.hasNum1 = index;
        },
        hasStar2(index) {
            this.hasNum2 = index;
        },
        hasStar3(index) {
            this.hasNum3 = index;
        }
    },
    mounted () {
       this.wxFlag = this.$tool.isWx;
  　},
    beforeRouteLeave(next) {
        MessageBox({
            title: '提示',
            message: '确定放弃评价?',
            confirmButtonText: '确认放弃',
            showCancelButton: true
        })
        MessageBox.confirm('确认放弃评价?').then(action => {
            console.log(11111);
        },action => {
            console.log(22222);
        },);


    },
}
</script>

<style lang="less">
@import '~@/styles/order/evaluate.less';
</style>
