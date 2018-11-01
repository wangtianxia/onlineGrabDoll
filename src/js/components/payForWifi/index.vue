<template>
    <section class="payForWifi">
        <section class="payForWifiContent">
            <img class="closePay" src="static/image/close.png" @click="closePay" alt="">
            <p class="hasMoney"> ￥{{money}}</p>
            <p class="canGetMoney"> {{gold}} 金币</p>
            <section class="payItem payItem1" @click="changeItem(1)">
                <img src="static/image/wifi/wifiLogo.png" alt="">
                <section>连尚钱包</section>
                <img class="payInfo" src="static/image/wifi/tip.png" alt="">
            </section>
            <section class="payItem payItem2" @click="changeItem(0)">
                <section class="payItemContent">微信支付</section>
            </section>
        </section>
    </section>
</template>

<script>

    import CF from '../../../router/ind';

    export default {
        data() {
            return {
                isCanPay: true
            }
        },
        name: "index",

        props: ['money', 'goods_id', 'gold'],

        methods: {

            changeItem(type) {
                let self = this;
                if (this.isCanPay) {
                    this.isCanPay = false;
                    // (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'pay_statistics', {
                    //     click: 1,
                    //     ret: 0
                    // });
                    (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'create_order', {
                        user_id: CF.user.uid,
                        goods_id: self.goods_id,
                        isIos: CF.TOOLS.isIos(),
                        isIosNewVerSion: CF.isIosNewVerSion, //针对噶么
                        type: type,
                        sign: CF.M5B({
                            user_id: CF.user.uid,
                            goods_id: self.goods_id,
                            isIos: CF.TOOLS.isIos(),
                            isIosNewVerSion: CF.isIosNewVerSion
                        })
                    }, function (data) {
                        if (data.status == 1) {
                            // (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'pay_statistics', {
                            //     click: 0,
                            //     ret: 1
                            // }, () => {
                            //     self.isCanPay = true;
                            //     CF.channel.payForWifi(type, data['data'], function (isNoCbPay) {
                            //         self.paySuccess(isNoCbPay, data);
                            //     })
                            // });
                            self.isCanPay = true;
                            CF.channel.payForWifi(type, data['data'], function (isNoCbPay) {
                                self.paySuccess(isNoCbPay, data);
                            })
                        }
                    });
                }
            },

            closePay() {
                this.$emit('closePayWifi')
            },
            paySuccess: function (isNoCbPay, data) { //支付成功 弹窗通知
                let self = this;
                if (isNoCbPay == 1) {
                    self.$router.push({name: 'payIframePage', params: {url: data['data']['info']}})
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    p {
        margin: 0;
        padding: 0;
        font-size: 0;
        line-height: 1;
        width: 100%;
    }

    .payForWifi {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.3rem;
        z-index: 100;
    }

    .payForWifiContent {
        background-color: white;
        border-radius: 0.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: flex-start;
        flex-wrap: wrap;
        position: relative;
        width: 6.19rem;
        height: 4.97rem;
    }

    .payItem{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.8rem;
        color: white;
        font-size: 0.3rem;
    }

    .payItem1,.payItem2 {
        background-color: #0285f0;
        width: 4.74rem;
        height: 0.79rem;
        border-radius: 0.1rem;
        position: relative;
        border: 0.03rem solid #006cc5;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .payItem1>img:nth-of-type(1){
        width: 0.38rem;
    }
    .payItem1>section{
        margin-left: 0.15rem;
    }

    .payItem2 {
        width: 80%;
        border-radius: 0.1rem;
        margin-top: 0.8rem;
    }

    .closePay {
        width: 0.27rem;
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
    }

    .hasMoney {
        font-size: 0.36rem;
        text-align: center;
        color: #000;
        margin-top: 0.5rem;
    }

    .canGetMoney {
        font-size: 0.3rem;
        margin-bottom: 0.3rem;
        margin-top: 0.3rem;
        color: #000;
        text-align: center;
    }

    .payItemContent {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .payInfo{
        position: absolute;
        top: -0.35rem;
        right: -0.2rem;
        width: 1.7rem;
    }
</style>