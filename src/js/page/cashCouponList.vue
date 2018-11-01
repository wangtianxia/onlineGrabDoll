<template>
    <div id="cashCouponList">

        <!-- 返回上级页面 -->
        <goBack @returnToIndex="returnBack"></goBack>
        <section class="cashTitle">代金券</section>
        <section class="cashCouponTop">
            <img src="static/image/redReward/bannerTip.jpg" onclick="return false" alt="">
        </section>
        <!-- 列表 -->
        <div id="list">
            <ul v-if="items.length!=0" v-for="item in items">
                <li>
                    <div>
                        <component v-bind:is="showCash" :data='item' v-on:close='rechargeComp'
                                   @showTip="showTip"></component>
                    </div>
                </li>
            </ul>
            <section v-if="items.length == 0">
                <section class="notCash">
                    <img class="notCashImg" src="static/image/redReward/notCash.png" alt="">
                    <p class="notCashWord">当前没有可用的优惠券</p>
                </section>
            </section>
        </div>
        <component v-bind:is="showPaySucc" :title='title' :tip='tip' :type='type' v-on:close='tipClose'
                   v-on:ok='tipOk'></component>

    </div>
</template>

<script>
    import tip from './tip1.vue';
    import CF from '../../router/ind.js'
    import cashCoupon from './cashCoupon.vue';
    import goBack from '../components/return/index';
    import {mapMutations} from 'vuex';
    import {couponList, getGolds} from '../../server/getServerData'

    export default {
        data() {
            return {
                showCash: 'cashCoupon',
                items: [],
                showPaySucc: '',
                tip: '',
                title: '支付通知',
                type: 0
            }
        },
        created: function () {
            this.showCash = 'cashCoupon';
            this.init();
        },
        watch: {
            '$route'(to, from) {
                //如果跳转页面不是本页面 不重新加载数据
                if (to.name == "cashCouponListPage") {
                    this.init();
                }
            }
        },
        methods: {
            ...mapMutations([
                'initGoldNum'
            ]),

            init: function () {
                couponList('coupon_list', (data) => {
                    if (data.status == 1) {
                        if (data.data) {
                            this.items = data.data.list;
                        } else {
                            this.returnBack();
                        }
                    }
                })
            },
            returnBack: function () {
                this.$router.go(-1)
            },
            rechargeComp: function () {
                this.updateGold();
                this.init();
            },
            updateGold: function () {
                getGolds('get_golds', (data) => {
                    if (data.status == 1) {
                        this.initGoldNum(data.data.gold)
                    }
                })
            },
            showTip() {
                this.tip = '正在调起支付';
                this.showPaySucc = 'tip';
            },
            tipClose() {
                this.showPaySucc = '';
            },
            tipOk() {
                this.showPaySucc = '';
            }
        },
        components: {
            cashCoupon: cashCoupon,
            goBack,
            tip
        }
    }
</script>

<style scoped>
    .cashTitle {
        font-size: .36rem;
        text-align: center;
        color: #ed783a;
        margin-top: 0.34rem;
        font-weight: bold;
        line-height: 1;
    }

    .cashCouponTop {
        font-size: 0;
        line-height: 1;
    }

    .cashCouponTop > img {
        position: relative;
        width: 100%;
        height: 2rem;
        margin-top: 0.3rem;
    }

    #cashCouponList {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #f7f7f7;
    }

    #list {
        position: relative;
        margin-top: 0.4rem;
    }

    ul {
        margin: 0;
        padding: 0;
        text-align: left;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        background-color: #f7f7f7;
    }

    #list ul li {
        list-style: none;
        position: relative;
        overflow: visible;
        text-align: center;
    }

    .notCash {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        align-content: center;
        margin-top: 3rem;
    }

    .notCashImg {
        width: 1.67rem;
    }

    .notCashWord {
        font-size: 0.3rem;
        color: #888;
        margin: 0;
        padding: 0;
        width: 100%;
        text-align: center;
        margin-top: 0.2rem;
    }
</style>