<template>
    <div class="layui-container"></div>
</template>


<script>
    import store from 'store';
    export default {
        name: 'layinner',
        data() {
            return {
                flag: false,
                userid: null,
                myData: {
                    mine: {},
                    friend: [],
                    group: []
                }
            }
        },
        created() {
            this.login();
            // this.flag = true;
        },
        watch: {
            flag(val) {
                if (val) {
                    let _this = this;
                    layui.config({
                        version: true,
                        base: '/static/mods/'
                    }).use(['mobile', 'socket', 'req'], function (mobile, socket, req) {
                        var layim = mobile.layim,
                            layer = mobile.layer;
                        layer.closeAll();
                        var $ = layui.jquery;
                        var selfFlag = false;
                        console.log(_this.myData);
                        //基础配置
                        layim.config({
                            //初始化接口
                            init: {
                                mine: _this.myData.mine,
                                friend: _this.myData.friend,
                                group: _this.myData.group
                            }
                            //查看群员接口
                            , members: {
                                url: '/erp/layim/members'
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
                            , title:'我的消息'
                            ,chatTitleColor:'#fafafa'
                            , find: layui.cache.dir + 'css/modules/layim/html/find.html' //发现页面地址，若不开启，剔除该项即可
                            , chatLog: layui.cache.dir + 'css/modules/layim/html/chatLog.html' //聊天记录页面地址，若不开启，剔除该项即可
                            //可同时配置多个
                            , tool: [{
                                alias: 'history' //工具别名
                                , title: '聊天记录' //工具名称
                                , iconUnicode: '&#xe60e;' //图标字体的unicode，可不填
                                , iconClass: '' //图标字体的class类名
                            }]

                        });

                        let wsServer = window.location.host=='m.oteao.com'?'wss://im.oteao.com':'wss://mdemows.oteao.com';
                        socket.config({
                            log: true,
                            token: `/erp/layim/getToKenById?id=${_this.userid}`,
                            // token:'/erp/layim/token',
                            // server:'ws://192.168.7.8:8888',
                            server: wsServer,
                            //server: 'wss://java.im.test.yipicha.com'
                            //server: 'ws://java.im.test.yipicha.com:8888',
                            reconn: true
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
                            if (sessionStorage.getItem("msg_timestamp") == timeStamp) {
                                console.log("return*@@@" + timeStamp)
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
                            $(".layui-m-layer").css('z-index','120');
                        });
                        //监听返回
                        layim.on('back', function(){
                          $(".layui-m-layer").css('z-index','10');
                        });
                        //监听自定义工具栏点击，以添加代码为例
                        layim.off('tool(history)').on('tool(history)', function (insert, f, thatChat) {
                            var friendId = thatChat.data.id
                            var kefuName1 = thatChat.data.name
                            var selfId = layim.cache().mine.id;
                            var param = "?id=" + friendId + "&userId=" + layim.cache().mine.id;
                            $.get('/erp/layim/getChatLog/0/10000' + param, {}, function (res) {
                                console.log(res.data.data)
                                //弹出一个更多聊天记录面板
                                layim.panel({
                                    title: '与 ' + kefuName1 + ' 的聊天记录' //标题
                                    , tpl: ['<div class="layim-chat-main"><ul id="LAY_view">'
                                        , '{{# layui.each(d.data, function(index, item){  if(item.id == '+selfId+'){ }}'
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

                        //监听查看更多记录
                        layim.off('chatlog').on('chatlog', function (data, ul) {
                            console.log(data); //得到当前会话对象的基本信息
                            console.log(ul); //得到当前聊天列表所在的ul容器，比如可以借助他来实现往上插入更多记录
                            var param = "?id=" + data.id + "&userId=" + layim.cache().mine.id;
                            $.get('/erp/layim/getChatLog/0/10000' + param, {}, function (res) {
                                console.log(res.data.data)
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
                }
            }

        },
        methods: {
            login() {
                let data = { username: store.state.member.member.id+'_2', password: store.state.member.member.id+'_2' };
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
                this.$http.post("/erp/account/ajaxLogin", ret).then(res => {
                    this.userid = res.data.data;//res.data.data.split(",")[0];
                    var currentUserId = res.data.data;
                    if(localStorage.getItem("layim-mobile")==null||localStorage.getItem("layim-mobile")==''||localStorage.getItem("layim-mobile")=='{}'){
                        this.$http.get("/erp/layim/getChatHistory/0/" + currentUserId).then(res => {
                            localStorage.setItem("layim-mobile", JSON.stringify(res.data.data));
                            this.getBase(this.userid);
                        });
                    } else {
                        this.getBase(this.userid);
                    }
                    $(".layui-m-layer").css('z-index','10');
                });

            },
            getBase(userid) {
                this.$http.get(`/erp/layim/base?userId=${userid}`).then(res => {
                    if (res.data.data) {
                        this.myData = res.data.data;
                        this.flag = true;
                    }
                    // return res.data;
                })
            }
        }
    }
</script>
<style scoped>
    body .layim-title {
        height: .88rem;
        line-height: .88rem;
        font-size: 14px;
    }

    body .layim-chat-footer {
        left: 0;
        right: 0;
        background: #eee;
        padding: 0 10px;
    }

    body .chat-wrapper {
        z-index: 2000;
    }

    body .layim-chat-main,
    body .layim-content,
    body .layui-layim {
        top: .88rem;
    }

    body .layui-m-layermain,
    body .layui-m-layershade {
        height: calc(100% - .98rem);
    }

    body .layim-panel,
    body .layim-content {
        /* bottom: .98rem; */
    }


    body .layui-m-anim-lout,
    body .layui-m-anim-left {
        bottom: 0;
    }

    body .layim-title .layim-chat-back {
        font-size: 18px;
    }
</style>
