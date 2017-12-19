<template>
    <div class="category_wrapper">
        <!-- 搜索框 -->
        <div class="flex search-box" :class="{'wx-search': wxFlag}">
            <div class="logo-img">
                <img src="../../assets/images/logo.png" alt="">
            </div>
            <div class="flex-1 flex search-inner">
                <div class="search-txt">
                    <input type="text" readonly v-model="searchTxt" placeholder="搜索您喜欢的好茶！" @click="goSearch">
                    <a href="javascript:void(0)" class="clear-txt" v-show="clearFlag" @click="clearTxt">
                        <i class="iconfont">&#xe651;</i>
                    </a>
                </div>
                <a class="flex-1 search-btn" href="javascript:void(0)">
                    <i class="iconfont">&#xe649;</i>
                </a>
            </div>
        </div>
        <!-- 一级 -->
        <div class="first-box" :class="{'wx-first': wxFlag}">
            <ul class="first-cat flex" ref="wrapper">
                <li class="cat-item" :class="{on: index==activeCatIndex}" v-for="(cat,index) in firstCat" @click="searchFirstCat(index,cat.id,$event.target)">
                    <span>{{cat.catName}}</span>
                </li>
            </ul>
            <div class="half-bg"></div>
        </div>
        <!-- 分类 -->
        <div class="main-floor">
            <!-- 二级 -->
            <div class="sub-box flex">
                <div class="sub-left ipScroll">
                    <ul>
                        <li v-for="(subItem,index) in subCat" class="sub-item flex align_items_c" :class="{'on':index==activeSubIndex}" @click="searchSub(index,subItem.id)">
                            <span>{{subItem.catName}}</span>
                        </li>
                    </ul>
                </div>
                <div class="flex-1 content-r">
                    <div class="content-inner ipScroll">
                        <div class="condition-box">
                            <ul class="flex">
                                <li @click="filterVisible = true" :class="{on: filterFlag}"><i class="iconfont">&#xe674;</i>筛选</li>
                                <li @click="sortVisible = true" :class="{on: sortData[0].sortIndex!=0}"><i class="iconfont">&#xe673;</i>排序</li>
                            </ul>
                        </div>
                        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="true" infinite-scroll-distance="10">
                            <goods-item v-for="item of resultData" :key="item.id"
                                :link="item.proSku"
                                :mainTit="item.proTitle"
                                :subTit="item.subTitle"
                                :price="item.proPrice"
                                :imgUrl="item.proImg"
                                :tagUrl="item.tagImgUrl"
                                :aromaStar="item.aromaStar"
                                :aromaName="item.aromaVal"
                                :tasteStar="item.tasteStar"
                                :businessType="item.tagNum"
                                :tasteName="item.tasteVal"
                                :isLogin="$tool.isLogin()"
                                imgWidth="1.56rem">
                            </goods-item>
                        </div>
                        <div class="goods-loading" v-if="loading">
                            <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                            <span class="loading-text">正在努力加载中</span>
                        </div>
                        <div class="no-more" v-if="nomore">没有更多了呦</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 筛选弹窗 -->
        <div class="mupop_dialog" :class="{on: filterVisible}">
            <div class="mup_bg" @click="filterVisible = false"></div>
            <div class="mupop_dialog_wrapper">
                <div class="popup-content">
                    <div class="con-item" v-for="list in filterConditions">
                        <h4>{{list.propName}}</h4>
                        <ul class="clearfix">
                            <li :class="{on:index == list.filterIndex}" v-for="(item,index) in list.propValList" @click="selectFilter(list,item,index)">{{item.propVal}}</li>
                        </ul>
                    </div>
                </div>
                <div class="pop-btns flex">
                    <a class="flex-1" href="javscript:void(0)" @click="resetConditions">重置</a>
                    <a class="flex-1 confirm" href="javscript:void(0)" @click="confirmConditions">确定</a>
                </div>
            </div>
        </div>
        <!-- 排序弹窗 -->
        <div class="mupop_dialog" :class="{on: sortVisible}">
            <div class="mup_bg" @click="sortVisible = false"></div>
            <div class="mupop_dialog_wrapper">
                <div class="popup-content">
                    <div class="con-item" v-for="list in sortData">
                        <h4>{{list.sortName}}</h4>
                        <ul class="clearfix">
                            <li :class="{on:index == list.sortIndex}" v-for="(item,index) in list.sortConditions" @click="selectSort(list,item,index)" v-if="item.propVal!='库存'">{{item.propVal}}</li>
                        </ul>
                    </div>
                </div>
                <div class="pop-btns flex">
                    <a class="flex-1" href="javscript:void(0)" @click="resetSort">重置</a>
                    <a class="flex-1 confirm" href="javscript:void(0)" @click="confirmConditions">确定</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import store from 'store';
    import { InfiniteScroll } from 'mint-ui';
    export default{
        data(){
            return {
                wxFlag: false,
                filterVisible: false,  //筛选弹窗是否显示
                sortVisible: false,   //排序弹窗是否显示
                searchTxt: "",        //搜索内容
                activeCatIndex: 0,   //激活的一级分类下标
                activeSubIndex: 0,   //激活的二级分类下标
                activeCatId: 0,      //激活的一级分类id
                activeSubId: 0,      //激活的二级分类id
                catTree:[],          //分类树
                firstCat:[],         //一级分类
                allSubCat:[],
                subCat:[],
                filterConditions:[],   //筛选条件
                propertiesValList:{},  //筛选属性值
                resultData:[],         //查询结果
                pageNumber: 1,
                pageSize: 5,
                totalSize: 0,
                sortDesc: true,      //排序
                sort: 4,
                filterFlag: false,
                sortData:[{
                    sortName: '排序',
                    sortIndex: 0,
                    sortConditions:[
                        {
                            propVal: '销量',
                            propId: 4
                        },
                        {
                            propVal: '价格高到低',
                            propId: 3
                        },
                        {
                            propVal: '价格低到高',
                            propId: 3
                        },
                        {
                            propVal: '新品',
                            propId: 2
                        },
                        {
                            propVal: '库存',
                            propId: 1
                        }
                    ]
                }]
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
            nomore() {
                try {
                    if(this.resultData.length === this.totalSize) {
                        return true
                    } else {
                        return false
                    }
                } catch (error) {
                    return false
                }
            },
            loading() {
                try {
                    if(this.resultData.length < this.totalSize) {
                        return true
                    } else {
                        return false
                    }
                } catch (error) {
                    return true
                }
            }
        },
        created(){
            // 设置title
            this.$store.commit('SET_TITLE','分类');

            this.$api.get('/oteao/proCat/queryCatTree',{sysId: 1},res=>{
                this.catTree = res.data[0].children;
                this.subCat = this.catTree[0].children;
                for(let item of this.catTree){
                    this.firstCat.push({
                        'id': item.id,
                        'catName': item.catName
                    });
                }
                this.activeCatId = this.firstCat[0].id;
                this.searchSub(0,this.subCat[0].id);
            },res=>{
                console.log(res);
            });
        },
        watch:{
            activeSubId(val){
                this.resultData = [];
                this.pageNumber = 1;
                this.totalSize = 0;
                this.sort = 4;
                this.sortDesc = true;
                let data = {
                    catId: val,
                    sysId: 1,
                    device: 'WAP',
                    position: 1
                }
                this.$api.get('/oteao/propInfo/queryPropVal',data,res=>{
                    this.propertiesValList = {};
                    this.filterConditions = res.data;
                    for(let item of this.filterConditions){
                        this.$set(item,'filterIndex',0);
                        let obj = {
                            catPropId:item.propValList[0].catPropId,
                            id: 'all',
                            propVal: '全部'
                        }
                        item.propValList.splice(0, 0, obj);
                        let propObj = {
                            propId: item.id,
                            propValId: 'all'
                        }
                        this.$set(this.propertiesValList,item.id,propObj);
                    }
                });
                this.searchResult();
            },
            'propertiesValList': {
                handler(newData,oldData){
                    let attrVal = '';
                    for(let attr in newData){
                        attrVal = attr;
                    }
                    if(newData[attrVal].propValId === 'all'){
                        this.filterFlag = false;
                    }else{
                        this.filterFlag = true;
                    }
                },
                deep: true
            }
        },
        mounted(){
            this.wxFlag = this.$tool.isWx;
        },
        methods:{
            //清空搜索内容
            clearTxt(){
                this.searchTxt = "";
            },
            //去搜索页
            goSearch(){
                this.$router.push('/search');
            },
            //重置筛选条件
            resetConditions(){
                for(let item of this.filterConditions){
                    item.filterIndex = 0;
                }
                for(let item in this.propertiesValList){
                    this.propertiesValList[item].propValId = 'all';
                }
            },
            //重置排序
            resetSort(){
                for(let item of this.sortData){
                    item.sortIndex = 0;
                }
                this.sort = 4;
                this.sortVisible = false;
            },
            //加载更多
            loadMore(){
                if(this.resultData.length < this.totalSize){
                    this.pageNumber++;
                    this.searchResult();
                }
            },
            //筛选条件查询
            confirmConditions(){
                this.resultData = [];
                this.pageNumber = 1;
                this.totalSize = 0;
                this.searchResult();
            },
            //查询结果
            searchResult(){
                let propValList = [];
                for(let item in this.propertiesValList){
                    if(this.propertiesValList[item].propValId != 'all'){
                        propValList.push(this.propertiesValList[item]);
                    }
                }
                let data = {
                    catId: this.activeSubId,
                    orderBy: this.sortDesc ? 'desc':'asc',
                    sort: this.sort,
                    device: 'WAP',
                    sysId: 1,
                    propertiesValList: propValList
                }
                this.$api.post(`/oteao/productInfo/seachProduct?page.pageNumber=${this.pageNumber}&page.pageSize=${this.pageSize}`,JSON.stringify(data),res=>{
                    this.filterVisible = false;
                    this.sortVisible = false;
                    let tempArr = res.data;
                    for(let item of tempArr){
                        for(let prop of item.proInfoPropertyVos){
                            if(prop.propName === '香气'){
                                let star = 0;
                                if(prop.propVal === '偏淡'){
                                    star = 1;
                                }else if(prop.propVal === '一般'){
                                    star = 2;
                                }else if(prop.propVal === '香'){
                                    star = 3;
                                }else if(prop.propVal === '高香'){
                                    star = 4;
                                }else if(prop.propVal === '极香'){
                                    star = 5;
                                }else {
                                    star = 0;
                                }
                                this.$set(item,'aromaVal',prop.propertyVal);
                                this.$set(item,'aromaStar',star);
                            }else if(prop.propName === '滋味'){
                                let star = 0;
                                if(prop.propVal === '偏淡'){
                                    star = 1;
                                }else if(prop.propVal === '一般'){
                                    star = 2;
                                }else if(prop.propVal === '浓'){
                                    star = 3;
                                }else if(prop.propVal === '很浓'){
                                    star = 4;
                                }else if(prop.propVal === '极浓'){
                                    star = 5;
                                }else {
                                    star = 0;
                                }
                                this.$set(item,'tasteVal',prop.prpertyVal);
                                this.$set(item,'tasteStar',star);
                            }
                        }
                    }
                    this.resultData = this.resultData.concat(tempArr);
                    this.totalSize = res.total_record;
                    if(this.resultData.length === this.totalSize){
                        this.pageNumber--;
                    }
                });
            },
            // 搜索一级分类
            searchFirstCat(index,id,e){
                let o_w = e.parentNode.offsetWidth;
                let o_l = e.parentNode.offsetLeft;
                this.activeCatIndex = index;
                this.activeCatId = id;
                if(index>=3 && index<=this.firstCat.length-4){
                    this.$refs.wrapper.scrollLeft = o_l-2*o_w;
                }
                for(let item of this.catTree){
                    if(id == item.id){
                        this.subCat = item.children;
                        this.searchSub(0,this.subCat[0].id);
                        break;
                    }
                }
            },
            // 搜索二级分类
            searchSub(index,id){
                this.activeSubIndex = index;
                this.activeSubId = id;
            },
            // 筛选
            selectFilter(list,item,index){
                list.filterIndex = index;
                this.propertiesValList[list.id] = {
                    propId: item.catPropId,
                    propValId: item.id
                };
            },
            //排序
            selectSort(list,item,index){
                list.sortIndex = index;
                this.sort = item.propId;
                if(index === 1){
                    this.sortDesc = true;
                }else if(index === 2){
                    this.sortDesc = false;
                }
            }
        },
        // 判断登陆
        beforeRouteEnter (to, from, next) {
            if(!store.state.member.member.id) {
                store.dispatch('getMemberData').then((res) => {
                    next();
                }).catch(res => {
                    next();
                })
            } else {
                next();
            }
        },
    }
</script>
<style lang="less">
    @import '~@/styles/search/cartegory.less';
</style>
