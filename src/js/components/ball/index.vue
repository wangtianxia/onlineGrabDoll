<template>
    <!-- <transition name='showBallContent'>
    </transition> -->
    <section class="exchangeContent bg">
        <section class="ballNum">
            <section>可兑换礼品列表</section>
            <section>拥有球球{{ball||0}}个</section>
        </section>
        <section class="exchangeList">
            <section class="exchangeListItem" v-for="(item,index) in ballExchangeArr" :key="index">
                <img class="exchangeItemImg" :src="'https://wwjcdn.like000.com/wwjDollImg/exchangeItem/'+item.id+'.jpg'"/>
                <section class="exchangeItemDes">
                    <section class="exchangeItemDesLeft">
                        <p class="exchangeItemDesName">{{item.name}}</p>
                        <section class="exchangeItemInfo">
                            {{item.desc}}
                        </section>
                    </section>
                    <section class="exchangeItemDesRight">
                        <section class="exchangeItemBtn" @click="exchange(item)">
                            {{item.price}}球兑换
                        </section>
                    </section>
                </section>
            </section>
        </section>
        <tip :title="title" :tip="tip" :type="type" @close="close" @ok="ok" v-show="showTip" ></tip>
        <tip2 :title="title2" :tip="tip2" :type="type" @close="closeTip2" @ok="okTip2" v-show="showTip2"></tip2>
    </section>
</template>

<script>

    import tip from '../../page/tip1.vue';
    import tip2 from '../../page/tip1.vue';
    import CF from '../../../router/ind.js'
    import {mapMutations, mapState} from 'vuex'

    export default {
        data() {
            return {
                title: "温馨提示",
                tip: '已经没有球球了',
                title2: '温馨提示',
                tip2: '是否兑换球球',
                showTip: false,
                showTip2: false,
                isSucess: false,
                isExchange: false,
                type: true,
                goods_id: ''
            }
        },
        computed: {
            ...mapState([
                'ball'
            ])
        },
        props: ['ballExchangeArr'],

        methods: {
            exchange(item) {
                this.showTip2 = true;
                this.tip2 = '是否兑换' + item.name;

                this.isExchange = true;
                this.type = true;
                this.goods_id = item.id;
            },

            ...mapMutations([
                'updataBall'
            ]),
            close() {
                this.showTip = false;
            },
            ok() {
                this.showTip = false;
                if (this.isSucess) {
                    this.$router.push('myDoll');
                }
            },
            closeTip2() {
                this.showTip2 = false;
            },
            okTip2() {
                this.showTip2 = false;
                var self = this;
                (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'exchange', {
                    user_id: CF.user.uid,
                    goods_id: self.goods_id,
                    sign: CF.M5B({user_id: CF.user.uid, goods_id: self.goods_id})
                }, function (data) {
                    if (data['status'] == 1) {
                        self.showTip = true;
                        self.type = true;
                        self.tip = '兑换成功,去背包查看';
                        self.updataBall(data['data']['ball']);
                        self.isSucess = true;
                    }
                    if (data['status'] == 2) {
                        self.showTip = true;
                        self.tip = '球球数量不足';
                        self.isSucess = false;
                        self.type = false;
                    }
                });
            }
        },
        components: {
            tip, tip2
        },
        beforeDestroy() {
            this.showTip = false;
        }
    }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
    }

    .exchangeContent {
        left: 0;
        top: 0;
        width: 94.6%;
        padding: 0 0.2rem;
    }

    .exchangeList {
        margin-top: 1px;
    }

    .exchangeListItem {
        background-color: white;
        font-size: 0;
        padding: 0.2rem;
        margin-bottom: 1px;
        border-radius: 3px;
    }

    .exchangeListItem > img {
        width: 100%;
        height: 2.5rem;
        border-radius: .1rem;
        margin-bottom: 0.2rem;
    }

    .exchangeItemDes {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
    }

    .exchangeItemDesLeft {
        width: 100%;
        line-height: 1;
    }

    .exchangeItemDesRight {
        height: 100%;
    }

    .exchangeItemBtn {
        width: 1.7rem;
        height: 0.6rem;
        font-size: 0.3rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-left: 0.3rem;
        color: white;
        background: linear-gradient(to right, #f19c38, #ed763a);
        border-radius: 1rem;
    }
    .exchangeItemDes{
        width: 100%;
    }

    .exchangeItemDesName {
        font-size: 0.32rem;
        color: black;
        margin-bottom: 0.16rem;
    }

    .exchangeItemInfo {
        font-size: 0.26rem;
        color: #888888;
        line-height: 0.32rem;
    }


    .ballNum {
        height: 0.6rem;
        background-color: white;
        margin-top: 0.1rem;
        font-size: 0.3rem;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 3px;
        padding:0 0.2rem;
    }
    .ballNum>section:nth-of-type(1){
        color: #888;
    }
    .ballNum>section:nth-of-type(2){
        color: #323232;
    }
</style>
