<template>
    <div>这是首页
        <cbt-date></cbt-date>
    </div>
</template>

<script>
import cbtDate from '../../components/datePicker.vue'
    export default {
        components: {
            cbtDate
        },
        data() {
            return {
                title: '123'
            }
        },
        created(){
            // 设置title
            this.$store.commit('SET_TITLE','茶帮通商城');
            
            if(location.href.indexOf('?wxpaycallback=') !== -1 ){
                // 表示微信支付回调
                // let src = location.href.split('?')[1].split('#')[0].split('=')[1];
                let src = location.href.split('?')[1].split('#')[0].split('%20');
                let payId = src[0].split('=')[1];
                location.replace(location.origin + `/#/balance/payview?payId=${payId}&wx=wxpaycallback&type=${src[1]}`);
            }
        }
    }
</script>
