<template>
    <div id="myDoll_state">
        <!-- 返回上级页面 -->
        <goBack @returnToIndex="returnBack"></goBack>
        <div id="doll_Info">
            <section class="doll_info_top" v-if="item.doll_id">
                <img id='doll' v-bind:src="'https://wwjcdn.like000.com/wwjDollImg/'+item.doll_id+'.jpg'"/>
                <section class="doll_info_top_right">
                    <span id='name'>{{item.doll_name}}</span>
                    <span id='time'>{{item.timer}}</span>
                    <span id='tip1'>数量 1</span>
                </section>
            </section>

            <section class="myDollStatus">
                <span id='check' v-show="check_isShow">寄存中 <span class="checkTime">(剩余{{Math.floor(item.elapsed_time/24)}}天{{Math.floor(item.elapsed_time%24)}}时)</span></span>
                <span id='exchange' v-show="change_isShow">已兑币</span>
                <span id='pack' v-show="pack_isShow">打包中</span>
                <span id='delivery' v-show="delivery_isShow">已发货</span>
                <section class="myDollStatusText" v-show="check_isShow">寄存期内未发货，则自动兑换{{item.doll_refund_price}}金币</section>
            </section>
            <section class="empty"></section>
        </div>


        <!-- 组件页面- 下半部分(寄存中)-->
        <component  v-bind:is='show_result' :doll_id="item._id"
                   :doll_refund_price="item.doll_refund_price"></component>
        <!-- 组件页面- 下半部分(打包中)-->
        <component v-bind:is='show_result_2' :data='item'></component>
        <!-- 组件页面- 下半部分(已发货)-->
        <component v-bind:is='show_result_3' :address="item.address" :username="item.username"
                   :express="item.ex_company" :number="item.ex_num" :isShowDollShow='item.is_show'
                   :bag_id='item._id'></component>
        <!-- 组件页面- 下半部分(已兑币)-->
        <component v-bind:is='show_result_4' :doll_refund_price="item.doll_refund_price"></component>
    </div>
</template>

<script>
    import CF from '../../../router/ind.js'
    import myDoll_state_1 from './myDoll_state_1.vue'
    import myDoll_state_2 from './myDoll_state_2.vue'
    import myDoll_state_3 from './myDoll_state_3.vue'
    import myDoll_state_4 from './myDoll_state_4.vue'
    import goBack from '../../components/return/index';
    import {dollInfo} from '../../../server/getServerData'


    export default {
        data() {
            return {
                time: 2,  //res.count
                show_result: '',
                show_result_2: '',
                show_result_3: '',
                show_result_4: '',
                check_isShow: false,    //是否展示寄存状态
                change_isShow: false,   //已兑币
                delivery_isShow: false, //已发货
                pack_isShow: false,     //打包中
                item:{},
                show_tip: '',
                title: '兑换金币',  //弹窗标题
                tip: '请确定是否要将娃娃兑换成' + this.doll_refund_price + '金币？',//弹窗提示
                type: true,//弹窗类型true双按钮flase双按钮

            }
        },
        //props:['isSuccess','doll_id'],
        created: function () {
            window.scrollTo(0, 0);
            this.init();
        },

        methods: {
            init: function () {
                this.doll_id = this.$route.params.doll_id;
                dollInfo('doll_info',this.doll_id,(res)=>{
                    if(res['status']<0)return;
                    this.item = res.data;
                    this.item.elapsed_time = parseInt(this.item.elapsed_time);
                    this.item.timer = this.getTime(this.item.timer);
                    this.send_Status(res.data.status);
                    this.tip = '失去该娃娃,获得' + this.item.doll_refund_price + '金币';
                })
            },
            send_gift: function () { //点击发货
                var self = this;
                self.$router.replace({path: `sendDollsPage/${self.item.doll_id}`});
            },
            returnBack: function () {
                console.log('返回');
                this.$router.go(-1);
            },
            getTime: function (timer) {
                function add0(m) {
                    return m < 10 ? '0' + m : m
                }

                var time = new Date(timer * 1000);
                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
            },
            send_Status: function (type) {  //0寄存 1打包中  2发货 3已兑币
                var self = this;
                if (type == 0) {
                    self.check_isShow = true;   //是否展示寄存状态
                    self.change_isShow = false;    //已兑币
                    self.delivery_isShow = false;
                    self.pack_isShow = false;
                    self.show_result = 'myDoll_state_1';
                    self.show_result_2 = '';
                    self.show_result_3 = '';
                    self.show_result_4 = '';
                }
                if (type == 1) {
                    self.check_isShow = false;   //是否展示寄存状态
                    self.change_isShow = false;    //已兑币
                    self.delivery_isShow = false;
                    self.pack_isShow = true;
                    self.show_result = '';
                    self.show_result_2 = 'myDoll_state_2';
                    self.show_result_3 = '';
                    self.show_result_4 = '';
                }
                if (type == 2) {
                    self.check_isShow = false;
                    self.change_isShow = false;
                    self.delivery_isShow = true;
                    self.pack_isShow = false;
                    self.show_result = '';
                    self.show_result_2 = '';
                    self.show_result_3 = 'myDoll_state_3';
                    self.show_result_4 = '';
                }
                if (type == 3) {

                    self.check_isShow = false;
                    self.change_isShow = true;
                    self.delivery_isShow = false;
                    self.pack_isShow = false;
                    self.show_result = '';
                    self.show_result_2 = '';
                    self.show_result_3 = '';
                    self.show_result_4 = 'myDoll_state_4';
                }
            }

        },
        components: {
            myDoll_state_1: myDoll_state_1,
            myDoll_state_2: myDoll_state_2,
            myDoll_state_3: myDoll_state_3,
            myDoll_state_4: myDoll_state_4,
            goBack
        }


    }
</script>

<style scoped>
    #myDoll_state {
        position: absolute;
        height: 100%;
        width: 100%;
    }



    .doll_info_top{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f7f7f7;
        padding: 0.4rem 0;
    }

    #doll {
        width: 2.18rem;
        height: 1.8rem;
    }

    #name {
        font-weight: bold;
        font-size: .3rem;
        color: #323232;
    }

    #time {
        font-size: .26rem;
        color: #888;
        margin: 0.2rem 0;
    }

    #tip1 {
        font-size: .30rem;
        color: #323232;
    }

    .doll_info_top_right{
        font-size: 0;
        width: 37%;
        margin-left: 0.3rem;
    }
    .doll_info_top_right>span{
        width: 100%;
        display: inline-block;
    }


    .myDollStatus{
        padding: 0.3rem 0.5rem;
        font-size: 0;
        line-height: 1;
    }


    .checkTime{
        font-size: 0.3rem;
        color: #ff8f11;
    }

    .myDollStatusText{
        font-size: 0.26rem;
        color: #cfcfcf;
        margin-top: 0.2rem;
    }

    #pack {
        font-size: .30rem;
        color: #ff8400;
    }

    #delivery {
        font-size: .30rem;
        color: #ff8400;
    }
    #check {
        font-size: .30rem;
        color: #979797;
    }

    #exchange {
        font-size: .30rem;
        color: #50bfff;
    }

    .empty{
        width: 100%;
        height: .1rem;
        background-color: #f7f7f7;
    }
    #doll_Info {
        width: 100%;
        background: #ffffff;
        border-radius: .10rem;
        font-size: 0;
    }


</style>