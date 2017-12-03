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
