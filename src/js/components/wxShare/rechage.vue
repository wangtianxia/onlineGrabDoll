<template>
    <section class="couponTip" @click="closeTip">
        <img class="couponImg" src="static/image/cashCoupon.png" alt="">
        <img class="shareHand" src="static/image/10086/share_hand.png"/>
    </section>
</template>

<script>
    export default {
        name: "rechage",
        methods:{
            closeTip(){
                this.$emit('tipCloseCoupon')
            }
        }
    }
</script>

<style lang="less" scoped>
    .couponTip{
        width: 100%;
        height: 100%;
        z-index: 100;
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,0.5);
        .couponImg{
            position: absolute;
            top: .20rem;
            right: .30rem;
            color: #ec4776;
            font-size: .30rem;
            width: 0.78rem;
            height: 0.78rem;
            z-index: 1;
        }
        .shareHand{
            position: absolute;
            right: 0.4rem;
            top: 1.2rem;
            animation: handAc 0.2s ease infinite;
            width: 0.6rem;
            z-index: 3;
        }
        @keyframes handAc {
            from{
                transform: translate(0,0);
            }
            to{
                transform: translate(0,0.5rem);
            }
        }
    }
</style>