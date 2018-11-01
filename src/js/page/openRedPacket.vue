<template>
    <div id="redPacket" v-disabletouchmove>
        <div id='mask'></div>

        <!-- 金币弹窗 -->
        <div id='goldTip' v-show='type==1'>
            <img src="static/image/redReward/tipBk.png" style='width:6rem;height:5.7rem'>
            <div id='tip1'>+{{data.goldNum}}</div>
            <div id='tip2'>获得{{data.goldNum}}个金币<br/>感觉运气来了，抓一把肯定中</div>
            <img id='goDrop' src="static/image/redReward/goDrop.png" v-on:click='tipClose'
                 style='width:2.62rem;height:0.91rem'>
        </div>

        <!-- 代金券弹窗 -->
        <div id='cashTip' v-show='type==2'>
            <div id='top'>
                <div style="top:.47rem;position:absolute;left:.25rem">
                    <component v-bind:is="showCash" :data='data' v-on:close='tipClose'></component>
                </div>
            </div>
            <div id='bottom'>
                <div id='tip'>充值满减，不用可惜啦~<br/> <span style="color: red;">代金券同样享受首充及优惠哦</span></div>
                <section class="selectBtn">
                    <div id='leave' v-on:click.once='leave'>放弃使用</div>
                    <div id='line1'></div>
                    <div id='goon' v-on:click='goon'>立即使用</div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>

    import CF from '../../router/ind.js';
    import cashCoupon from './cashCoupon.vue';
    import { mapMutations } from 'vuex';
    import { openPacket } from '../../server/getServerData'

    export default {
        data() {
            return {
                showCash: false,
                type: 1,
                data: {
                    goldNum: 0,
                    recharge: 0,
                    reduce: 0,
                    getGold: '',
                    goods_id: '',
                    date: ''
                }
            }
        },

        created: function () {
            // this.type=2;
            // this.showCash='cashCoupon';
            // this.data.goldNum=100;
            this.getRedPacket();
        },
        methods: {
            ...mapMutations([
                'updateGoldNum'
            ]),


            getRedPacket: function () {
                //开红包
                openPacket('open_packet',(data)=>{
                    if (data.status == 2) {
                        this.$emit('close');
                        return;
                    }
                    this.type = data.data.type;
                    this.data = data.data.data;
                    this.showCash = 'cashCoupon';
                })

            },
            leave: function () { //放弃使用
                this.$emit('close')
            },
            goon: function () { //立即使用
                CF.pubsub.$emit('useCashCoupon');
            },
            tipClose: function () {
                if (this.type == 1) {
                    this.updateGoldNum(this.data.goldNum);
                }
                this.$emit('close', tip)
            },

        },
        components: {
            cashCoupon: cashCoupon

        }

    }
</script>

<style scoped>
    #redPacket {
        position: fixed;
        height: 100%;
        width: 100%;
        z-index: 999;
        top: 0rem;
        left: 0rem;
    }

    #mask {
        position: absolute;
        height: 100%;
        width: 100%;
        background: black;
        opacity: 0.7;
    }

    #goldTip {
        position: absolute;
        width: 6.00rem;
        height: 5.70rem;
        left: .75rem;
        top: 2.50rem;
        text-align: center;
    }

    #goldTip #tip1 {
        position: absolute;
        width: 100%;
        text-align: center;
        color: #ec4776;
        font-size: .48rem;
        font-weight: bold;
        top: 2.00rem;
    }

    #goldTip #tip2 {
        position: absolute;
        font-size: .30rem;
        line-height: .40rem;
        width: 100%;
        top: 3.20rem;
    }

    #goldTip #goDrop {
        position: absolute;
        bottom: .50rem;
        left: 1.69rem;
    }

    #cashTip {
        border-radius: .20rem;
        position: absolute;
        width: 6.03rem;
        height: 5.75rem;
        left: .74rem;
        margin-top: 2.50rem;
        background: #ffffff;
        overflow: hidden;
    }

    #cashTip #top {
        position: absolute;
        width: 100%;
        height: 3.21rem;
        background: #ffdde6;
        text-align: center;
    }

    #cashTip #bottom {
        position: absolute;
        bottom: 0rem;
        width: 100%;
        height: 2.50rem;
        text-align: center;
    }

    #cashTip #tip {
        font-size: .30rem;
        line-height: .44rem;
        width: 100%;
        margin-top: 0.4rem;
    }

    #line1 {
        width: 0.02rem;
        height: .32rem;
        background-color: #f0f0f0;
        float: left;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    #leave {
        display: inline-block;
        width: 2.8rem;
        text-align: center;
        font-size: .30rem;
        color: #cccccc;
        line-height: .92rem;
        float: left;
    }

    #goon {
        display: inline-block;
        width: 2.8rem;
        text-align: center;
        font-size: .30rem;
        font-weight: bold;
        color: #50bfff;
        line-height: .92rem;
        float: right;
    }

    .selectBtn {
        position: relative;
        height: 1rem;
        margin-top: 0.2rem;
    }

</style>