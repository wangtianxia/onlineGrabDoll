<template>
    <!--提现二级弹窗-->
    <section class="alertContent" v-disabletouchmove>
        <transition name="showAlert">
            <section class="alertInfo" v-if="showAlert">
                <p class="alertInfoTip">温馨提示</p>
                <p class="alertInfoCont">是否提取{{balanceMoney}}元</p>
                <section class="alertInfoBtn">
                    <section class="left" @click="cancel">取消</section>
                    <section @click="sure">确认</section>
                </section>
            </section>
        </transition>
    </section>
</template>

<script>
    export default {
        name: "notWithdraw",
        data(){
            return {
                showAlert:false
            }
        },

        props:['balanceMoney'],

        mounted(){
            this.showAlert = true;
        },

        methods:{
            cancel(){
                this.$emit('closeNotMoney')
            },
            sure(){
                this.$emit('sureWithdraw')
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
            height: 3rem;
            background-color: white;
            border-radius: 0.2rem;
            position: relative;
            line-height: 1;

            .alertInfoTip{
                text-align: center;
                font-size: 0.45rem;
                margin-top: 0.4rem;
                line-height: 1;
            }

            .alertInfoCont{
                text-align: center;
                font-size: 0.3rem;
                margin-top: 0.35rem;
                line-height: 1;
            }

            .alertInfoBtn{
                height: 1rem;
                font-size: 0.26rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.48rem;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                section{
                    width: 50%;
                    height: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    color: black;
                    font-size: 0.35rem;
                }

                section:nth-of-type(1){
                    left: 0;
                    bottom: 0;
                }
                section:nth-of-type(2){
                    right: 0;
                    bottom: 0;
                    color: #1e8cbe;
                }
            }
            .alertInfoBtn::after{
                position: absolute;
                content: '';
                left: 0;
                top: 0;
                background-color: #eee;
                width: 100%;
                height: 1px;
            }
            .alertInfoBtn::before{
                 position: absolute;
                 content: '';
                 left: 50%;
                 top: 0;
                 background-color: #eee;
                 width: 1px;
                 height: 100%;
             }
        }
    }
</style>