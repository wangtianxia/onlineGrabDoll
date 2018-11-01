<template>
    <div class="couponTip">
        <goBack @returnToIndex="returnBack"/>
        <transition name="showAlert">
            <div class="couponTipItem" v-show="showCoupon">
                <p class="title">10元</p>
                <p class="acTime">活动时间{{obj['start_time']|tempTime}}至{{obj['end_time']|tempTime}}</p>
                <section class="info">
                    <p>任务说明：</p>
                    <p>邀请的用户，消费每满{{obj['limit']}}元可提现一次.</p>
                </section>
                <section class="progressBg" ref="bar">
                    <section class="progressValue" ref='val' :style="{width:tempWidth}">
                    </section>
                    <p class="progressTitle" v-if="obj['limit']-obj['withdraw_task_income']>0">还差{{obj['limit']-obj['withdraw_task_income']}}元可完成任务</p>
                    <p class="progressTitle" v-else>已完成任务，块去提现吧</p>
                </section>
                <section :class="[btnFather]" >
                    <section class="btn" @click="toWithdraw()">
                        {{withdrawTitle}}
                    </section>
                </section>
                <p class="btnInvite" @click="share">开始邀请</p>
            </div>
        </transition>
        <!--提现不足弹窗-->
        <tipAlert v-if="showTip" @close="closeTip" :type=type :condition="condition"></tipAlert>

        <shareImg v-if="shareTip" @hideShare="hideShare"></shareImg>
    </div>
</template>

<script>
    import tipAlert from '../limitWithdraw/limitWithdrawRusult';
    import goBack from '../../../components/return/index';
    import {click_withdraw_task_button,withdraw,promoterInfo} from "../../../../server/getServerData";
    import shareImg from '../../distributionCom/share';
    import {mapState, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                showCoupon:false,
                showTryTip:false,
                goodId:null,
                showTip:false,
                btnFather:"btnFather",
                obj:{},
                tempWidth:'0px',
                condition:"",
                isCanGet:true,
                type:null,
                shareTip:false,
                withdrawTitle:"申请提现"
            }
        },

        computed:{
            ...mapState([
                'promoterInfoData'
            ])
        },

        filters:{
            tempTime(time){
                let t1 = new Date(time*1000);
                let y = t1.getFullYear();
                let month = (t1.getMonth()+1) <10?"0"+(t1.getMonth()+1):t1.getMonth()+1;
                let day = t1.getDate()<10?'0'+t1.getDate():t1.getDate();
                return `${y}-${month}-${day}`
            }
        },

        mounted(){
            this.getTask();
        },




        methods:{
            ...mapMutations([
                'getPromoteInfo'
            ]),

            closeTip(){
                this.showTip = false;
            },
            share(){
                this.shareTip = true;
            },
            hideShare(){
                this.shareTip = false;
            },
            returnBack(){
                this.$emit('hideComp')
            },

            //获取任务
            getTask(){
                click_withdraw_task_button('click_withdraw_task_button',10,(res)=>{
                    if(res['status'] == 1){
                        this.showCoupon = true;
                        this.obj = res['data']['withdraw_task'];
                        setTimeout(()=>{
                            let bar = this.$refs.bar;
                            let barWidth = bar.clientWidth;
                            let totalVal = res['data']['withdraw_task']['limit'];
                            let currentVal = res['data']['withdraw_task']['withdraw_task_income'];
                            if(currentVal>totalVal){
                                currentVal = totalVal
                            }
                            let currentW = (barWidth/totalVal)*currentVal;
                            this.tempWidth = currentW+'px';
                        },300);

                        let chaYuer = parseInt(this.promoterInfoData['balance']/10);
                        let task = parseInt(res['data']['withdraw_task']['withdraw_task_income']/res['data']['withdraw_task']['limit']);

                        if(chaYuer>task && res['data']['withdraw_task']['withdraw_task_income']>=res['data']['withdraw_task']['limit']){
                            this.withdrawTitle = `可提现${task}次`;
                            this.btnFather = 'btnFatherChange';
                        }else if(chaYuer<task && this.promoterInfoData['balance']>=10){
                            this.withdrawTitle = `可提现${chaYuer}次`;
                            this.btnFather = 'btnFatherChange';
                        }else if(this.promoterInfoData['balance']<10){
                            this.withdrawTitle = `余额不足`;
                            this.btnFather = 'btnFather';
                        }else if(res['data']['withdraw_task']['limit'] > res['data']['withdraw_task']['withdraw_task_income']){
                            this.withdrawTitle = `申请提现`;
                            this.btnFather = 'btnFather';
                        }
                    }
                });
            },

            //提现
            toWithdraw(){
                if(this.obj['limit']-this.obj['withdraw_task_income'] <=0){
                    if(this.promoterInfoData['balance']<10){
                        return;
                    }
                    if(!this.isCanGet){
                        return;
                    }
                    this.isCanGet = false;

                    withdraw('withdraw',10,(res1) => {
                        this.isCanGet = true;
                        if (res1['status'] == 1) {
                            this.showTip = true;
                            this.type = 1;
                            promoterInfo('promoter_info', (res) => {
                                if (res['status'] == 1) {
                                    if (res['data']['status'] == 0) {
                                    }
                                    if (res['data']['status'] == 2 || res['data']['status'] == 1 || res['data']['status'] == 3) {
                                        this.getPromoteInfo(res['data']);
                                    }
                                }
                            })
                            this.getTask();

                        }else if(res1['status'] == 2){
                            this.showTip = true;
                            this.type = 2
                        }else if(res1['status'] == 4){
                            this.showTip = true;
                            this.type = 4
                        }else if(res1['status'] == 5){
                            this.showTip = true;
                            this.type = 5
                        }else if(res1['status'] == 6){
                            this.showTip = true;
                            this.type = 6
                        }else if(res1['status'] == -1){
                            this.showTip = true;
                            this.type = -1
                        }
                    })
                }else{
                    let money = this.obj['limit']-this.obj['withdraw_task_income']>=0
                        ?this.obj['limit']-this.obj['withdraw_task_income']:0;
                    this.condition = `未达到提现条件，还差${money}元`;
                    this.type = 7;
                    this.showTip = true;
                }

            }
        },


        components:{
           tipAlert,goBack,shareImg
        }
    }
</script>

<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
        line-height: 1;
    }

    .couponTip{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        .couponTipItem{
            position: relative;
            width: 6.6rem;
            height: 7.2rem;
            background-color: #ffffff;
            border-radius: 0.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: flex-start;
            flex-wrap: wrap;
            .title{
                text-align: center;
                padding-top: 0.76rem;
                width: 100%;
                font-size: 0.58rem;
                font-weight: bold;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: -0.029rem;
                color: #000000;
            }
            .acTime{
                margin: 0.27rem 0 0.67rem 0;
                font-size: 0.26rem;
                font-weight: normal;
                font-stretch: normal;
                line-height:1;
                letter-spacing: 0rem;
                color: #838383;
                text-align: center;
                width: 100%;
            }
            .info{
                width: 5.69rem;
                height: 1.33rem;
                background-color: rgba(204, 204, 204, 0.3);
                p:nth-of-type(1){
                    font-size: 0.26rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 1;
                    letter-spacing: 0rem;
                    color: #000000;
                    margin-top: 0.29rem;
                    margin-left: 0.24rem;
                }
                p:nth-of-type(2){
                    font-size: 0.26rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.32rem;
                    letter-spacing: 0rem;
                    color: #000000;
                    margin-top: 0.23rem;
                    margin-left: 0.24rem;
                }
            }
            .progressBg{
                width: 5.69rem;
                height: 0.3rem;
                background-color: #cccccc;
                margin-top: 0.49rem;
                border-radius: 0.2rem;
                position: relative;
                .progressValue{
                    width: 3.91rem;
                    height: 100%;
                    background-color: #23b86d;
                    transition: all 0.3s ease;
                    position: absolute;
                    left: 0;
                    top: 0;
                    border-radius: 0.2rem;
                }
                .progressTitle{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    font-size: 0.2rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 1;
                    letter-spacing: 0rem;
                    color: #ffffff;
                }
            }
            .btnFather{
                width: 3.45rem;
                height: 0.8rem;
                background-color: #f0f0f0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.46rem;
                letter-spacing: -0.015rem;
                color: #000000;
                margin-top: 0.61rem;
                border-radius: 2rem;
            }
            .btnFatherChange{
                width: 3.45rem;
                height: 0.8rem;
                background-color: #f0f0f0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.46rem;
                letter-spacing: -0.015rem;
                color: white;
                margin-top: 0.61rem;
                border-radius: 2rem;
                background-image: linear-gradient(90deg,
                #f19c38 0%,
                #ed763a 100%),
                linear-gradient(
                        #ffffff,
                        #ffffff);
                background-blend-mode: normal,
                normal;
            }



            .btnInvite{
                text-decoration: underline;
                font-size: 0.26rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.46rem;
                letter-spacing: -0.013rem;
                color: #838383;
                margin-top: 0.36rem;
                width: 100%;
                text-align: center;
            }


        }
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
    }
</style>