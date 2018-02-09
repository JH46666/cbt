<template>
  <div class="layui-container">  
        常规布局（以中型屏幕桌面为例）：
        <div class="layui-row">
            <div class="layui-col-md9">
            你的内容 9/12
            </div>
            <div class="layui-col-md3">
            你的内容 3/12
            </div>
        </div>
            
        移动设备、平板、桌面端的不同表现：
        <div class="layui-row" id="is">
            <div class="layui-col-xs6 layui-col-sm6 layui-col-md4">
            移动：6/12 | 平板：6/12 | 桌面：4/12
            </div>
            <div class="layui-col-xs6 layui-col-sm6 layui-col-md4">
            移动：6/12 | 平板：6/12 | 桌面：4/12
            </div>
            <div class="layui-col-xs4 layui-col-sm12 layui-col-md4">
            移动：4/12 | 平板：12/12 | 桌面：4/12
            </div>
            <div class="layui-col-xs4 layui-col-sm7 layui-col-md8">
            移动：4/12 | 平板：7/12 | 桌面：8/12
            </div>
            <div class="layui-col-xs4 layui-col-sm5 layui-col-md4">
            移动：4/12 | 平板：5/12 | 桌面：4/12
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'layimdemo',
        data(){
            return {

            }
        },
        created(){
            let data = {username: 'test',password: '123456'};
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            // this.$http.post("/erp/account/login",ret).then(res=>{
                layui.config({
                    version: true,
                    base: '/static/mods/'
                }).use(['mobile','socket','req'], function(mobile,socket,req){
                    var layim = mobile.layim,
                        layer = mobile.layer;
                    console.log(socket);
                    var $ =layui.jquery;
                    var selfFlag = false;
                    //基础配置
                    layim.config({
                        //初始化接口
                        init: {
                            url: '/erp/layim/base'

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
                        token:'/erp/layim/getToKenById?id=204736',
                        server:'ws://192.168.7.68:8888'
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
            // });
        },
    }
        
</script>
