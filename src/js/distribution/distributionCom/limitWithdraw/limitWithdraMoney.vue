<template>
    <div class="limitWithDraw" v-disabletouchmove>
        <transition name="showAlert">
            <section style="position: relative" v-if="showAlert">
                <img class="closeImg" @click="closeTip" src="static/image/close.png" alt="">
                <section class="listContent">
                    <p class="p1">限时提现<span>{{tempBalance}}元</span> </p>
                    <section>
                        <section class="btn" @click="toGet">
                            抢
                        </section>
                    </section>

                    <p class="p2"><span>今日份额：</span><span>{{count}}/{{limit}}</span></p>

                    <section class="roule">
                        <p>规则说明</p>
                        <p>每天{{tempTime}}:00开始提现</p>
                        <p>每天限量{{limit}}份，先到先得，抢完为止<br/>
                            每人每天只能抢得1次“{{tempBalance}}元提现”机会<br/>
                            提现成功后，将自动转入“微信零钱”
                        </p>
                    </section>
                </section>
                <section class="listContent1" v-show="showList" @click="lookList">
                    {{tipWords}}
                </section>
            </section>
        </transition>
        <limitResult :type="type" v-if="showTip" :tempBalance="tempBalance" :time="time" @close="close"/>
    </div>
</template>

<script>
    import { withdraw ,promoterInfo,click_withdraw_button } from '../../../../server/getServerData'
    import { mapState,mapMutations } from 'vuex';
    import limitResult from './limitWithdrawRusult'
    export default {
        data() {
            return {
                showAlert:false,
                count:0,
                showTip:false,
                type:"0",
                showList:false,
                total_user_num:0,
                isCanGet:true,
                tipWords:"今日已提现名单",
                tempTime:"",
                checkTime:null
            }
        },
        props:['tempBalance','time','limit'],

        computed:{
            ...mapState([
                'promoterInfoData'
            ])
        },

        mounted(){
            this.showAlert = true;

            click_withdraw_button('click_withdraw_button',this.tempBalance,(res)=>{
                if(res['status'] == 1){
                    this.count = res['data']['user_num'];
                    this.total_user_num = res['data']['total_user_num']
                }
            });

            this.showList = true;

            if(new Date().getHours()<this.time){
                this.tipWords = "昨日已提现名单"
            }else{
                this.tipWords = "今日已提现名单"
            }

            if(parseInt(this.time) > 12){
                this.tempTime = '晚上'+this.time;
            }else{
                this.tempTime = '中午'+this.time;
            }

            let Time = new Date();
            Time.setHours(0);
            Time.setMinutes(0);
            Time.setSeconds(0);
            this.checkTime = Time.getTime() + 18*3600*1000 + 5000;

            console.log(this.promoterInfoData);

        },

        methods:{
            ...mapMutations([
               'getPromoteInfo'
            ]),

            toGet(){
                if(this.isCanGet ){
                    if(this.tempBalance == '3'){
                        if(new Date().getHours()<18){
                            this.showTip = true;
                            this.type = 4;
                            return;
                        }
                    }
                    this.isCanGet = false;
                    if((this.tempBalance == 3 && this.promoterInfoData['withdraw_3']>0)||
                        (this.tempBalance == 20 && this.promoterInfoData['withdraw_20']>0)){
                        setTimeout(()=>{
                            this.withdrawAction();
                        },1000)
                    }else{
                        this.withdrawAction();
                    }
                }
            },

            withdrawAction(){
                withdraw('withdraw',this.tempBalance,(res) => {
                    this.isCanGet = true;
                    if (res['status'] == 1) {
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
                    }

                    //2: 余额不足
                    if(res['status'] == 2){
                        this.showTip = true;
                        this.type = 2
                    }

                    if(res['status'] == 4){
                        this.showTip = true;
                        this.type = 4
                    }

                    if(res['status'] == 5){
                        this.showTip = true;
                        this.type = 5
                    }

                    if(res['status'] == 6){
                        this.showTip = true;
                        this.type = 6
                    }

                    if(res['status'] == -1){
                        this.showTip = true;
                        this.type = -1
                    }

                })
            },


            close(){
                this.showTip = false;
            },

            closeTip(){
                this.$emit('hideComp');
            },

            lookList(){
                this.$router.push('/limitList/'+this.time+'/'+this.tempBalance);
            }
        },

        components:{
            limitResult
        }
    }
</script>

<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
        line-height: 1;
    }
    .limitWithDraw{
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
        .closeImg{
            position: absolute;
            top: 0.2rem;
            right: 0.2rem;
            width: 0.3rem;
        }
        .listContent{
            width: 6rem;
            height: 6.1rem;
            background-color: #ffffff;
            border-radius: 0.2rem;
            .p1{
                font-size: 0.36rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.02rem;
                color: #323232;
                text-align: center;
                padding-top: 0.5rem;
                span{
                    color: #ff4000;
                }
            }
            section{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 0.3rem;
                .btn{
                    font-size: 0.72rem;
                    font-weight: bold;
                    font-stretch: normal;
                    line-height: 1;
                    letter-spacing: 0.04rem;
                    color: #fffc00;
                    width: 1.3rem;
                    height: 1.3rem;
                    background-color: #ff7f29;
                    box-shadow: 0rem -0.1rem 0.2rem 0rem
                    rgba(255, 104, 30, 0.3),
                    0rem 0.1rem 0.3rem 0rem
                    #ff681e;
                    border: solid 0.04rem #ff681e;
                    border-radius: 50%;
                }
            }
            .p2{
                text-align: center;
                line-height: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 0.5rem;
                span:nth-of-type(1){
                    font-size: 0.26rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 1;
                    letter-spacing: 0.01rem;
                    color: #323232;
                }
                span:nth-of-type(2){
                    font-size: 0.26rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 1;
                    letter-spacing: 0.01rem;
                    color: #ff4000;
                }
            }
            .roule{
                padding: 0 0.69rem;
                font-size: 0.26rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                align-content: center;
                flex-wrap: wrap;
                p{
                    width: 100%;
                }
                p:nth-of-type(1){
                    font-size: 0.28rem;
                    font-weight: bold;
                    font-stretch: normal;
                    line-height: 1;
                    letter-spacing: 0.01rem;
                    color: #323232;
                }
                p:nth-of-type(2){
                    margin-top: .19rem;
                }
                p:nth-of-type(3){
                    line-height: 1.2;
                }
            }
        }
        .listContent1{
            text-decoration: underline;
            font-size: 0.28rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.48rem;
            letter-spacing: 0.01rem;
            color: #ffffff;
            text-align: center;
            margin-top: 0.3rem;
        }
    }
</style>