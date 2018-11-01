<template>
    <!--6元首充-->
    <section class="first6Pay">
        <section class="first6PayContent">
            <img class="bg" src="static/image/notice/pay2.png" onclick="return false" alt="">
            <section class="btnPay" @click="pay6Gold"></section>
            <img class="closeImg" @click="closeImg" src="static/image/close.png" alt="">
        </section>
        <!--<payForWifi  v-if="payWifi" :money="money" :goods_id="goods_id" :gold="gold" @closePayWifi="closePayWifi()"></payForWifi>-->
    </section>
</template>

<script>
    import CF from '../../../CF';
    // import payForWifi from '../payForWifi/index';
    import { createOrder,getGolds } from '../../../server/getServerData';
    import { mapMutations} from 'vuex';
    export default {
        name: "first6Pay",
        data(){
            return {
                isCanPay:true,
                payWifi:false
            }
        },
        components:{
            // payForWifi
        },
        methods:{
            ...mapMutations([
                'initGoldNum'
            ]),
            closeImg(){
                this.$emit('closeSmallMoney');
            },

            closePayWifi(){
                this.payWifi = false;
            },

            pay6Gold(){
                if(this.isCanPay){
                    this.isCanPay = false;
                    let self = this;
                    createOrder('create_order',{id:'pay_2'},(data)=>{
                        if (data.status == 1) {
                            self.isCanPay = true;
                            CF.channel.pay(data['data'], function (isNoCbPay) {
                                self.paySuccess(isNoCbPay, data);
                            })
                        } else {
                            self.isCanPay = true;
                            self.tip = '支付暂时维护中';
                            self.showPaySucc = 'tip';
                        }
                    });

                }
            },

            paySuccess: function (isNoCbPay, data) {
                let self = this;
                if (isNoCbPay == 1) {
                    if(CF.user.platform == '1009'){
                        this.$router.push({name: 'payIframePage', params: {url: data['data']['info']}})
                    }else{
                        this.$router.push({name: 'payIframePage', params: {url: data.data}})
                    }
                } else {
                    //获取金币
                    getGolds('get_golds',(data)=>{
                        if (data.status == 1) {
                            self.initGoldNum(data.data.gold);
                        }
                    });
                    this.$emit('closeSmallMoney');
                }
            },
        }
    }
</script>

<style scoped>
    .first6Pay{
        width: 100%;
        height: 100%;
        background-color: rgba(50,50,50,0.7);
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        font-size: 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1000;
    }
    .first6PayContent{
        position: relative;
    }
    .bg{
        width: 5.6rem;
        height: 7.28rem;
    }

    .btnPay{
        width: 3.5rem;
        height: 0.8rem;
        position: absolute;
        left: 1rem;
        top: 5.7rem;
    }
    .closeImg{
        position: absolute;
        right: 0;
        top: 0;
        width: 0.4rem;
    }
</style>