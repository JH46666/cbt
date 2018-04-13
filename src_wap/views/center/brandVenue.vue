<template>
<div>
    <div class="zuipin-section index-wrapper">
        <div class="model lists">
            <!-- start -->
                <router-link :to="{name: '搜索',query:{q:'醉品朴茶',c:1,sort:'desc',brand:'醉品朴茶'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/zppucha.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>醉品朴茶</h1><span class="r-price">25元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">醉品商城自有品牌茶，原产地直供直销，减少中间流通环节，让消费者喝到醉实惠的产地茶</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'醉品叶界',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/yejie_wap.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>醉品叶界</h1><span class="r-price">366元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">醉品联合茶叶知名品牌和非遗大师专属定制的匠心茶，是您送礼的醉佳之选</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'曦瓜红茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/09xigua.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>曦瓜红茶</h1><span class="r-price">178元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">武夷茶标杆性品牌</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'魏荫',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/10weiyin.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>魏荫</h1><span class="r-price">143元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、国家地理标志保护产品</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'正山堂红茶',c:1,sort:'desc',brand:'正山堂茶业'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/08zhengshantang.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>正山堂红茶</h1><span class="r-price">256元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">美国NOP有机认证、欧盟BCS有机食品、日本JAS有机产品</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'天池茶业',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/11tianchi.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>天池茶业</h1><span class="r-price">70元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">有机茶认证、瑞士SGS398项产品检测</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'顶峰绿茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/16dingfeng.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>顶峰绿茶</h1><span class="r-price">111元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、无公害产地认证、浙江名牌产品、杭州名牌</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'谢裕大黄山毛峰',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/05xiedayi.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>谢裕大黄山毛峰</h1><span class="r-price">120元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、国家地理标志保护产品</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'太姥山白茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img1.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/14tailaoshan.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>太姥山白茶</h1><span class="r-price">55元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、地理标志证明商标</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'中粮中茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/01zhongcha.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>中粮中茶</h1><span class="r-price">79元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国普洱茶十大品牌</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'大益普洱茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/02dayi.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>大益普洱茶</h1><span class="r-price">35元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">欧盟有机认证、中国有机产品认证、中国名牌农产品</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'琪明茶业',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/03qiming.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>琪明茶业</h1><span class="r-price">199元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">武夷茶十大品牌，母树大红袍制作者</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'冠和名茶铁观音',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/20guanhe.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>冠和名茶铁观音</h1><span class="r-price">166元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、绿色食品认证、有机茶认证</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'狮牌绿茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/06shipai.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>狮牌绿茶</h1><span class="r-price">118元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、国家地理标志保护产品、无公害农产品标志、 浙江名牌</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'普秀普洱茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/12puxiu.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>普秀普洱茶</h1><span class="r-price">58元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">有机产品认证、欧盟有机认证、绿色食品</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'高家山黑茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/13gaojiashan.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>高家山黑茶</h1><span class="r-price">98元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">纯山头的野生茶、无人培管荒山茶、自主开发高山生态茶</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'大沁白茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/21daqin.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>大沁白茶</h1><span class="r-price">122元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、有机转换认证、欧盟有机认证</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'春伦花茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/15chunlun.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>春伦花茶</h1><span class="r-price">132元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、HACCP认证、绿色食品认证、有机食品认证</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'清风两袖武夷岩茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/22liangxiu.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>清风两袖武夷岩茶</h1><span class="r-price">88元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、国家地理标志保护产品</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'三和茶业铁观音',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/19sanhe.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>三和茶业铁观音</h1><span class="r-price">100元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、国家地理标志保护产品</span></p>
                </router-link>

                <router-link :to="{name: '搜索',query:{q:'芯仙茗堂有机茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/23xinxian.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>芯仙茗堂有机茶</h1><span class="r-price">158元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国有机产品认证、美国有机认证、日本有机认证、欧盟有机认证</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'凤牌红茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/07fengpai.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>凤牌红茶</h1><span class="r-price">98元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">雨林联盟认证、瑞士IMO有机茶认证、穆斯林认证、中国地理标志</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'艾购锡兰红茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/04aigou.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>艾购锡兰红茶</h1><span class="r-price">68元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">雨林联盟认证、锡兰茶质量认证</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'帅印绿茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/17shuaiyin.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>帅印绿茶</h1><span class="r-price">239元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、国家地理标志保护产品</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'塔山绿茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/24tanshan.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>塔山绿茶</h1><span class="r-price">198元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">有机产品认证、无公害产地认证、绿色食品产地</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'老同志普洱茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img1.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/18laotongzhi.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>老同志普洱茶</h1><span class="r-price">69元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">日本有机认证、欧盟有机认证、美国有机认证、云南名牌</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'帕卡普洱茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/25paka.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>帕卡普洱茶</h1><span class="r-price">121元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国有机产品认证、云南名牌农产品、茶叶科技示范基地</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'粤德红红茶',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img2.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/27yuedehong.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>粤德红红茶</h1><span class="r-price">99元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">中国地理标志、地理标志保护产品、有机转换认证</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'香云山凤凰单枞',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/29xiangyunshan.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>香云山凤凰单枞</h1><span class="r-price">238元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">凤凰山600~1380米健康茶源，专注开发优质高山单枞茶礼</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'恒福茶具、东道汝窑',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img4.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/30hengfu.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>恒福茶具、东道汝窑</h1><span class="r-price">50元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">发明授权专利400余项，国内外和设计界大师倾力打造</span></p>
                </router-link>
                <router-link :to="{name: '搜索',query:{q:'锦绣茶盘',c:1,sort:'desc'}}">
                    <img class="lazy" data-original="https://img3.zuipin.cn/new-wap/%E5%93%81%E7%89%8C%E5%88%97%E8%A1%A8%E9%A1%B5_wap/30jinxiuchapan.jpg" src="https://img1.zuipin.cn/staticPpg/images/preload.png" alt="">
                    <div class="title">
                        <h1>锦绣茶盘</h1><span class="r-price">995元起</span></div>
                    <p class="desc clearfix"><span class="l-txt">位于“中国石雕之乡”—泉州惠安崇武，茶盘极具观赏和收藏增值价值</span></p>
                </router-link>
                <!-- end -->
        </div>

    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        created() {
          require("../../../static/js/jquery.lazyload.min.js");
          $(function() {
            $("img.lazy").lazyload({
                threshold: 400,
                //滚动条在离目标位置还有50的高度时就开始加载图片,可以做到不让用户察觉
                effect: 'fadeIn',
                //show fadeIn slideDown
                container: $(".index-wrapper") //如果是滚动某个div，一定要在这里设置
            });
        });
        this.$store.commit('SET_TITLE','品牌馆');
        }
    }
</script>
<style lang="less" scoped>
    @import url('~@/styles/center/brandVenue.less');
</style>
