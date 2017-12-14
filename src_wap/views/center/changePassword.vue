<template>
    <div class="change-password">
        <div class="input-wrap">
            <input type="password" placeholder="输入原密码" v-model="oldPassword" maxlength="16">
        </div>
        <div class="input-wrap">
            <input type="password" placeholder="输入新密码" v-model="newPassword" maxlength="16">
        </div>
        <div class="input-wrap">
            <input type="password" placeholder="重复新密码" v-model="newPasswords" maxlength="16">
        </div>
        <div class="input-wrap">
            <input type="number" placeholder="请输入图片验证码" v-model="imgText" maxlength="4">
            <div class="img-wrap">
                <img :src="imgSrc" @click="imgSrc = `/api/oteao/recaptcha/getReCaptha?v=${Math.random()}`">
            </div>
        </div>
        <div class="btn-bar">
            <!--   -->
            <mt-button type="default" :disabled="!disabled" @click="save">确定</mt-button>
        </div>
    </div>
</template>



<script>
    import { mapState } from 'vuex'
    import store from 'store';
    export default {
        data() {
            return {
                oldPassword: '',
                newPassword: '',
                newPasswords: '',
                imgText: '',
                imgSrc: `/api/oteao/recaptcha/getReCaptha?v=${Math.random()}`
            }
        },
        computed: {
            disabled() {
                return this.oldPassword !== '' && this.newPassword !== '' && this.newPasswords !== '' && this.imgText !== ''
            }
        },
        methods: {
            save() {
                let exp = /[^0-9A-Za-z\\`~!@#$%\^&*\(\)+=|{}':;,\[\].<>\/?~！@#￥%……&*（）——+{}【】‘；：”“'。，、？]/g;
                if(exp.test(this.newPassword)) {
                    return  this.$toast('密码格式输入错误')
                } else if(this.newPassword !== this.newPasswords) {
                    return this.$toast('两次密码不一致')
                } else if(this.newPassword.length < 6){
                    return this.$toast('密码长度不能小于6位')
                }

                this.$api.post('/oteao/memberAccount/updatePwd', {
                    password: this.oldPassword,
                    newPwd: this.newPassword,
                    reCaptcha: this.imgText
                },res => {
                    this.$toast('密码修改成功');
                    this.$router.go(-1);
                },res => { 
                    if(res.code === 3010) {
                        this.$toast('旧密码错误')
                    }
                    if(res.code === 3011) {
                        this.$toast(res.cnMessage)
                    } 
                    if(res.code === 3998) {
                        this.$toast('图形验证码不正确')
                    }
                    this.imgSrc = `/api/oteao/recaptcha/getReCaptha?v=${Math.random()}`;
                })
            }
        },
        // 进来先判断登陆与否
        beforeRouteEnter(to, from, next) {
            if(!store.state.member.member.id) {
                store.dispatch('getMemberData').then((res) => {
                    next();
                }).catch(res => {
                    next(vm => vm.router.go(-1));
                })
            } else {
                next();
            }
        }
    }
</script>




<style lang="less" scoped>
    @import url('~@/styles/center/changePassword.less');
</style>