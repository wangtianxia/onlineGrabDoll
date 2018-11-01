<template>
    <!--提现  非正式合伙人弹窗-->
    <section class="withdrawAlert">
        <transition name="showAlert">
            <section class="withdrawAlertContent" v-if="showAlert" >
                <img class="closeImg1" @click="close" src="static/image/close.png" alt="">
                <p class="withdrawAlertContent1">温馨提示</p>
                <p class="withdrawAlertContent2">{{tipWords}}</p>
                <section class="withdrawAlertBtn">
                    <section @click="pay">
                        成为正式合伙人
                    </section>
                </section>
            </section>
        </transition>

    </section>

</template>

<script>
    export default {
        name: "withdrawAlert",
        data(){
            return {
                showAlert:false
            }
        },

        props:['tipWords'],

        mounted(){
            this.showAlert = true;
        },

        methods:{
            pay(){
                this.$emit('payPage');
            },
            close(){
                this.$emit('hideComp');
            }
        }
    }
</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .withdrawAlert {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 106;

        .showAlert-enter-active, .showAlert-leave-active{
            transition: all 0.2s;
        }
        .showAlert-enter{
            transform: scale(1.2);
            opacity: 0;
        }
        .showAlert-enter-to{
            transform: scale(1);
            opacity: 1;
        }

        .showAlert-lave{
            transform: scale(1);
            opacity: 1;
        }
        .showAlert-lave-to{
            transform: scale(0);
            opacity: 0;
        }

        .withdrawAlertContent {
            width: 6rem;
            height: 5.5rem;
            background-color: #ffffff;
            border-radius: 0.1rem;
            position: relative;

            .closeImg1{
                position: absolute;
                right: 0.2rem;
                top: 0.2rem;
                width: 0.3rem;
            }
            .withdrawAlertContent1{
                padding-top: 0.59rem;
                text-align: center;
                font-size: 0.3rem;
                font-weight: bold;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.03rem;
                color: #323232;
            }
            .withdrawAlertContent2{
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.48rem;
                letter-spacing: 0.03rem;
                color: #323232;
                margin-top: 1.12rem;
                text-align: center;
            }
            .withdrawAlertBtn{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 1.76rem;
                section{
                    width: 5rem;
                    height: 0.9rem;
                    background-image: linear-gradient(270deg,
                    #e96d2f 0%,
                    #ffa133 100%),
                    linear-gradient(
                            #ffffff,
                            #ffffff);
                    background-blend-mode: normal,
                    normal;
                    border-radius: 0.45rem;
                    font-size: 0.36rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.48rem;
                    letter-spacing: 0.04rem;
                    color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
</style>