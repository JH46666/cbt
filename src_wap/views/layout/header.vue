<template>
    <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈" class="cbt-header">
        <mt-button icon="back" slot="left" @click="$router.go(-1)">返回</mt-button>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
</template>

<script>
    export default {
        name: 'header',
    }
</script>