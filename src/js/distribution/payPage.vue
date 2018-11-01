<template>
    <!--成为正式合伙人 支付弹窗-->
    <section class="alertContent"  v-disabletouchmove>
        <goBack @returnToIndex="returnBack"/>
        <section class="alertInfo">
            <img class="canPromote" src="static/image/distribution/canPromote.jpg" alt="">

            <section class="alertInfoBtnTop" @click="toLookInfo">
                <span>正式合伙人确认书（必读）</span>
            </section>
            <section class="alertInfoBtn" @click="sureTempPromote">成为正式合伙人 <span>(￥199)</span> </section>
        </section>
    </section>
</template>

<script>

    import goBack from '../components/return/index';
    import pay from './pay';

    export default {
        name: "payPage",
        data(){
            return {

            }
        },

        mounted(){
        },

        methods:{

            sureTempPromote(){
                let self = this;
                pay.createOrder({id:"pay_199"},(isNoCbPay,res)=>{
                    self.paySuccess(isNoCbPay, res);
                });
            },

            paySuccess(){
                this.$router.replace('/distribution')
            },
            returnBack(){
                this.$router.go(-1)
            },
            toLookInfo(){
                this.$router.push('/confirmEmail')
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
        .alertInfo{
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
                bottom: 0.3rem;
                transform: translateX(-50%);
                z-index: 11;
            }

            .alertInfoBtnTop{
                position: absolute;
                left: 50%;
                bottom: 1.7rem;
                transform: translateX(-50%);
                z-index: 11;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.02rem;
                color: #ffffff;
                width: 100%;
                text-decoration: underline;
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