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
        data(){
            return {

            }
        },
        created(){
            layui.cache.page = '';
            layui.cache.user = {
                username: '游客'
                ,uid: -1
                ,avatar: '../res/images/avatar/00.jpg'
                ,experience: 83
                ,sex: '男'
            };
            layui.config({
                version: "2.0.0"
                ,base: '/js/mods/'
            }).extend({
                socket: 'socket',
                req:'req',
                fly: 'index'
            }).use('fly');
            var events = {};
            layui.use('jquery',function ($) {
                //注册全局js onclick事件
                $(function () {
                    $('body').on('click', '*[lay-event]', function(e){
                        var othis = $(this), method = othis.attr('lay-event');
                        events[method]?events[method].call(this,othis,e):'';
                    });
                });
            })
        }
        
    }
        
</script>