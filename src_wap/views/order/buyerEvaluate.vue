<template lang="html">
    <div class="evaluate">
        <div class="evaluate_head" :class="{ 'on': !wxFlag }">
            <div class="count">
                共<span>{{ imgUrlList.length }}</span>件商品<span v-if="imgUrlList.length > 1">，请至少对1件商品进行评价~</span>
            </div>
            <div class="submit">
                <mt-button type="primary" @click="postEvel" :disabled="postDisAble">提交</mt-button>
            </div>
        </div>
        <div class="evaluate_content">
            <div class="evaluate_item" v-for="(item,index) in imgUrlList" :key="index">
                <div class="evaluate_item_wrapper">
                    <div class="star_head">
                        <div class="star_head_img">
                            <img :src="item.imgUrl" />
                        </div>
                        <div class="star_head_icon">
                            <span class="star" v-for="star in 5" :class="{on: star <= item.stars}" @click="hasStar(star,item)" :key="star"></span>
                        </div>
                        <div class="star_head_text">
                            {{ item.text }}
                        </div>
                    </div>
                    <div class="text_content">
                        <textarea name="name" rows="5" maxlength="200" placeholder="分享你的感受，就有机会获得积分哦~" v-model="item.content"></textarea>
                        <div class="text_num">
                            <span>{{ item.content.length }}</span>/200
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox,Toast } from 'mint-ui';
import { mapState } from 'vuex'
import store from 'store';
import $api from 'api';
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
            imgList: [],
            orderId: '',
            imgUrlList: [],
            flag: false,
            textMs: {
                1: '非常差',
                2: '差',
                3: '一般',
                4: '好',
                5: '非常好'
            },
            starIndex: null,
        }
    },
    head: {
        title() {
            return {
                inner : '订单评论'
            }
        }
    },
    computed: {
        postDisAble() {
            for(let obj of this.imgUrlList){
                if(obj.content != '' && obj.stars != 0){
                    return false;
                }
            }
            return true;
        }
    },
    methods: {
        postEvel() {
            let data = {
                "evaluationInfos": [],
                "overallEvaluation": {
                    "orderId": this.orderId
                }
            }
            for(let obj of this.imgUrlList){
                if(obj.content != '' && obj.stars != 0){
                    data.evaluationInfos.push({
                        "content": obj.content,
                        "proExtId": obj.extendId,
                        "proSku": obj.sku,
                        "score": obj.stars
                    })
                }
            }
            return new Promise((resolve,reject) => {
                this.$api.post('/oteao/evaluation/saveEvaluation',JSON.stringify(data),res => {
                    this.flag = true;
                    Toast({
                        message: res.message,
                        iconClass: 'icon icon-success'
                    });
                    setTimeout(()=>{
                        this.$router.push({
                            name: '订单列表',
                            query: {
                                orderStatus: 'null'
                            }
                        })
                    },300)
                },res=>{
                    if(res.code == 1001){
                        return Toast({
                            message: '请至少填写5个字的评价',
                            iconClass: 'icon icon-fail'
                        });
                    }else{
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    }
                })
            })
        },
        hasStar(index,obj) {
            this.starIndex = index;
            obj.stars = index;
            obj.text = this.textMs[index];
        },
        getOrderProList(orderId) {
            let data = {
                    orderId: orderId,
                    device: 'WAP'
                }
            return new Promise((resolve,reject) => {
                this.$api.post('/oteao/order/orderProductList',data,res => {
                    resolve(res);
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                })
            })
        },
    },
    created() {
        // 设置title
        this.$store.commit('SET_TITLE','订单评价');

        this.orderId = this.$route.query.orderId;
        this.getOrderProList(this.orderId).then((res) => {
            if(res.data.mainOrder!=null){
                let imgList = res.data.mainOrder.products;
                let postList = [];
                for(let obj of imgList){
                    postList.push({
                        imgUrl: obj.imageUrl,
                        content: '',
                        stars: 0,
                        sku: obj.proSku,
                        extendId: obj.proExtId,
                        text: ''
                    })
                }
                this.imgUrlList = postList;
            }else{
                let postList = [];
                for(let i=0;i < res.data.subOrder.length; i++){
                    for(let j=0; j< res.data.subOrder[i].products.length; j++){
                        postList.push({
                            imgUrl: res.data.subOrder[i].products[j].imageUrl,
                            content: '',
                            stars: 0,
                            sku: res.data.subOrder[i].products[j].proSku,
                            extendId: res.data.subOrder[i].products[j].proExtId,
                            text: ''
                        })
                    }
                }
                this.imgUrlList = postList;
            }
        })
    },
    mounted () {
       this.wxFlag = this.$tool.isWx;
  　},
    beforeRouteLeave(to, from, next) {
        if(!this.postDisAble && !this.flag){
            this.$messageBox({
                title:'提示',
                message:`确定放弃评价?`,
                showCancelButton: true,
                cancelButtonText: '放弃评价',
                confirmButtonText: '继续评价'
            }).then(res => {
                if(res === 'cancel') {
                    next();
                } else {
                    return;
                }
            })
        }else{
            next();
        }
    },
    beforeRouteEnter(to, from, next) {
        if(store.state.member.member.id) {
            next();
        } else {
            store.dispatch('getMemberData').then(res => {
                next();
            }).catch(res =>{
                next(vm => {
                    vm.router.push('/login')
                })
            })
        }
    }
}
</script>

<style lang="less">
@import '~@/styles/order/evaluate.less';
</style>
