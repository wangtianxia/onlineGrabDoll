<template>
    <section class="loading">
        <h3>正在加载中请稍等...</h3>
    </section>
</template>

<script>
    export default {
        name: "loadimg"
    }
</script>

<style scoped>
    .loading{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        font-size: 0.3rem;
        background-color: white;
    }
</style>
