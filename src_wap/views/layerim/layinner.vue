<template>
  <div class="layui-container"></div>
</template>

<script>
    export default {
        name:'layinner',
        data(){
            return {
                flag: false,
                myData:{
                    mine: {
                        "username": "纸飞机" //我的昵称
                        ,"id": 123 //我的ID
                        ,"avatar": "http://tvax1.sinaimg.cn/crop.0.0.300.300.180/006Iv8Wjly8ff7ghbigcij308c08ct8i.jpg" //我的头像
                        ,"sign": "懒得签名"
                    }
                    //我的好友列表
                    ,friend: [{
                        "groupname": "前端码屌"
                        ,"id": 1
                        ,"online": 2
                        ,"list": [{
                        "username": "贤心"
                        ,"id": "100001"
                        ,"avatar": "http://tp1.sinaimg.cn/1571889140/180/40030060651/1"
                        ,"sign": "这些都是测试数据，实际使用请严格按照该格式返回"
                        },{
                        "username": "Z_子晴"
                        ,"id": "108101"
                        ,"avatar": "http://tva3.sinaimg.cn/crop.0.0.512.512.180/8693225ajw8f2rt20ptykj20e80e8weu.jpg"
                        ,"sign": "微电商达人"
                        },{
                        "username": "Lemon_CC"
                        ,"id": "102101"
                        ,"avatar": "http://tp2.sinaimg.cn/1833062053/180/5643591594/0"
                        ,"sign": ""
                        },{
                        "username": "马小云"
                        ,"id": "168168"
                        ,"avatar": "http://tp4.sinaimg.cn/2145291155/180/5601307179/1"
                        ,"sign": "让天下没有难写的代码"
                        ,"status": "offline"
                        },{
                        "username": "徐小峥"
                        ,"id": "666666"
                        ,"avatar": "http://tp2.sinaimg.cn/1783286485/180/5677568891/1"
                        ,"sign": "代码在囧途，也要写到底"
                        }]
                    },{
                        "groupname": "网红"
                        ,"id": 2
                        ,"online": 3
                        ,"list": [{
                        "username": "罗玉凤"
                        ,"id": "121286"
                        ,"avatar": "http://tp1.sinaimg.cn/1241679004/180/5743814375/0"
                        ,"sign": "在自己实力不济的时候，不要去相信什么媒体和记者。他们不是善良的人，有时候候他们的采访对当事人而言就是陷阱"
                        },{
                        "username": "长泽梓Azusa"
                        ,"id": "100001222"
                        ,"sign": "我是日本女艺人长泽あずさ"
                        ,"avatar": "http://tva1.sinaimg.cn/crop.0.0.180.180.180/86b15b6cjw1e8qgp5bmzyj2050050aa8.jpg"
                        },{
                        "username": "大鱼_MsYuyu"
                        ,"id": "12123454"
                        ,"avatar": "http://tp1.sinaimg.cn/5286730964/50/5745125631/0"
                        ,"sign": "我瘋了！這也太準了吧  超級笑點低"
                        },{
                        "username": "谢楠"
                        ,"id": "10034001"
                        ,"avatar": "http://tp4.sinaimg.cn/1665074831/180/5617130952/0"
                        ,"sign": ""
                        },{
                        "username": "柏雪近在它香"
                        ,"id": "3435343"
                        ,"avatar": "http://tp2.sinaimg.cn/2518326245/180/5636099025/0"
                        ,"sign": ""
                        }]
                    },{
                        "groupname": "我心中的女神"
                        ,"id": 3
                        ,"online": 1
                        ,"list": [{
                        "username": "林心如"
                        ,"id": "76543"
                        ,"avatar": "http://tp3.sinaimg.cn/1223762662/180/5741707953/0"
                        ,"sign": "我爱贤心"
                        },{
                        "username": "佟丽娅"
                        ,"id": "4803920"
                        ,"avatar": "http://tp4.sinaimg.cn/1345566427/180/5730976522/0"
                        ,"sign": "我也爱贤心吖吖啊"
                        }]
                    }]
                    ,group: [{
                        "groupname": "前端群"
                        ,"id": "101"
                        ,"avatar": "http://tp2.sinaimg.cn/2211874245/180/40050524279/0"
                    },{
                        "groupname": "Fly社区官方群"
                        ,"id": "102"
                        ,"avatar": "http://tp2.sinaimg.cn/5488749285/50/5719808192/1"
                    }]
                }
            }
        },
        created(){
            this.login();
            // this.flag = true;
        },
        watch:{
            flag(val){
                if(val){
                    let that = this;
                    // console.log(this.myData);
                    layui.config({
                        version: true,
                        base: '/static/mods/'
                    }).use(['mobile'], function(mobile){
                        var layim = mobile.layim,
                            layer = mobile.layer;
                        var $ =layui.jquery;
                        var selfFlag = false;
                        //基础配置
                        layim.config({
                            //初始化接口
                            init: {
                                mine: that.myData.mine,
                                friend: that.myData.friend,
                                group: that.myData.group
                            }
                            //查看群员接口
                            ,members: {
                                url: '/erp/layim/members'
                            }
                            //上传图片接口
                            ,uploadImage: {url: '/erp/upload/file'}
                            //上传文件接口
                            ,uploadFile: {url: '/erp/upload/file'}

                            ,isAudio: true //开启聊天工具栏音频
                            ,isVideo: true //开启聊天工具栏视频
                            ,initSkin: '5.jpg' //1-5 设置初始背景
                            ,notice: true //是否开启桌面消息提醒，默认false
                            ,msgbox: '/erp/layim/msgbox'
                            ,find: layui.cache.dir + 'css/modules/layim/html/find.html' //发现页面地址，若不开启，剔除该项即可
                            ,chatLog: layui.cache.dir + 'css/modules/layim/html/chatLog.html' //聊天记录页面地址，若不开启，剔除该项即可

                        });
                        socket.config({
                            log:true,
                            // token:'/erp/layim/getToKenById?id=204736',
                            token:'/erp/layim/token',
                            server:'ws://192.168.7.212:8888'
                        });

                        socket.on('open',function (e) {
                            console.log("监听到事件：open");
                        });
                        socket.on('close',function (e) {
                            console.log("监听到事件：close");
                        });
                        socket.on('error',function (e) {
                            console.log("监听到事件：error");
                        });
                        socket.on('msg',function (e) {
                            var msg = JSON.parse(e.data);
                            console.log(msg);
                            var handleChat = function (msg) {
                                if (selfFlag) {
                                    selfFlag = false;
                                    return;
                                }
                                layim.getMessage(msg);
                            }
                            var handleStatus=function (msg) {
                                var status ='';
                                if(typeof msg.count !== 'undefined'){
                                    status = msg.count+'人在线';
                                }else{
                                    status = msg.online?'在线':'离线';
                                }
                                layim.setChatStatus('<span style="color:#FF5722;">'+status+'</span>');
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
                                            type:msg.type,
                                            avatar:msg.avatar,
                                            username:msg.username,
                                            groupid:msg.groupid,
                                            sign:msg.sign,
                                            id:msg.id
                                        });
                                        msg.mtype=socket.mtype.chatFriend;
                                        msg.content="我们已经是好友啦，一起来聊天吧！";
                                        layim.getMessage(msg);
                                        break;
                                    case socket.mtype.onofflineNotice:
                                        layim.setFriendStatus(msg.id,msg.status);
                                        break;
                                }
                            }
                        });
                        // console.log(socket.mtype);
                        //监听在线状态的切换事件
                        layim.on('online', function(data){
                            //console.log(data);
                        });
                        //监听签名修改
                        layim.on('sign', function(value){
                            //console.log(value);
                        });
                        //监听自定义工具栏点击，以添加代码为例
                        layim.on('tool(code)', function(insert){
                            layer.prompt({
                                title: '插入代码'
                                ,formType: 2
                                ,shade: 0
                            }, function(text, index){
                                layer.close(index);
                                insert('[pre class=layui-code]' + text + '[/pre]'); //将内容插入到编辑器
                            });
                        });
                        //监听layim建立就绪
                        layim.on('ready', function(){
                            req.loading = false;
                            req.get('/layim/apply-unread',{},function (res) {
                                res.data&&layim.msgbox(res.data);
                            });
                        console.log(layim.cache().friend);
                        });
                        //监听发送消息
                        layim.on('sendMessage', function(data){
                            var To = data.to;
                            var t = data.to.type=='friend';
                            if(!t){
                                selfFlag = true;
                            }
                            socket.send({mtype:(t?socket.mtype.chatFriend:socket.mtype.chatGroup),content:data.mine.content,toid:data.to.id});
                            return;
                        });
                        //监听查看群员
                        layim.on('members', function(data){
                            //console.log(data);
                        });
                        //监听天窗口的切换
                        layim.on('chatChange', function(res){
                            var t = res.data.type=='friend';
                            socket.send({
                                mtype:t? socket.mtype.checkIsOnline:socket.mtype.checkOnlineCount,
                                id:res.data.id
                            });
                        });
                    });
                }
            }
            
        },
        methods:{
            login(){
                let data = {username: 'test',password: '123456'};
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
                this.$http.post("/erp/account/login",ret).then(res=>{
                    this.getBase();
                });
            },
            getBase(){
                this.$http.get("/erp/layim/base").then(res=>{
                    this.myData = res.data;
                    this.flag = true;
                    // return res.data;
                })
            }
        }
    }
</script>
<style>
    body .layim-title{
        height: .88rem;
        line-height: .88rem;
        font-size: 14px;
    }
    body .chat-wrapper{
        z-index: 2000;
    }
    body .layim-chat-main,body .layim-content,body .layui-layim{
        top: .88rem;
    }
    body .layui-m-layermain,body .layui-m-layershade{
        height: calc(100% - .98rem);
    }
    body .layim-panel,body .layim-content{
        bottom: .98rem;
    }
    .layui-layim-tab{
        display: none;
    }
    body .layui-m-anim-lout,body .layui-m-anim-left{
        bottom:0 ;
    }
    body .layim-title .layim-chat-back{
        font-size: 18px;
    }
</style>
