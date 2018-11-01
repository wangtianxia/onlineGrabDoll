<template>
    <div id="gameRoom" v-disabletouchmove>
        <!-- 返回上级页面 -->
        <!--v-show="gameLoad"-->
        <gameLoad v-show="gameLoad" :type="1"></gameLoad>

        <goBack @returnToIndex="returnToIndex"></goBack>

        <img class="gameRoomBg" src="static/image/newImage/gameBg.jpg" onclick="return false" alt="">
        <!-- 组件页面-弹窗 -->
        <component v-bind:is="show_tip" :title='title' :tip='tip' :type='true' v-on:close='tipClose'
                   v-on:ok='tipOk'></component>
        <!-- 组件页面-玩家状态组件 控制按钮-->
        <component v-on:noHaveGold='noHaveGold' @smallMoney="smallMoney" :is="which_to_show"
                   :dollPrice='doll_price'
                   :machineId='machine_id' :lTime='lTime' :isStart='isStart' :type="type"
                   :virtual="virtual" @pay2="pay2" @close="closeSmallMoney"></component>
        <!-- 围观头像 -->
        <div id='headList'>
            <section class="headListItem" v-for='(item,index) in players' :key="index">
                <img v-bind:src="item['face']" :onerror="defaultImg">
            </section>
            <div id='count'>{{count}}人围观</div>
        </div>

        <!-- 自己的操作提示 -->
        <div id='own_controll_tip' v-show="ownTip_isShow">您已上机,请开始抓娃娃</div>
        <!-- 他人的操作提示 -->
        <div id='other_controll_tip' v-show="otherTip_isShow">
            <img id='other_controll_Face' v-bind:src="other_controll_Face" :onerror="defaultImg">
            <section class="other_controll_tip_name"><span>{{other_controll_name}}</span> 正在抓娃娃</section>
        </div>

        <!-- 说明 -->
        <div id='rule'>
            <img src="static/image/rule.png" v-on:click='rulePage'>
        </div>

        <!-- 组件页面 抓取结果 -->
        <component v-on:noHaveGold='noHaveGold' @smallMoney="smallMoney" v-bind:is='show_result' :isSuccess=isSuccess
                   :doll_id="doll_id"
                   :machineId='machine_id' :type="type"></component>
        <!-- 组件页面 报修 抓球球-->
        <component :is='show_report' @closeSmallMoney='closeSmallMoney' @close="closeSmallMoney"></component>
        <!--首次进入游戏-->
        <firstStartGame v-if="fistStarGame" @hideFirstGame="hideFirstGame"></firstStartGame>
        <!--商品详情-->
        <productInfo v-if="type==1" :doll_id="doll_id" :isHasProductRedPoint="isHasProductRedPoint"
                     :doll_shows="doll_shows"></productInfo>
    </div>
</template>

<script>
    import CF from "../../router/ind.js";
    import goBack from '../components/return/index';
    import gameRoom_control from "./gameRoom_control.vue"; //上机状态组件
    import gameRoom_waitSee from "./gameRoom_waitSee.vue"; //开始游戏按钮充值等组件
    import gameRoom_result from "./gameRoom_result.vue";
    import firstStartGame from "../components/firstStarGame/index.vue";
    import tip from "./tip1.vue";
    import {mapMutations} from 'vuex';
    import gameLoad from '../components/gameLoad/index';
    import productInfo from '../components/productInfo/index';
    import { enterMachine } from '../../server/getServerData';

    //支付弹窗
    import first6Pay from '../components/smallMoney/first6Pay';
    import small_Money from '../components/smallMoney/index';

    import pay2 from './firstPayWindow'

    export default {
        data() {
            return {
                count: 0, //围观人数
                players: {},
                isStart: false, //是否已经开始游戏
                doll_price: "",
                machine_id: "",
                doll_id: "",
                which_to_show: "",
                show_result: "", //gameRoom_result
                other_controll_Face: "",
                other_controll_name: "",
                virtual: '',
                ownTip_isShow: false,
                otherTip_isShow: false,
                show_report: "",
                isSuccess: true,
                show_tip: "",
                title: "金币不足", //弹窗标题
                tip: "是否充值，获取金币后再试", //弹窗提示
                lTime: 30, //抓娃娃剩余倒计时,
                type: 1,
                fistStarGame: false,
                gateHost: "",
                gatePort: "",
                gameLoad: true,
                defaultImg: 'this.src="https://wwjcdn.like000.com/videoDollCatcher/head.jpg"',
                isHasProductRedPoint: false,
                doll_shows: false
            };
        },

        created: function () {
            //页面初始化
            this.machine_id = this.$route.params.machine_id;
            this.serverId = this.$route.params.serverId;
            this.doll_price = this.$route.params.doll_price;
            this.doll_id = this.$route.params.doll_id;
            this.type = this.$route.params.type;
            this.gateHost = this.$route.params.gateHost;
            this.gatePort = this.$route.params.gatePort;
            this.virtual = this.$route.params.virtual;
            this.init();
            if (!window.localStorage.getItem("fistStarGame") && this.type == 2) {
                this.fistStarGame = true;
                window.localStorage.setItem("fistStarGame", true);
            }

            if(CF.user.platform == '1001'){
                this.distribution = true
            }
        },

        methods: {
            ...mapMutations([
                'updateHoldDoll', 'reduceGoldNum'
            ]),

            //页面初始化
            init: function () {
                let self = this;
                //监听socket广播
                this.socketListener();
                //连接服务器
                this.connect(function (data) {
                    if (data.code < 0) {
                        self.returnToIndex();
                    }
                });

                //监听抓取结果 用来关闭结果弹窗
                CF.pubsub.$off("closeResultPage");
                CF.pubsub.$on("closeResultPage", function () {
                    self.show_result = "";
                });

                this.getProductInfo();
            },

            //获取商品详情
            getProductInfo() {
                enterMachine('enter_machine',this.doll_id,(data)=>{
                    if (data['status'] == 1) {
                        this.isHasProductRedPoint = data['data']['details'];
                        this.doll_shows = data['data']['doll_shows'];
                    }
                })
            },

            //连接服务器
            connect: function (callback) {
                let option = {};
                option.uid = CF.user.uid;
                option.user_name = CF.user.userName;
                option.serverId = this.serverId;
                option.user_face = CF.user.face;
                option.channel = CF.user._channel;

                CF.Connet.getConnector(this.gateHost, this.gatePort, option.uid,  (data)=> {
                    option.host = data.host;
                    option.port = data.port;
                    CF.Connet.joinGame(option, function (data) {
                        callback(data);
                    });
                });

            },

            //监听
            socketListener: function () {
                // body...
                var self = this;
                //房间错误 退出
                CF.Connet.addSocketListener("close", function (data) {
                    self.returnToIndex();
                    // var data = JSON.parse(data);
                    // console.log('close',data)
                });
                //房间初始信息
                CF.Connet.addSocketListener("room", function (data) {
                    // var data = JSON.parse(data);
                    // console.log('room',data)
                    self.roomInit(data);
                });
                //房间信息监听
                CF.Connet.addSocketListener("roomChange", function (data) {
                    // var data = JSON.parse(data);
                    self.roomChange(data);
                    // console.log('roomChange',data)
                });
                //断线提示
                CF.Connet.addSocketListener("heartbeat timeout", function (res) {
                    self.returnToIndex();
                    //console.log('断开连接')
                });

                CF.Connet.addSocketListener("join", function (data) {
                    //                console.log('join',data)
                    self.playersQueue.add(data.uid, data);
                    self.players = self.playersQueue.data;
                    self.count = data.count;
                });
                CF.Connet.addSocketListener("leave", function (data) {
                    //console.log('leave',data)
                    self.count = data.count;
                    if (self.count < 6) {
                        if (!self.playersQueue.del(data.uid)) {
                            self.playersQueue.delNo1();
                            self.playersQueue.len--;
                        }
                        self.players = self.playersQueue.data;
                    }
                });
            },
            roomInit: function (data) {
                //初始化成功显示视频
                let canvas = document.getElementById("video-canvas");
                canvas.style.display = "inline";
                let url = '';
                if (this.machine_id == '1001') {
                    url = "ws://" + data.ws;
                } else {
                    url = "wss://" + data.ws;
                }

                let player = this.player = new CF.JSMpeg.Player(url, {
                    canvas: canvas,
                    disableGl: false,
                    videoBufferSize: 1024 * 1024
                });

                //房间状态
                this.roomStatus(data);
                //人数 初始化
                this.count = data.count;
                var players = JSON.parse(data.players);
                this.playersQueue = new CF.Queue(6, players);
                this.players = this.playersQueue.data;
                this.gameLoad = false;
                canvas.style.display = "inline";
            },
            roomChange: function (data) {
                //房间状态
                this.roomStatus(data);
            },
            roomStatus: function (data) {

                if (data.status == 1) {
                    // console.log('1','空闲观望状态')
                    this.show_result = "";
                    this.isStart = false;
                    //空闲观望状态
                    this.which_to_show = "";
                    var self = this;
                    setTimeout(function () {
                        self.which_to_show = "player_waitSee";
                    }, 1);

                    this.ownTip_isShow = false;
                    this.otherTip_isShow = false;
                    //console.log('空闲观望状态')
                }
                if (data.status == 2) {
                    //上机成功
                    // this.which_to_show='';
                    this.ownTip_isShow = false;
                    this.otherTip_isShow = false;
                    this.isStart = true;
                    //console.log('有人上机')
                    if (CF.user.uid == data.hostUid) {
                        //是本人
                        this.ownTip_isShow = true;
                    } else {
                        this.otherTip_isShow = true;
                        this.other_controll_Face = data.hostFace;
                        this.other_controll_name = data.hostName;
                        this.which_to_show = "player_waitSee"; //不是本人
                    }

                    // console.log('2','上机成功');
                }
                if (data.status == 3) {
                    //开始游戏 显示操控按钮
                    // console.log('3','开始操作');
                    this.ownTip_isShow = true;
                    this.otherTip_isShow = false;
                    this.isStart = true;
                    this.which_to_show = "player_control";
                    this.lTime = data.end_time - Math.floor(new Date() / 1000);
                    if (data.hostCost) {
                        this.reduceGoldNum(data.hostCost);
                    }
                }
                if (data.status == 4) {
                    // console.log('4','结算');
                    //结算
                    this.which_to_show = "";
                    this.isStart = true;
                    if (data.result == 0) {
                        //没抓到
                        this.isSuccess = false;
                    } else {
                        this.isSuccess = true;
                        this.updateHoldDoll(true);
                    }
                    this.show_result = "gameRoom_result";
                }
                if (data.status == -2) {
                    //支付失败
                    //console.log('支付失败'+data.result);//2 余额不足<=0 报错
                }
            },
            returnToIndex: function () {
                //返回列表首页
                this.which_to_show = "";
                this.show_result = "";
                this.ownTip_isShow = false;
                this.otherTip_isShow = false;
                this.players = {};
                this.$router.go(-1);
            },
            rulePage: function () {
                this.$router.push({name: "rulePage", params: {type: this.type}});
            },

            closeSmallMoney: function () {
                this.show_report = "";
            },
            //断开连接
            disConnect: function () {
                // body...
                CF.Connet.removeSocketListener("close");
                CF.Connet.removeSocketListener("room");
                CF.Connet.removeSocketListener("roomChange");
                CF.Connet.removeSocketListener("join");
                CF.Connet.removeSocketListener("leave");
                CF.Connet.socketDisconnect();
            },
            tipOk: function () {
                // console.log('点击ok')
                this.show_tip = "";
                this.$router.push({name: "rechargePage", params: {}});
            },
            tipClose: function () {
                //console.log('点击close')
                this.show_tip = "";
            },
            noHaveGold: function () {
                this.show_tip = "tip";
            },
            hideFirstGame() {
                this.fistStarGame = false;
            },
            smallMoney(type) {
                if(type == 2){
                    this.show_report = 'small_Money';
                }else if(type == 3){
                    this.show_report = 'first6Pay';
                }
            },
            //2元支付
            pay2(){
                this.show_report = 'pay2'
            }
        },

        components: {
            player_control: gameRoom_control, //上机状态组件
            player_waitSee: gameRoom_waitSee, //开始游戏按钮充值等组件
            gameRoom_result: gameRoom_result,
            tip: tip,
            small_Money,
            firstStartGame,
            goBack,
            gameLoad,
            productInfo,
            first6Pay,
            pay2
        },

        watch: {
            $route(to, from) {
                if (to.name == "gameRoomPage" && from.name == "listPage") {
                    this.machine_id = this.$route.params.machine_id;
                    this.serverId = this.$route.params.serverId;
                    this.doll_price = this.$route.params.doll_price;
                    this.doll_id = this.$route.params.doll_id;
                    this.type = this.$route.params.type;
                    this.gateHost = this.$route.params.gateHost;
                    this.gatePort = this.$route.params.gatePort;
                    this.virtual = this.$route.params.virtual;
                }
                //如果跳转页面到本页面 --页面初始化
                if (to.name == "gameRoomPage" || to.path =='/gameRoomPage') {
                    this.init();
                    this.gameLoad = true;
                }

                //从本页面跳走--页面断开处理
                if (from.name == "gameRoomPage" || from.path == '/gameRoom') {
                    let canvas = document.getElementById("video-canvas");
                    canvas.style.display = "none";
                    this.show_report = "";
                    this.gameLoad = false;
                    this.disConnect();
                    if (this.player){
                        this.player.destroy();
                        this.player = null;
                    }
                }
            }
        }
    };
</script>

<style scoped>
    #gameRoom {
        position: absolute;
        height: 100%;
        width: 100%;
    }

    #count {
        width: 1.2rem;
        height: 0.46rem;
        border-radius: 0.23rem;
        background: linear-gradient(to right, rgb(241, 156, 56), rgb(237, 118, 58));
        color: #ffffff;
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.46rem;
        margin-right: 0.2rem;
    }

    #own_controll_tip {
        position: absolute;
        width: 4.12rem;
        height: 0.6rem;
        background: rgba(0, 0, 0, .6);
        border-radius: 0.3rem; /*目标元素四角都.为4rem的圆角*/
        text-align: center;
        color: #ffffff;
        font-size: 0.34rem;
        line-height: 0.6rem;
        top: 1.8rem;
        left: 1.69rem;
        z-index: 10;
    }

    #other_controll_tip {
        position: fixed;
        max-width: 7rem;
        height: 0.84rem;
        background: rgba(0, 0, 0, .6);
        padding: 0 6px;
        border-radius: 0.42rem; /*目标元素四角都.为4rem的圆角*/
        text-align: center;
        color: #ffffff;
        font-size: 0.3rem;
        top: 1.8rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }

    .other_controll_tip_name {
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    .other_controll_tip_name > span {
        color: #3ac6fa;
    }

    #other_controll_Face {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        position: relative;
    }

    ul {
        margin-right: 1.6rem;
        margin-top: 0.32rem;
        padding: 0;
        text-align: right;
    }

    #headList {
        position: absolute;
        width: 100%;
        z-index: 5;
        height: 0.93rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .headListItem {
        width: 0.53rem;
        height: 0.53rem;
        position: relative;
        margin-right: 0.1rem;
    }

    .headListItem > img {
        width: 0.52rem;
        height: 0.52rem;
        border-radius: 50%;
        position: absolute;
    }

    #rule {
        position: absolute;
        display: flex;
        right: 0.2rem;
        top: 0.95rem;
        z-index: 10;
    }

    #rule img {
        width: 1.4rem;
        height: 0.36rem;
    }

    #report {
        position: absolute;
        display: flex;
        left: 0.3rem;
        top: 9rem;
    }

    #report img {
        width: 0.64rem;
        height: 0.64rem;
    }

    .showBall {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 1000;
        width: 90%;
        margin: 0 0.4rem;
    }

    .gameRoomBg {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
    }

    .virtualSection {
        font-size: 0.3rem;
        width: 1.5rem;
        background-color: #3ac6fa;
        color: white;
        height: 66%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 1px 0 6px;
        border-radius: 1rem;
    }
</style>