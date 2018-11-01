<template>
    <div id='firstPayWindow' v-disabletouchmove>
        <div id='mask'></div>
        <div id='window'>
            <div id='bg' v-if="!qqChannel">
                <img :src="bg"  onclick="return false" style="width:6rem;height:8.14rem">
            </div>
            <div v-else>
                <img src="static/image/firstPayWindow/bg10.png" onclick="return false" style="width:6rem;height:8.14rem">
            </div>
            <div id='ok'>
                <img src="static/image/firstPayWindow/ok.png" v-on:click.stop.prevent='okClick' style="width:4.07rem;height:1.13rem">
            </div>
            <div id='close' v-on:click.stop.prevent='closeClick'>
                <img src="static/image/firstPayWindow/close.png" style="widht:0.23rem;height:0.22rem">
            </div>
        </div>
        <!-- now支付无回调弹窗 -->
        <!--<component v-bind:is="show_tip" :data='data' v-on:rechargeComplete='rechargeComplete' v-on:rechargeCancel='rechargeCancel'></component>-->
        <!-- 支付成功回调弹窗-->
        <component v-bind:is="showPaySucc" :title='title' :tip='tip' :type='type' v-on:close='tipClose'
                   v-on:ok='tipOk'></component>

        <payForWifi v-if="payWifi" :money="money" :goods_id="goods_id" :gold="gold"
                    @closePayWifi="closePayWifi()"></payForWifi>

    </div>
</template>
<script>

    import CF from '../../router/ind.js'
    import rechargeTip from './rechargeTip.vue'
    import tip from './tip1.vue';
    import { mapState, mapMutations} from 'vuex'
    import payForWifi from '../components/payForWifi/index';

    export default {
        data: function () {
            return {
                show_tip: '',
                showPaySucc: '',
                type: false,
                tip: '支付成功',
                title: '支付通知',
                data: {},//支付弹窗数据
                payWifi: false,
                money: '',
                goods_id: '',
                gold: '',
                isCanPay: true,
            }
        },

        props: ['qqChannel'],


        computed:{
            ...mapState([
                'first_pay_2','first_pay'
            ]),

            bg(){
                if(CF.user.platform == '1001'){
                    if(this.first_pay_2){
                        return 'static/image/firstPayWindow/bg2.png'
                    }else{
                        return 'static/image/firstPayWindow/bg_20.png'
                    }
                }else{
                    return 'static/image/firstPayWindow/bg20.png'
                }
            }
        },


        methods: {
            ...mapMutations(['initGoldNum','initPayMoney','initPayMoney20']),

            closeClick: function () {
                this.$emit('close');
            },
            okClick: function () {
                let self = this;

                let goods_id = 'pay_20';
                if(CF.user.platform == '1001'){
                    if(self.first_pay_2){
                        goods_id = 'pay_2'
                    }else{
                        goods_id = 'pay_20'
                    }
                }
                if (this.qqChannel) {
                    goods_id = 'pay_10';
                }
                if (CF.user.platform == '1009') {
                    this.goods_id = 'pay_20';
                    this.money = 20;
                    this.gold = 400;
                    this.payWifi = true;
                    return;
                }
                if (this.isCanPay) {
                    this.isCanPay = false;
                    this.showPaySucc = 'tip';
                    this.tip = '正在调起支付';
                    this.title = '支付通知';

                    (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'create_order', {
                        user_id: CF.user.uid,
                        goods_id: goods_id,
                        isIos: CF.TOOLS.isIos(),
                        isIosNewVerSion: CF.isIosNewVerSion,
                        sign: CF.M5B({
                            user_id: CF.user.uid,
                            goods_id: goods_id,
                            isIos: CF.TOOLS.isIos(),
                            isIosNewVerSion: CF.isIosNewVerSion
                        })
                    }, function (data) {
                        if (data.status == 1) {
                            self.isCanPay = true;
                            CF.channel.pay(data.data, function (isNoCbPay) {
                                self.paySuccess(isNoCbPay, data);
                            });

                        } else {
                            self.isCanPay = true;
                            alert('暂时维护中')
                        }
                    });
                }
            },

            paySuccess: function (isNoCbPay, data) { //支付成功 弹窗通知
                var self = this;
                if (isNoCbPay) {
                    this.$router.push({name: 'payIframePage', params: {url: data.data}})
                } else {
                    this.showPaySucc = 'tip';
                    if(this.first_pay_2){
                        this.initPayMoney(false);
                    }else if(this.first_pay){
                        this.initPayMoney20(false);
                    }
                }
            },

            resetGold: function () {
                this.show_tip = '';
                var self = this;
                (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'get_golds', {
                    user_id: CF.user.uid,
                    sign: CF.M5B({user_id: CF.user.uid})
                }, function (data) {
                    if (data.status == 1) {
                        self.initGoldNum(data.data.gold);
                        self.$emit('changeGold');
                        self.$emit('close');
                    }
                });
            },
            tipOk: function () {
                this.showPaySucc = '';
                // this.$emit('close')
                this.resetGold();
            },
            tipClose: function () {
            },
            closePayWifi() {
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
    #ok {
        position: absolute;
        top: 6.45rem;
        left: 1.00rem;
    }

    #close {
        position: absolute;
        left: 5.43rem;
        top: .80rem;
        width: .50rem;
        height: .50rem;
    }

    #close > img {
        position: absolute;
        left: 0;
        top: 0.1rem;
    }

    #firstPayWindow {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        z-index: 999;
        text-align: center;
    }

    #window {
        position: absolute;
        width: 6.00rem;
        height: 8.14rem;
        left: 50%;
        top: 1rem;
        margin-left: -3.00rem;
        text-align: center;
        overflow: hidden;
    }

    #mask {
        position: absolute;
        height: 15.00rem;
        width: 100%;
        background: black;
        opacity: 0.2;
    }


</style>