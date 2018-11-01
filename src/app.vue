<template>
    <section class="root">
        <!--<transition name="fade" >-->
           <!---->
        <!--</transition>-->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <canvas id="video-canvas"></canvas>
    </section>
</template>

<script>
    export default {
        name: "app",
    }
</script>

<style scoped>
    .root{
        height: 100%;
        /*-webkit-overflow-scrolling:touch;*/
        /*overflow-y: scroll;*/
    }
    #video-canvas{
        display: none;
        width:7.5rem;
        height: 10rem;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
    }

    /*.fade-enter-active, .fade-leave-active {*/
        /*transition: all 0.5s;*/
    /*}*/
    /*.fade-enter, .fade-leave-active {*/
        /*opacity: 0;*/
    /*}*/
    /*.fade-leave-active {*/
        /*transform: translateX(7.50rem);*/
    /*}*/
    /*.fade-enter{*/
        /*transform: translateX(7.50rem);*/
    /*}*/
    /*.fade-enter-action{*/
        /*transform: translateX(-7.50rem);*/
    /*}*/
</style>