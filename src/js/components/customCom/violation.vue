<template>
    <div class="violation" v-disabletouchmove>
        <img src="static/image/canNot.jpg" alt="">
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="less">
    .violation{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,.7);
        img{
            width: 5.6rem;
            height: 5.7rem;
        }
    }
</style>