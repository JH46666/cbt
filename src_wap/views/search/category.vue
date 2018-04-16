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
            <ul class="first-cat" ref="wrapper">
                <li class="cat-item" :class="{on: index==activeCatIndex}" v-for="(cat,index) in firstCat" :key="index" @click="searchFirstCat(index,cat.id,$event.target)" ref="liwrap">
                    <span>{{cat.catName}}</span>
                </li>
            </ul>
            <div class="half-bg"></div>
        </div>
        <!-- 分类 -->
        <div class="main-floor">
            <!-- 二级 -->
            <div class="sub-box clearfix">
                <div class="sub-left ipScroll">
                    <ul class="sub-menu">
                        <li v-for="(subItem,index) in subCat" :key="index" class="sub-item" :class="{'pull': subItem.pullFlag,'on':subItem.selectedFlag}">
                            <span class="subName" @click="searchSub(index,subItem)">{{subItem.catName}}</span>
                            <ul class="third-item">
                                <li v-for="thirdItem in subItem.propVal" :key="thirdItem.id" :class="{active:thirdItem.activeFlag}" @click="searchThird(subItem,thirdItem,index)">{{thirdItem.propVal}}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="flex-1 content-r">
                    <div class="content-inner ipScroll" style="overflow: hidden;">
                        <div style="height: 100%; overflow-y: auto;" ref="goodsWrapper">
                            <div class="condition-box">
                                <ul class="flex">
                                    <li @click="openFilter()" :class="{on: filterFlag}"><i class="iconfont">&#xe674;</i>筛选</li>
                                    <li @click="sortVisible = true" :class="{on: sortData[0].sortIndex!=0}"><i class="iconfont">&#xe673;</i>排序</li>
                                </ul>
                            </div>
                            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="true" infinite-scroll-distance="10">
                                <div v-for="item of resultData" :key="item.id" @click="setSession">
                                    <goods-item
                                        :link="item.proSku"
                                        :mainTit="item.proTitle"
                                        :subTit="item.subTitle"
                                        :price="item.priceGroups"
                                        :garyPrice="item.marketPrice"
                                        :hideGroupsPrice="item.hidePriceGroups"
                                        :salesPrice="item.salesPrice"
                                        :unit="item.unint"
                                        :imgUrl="item.proImg"
                                        :tagUrl="item.tagImgUrl"
                                        :aromaStar="item.aromaStar"
                                        :aromaName="item.aromaVal"
                                        :tasteStar="item.tasteStar"
                                        :businessType="item.tagNum"
                                        :tasteName="item.tasteVal"
                                        :isLogin="$tool.isLogin()"
                                        :isShowAttr="item.isShowTasteFragance"
                                        imgWidth="1.56rem">
                                    </goods-item>
                                </div>

                            </div>
                            <div class="goods-loading" v-if="loading">
                                <mt-spinner type="fading-circle" color="#f08200"></mt-spinner>
                                <span class="loading-text">正在努力加载中</span>
                            </div>
                            <div class="no-more" v-if="nomore">没有更多了呦</div>
                            <div v-if="noresult">
                                <div class="sorry-img">
                                    <img src="../../assets/images/cbt_sp_k.png" alt="">
                                </div>
                                <div class="sorry">
                                    抱歉，没有搜索到您要的商品~
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- 筛选弹窗 -->
        <div class="mupop_dialog" :class="{on: filterVisible}">
            <div class="mup_bg" @click="filterVisible = false"></div>
            <div :class="isIOS ? 'mupop_dialog_wrapper ios':'mupop_dialog_wrapper'">
                <div class="popup-content">
                    <div class="con-item" v-if="$tool.isLogin()">
                        <h4>供货价</h4>
                        <input class="price-input" type="tel" v-model="minSupplyPrice" placeholder="最低价" @blur="toFixedMinZero()"> —
                        <input class="price-input" type="tel" v-model="maxSupplyPrice" placeholder="最高价" @blur="toFixedMaxZero()">
                    </div>
                    <div class="con-item">
                        <h4>品牌</h4>
                        <ul class="clearfix">
                            <li :class="{on:'' == selectedBrandId}" @click="selectBrand('')">全部</li>
                            <li :class="{on:item.id == selectedBrandId}" v-for="(item,index) in brandList" :key="index" @click="selectBrand(item.id)">{{item.brandName}}</li>
                        </ul>
                    </div>
                    <div class="con-item" v-for="(list,listIndex) in filterConditions" :key="listIndex">
                        <h4>{{list.propName}}</h4>
                        <ul class="clearfix">
                            <li :class="{on:index == list.filterIndex}" v-for="(item,index) in list.propValList" :key="index" @click="selectFilter(list,item,index)">{{item.propVal}}</li>
                        </ul>
                    </div>
                </div>
                <div class="pop-btns flex">
                    <a class="flex-1"  @click="resetConditions">重置</a>
                    <a class="flex-1 confirm" @click="confirmConditions">确定</a>
                </div>
            </div>
        </div>
        <!-- 排序弹窗 -->
        <div class="mupop_dialog" :class="{on: sortVisible}">
            <div class="mup_bg" @click="sortVisible = false"></div>
            <div :class="isIOS ? 'mupop_dialog_wrapper ios':'mupop_dialog_wrapper'">
                <div class="popup-content">
                    <div class="con-item" v-for="(list,listIndex) in sortData" :key="listIndex">
                        <h4>{{list.sortName}}</h4>
                        <ul class="clearfix">
                            <li :class="{on:index == list.sortIndex}" v-for="(item,index) in list.sortConditions" :key="index" @click="selectSort(list,item,index)" v-if="item.propVal!='库存'">{{item.propVal}}</li>
                        </ul>
                    </div>
                </div>
                <div class="pop-btns flex">
                    <a class="flex-1"  @click="resetSort">重置</a>
                    <a class="flex-1 confirm"  @click="confirmConditions">确定</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import store from 'store';
    import { InfiniteScroll } from 'mint-ui';
    import isLogin from '../../../utils/index.js';
    export default{
        data(){
            return {
                isIOS:false,
                wxFlag: false,
                filterVisible: false,  //筛选弹窗是否显示
                sortVisible: false,   //排序弹窗是否显示
                searchTxt: "",        //搜索内容
                activeCatIndex: 0,   //激活的一级分类下标
                activeSubIndex: 0,   //激活的二级分类下标
                activeThirdIndex: 0, //激活的三级分类下标
                activeCatId: 0,      //激活的一级分类id
                activeSubId: 0,      //激活的二级分类id
                activeThirdId: 0,    //激活的三级分类id
                catTree:[],          //分类树
                firstCat:[],         //一级分类
                allSubCat:[],
                subCat:[],
                // thirdProp:[],          //三级属性
                filterConditions:[],   //筛选条件
                propertiesValList:{},  //筛选属性值
                resultData:[],         //查询结果
                pageNumber: 1,
                pageSize: 20,
                totalSize: 0,
                sortDesc: true,      //排序
                sort: 1,
                filterFlag: false,
                sessionFlag: false,  // 是否有session
                activeSubFlag: false,   //二级菜单是否添加选中样式
                scrollTop: 0,
                maxSupplyPrice: '', //最大供货价
                minSupplyPrice: '',//最小供货价
                brandList:[],//筛选品牌列表
                selectedBrandId:'', //被选中的品牌
                activePropId:'',//分类下选中属性id
                filterIndexs: [],
                noresult:false,
                sortData:[{
                    sortName: '排序',
                    sortIndex: 0,
                    sortConditions:[
                        {
                            propVal: '销量',
                            propId: 1
                        },
                        {
                            propVal: '价格高到低',
                            propId: 5
                        },
                        {
                            propVal: '价格低到高',
                            propId: 5
                        },
                        {
                            propVal: '新品',
                            propId: 2
                        },
                    ]
                }],
                clickFlag: false,                           // 点击时不触发滚动加载更多事件
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
                    if(this.resultData.length === this.totalSize && this.resultData.length !== 0) {
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
            this.$store.commit('SET_TITLE','全部分类');
            if(sessionStorage.category){
                this.sessionFlag = true;
                let data = JSON.parse(sessionStorage.category);
                this.activeCatIndex = data.activeCatIndex;
                this.activeSubIndex = data.activeSubIndex;
                this.activeCatId = data.activeCatId;
                this.activeSubId = data.activeSubId;
                this.sortDesc = data.sortDesc;
                this.sort = data.sort;
                this.propertiesValList = data.propertiesValList;
                this.pageSize = data.total;
                this.scrollTop = data.top;
                this.filterIndexs = data.filterIndexs;
                let sortIndex = data.sortIndex;
                this.queryCatTree().then((res)=>{
                    this.catTree = res.data[0].children;
                    this.subCat = this.catTree[0].children;
                    for(let item of this.catTree){
                        this.firstCat.push({
                            'id': item.id,
                            'catName': item.catName
                        });
                    }
                    this.setFirstCat(this.activeCatIndex,this.activeCatId,this.$refs.wrapper);
                    this.setSubCat(this.activeSubIndex,this.activeSubId);
                    this.sortData[0].sortIndex = sortIndex;
                    this.clearSession();
                    this.searchResult();
                });
            }else{
                this.$api.get('/oteao/proCat/queryCatTree',{sysId: 1},res=>{
                    this.catTree = res.data[0].children;
                    for(let item of this.catTree){
                        this.firstCat.push({
                            'id': item.id,
                            'catName': item.catName
                        });
                        for(let subItem of item.children){
                            this.$set(subItem, 'pullFlag',false);
                            this.$set(subItem, 'selectedFlag',false);
                            for(let thirdItem of subItem.propVal){
                                this.$set(thirdItem, 'activeFlag',false);
                            }
                        }
                    }
                    this.subCat = this.catTree[0].children;
                    if(this.$route.query.parent != undefined){
                        for(let i=0; i<this.firstCat.length; i++){
                            if(this.firstCat[i].id == this.$route.query.parent){
                                let on = Array.from(this.$refs.wrapper.children)
                                this.setFirstCat(i,this.firstCat[i].id,this.$refs.wrapper)
                            }
                        }
                        if(this.$route.query.child != undefined){
                            for(let i=0; i<this.subCat.length; i++){
                                if(this.subCat[i].id == this.$route.query.child){
                                    this.searchSub(i,this.subCat[i]);
                                }
                            }
                        }else{
                            this.searchSub(0,this.subCat[0]);
                        }
                    }else{
                        this.activeCatId = this.firstCat[0].id;
                        this.searchSub(0,this.subCat[0]);
                    }
                },res=>{
                    return Toast({
                        message: res.errorMsg,
                        iconClass: 'icon icon-fail'
                    });
                    // console.log(res);
                });
            }
            // 判断是否为IOS
            this.getIOSflag();
        },
        watch:{
            activeSubId(val){
                this.resultData = [];
                this.pageNumber = 1;
                this.totalSize = 0;
                if(!this.sessionFlag){
                    this.sort = 1;
                    this.sortDesc = true;
                }
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
                // this.searchResult();
            },
            'propertiesValList': {
                handler(newData,oldData){
                    let attrVal = '';
                    for(let attr in newData){
                        if(newData[attr].propValId!='all'){
                            return this.filterFlag = true;
                        }
                    }
                    this.filterFlag = false;
                },
                deep: true
            }
        },
        mounted(){
            this.wxFlag = this.$tool.isWx;
        },
        methods:{
            queryCatTree(){
                return new Promise((resolve,reject) => {
                    this.$api.get('/oteao/proCat/queryCatTree',{sysId: 1},res=>{
                        resolve(res);
                    },res=>{
                        // console.log(res);
                    });
                });

            },
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
                this.resetSupplyPrice();
                this.selectedBrandId = '';
            },
            // 重置供货价区间
            resetSupplyPrice(){
                this.minSupplyPrice = '';
                this.maxSupplyPrice = '';
            },
            //重置排序
            resetSort(){
                // console.log(this.sortData);

                for(let item of this.sortData){
                    item.sortIndex = 0;

                }
                this.sort = 1;
                this.sortDesc = true;
                // this.sortVisible = false;
            },
            //加载更多
            loadMore(){
                if(this.clickFlag) retrun;
                if(this.resultData.length < this.totalSize){
                    this.pageNumber++;
                    if(this.activePropId==''){
                        this.searchResult();
                    }else{
                        let temp = {
                            propId: this.activePropId,
                            propValId: this.activePropVal
                        }
                        this.searchResult(temp);
                    }

                }
            },
            //筛选条件查询
            confirmConditions(){
                this.resultData = [];
                this.pageNumber = 1;
                this.totalSize = 0;
                if(this.activePropId==''){
                    this.searchResult();
                }else{
                    let temp = {
                        propId: this.activePropId,
                        propValId: this.activePropVal
                    }
                    this.searchResult(temp);
                }

            },
            // 格式化价格
            toFixedMinZero() {
                let delTrim = String(this.minSupplyPrice).trim();
                if(delTrim == ''){
                    this.minSupplyPrice = '';
                }else if(parseFloat(delTrim) > 0){
                    this.minSupplyPrice = parseFloat(delTrim).toFixed(0);
                }else if(parseFloat(delTrim) < 0){
                    this.minSupplyPrice = Math.abs(parseFloat(delTrim).toFixed(0));
                }
            },
            toFixedMaxZero() {
                let delTrim = String(this.maxSupplyPrice).trim();
                if(delTrim == ''){
                    this.maxSupplyPrice = '';
                }else if(parseFloat(delTrim) > 0){
                    this.maxSupplyPrice = parseFloat(delTrim).toFixed(0);
                }else if(parseFloat(delTrim) < 0){
                    this.maxSupplyPrice = Math.abs(parseFloat(delTrim).toFixed(0));
                }
            },
            // 判断最大供货价不得小于最小供货价
            sortPrice(){
                if(parseFloat(this.maxSupplyPrice)<parseFloat(this.minSupplyPrice)){
                    let temp = this.maxSupplyPrice;
                    this.maxSupplyPrice = this.minSupplyPrice;
                    this.minSupplyPrice = temp;
                }
            },
            //查询结果
            searchResult(thirdProp){
                this.noresult = false;
                let propValList = [];
                for(let item in this.propertiesValList){
                    if(this.propertiesValList[item].propValId != 'all'){
                        propValList.push(this.propertiesValList[item]);
                    }
                }
                if(thirdProp){
                    propValList.push(thirdProp);
                }
                this.sortPrice()
                let data = {
                    brandId:this.selectedBrandId,
                    catId: this.activeSubId,
                    orderBy: this.sortDesc ? 'desc':'asc',
                    sort: this.sort,
                    device: 'WAP',
                    sysId: 1,
                    propertiesValList: propValList,
                    minSupplyPrice:this.minSupplyPrice,
                    maxSupplyPrice:this.maxSupplyPrice,
                    priceType:487
                }
                
                   
                this.$api.post(`/oteao/productInfo/seachProduct?page.pageNumber=${this.pageNumber}&page.pageSize=${this.pageSize}`,JSON.stringify(data),res=>{
                    if(!res.data.length){
                        this.noresult = true;
                    }
                    this.filterVisible = false;
                    this.sortVisible = false;
                    let tempArr = res.data;
                    for(let item of tempArr){
                        let star = 0;
                        if(item.fragrance === '偏淡'){
                            star = 1;
                        }else if(item.fragrance === '一般'){
                            star = 2;
                        }else if(item.fragrance === '香'){
                            star = 3;
                        }else if(item.fragrance === '高香'){
                            star = 4;
                        }else if(item.fragrance === '极香'){
                            star = 5;
                        }else {
                            star = 0;
                        }
                        // this.$set(item,'aromaVal','香气');
                        this.$set(item,'aromaStar',star);
                        let stars = 0;
                        if(item.taste === '偏淡'){
                            stars = 1;
                        }else if(item.taste === '一般'){
                            stars = 2;
                        }else if(item.taste === '浓'){
                            stars = 3;
                        }else if(item.taste === '很浓'){
                            stars = 4;
                        }else if(item.taste === '极浓'){
                            stars = 5;
                        }else {
                            stars = 0;
                        }
                        // this.$set(item,'tasteVal','滋味');
                        this.$set(item,'tasteStar',stars);
                    }
                    
                    // console.log(this.pageNumber)
                    if(this.pageNumber==1){
                        this.resultData = [];    
                        this.resultData = this.resultData.concat(tempArr);   
                        this.noresult = false;
                    }else{
                        this.resultData = this.resultData.concat(tempArr);   
                        this.noresult = false;
                    }
                    this.clickFlag = false;
                     
                    // this.resultData = [];
                    // this.resultData = this.resultData.concat(tempArr);
                    this.totalSize = res.total_record;
                    if(this.resultData.length === this.totalSize){
                        if(this.pageNumber > 1){
                            this.pageNumber--;
                        }
                    }
                    if(this.sessionFlag){
                        for(let i=0; i<this.filterIndexs.length; i++){
                            this.filterConditions[i].filterIndex = this.filterIndexs[i];
                        }
                        setTimeout(()=>{
                            this.$refs.goodsWrapper.scrollTop = this.scrollTop;
                            this.sessionFlag = false;
                        },100);
                    }
                    // 没有任何商品时 显示没有商品那个提示图片
                    if(this.resultData.length ==0){
                         this.noresult = true;
                     }

                });
            },
            // 设置一级分类
            setFirstCat(index,id,e){
                let o_w = e.parentNode.offsetWidth;
                let o_l = e.parentNode.offsetLeft;
                this.activeCatIndex = index;
                this.activeCatId = id;
                this.activePropId = '';
                if(index>=3){
                    this.$refs.wrapper.scrollLeft = o_l-2*o_w;
                }
                for(let item of this.catTree){
                    if(id == item.id){
                        this.subCat = item.children;
                        break;
                    }
                }
            },
            // 设置二级分类
            setSubCat(index,id,e){
                this.activeSubIndex = index;
                this.activeSubId = id;
                this.activePropId = '';
            },
            // 搜索一级分类
            searchFirstCat(index,id,e){
                this.pageNumber=1;
                this.resultData=[];
                this.scrollTop = 0;
                let o_w = e.parentNode.offsetWidth;
                let o_l = e.parentNode.offsetLeft;
                this.activeCatIndex = index;
                this.activeCatId = id;
                this.activePropId = '';
                this.resetConditions();
                this.resetSort();
                if(index>=3){
                    this.$refs.wrapper.scrollLeft = o_l-2*o_w;
                }
                for(let item of this.catTree){
                    if(id == item.id){
                        this.subCat = item.children;
                        this.searchSub(0,this.subCat[0]);
                        break;
                    }
                }
            },
            // 搜索二级分类
            searchSub(index,item){
                this.clickFlag = true;
                // console.log('搜索二级分类')
                this.pageNumber=1;
                this.resultData=[];
                this.resetSupplyPrice();
                this.resetPullFlag(item);
                for(let third of item.propVal){
                    third.activeFlag = false;
                }
                this.$nextTick(()=>{
                    item.pullFlag = !item.pullFlag;
                    item.selectedFlag = true;
                });
                this.activeSubIndex = index;
                this.activeSubId = item.id;
                this.activePropId = '';
                this.resetConditions();
                this.resetSort();
                this.pageSize = 20;
                this.searchResult();
            },
            // 搜索三级
            searchThird(subItem,thirdItem,index){
                // console.log('搜索三级分类')
                this.resultData = [];
                this.pageNumber = 1;
                this.totalSize = 0;
                if(!this.sessionFlag){
                    this.sort = 1;
                    this.sortDesc = true;
                }
                subItem.selectedFlag = false;
                for(let item of subItem.propVal){
                    item.activeFlag = false;
                }
                thirdItem.activeFlag = true;
                this.resetConditions();
                this.resetSort();
                this.activeSubIndex = index;
                this.activeSubId = thirdItem.catId;
                this.activePropId = thirdItem.propId;
                this.activePropVal =thirdItem.linkUrl;
                this.pageSize = 20;
                let temp = {
                    propId: thirdItem.propId,
                    propValId: thirdItem.linkUrl
                }
                this.searchResult(temp);
            },
            //重置二级菜单是否展开和是否选中状态
            resetPullFlag(curItem){
                for(let item of this.subCat){
                    if(curItem.id === item.id){
                        item.pullFlag = curItem.pullFlag;
                    }else{
                        item.pullFlag = false;
                        item.selectedFlag = false;
                    }
                }
                for(let item of curItem.children){
                    item.activeFlag = false;
                }
            },
            // 打开筛选弹窗
            openFilter(){
                let data = {
                    catId: this.activeSubId,
                    propValId:this.activePropId!=''?this.activePropVal:null
                }
                // 获取分类品牌列表
                this.$api.get('/oteao/productBrand/findProductBrandByCatId?',data,res=>{
                    this.brandList = res.data;
                    this.filterVisible = true;
                })
            },
            // 品牌筛选
            selectBrand(id){
                this.selectedBrandId =id;
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
                // console.log(list,item,index);
                // this.resetSort();
                list.sortIndex = index;
                this.sort = item.propId;
                if(this.sort === 1 ){
                    this.resetSort()
                }
                if(index === 1){
                    this.sortDesc = true;
                }else if(index === 2){
                    this.sortDesc = false;
                }


            },
            //去详情时存储当前浏览的分类下标和滚动高度
            setSession(){
                let filterIndexs = [];
                for(let item of this.filterConditions){
                    filterIndexs.push(item.filterIndex);
                }
                let data = {
                    activeCatIndex: this.activeCatIndex,
                    activeSubIndex: this.activeSubIndex,
                    activeCatId: this.activeCatId,
                    activeSubId: this.activeSubId,
                    sortDesc: this.sortDesc,
                    sort: this.sort,
                    sortIndex: this.sortData[0].sortIndex,
                    propertiesValList: this.propertiesValList,
                    filterIndexs: filterIndexs,
                    total: this.resultData.length,
                    top: this.$refs.goodsWrapper.scrollTop,
                }
                if(window.sessionStorage){
                    sessionStorage.setItem('category',JSON.stringify(data));
                }
            },
            //清除sessionStorage
            clearSession(){
                sessionStorage.removeItem("category");
            },
            // 判断是否为IOS
            getIOSflag(){
                let u = navigator.userAgent, app = navigator.appVersion;
                let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                this.isIOS = isIOS;
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
        }

    }
</script>
<style lang="less">
    @import '~@/styles/search/cartegory.less';
</style>
