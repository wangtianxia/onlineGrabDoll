<template>
    <div id="gameRoom_waitSee">
        <div class="firstPay" v-if='showPay' @click.stop.prevent="toDirect">
            <img :src='firstPayImg' alt="">
        </div>

        <div id='startBtn'>
            <section v-show='!isStart' v-on:click='startBtnClick' style="display: inline-block;">
                <img src="static/image/game/startBtn.png" style='width:3.11rem;height:1.3rem'>
                <span class="dollPrice dollPrice1">{{dollPrice}}币/次</span>
            </section>
            <section v-show='isStart' style="display: inline-block;">
                <img src="static/image/game/startBtn_1.png" style='width:3.11rem;height:1.3rem' onclick="return false">
                <span class="dollPrice dollPrice2">{{dollPrice}}币/次</span>
            </section>
        </div>

        <div class="left_coin">
            <section class="witeSeeCoin">
                <img src="static/image/newImage/coin.png" style="width:.28rem;height:.28rem;">
                <span class="witeSeeCoin_s">{{goldNum}}</span>
            </section>
            <img class="left_coin_img" src='static/image/game/recharge.png' style="width:1.43rem;" @click="buy" alt="">
        </div>

        <!-- v-if="virtual && isStart"-->
        <transition name="showVirtual">
            <section class="virtualSection" v-if="isStart && virtual">
                <section @click="virtualGame">
                    <img class="virtualGame" src="static/image/newImage/xuniji.png" alt="">
                    <section class="changeVirtual">换虚拟机</section>
                </section>
            </section>
        </transition>

    </div>
</template>

<script>

    import CF from "../../router/ind.js";
    import { mapState } from 'vuex';
    import { startGame } from '../../server/getServerData';

    export default {
        data() {
            return {
            };
        },

        computed: {
            ...mapState([
                'goldNum','promoterInfoData','first_pay_2','first_pay'
            ]),

            firstPayImg(){
                if(CF.user.platform == '1001'){
                    if(this.first_pay_2){
                        return 'static/image/icon/towpay.gif';
                    }else if(this.first_pay) {
                        return 'static/image/icon/bigPac.gif';
                    }else{
                        return 'static/image/icon/xjhb.png';
                    }
                }else{
                    if(this.first_pay){
                        return 'static/image/icon/first_pay.png'
                    }
                    return ''
                }
            },

            showPay(){
                if(CF.user.platform == '1001'){
                    return true;
                }else{
                    if(this.first_pay){
                        return true
                    }else{
                        return false
                    }
                }
            }
        },

        props: ["dollPrice", "machineId", "isStart", 'virtual'],

        methods: {

            toDirect(){
                if(CF.user.platform == '1001'){
                    if(this.first_pay_2){
                        this.$emit('pay2');
                    }else if(this.first_pay){
                        this.$emit('pay2');
                    }else{
                        this.$router.push('/distribution');
                    }
                }else{
                    this.$router.push('/recharge');
                }
            },

            startBtnClick: function () {
                startGame("start_game",this.machineId,(data)=>{
                    if (data.status == 1) {
                        CF.Connet.actionPush("1", {});
                    } else {
                        CF.Connet.actionPush('0', {});
                        if (data['data'] && data['data']['recharge_pop']) {
                            if (data['data']['recharge_pop'] == 1) {
                                this.$emit('noHaveGold');
                            } else {
                                this.$emit('smallMoney', data['data']['recharge_pop']);
                            }
                        }
                    }
                });
            },

            buy() {
                this.$router.push({name: 'rechargePage', params: {}});
            },

            virtualGame() {
                this.$router.push({
                    name: 'virtualRoomPage',
                    params: {price: this.dollPrice, machine_id: this.machineId}
                })
            }
        }
    };
</script>

<style scoped>
    .virtualSection {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -0.5rem;
    }

    .virtualGame {
        width: 1.98rem;
        height: 1.1rem;
    }

    .changeVirtual {
        font-size: 0.3rem;
        color: white;
        position: absolute;
        z-index: 100;
        text-align: center;
        top: 0.23rem;
        width: 100%;
    }

    #gameRoom_waitSee {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2.5rem;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    #startBtn {
        text-align: center;
        height: 1.3rem;
        margin: 0 0.5rem 0.46rem 0.5rem;
    }

    #startBtn > section {
        height: 1.3rem;
        position: relative;
    }

    .dollPrice {
        display: block;
        position: absolute;
        text-align: center;
        z-index: 0;
        top: 0.7rem;
        left: 50%;
        font-size: .20rem;
        transform: translate(-50%);
    }

    .dollPrice2 {
        color: #a4a4a4;
    }

    .dollPrice1 {
        color: #ff8f11;
    }

    .witeSeeCoin {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .left_coin {
        width: 1.43rem;
        margin-right: 0.3rem;
        font-size: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        align-content: flex-end;
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .left_coin > img {
        margin-bottom: 0.6rem;
        margin-top: 4px;
    }

    .witeSeeCoin_s {
        margin-left: 0.08rem;
        font-size: .32rem;
        color: white;
        font-weight: bold
    }

    .firstPay {
        width: 1.35rem;
        height: 1.1rem;
        margin-left: 0.3rem;
        position: absolute;
        left: 0;
        bottom: 0.6rem;
    }

    .firstPay > img {
        width: 1.35rem;
        height: 1.1rem;
    }

    .showVirtual-enter-active, .showVirtual-leave-active {
        transition: all 0.3s ease-out;
        transform-origin: center center;
    }

    .showVirtual-enter-to, .showVirtual-leave {
        opacity: 1
    }

    .showVirtual-enter, .showVirtual-leave-to {
        opacity: 0;
    }
</style>