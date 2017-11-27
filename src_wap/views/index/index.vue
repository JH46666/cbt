<template>
    <div>这是首页</div>
</template>



<script>
    export default {
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