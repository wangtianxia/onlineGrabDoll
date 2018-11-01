<template>
    <!--提现没钱弹窗-->
    <section class="alertContent" v-disabletouchmove>
        <transition name="showAlert">
            <section class="alertInfo" v-if="showAlert">
                <p>温馨提示</p>
                <p>提现金额不足</p>
                <section class="alertInfoBtn" @click="sureTempPromote">确认</section>
            </section>
        </transition>
    </section>
</template>

<script>
    export default {
        name: "notPromotTip",
        data(){
            return {
                showAlert:false
            }
        },

        props:['withDrawmoney'],

        mounted(){
            this.showAlert = true;
        },

        methods:{

            sureTempPromote(){
                this.$emit('closeNotMoney')
            }
        }
    }
</script>

<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
    }

    .alertContent{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
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

        .alertInfo{
            width: 6rem;
            height: 3.5rem;
            background-color: white;
            border-radius: 0.2rem;
            .alertInfoBtn{
                border-radius: 0.45rem;
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.48rem;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                width: 50%;
                margin-left: 25%;

                height: 0.8rem;
                background-image: linear-gradient(270deg,
                #e96d2f 0%,
                #ffa133 100%),
                linear-gradient(
                        #ffffff,
                        #ffffff);
                background-blend-mode: normal,
                normal;
                border-radius: 0.45rem;
            }
            p:nth-of-type(1){
                text-align: center;
                font-size: 0.4rem;
                line-height: 1;
                margin-top: 0.5rem;
                margin-bottom: 0.4rem;
            }
            p:nth-of-type(2){
                text-align: center;
                font-size: 0.3rem;
                margin-bottom: 0.5rem;
            }
        }
    }
</style>