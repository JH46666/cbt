<template lang="html">
    <div class="packet">
        <div class="packet_banner">

        </div>
        <div class="packet_user">
            <div class="pactet_bg"></div>
            <div class="packet_user_wrapper">

            </div>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '~@/styles/base/tools.less';
.packet{
    .packet_banner{
        width: 100%;
        height: 2.2rem;
        .bg(#000);
    }
    .packet_user{
        width: 100%;
        padding: .3rem;
        .bg(pink);
        .position(r);
        .pactet_bg{
            width: 100%;
            .position(a);
            height: .12rem;
            top: -0.12rem;
            left: 0;
            z-index: 3000;
            background-image: url('../../assets/images/four_bg.png');
            background-repeat: no-repeat;
            background-size: 100%;
        }
        .packet_user_wrapper{
            width: 100%;
            height: .72rem;
        }
    }

}
</style>
