<template>
    <!--1758签到-->
    <section class="Sign1758" @click="hide" v-disabletouchmove>
        <section class="coinNum">
            {{sign1758Text}}
        </section>
    </section>
</template>

<script>
    export default {
        name: "1758-sign",
        props: ['sign1758Text'],
        methods: {
            hide() {
                this.$emit('closeComment');
            }
        }
    }
</script>

<style scoped>
    .Sign1758 {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .coinNum {
        font-size: 0.4rem;
        padding-top: 3rem;
        text-align: center;
        color: white;
    }
</style>