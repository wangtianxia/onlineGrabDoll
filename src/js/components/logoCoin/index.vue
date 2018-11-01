<template>
    <section class="logoCoinContent">

        <img id='appName' src="static/image/newImage/logo.png">

        <div class="topGoldNum" v-on:click='goCharge'>
            <img class="coin" src="static/image/newImage/coin.png" alt="">
            <p class="coinNum">{{goldNum}}</p>
            <img class="payadd" src="static/image/newImage/payadd.png" alt="">
        </div>
        <div class="dollNotice" v-if="isHoldDoll" v-on:click='goMyDollList'>
            <img src="static/image/notice/getDoll.png" alt="">
        </div>
    </section>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: "logoCoin",

        props: ['goldNum', 'doll_notice'],

        computed: {
            ...mapState([
                'isHoldDoll'
            ])
        },

        methods: {
            ...mapMutations([
                'updateHoldDoll'
            ]),

            goCharge: function () {
                this.$router.push({name: 'rechargePage', params: {}})
            },

            goMyDollList: function () {
                this.updateHoldDoll(false);
                this.$router.push({name: 'myDollPage', params: {}})
            },
        }
    }
</script>

<style scoped>
    .logoCoinContent {
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 0;
        z-index: 100;
        width: 100%;
    }

    .topGoldNum {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        align-content: center;
        color: white;
        border-radius: 1rem;
        height: 0.35rem;
        margin-right: 0.3rem;
    }
    .coin{
        width: 0.47rem;
        margin-right: -0.3rem;
        z-index: 100;
    }
    .payadd{
        width: 0.4rem;
        margin-left: -0.2rem;
        z-index: 100;
    }
    .coinNum{
        font-size: 0.26rem;
        background-color: rgba(0,0,0,0.5);
        padding:0 0.4rem;
        border-radius: 1rem;
    }



    .topGoldNumTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .topGoldNumbottom {
        width: 100%;
        text-align: center;
        font-size: 0.26rem;
        line-height: 0.26rem;
    }

    #appName {
        width: 1.82rem;
        margin-left: 0.3rem;
    }

    #myDoll {
        width: 0.83rem;
    }

    .dollNotice {
        position: absolute;
        right: 0.9rem;
        top: 3rem;
        width: 3rem;
        height: 1.84rem;
        z-index: 100;
        animation: scaleAc 1s 1 ease-in-out;
    }

    .dollNotice > img {
        width: 3rem;
    }

    @keyframes scaleAc {
        from {
            transform: scale(0.2, 0.2);
            transform-origin: right top;
        }
        to {
            transform: scale(1, 1);
            transform-origin: right top;
        }
    }
</style>