<template>
    <!--2件包邮-->
    <section class="twoSend">
        <section class="toSendContent">
            <img class="closeImg" @click="closeImg" src="static/image/close.png" alt="">
            <section class="toSendContentTop">凑2件包邮哦！</section>
            <section class="toSendContentTitle">
                您选择了单件商品发货<br/>需要支付{{send_price}}元邮费
            </section>
            <section class="toSendImg">
                <img src="static/image/recharge/payTwoSend.png" alt="">
                <img src="static/image/recharge/kt.png" alt="">
            </section>
            <section class="toSendTitle2">
                充值100元<br/>
                <span>1100</span><span>金币+</span>
                <span>Hello Kitty 公仔</span>
            </section>
            <section class="toSendBtn">
                <section @click="pay('pay_mail')">
                    支付邮费<br/>
                    ￥{{send_price}}
                </section>
                <section @click="pay('pay_100')">
                    凑单礼包<br/>
                    ￥100
                </section>
            </section>
            <section class="toSendBtnTitle4">申请发货专用</section>
        </section>
        <payForWifi  v-if="payWifi" :money="money" :goods_id="goods_id" :gold="gold" @closePayWifi="closePayWifi()"></payForWifi>
    </section>
</template>

<script>
    import CF from '../../../CF';
    import { mapMutations} from 'vuex';
    import payForWifi from '../payForWifi/index';
    import { createOrder,getGolds } from '../../../server/getServerData';
    export default {
        name: "twoSendPay",
        data(){
            return {
                isCanPay:true,
                payWifi:false
            }
        },
        props:['send_price'],
        methods:{
            ...mapMutations([
                'initGoldNum'
            ]),
            pay(type){
                if(this.isCanPay){
                    this.isCanPay = false;
                    let self = this;

                    if(type == 'pay_100'){
                        createOrder('create_order',{id:type},(data)=>{
                            if (data.status == 1) {
                                self.isCanPay = true;
                                CF.channel.pay(data['data'], function (isNoCbPay) {
                                    self.paySuccess(isNoCbPay, data);
                                })
                            } else {
                                self.isCanPay = true;
                            }
                        })
                    }else{
                        self.isCanPay = true;
                        this.$emit('sendDoll')
                    }
                }
            },

            paySuccess: function (isNoCbPay, data) {
                let self = this;
                if (isNoCbPay == 1) {
                    this.$router.push({name: 'payIframePage', params: {url: data.data}})
                } else {
                    getGolds('get_golds',(data)=>{
                        if (data.status == 1) {
                            self.initGoldNum(data.data.gold);
                        }
                    });
                    this.$emit('rechargeComplete');
                }
            },

            closeImg(){
                this.$emit('closePay');
            },
            closePayWifi(){
                this.payWifi = false;
            }
        },
        components:{
            payForWifi
        }
    }
</script>

<style lang="scss" scoped>
    .twoSend{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
        .toSendContent{
            background-color: white;
            width: 5.5rem;
            height: 6.5rem;
            border-radius: 0.2rem;
            position: relative;
            .toSendContentTop{
                font-size: 0.4rem;
                color: #ffe400;
                font-weight: bold;
                text-align: center;
                margin-top: -0.5rem;
            }
            .toSendContentTitle{
                font-size: 0.26rem;
                text-align: center;
                margin-top: 0.45rem;
            }
            .toSendImg{
                display: flex;
                justify-content: center;
                align-items: flex-end;
                margin-top: 0.5rem;
            }
            .toSendImg>img:nth-of-type(1){
                width: 2.67rem;
                height: 1.69rem;
            }
            .toSendImg>img:nth-of-type(2){
                width: 1.55rem;
            }
            .toSendTitle2{
                font-size: 0.24rem;
                text-align: center;
                line-height: 0.36rem;
                color: #323232;
                margin-top: 0.4rem;
            }
            .toSendTitle2>span{
                font-size: 0.36rem;
            }
            .toSendTitle2>span:nth-of-type(1){
                color: #ffe400;
            }
            .toSendTitle2>span:nth-of-type(3){
                color: #ff4b66;
            }
            .toSendBtn{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 0.6rem;
                margin-top: 0.3rem;
            }
            .toSendBtn>section:nth-of-type(1){
                width: 2.1rem;
                height: 0.8rem;
                text-align: center;
                font-size: .28rem;
                color: white;
                background: linear-gradient(to right,#389cf1,#1089ef);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0.4rem;
            }
            .toSendBtn>section:nth-of-type(2){
                width: 2.1rem;
                height: 0.8rem;
                background: linear-gradient(to right,#f19c38,#ed763a);
                text-align: center;
                font-size: .28rem;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0.4rem;
            }
            .toSendBtnTitle4{
                font-size: 0.2rem;
                color: #323232;
                text-align: center;
                position: absolute;
                width: 100%;
                bottom: 0.3rem;
            }
            .closeImg{
                position: absolute;
                right: 0;
                top: -0.6rem;
                width: 0.4rem;
            }
        }

    }
</style>