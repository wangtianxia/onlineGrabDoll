<template>
    <!-- 娃娃列表 -->
    <div id="dollList">
        <logoCoin :goldNum="goldNum" v-if="!distribution"></logoCoin>

        <banner v-if="show_banner" :listImg='listImg' v-on:placardBanner='bannerShowPlacard'
                   @invite="invite" @dollTable="dollTableBanner"></banner>

        <homeBannerDistribution v-if="distribution" ></homeBannerDistribution>

        <selectItem v-if="showSelect" @holdDoll="holdDoll" @holdBall="holdBall"></selectItem>
        <!--红包-->
        <div class="redPacket" v-on:click='redClick' v-show='redNum>0'>
            <section>
                <img class="img_red" src="static/image/newImage/red.png"/>
                <span class="p1">有</span><span class="p2">{{redNum}}</span><span class="p3">个红包<span
                    class="linQu">点击领取></span></span>
            </section>
        </div>

        <div id='list'>
            <holdDollTable v-if="isShowTable" @dollTable="dollTable" :changeItem="changeItem" @holdBall="holdBall"></holdDollTable>
            <div class="listContent" v-if="isDoll">
                <!--<img v-if="distribution" class="listContentDis" src="static/image/distribution/disTip.png" @click.stop.prevet="goDistribution"/>-->
                <section class="dollListAll">
                    <div v-for="(item,index) in items" class="listItem" :key="index">
                        <div class="itemInfo" v-on:click.prevent='itemClick(item)'>
                            <img id='doll' v-bind:src="'https://wwjcdn.like000.com/wwjDollImg/'+item.doll_id+'.jpg'"/>
                            <span id='dollName'>{{item.doll_name}}</span>
                            <img id='status' v-bind:src="'static/image/newImage/status_'+item.status+'.png'"/>
                            <img id='doll_status' v-if="item.doll_status == 1"
                                 v-bind:src="'static/image/doll_status_'+item.doll_status+'.png'"/>
                            <img id='doll_status1' v-else
                                 v-bind:src="'static/image/doll_status_'+item.doll_status+'.png'"/>
                            <img id='doll_random' v-if="item.doll_random == 0 || item.doll_random == 1 || item.doll_random == 2" v-bind:src="'static/image/doll_random_'+item.doll_random+'.png'"/>
                            <img class="discountImg" v-if="discount" src="static/image/discount.png" alt="">
                            <span id='doll_price'>{{item.doll_price}}币/次</span>
                        </div>
                    </div>
                </section>
            </div>
            <div v-else>
                <ballItem :ballArr="ballArr"></ballItem>
                <exchange :ballExchangeArr="ballExchangeArr"></exchange>
            </div>
        </div>
        <div id="temp">没有更多内容了</div>

        <div style="width:100%;height:1rem">
        </div>

        <!-- 娃娃秀入口 -->
        <div id='dollShowRoute' :style="styleObj">
            <section style="font-size:0">
                <img v-show='isShowFollow_1758' src="static/image/guanzhu.png" v-on:click='clickfollow'
                     style="height: 1.24rem;margin-bottom: 0.2rem">
                <img class="img2" v-if="isInvited" :src="inviteImg" @click="invite"/>
                <img class="img2" v-if='signIn' :src="signImg" @click="focus"/>
                <img class="img2" v-if="focus248" src="static/image/auxiliary/focus_248.png" @click="focus"/>
            </section>
        </div>

        <!-- 推送push流组件 -->
        <component v-bind:is="push_tip" :pushData='pushData' v-on:pushOk='pushCompelete'></component>
        <!-- 打开红包组件 -->
        <component v-bind:is='openRed' v-on:close='redPackClose'></component>
        <!-- 公告组件 -->
        <component v-bind:is='showPlacard' :placardData='placardData' v-on:close='placardClose'></component>
        <!-- 签到/新用户/首充弹窗组件 -->
        <transition name="fade_1">
            <component v-bind:is="show_tip" v-on:ok='tipOk' v-on:close='tipClose' v-on:changeGold='changeGold'
                       :qqChannel="qq_channel" :isNewUser="isNewUser"></component>
        </transition>
        <!--不能重复登录显示-->
        <oldUser v-show="old_user" @closeOldUser="closeOldUser"></oldUser>
        <!--邀请-->
        <img class="focusAndInviteShow" v-if="focusAndInviteShow" src="static/image/auxiliary/coin.gif"
             @click="focusAndInviteClick" alt="">
        <component :is='common' @closeComment="closeComment" @invite="invite" @hideInvite="hideInvite"
                   :sign1758Text="sign1758Text"></component>

        <gameLoad v-if="showGameLoad" :type="0"></gameLoad>

        <transition name="fadeTop">
            <img class="toTop" v-show="isToTap" src="static/image/newImage/top.png" @click="toTop" alt="">
        </transition>


        <!--<img v-if="distribution" class="homeDistribution" @click="goDistribution" src="static/image/distribution/distriBution.png" alt="">-->
    </div>
</template>

<script>

    import CF from '../../router/ind.js'
    import logoCoin from '../components/logoCoin/index';
    import holdDollTable from '../components/selectItem/holdDollTable';
    import sign from './sign.vue'
    import newUserTip from './newUserTip.vue'
    import pushTip from './pushTip.vue'
    import firstPayWindow from './firstPayWindow.vue'
    import openRedPacket from './openRedPacket.vue'
    import banner from './banner.vue'
    import placard from './placard.vue'
    import oldUser from '../components/oldUser/index.vue';
    import wxShareView from '../components/wxShare/index.vue';
    import selectItem from '../components/selectItem/index.vue';
    import { mapState,mapMutations } from 'vuex';
    import ballItem from '../components/ball/ballItem.vue';
    import exchange from '../components/ball/index.vue';
    import focusAndInvite from '../components/firstStarGame/followAndInivite';
    import sign1758 from '../components/firstStarGame/1758Sign'
    import bannerData from '../../banner.json';
    import gameLoad from '../components/gameLoad/index';
    import { grantAuth,initUser,enterRoom,catchList,machineList,getGolds,behavior_statistics} from '../../server/getServerData';
    import homeBannerDistribution from '../components/distribution/index'

    export default {

        data: function () {
            return {
                listImg: [],
                showPlacard: '',
                placardData: {},
                isShowFollow_1758: false,
                is1758: false,
                show_banner: false,
                openRed: '',
                redNum: 0,
                isNewUser: 0,
                timer: '',
                pushData: '', //push流 对象 非数组{}
                guid: '',
                serverId: '', //进入房间的id
                which_to_show: '',
                items: '',
                show_tip: '',
                push_tip: '',
                pushTimer: 0,
                updatePushTime: 30, //获取首页推送定时刷新时间
                updateTime: 15,//数据列表定时刷新15秒
                is_pop: false, //弹出首冲弹窗
                qq_channel: false,   //弹窗是10元还是20元 默认20.
                old_user: false,     //是否是新用户
                isDoll: true,     //用来切换时抓娃娃还是抓球,
                ballArr: [],      //抓球数据
                ballExchangeArr: [],
                styleObj: {
                    top: window.screen.height - 255 + 'px',
                },
                focusAndInviteShow: false,
                common: '',
                isInvited: false,
                signIn: false,    //有没有签到
                focus248: false,  //248关注
                sign1758Text: "",
                showSelect: false,
                isShowTable: false,
                tableType: 0,
                isToTap: false,
                changeItem:false,
                inviteImg:'static/image/auxiliary/invited.png',
                signImg:"static/image/auxiliary/focus.png",
                discount:false,
                showGameLoad:true,
                distribution:false
            }
        },

        computed:{
            ...mapState([
                'goldNum','promoterInfoData'
            ])
        },

        mounted: function () {
            let self = this;
            var context = CF.TOOLS.getUrlAttribute('id') || this.$route.params.id;
            var channel = CF.TOOLS.getUrlAttribute('channel');
            CF.user.platform = CF.TOOLS.getUrlAttribute('platform') || 1002; //qq 微信
            CF.isIosNewVerSion = false;

            window.isNewVerSion = function (params) {
                if (params) {
                    CF.isIosNewVerSion = true;
                } else {
                    CF.isIosNewVerSion = false;
                }
            };

            if (channel.indexOf('_') != -1) {
                CF.user._channel = channel.split('_')[0];
            } else {
                CF.user._channel = channel;
            }

            if (channel == 'EA5A486C712A91E48443CD802642223D') { //1758
                this.is1758 = true;
            }

            //有token支付回调url判断
            var token = CF.TOOLS.getUrlAttribute('token');
            if (token) {
                var arr = token.split('_');
                context = arr[0];
                channel = arr[1];
                CF.user.platform = arr[2];
                CF.user._channel = channel;
                this.cutiePayCb = arr[3];
            }
            //授权判断
            grantAuth('grant_auth',context,(data)=>{
                if (data && data.status == 1) {
                   self.init(context);
                }else if(data && data.status == 2){
                   window.location = data.data.url;
                } else {
                   window.location = 'https://h5wwj.xintiao100.com/production';
                }
            });


            if (CF.TOOLS.getUrlAttribute('old_user') && !CF.user.old_user) {
                CF.user.old_user = CF.TOOLS.getUrlAttribute('old_user');
                this.old_user = true;
            }

            //分享成功通知
            self.shareSuccess();
            //1758关注关闭通知
            self.close1758follow();
            //1758分享关闭通知
            self.close1758Share();
        },

        methods: {

            ...mapMutations([
                'updataBall','initGoldNum','updateGoldNum','initUser','initPayMoney','initPayMoney20','changeSelectTable'
            ]),

            //初始化
            init: function (context) {
                document.removeEventListener('scroll',()=>{
                    document.addEventListener('scroll',()=>{
                        if (document.documentElement.scrollTop >= 1000 || window.pageYOffset >= 1000 || document.body.scrollTop >= 1000) {
                            this.isToTap = true;
                        } else {
                            this.isToTap = false;
                        }
                    },false);
                },false);

                document.addEventListener('scroll',()=>{
                    if (document.documentElement.scrollTop >= 1000 || window.pageYOffset >= 1000 || document.body.scrollTop >= 1000) {
                        this.isToTap = true;
                    } else {
                        this.isToTap = false;
                    }
                },false);

                let self = this;
                //获取用户信息
                initUser('init_user',context,(data)=>{

                    this.initUser(data['data']);

                    CF.user.userName = data.data.user_name || '游客';
                    CF.user.face = data.data.head_img && (data.data.head_img.indexOf('http:') != -1 || data.data.head_img.indexOf('https:') != -1) ? data.data.head_img : 'https://wwjcdn.like000.com/videoDollCatcher/head.jpg';
                    CF.user.uid = data.data.guid;
                    CF.user._id = context;
                    CF.user.redNum = data.data.red_packet || 0;
                    CF.user.pay_channel = data.data.pay_channel;//url
                    CF.user.gid = data.data.gid;
                    CF.user.appKey = data.data.appKey;
                    CF.user.hlmy_gw = data.data.hlmy_gw;
                    CF.user.hlmy_gp = data.data.hlmy_gp;

                    CF.user.isFollow_1758 = data.data.is_follow;
                    CF.user.visiter = data.data.is_visiter;
                    CF.user.qq_channel = data.data.qq_channel;
                    CF.user.follow_url = data.data.follow_url;

                    CF.user.subscription = data.data.subscription||1;
                    CF.user.call = data.data.call;//话费
                    CF.user.ball = data.data.ball;
                    CF.user.openid = data.data.openid || '';
                    CF.user.virtual = data.data.virtual || '';


                    self.redNum = CF.user.redNum;
                    self.isNewUser = data.data.isNewUser;
                    CF.user.isNewUser = data.data.isNewUser || '';


                    self.is_pop = data.data.is_pop;
                    self.qq_channel = data.data.qq_channel;
                    self.notice = data.data.notice;
                    self.showSelect = true;
                    self.discount = data.data.discount;
                    CF.user.pay_activity = data.data.pay_activity;


                    self.updataBall(data.data.ball);
                    //第一次 通过 切换label 去掉yong
                    // self.getListData('', 1);
                    self.getListData('', 2);
                    self.getPushData();
                    self.isShowTable = true;
                    self.initGoldNum(data.data.gold);

                    CF.user.follow = data.data.show_follow;
                    CF.user.share = data.data.show_share;

                    self.initPayMoney(data.data.first_pay_2);
                    self.initPayMoney20(data.data.first_pay);

                    CF.user.is_wifi_visitor = data.data.is_wifi_visitor;//wifi 游客
                    CF.GameSDK.setUserId( data.data.guid);

                    if (CF.user.platform == 1007) {
                        if(data.data._248_follow){
                            self.focus248 = true;
                        }
                        if (data.data.show_share) {
                            self.isInvited = true;
                        }
                    } else if (CF.user.platform == 1001) {
                        if (data.data.show_follow && !data.data.sign_in) {
                            CF.user.sign_in = true;

                            self.signIn = false
                        }
                        if (data.data.show_share) {
                            self.isInvited = false;
                        }
                        if ((data.data.show_follow && !CF.user.sign_in) || data.data.show_share) {
                            self.focusAndInviteShow = true
                        }
                    } else {
                        if (data.data.show_follow) {
                            if(CF.user.platform == '1013'){
                                this.signImg = 'static/image/auxiliary/focus_248.png'
                            }
                            self.signIn = true
                        }

                        if (data.data.show_share) {
                            self.isInvited = true;
                        }
                    }

                    //初始化平台
                    CF.channel.init(function () {
                        //1758wei关注
                        self.follow_1758();
                    });

                    //展示公告
                    self.showNotice();
                    //设置banner img
                    self.setBannerImg();
                    //cutie 支付判断
                    self.cutiePay();
                    self.getBallExchangeList();

                    self.dispathRouter();

                    //检测是否有违规用户
                    if(data.data['seal_user'] && data.data['seal_user'].length>0){
                        self.checkViolation(data.data['seal_user'])
                    }

                });

                //获取最新金币
                CF.pubsub.$on('updateGold', function () {
                    self.updateGold()
                });
            },

            checkViolation(arr){
                let uid = CF.user.uid;
                if(arr.indexOf(uid)!=-1){
                    CF.Vue.prototype.$violation()
                }
            },

            //去顶部
            toTop() {
                if(!this.InterVal2){
                    this.InterVal2 = setInterval(()=> {
                        if(window.pageYOffset <= 0){
                            clearInterval(this.InterVal2);
                        }
                        document.body.scrollTop -= 100;
                        setTimeout(()=>{
                            clearInterval(this.InterVal2);
                            this.InterVal2 = null;
                        },3000)
                    }, 5);
                }
            },
            //显示抓娃娃
            holdDoll() {
                this.isDoll = true;
            },

            //显示抓球球
            holdBall() {
                this.isDoll = false;
            },

            //关注和邀请点击
            focusAndInviteClick() {
                behavior_statistics('behavior_statistics','share_button',()=>{});
                this.$router.push('/coinList')
            },

            //关闭公共组件
            closeComment() {
                this.common = '';
            },

            // 获取兑换列表
            getBallExchangeList() {
                enterRoom('enter_room',(list)=>{
                    this.ballExchangeArr = list;
                })
            },

            //关闭分享TIp
            closeShareTip: function () {
                this.showShareTip = false;
            },

            //cuti 支付
            cutiePay: function () {
                let self = this;
                if (this.cutiePayCb)
                    this.$router.push({name: 'rechargePage', params: {isCtPay: true}})
            },

            //758分享
            share_1758: function () {
                let self = this;
                CF.channel.share()
            },

            //关闭1758关注
            close1758follow: function () {

                var self = this;
                CF.pubsub.$on('close1758_follow', function () {
                    self.isShowFollow_1758 = false;
                });
                //1758签到
                CF.pubsub.$on('show1758_sign', function () {
                    let sign_in = CF.TOOLS.getUrlAttribute('sign_in');
                    let signData = sign_in.split('_');
                    if (signData && signData[0] == 1) {
                        self.common = 'sign1758';
                        self.sign1758Text = '签到成功 金币+' + signData[1];
                    }
                    if (signData && signData[0] == 2) {
                        self.common = 'sign1758';
                        self.sign1758Text = '今日已签到过了';
                    }
                });
            },

            //关闭1758分享
            close1758Share: function () {
                var self = this;
                if(CF.user.platform != '1003'){
                    return;
                }
                self.isInvited = true;

                CF.pubsub.$on('close1758_share', function () {
                    self.listImg = [{
                        url: 'static/image/banner/banner2.jpg',
                        str: 'static/dollShow'
                    }, {
                        url: 'static/image/banner/banner1.jpg',
                        str: ''
                    }];

                    self.isInvited = false;
                    self.show_banner = false;

                    setTimeout(function () {
                        self.show_banner = true;
                    }, 100)
                })
            },

            //758关注
            follow_1758: function () {
                var self = this;
                if (CF.user.platform == '1003') {
                    self.isShowFollow_1758 = true;
                    CF.channel.follow_1758(function (type, isAdd) {
                        if (type == 1) {
                            self.isShowFollow_1758 = false;
                            if (isAdd == 1) {
                                self.updateGoldNum(10);
                            }
                        } else {
                            self.isShowFollow_1758 = true;
                        }
                    });

                } else {
                    self.isShowFollow_1758 = false;
                }
            },

            //关闭关注
            clickfollow: function () {
                CF.channel.follow_1758_tip();
            },

            shareSuccess: function () {
                var self = this;
                CF.pubsub.$on('shareSuccess', function () {
                })
            },

            //更新用户信息
            updateUserInfo: function () {
                var self = this;
                //获取用户信息
                initUser('init_user',CF.user._id,(data)=>{
                    if(data['status'] == 1){
                        self.initGoldNum(data.data.gold);
                        CF.user.redNum = data.data.red_packet || 0;

                        self.redNum = CF.user.redNum;
                        self.isNewUser = data.data.isNewUser;
                        self.is_pop = data.data.is_pop;
                        self.notice = data.data.notice;
                        //展示公告
                        self.showNotice();
                        self.initPayMoney20(data.data.first_pay);
                        CF.user.call = data.data.call;//话费

                        // if(!CF.user.pay_activity){
                        //     self.listImg.splice(0,self.listImg.length-1);
                        //     self.setBannerImg();
                        // }
                    }
                })
            },

            //设置banner
            setBannerImg: function () {
                if(CF.user.platform == '1001'){
                    this.show_banner = false;
                    this.distribution = true;
                    return ;
                }
                let banner = bannerData.banner;
                for (let k in banner) {
                    if (k == CF.user.platform) {
                        // if (this.ball_machine) {
                        //     banner[k].push({
                        //         url: 'static/image/banner/banner3.jpg',
                        //         str: 'placard'
                        //     })
                        // }
                        this.listImg = banner[k];
                        break;
                    }
                }

                if (this.listImg.length == 0) {
                    this.listImg = banner['default'];
                }
                this.show_banner = true;
            },


            placardClose: function () {
                this.showPlacard = '';
                if (this.isNewUser) {
                    this.show_tip = 'newUserTip';
                }
            },

            showNotice: function () {
                if (this.notice.status) { //优先显示公告
                    this.placardData = this.notice;
                    this.showPlacard = 'placard';
                }

                if (this.isNewUser && !this.notice.status) {
                    this.show_tip = 'newUserTip';
                }
                if (this.is_pop) {
                    this.show_tip = 'firstPayWindow';
                }
            },

            bannerShowPlacard() {
                if (this.ballArr.length > 0) {
                    let item = this.ballArr[0];
                    this.$router.push({
                        name: 'gameRoomPage', params: {
                            serverId: item.serverId,
                            doll_price: item.doll_price,
                            doll_id: item.doll_id,
                            machine_id: item.machine_id,
                            type: item.type || 1,
                            gateHost: item.gate_host,
                            gatePort: item.gate_port
                        }
                    })
                }
            },

            //请求推送流数据
            getPushData: function () {
                catchList('catch_list',this.pushTimer,(data)=>{
                    this.pushTimer = data.data.time;
                    if (data.data.list.length > 0) {
                        this.pushData = data.data.list[0];
                        this.push_tip = 'pushTip';
                    }
                })
            },

            itemClick: function (item) {
                if(item.machine_id >= 20000){
                    this.$router.push({
                        name: 'otherGameInfo', params: {
                            machine_id: item.machine_id,
                            game_id:item.game_id,
                            doll_price:item.doll_price,
                            doll_id:item.doll_id,
                            details:item.details
                        }
                    })
                }else if (item.machine_id >= 10000) {
                    this.$router.push({
                        name: 'virtualRoomPage',
                        params: {price: item.doll_price, machine_id: item.machine_id}
                    })
                } else  {
                    this.$router.push({
                        name: 'gameRoomPage', params: {
                            serverId: item.serverId,
                            doll_price: item.doll_price,
                            doll_id: item.doll_id,
                            machine_id: item.machine_id,
                            type: item.type || 1,
                            gateHost: item.gate_host,
                            gatePort: item.gate_port,
                            virtual:item.virtual
                        }
                    })
                }
            },


            //请求列表页
            getListData: function (statue, type, label) {
                machineList('machine_list',statue,type,label,(data)=>{
                    if (statue) { //定时刷新顺序不变
                        this.setItems(data.data, type);
                    } else {
                        if (type == 1) {
                            this.items = data.data;
                        }
                        if (type == 2) {
                            this.ballArr = data.data;
                        }
                        this.showGameLoad = false;
                    }
                })
            },

            setItems: function (data, type) {
                let tempArr;
                if (type == 1) {
                    tempArr = this.items;
                }
                if (type == 2) {
                    tempArr = this.ballArr;
                }
                for (var i = 0; i < tempArr.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (tempArr[i].machine_id == data[j].machine_id) {
                            tempArr[i] = data[j];
                            break;
                        }
                    }
                }
            },


            tipOk: function () {
                this.show_tip = '';
            },

            tipClose: function () {
                this.show_tip = '';
            },

            pushCompelete: function () {
                this.push_tip = '';
            },

            changeGold: function () {
                // this.goldNum = CF.user.goldNum;
            },

            updateGold: function () {
                getGolds('get_golds',(data)=>{
                    if (data.status == 1) {
                        this.initGoldNum(data.data.gold);
                        this.changeGold();
                        this.updataBall(data.data.ball);
                    }
                })
            },

            redClick: function () {
                this.openRed = 'openRedPacket';
            },

            redPackClose: function () {
                this.openRed = '';
                if (this.redNum > 0)
                    this.redNum--;
                this.changeGold();
            },

            // 新用户
            closeOldUser() {
                this.old_user = false;
            },

            hideInvite() {
                this.common = ''
            },

            // 邀请
            invite() {
                if (CF.user.platform == '1003') {
                    CF.channel.share();
                } else {
                    this.common = 'wxShareView'
                }
            },

            // 关注
            focus() {
                CF.channel.focus();
            },
            // 切换抓球球table
            dollTable(type) {
                this.changeItem = false;
                this.tableType = type;
                this.getListData('', 1, type);
                this.holdDoll();
            },

            dollTableBanner(type){
                this.getListData('',1,type);
                this.changeItem = true;
            },

            //去分销
            goDistribution(){
                this.$router.push('/distribution');
            },

            //分享跳转
            dispathRouter(){
                if(CF.TOOLS.getUrlAttribute('distribution') ==1){
                    this.goDistribution()
                }
                if(CF.TOOLS.getUrlAttribute('coupon') == 1){
                    this.$router.push({
                        name: 'rechargePage',
                        params: {id: 1}
                    })
                }
            }
        },

        components: {
            sign,
            newUserTip,
            pushTip,
            firstPayWindow,
            openRedPacket,
            banner,
            placard,
            oldUser,
            wxShareView,
            selectItem,
            ballItem,
            exchange,
            focusAndInvite,
            sign1758,
            logoCoin,
            holdDollTable,
            gameLoad,
            homeBannerDistribution
        },

        watch: {
            '$route'(to, from) {
                // //如果跳转页面不是本页面 不重新加载数据
                // if(to.name!=this.$route.name){return};
                var self = this;
                //数据更新
                if (to.name == 'listPage') {
                    if(CF.user.platform == '1001'){
                        this.show_banner = false;
                        this.distribution = true;
                    }else{
                        this.show_banner = true;
                    }
                    setTimeout(function () {
                        self.getListData('', 1, self.tableType);
                        self.getListData('', 2);
                        //更新用户信息
                        self.updateUserInfo();

                        //通知payIframe
                        CF.pubsub.$emit('clearPayIframe');
                        self.getBallExchangeList();
                        self.updateGold();
                        self.getPushData();
                    }, 100);
                    setTimeout(function () {//ios返回白屏问题
                        window.scrollTo(0, 1);
                        window.scrollTo(0, 0);
                    }, 20);
                }

                if(from.name == 'listPage'){
                    this.show_banner = false;
                    this.distribution = false;
                }
            }
        }
    }


</script>


<style scoped>

    #dollList {
        height: 100%;
        width: 100%;
        position: absolute;
    }

    .dollListAll {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }

    .listContent {
        margin: 0;
        padding: 0;
        text-align: left;
        font-size: 0;
    }
    .listContentDis{
        width: 6.58rem;
        height: 1.08rem;
        margin-left: 0.46rem;
        margin-top: 0.4rem;
        margin-bottom: 0.4rem;
    }

    .itemInfo {
        background: #ffffff;
        width: 3rem;
        height: 3.72rem;
        list-style: none;
        position: relative;
        float: left;
        overflow: hidden;
        border-radius: 0.06rem;
    }

    .listItem {
        display: inline-block;
        margin-left: 0.5rem;
        margin-bottom: 0.05rem;
    }

    #doll {
        position: absolute;
        left: 0;
        top: .16rem;
        width: 3rem;
        height: 2.5rem;
        border-radius: 0.1rem;
    }

    #dollName {
        position: absolute;
        font-size: .30rem;
        color: #000000;
        /*font-weight: bold;*/
        left: 0;
        top: 2.80rem;
    }

    #status {
        position: absolute;
        top: 3.28rem;
        left: 0;
        width: 1.07rem;
        height: 0.24rem;
    }

    #doll_status {
        position: absolute;
        width: 0.64rem;
        height: 0.66rem;
    }

    #doll_status1 {
        position: absolute;
        width: 0.84rem;
    }

    #doll_random {
        position: absolute;
        top: 2.09rem;
        right: 0.2rem;
        width: 1.43rem;
        height: 0.3rem;
    }

    #doll_price {
        position: absolute;
        top: 3.24rem;
        right: .20rem;
        color: #979797;
        font-size: .24rem;
    }

    .fade_1-enter-active, .fade_1-leave-active {
        transition: all 0.3s ease-out;
    }

    .fade_1-leave-active {
        opacity: 0;
    }

    .fade_1-enter {
        transform: translateY(-15.00rem);
    }

    .fade_1-enter-action {
        transform: translateY(15.00rem);
    }

    #temp {
        /*        position:absolute;*/
        font-size: .26rem;
        color: #979797;
        clear: both;
        text-align: center;
        line-height: .80rem;
    }

    #dollShowRoute {
        position: fixed;
        right: 0.2rem;
        /* bottom: 0.3rem; */
        /* width: 1.69rem;
        height: 1.69rem; */
        z-index: 900;
    }

    #shareWx {
        position: fixed;
        z-index: 999;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }

    .img2 {
        width: 1.69rem;
    }


    .redPacket {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: #f7f7f7;
    }

    .linQu {
        margin-left: .2rem;
    }

    .redPacket > section {
        background: linear-gradient(to right, #ec4628, #fc8850);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6.5rem;
        height: 0.6rem;
        border-radius: 1rem;
        margin: 0.2rem 0;
    }

    .p1, .p3 {
        font-size: 0.28rem;
        color: white;
    }

    .p2, .p4 {
        font-size: 0.32rem;
        color: white;
    }

    .img_red {
        width: 0.27rem;
        margin-right: 0.2rem;
    }

    .toTop {
        position: fixed;
        z-index: 100;
        right: 0.5rem;
        bottom: 0.2rem;
    }

    .fadeTop-enter-active, .fadeTop-leave-active {
        transition: opacity .5s;
    }

    .fadeTop-enter, .fadeTop-leave-to {
        opacity: 0;
    }
    .discountImg{
        position: absolute;
        width: 1.52rem;
        right: 0;
        top: 59%;
        transform: translateY(-50%);
    }


    .homeDistribution{
        position: fixed;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        z-index: 100;
        width: 1.3rem;
    }


    .focusAndInviteShow {
        position: fixed;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        z-index: 100;
        width: 1.3rem;
    }

</style>