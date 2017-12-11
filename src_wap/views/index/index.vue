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
            setTimeout(() => {
                this.title = '999'
                this.$emit('updateHead',this.title)
            },2000)
            console.log(location.href);
            if(location.href.indexOf('?wxpaycallback=') !== -1 ){
                // 表示微信支付回调
                let src = location.href.split('?')[1].split('#')[0].split('=')[1];
                location = location.origin + `/#/balance/payview?payId=${src}`
            }
        },
        head: {
            title() {
                return {
                    inner : this.title
                }
            }
        }
    }
</script>
