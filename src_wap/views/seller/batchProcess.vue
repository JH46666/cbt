<template>
    <div class="goods_manage_wrapper batch_wrapper">
        <!-- 商品 -->
        <div class="tab-content-wrapper">
            <div class="no-shelves" v-infinite-scroll="loadMore" infinite-scroll-disabled="true" infinite-scroll-distance="10">
                <div class="good-item" v-for="item in proList">
                    <!-- 头部 caption -->
                    <div class="item-caption flex">
                        <div class="cap-l flex flex-1 align_items_c">
                            <label class="check-cir" :class="{'checked':item.checked}" @click="item.checked = !item.checked"></label>
                            <span v-if="state === 'ON_SHELF'">创建 {{item.createTime}}</span>
                            <span v-if="state === 'OFF_SHELF'">上架 {{item.createTime}}</span>
                        </div>
                        <div class="cap-r algin_r">
                            <span class="saled">已售<span class="number" v-if="item.salesNum"> {{item.salesNum}} </span><span class="number" v-else> 0 </span></span>
                            <span class="stock">库存<span class="number"> {{item.stockNum}} </span></span>
                        </div>
                    </div>
                    <!-- 中间商品 -->
                    <div class="good-info flex">
                        <div class="pro-img">
                            <img :src="item.proImg" />
                            <div v-if="item.isSoldOut == 0" class="sale-finish">已售完</div>
                        </div>
                        <div class="flex-1 pro-txt">
                            <h4 class="tit">{{item.proName}}</h4>
                            <p class="price">￥{{toFixed(item.proPrice)}}</p>
                        </div>
                    </div>
                </div>
                <div class="goods-loading" v-if="proList.length < totalPage">
                    <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                    <span class="loading-text">正在努力加载中~</span>
                </div>
                <div class="no-more" v-if="proList.length == totalPage">没有更多了呦~</div>
                <!-- <div class="get_more" @click="getMore" v-if="proList.length < totalPage">
                    点击加载更多~
                </div> -->
            </div>
        </div>
        <!-- 底部fixed栏 -->
        <div class="flex fix-bottom align_items_c">
            <div class="flex-1 flex align_items_c" style="padding-left: .3rem;">
                <label class="check-cir" :class="{checked: isAll}" @click="checkedAll"></label>
                <span>已选 (<span>{{ checkedNum }}</span>)</span>
            </div>
            <a class="delete-btn" href="javascript:void(0);" @click="deleteMethod" v-if="state === 'OFF_SHELF'">删除</a>
            <a class="rackup-btn" href="javascript:void(0);" @click="downMethod" v-if="state === 'ON_SHELF'">下架</a>
            <a class="rackup-btn" href="javascript:void(0);" @click="downMethod" v-else>上架</a>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                proList: [],
                currentPage: 1,
                totalPage: 0,
                keyWord: '',
                state: '',
                noInfinity: false,
            }
        },
        computed:{
            clearFlag(){
                if(this.searchTxt.length>0){
                    return true;
                }else{
                    return false;
                }
            },
            checkedNum() {
                let num = 0;
                for(let obj of this.proList){
                    if(obj.checked){
                        num++;
                    }
                }
                return num;
            },
            isAll() {
                let isTrue = this.proList.every((item) =>{
                    return item.checked === true
                })
                if(isTrue){
                    return true;
                }else{
                    return false;
                }
            },
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','批量处理');
            this.state = this.$route.query.state;
            this.keyWord = this.$route.query.keyWord;
            this.getList(this.currentPage,this.state).then((res) => {
                this.proList = res.data;
                this.totalPage = res.total_record;
                for(let obj of this.proList){
                    this.$set(obj,'checked',false);
                }
            })
        },
        methods:{
            loadMore() {
                try {
                    if(this.proList.length < this.totalPage){
                        this.currentPage++;
                        this.getList(this.currentPage,this.state).then((res) =>{
                            let timeData = res.data;
                            for(let obj of timeData){
                                this.$set(obj,'checked',false);
                            }
                            this.proList = this.proList.concat(timeData);
                            if(this.proList.length === this.totalPage){
                                this.currentPage--;
                            }
                        })
                    }
                } catch (e) {

                }
            },
            downMethod() {
                let checkedId = [];
                for(let obj of this.proList){
                    if(obj.checked){
                        checkedId.push(obj.proExtId)
                    }
                }
                let states = 'ON_SHELF';
                if(this.state === 'ON_SHELF'){
                    states = 'OFF_SHELF';
                }
                let data = {
                    sysId: 1,
                    state: states,
                    proExtIds: checkedId.join(',')
                }
                this.upOrDown(data).then(res => {
                    if(this.state === 'ON_SHELF'){
                        Toast({
                            message: '商品下架成功',
                            iconClass: 'icon icon-success'
                        });
                    }else{
                        Toast({
                            message: '商品上架成功',
                            iconClass: 'icon icon-success'
                        });
                    }
                    setTimeout(() => {
                        window.location.reload();
                    },500)
                })
            },
            upOrDown(data) {
                return new Promise((resolve,reject) => {
                    this.$api.post('/oteao/productInfo/modifyOrgProInfoState',data,res => {
                        resolve(res);
                    },res=>{
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            deleteMethod() {
                let checkedId = [];
                for(let obj of this.proList){
                    if(obj.checked){
                        checkedId.push(obj.proExtId)
                    }
                }
                let data = {
                    proExtIds: checkedId.join(',')
                }
                this.deleteM(data).then(res => {
                    Toast({
                        message: '商品删除成功',
                        iconClass: 'icon icon-success'
                    });
                    setTimeout(() => {
                        window.location.reload();
                    },500)
                })
            },
            deleteM(data) {
                return new Promise((resolve,reject) => {
                    this.$api.post('/oteao/productInfo/deleteFrontOrgProduct',data,res => {
                        resolve(res);
                    },res=>{
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            getMore() {
                this.currentPage++;
                if(this.state === 'ON_SHELF'){
                    this.getList(this.currentPage,this.state).then((res) => {
                        let result = res.data;
                        for(let obj of result){
                            this.$set(obj,'checked',false);
                        }
                        this.proList = this.proList.concat(result);
                    })
                }else{
                    this.getList(this.currentPage,this.state).then((res) => {
                        let result = res.data;
                        for(let obj of result){
                            this.$set(obj,'checked',false);
                        }
                        this.proList = this.proList.concat(result);
                    })
                }
            },
            checkedAll() {
                let isTrue = this.proList.every((item) =>{
                    return item.checked === true
                })
                if(isTrue){
                    for(let obj of this.proList){
                        obj.checked = false;
                    }
                }else{
                    for(let obj of this.proList){
                        obj.checked = true;
                    }
                }
            },
            getList(pages,states) {
                let data = {
                        'page.pageNumber': pages,
                        'page.pageSize': 20,
                        'pro.sysId': 1,
                        'pro.device': 'WAP',
                        'pro.state': states,
                        'pro.seachKey': this.keyWord
                    }
                return new Promise((resolve,reject) => {
                    this.$api.post('/oteao/productInfo/seachFrontOrgProduct',data,res => {
                        resolve(res);
                    },res=>{
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            //保留两位小数
            toFixed(num) {
                if(isNaN(num)) {
                    return '0.00'
                }else{
                    return Number(num).toFixed(2);
                }
            },
        },
    }
</script>
<style lang="less">
    @import '~@/styles/seller/goodsManage.less';
</style>
