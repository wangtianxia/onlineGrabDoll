<template>
    <section class="distributionBanner" :style="{backgroundImage:'url(' + bgUrl + ')'}"
             @click.stop.prevent="goDistribution">

        <section class="userInfo">
            <img :src="face" alt="">
            <span>{{userName}}</span>
        </section>

        <section class="userMoney" @click.stop.prevent="goPay">
            <img src="static/image/newImage/coin.png" alt="">
            <span>{{goldNum}}</span>
            <img src="static/image/distribution/add.png" alt="">
        </section>

        <section class="disRed" :style="{backgroundImage:'url(' + bgUrl1 + ')'}" v-if="type == 0">
            <p>现金</p>
            <p>6.6元</p>
            <p>合伙人</p>
        </section>

        <section class="promoteMoney" v-if="type!=0">
            <p>合伙人收益</p>
            <p><span>{{money}}</span><span>元 ></span></p>
            <p v-if="type == 1 || type == 2">{{cha}}</p>
        </section>
        <!--<section class="promoteMoney1" >-->
        <!--<p>分享就赚钱</p>-->
        <!--<p>请你来当合伙人</p>-->
        <!--</section>-->
    </section>
</template>

<script>
    import CF from '../../../CF'
    import {mapState,mapMutations} from 'vuex';
    import {promoterInfo, homepage_promoter_click} from '../../../server/getServerData'

    export default {
        name: "index",
        data() {
            return {
                bgUrl: '',
                type: '',
                money: 0,
                bgUrl1: require('../../../../static/image/distribution/red.png'),
                cha: 0
            }
        },

        computed: {
            ...mapState([
                'initUserData', 'goldNum', 'promoterInfoData'
            ]),

            userName() {
                return this.initUserData['user_name']
            },

            face() {
                return CF.user.face
            }
        },

        mounted() {
            this.getPromoteInfoData();
        },

        methods: {
            ...mapMutations([
                'getPromoteInfo'
            ]),

            getPromoteInfoData() {
                if (this.promoterInfoData && this.promoterInfoData['user_id']) {
                    this.type = this.promoterInfoData['status'];
                    if (this.type != 0) {
                        this.money = this.promoterInfoData['balance'].toFixed(2);
                        this.cha = this.promoterInfoData['balance'] >= 30 ? "可以提现了" : `还差${(30 - this.promoterInfoData['balance']).toFixed(2)}元可以提现`
                        this.bgUrl = require('../../../../static/image/distribution/bg.jpg')
                    }
                    if (this.type == 0) {
                        this.bgUrl = require('../../../../static/image/distribution/bg1.jpg')
                    }
                } else {
                    promoterInfo('promoter_info', (data) => {
                        if (data['status'] == 1) {
                            this.getPromoteInfo(data['data']);
                            this.type = data['data']['status'];
                            if (this.type != 0) {
                                this.money = data['data']['balance'].toFixed(2);
                                this.cha = data['data']['balance'] >= 30 ? "可以提现了" : `还差${(30 - data['data']['balance']).toFixed(2)}元可以提现`;
                                this.bgUrl = require('../../../../static/image/distribution/bg.jpg')
                            }
                            if (this.type == 0) {
                                this.bgUrl = require('../../../../static/image/distribution/bg1.jpg')
                            }
                        }else {
                            this.bgUrl = require('../../../../static/image/distribution/bg1.jpg')
                        }
                    });
                }
            },

            goPay() {
                this.$router.push('/recharge');
            },

            goDistribution() {
                this.$router.push('/distribution');
                homepage_promoter_click('homepage_promoter_click', function () {

                })
            }
        }
    }
</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .distributionBanner {
        width: 100%;
        height: 2.2rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        .userInfo {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: absolute;
            left: 0.5rem;
            top: 0.46rem;
            img {
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
            }
            span {
                margin-left: 0.2rem;
                font-size: 0.3rem;
                color: white;
            }
        }

        .userMoney {
            height: 0.66rem;
            border-radius: 0.3rem;
            background-color: rgb(255, 249, 241);
            position: absolute;
            top: 1.18rem;
            left: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img:nth-of-type(1) {
                width: 0.5rem;
                margin-left: 0.1rem;
            }
            img:nth-of-type(2) {
                width: 0.5rem;
                margin-right: 0.1rem;
            }
            span {
                font-size: .3rem;
                margin: 0 0.2rem;
            }
        }

        .disRed {
            width: 1.51rem;
            height: 2.01rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            p:nth-of-type(1) {
                text-align: center;
                line-height: 1;
                font-size: 0.22rem;
                color: white;
                margin-top: 0.2rem;
            }
            p:nth-of-type(2) {
                text-align: center;
                line-height: 1;
                font-size: 0.32rem;
                color: #fff900;
                margin-top: 0.5rem;
            }

            p:nth-of-type(3) {
                text-align: center;
                line-height: 1;
                font-size: 0.24rem;
                color: white;
                margin-top: 0.1rem;
            }
        }

        .promoteMoney {
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
            position: absolute;
            flex-wrap: wrap;
            right: 0.7rem;
            bottom: 0.2rem;
            text-align: center;
            width: 2.6rem;
            p:nth-of-type(1) {
                font-size: 0.22rem;
                color: #e5e5e5;
                width: 100%;
                line-height: 1;
            }
            p:nth-of-type(2) {
                margin-top: 0.1rem;
                font-size: 0.42rem;
                color: #fff900;
                width: 100%;
                line-height: 1;
                font-weight: bold;
                span:nth-of-type(2) {
                    font-size: 0.26rem;
                }
            }
            p:nth-of-type(3) {
                margin-top: 0.1rem;
                font-size: 0.22rem;
                color: #e5e5e5;
                width: 100%;
                line-height: 1;
            }
        }
        .promoteMoney1 {
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
            position: absolute;
            flex-wrap: wrap;
            right: 0.7rem;
            bottom: 0.3rem;
            text-align: center;
            width: 2.6rem;
            p:nth-of-type(1) {
                font-size: 0.32rem;
                color: #e5e5e5;
                width: 100%;
                line-height: 1;
                text-decoration: underline;
            }
            p:nth-of-type(2) {
                margin-top: 0.16rem;
                font-size: 0.22rem;
                color: #e5e5e5;
                width: 100%;
            }
        }

    }
</style>