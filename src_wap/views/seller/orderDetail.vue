<template>
    <div id="order-detail">
        <section class="main-wrap">
            <section class="head">
                <div class="left" v-if="myData.groupState==1" style="width: 2.8rem; display: flex;">
                    <span class="icon-wrap"><i class="icon-gerenzhongxin_pintuanzhong" style="color: #424242;"></i></span>
                    <div style="height: 0.6rem;position: relative; top: -0.20rem;">
                        <div class="green" style="height: 0.28rem; margin-bottom: 0.1rem; font-size: 0.28rem;">拼团中,差<span style="color: #f08200">{{ grouppingInfo.groupNumber - grouppingInfo.offerNumber }}</span>人</div>
                        <div style="height: 0.23rem; margin-left: 0.2rem;color: #999; font-size: 0.24rem;">剩余{{ grouppingLeftTime }}</div>
                    </div>
                </div>
                <div class="left" v-else style="width: 2.8rem;">
                    <span class="icon-wrap"><i class="icon-daifukuan"></i></span>
                    <span class="green">{{ $store.state.order.status[myData.orderStatus] }}</span>
                </div>
                <div class="right">
                    订单号： {{ myData.orderNo }}
                </div>
            </section>
            <section class="text-pannel">
                <div class="top">
                    <h4 class="left">收货人信息</h4>
                    <div class="right" @click="$router.push({name: '卖家修改地址',query:{orderNo:myData.orderNo}})"><i class="icon-dingdanliebiaobianji"></i></div>
                </div>
                <p class="user">
                    {{ myData.receiptName }}&nbsp;&nbsp;&nbsp;&nbsp;{{ myData.receiptPhone }}
                </p>
                <div class="detail-wrap">
                    <p class="detail" :class="{'limit-2':!showMoreAddress}">
                        {{ myData.detailAddress + myData.streetAddress }}
                    </p>
                    <span @click="showMoreAddress = !showMoreAddress" v-if="myData.detailAddress ? myData.detailAddress.length >44 : false"><i :class="{'icon-single-down':!showMoreAddress,'icon-shang':showMoreAddress}"></i></span>
                </div>
                <div class="top">
                    <h4 class="left">买家留言</h4>
                    <!-- <div class="right"><i class="icon-dingdanliebiaobianji"></i></div> -->
                </div>
                <div class="detail-wrap">
                    <p class="detail" :class="{'limit-3':!showMore}">
                        {{ myData.orderRemark || '&nbsp;' }}
                    </p>
                    <span @click="showMore = !showMore" v-if="myData.detailAddress ? myData.detailAddress.length >66 : false"><i :class="{'icon-single-down':!showMore,'icon-shang':showMore}"></i></span>
                </div>
                <div class="remark" @click="showRemark">
                    备注：<span class="remark-txt">{{ remark.length > 0 ? remark : '买家不可见' }}</span>
                </div>
            </section>
            <section class="goods-pannel">
                <h3 class="title">商品信息</h3>
                <div class="goods-item" v-for="(item,index) in list">
                    <goods-img style="width:1.6rem;height:1.6rem;" :imgUrl="item.imageUrl || '/'"></goods-img>
                    <div class="right">
                        <p class="goods-title">{{ item.productName }}</p>
                        <p class="goods-bd">
                            <span class="price">￥{{ item.productPrice }}</span>
                            <span class="num">×{{ item.productNum }}</span>
                        </p>
                    </div>
                </div>
            </section>
            <section class="price-pannel">
                <div class="item">
                    <div class="left">商品金额</div>
                    <div class="right">￥{{ myData.productPaySum | toFix2  }}</div>
                </div>
                <div class="item" v-if="myData.internalDiscountSum != 0">
                    <div class="left">内部优惠</div>
                    <div class="right">￥{{  0 - myData.internalDiscountSum | toFix2  }}</div>
                </div>
                <div class="item">
                    <div class="left">运费</div>
                    <div class="right">￥{{ myData.freightSum | toFix2  }}</div>
                </div>
                <div class="item">
                    <div class="left">实际收入</div>
                    <div class="right gold">￥{{ myData.orderAllSum | toFix2  }}</div>
                </div>
            </section>
            <section class="date-pannel">
                <div class="item" v-if="myData.createTime">
                    <div class="left">下单时间</div>
                    <div class="right">{{ myData.createTime }}</div>
                </div>
                <div class="item" v-if="myData.payTime">
                    <div class="left">付款时间</div>
                    <div class="right">{{ myData.payTime }}</div>
                </div>
                <div class="item" v-if="myData.sendTime">
                    <div class="left">发货时间</div>
                    <div class="right">{{ myData.sendTime }}</div>
                </div>
                <div class="item" v-if="myData.recTime">
                    <div class="left">确认收货</div>
                    <div class="right">{{ myData.recTime }}</div>
                </div>
                <div class="item">
                    <div class="left" v-if="myData.commentTime">评价</div>
                    <div class="right">{{ myData.commentTime }}</div>
                </div>
                <div class="item" v-if="myData.cancelTime">
                    <div class="left">取消时间</div>
                    <div class="right">{{ myData.cancelTime }}</div>
                </div>
            </section>
        </section>
        <!-- 底部按钮 -->
        <section class="btn-bar">
            <div style="float: left; font-size: 0.28rem; color: #333; display: flex;align-items: center;" @click="openKfDialog">
                <i class="icon-kefurukousvg" style="font-size: 0.44rem; color: #f08200; margin-right: 0.1rem;"></i>
                联系买家
            </div>
            <div v-if="!(myData.groupSuccess== 2)">
                <template v-if="myData.orderStatus === 'WAIT_PAY'">
                    <mt-button size="small" class="btn" @click="closeOrder">关闭订单</mt-button>
                    <mt-button size="small" class="btn" @click="editPrice">修改价格</mt-button>
                </template>
                <template v-if="myData.orderStatus === 'PACKING' || myData.orderStatus === 'PAY_WAIT_AUDIT'">
                    <mt-button size="small" class="btn" @click="closeOrder">关闭订单</mt-button>
                    <mt-button size="small" class="btn gold" @click.stop="$router.push({name:'发货',query:{orderNo:myData.orderNo}})">发货</mt-button>
                </template>
                <template v-if="myData.orderStatus === 'DELIVERED'">
                    <mt-button size="small" class="btn" @click="closeOrder">关闭订单</mt-button>
                    <mt-button size="small" class="btn" @click.stop="$router.push({name:'修改配送方式',query:{orderNo:myData.orderNo}})">修改快递</mt-button>
                </template>
            </div>
        </section>

        <!-- 修改备注弹框 -->
        <transition name="down-slow" mode="out-in">
            <div class="edit-remark" v-show="remarkDialog">
                <div class="remark-main">
                    <h4>修改留言</h4>
                    <textarea class="textarea" placeholder="请输入备注" v-model="cloneRemark"></textarea>
                    <p class="tip">该备注买家不可见</p>
                    <div class="btn-wrap">
                        <mt-button size="small" class="btn" @click="remarkDialog = false">取消</mt-button>
                        <mt-button size="small" class="btn gold" @click="confirmRemark">修改</mt-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 关闭订单部分 -->
        <!-- 待付款状态 -->
        <mt-popup
            v-model="closeUp"
            position="bottom">
            <div class="close-wrap">
                <h3>选择关闭订单原因</h3>
                <p class="close-tip" @click="pickClose('缺货')">缺货</p>
                <p class="close-tip" @click="pickClose('买家不想买了')">买家不想买了</p>
                <p class="close-tip" @click="pickClose('其他')">其他</p>
                <p class="close-tip" @click="pickClose('暂不关闭')">暂不关闭</p>
            </div>
        </mt-popup>
        <!-- 打包中，已发货状态 -->
        <mt-popup
            v-model="closeUpSend"
            position="bottom">
            <div class="close-wrap-send">
                <div class="hd">
                    <div class="top">
                        <div class="left">退款金额</div>
                        <div class="right">￥{{ myData.orderAllSum | toFix2 }}</div>
                    </div>
                    <div class="bottom">
                        <i class="iconfont">&#xe68d;</i>关闭订单后，货款将立即退回给买家
                    </div>
                </div>
                <div class="bd">
                    <div class="title">
                        选择关闭订单原因
                    </div>
                    <div class="item-wrap">
                        <div class="item" @click="myData.closeRemark = '缺货'">缺货<i class="iconfont" v-if="myData && myData.closeRemark === '缺货'">&#xe68e;</i></div>
                        <div class="item" @click="myData.closeRemark = '买家不想买了'">买家不想买了<i class="iconfont" v-if="myData && myData.closeRemark === '买家不想买了'">&#xe68e;</i></div>
                        <div class="item" @click="myData.closeRemark = '其他'">其他<i class="iconfont" v-if="myData && myData.closeRemark === '其他'">&#xe68e;</i></div>
                    </div>
                </div>
                <div class="btn-bar-close">
                    <mt-button type="default" @click="closeUpSend = false">取消</mt-button><mt-button type="default" @click="closeUpSend = false;closeConfirm = true">确定</mt-button>
                </div>
            </div>
        </mt-popup>
        <!-- 弹窗 -->
        <transition name="down-slow">
            <div class="dialog-bg" v-if="closeConfirm">
                <div class="dialog">
                    <div class="input-row">
                        确认退款，即将以下货款金额退给买家，需慎重选择噢~
                    </div>
                    <p class="tips">￥{{ myData.orderAllSum | toFix2 }}</p>
                    <div class="btn-bar-close">
                        <mt-button type="default" @click="closeConfirm = false">取消</mt-button><mt-button type="default" @click="pickClose(myData.closeRemark)">确定</mt-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import store from 'store';
    export default {
        data() {
            return {
                showMore: false,                // 留言更多
                showMoreAddress: false,         // 地址更多
                remark: '',                     // 备注
                cloneRemark: '',                // 备注备份
                remarkDialog: false,            // 备注弹框
                closeUp: false,                 // 关闭订单
                closeUpSend: false,             // 发货的关闭订单
                closeConfirm: false,
                myData: {},                     // 订单详情
                list: [],                       // 商品列表
                grouppingInfo:{},               // 团购信息
                grouppingLeftTime:'',           // 团购剩余时间
                timer: null,
                myIMData:''
            }
        },
        methods: {
            // 填写备注
            showRemark() {
                this.cloneRemark = this.remark;
                this.remarkDialog = true;
            },
            // 保存备注
            confirmRemark() {
                this.$api.post('/oteao/order/updateOrderRemark',{
                    orderId: this.myData.orderId,
                    customerRemark: this.cloneRemark
                },res => {
                    this.remark = this.cloneRemark;
                    this.remarkDialog = false;
                    this.$toast('备注修改成功')
                },res => {
                    this.$toast(res.message)
                })
            },
            // 选择关闭订单
            pickClose(way) {
                if(way === '暂不关闭') return  this.closeUp = false;
                this.$api.post('/oteao/order/closeOteaoOrderBySeller',{
                    orderNo: this.myData.orderNo,
                    closeReason: way
                },res => {
                    if(this.myData.orderStatus === 'PACKING' || this.myData.orderStatus === 'DELIVERED') {
                        this.$toast('订单关闭，退款成功~')
                    } else {
                        this.$toast('关闭成功')
                    }
                    this.closeUp = false;
                    this.closeConfirm = false;
                    this.myData.orderStatus = 'CLOSE'
                },res => {
                    this.$toast(res.message)
                    this.closeUp = false;
                    this.closeConfirm = false;
                })
            },
            // 关闭订单
            closeOrder() {
                if(this.myData.orderStatus === 'PACKING' || this.myData.orderStatus === 'DELIVERED') {
                    this.closeUpSend = true;
                    this.$set(this.myData,'closeRemark','');
                    // this.myData.closeRemark = '';
                } else {
                    this.closeUp = true;
                }
            },
            // 关闭订单选择理由
            chooseWay(way) {
                this.myData.closeRemark = way;
            },
            // 修改价格
            editPrice() {
                let math = this.$tool.math
                this.$editPrice({
                    goodsPrice: (math.eval(`${this.myData.orderAllSum} - ${this.myData.freightSum}`)).toFixed(2),
                    expressPrice:  Number(this.myData.freightSum).toFixed(2)
                }).then(prices => {
                    this.$api.post('/oteao/order/updateOrderSum',{
                        orderId: this.myData.orderId,
                        orderSum: prices.goodsPrice,
                        freightSum: prices.expressPrice
                    },res => {
                        this.$toast('成功修改价格！');
                        this.getData();
                    },res => {
                        this.$toast(res.message)
                    })
                }).catch(res =>{})
            },
            getData() {
                // 拉取订单详情数据
                let orderNo = this.$route.query.orderNo;
                this.$api.post('/oteao/order/findSellerOrderByNo', {
                    orderNo,
                    delYes: 0
                }, res => {
                    this.myData = res.data || {};
                    this.remark = this.myData.customerRemark || '';
                    // 拉取订单中的商品数据
                    this.$api.post('/oteao/order/sellerOrderProductList', { orderId: this.myData.orderId, device: 'WAP' }, res => {
                        this.list = res.data.mainOrder.products
                    }, res => {
                        this.$toast(res.message)
                    });
                    // 进入订单详情后, 按订单ID请求团购信息
                    this.$api.post('/oteao/groupPurchase/seachGroupByOrder', { orderId: this.myData.orderId, }, res => {
                        this.grouppingInfo = res.data.groupPurchase;
                        this.timer && clearInterval(this.timer);
                        this.timeOut(this.grouppingInfo.createTime, this.grouppingInfo.systemTime);
                    }, res => {
                        this.$toast(res.message)
                    });
                }, res => {
                    this.$toast(res.message)
                });
            },
            // 计算剩余时间
            sortTime(startTime, systemTime) {
                startTime = startTime.substr(0, 10) + "T" + startTime.substr(11, 8);
                systemTime = systemTime.substr(0, 10) + "T" + systemTime.substr(11, 8)
                const endTime = new Date(startTime);
                const nowTime = new Date(systemTime);
                let leftTime = parseInt((endTime.getTime() - nowTime.getTime())) + 24 * 60 * 60 * 1000
                return leftTime;
            },
            // 格式化时间
            formateDate(time) {
                let h = this.formate(parseInt(time / (60 * 60 * 1000) % 24));
                let m = this.formate(parseInt(time / (60 * 1000) % 60));
                let s = this.formate(parseInt(time / 1000 % 60));
                let ms = (parseInt(time /100 % 10));
                if (time <= 0) {
                    return '00:00:00.0';
                } else {
                    return h + ':' + m + ':' + s + '.' + ms;
                }
            },
            // 时间补零
            formate(time) {            // 倒计时部分
                if (time >= 10) {
                    return time
                } else {
                    return `0${time}`
                }
            },
            // 倒计时
            timeOut(startTime, systemTime) {
                let leftTime = this.sortTime(startTime, systemTime);
                this.timer = setInterval(() => {
                    leftTime = leftTime -100;
                    this.grouppingLeftTime = this.formateDate(leftTime);
                }, 100);
                if (leftTime <= 0) {
                    clearInterval(this.timer);
                }
            },
            // 与买家联系
            openKfDialog() {
                //    this.showOrHide = true;
                store.dispatch('getMemberData').then((res) => {
                    let data = { username: store.state.member.member.id+'_2', password: store.state.member.member.id+'_2' };
                    let ret = '';
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                    }
                    this.$http.post("/erp/account/ajaxLogin", ret).then(res => {
                        let userid = res.data.data;//res.data.data.split(",")[0];
                        this.getBase(userid);
                    });
                }).catch(res => {
                    this.$router.replace('/login');
                });
            },
            // 获得商家数据
            getBase(userid) {
                this.$http.get(`/erp/layim/base?userId=${userid}`).then(res => {
                    if (res.data.data) {
                        this.myIMData = res.data.data;
                        this.addFriend(userid);
                    } else {
                        return Toast(res.data.msg);
                    }
                })
            },
            // 添加聊天
            addFriend(selfId) {
                let kefuName = "茶帮通客服";
                let addId = 1;
                let _this = this;
                if (this.myData.member.memberId) {
                    kefuName = this.myData.member.nickName;
                    addId = this.myData.member.memberId+'_1';
                }
                this.$http.get(`/erp/layim/addFriendByMember?friend=${addId}&userId=${selfId}`).then(res => {
                    let friendId = res.data.data;
                    if (friendId == selfId) {
                        Toast({
                            message: '不能和自己聊天！',
                            position: 'center',
                            duration: 1000
                        });
                        return;
                    }
                    layui.config({
                        version: true,
                        base: '/static/mods/'
                    }).use(['mobile', 'socket', 'req', "laytpl"], function (mobile, socket, req) {
                        var layim = mobile.layim,
                            laytpl = layui.laytpl,
                            layer = mobile.layer;
                        var $ = layui.jquery;
                        var selfFlag = false;
                        //基础配置
                        layim.config({
                            init: {
                                //设置我的基础信息
                                mine: _this.myIMData.mine,
                                friend: _this.myIMData.friend,
                                group: _this.myIMData.group
                            }
                            //上传图片接口
                            , uploadImage: { url: '/erp/upload/file' }
                            //上传文件接口
                            , uploadFile: { url: '/erp/upload/file' }

                            , isAudio: true //开启聊天工具栏音频
                            , isVideo: true //开启聊天工具栏视频
                            , voice: false //开启提示音
                            , initSkin: '5.jpg' //1-5 设置初始背景
                            , notice: true //是否开启桌面消息提醒，默认false
                            , msgbox: '/erp/layim/msgbox'
                            , find: layui.cache.dir + 'css/modules/layim/html/find.html' //发现页面地址，若不开启，剔除该项即可
                            , chatLog: layui.cache.dir + 'css/modules/layim/html/chatLog.html' //聊天记录页面地址，若不开启，剔除该项即可

                            //可同时配置多个
                            , tool: [{
                                alias: 'history' //工具别名
                                , title: '聊天记录' //工具名称
                                , iconUnicode: '&#xe60e;' //图标字体的unicode，可不填
                                , iconClass: '' //图标字体的class类名
                            }],
                            brief:true
                        });

                        socket.config({
                            log: true,
                            token: `/erp/layim/getToKenById?id=${selfId}`,
                            // token:'/erp/layim/token',
                            server: 'wss://mdemows.oteao.com',
                            //server:'ws://192.168.7.8:8888',
                            //server: 'wss://java.im.test.yipicha.com',
                            reconn: true
                        });

                        //创建一个会话
                        layim.chat({
                            id: friendId
                            , name: kefuName
                            , type: 'friend' //friend、group等字符，如果是group，则创建的是群聊
                            , avatar: 'http://tp1.sinaimg.cn/1571889140/180/40030060651/1'
                        });


                        socket.on('open', function (e) {
                            console.log("监听到事件：open");
                        });
                        socket.on('close', function (e) {
                            console.log("监听到事件：close");
                        });
                        socket.on('error', function (e) {
                            console.log("监听到事件：error");
                        });
                        socket.on('msg', function (e) {
                            var msg = JSON.parse(e.data);
                            console.log(msg);
                            var handleChat = function (msg) {
                                if (selfFlag) {
                                    selfFlag = false;
                                    return;
                                }
                                layim.getMessage(msg);
                            }
                            var handleStatus = function (msg) {
                                var status = '';
                                if (typeof msg.count !== 'undefined') {
                                    status = msg.count + '人在线';
                                } else {
                                    status = msg.online ? '在线' : '离线';
                                }
                                layim.setChatStatus('<span style="color:#FF5722;">' + status + '</span>');
                            }
                            if (msg.mtype) {
                                switch (msg.mtype) {
                                    case -1:
                                        return console.log(msg.msg);
                                    case socket.mtype.chatFriend:
                                    case socket.mtype.chatGroup:
                                        handleChat(msg);
                                        break;
                                    case socket.mtype.checkIsOnline:
                                    case socket.mtype.checkOnlineCount:
                                        handleStatus(msg);
                                        break;
                                    case socket.mtype.serverNotice:
                                        layim.msgbox(msg.count);
                                        break;
                                    case socket.mtype.addFriendNotice:
                                        layim.addList({
                                            type: msg.type,
                                            avatar: msg.avatar,
                                            username: msg.username,
                                            groupid: msg.groupid,
                                            sign: msg.sign,
                                            id: msg.id
                                        });
                                        msg.mtype = socket.mtype.chatFriend;
                                        msg.content = "我们已经是好友啦，一起来聊天吧！";
                                        layim.getMessage(msg);
                                        break;
                                    case socket.mtype.onofflineNotice:
                                        layim.setFriendStatus(msg.id, msg.status);
                                        break;
                                }
                            }
                        });
                        // console.log(socket.mtype);
                        //监听在线状态的切换事件
                        layim.on('online', function (data) {
                            //console.log(data);
                        });
                        //监听签名修改
                        layim.on('sign', function (value) {
                            //console.log(value);
                        });
                        //监听自定义工具栏点击，以添加代码为例
                        // layim.on('tool(code)', function(insert){
                        //     layer.prompt({
                        //         title: '插入代码'
                        //         ,formType: 2
                        //         ,shade: 0
                        //     }, function(text, index){
                        //         layer.close(index);
                        //         insert('[pre class=layui-code]' + text + '[/pre]'); //将内容插入到编辑器
                        //     });
                        // });
                        //监听layim建立就绪
                        layim.on('ready', function () {
                            req.loading = false;
                            req.get('/erp/layim/apply-unread', {}, function (res) {
                                res.data && layim.msgbox(res.data);
                            });
                            console.log(layim.cache().friend);
                        });
                        //监听发送消息
                        layim.off('sendMessage').on('sendMessage', function (data) {
                            var To = data.to;
                            var timeStamp = data.mine.time;
                            console.log("return******" + timeStamp)
                            if (sessionStorage.getItem("msg_timestamp") == timeStamp) {
                                console.log("return******" + timeStamp)
                                return;
                            }
                            sessionStorage.setItem("msg_timestamp", timeStamp);
                            var t = data.to.type == 'friend';
                            if (!t) {
                                selfFlag = true;
                            }
                            socket.send({ mtype: (t ? socket.mtype.chatFriend : socket.mtype.chatGroup), content: data.mine.content, toid: data.to.id, id: data.mine.id, time: data.mine.time });
                            return;
                        });
                        //监听查看群员
                        layim.on('members', function (data) {
                            //console.log(data);
                        });
                        //监听天窗口的切换
                        layim.on('chatChange', function (res) {
                            var t = res.data.type == 'friend';
                            socket.send({
                                mtype: t ? socket.mtype.checkIsOnline : socket.mtype.checkOnlineCount,
                                id: res.data.id
                            });
                        });

                        //监听自定义工具栏点击，以添加代码为例
                        layim.off('tool(history)').on('tool(history)', function (insert, f, thatChat) {
                            var friendId = thatChat.data.id
                            var kefuName1 = thatChat.data.name
                            var param = "?id=" + friendId + "&userId=" + layim.cache().mine.id;
                            $.get('/erp/layim/getChatLog/0/10000' + param, {}, function (res) {
                                console.log(res.data.data)
                                //弹出一个更多聊天记录面板
                                layim.panel({
                                    title: '与 ' + kefuName1 + ' 的聊天记录' //标题
                                    , tpl: ['<div class="layim-chat-main"><ul id="LAY_view">'
                                        , '{{# layui.each(d.data, function(index, item){  if(item.id == 200512){ }}'
                                        , '    <li class="layim-chat-mine"><div class="layim-chat-user"><img src="{{ item.avatar }}" />'
                                        , '    <cite><i>{{ layui.data.date(item.timestamp) }}</i>{{ item.username }}</cite>'
                                        , '    </div><div class="layim-chat-text">{{layui.mobile.layim.content(item.content)}}</div></li>'
                                        , '  {{# } else { }}'
                                        , '    <li><div class="layim-chat-user"><img src="{{ item.avatar }}" /><cite>{{ item.username }}<i>{{ layui.data.date(item.timestamp) }}</i></cite></div><div class="layim-chat-text">{{ layui.mobile.layim.content(item.content) }}</div></li>'
                                        , '  {{# } }); }}'
                                        , '</ul></div>'
                                    ].join('') //模版
                                    , data: res.data.data
                                });
                            });
                            // layer.prompt({
                            //     title: '插入代码'
                            //     ,formType: 2
                            //     ,shade: 0
                            // }, function(text, index){
                            //     layer.close(index);
                            //     insert('[pre class=layui-code]' + text + '[/pre]'); //将内容插入到编辑器
                            // });
                        });

                        //监听查看更多记录
                        layim.off('chatlog').on('chatlog', function (data, ul) {
                            console.log(data); //得到当前会话对象的基本信息
                            console.log(ul); //得到当前聊天列表所在的ul容器，比如可以借助他来实现往上插入更多记录
                            var param = "?id=" + data.id + "&userId=" + layim.cache().mine.id;
                            $.get('/erp/layim/getChatLog/0/10000' + param, {}, function (res) {
                                console.log(res.data.data)
                                var html = laytpl(
                                    [
                                        '<textarea title="消息模版" id="LAY_tpl" style="display:none;">'
                                        , '{{# layui.each(d.data, function(index, item){  if(item.id == 200512){ }}'
                                        , '    <li class="layim-chat-mine"><div class="layim-chat-user"><img src="{{ item.avatar }}" />'
                                        , '    <cite><i>{{ layui.data.date(item.timestamp) }}</i>{{ item.username }}</cite>'
                                        , '    </div><div class="layim-chat-text">{{ layui.mobile.layim.content(item.content) }}</div></li>'
                                        , '  {{# } else { }}'
                                        , '    <li><div class="layim-chat-user"><img src="{{ item.avatar }}" /><cite>{{ item.username }}<i>{{ layui.data.date(item.timestamp) }}</i></cite></div><div class="layim-chat-text">{{ layui.mobile.layim.content(item.content) }}</div></li>'
                                        , '  {{# } }); }}'
                                        , '</textarea> '
                                    ].join('')
                                ).render({
                                    data: res.data.data
                                });

                                // var html = laytpl(
                                //     [
                                //       '<textarea title="消息模版" id="LAY_tpl" style="display:none;">'
                                //     ,'{{# layui.each(d.data, function(index, item){  if(item.id == 200512){ }}'
                                //     ,'    <li class="layim-chat-mine"><div class="layim-chat-user"><img src="{{ item.avatar }}" />'
                                //     ,'    <cite><i>{{ layui.data.date(item.timestamp) }}</i>{{ item.username }}</cite>'
                                //     ,'    </div></li>'
                                //     ,'  {{# } else { }}'
                                //     ,'  {{# } }); }}'
                                //     ,'</textarea> '
                                //     ].join('')
                                // ).render({
                                //     data: res.data.data
                                // });

                                //$('#LAY_view').html(html);
                                //弹出一个更多聊天记录面板
                                layim.panel({
                                    title: '与 ' + data.username + ' 的聊天记录' //标题
                                    , tpl: ['<div class="layim-chat-main"><ul id="LAY_view">'
                                        , '{{# layui.each(d.data, function(index, item){  if(item.id == layui.mobile.layim.cache().mine.id){ }}'
                                        , '    <li class="layim-chat-mine"><div class="layim-chat-user"><img src="{{ item.avatar }}" />'
                                        , '    <cite><i>{{ layui.data.date(item.timestamp) }}</i>{{ item.username }}</cite>'
                                        , '    </div><div class="layim-chat-text">{{layui.mobile.layim.content(item.content)}}</div></li>'
                                        , '  {{# } else { }}'
                                        , '    <li><div class="layim-chat-user"><img src="{{ item.avatar }}" /><cite>{{ item.username }}<i>{{ layui.data.date(item.timestamp) }}</i></cite></div><div class="layim-chat-text">{{ layui.mobile.layim.content(item.content) }}</div></li>'
                                        , '  {{# } }); }}'
                                        , '</ul></div>'
                                    ].join('') //模版
                                    , data: res.data.data
                                });
                            });

                        });
                    });
                });
            },
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','卖家订单详情');

            this.getData();
        }
    }
</script>



<style lang="less" scoped>
    @import url('~@/styles/seller/orderDetail.less');
</style>
