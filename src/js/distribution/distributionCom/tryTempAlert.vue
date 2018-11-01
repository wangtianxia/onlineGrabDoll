<template>
    <!--成为试用合伙人-->
    <section class="alertContent" >
        <section class="alertInfo" v-if="showAlert">
            <img class="canPromote" src="static/image/distribution/canPromotefirst.jpg" @click.stop.prevent="" alt="">
            <section class="alertInfoBtn" @click="sureTempPromote">成为试用合伙人 <span>（免费）</span></section>

            <!--<section class="alertInfoBtn1" @click="sureTempPromote">成为试用合伙人 <span>（免费）</span></section>-->
        </section>
    </section>
</template>

<script>

    import payItem from '../pay';

    export default {
        name: "alert",
        data(){
            return {
                showAlert:false
            }
        },

        mounted(){
            this.showAlert = true;
        },

        methods:{

            sureTempPromote(){
                this.$emit('closeTempPromote')
            },

            sureTempPromote1(){
                let self = this;
                payItem.createOrder({id:"pay_199"},(isNoCbPay,res)=>{
                    self.paySuccess(isNoCbPay, res);
                });
            },

            paySuccess(isNoCbPay,res){
                this.$emit('hideTriAlert')
            }
        }
    }
</script>

<style lang="less" scoped>
    .alertContent{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        min-height: 100%;
        max-height: unset;
        background-color: #ff8d1f;
        .alertInfo{
            width: 100%;
            border-radius: 0.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
            .alertInfoBtn{


                position: absolute;
                z-index: 100;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);

                width: 5.5rem;
                height: 0.9rem;
                background-image: linear-gradient(90deg,
                #fff113 0%,
                #ffc600 100%),
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
                letter-spacing: 0.02rem;
                color: #b13b00;

                display: flex;
                justify-content: center;
                align-items: center;
                top: 10.5rem;

                span{
                    font-size: 0.24rem;
                    font-weight: normal;
                    letter-spacing: 0.01rem;
                    color: #b13b00;
                }
            }
            img{
                width: 100%;
            }
            .alertInfoBtn1{
                width: 5.5rem;
                height: 0.9rem;
                background-color: rgba(255, 255, 255, 0.3);
                border-radius: 0.45rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.36rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.48rem;
                letter-spacing: 0.02rem;
                color: rgba(255, 255, 255, 0.7);

                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                z-index: 100;
                bottom: 0.4rem;
                span{
                    font-size: 0.24rem;
                    font-weight: normal;
                    letter-spacing: 0.01rem;
                    color: white;
                }
            }
        }
    }
</style>