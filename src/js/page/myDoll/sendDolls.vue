<template>
    <!-- 发送娃娃页面 -->
    <div id="sendDolls">
        <!-- 返回上级页面 -->
        <goBack @returnToIndex="returnBack"></goBack>
        <!-- 组件页面-弹窗 -->
        <component v-bind:is="show_tip" :title='title' :tip='tip' :type='type' v-on:close='tipClose'
                   v-on:ok='tipOk'></component>
        <div id='list'>
            <ul>
                <li v-for="item in items" v-on:click='clickItem(item)'>
                    <section class="listItem">
                        <img id='doll' v-bind:src="'https://wwjcdn.like000.com/wwjDollImg/'+item.doll_id+'.jpg'"/>
                        <section>
                            <div id='dollName'>{{item.doll_name}}</div>
                            <div id='timer'>{{item.timer}}</div>
                        </section>
                    </section>
                    <img class="chooseImg" v-bind:src="'static/image/choose_'+item.choose+'.png'">
                </li>
            </ul>
        </div>
        <section class="allInfo">
            <section class="fillItem">确认填写收货人信息</section>
            <div>
                <input id='sendName' v-model="send_name" placeholder="请输入收货人姓名">
                <div class='line'></div>
            </div>
            <div>
                <input v-model="send_phone" placeholder="请输入收货人手机号">
                <div class='line'></div>
            </div>
            <div>
                <textarea v-model="send_address" placeholder="请输入收货人地址（省、市、区县、街道、楼号或房号等）"></textarea>
                <div class='line'></div>
            </div>
            <div style="height:1.10rem;width:100%;background:#ffffff">
                <div style="position:absolute;font-size:.30rem;margin-top:.19rem;">邮费</div>
                <div style="position:absolute;font-size:.30rem;margin-top:.60rem;">任意2件以上(含2件)娃娃可以包邮哦亲~
                </div>
                <div v-show='send_free' style="position:absolute;right:.30rem;font-size:.30rem;margin-top:.38rem">包邮
                </div>
                <div v-show='!send_free'
                     style="position:absolute;right:.50rem;font-size:.30rem;margin-top:.38rem;color:#ff8400"><span
                        style="color:#000000"></span>{{send_price}}元
                </div>
                <div class='line' style="margin-top:1.10rem;position:absolute"></div>
            </div>
            <div style="height:1.10rem;width:100%;background:#ffffff;margin-bottom: 1rem;">
                <div id='ok' @click='send'>{{okTip}}</div>
            </div>
        </section>

        <!-- 支付弹窗 -->
        <component :is="show_rechargeTip" @closePay='closePay' @rechargeComplete="rechargeComplete" @sendDoll="sendDoll" :send_price="send_price">
        </component>

    </div>


</template>

<script>
    import CF from '../../../router/ind.js'
    import tip from '../tip1.vue'
    import rechargeTip from '../rechargeTip.vue';
    import goBack from '../../components/return/index';
    import twoSendPay from '../../components/smallMoney/twoSendPay'

    export default {
        data: function () {
            return {
                _id: '',
                okTip: '',
                send_name: '',
                send_phone: '',
                send_address: '',
                send_price: '',
                send_free: false,
                choose_count: 1,
                data: {}, //支付弹窗信息
                items: [],
                show_rechargeTip: '',
                show_tip: '',
                title: '金币不足',  //弹窗标题
                tip: '是否充值，获取金币后再试',//弹窗提示
                type: true,//弹窗类型true双按钮flase双按钮
                isCanPay: true
            }
        },
        created: function () {
            var self = this;
            self.init();
        },
        watch: {
            '$route'(to, from) {
                if (to.name == 'sendDollsPage')
                    this.init();
            }
        },
        methods: {
            init: function () {
                this._id = this.$route.params._id;//选中娃娃的_id
                this.getData();
            },
            //请求列表页
            getData: function () {
                var self = this;
                (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'deposit_doll_list', {
                    user_id: CF.user.uid,
                    sign: CF.M5B({user_id: CF.user.uid})
                }, function (data) {
                    if (data.status == 1) {
                        self.items = data.data.list;
                        self.send_price = data.data.mail_price;
                        self.send_name = data.data.address_info.username;
                        self.send_phone = data.data.address_info.phone_no;
                        self.send_address = data.data.address_info.address;
                        self.choose_count = 1;
                        self.send_free = false;
                        self.okTip = '确定并支付';
                        self.setItemsData();
                    }
                });
            },

            setItemsData: function () {
                let self = this;
                for (let i = 0; i < self.items.length; i++) {
                    if (self.items[i]._id == self._id) {
                        self.$set(self.items[i], 'choose', true)
                    } else {
                        self.$set(self.items[i], 'choose', false)
                    }
                    self.items[i].timer = self.getTimeStr(self.items[i].timer)
                }
            },

            returnBack: function () {
                this.$router.go(-1)
            },
            clickItem: function (data) {
                data.choose = !data.choose;

                if (data.choose) {
                    this.choose_count++;
                } else {
                    this.choose_count--;
                }

                if (this.choose_count >= 2) {
                    this.send_free = true;
                    this.okTip = '确定'
                } else {
                    this.send_free = false;
                    this.okTip = '确定并支付'
                }
            },
            getChooseListId: function () {
                let arr = [];
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].choose) {
                        arr.push(this.items[i]._id);
                    }
                }
                return arr;
            },
            getTimeStr: function (timer) {
                function add0(m) {
                    return m < 10 ? '0' + m : m
                }

                let time = new Date(timer * 1000);
                let y = time.getFullYear();
                let m = time.getMonth() + 1;
                let d = time.getDate();
                let h = time.getHours();
                let mm = time.getMinutes();
                let s = time.getSeconds();
                return y + '/' + add0(m) + '/' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
            },
            tipClose: function () {
                this.show_tip = '';
            },
            tipOk: function (data) {
                this.show_tip = '';

                if (data == '支付成功') {//
                    this.returnBack();
                }
                if(CF.user.uid == '3172338'){
                    // alert('有此用户')
                }

                if (CF.user.visiter) {
                    CF.Vue.prototype.$login({
                        isClose: true
                    });
                    return;
                }

                if (data == '确认邮寄地址，申请发货后地址不能更改') {
                    this.goRecharge();
                }
            },
            send: function () {
                let self = this;
                let bag_ids = this.bag_ids = this.getChooseListId();
                if (bag_ids.length <= 0) {
                    self.type = false;
                    self.title = '提示';
                    self.tip = '至少选择一个娃娃发货';
                    self.show_tip = 'tip';
                    return;
                }

                if (this.send_phone == '' || this.send_name == '' || this.send_address == '') {
                    self.show_tip = 'tip';
                    self.type = false;
                    self.title = '提示';
                    self.tip = '收货人信息不得为空';
                    return;
                }

                let re = /^1\d{10}$/;
                if (re.test(this.send_phone)) {
                } else {
                    self.type = false;
                    self.title = '提示';
                    self.tip = '手机号填的有误，请查看手机号';
                    self.show_tip = 'tip';
                    return;
                }

                // 确认发货提示
                self.type = true;
                self.title = '提示';
                self.tip = '确认邮寄地址，申请发货后地址不能更改';
                self.show_tip = 'tip';

            },

            goRecharge: function () {
                if (this.isCanPay) {
                    this.isCanPay = false;

                    console.log('this.bag_ids.length',this.bag_ids.length)



                    if(this.bag_ids.length == 1){
                        this.show_rechargeTip = 'twoSendPay';
                        this.isCanPay = true;
                        return ;
                    }

                    this.title = '提示';
                    this.type = true;
                    this.tip = '正在调起支付';
                    this.show_tip = 'tip';
                    this.sendDoll()
                }
            },

            sendDoll(){

                let self = this;
                (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'send_out_doll', {
                    user_id: CF.user.uid,
                    bag_ids: JSON.stringify(self.bag_ids),
                    username: encodeURIComponent(self.send_name),
                    phone_no: encodeURIComponent(self.send_phone),
                    address: encodeURIComponent(self.send_address),
                    isIosNewVerSion: CF.isIosNewVerSion,
                    isIos: CF.TOOLS.isIos(),
                    sign: CF.M5B({
                        user_id: CF.user.uid,
                        bag_ids: JSON.stringify(self.bag_ids),
                        username: encodeURIComponent(self.send_name),
                        phone_no: encodeURIComponent(self.send_phone),
                        address: encodeURIComponent(self.send_address),
                        isIos: CF.TOOLS.isIos(),
                        isIosNewVerSion: CF.isIosNewVerSion
                    })
                }, function (data) {
                    if (data.status == 1) {
                        self.isCanPay = true;
                        if (data.data) {
                            //支付回来弹窗
                            if (self.bag_ids.length == 1) {
                                CF.channel.pay(data.data, function (isNoCbPay) {
                                    self.paySuccess(isNoCbPay, data);
                                })
                            }
                        } else {
                            self.returnBack();
                        }
                    } else {
                        self.isCanPay = true;
                        self.type = false;
                        self.title = '提示';
                        self.tip = '充值暂时维护中';
                        self.show_tip = 'tip';
                    }
                });
            },

            paySuccess: function (isNoCbPay, data) {
                var self = this;
                if (isNoCbPay) {
                    this.$router.push({name: 'payIframePage', params: {url: data.data}});
                } else {
                    self.show_tip = 'tip';
                    self.type = false;
                    self.title = '提示';
                    self.tip = '支付成功';
                }
            },
            rechargeComplete: function () {
                this.show_rechargeTip = '';
                this.returnBack();
            },
            closePay: function () {
                this.show_rechargeTip = '';
            }
        },
        components: {
            tip: tip,
            rechargeTip: rechargeTip,
            goBack,
            twoSendPay
        }
    }


</script>


<style scoped>

    #sendDolls {
        height:100%;
        width: 100%;
        -webkit-overflow-scrolling: touch;
    }

    #list {
        background-color: #f7f7f7;
        padding: 0.5rem 1rem 0.4rem 1rem;
    }

    ul {
        margin: 0;
        text-align: left;
        padding: 0;
    }

    .line {
        height: 1px;
        background-color: #f0f0f0;
    }

    #sendDolls ul li {
        height: 1.50rem;
        list-style: none;
        position: relative;
        overflow: hidden;
        text-align: center;
        background: #ffffff;
        margin-bottom: 0.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #doll {
        width: 1.50rem;
        height: 1.25rem;
    }

    #dollName {
        font-size: .32rem;
        color: #323232;
    }

    #timer {
        font-size: .26rem;
        color: #888;
        margin-top: 0.2rem;
    }

    .listItem {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.3rem;
    }

    .listItem > section {
        text-align: left;
        margin-left: 0.2rem;
        line-height: 1;
    }

    .chooseImg {
        width: 0.44rem;
        height: 0.44rem;
        margin-right: 0.3rem;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #cccccc;
        opacity: 1;
        font-size: .30rem;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #cccccc;
        opacity: 1;
        font-size: .30rem;
    }

    ::-ms-input-placeholder {
        color: #cccccc;
        opacity: 1;
        font-size: .30rem;
    }

    ::-webkit-input-placeholder {
        color: #cccccc;
        opacity: 1;
        font-size: .30rem;
    }

    input {
        height: 1.10rem;
        font-size: .30rem;
        border: none;
        background: #ffffff;
        outline: none;
        width: 100%;
    }

    textarea {
        width: 100%;
        height: 1.20rem;
        font-size: .30rem;
        border: none;
        background: #ffffff;
        padding-top: .30rem;
        outline: none;
        resize: none;
        -webkit-text-size-adjust: none;
    }

    #ok {
        background: #ff4f97;
        border-radius: 1rem;
        text-align: center;
        color: #ffffff;
        height: 0.9rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.32rem;
        background: linear-gradient(to right, rgb(241, 156, 56), rgb(237, 118, 58));
        margin: 0.6rem 0;
    }

    .fillItem {
        height: 0.8rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 0.3rem;
        color: #323232;
        position: relative;
    }

    .fillItem::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #eee;
    }

    .allInfo {
        padding: 0 .5rem;
        font-size: 0;
    }

</style>