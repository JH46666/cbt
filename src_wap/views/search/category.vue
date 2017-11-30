<template>
    <div class="category_wrapper">
        <!-- 搜索框 -->
        <div class="flex search-box" :class="{'wx-search': wxFlag}">
            <div class="logo-img">
                <img src="../../assets/images/logo.png" alt="">
            </div>
            <div class="flex-1 flex search-inner">
                <div class="search-txt">
                    <input type="text" name="" value="" v-model="searchTxt" placeholder="搜索您喜欢的好茶！">
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
                                <li @click="popupVisible = true"><i class="iconfont">&#xe674;</i>筛选</li>
                                <li><i class="iconfont">&#xe673;</i>排序</li>
                            </ul>
                        </div>
                        <goods-item imgWidth="1.56rem"></goods-item>
                        <goods-item imgWidth="1.56rem"></goods-item>
                        <goods-item imgWidth="1.56rem"></goods-item>
                        <goods-item imgWidth="1.56rem"></goods-item>
                        <goods-item imgWidth="1.56rem"></goods-item>
                        <goods-item imgWidth="1.56rem" imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Moha_example.svg/200px-Moha_example.svg.png"></goods-item>
                    </div>
                </div>
            </div>
        </div>
        <!-- 筛选弹窗 -->
        <mt-popup v-model="popupVisible" position="bottom" class="popup-filter">
            <div class="popup-content">
                <div class="con-item" v-for="list in filterConditions">
                    <h4>{{list.name}}</h4>
                    <ul class="clearfix">
                        <li :class="{on:index == list.filterIndex}" v-for="(item,index) in list.conditions" @click="selectFilter(list,index)">{{item}}</li>
                    </ul>
                </div>
            </div>
            <div class="pop-btns flex">
                    <a class="flex-1" href="javscript:void(0)">重置</a>
                    <a class="flex-1 confirm" href="javscript:void(0)">确定</a>
                </div>
        </mt-popup>
    </div>
</template>
<script>

    export default{
        data(){
            return {
                wxFlag: false,
                popupVisible: false,  //弹窗是否显示
                searchTxt: "",  //搜索内容
                activeCatIndex: 0,   //激活的一级分类下标
                activeSubIndex: 0,   //激活的二级分类下标
                activeCatId: 0,      //激活的一级分类id
                activeSubId: 0,      //激活的二级分类id
                catTree:[],          //分类树
                firstCat:[],         //一级分类
                allSubCat:[],
                subCat:[],
                filterConditions:[
                    {
                        name: "净含量在",
                        filterIndex: 0,
                        conditions:['全部','50-100g','101-250g','50-100g','100-300g','50g以下']
                    },
                    {
                        name: "采摘季节",
                        filterIndex: 0,
                        conditions:['全部','雨后','春茶','随便','很随便','非常随便']
                    },
                    {
                        name: "香度",
                        filterIndex: 0,
                        conditions:['全部','雨后','春茶','随便','很随便','非常随便']
                    }
                ]
            }
        },
        computed:{
            clearFlag(){
                if(this.searchTxt.length>0){
                    return true;
                }else{
                    return false;
                }
            }
        },
        created(){
            this.$store.commit('SET_TITLE','分类');
            this.$api.get('/proCat/queryCatTree',{sysId: 2},res=>{
                console.log(res);
                this.catTree = res.data[0].children;
                this.subCat = this.catTree[0].children;
                for(let item of this.catTree){
                    this.firstCat.push({
                        'id': item.id,
                        'catName': item.catName
                    });
                }
            },res=>{
                console.log(res);
            });
        },
        mounted(){
            this.wxFlag = this.$tool.isWx;
        },
        methods:{
            //清空搜索内容
            clearTxt(){
                this.searchTxt = "";
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
            selectFilter(list,index){
                list.filterIndex = index;
            },
        },
        head: {
            title() {
                return {
                    inner : '分类'
                }
            }
        }
    }
</script>
<style lang="less">
    @import '~@/styles/search/cartegory.less';
</style>