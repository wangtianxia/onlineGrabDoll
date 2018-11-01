<template>
    <div id="gameRoom_waitSee">
        <div class="firstPay" v-show='first_pay'>
            <router-link :to="{name: 'rechargePage', params: {}}" tag='img' src='static/image/first_pay.png'>
            </router-link>
        </div>
        <div id='startBtn'>
            <section v-on:click='startBtnClick' style="display: inline-block;">
                <img src="static/image/game/startBtn.png" style='width:3.11rem;height:1.3rem'>
                <span class="dollPrice dollPrice1">{{dollPrice}}币/次</span>
            </section>
        </div>
        <div class="left_coin">
            <section class="witeSeeCoin">
                <img src="static/image/newImage/coin.png" style="width:.28rem;height:.28rem;">
                <span class="witeSeeCoin_s">{{goldNum}}</span>
            </section>
            <img class="left_coin_img" src='static/image/game/recharge.png' style="width:1.43rem;" @click="buy" alt="">
        </div>

    </div>
</template>

<script>
import CF from '../../../router/ind.js';
import { mapState } from 'vuex';
export default {
    data () {
        return {
            first_pay:CF.user.first_pay,
            isClick:false

        }
    },
    props:['dollPrice'],
    created:function(){
        // this.dollPrice=this.$route.params.dollPrice;
        // this.machine_id=this.$route.params.machine_id;
    },
    computed:{
        ...mapState(['goldNum'])
    },
    methods:{
        startBtnClick:function(){

            var self=this;
            if(!this.isClick){
                self.isClick=true;

                (new CF.Ajax()).sendJSON(CF.gameInfo.host+'start_game_virtual',{
                    user_id:CF.user.uid,
                    price:self.dollPrice,
                    sign:CF.M5B({user_id:CF.user.uid,price:self.dollPrice})
                },function(data){
                    self.isClick=false;
                    if(data.status==1){
                        self.$emit('haveGold');
                    }else{
                        if (data['data'] && data['data']['recharge_pop']) {
                            self.$emit('smallMoney');
                        } else {
                            self.$emit('noHaveGold');
                        }
                    }
                });
            }
        },
        buy() {
            this.$router.push({name: 'rechargePage'});
        }
    }

}
</script>

<style scoped>
    #gameRoom_waitSee {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2.5rem;
        z-index: 100;
        display: flex;
        justify-content:center;
        align-items: flex-end;
        left: 0;
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
    .left_coin>img{
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
    .firstPay>img{
        width: 1.35rem;
        height: 1.1rem;
    }
</style>