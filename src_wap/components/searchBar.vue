<!-- 
    v-model     绑定表单值


    events
        touchBar        点击搜索快时触发
        searchClick     点击搜索按钮时触发

 -->


<template>
    <div class="cbt-search-bar" @click="touch">
        <input type="text" placeholder="搜索您喜欢的好茶！" class="search-text" v-model="searchText">
        <mt-button size="small" @click="searchClick"><i class="icon-sousuo"></i></mt-button>
    </div>
</template>

<script>
    export default {
        name: 'searchBar',
        props:['value'],
        computed: {
            searchText: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input',val.trim())
                }
            }
        },
        methods: {
            touch() {
                return this.$emit('touchBar');
            },
            searchClick() {
                return this.$emit('searchClick')
            }
        }
    }
</script>