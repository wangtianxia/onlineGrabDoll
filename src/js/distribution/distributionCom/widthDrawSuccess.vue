<template>
    <!--提现成功弹窗-->
    <section class="paySuccess" v-disabletouchmove>
        <transition name="showAlert">
            <section class="paySuccessCon" v-if="showSuccess">
                <p class="paySuccessCon1">恭喜您!</p>
                <p class="paySuccessCon2">提交申请成功</p>
                <p class="paySuccessCon3">您申请提现的{{tempBalance}}元会在1-2个<br/>工作日内发放到微信零钱中！
                </p>
                <p class="paySuccessCon5" @click="goRecode">提现明细可在历史提现记录中查看</p>
                <section class="paySuccessCon4">
                    <section @click="closePaySucess">
                        确认
                    </section>
                </section>
            </section>
        </transition>
    </section>
</template>

<script>
    export default {
        name: "paySucess",
        data(){
            return {
                showSuccess:false
            }
        },
        props:['tempBalance'],
        mounted(){
            this.showSuccess = true;
        },
        methods:{
            closePaySucess(){
                this.$emit('closeWithDrawSuccess');
            },
            goRecode(){
                this.$router.push('/withdrawList');
            }
        }
    }
</script>

<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .paySuccess {
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
        .paySuccessCon{
            width: 6rem;
            height: 6rem;
            background-color: #ffffff;
            border-radius: 0.1rem;
            line-height: 1;
            .paySuccessCon1{
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.03rem;
                color: #323232;
                text-align: center;
                margin-top: 0.59rem;
            }
            .paySuccessCon2{
                font-size: 0.36rem;
                font-weight: bold;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.04rem;
                color: #323232;
                margin-top: 0.29rem;
                text-align: center;
            }
            .paySuccessCon3{
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.4rem;
                letter-spacing: 0.03rem;
                color: #323232;
                text-align: center;
                margin-top: 0.47rem;
            }
            .paySuccessCon5{
                text-decoration: underline;
                font-size: 0.28rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.01rem;
                color: #008dd6;
                text-align: center;
                margin-top: 0.4rem;
            }
            .paySuccessCon4{
                margin-top: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                section{
                    width: 4rem;
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