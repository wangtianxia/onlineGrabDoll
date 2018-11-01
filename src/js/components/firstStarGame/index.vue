<template>
    <section class="firstStarGame" @click="hideFrist" v-disabletouchmove>
        <section class="ruleImg">
            <img src="static/image/rule.png" alt="">
        </section>
        <img class="hand" src="static/image/10086/share_hand.png" alt="">
        <section class="handWords">第一次游戏，请查看游戏说明哦</section>
    </section>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            hideFrist() {
                this.$emit('hideFirstGame');
            }
        }
    }
</script>

<style scoped>
    .firstStarGame {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(0, 0, 0, .5);
        z-index: 10000;
        position: absolute;
        top: 0;
        left: 0;
    }

    .ruleImg {
        position: absolute;
        display: flex;
        right: .4rem;
        top: 1.1rem;
    }

    .ruleImg > img {
        width: 1.4rem;
        height: .36rem;
    }

    .hand {
        position: absolute;
        right: 0.81rem;
        top: 1.8rem;
        width: 0.89rem;
    }

    .handWords {
        position: absolute;
        right: 0.21rem;
        top: 3rem;
        width: 4.89rem;
        color: white;
        font-size: 0.3rem;
        text-align: right;
    }
</style>
