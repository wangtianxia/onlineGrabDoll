<template>
    <!--成为正式合伙人 支付弹窗-->
    <section class="alertContent" >
        <transition name="showAlert">
            <section class="alertInfo" v-if="showAlert">
                <goBack @returnToIndex="returnBack"/>
                <img class="canPromote" src="static/image/distribution/canPromote.jpg" alt="">
                <section class="alertInfoBtn" @click="sureTempPromote">成为正式合伙人 <span>(￥199)</span> </section>
            </section>
        </transition>
    </section>
</template>

<script>

    import goBack from '../../components/return/index'
    export default {
        name: "alert",
        data(){
            return {
                showAlert:false,
                // imgBg:require('../../../../static/image/distribution/canPromote.png')
            }
        },

        mounted(){
            this.showAlert = true;
        },

        methods:{

            sureTempPromote(){
                this.$emit('payTipBtn');
            },
            closePay(){
                this.$emit('hideComp')
            },
            returnBack(){
                this.closePay()
            }
        },
        components:{
            goBack
        }
    }
</script>

<style lang="less" scoped>
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
            transform: scale(0);
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
            border-radius: 0.2rem;
            display: flex;
            position: relative;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;

            .alertInfoBtn{
                width: 5.01rem;
                height: 0.9rem;
                background-image: -webkit-gradient(linear, right top, left top, from(#ed793f), to(#ffa133)), -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#ffffff));
                background-image: linear-gradient(270deg, #ed793f 0%, #ffa133 100%), linear-gradient(#ffffff, #ffffff);
                background-blend-mode: normal, normal;
                border-radius: 0.45rem;
                font-size: 0.36rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.48rem;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 0.4rem;
                span{
                    font-size: 0.24rem;
                    font-weight: normal;
                    letter-spacing: 0.02rem;
                    color: #ffffff;
                    margin-top: 0.1rem;
                }
                position: absolute;
                left: 50%;
                bottom: 2rem;
                transform: translateX(-50%);
                z-index: 11;
            }
            .canPromote{
                width: 100%;
            }
            .closeImg{
                position: absolute;
                right: 0.6rem;
                top: 0.2rem;
                width: 0.4rem;
            }

            .canPromote{
                width: 7.5rem;
            }
        }
    }
</style>