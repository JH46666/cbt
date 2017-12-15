<template>
    <div class="shop-detail">
        <div class="hd">
            <div class="shop-img">
                <img src="" alt="">
            </div>
            <div class="detai-row">
                <h4>单位名称</h4>
                <p>很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长</p>
            </div>
            <div class="detai-row">
                <h4>详细地址</h4>
                <p>很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长</p>
            </div>
        </div>
        <div class="bd">
            <div class="type-row">
                <div class="left">类型</div>
                <div class="center"><span class="tag">茶仓</span></div>
            </div>
            <div class="type-row">
                <div class="left">信誉</div>
                <div class="center"><span class="level level-1"></span><span class="level level-2"></span><span class="level level-3"></span><span class="level level-4"></span></div>
            </div>
            <div class="type-row">
                <div class="left">联系人</div>
                <div class="center">白。</div>
            </div>
            <div class="type-row" @click="editTel = true">
                <div class="left">服务电话</div>
                <div class="center">18659728533</div>
                <div class="right"><i class="iconfont">&#xe744;</i></div>
            </div>
            <div class="type-row" @click="editAlipay = true">
                <div class="left">支付宝</div>
                <div class="center">18659728533</div>
                <div class="right"><i class="iconfont">&#xe744;</i></div>
            </div>
        </div>
        <transition name="down-slow">
            <div class="dialog-bg" v-if="editTel || editAlipay">
                <div class="dialog" v-if="editTel">
                    <div class="title">修改电话</div>
                    <div class="input-row">
                        <input type="tel" maxlength="13">
                    </div>
                    <p class="tips">用于买家联系您使用，请填写您常用的号码</p>
                    <div class="btn-bar">
                        <mt-button type="default" @click="editTel = editAlipay = false">取消</mt-button><mt-button type="default">修改</mt-button>
                    </div>
                </div>
                <div class="dialog" v-if="editAlipay">
                    <div class="title">修改支付宝</div>
                    <div class="input-row">
                        <input type="tel" maxlength="13">
                    </div>
                    <p class="tips">后续交易金额将转入此账户，请务必填写正确</p>
                    <div class="btn-bar">
                        <mt-button type="default" @click="editTel = editAlipay = false">取消</mt-button><mt-button type="default">修改</mt-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                editTel: false,
                editAlipay: false
            }
        }
    }    
</script>


<style lang="less" scoped>
    @import url('~@/styles/seller/shopDetail.less');
</style>