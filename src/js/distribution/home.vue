<template>
    <!--分销-->
    <section class="distributionContent">
        <goBack @returnToIndex="returnBack"/>

        <section class="disMoney" v-if="isPromote">
            <p class="disMoneyCount">
                <VueCountUp class="bigMoney" :start-value="start" :end-value="end" :decimals="2" :duration="1"></VueCountUp>
                <span class="bigMoneyInfo">元</span>
            </p>
            <p class="disMoneyInfo">我的收益</p>
            <p class="disMoneyTotalMoney">今日收益<span>{{total_income}}元</span></p>
            <!--<p class="disMoneyTotalMoney disMoneyTotalMoney1" v-if="type == 1 || type == 2">成为正式合伙人才可提现</p>-->
            <span class="disMoneyBtnsec"  v-if="type == 3" @click="withdrawMon">
                我要提现
            </span>
            <span class="disMoneyBtnsec"  v-if="type == 1 || type == 2" @click="withdrawMon">
                我要提现
            </span>
            <span class="disMoneyList" @click="revenueDetails">收益明细</span>

            <section class="shareBtn">
                <section @click="showShareBtn">
                    <p class="p1">分享就赚钱</p>
                    <p class="p2" v-if="type == 2">试用中</p>
                </section>
                <section @click="taskBtn">
                    <span class="p1">晒朋友圈赚钱</span>
                    <img v-if="showWorn" src="static/image/distribution/worn.png" alt="">
                </section>
            </section>
        </section>

        <section class="disOtherInfo" v-if="isPromote" >
            <section class="shareContent" v-for="(item,index) in infoArr" :key="index">
                <section class="shareContent1">
                    <section>{{index+1}}</section>
                    <p>{{item['title']}}</p>
                </section>
                <section class="shareContent2">
                   {{item['info']}}
                </section>
            </section>
        </section>

        <section class="disEducation" v-if="isPromote && showMony" @click="lookEducation">
            <span>赚钱必看教程</span>
            <span> > </span>
        </section>

        <section class="disEducation" v-if="isPromote" @click="lookComplaints">
            <span>客服与投诉</span>
            <span> > </span>
        </section>

        <component :is="bindHomeTip" @hideComp="hideComp"
                   @hideShare="hideComp" @closeNotMoney="hideComp"
                   @closeTempPromote="closeTempPromote" @myLevelInfo="myLevelInfo"
                   @hideTriAlert="hideTriAlert" :withDrawmoney="tempMoney"></component>
    </section>
</template>

<script>

    import CF from '../../router/ind'
    import goBack from '../components/return/index'
    import tryTempAlert from './distributionCom/tryTempAlert';
    import {promoterInfo, create_promoter,promoter_share_click} from '../../server/getServerData'
    import {mapState, mapMutations} from 'vuex';
    import shareImg from './distributionCom/share';
    import VueCountUp from 'vue-countupjs';
    import './qrcodes'


    export default {
        name: "home",
        data() {
            return {
                rest_time: 0,
                isPromote:false,
                showMony:true,
                bindHomeTip:'',
                today_income:'0.0',
                infoArr:[
                    {
                        title:'分享奖励',
                        info:'每成功分享1次，可得随机现金奖励（最高1元）日限10次'
                    },
                    {
                        title:'邀请奖励',
                        info:'通过分享，你每邀请到1位从未访问过游戏的新用户可得0.8元，每邀请到1位老用户得0.1元（注：至少完成1次抓娃娃，才被记为有效邀请）'
                    },
                    {
                        title:'晒朋友圈奖励',
                        info:"选择海报保存并分享到朋友圈，且获得最少3次以上扫码访问，可得随机现金奖励（最高8元）"
                    },
                    {
                        title:'用户充值奖励',
                        info:"你所邀请到用户的所有充值，你都将获得充值额的20%现金返利"
                    }
                ]
            }
        },

        computed: {
            ...mapState([
                'promoterInfoData'
            ]),

            showWorn(){
                if(this.promoterInfoData['moments_task']){
                    return true
                }else{
                    return false
                }
            },

            userName() {
                return CF.user.userName;
            },
            userID() {
                return CF.user.uid;
            },
            headImg() {
                return CF.user.face;
            },
            type() {
                //试用过期
                if (this.promoterInfoData && this.promoterInfoData['status'] && this.promoterInfoData['status'] == 1) {
                    return 1
                }

                //试用
                if (this.promoterInfoData && this.promoterInfoData['status'] && this.promoterInfoData['status'] == 2) {
                    return 2
                }
                //正式
                if (this.promoterInfoData && this.promoterInfoData['status'] && this.promoterInfoData['status'] == 3) {
                    return 3
                }
            },
            total_income() {
                if (this.promoterInfoData && this.promoterInfoData['today_income'] && this.promoterInfoData['today_income'] > 0) {
                    return this.promoterInfoData['today_income'].toFixed(2) + ''
                } else {
                    return '0.0'
                }
            },
            moduleImg(){
                return `static/image/distribution/module/${this.promoterInfoData['level']}.png`
            },

            start(){
                return 0;
            },
            end(){
                if (this.promoterInfoData && this.promoterInfoData['balance'] && this.promoterInfoData['balance'] > 0) {
                    return this.promoterInfoData['balance']
                } else {
                    return 0
                }
            },
            tempMoney(){
                if(this.promoterInfoData && this.promoterInfoData['withdraw_quota']){
                    return this.promoterInfoData['withdraw_quota']
                }
            }


        },

        created(){
            if(this.promoterInfoData && this.promoterInfoData['withdraw_quota']){
                return this.promoterInfoData['withdraw_quota']
            }
        },

        mounted() {
            this.initPromote();
            document.body.scrollTop = 0;

            if(this.promoterInfoData && this.promoterInfoData['black_val']>0){
                this.infoArr.push({
                    title:'仿作弊机制',
                    info:"如合伙人所发展的玩家无游戏行为，将影响可发展人数及金额"
                })
            }
            if(this.promoterInfoData && this.promoterInfoData['money_limit']){
                this.$set(this.infoArr[1],'info',`通过分享，你每邀请到1位从未访问过游戏的新用户可得${this.promoterInfoData['money_limit']}元，
                每邀请到1位老用户得0.1元（注：至少完成1次抓娃娃，才被记为有效邀请）`)
            }
        },

        methods: {

            ...mapMutations([
                'getPromoteInfo'
            ]),

            initPromote() {
                promoterInfo('promoter_info', (res) => {
                    if (res['status'] == 1) {
                        //什么都没有弹窗
                        if (res['data']['status'] == 0) {
                            this.bindHomeTip = 'tryTempAlert';
                        }
                        //试用
                        if (res['data']['status'] == 2 ||res['data']['status'] == 1 ||res['data']['status'] == 3  ) {
                            this.getPromoteInfo(res['data']);
                            this.isPromote = true;
                        }
                        if(res['data']['black_val']>0){
                            this.showMony = false
                        }
                    }
                })
            },

            returnBack() {
                this.$router.go(-1);
            },

            revenueDetails() {
                this.$router.push('/revenueDetails');
            },

            lookMore(){
                this.$router.push('/myLevelInfo');
            },

            withdrawMon() {
                this.$router.push('/withdraw')
            },

            closeTempPromote() {
                this.hideComp();
                create_promoter('create_promoter', (res) => {
                    if (res&&res['status'] == 1) {
                        this.initPromote();
                    }
                });
            },

            myLevelInfo() {
                this.$router.push('/payPage')
            },

            paySuccess(){
                this.initPromote();
                this.bindHomeTip = '';
            },

            showShareBtn(){
                this.bindHomeTip = 'shareImg';
                promoter_share_click('promoter_share_click',()=>{})
            },

            taskBtn(){
                 this.$router.push('/task');
            },

            hideComp(){
                this.bindHomeTip = '';
            },

            hideTriAlert(){
                this.paySuccess()
            },

            /**
             * 查看教程
             */
            lookEducation(){
                this.$router.push('/education');
            },

            /**
             * 客服与投诉
             */
            lookComplaints(){
                this.$router.push('/customerService');
            }
        },

        components: {
            goBack, tryTempAlert,shareImg,VueCountUp
        }
    }
</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .distributionContent {
        background-color: #f7f7f7;
        padding: 0.2rem;
        font-size: 0;
        min-height: 100%;
        max-height: unset;
        -webkit-overflow-scrolling: scroll;
    }

    .distributionUserInfo {
        width: 7.1rem;
        height: 3.2rem;
        background-color: #ffffff;
        border-radius: 0.1rem;
        position: relative;

        .distributionUserInfoTip {
            font-size: 0.28rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0.02rem;
            color: #323232;
            text-align: center;
            padding-top: 0.3rem;
        }

        .distributionUserInfoTop {
            margin-top: 0.19rem;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 1.09rem;
                height: 1.62rem;
            }
            .levelInfo {
                margin-left: 0.28rem;
                p {
                    font-size: 0.32rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 1;
                    letter-spacing: 0rem;
                    color: #323232;
                }
                p:nth-of-type(1){
                    font-weight: bold;
                    line-height: 1;
                }
                p:nth-of-type(2) {
                    margin-top: 0.22rem;
                    span {
                        color: #f30000;
                    }
                }
            }
            .levelInfo1 {
                margin-left: 0.28rem;
                p {
                    font-size: 0.32rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 1;
                    letter-spacing: 0rem;
                    color: #323232;
                    span {
                        font-size: 0.26rem;
                        font-weight: normal;
                        letter-spacing: 0rem;
                        color: #323232;
                    }
                }
                p:nth-of-type(1){
                    span:nth-of-type(1){
                        font-size: 0.36rem;
                        font-weight: bold;
                        font-stretch: normal;
                        line-height: 1;
                        letter-spacing: 0rem;
                        color: #323232;
                    }
                }
                p:nth-of-type(2) {
                    margin-top: 0.28rem;
                    text-decoration: underline;
                    font-size: 0.26rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 1;
                    letter-spacing: 0.01rem;
                    color: #008dd6;
                }
            }
        }

        .distributionUserInfoBottom {
            border-radius: 0 0 0.1rem 0.1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 0.6rem;
            background-color: rgba(50, 50, 50, 0.1);
            span {
                font-size: 0.26rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.48rem;
                letter-spacing: 0.01rem;
                color: rgba(50, 50, 50, 0.4);
            }
        }

        .lookMore{
            position: absolute;
            right: 0.3rem;
            top: 0.3rem;
            text-decoration: underline;
            font-size: 0.24rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0.01rem;
            color: #008dd6;
        }
    }

    .disOtherInfo {
        width: 100%;
        background-color: white;
        margin-bottom: 0.2rem;
        line-height: 1;
        padding: 0.1rem 0 0.3rem 0;
        border-radius: 0.1rem;
        .shareContent{
            border-radius: 0.1rem;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            align-content: flex-start;
            flex-wrap: wrap;
            padding: 0 0.2rem;
            line-height: 1;
            .shareContent1{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-top: 0.19rem;
                section{
                    width: 0.5rem;
                    height: 0.5rem;
                    background-color: #ffddb5;
                    border-radius: 50%;
                    font-size: 0.3rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.48rem;
                    letter-spacing: 0.02rem;
                    color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                }
                p{
                    font-size: 0.28rem;
                    font-weight: bold;
                    font-stretch: normal;
                    line-height: 1;
                    letter-spacing: 0.01rem;
                    color: #323232;
                    margin-left: 0.15rem;
                }
            }
            .shareContent2{
                font-size: 0.24rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1.3;
                letter-spacing: 0.01rem;
                color: rgba(50, 50, 50, 0.8);
                margin-top: 0.12rem;
                text-align: left;
                width: 100%;
            }
        }
    }

    .disEducation {
        height: 0.9rem;
        background-color: #ffffff;
        border-radius: 0.1rem;
        margin-top: 0.2rem;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0.02rem;
        color:#323232 ;
        line-height: 0.9rem;
        padding-left: 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:nth-of-type(2) {
            color: rgba(50, 50, 50, 0.3);
            padding-right: 0.3rem;
        }
    }

    .disShare {
        margin-top: 0.3rem;
        margin-left: 0.15rem;
        width: 6.8rem;
        background-color: #ffa923;
        box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(239, 146, 0, 0.3);
        border-radius: 0.1rem;
        position: relative;
        height: 2.2rem;
        .disShareTitle {
            margin-left: 0.3rem;
            padding-top: 0.59rem;
            font-size: 0.36rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0.02rem;
            color: white;
        }

        .disShareContent {
            font-size: 0.26rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.36rem;
            letter-spacing: 0.01rem;
            color: #ffffff;
            margin-top: 0.3rem;
            margin-left: 0.29rem;
        }
    }

    .disShare1{
        margin-top: 0.3rem;
        margin-left: 0.15rem;
        width: 6.8rem;
        position: relative;
        background-color: #ffa923;
        box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(239, 146, 0, 0.3);
        border-radius: 0.1rem;
        height: 2.2rem;

        .disShareTitle {
            margin-left: 0.3rem;
            padding-top: 0.59rem;
            font-size: 0.36rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0.02rem;
            color: #ffffff;
            span{
                color: rgba(243, 0, 0, 0.65);
            }
        }

        .disShareContent {
            width: 3.8rem;
            font-size: 0.26rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.36rem;
            letter-spacing: 0.01rem;
            color: #ffffff;
            margin-top: 0.39rem;
            margin-left: 0.29rem;
            padding-bottom: 0.59rem;
        }


    }

    .shareLogo{
        position: absolute;
        right: 0.3rem;
        top: 14%;
        width: 1.4rem;
    }

    .disMoney {
        background-color: #ffffff;
        border-radius: 0.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: flex-start;
        flex-wrap: wrap;
        width: 7.1rem;
        margin-bottom: 0.2rem;
        position: relative;
        padding-bottom: 0.4rem;
    }

    .disMoney > p, .disMoney > section {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .disMoneyCount {
        margin-top: 0.5rem;
        font-weight: bold;
        font-size: 0;
        line-height: 1;
        color: #323232;
        height: 0.49rem;
    }

    .bigMoney {
        font-size: 0.72rem;
        height: 0.6rem;
        display: inline-block;

    }

    .bigMoneyInfo {
        font-size: 0.36rem;
        font-weight: normal;
        letter-spacing: 0.02rem;
        color: #323232;
    }

    .disMoneyInfo {
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0.02rem;
        color: rgba(50, 50, 50, 0.7);
        margin-top: 0.28rem;
    }

    .disMoneyTotalMoney {
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0.01rem;
        color: #323232;
        margin-top: 0.4rem;
    }
    .disMoneyTotalMoney1{
        color: #f30000;
    }

    .disMoneyTotalMoney > span {
        color: #f30000;
    }

    .disMoneyBtnsec{
        text-decoration: underline;
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0.01rem;
        color: #008dd6;
        position: absolute;
        top: 0.99rem;
        right: 0.3rem;
    }

    .disMoneyList {
        text-decoration: underline;
        font-size: 0.30rem;
        font-weight: bold;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0.01rem;
        color: #008dd6;
        position: absolute;
        right: 0.3rem;
        top: 0.4rem;
    }

    .shareBtn{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        line-height: 1;
        margin-top: 0.39rem;
        align-content: center;
        flex-wrap: wrap;
        section{
            width: 6.01rem;
            height: 0.9rem;
            background-image: linear-gradient(90deg,
            #f19c38 0%,
            #ed763a 100%),
            linear-gradient(
                    #ffffff,
                    #ffffff);
            background-blend-mode: normal,
            normal;
            border-radius: 0.55rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            align-content: center;
            .p1{
                font-size: 0.36rem;
                font-weight: bold;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.04rem;
                color: #ffffff;
                text-align: center;
            }
            img{
                width: 1rem;
                margin-left: 0.1rem;
            }
            .p2{
                width: 100%;
                font-size: 0.22rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.02rem;
                color: #323232;
                text-align: center;
            }
        }
        section:nth-of-type(2){
            margin-top: 0.1rem;
        }
    }

    .shareLogoAc{
        animation:xinTiaoAc 1s infinite;
    }

    @keyframes xinTiaoAc {
        /*0% { -webkit-transform: scale(1); }*/
        /*30% { -webkit-transform: scale(1); }*/
        /*40% { -webkit-transform: scale(1.08); }*/
        /*50% { -webkit-transform: scale(1); }*/
        /*60% { -webkit-transform: scale(1); }*/
        /*70% { -webkit-transform: scale(1.03); }*/
        /*80% { -webkit-transform: scale(1); }*/
        /*100% { -webkit-transform: scale(1); }*/

        0% { -webkit-transform: scale(1); }
        10% { -webkit-transform: scale(1); }
        15% { -webkit-transform: scale(1.1); }
        20% { -webkit-transform: scale(1); }
        25% { -webkit-transform: scale(1); }
        30% { -webkit-transform: scale(1.03); }
        50% { -webkit-transform: scale(1); }
        60% { -webkit-transform: scale(1); }
    }

</style>