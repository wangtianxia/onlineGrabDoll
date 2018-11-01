<template>
    <div id="cashCoupon">
        <div class="cashCouponContent" v-on:click.stop.prevent='goRecharge'>
            <img class="cashCouponImg" src="static/image/redReward/bg1.png" onclick="return false">
            <div id='reduce'>{{data.reduce}}</div>
            <div id='RMB'>RMB</div>
            <div id='tip1'>充{{data.recharge}}减{{data.reduce}}</div>
            <div id='date'>{{date}}</div>
        </div>
        <!-- now支付无回调弹窗 -->
        <component v-bind:is="show_tip" :data='nowData' v-on:rechargeComplete='rechargeComplete'
                   v-on:rechargeCancel='rechargeCancel'></component>
        <!-- 支付成功回调弹窗-->
        <component v-bind:is="showPaySucc" :title='title' :tip='tip' :type='type' v-on:close='tipClose'
                   v-on:ok='tipOk'></component>
        <payForWifi v-if="payWifi" :goods_id="goods_id" :money="money" :gold="gold" @closePayWifi="closePayWifi()"></payForWifi>
    </div>
</template>

<script>

    import CF from '../../router/ind.js';
    import rechargeTip from './rechargeTip.vue';
    import tip from './tip1.vue';
    import payForWifi from '../components/payForWifi/index';

    export default {
        data() {
            return {
                date: "",
                show_tip: '',
                showPaySucc: '',
                type: false,
                tip: '支付成功',
                title: '支付通知',
                nowData: {},//支付弹窗数据
                goods_id: '',
                money: '',
                gold: " ",
                payWifi: false,
                isCanPay: true
            }
        },
        props: ['data'],

        created: function () {
            var self = this;
            CF.pubsub.$off('useCashCoupon');
            CF.pubsub.$on('useCashCoupon', function () {
                self.goRecharge();
            });
            this.date = this.getTimeStr(this.data.date)
        },
        methods: {
            goRecharge: function () {
                let self = this;
                //WIFI支付
                if (CF.user.platform == 1009) {
                    this.goods_id = self.data.goods_id;
                    this.money = self.data.recharge;
                    this.gold = self.data.getGold;
                    this.payWifi = true;
                } else {
                    if (this.isCanPay) {
                        this.isCanPay = false;
                        this.$emit('showTip');

                        (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'create_order', {
                            user_id: CF.user.uid,
                            goods_id: self.data.goods_id,
                            isIos: CF.TOOLS.isIos(),
                            isIosNewVerSion: CF.isIosNewVerSion,
                            sign: CF.M5B({
                                user_id: CF.user.uid,
                                goods_id: self.data.goods_id,
                                isIos: CF.TOOLS.isIos(),
                                isIosNewVerSion: CF.isIosNewVerSion
                            })
                        }, function (data) {
                            if (data.status == 1) {
                                self.isCanPay = true;
                                CF.channel.pay(data.data, function (isNoCbPay) {
                                    self.paySuccess(isNoCbPay, data);
                                })
                            } else {
                                self.isCanPay = true;
                                self.tip = '支付暂时维护中';
                                self.showPaySucc = 'tip';
                            }
                        });
                    }
                }
            },

            getTimeStr: function (timer) {
                // function add0(m) {
                //     return m < 10 ? '0' + m : m
                // }
                // var time = new Date(timer * 1000);
                // var y = time.getFullYear();
                // var m = time.getMonth() + 1;
                // var d = time.getDate();
                let newDate = new Date().getTime();
                let cutDownTime = timer*1000 - newDate;
                if(cutDownTime>0){
                    let day = Math.floor(cutDownTime / (24 * 3600 * 1000));
                    let l_h = cutDownTime%(24 * 3600 * 1000);
                    let h = Math.floor(l_h/(3600*1000));
                    let l_m = l_h%(3600*1000);
                    let m = Math.floor(l_m/(60*1000));
                    if(day>0){
                        return `${day}天${h}小时后过期`
                    }else if(h>0){
                        return `${h}小时后过期`
                    }else{
                        return `${m}分钟后过期`
                    }
                }else{
                    return '已到期'
                }
            },

            paySuccess: function (isNoCbPay, data) { //支付成功 弹窗通知
                var self = this;
                if (isNoCbPay) {
                    // self.nowData.payUrl=data.data;
                    // self.nowData.rmb=self.data.recharge-self.data.reduce;
                    // self.nowData.tip=self.data.getGold+'金币';
                    // self.show_tip='rechargeTip';
                    this.$router.push({name: 'payIframePage', params: {url: data.data}})
                } else {
                    // this.tip = '支付成功';
                    // this.showPaySucc = 'tip';
                }
            },
            rechargeComplete: function () {
                this.show_tip = '';
                CF.pubsub.$emit('updateGold');
                this.$emit('close');
            },
            rechargeCancel: function () {
                this.show_tip = '';
                CF.pubsub.$emit('updateGold');
                this.$emit('close');
            },

            tipOk: function () {
                this.showPaySucc = '';
                CF.pubsub.$emit('updateGold');
                this.$emit('close');
            },
            tipClose: function () {
                this.showPaySucc = '';
            },
            closePayWifi(){
                this.payWifi = false;
            }
        },
        components: {
            rechargeTip: rechargeTip,
            tip: tip,
            payForWifi
        }
    }
</script>

<style scoped>
    .cashCouponContent {
        font-size: 0;
        margin-bottom: 0.4rem;
        line-height: 1;
        width: 6.9rem;
        height: 2rem;
    }

    .cashCouponImg {
        width: 6.9rem;
        height: 2rem;
    }

    #reduce {
        position: absolute;
        left: 0.7rem;
        top: .52rem;
        margin: 0;
        padding: 0;
        font-family: HYRunYuan-GEW;
        font-size: 0.72rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.36rem;
        letter-spacing: 0.004rem;
        color: #000000;
    }

    #RMB {
        position: absolute;
        left: .64rem;
        top: 1.2rem;
        font-family: PingFang-SC-Bold;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.36rem;
        letter-spacing: 0.002rem;
        color: #000000;
    }


    #tip1 {
        position: absolute;
        left: 50%;
        top: .55rem;
        font-size: .30rem;
        color: #323232;
        transform: translateX(-50%);
    }

    #date {
        position: absolute;
        left: 50%;
        top: 1.13rem;
        font-family: PingFang-SC-Medium;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.36rem;
        letter-spacing: 0rem;
        color: #ed773a;
        transform: translateX(-50%);
    }


</style>