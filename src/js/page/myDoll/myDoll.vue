<template>
    <div id="myDoll">
        <!-- 返回上级页面 -->
        <goBack @returnToIndex="returnBack"></goBack>
        <div id="user_info">
            <div id='user'>
                <img id="user_face" v-bind:src="user_face" :onerror="defaultImg">
                <div id='user_name'>{{name}}</div>
                <div id='time' v-text="ID"></div>
            </div>
        </div>

        <span class="showWifiId" v-if="showWifiID" @click="showWifiId">原WiFi账户ID</span>

        <section class="myCoin" v-if="showBindWIfI">
            <section class="wifi">
                <p>您的账号尚未绑定</p>
                <p>可能存在数据丢失等风险！</p>
            </section>
            <section class="myCoinRight" @click="bindWiFi">立即绑定</section>
        </section>
        <section class="myCoin">
            <section class="myCoinLeft">
                <img src="static/image/newImage/coin.png" alt="">
                <span>{{goldNum}}</span>
            </section>
            <section class="myCoinRight" @click="pay">去充值</section>
        </section>

        <section style="width: 100%;height: 0.2rem;background-color: rgb(247,247,247)"></section>
        <!-- 娃娃列表 -->
        <div id="dollList">
            <section class="myTimes">
                <span>我的娃娃</span>
                <span>共抓到{{time}}只</span>
            </section>
            <div id='list'>
                <section class="listContent" v-if="items.length>0">
                    <router-link v-for="(item,index) in items" :to="{path: `myDoll_statePage/${item._id}`}" :key="index"
                                 tag='div' class="listContentItemInfo"
                                 :class="[item.status == 0 ? status0 : '',item.status == 1 ? status1 : '',item.status == 2 ? status2 : '',item.status == 3 ? status3 : '']">
                        <img id='doll' v-bind:src="'https://wwjcdn.like000.com/wwjDollImg/'+item.doll_id+'.jpg'"/>
                        <p id='dollName'>{{item.doll_name}}</p>
                        <p id='dollTime'>{{item.timer|timer}}</p>
                        <p id='doll_Static'
                           :class="[item.status == 0 ? status0Text : '',item.status == 1 ? status1Text : '',item.status == 2 ? status2Text : '',item.status == 3 ? status3Text : '']">
                            {{item.status|status}}</p>
                    </router-link>
                </section>
                <section class="notContent" v-else>
                    <img src="static/image/notDoll.png" alt="">
                    <p>亲，还没有抓到娃娃哦</p>
                </section>
            </div>
        </div>

        <component :is="com" @close="close" @bindphone="bindphone" :wifiID="wifiID"></component>

    </div>
</template>

<script>

    import CF from '../../../router/ind.js';
    import goBack from '../../components/return/index';
    import {mapState, mapMutations} from 'vuex'
    import { userBag,getGolds,wifi_get_user,wifi_key_get_code } from '../../../server/getServerData';
    import bindWIfi from '../../components/bindWiFi/index';
    import bindPhone from '../../components/bindWiFi/bindPhone';
    import WifiId from '../../components/bindWiFi/wifiTip';

    export default {
        data() {
            return {
                time: '',
                name: CF.user.userName,
                user_face: '',
                items: [],
                ID: 'ID ' + CF.user.uid,
                status0: "status0",
                status1: "status1",
                status2: 'status2',
                status3: 'status3',
                status0Text: 'status0Text',
                status1Text: 'status1Text',
                status2Text: 'status2Text',
                status3Text: 'status3Text',
                defaultImg: "https://wwjcdn.like000.com/videoDollCatcher/head.jpg",
                com:'',
                wifiID:"",
                showWifiID:false,
                showBindWIfI:false
            }
        },

        computed: {
            ...mapState(['goldNum','isHoldDoll'])
        },

        props: ['isSuccess', 'doll_id'],

        created: function () {
            this.init(0);
            setTimeout(function () {//ios返回白屏问题
                window.scrollTo(0, 1);
                window.scrollTo(0, 0)
            }, 20);

            if(this.isHoldDoll){
                this.updateHoldDoll(false);
            }

            if(CF.user.platform == '1009'){
                this.showWifiID = true;
            }

            if(CF.user.is_wifi_visitor && CF.user.platform == '1009'){
                this.showBindWIfI = true
            }
        },
        filters: {
            timer(timer) {
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
            status(type) {
                let result;
                switch (type) {
                    case 0:
                        result = "寄存中";
                        break;
                    case 1:
                        result = "打包中";
                        break;
                    case 2:
                        result = "已发货";
                        break;
                    case 3:
                        result = "已兑币";
                        break;
                }
                return result;
            }

        },

        watch: {
            '$route'(to, from) {
                //如果跳转页面不是本页面 不重新加载数据
                if (to.name == "myDollPage") {
                    this.init(1);
                }

                setTimeout(function () {//ios返回白屏问题
                    window.scrollTo(0, 1);
                    window.scrollTo(0, 0)
                }, 20);

                if(this.isHoldDoll){
                    this.updateHoldDoll(false);
                }
            }
        },

        methods: {
            ...mapMutations([
                'initGoldNum','updateHoldDoll'
            ]),

            init: function (type) {
                var self = this;
                self.user_face = CF.user.face;
                self.updateData();
            },
            updateData: function () {

                userBag('user_bag',(res)=>{
                    this.items = res.data.list;
                    this.time = res.data.count;
                });
                getGolds('get_golds',(data)=>{
                    if (data.status == 1) {
                        this.initGoldNum(data.data.gold);
                    }
                })

            },
            returnBack: function () {
                this.$router.go(-1)
                // CF.GameSDK.goBack();
                // console.log(CF.GameSDK.userId)
            },
            pay() {
                this.$router.push({name: 'rechargePage', params: {}})
            },

            showWifiId(){
                var self = this;
                window.wifiCallBack = (code)=>{
                    self.getUser(code);
                };
                wifi_key_get_code('wifi_key_get_code',(data)=>{
                    if(data && data.status==1) {
                        let params = {
                            thirdAppId:data['data']['appId'],
                            scope:data['data']['scope'],
                            appName:data['data']['appName'],
                            appIcon:data['data']['appIcon'],
                            onResult:'wifiCallBack'
                        };
                        try {
                            WiFikey.login(JSON.stringify(params));
                        }catch (err){
                            alert("err"+JSON.stringify(err))
                        }
                    }
                });
            },
            getUser(code){
                wifi_get_user('wifi_get_user',code,(res)=>{
                    if(res['status'] == 2){
                        this.com = 'WifiId';
                        this.wifiID = false;
                    }else if(res['status'] == 1){
                        this.com = 'WifiId';
                        this.wifiID = res['data']['user_id'];
                    }
                })
            },

            bindWiFi(){
                this.com = 'bindWIfi'
            },
            bindphone(){
                this.com = 'bindPhone';
            },

            close(){
                this.com = '';
            },


        },
        components: {
            goBack,bindWIfi,bindPhone,WifiId
        }
    }
</script>

<style scoped>
    p {
        width: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
    }

    #myDoll {
        position: absolute;
        height: 100%;
        width: 100%;
    }

    .myCoin {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        height: 0.96rem;
    }
    .wifi>p:nth-of-type(1){
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.36rem;
        letter-spacing: 0rem;
        color: #ff8f11;
        text-align: left;
        margin-left: 0.5rem;
    }
    .wifi>p:nth-of-type(2){
        font-size: 0.2rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.36rem;
        letter-spacing: 0rem;
        color: #ff8f11;
        text-align: left;
        margin-left: 0.5rem;
    }
    .myCoin::after {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        width: 100%;
        height: 1px;
        background-color: #eee;
    }

    .myCoinLeft {
        font-size: .32rem;
        color: #323232;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 0.5rem;
    }

    .myCoinLeft > img {
        width: 0.47rem;
    }

    .myCoinLeft > span {
        font-size: 0.32rem;
        color: #323232;
        margin-left: 0.1rem;
    }

    .myCoinRight {
        font-size: 0.26rem;
        color: white;
        width: 1.5rem;
        height: 0.5rem;
        background: linear-gradient(to right, rgb(241, 156, 56), rgb(237, 118, 58));
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.5rem;
        border-radius: 0.25rem;
    }

    #user_info {
        position: relative;
        width: 100%;
    }

    #user {
        position: relative;
        width: 100%;
        text-align: center;
        font-size: 0;
        line-height: 1;
    }

    #user_name {
        font-weight: bold;
        font-size: .32rem;
        color: #323232;
        margin-top: .30rem;
    }

    #time {
        margin-top: .20rem;
        font-size: .26rem;
        color: #888;
        margin-bottom: 0.4rem;
    }

    #dollList {
        position: relative;
        height: 100%;
        width: 100%;
    }

    #list {
        margin-top: .10rem;
    }

    .listContent {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }

    #doll {
        width: 1.9rem;
        height: 1.9rem;
        border-radius: 50%;
    }

    #dollName {
        font-size: .26rem;
        color: #323232;
        margin-top: 0.2rem;
    }

    #dollTime {
        color: #888;
        font-size: .2rem;
        margin-top: 0.1rem;
    }

    #doll_Static {
        font-size: 0.22rem;
        font-weight: bold;
        margin-top: 0.1rem;
    }

    .listContentItemInfo {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-content: center;
        width: 3.1rem;
        height: 3.5rem;
        border-radius: 0.1rem;
        font-size: 0;
        margin-left: 0.45rem;
        margin-bottom: 0.2rem;
        line-height: 1;
    }

    #user_face {
        border-radius: 50%;
        max-width: 1.40rem;
        max-height: 1.40rem;
        width: 3rem;
        height: 2.5rem;
        margin-top: 0.4rem;
    }

    .myTimes {
        font-size: 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.26rem;
        margin-bottom: 0.3rem;
        padding: 0 0.5rem;
    }

    .myTimes > span:nth-of-type(2) {
        color: #888;
    }

    .status0 {
        background-color: #e9faf7;
    }

    .status1 {
        background-color: #fefadc;
    }

    .status2 {
        background-color: #f5f3ff;
    }

    .status3 {
        background-color: #f7f7f7;
    }

    .status0Text {
        color: #40c7a0;
    }

    .status1Text {
        color: #f08e39;
    }

    .status2Text {
        color: #9889e7;
    }

    .status3Text {
        color: #888;
    }

    .notContent {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1.5rem;
        flex-wrap: wrap;
        align-content: center;
    }

    .notContent > img {
        width: 2.33rem;
    }

    .notContent > p {
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 0.26rem;
        color: #888;
        margin-top: 0.2rem;
    }
    .showWifiId{
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        text-decoration: underline;
        z-index: 1000;
        font-size: 0.25rem;
        color: #3ac6fa;
    }
</style>