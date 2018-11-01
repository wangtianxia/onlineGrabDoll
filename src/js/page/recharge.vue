<template>
    <!-- 充值页面 -->
    <div id="reChargePage">
        <!-- 返回上级页面 -->
        <goBack @returnToIndex="returnBack"></goBack>
        <img id="useCashCoupon" v-on:click='useCashCoupon' v-show='isShowCashCoupon' src="static/image/cashCoupon.png"
             alt="">

        <div id='title'>
            <section class="title_goldInfoSec">
                <section>余额</section>
                <section>
                    {{goldNum}}
                </section>
                <section>
                    金币
                </section>
            </section>
        </div>

        <section class="payList">
            <section class="payListContent">
                <section class="payItemSection" v-for="(item,index) in payItem" :key="index" @click.stop.prevent='payCoin(item)'>
                    <img v-if="index == 0"  class="payListGold" :src="'static/image/recharge/pay_'+item.money+'.png'">
                    <img v-if="index == 1"  class="payListGold2" :src="'static/image/recharge/pay_'+item.money+'.png'">
                    <img v-if="index == 2"  class="payListGold3" :src="'static/image/recharge/pay_'+item.money+'.png'">

                    <img v-if="item.img == 1"  class="payListGold4" :src="'static/image/recharge/kt.png'">
                    <img v-if="item.img == 1"  class="ktRibbon" src="static/image/recharge/ktRibbon.png"/>
                    <section v-if="item.img == 1" class="ktRibbonw">送KT公仔1只</section>

                    <img v-if="item.img == 2"  class="payListGold5" :src="'static/image/recharge/leopard.png'">
                    <img v-if="item.img == 2"  class="leopardRibbon" src="static/image/recharge/leopardRibbon.png"/>
                    <section v-if="item.img == 2" class="ktRibbonw">送大号粉红豹</section>

                    <img v-if="item.img == 3"  class="payListGold6" :src="'static/image/recharge/bear.png'">
                    <img v-if="item.img == 3"  class="bearRibbon" :src="'static/image/recharge/bearRibbon.png'">
                    <section v-if="item.img == 3" class="ktRibbonw">送北极熊抱枕</section>



                    <img v-if="item.img == 4"  class="module1" :src="'static/image/distribution/module/1.png'">
                    <!--<img v-if="item.img == 4"  class="bearRibbon" :src="'static/image/recharge/bearRibbon.png'">-->

                    <img class="payType" v-if="item.type" :src="'static/image/recharge/pay_'+item.type+'.png'" alt="">
                    <section class="payItemSectionInfo">充{{item.money|action}}金币</section>
                    <section class="payItemSectionInfoSend">送 {{item.give_away}} 金币</section>
                    <section v-if="item.img != 4" id='gold'>¥ {{item.money}}</section>
                    <section v-if="item.img == 4" id='gold'>¥ {{item.money}}（成为合伙人）</section>
                </section>
            </section>
        </section>


        <div id='qq'>
            <section v-if="cs==1">
                <span >客服QQ：2660866818</span>
            </section>
            <section v-else-if="cs==2">
                <p>官方客服：微信添加【248VIP俱乐部】公众号</p>
            </section>
            <section v-else-if="cs==3">
                <span >客服QQ：2074198326</span>
            </section>
            <section v-else v-on:click.stop.prevent='serviceBtnClick'>
                有问题找客服
            </section>
        </div>

        <div id='recharge_tip'>
            <div style="margin-left: 0.2rem;line-height: 0.8rem;font-weight: bold;">商城小贴士</div>
            <div style="margin-left: 0.2rem;">充值偶尔有延迟情况，请耐心等待或重新进入游戏</div>
            <div style="margin-left: 0.2rem;">若充值遇到问题请联系官方客服</div>
        </div>


        <!-- 支付成功回调弹窗-->
        <component v-bind:is="showPaySucc" :title='title' :tip='tip' :type='type' v-on:close='tipClose'
                   v-on:ok='tipOk' @tipCloseCoupon="tipCloseCoupon" ></component>

        <div id='serviceWindow' v-show='serviceShow' v-on:click='closeService'>
            <section>
                <img :src=customerService @click.stop.prevent="closeService">
                <p class="customerTip" v-html="tipWords"></p>
            </section>

        </div>

        <payForWifi v-if="payWifi" :money="money" :goods_id="goods_id" :gold="gold"
                    @closePayWifi="closePayWifi()"></payForWifi>
    </div>
</template>

<script>
    import goBack from '../components/return/index'
    import CF from '../../router/ind.js'
    import rechargeTip from './rechargeTip.vue'
    import tip from './tip1.vue';
    import {mapState, mapMutations} from 'vuex';
    import payForWifi from '../components/payForWifi/index';
    import { createOrder , payList ,getGolds} from '../../server/getServerData';
    import rechargeCoupon from '../components/wxShare/rechage'

    export default {
        data: function () {
            return {
                serviceShow: false,
                show_tip: '',
                showPaySucc: '',
                type: false,
                tip: '支付成功',
                title: '支付通知',
                isShowCashCoupon: false,
                isClick: false,
                items: [],
                data: {},//支付弹窗数据
                isZw: false, //指头游戏
                customerService: '',
                payWifi: false,
                money: 0,
                goods_id: "",
                isCanPay: true,
                payItem: [],
                tipWords:''
            }
        },

        computed: {
            ...mapState(['goldNum']),

            cs(){
                if(CF.user.platform == 1003){
                    //1758
                    return 1
                }else if(CF.user.platform == 1007){
                    //248
                    return 2
                }else if(CF.user.platform == 1013){
                    //9G游戏
                    return 3
                }else {
                    return 4
                }
            }
        },

        filters:{
            action(money){
                return money*10;
            }
        },

        created: function () {
            var self = this;
            self.getListData();

            //cutie支付回调通知
            self.cutiePayCb();
            if (CF.user.platform == '1007') {
                this.isZw = true;
            }

            if(this.$route.params.id == 1){
                this.showPaySucc = 'rechargeCoupon'
            }


            if(CF.user.platform == 1008){
                this.customerService = 'static/image/cs1008.jpg';
                this.tipWords = ''
            }else {
                this.customerService = `static/image/erweima${CF.user.subscription}.jpg`;
                let w = '';
                if(CF.user.subscription == 1){
                    w = '心跳游戏'
                }else if(CF.user.subscription == 2){
                    w = '心跳娃娃乐园'
                }else{
                    w = '心跳趣玩'
                }
                this.tipWords = `按住扫一扫，关注“${w}”后，直接</br>发送您的问题，客服会尽快为您解答`
            }
        },



        watch: {
            '$route'(to, from) {
                this.itemData = {};
                if (from.name == 'payIframePage') {
                    this.$router.push({name: 'listPage', params: {}});
                    return;
                }

                //如果跳转页面不是本页面 不重新加载数据
                if (to.name != 'rechargePage') {
                    return
                }
                //数据更新
                this.getListData();
            }
        },
        methods: {
            ...mapMutations([
                'initGoldNum'
            ]),
            //请求列表页
            getListData: function () {
                payList('pay_list',(data)=>{
                    this.items = data.data.list;
                    this.isShowCashCoupon = data.data.isShowCashCoupon;
                    this.payItem = data['data']['list'];
                });
            },
            cutiePayCb: function () {
                if (this.$route.params.isCtPay) {
                    this.tip = '支付结束';
                    this.showPaySucc = 'tip';
                }
            },
            serviceBtnClick: function () {
                this.serviceShow = true;
            },
            closeService: function () {
                this.serviceShow = false;
            },
            returnBack: function () {
                this.$router.go(-1)
            },
            payCoin: function (itemData) {

                //WIFI支付
                if (CF.user.platform == 1009) {
                    this.payWifi = true;
                    this.goods_id = itemData.id;
                    this.money = itemData.money;
                    this.gold = itemData.gold;
                } else {
                    let self = this;
                    if (self.isCanPay) {
                        self.isCanPay = false;
                        self.tip = '正在调起支付';
                        self.title = '支付中';
                        self.showPaySucc = 'tip';
                        //创建订单
                        createOrder('create_order',itemData,(data)=>{
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
                }
            },

            paySuccess: function (isNoCbPay, data) { //支付成功 弹窗通知
                var self = this;
                if (isNoCbPay == 1) {
                    this.$router.push({name: 'payIframePage', params: {url: data.data}})
                } else {
                    self.tip = '支付成功';
                    self.showPaySucc = 'tip';
                }
            },

            resetGold: function () {
                this.show_tip = '';

                getGolds('get_golds',(data)=>{
                    if (data.status == 1) {
                        this.initGoldNum(data.data.gold);
                        this.getListData();
                    }
                });
            },
            tipOk: function () {
                this.showPaySucc = '';
                this.resetGold();
            },
            tipClose: function () {

            },
            tipCloseCoupon(){
                this.showPaySucc = '';
            },
            useCashCoupon: function () {
                var self = this;
                self.$router.push({name: 'cashCouponListPage', params: {}})
            },
            closePayWifi() {
                this.payWifi = false
            }
        },
        components: {
            rechargeTip: rechargeTip,
            tip: tip,
            goBack,
            payForWifi,
            rechargeCoupon
        }
    }
</script>


<style lang="scss" scoped>

    #reChargePage {
        position: absolute;
        width: 100%;
        background: #eee;
        min-height: 100%;
        max-height: none;
    }

    #useCashCoupon {
        position: absolute;
        top: .20rem;
        right: .30rem;
        color: #ec4776;
        font-size: .30rem;
        width: 0.78rem;
        height: 0.78rem;
        z-index: 1;
    }

    #title {
        width: 7.2rem;
        height: 1.16rem;
        border-radius: .1rem;
        position: relative;
        color: #6e6e6e;
        font-size: .26rem;
        line-height: 1rem;
        text-align: center;
        margin-left: .125rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #qq {
        height: 1.2rem;
        border-radius: .1rem;
        line-height: 1.2rem;
        font-size: .3rem;
        color: #888;
        text-align: center;
        position: relative;
        padding: 0 0.3rem;
        margin-top: 0.1rem;
    }

    #qq>section{
        background-color: white;
        border-radius: 0.1rem;
    }


    #serviceWindow {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    #serviceWindow >section{
        text-align: center;
    }
    #serviceWindow >section > img {
        width: 50%;
    }
    #serviceWindow>section>p{
        font-size: 0.3rem;
        text-align: center;
        color: white;
    }


    ul {
        margin: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        padding: 0.1rem;
        background-color: #eee;
    }

    #firstPayList ul li {
        width: 3.54rem;
        height: 2.70rem;
        list-style: none;
        position: relative;
        margin-bottom: .20rem;
        text-align: center;
    }

    #firstPayList ul li span {
        font-size: 0.3rem;
        display: block;
        color: #323232;
        position: absolute;
        width: 100%;
        bottom: 0.1rem;
        line-height: 0.3rem;
    }

    #list ul li {
        width: 2.3rem;
        height: 3.3rem;
        list-style: none;
        position: relative;
        float: left;
        margin-bottom: .20rem;
        overflow: hidden;
        text-align: center;
        background: #ffffff;
        border-radius: 0.1rem;
    }

    #gold {
        width: 100%;
        height: .52rem;
        font-size: .30rem;
        color: black;
        line-height: .52rem;
        text-align: center;
        margin-top: .20rem;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 0 0 0.1rem 0.1rem;
    }
    #gold::after{
        content: '';
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        background-color: #eee;
        position: absolute;
    }


    #recharge_tip {
        width: 6.9rem;
        height: 1.8rem;
        background: #ffffff;
        font-size: 0.26rem;
        line-height: 0.46rem;
        left: 0.3rem;
        position: relative;
        margin-bottom: .3rem;
        border-radius: 0.1rem;
        margin-top: 0.4rem;
    }
    .payList{
        margin-top: 0.2rem;
    }

    .payListContent {
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        background-color: #eee;
        padding: 0 0.3rem;
    }

    .payItemSection {
        width: 3.3rem;
        height: 2.2rem;
        text-align: center;
        position: relative;
        background-color: white;
        margin-bottom: 0.3rem;
        border-radius: 0.1rem;
    }

    .payListGold {
        width: 0.99rem;
        position: absolute;
        left: 0.3rem;
        top: 44%;
        transform: translateY(-50%);
    }
    .payListGold2{
        width: 1.01rem;
        position: absolute;
        left: 0.3rem;
        top: 44%;
        transform: translateY(-50%);
    }
    .payListGold3{
        width: 0.95rem;
        position: absolute;
        left: 0.3rem;
        top: 44%;
        transform: translateY(-50%);
    }
    .payListGold4{
        width: 0.84rem;
        position: absolute;
        left: 0.3rem;
        top: 42%;
        transform: translateY(-50%);
    }
    .payListGold5{
        width: 1.56rem;
        position: absolute;
        left: 0.1rem;
        top: 0.1rem;
    }
    .payListGold6{
        width: 1.5rem;
        position: absolute;
        left: 0;
        top: 0.2rem;
    }
    .module1{
        width: 1rem;
        left: 0.2rem;
        top: 0.1rem;
        position: absolute;
    }

    .ktRibbon{
        position: absolute;
        width: 1.26rem;
        height: 0.3rem;
        top: 1.38rem;
        left: 0.1rem;
    }

    .leopardRibbon{
        position: absolute;
        width: 1.6rem;
        top: 1.3rem;
        left: 0.1rem;
    }

    .bearRibbon{
        position: absolute;
        width: 1.5rem;
        top: 1.3rem;
        left: 0.1rem;
    }

    .ktRibbonw{
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0.01rem;
        color: #ff8f11;
        position: absolute;
        right: 0.21rem;
        top: 1.3rem;
    }

    .payItemSectionInfo {
        position: absolute;
        top: 0.39rem;
        right: .2rem;
        font-size: .30rem;
    }

    .payItemSectionInfoSend {
        color: #ff8f11;
        font-size: .24rem;
        position: absolute;
        top: 0.87rem;
        right: 0.2rem;
        font-weight: bold;
    }
    .title_goldInfo{
        font-size: 0.26rem;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title_goldInfoSec{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.76rem;
        background-image: linear-gradient(to right, #f19c38, #ed763a);
        border-radius: 1rem;
        padding: 0 0.5rem;
    }
    .title_goldInfoSec>section:nth-of-type(1),.title_goldInfoSec>section:nth-of-type(3){
        color: black;
        font-size:0.26rem;
    }
    .title_goldInfoSec>section:nth-of-type(2){
        color: #f7ff21;
        font-size: 0.42rem;
        margin: 0 0.1rem;
        font-weight: bold;
    }
    .payType{
        position: absolute;
        width: 0.8rem;
        left: -0.2rem;
        top: -0.2rem;
    }

</style>