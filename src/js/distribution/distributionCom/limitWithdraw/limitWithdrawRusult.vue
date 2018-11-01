<template>
    <div class="limitWithdrawResult">
        <transition name="showAlert">
            <section v-if="showAlert" class="limitContent" >
                <p :class="[tipC]">{{tip}}</p>
                <p :class="[tip1C]">{{tip1}}</p>
                <p class="tip3" v-if="showRed">{{tip3}}</p>
                <p class="tip3Red" v-else>{{tip3}}</p>
                <section class="btn">
                    <section @click="closeBtn">
                        我知道了
                    </section>
                </section>
            </section>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showAlert:false,
                tip:"温馨提示",
                tip1:"金额不足",
                tip3:"",

                tipC:"tipErr",
                tip1C:"tip1Err",
                showRed:true

            }
        },

        props:['type','tempBalance','time','condition'],

        mounted(){
            this.showAlert = true;
            if(this.type == 1){
                this.tipC = 'tip';
                this.tip1C = 'tip1';
                this.tip = '恭喜你';
                this.tip1 = '提现申请成功';
                this.tip3 = '审核通过后，将转入“微信零钱”'
            }else if(this.type == 2){
                this.tipC = 'tipErr';
                this.tip1C = 'tip1Err';
                this.tip = '温馨提示';
                this.tip1 = '提现余额不足';
                this.tip3 = ''
            }else if(this.type == 4){

                this.tipC = 'tipErr';
                this.tip1C = 'tip1Err';
                this.tip = '温馨提示';

                if(new Date().getHours()<this.time){
                    this.tip1 = '提现未开始';
                    this.tip3 = '每天'+this.time+'点开抢';
                    this.showRed = false;
                }else{
                    this.tip1 = '今日已提现';
                    this.tip3 = '每日只有1次“'+this.tempBalance+'元提现”机会';
                    this.showRed = false;
                }

            }else if(this.type == 5){
                this.tipC = 'tipErr';
                this.tip1C = 'tip1Err';
                if(new Date().getHours()<this.time){
                    this.tip = '温馨提示';
                    this.tip1 = '提现未开始';
                    this.tip3 = '每天'+this.time+'点开抢';
                    this.showRed = false;
                }else{
                    this.tip = '很遗憾';
                    this.tip1 = '已被抢完...';
                    this.tip3 = '明日请赶早，每天'+this.time+'点开抢';
                }

            }else if(this.type == -1){
                this.tipC = 'tipErr';
                this.tip1C = 'tip1Err';
                this.tip = '温馨提示';
                this.tip1 = '提现出错...';
                this.tip3 = '';

            }else if(this.type == 6){

                this.tipC = 'tipErr';
                this.tip1C = 'tip1Err';
                this.tip = '温馨提示';
                this.tip1 = '提现未开始';
                this.tip3 = '每天'+this.time+'点开抢';
                this.showRed = false;

            }else if(this.type == 7){ //10元提现
                this.tipC = 'tipErr';
                this.tip1C = 'tip1Err';
                this.tip1 = '提现未完成';
                this.tip3 = this.condition;
                this.showRed = false;
            }
        },

        methods:{
            closeBtn(){
                this.$emit('close');
            }
        }
    }
</script>

<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
        line-height: 1;
    }
    .limitWithdrawResult{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;


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
        .limitContent{
            width: 6rem;
            height: 4.1rem;
            background-color: #ffffff;
            border-radius: 0.2rem;
            .tip{
                font-size: 0.36rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.02rem;
                color: #323232;
                text-align: center;
                margin-top: .5rem;
            }
            .tip1{
                font-size: 0.48rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.02rem;
                color: #ff4000;
                text-align: center;
                margin-top: 0.36rem;
            }
            .tip3{
                font-size: 0.26rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.01rem;
                color: rgba(50, 50, 50, 0.8);
                margin-top: 0.44rem;
                text-align: center;
            }

            .tip3Red{
                font-size: 0.26rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.01rem;
                color: red;
                margin-top: 0.44rem;
                text-align: center;
            }
            .btn{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                section{
                    width: 4.01rem;
                    height: 0.9rem;
                    background-image: linear-gradient(270deg,
                    #ed793f 0%,
                    #ffa133 100%),
                    linear-gradient(
                            #ffffff,
                            #ffffff);
                    background-blend-mode: normal,
                    normal;
                    border-radius: 0.45rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.36rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.48rem;
                    letter-spacing: 0.04rem;
                    color: #ffffff;
                    margin-top: 0.36rem;
                }
            }
            .errColor{

            }
            .tipErr{
                font-size: 0.36rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.02rem;
                color: rgba(50, 50, 50, 0.8);
                text-align: center;
                margin-top: .5rem;
            }
            .tip1Err{
                font-size: 0.48rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.02rem;
                color: rgba(50, 50, 50, 0.8);
                text-align: center;
                margin-top: 0.36rem;
            }
        }
    }
</style>