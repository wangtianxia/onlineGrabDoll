<template>
    <!--20元-->
    <section class="smallMoney" v-disabletouchmove>
        <section class="smallMoneyContent">
            <img class="close" src="static/image/10086/close.png" @click="closeSmallImg" alt="">
            <p class="title">差一点就抓到了</p>
            <section class="smallM_t">
                <p class="smallM_t4">金币不够了</p>
            </section>
            <img class="coin" src="static/image/recharge/noticeCoin.png" alt="">
            <img class="pay3" src="static/image/recharge/pay_3.png" alt="">
            <p class="p2">获得<span class="s1">{{coin|dicount}}</span>金币</p>
            <p class="s2"><span>获得</span>{{coin}}<span>金币</span></p>
            <section class="s3">
                <section class="s4" @click="goSmall">
                    ￥{{payWords}}
                </section>
            </section>
            <section class="newUser">新用户首充优惠</section>
            <!--<section class="goBuy" @click="buy">去商城逛逛></section>-->
        </section>
        <payForWifi  v-if="payWifi" :money="money" :goods_id="goods_id" :gold="gold" @closePayWifi="closePayWifi()"></payForWifi>
    </section>
</template>

<script>
    import CF from '../../../CF';
    import payForWifi from '../payForWifi/index';
    import { createOrder,getGolds } from '../../../server/getServerData';
    import { mapMutations } from 'vuex'


    export default {
        name: "smallMoney",
        data() {
            return {
                canBuy: true,
                payWords:'',
                coin:'',
                money:'',
                goods_id:'',
                payWifi:false,
                gold:''
            }
        },
        mounted(){
            if(CF.user.qq_channel){
                this.payWords = '10';
                this.coin = '200';
            }else{
                this.payWords = '20';
                this.coin = '400';
            }
        },
        filters:{
            dicount( coin ){
                return coin/2
            }
        },
        methods: {
            ...mapMutations([
                'initGoldNum'
            ]),
            goSmall() {
                if (this.canBuy) {
                    this.canBuy = false;
                    let goods_id='pay_20';
                    if(CF.user.qq_channel){
                        goods_id = 'pay_10';
                    }
                    let self = this;

                    if(CF.user.platform == 1009){
                        this.canBuy = true;
                        this.goods_id = 'pay_20';
                        this.money = 20;
                        this.gold = 400;
                        this.payWifi = true;
                        return ;
                    }

                    createOrder('create_order',{id:goods_id},(data)=>{
                        if (data.status == 1) {
                            self.canBuy = true;
                            CF.channel.pay(data.data, function (isNoCbPay) {
                                self.paySuccess(isNoCbPay, data);
                            })
                        } else {
                            self.canBuy = true;
                            alert('暂时维护中');
                        }
                    })
                }

            },
            paySuccess(isNoCbPay,data){
                if(isNoCbPay){
                    this.$router.push({ name: 'payIframePage', params: {url:data.data}})
                }else {
                    //获取金币
                    getGolds('get_golds',(data)=>{
                        if (data.status == 1) {
                            this.initGoldNum(data.data.gold);
                        }
                    });
                    this.$emit('closeSmallMoney');
                }
            },
            closePayWifi(){
                this.payWifi = false;
            },
            closeSmallImg() {
                this.$emit('closeSmallMoney');
            },
            buy(){
                this.$router.push({ name: 'rechargePage', params: {}})
            }
        },
        components:{
            payForWifi
        }
    }
</script>

<style scoped>
    p {
        margin: 0;
        padding: 0;
    }

    .smallMoney {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .smallMoneyContent {
        width: 6rem;
        background-color: white;
        position: relative;
        font-size: 0;
        border-radius: 0.4rem;
        text-align: center;
        height: 6.6rem;
        line-height: 1;
    }

    .top {
        width: 6rem;
        height: 1.77rem;
    }

    .title {
        position: absolute;
        width: 100%;
        text-align: center;
        font-size: 0.4rem;
        color: #ffe400;
        left: 0;
        line-height: 1;
        margin: 0;
        padding: 0;
        top: -0.7rem;
    }

    .smallM_t {
        text-align: center;
        margin: 0;
        padding: 0;
        margin-top: 0.4rem;
        line-height: 1;
    }

    .smallM_t1, .smallM_t3, .smallM_t4 {
        font-size: 0.3rem;
    }

    .smallM_t2 {
        font-size: 0.48rem;
        color: #ec4776;
    }

    .p1 {
        line-height: 0.48rem;
    }

    .coin {
        width: 3.9rem;
        height: 2.35rem;
        text-align: center;
        margin-top: .6rem;
    }

    .p2 {
        text-align: center;
        margin-top: .3rem;
        font-size: 0.24rem;
        color: #323232;
        text-decoration: line-through;
    }

    .s1 {
        color: #ffe400;
        font-weight: bold;
    }

    .s2 {
        color: #ffe400;
        font-size: 0.3rem;
        margin-top: 0.15rem;
    }
    .s2>span{
        color: #323232;
    }

    .s3 {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
        margin-top: 0.3rem;
    }

    .s4 {
        font-size: 0.3rem;
        color: white;
        width: 3rem;
        height: 0.8rem;
        background:linear-gradient(to right, rgb(241, 156, 56), rgb(237, 118, 58)) ;
        text-align: center;
        line-height: 0.8rem;
        border-radius: 1rem;
    }

    .close {
        position: absolute;
        top: -0.8rem;
        right: 0.2rem;
        z-index: 100;
        width: 0.4rem;
    }
    .goBuy{
        position: absolute;
        right: 0.2rem;
        bottom: 0.2rem;
        font-size: 0.3rem;
        color: blue;
        line-height: 0.3rem;
    }
    .newUser{
        text-align: center;
        font-size: 0.2rem;
        color: #323232;
        margin-top: 0.3rem;
    }
    .pay3{
        position: absolute;
        width: 1.3rem;
        top: 2.3rem;
        right: 0.5rem;
    }
</style>