<template>
    <div class="login_wrapper">
        <div class="logo_img"><img src="../../assets/images/logo.png" alt=""></div>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },

    }
</script>
<style lang="less">
    @import '~@/styles/base/tools.less';
    .login_wrapper{
        .bg(#fff);
        .logo_img{
            .w(3.1rem);
            img{
                .w(100%);
            }
        }
    }
</style>