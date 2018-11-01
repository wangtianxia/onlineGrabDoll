<template>
    <section class="withDrawInfo">
        <goBack @returnToIndex="returnToIndex"/>
        <p class="withDrawInfoTitle">提现</p>
        <section class="withDrawInfoDiv">
            <p class="withDrawInfoDivTitle">
                <VueCountUp class="bigMoney" :start-value="start" :end-value="end" :decimals="2"
                            :duration="1"></VueCountUp>
                <span>元</span>
            </p>
            <p class="withDrawInfoDivTitle1">未提现收益</p>
            <!--<p class="withDrawInfoDivTitle2">未提现金额>={{promoterInfoData['withdraw_quota']}}元便可以提现</p>-->
        </section>

        <section class="selectWithdrawMoney">
            <p class="p1">请选择提现金额</p>
            <section class="selectWithdraw">
                <section class="table" v-for="(item,index) in money" :key="index" @click="selectItem(index)">

                    <section class="tableItem" style="background-color: #fff600;border-radius: 0.1rem;" v-if="item.s == 3 && item.type">
                        <p style="color: #ff6113;">{{item.m}}元</p>
                        <p class="flag" v-if="item.k" style="color: #ff6113;">
                            {{item.k}}
                        </p>
                        <div class="select">
                            <img src="static/image/distribution/select.png" alt="">
                        </div>
                    </section>

                    <section class="tableItem" style="background-color: #fff600;border-radius: 0.1rem;" v-else-if="item.s == 3">
                        <p style="color: #ff6113;">{{item.m}}元</p>
                        <p class="flag" v-if="item.k" style="color: #ff6113;">
                            {{item.k}}
                        </p>
                    </section>

                    <section class="tableItemS" v-else-if="item.s == 2 && item.type">
                        <p>{{item.m}}元</p>
                        <div class="select">
                            <img src="static/image/distribution/select.png" alt="">
                        </div>
                        <div class="select">
                            <img src="static/image/distribution/select.png" alt="">
                        </div>
                    </section>

                    <section class="tableItem" v-else-if="item.s == 1">
                        <p>{{item.m}}元</p>
                        <div class="select">
                        </div>
                    </section>
                </section>
            </section>
        </section>


        <section class="withDrawInfoDivBtn1" v-if="money.length>0">
            <section class="withDrawInfoBtn" @click="withdrawBtn">
                申请提现
            </section>
        </section>
        <p class="lookLIst" @click="lookList">查看历史提现记录</p>

        <section class="warm">
            申请提现后奖励会在1—2个工作日内发放到您的微信零钱中，因微信平台规定将在提现额中扣除1%的手续费，每天可提现十次，单笔限额2千。
        </section>

        <component :is="bindComp" @sureWithdraw="sureWithdraw"
               @closeNotMoney="closeCombinTip"
               :balanceMoney="withdrawMoney" :tempBalance="tempBalance"
               @closeWithDrawSuccess="closeWithDrawSuccess"
               :withDrawmoney="withdrawMoney" :tipWords="tipWords"
                @hideComp="closeCombinTip" @payPage="payPage"
                :type="false" :time="time" :limit="limit">
        </component>
    </section>
</template>

<script>

    import goBack from '../components/return/index';
    import {mapState, mapMutations} from 'vuex'

    import {withdraw, promoterInfo,withdraw_money} from "../../server/getServerData";
    //没钱
    import notMoney from './distributionCom/noMoney';
    //有钱 提现 二级提示
    import canWithdraw from './distributionCom/canWithdraw';
    //有钱提现成功
    import widthDrawSuccess from './distributionCom/widthDrawSuccess'
    import VueCountUp from 'vue-countupjs';
    import withdrawAlert from './distributionCom/withdrawAlert';
    //限定时间提现
    import limitWithdraw from './distributionCom/limitWithdraw/limitWithdraMoney';
    import tenWithdraw from './distributionCom/withdrawItem/tenItem'

    export default {

        name: "withdraw",

        data() {
            return {
                bindComp: "",
                tempBalance: "",
                money: [],
                withdrawMoney:0,
                tipWords:'',
                isHasLimit:false,
                time:null,
                limit:null,
            }
        },

        computed: {
            ...mapState([
                'promoterInfoData'
            ]),

            balance() {
                if (this.promoterInfoData && this.promoterInfoData['balance'] &&this.promoterInfoData['balance'] > 0) {
                    return this.promoterInfoData['balance']
                } else {
                    return 0
                }
            },

            end() {
                if (this.promoterInfoData && this.promoterInfoData['balance'] && this.promoterInfoData['balance'] > 0) {
                    return this.promoterInfoData['balance']
                } else {
                    return 0
                }
            },

            start() {
                return 0
            },

            tempMoney() {
                if (this.promoterInfoData && this.promoterInfoData['withdraw_quota']) {
                    return this.promoterInfoData['withdraw_quota']
                }
            }
        },

        mounted() {
            this.getWithdrawMoney();
        },

        methods: {
            ...mapMutations([
                'getPromoteInfo'
            ]),

            //设置提现成功的金额
            setTempBalance() {
                this.tempBalance = this.withdrawMoney;
            },

            //获取列表
            getWithdrawMoney(){
                withdraw_money('withdraw_money', (data)=> {
                    if(data['status'] == 1){
                        let list = data['data']['list'];
                        for(let j=0;j<list.length;j++){
                            if(list[j]['type']=='limit'){
                                this.isHasLimit = true;
                                break;
                            }
                        }

                        if(this.isHasLimit){
                            for(let j=0;j<list.length;j++){
                                if(list[j]['type']=='limit' || list[j]['type']=='task'){
                                    let obj = {
                                        m:list[j]['money'],
                                        s:3,
                                        k:  list[j]['type'] == 'limit'?"限时提现":"提现任务",
                                        time:list[j]['time'],
                                        limit:list[j]['limit']
                                    };
                                    if(j==0){
                                        obj['type'] = true
                                    }
                                    this.money.push(obj);
                                }else {
                                    let obj = {
                                        m:list[j]['money'],
                                        s:1
                                    };
                                    this.money.push(obj);
                                }
                            }
                        }else{
                            for(let j=0;j<list.length;j++){
                                if(j==0){
                                    let obj = {
                                        m:list[j]['money'],
                                        s:2,
                                        type:true
                                    };
                                    this.money.push(obj);
                                }else{
                                    let obj = {
                                        m:list[j]['money'],
                                        s:1
                                    };
                                    this.money.push(obj);
                                }
                            }
                        }
                    };
                })
            },


            /**
             * 提现按钮点击
             */
            withdrawBtn() {
                let money = 0,s=1,time=null,limit=null;
                for(let i in this.money){
                    if(this.money[i]['type']){
                        s = this.money[i]['s'];
                        money = this.money[i]['m'];
                        if(s == 3){
                            time = this.money[i]['time'];
                            limit = this.money[i]['limit'];
                        }
                        break;
                    }
                }
                if(money == 10){
                    this.bindComp = 'tenWithdraw';
                }else if(s == 3){
                    this.tempBalance = money;
                    this.time = time;
                    this.limit = limit;
                    this.bindComp = 'limitWithdraw';
                }else if(s == 2){
                    if(this.balance < money){
                        this.bindComp = 'notMoney';
                    }else{
                        this.withdrawMoney = money;
                        this.bindComp = 'canWithdraw';
                    }
                }
            },


            lookList() {
                this.$router.push('/withdrawList');
            },

            returnToIndex() {
                this.$router.go(-1);
            },

            closeCombinTip() {
                this.bindComp = '';
            },

            closeWithDrawSuccess() {
                this.closeCombinTip();
            },

            //二次弹窗
            sureWithdraw() {
                this.bindComp = '';
                if(this.promoterInfoData['status'] == 2){
                    this.tipWords = '合伙人试用期间无法提现！';
                    this.bindComp = 'withdrawAlert';

                    return;
                }else if(this.promoterInfoData['status'] == 1){
                    this.tipWords = '合伙人试用期间无法提现！';
                    this.bindComp = 'withdrawAlert';
                    return;
                }


                withdraw('withdraw',this.withdrawMoney,(res) => {
                    if (res['status'] == 1) {
                        this.setTempBalance();
                        this.bindComp = 'widthDrawSuccess';
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
                })
            },

            selectItem(index) {
                if(this.isHasLimit){
                    if(this.money[index]['s']== 3 ){
                        for(let i=0;i<this.money.length;i++){
                            if(this.money[i]['s']!=3){
                                this.money[i]['s'] = 1;
                            }
                            this.$set(this.money[i],'type',false);
                        }
                        this.$set(this.money[index],'type',true)

                    }else {
                        for(let i=0;i<this.money.length;i++){
                            if(this.money[i]['s']==3){
                                this.$set(this.money[i],'type',false);
                            }else{
                                this.$set(this.money[i],'s',1);
                                this.$set(this.money[i],'type',false);
                            }
                        }
                        this.$set(this.money[index],'s',2);
                        this.$set(this.money[index],'type',true);
                    }
                }else{
                    for(let i=0;i<this.money.length;i++){
                        this.$set(this.money[i],'s',1);
                        this.$set(this.money[i],'type',false);
                    }
                    this.$set(this.money[index],'s',2);
                    this.$set(this.money[index],'type',true);
                }
            },

            payPage(){
                this.$router.push('/payPage');
                this.closeCombinTip();
            },
        },


        components: {
            goBack, notMoney, canWithdraw, widthDrawSuccess, VueCountUp,withdrawAlert,limitWithdraw,tenWithdraw
        }
    }
</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .withDrawInfo {
        width: 100%;
        min-height: 100%;
        max-height: unset;
        background-color: #f7f7f7;

        .withDrawInfoTitle {
            font-size: 0.36rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.3rem;
            letter-spacing: 0.04rem;
            color: #323232;
            padding: 0.47rem 0 0.4rem 0;
            text-align: center;
        }
        .withDrawInfoDiv {
            width: 7.5rem;
            height: 2.4rem;
            background-color: #ffde00;
            .withDrawInfoDivTitle {
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.04rem;
                color: #323232;
                line-height: 1;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                padding-top: 0.65rem;
                .bigMoney {
                    font-size: 0.72rem;
                    height: 0.62rem;
                    font-weight: bold;
                }
                span:nth-of-type(2) {
                    font-size: 0.36rem;
                    font-weight: normal;
                    letter-spacing: 0.02rem;
                    color: #323232;
                }
            }
            .withDrawInfoDivTitle1 {
                margin-top: 0.29rem;
                text-align: center;
                font-size: 0.26rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.01rem;
                color: #323232;
            }
            .withDrawInfoDivTitle2 {
                margin-top: 0.89rem;
                font-size: 0.26rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.01rem;
                color: #323232;
                text-align: center;
            }
        }

        .selectWithdrawMoney {
            background-color: #ffffff;
            padding: 0.49rem 0;
            height: 3.1rem;
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
            flex-wrap: wrap;
            .p1 {
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.02rem;
                color: rgba(50, 50, 50, 0.8);
                padding-left: 0.49rem;
                width: 100%;
            }

            .selectWithdraw {
                font-size: 0;
                .table {
                    width: 1.8rem;
                    height: 1rem;
                    border-radius: 0.1rem;
                    border: solid 0.02rem #ff9600;
                    font-size: 0.36rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.48rem;
                    letter-spacing: 0.02rem;
                    color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 0.3rem;
                    position: relative;
                    display: inline-block;
                    float: left;
                    margin-left: 0.5rem;
                    .tableItem {
                        background-color: #ffca8c;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        flex-wrap: wrap;
                        align-content: center;
                        p{
                            line-height: 1;
                        }
                        .flag{
                            width: 100%;
                            text-align: center;
                            line-height: 1;
                            font-size: 0.2rem;
                            color: white;
                            margin-top: 0.1rem;
                        }

                        .select{
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            width: 0;
                            height: 0;
                            border-bottom: 0.5rem solid #ffc05d;
                            border-left: 0.5rem solid transparent;
                            img{
                                position: absolute;
                                z-index: 111;
                                width: 0.25rem;
                                left: -0.25rem;
                                top: 0.2rem;
                            }
                        }
                    }

                    .tableItemS {
                        background-color: #ffab49;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-wrap: wrap;
                        align-content: center;
                        p{
                            width: 100%;
                            text-align: center;
                            line-height: 1;
                        }
                        .flag{
                            width: 100%;
                            text-align: center;
                            line-height: 1;
                            font-size: 0.2rem;
                            color: white;
                            margin-top: 0.1rem;
                        }
                        .select{
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            width: 0;
                            height: 0;
                            border-bottom: 0.5rem solid #ff9600;
                            border-left: 0.5rem solid transparent;
                            img{
                                position: absolute;
                                z-index: 111;
                                width: 0.25rem;
                                left: -0.25rem;
                                top: 0.2rem;
                            }
                        }
                    }
                }
                /*.table:nth-of-type(2),.table:nth-of-type(3),.table:nth-of-type(5),.table:nth-of-type(6),.table:nth-of-type(8),.table:nth-of-type(9){*/
                    /*margin-left: 0.5rem;*/
                /*}*/
            }
        }

        .withDrawInfoDivBtn1 {
            margin-top: 1.4rem;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            clear: both;
            section {
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

        .lookLIst {
            text-decoration: underline;
            font-size: 0.28rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0.01rem;
            color: #008dd6;
            text-align: center;
            margin-top: 1.1rem;
        }
        .warm {
            margin-top: 1.54rem;
            font-size: 0.28rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.48rem;
            letter-spacing: 0.01rem;
            color: #323232;
            padding: 0 0.54rem 1rem;
        }
    }

</style>