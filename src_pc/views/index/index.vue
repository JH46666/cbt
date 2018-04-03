<template>
    <div class="index-wrapper" ref="wrapper" @scroll="scrollFun">
        <!-- floor1 -->
        <section class="fixed-block" v-if="hasFixed">
            <div class="fixed-wrap">
                <div class="top clearfix">
                    <ul class="f_l">
                        <li>
                            <i class="logo"></i>
                        </li>
                        <li class="hover-li w130">
                            <i class="wap"></i>茶帮通手机端
                            <div class="hover-box">
                                <p class="code-img code1"></p>
                            </div>
                        </li>
                        <li class="hover-li w130">
                            <i class="concern"></i>关注茶帮通
                            <div class="hover-box">
                                <p class="code-img code2"></p>
                            </div>
                        </li>
                        <li class="hover-li w200">
                            <i class="we"></i>联系我们
                            <div class="hover-box concat" style="height: 170px;">
                                <!-- <p><i class="qq"></i>QQ客服</p> -->
                                <!-- <a class="online" href="javscript:void(0);"><i></i></a> -->
                                <p><i class="wx"></i>微信客服</p>
                                <i class="cbt-code"></i>
                            </div>
                        </li>
                    </ul>
                    <div class="f_r">
                        <p class="tele"><i></i>400-996-3399</p>
                        <p>周一至周日8:45-22:30</p>
                    </div>
                </div>
            </div>
        </section>
        <div class="floor floor1" id="floor1">
            <div class="cbt_wrapper">
                <div class="top clearfix">
                    <ul class="f_l">
                        <li>
                            <i class="logo"></i>
                        </li>
                        <li class="hover-li w130">
                            <i class="wap"></i>茶帮通手机端
                            <div class="hover-box">
                                <p class="code-img code1"></p>
                            </div>
                        </li>
                        <li class="hover-li w130">
                            <i class="concern"></i>关注茶帮通
                            <div class="hover-box">
                                <p class="code-img code2"></p>
                            </div>
                        </li>
                        <li class="hover-li w200">
                            <i class="we"></i>联系我们
                            <div class="hover-box concat" style="height: 170px;">
                                <!-- <p><i class="qq"></i>QQ客服</p> -->
                                <!-- <a class="online" href="javscript:void(0);"><i></i></a> -->
                                <p><i class="wx"></i>微信客服</p>
                                <i class="cbt-code"></i>
                            </div>
                        </li>
                    </ul>
                    <div class="f_r">
                        <p class="tele"><i></i>400-996-3399</p>
                        <p>周一至周日8:45-22:30</p>
                    </div>
                </div>
                <div class="big-logo"></div>
                <div class="txt-box">
                    <h3>五大创新产业优势</h3>
                    <h4>最专业的垂直化B2B+OMO平台</h4>
                    <ul class="list-box clearfix">
                        <li>
                            <i class="one"></i>
                            <p>广纳茶企<br>汇聚更多行业资源</p>
                        </li>
                        <li>
                            <i class="two"></i>
                            <p>提供买家卖家双入口服务<br>实现一个账号共通</p>
                        </li>
                        <li>
                            <i class="three"></i>
                            <p>打造全国最大的茶业<br>采购与分销平台</p>
                        </li>
                        <li>
                            <i class="four"></i>
                            <p>为茶业从业者提供<br>有价值的服务</p>
                        </li>
                    </ul>
                </div>
                <a class="become-member" href="javascript:void(0);" @click="memeberFlag=true">成为会员</a>
            </div>
        </div>
        <!-- floor2 -->
        <div class="floor floor2">
            <div class="cbt_wrapper clearfix">
                <div class="f_l box_l">
                    <h3>让您采购省钱省心省时间<br>5秒找到产品，找对卖家</h3>
                    <ul>
                        <li class="clearfix">
                            <div class="f_l icon1"></div>
                            <div class="f_r">
                                <h4>好资源</h4>
                                <p>整合产业链上的各种资源，平台汇聚10万亩茶园，6大茶类原产基地直供，1300多家茶叶合作社联盟，汇聚11000多种茶产品。</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="f_l icon2"></div>
                            <div class="f_r">
                                <h4>有保障</h4>
                                <p>全国首创茶行业信用认证系统和挂钩实际业务的互评机制，严格审核企业资质，建立透明诚信档案，100%真实交易评价。</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="f_l icon3"></div>
                            <div class="f_r">
                                <h4>真安全</h4>
                                <p>资金安全，结算灵活。茶帮通平台联合国内知名支付服务商——微信及支付宝，提供便捷快速的支付服务；同时，提供资金托管服务，对平台交易资金进行担保，实现实时到账。</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="f_r box_r">
                    <h3>让您的分销方便快捷<br>一键完成买卖，销路稳定</h3>
                    <ul>
                        <li class="clearfix">
                            <div class="f_l icon4"></div>
                            <div class="f_r">
                                <h4>强流量</h4>
                                <p>基于4大搜索引擎引流，关键词SEO排名远超行业；网站平均每天访问人数超4万人次，年访问超1500万人次，茶叶服务平台绝对领先地位。</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="f_l icon5"></div>
                            <div class="f_r">
                                <h4>多渠道</h4>
                                <p>客户覆盖全国20个省，线下40000家终端合作门店，线上超过百万的优质会员；同时，基于全网络推广，保证稳定销路。</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="f_l icon6"></div>
                            <div class="f_r">
                                <h4>快推广</h4>
                                <p>针对用户的商品上架、图片规范、引流文案等都有一系列的具体解决方案，帮助商家快速管理业务。</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="f_l icon7"></div>
                            <div class="f_r">
                                <h4>优服务</h4>
                                <p>一对一专属客户经理实时提供业务解答、技术指导、产品维护、培训学习等服务，全程保障在线运营。</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- floor3 -->
        <div class="floor floor3">
            <div class="cbt_wrapper">
                <div class="top-circle clearfix">
                    <div class="cir-box cir-box1">
                        <p class="cir circle1"></p>
                        <p>3000+优质供应商</p>
                    </div>
                    <div class="cir-box cir-box2">
                        <p class="cir circle2"></p>
                        <p>为店主节约35%的采购成本</p>
                    </div>
                    <div class="cir-box cir-box3">
                        <p class="cir circle3"></p>
                        <p>50,000家茶店选择了我们</p>
                    </div>
                </div>
                <div id="slideBox" class="slideBox">
                    <div class="hd">
                        <ul></ul>
                    </div>
                    <div class="bd">
                        <ul>
                            <li>
                                <img src="../../assets/img_lb01.jpg">
                                <div class="txt">
                                    <h5>降低采购成本<span>30%~50%</span></h5>
                                    <div>
                                        <p>全面整合茶业碎片化资源，做到真正的渠道整合，资源共享</p>
                                        <p>优化产业链冗长空间产销直供，减少流通层级真正实现利益最大化</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <img src="../../assets/img_lb02.jpg">
                                <div class="txt">
                                    <h5>覆盖名优品种<span>90%</span></h5>
                                    <div>
                                        <p>50多万亩茶园直供</p>
                                        <p>1000家茶叶合作社联盟</p>
                                        <p>100%正宗原产地供应</p>
                                        <p>品类丰富，满足您多样化需求</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <img src="../../assets/img_lb03.jpg">
                                <div class="txt">
                                    <h5><span>0</span>经营风险，无需囤货</h5>
                                    <div>
                                        <p>最低1斤起批，卖多少进多少，无需囤货</p>
                                        <p>可货到付款，交易0风险</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <img src="../../assets/img_lb04.jpg">
                                <div class="txt">
                                    <h5><span>超长</span>退换货周期</h5>
                                    <div>
                                        <p>提供绿茶最长15天，黑茶最长3个月其他茶类2个月的退换货服务</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 下面是前/后按钮代码，如果不需要删除即可 -->
                    <a class="prev" href="javascript:void(0)"></a>
                    <a class="next" href="javascript:void(0)"></a>

                </div>
            </div>
        </div>
        <!-- floor4 -->
        <div class="floor floor4">
            <div class="cbt_wrapper"></div>
        </div>
        <!-- floor5 -->
        <div class="floor floor5">
            <div class="cbt_wrapper">
                <h3>手机下单   一键采购</h3>
                <h4>随时随地，方便快捷</h4>
                <div class="wap-code"></div>
                <p>微信扫一扫，进入茶帮通商城采购</p>
            </div>
        </div>
        <!-- floor6 -->
        <div class="floor floor6">
            <div class="cbt_wrapper">
                <h3>茶产业全渠道运营服务平台</h3>
                <h4>行业领先  行业独创</h4>
                <h5>茶帮通平台</h5>
                <p>茶帮通（oteao.com）是醉品集团斥巨资成立的茶产业供应链服务B2B平台，聚集了大批优秀的互联网和茶行业精英，
                    以垂直化B2B+OMO的创新模式，整合茶业碎片化资源，以技术提升了茶产业链效率和信息化水平，面向茶行业提供信息化、互联网化的整体解决方案，
                    为全国终端门店提供采购、经营、管理三位一体盈利化综合服务，为中国茶产业最具影响力的直供直销一体化平台。</p>
                <p>醉品集团旗下的茶帮通与醉品商城（zuipin.cn）合力打造的B2C+B2B+OMO模式，依托强大的平台技术，对整个茶叶产业进行完善和革新，打造了一个可持续的茶业生态链，引领茶行业步入互联网时代。</p>
            </div>
        </div>
        <!-- floor7 -->
        <div class="floor floor7" id="floor7">
            <div class="cbt_wrapper">
                <h3>卖家招募中，欢迎入驻茶帮通</h3>
                <h4>百万收入不是梦</h4>
                <div class="picScroll-left">
                    <div class="hd">
                        <a class="next"></a>
                        <a class="prev"></a>
                    </div>
                    <div class="bd">
                        <ul class="list">
                            <li>
                                <div class="top-txt head2">
                                    <p class="title">叶老板 茶帮通5级经销商</p>
                                    <p class="addr">陕西省西安市某茶叶店</p>
                                </div>
                                <div class="txt-info">
                                    <p>采购茶叶一直是我最为头疼的事情，我们小店是小本经营，采购量其实不大，导致很多茶厂茶企都不愿意小量批发给我们。但是茶帮通就很好，1斤都可以批发，卖多少进多少，不用囤货，而且价格也比市场上便宜，真正的物美价廉！</p>
                                </div>
                            </li>
                            <li>
                                <div class="top-txt head5">
                                    <p class="title">文老板 茶帮通6级经销商</p>
                                    <p class="addr">湖北省武汉市某茶馆</p>
                                </div>
                                <div class="txt-info">
                                    <p>以前买茶都要自己跑茶企茶厂，一次采购下来要三四天，费事有费力。自从用了茶帮通，平台上的茶叶资源应有尽有，一键采购，极大地节约了采购成本，而且多了很多时间可以陪家人！</p>
                                </div>
                            </li>
                            <li>
                                <div class="top-txt head4">
                                    <p class="title">邱老板 茶帮通7级经销商</p>
                                    <p class="addr">湖北省武汉市某茶叶店</p>
                                </div>
                                <div class="txt-info">
                                    <p>我们买茶很怕买到以次充好的茶叶，而茶帮通很好地解决了这一点，平台上不仅汇聚了全国茶业资源，而且可以查看对方的信用认证，还有最高长达三个月的退换货周期，极大地保障了我们采购的利益！</p>
                                </div>
                            </li>
                            <li>
                                <div class="top-txt head1">
                                    <p class="title">陈老板 茶帮通7级经销商</p>
                                    <p class="addr">福建省龙岩市某茶叶店</p>
                                </div>
                                <div class="txt-info">
                                    <p>茶帮通对于我来说，最大的改变就是平台透明，茶叶产地、质量等全部都在明细中写得清清楚楚，供应商的资质等都可以查看，一点也不用担心买到质量不好的产品。</p>
                                </div>
                            </li>
                            <li>
                                <div class="top-txt head3">
                                    <p class="title">温老板 茶帮通1级供应商</p>
                                    <p class="addr">陕西省西安市某茶企</p>
                                </div>
                                <div class="txt-info">
                                    <p>做茶叶其实很累，靠的就是一颗喜欢茶的心。而“卖“茶更是劳心劳力，市场上各种真假难辨的分销商、茶铺总是好茶坏茶掺着卖，我不想自己辛苦做的茶卖给”黑心商人“，而茶帮通很好地帮我筛选分销商，让我能把好茶卖给好的客户！</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <a class="become-seller" href="javascript:void(0);"  @click="sellerFlag=true">成为卖家</a>
                <address>Copyright 2010 - 2018 oteao.com All Rights Reserved 闽ICP备10200063号-3  厦门醉品春秋网络科技有限公司</address>
            </div>
        </div>
        <!-- 右边悬浮 -->
        <div>
            <div class="fixed-right">
                <a href="javascript:void(0);" class="first" @click="memeberFlag=true"></a>
                <a href="javascript:void(0);" class="second" @click="sellerFlag=true"></a>
            </div>
            <a v-show="showTop" href="javascript:void(0);" @click="goTop" class="go-top"></a>
        </div>
        <!-- 成为会员 -->
        <div class="popup pop-member" v-show="memeberFlag">
            <div class="inner member-innner">
                <a class="close" href="javascript:void(0);" @click="memeberFlag=false"></a>
                <h5>注册茶帮通会员</h5>
                <p>1、扫码二维码，进入注册页面</p>
                <p><i class="wap-regist"></i></p>
                <p>2、选择【成为会员】并完善注册资料</p>
            </div>
        </div>
        <!-- 成为卖家 -->
        <div class="popup pop-seller" v-show="sellerFlag">
            <div class="inner seller-innner">
                <a class="close" href="javascript:void(0);" @click="sellerFlag=false"></a>
                <h5>注册茶帮通卖家</h5>
                <div class="user-box clearfix">
                    <div class="user member">
                        <p><i class="icon-user1"></i></p>
                        <p class="bold-txt">您已是茶帮通会员</p>
                        <p class="tips">申请卖家步骤</p>
                        <p>登录茶帮通 > 我的中心  >  申请为卖家</p>
                        <p><i class="icon-seller"></i></p>
                    </div>
                    <div class="user not-member">
                        <p><i class="icon-user2"></i></p>
                        <p class="bold-txt">未注册用户</p>
                        <p class="tips">申请卖家步骤</p>
                        <p>1、扫码二维码进入注册页面</p>
                        <p><i class="wap-regist"></i></p>
                        <p>2、选择【成为卖家】并完善注册资料</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                memeberFlag: false,
                sellerFlag: false,
                showTop: false,
                hasFixed: false,
            }
        },
        created(){
            this.$nextTick(()=>{
                jQuery(".slideBox").slide({mainCell:".bd ul",autoPlay:true});
                jQuery(".picScroll-left").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:3,trigger:"click"});
            });
        },
        methods:{
            scrollFun(){
                let top = this.$refs.wrapper.scrollTop;
                if(top>700){
                    this.showTop = true;
                }else{
                    this.showTop = false;
                }
                if(top>1080) {
                    this.hasFixed = true;
                } else {
                    this.hasFixed = false;
                }
            },
            goTop(){
                this.$refs.wrapper.scrollTop = 0;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../styles/index/index.less';
</style>
