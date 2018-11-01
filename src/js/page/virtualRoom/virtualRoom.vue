<template>
    <div id='virtualRoom'>
        <!-- 组件页面 抓取结果 -->
        <component v-on:closeResultPage='closeResultPage' v-on:noHaveGold='noHaveGold' @smallMoney="smallMoney" v-on:haveGold='haveGold'
                   v-bind:is='show_result' :isSuccess=isSuccsee :doll_id="dropDollId"
                   :dollPrice='doll_price'></component>
        <!-- 返回上级页面 -->
        <goBack @returnToIndex="returnToIndex"></goBack>
        <img class="gameRoomBg" src="static/image/newImage/gameBg.jpg" onclick="return false" alt="">
        <div id='bg'>
            <img src="static/image/virtualDoll/bk.jpg">
        </div>
        <div id='myCanvas'>
            <canvas id='virtualCanvas'></canvas>
        </div>
        <div id='top'>
            <img src="static/image/virtualDoll/top1.png">
        </div>
        <!-- 说明 -->
        <div id='rule'>
            <img src="static/image/virtualDoll/rule.png" v-on:click='rulePage'>
        </div>

        <!--  <div id='loading' v-show='showLoading'>
             加载中。。。
         </div> -->
        <!-- 组件页面-玩家状态组件 -->
        <component v-on:noHaveGold='noHaveGold' @smallMoney="smallMoney" v-on:move='move' v-on:goDrop='goDrop' v-on:haveGold='haveGold'
                   v-bind:is="which_to_show" :dollPrice='doll_price'></component>
        <!-- 组件页面-弹窗 -->
        <component v-bind:is="show_tip" :title='title' :tip='tip' :type='type' v-on:close='tipClose'
                   v-on:ok='tipOk'></component>

        <component :is='show_report' @closeSmallMoney='closeSmallMoney'></component>

    </div>
</template>
<script>
    import CF from '../../../router/ind.js'
    import virtualRoom_control from './virtualRoom_control.vue' //上机状态组件
    import virtualRoom_waitSee from './virtualRoom_waitSee.vue' //准备状态组件
    import virtualRoom_result from './virtualRoom_result.vue'
    import tip from '../tip1.vue'
    import small_Money from '../../components/smallMoney/index';
    import goBack from '../../components/return/index';
    import { mapMutations } from 'vuex';

    export default {

        data: function () {
            return {
                show_tip: '',
                title: '金币不足',  //弹窗标题
                tip: '是否充值，获取金币后再试',//弹窗提示
                type: true,//弹窗类型true双按钮flase单按钮
                show_result: '',
                machine_id:"",
                doll_price: 0, //娃娃价格
                dropDollId: 20,  //抓到的娃娃id
                which_to_show: 'virtualRoom_waitSee',
                show_report:'',
                position: [{
                    x: 168, y: 668
                }, {
                    x: 375, y: 668
                }, {
                    x: 576, y: 668
                }, {
                    x: 375, y: 826
                }, {
                    x: 576, y: 826
                }],
                dollInfo: [
                    {
                        doll_id: '1',
                        doll_name: '123'
                    },
                    {
                        doll_id: '1',
                        doll_name: '123'
                    },
                    {
                        doll_id: '1',
                        doll_name: '123'
                    },
                    {
                        doll_id: '1',
                        doll_name: '123'
                    },
                    {
                        doll_id: '1',
                        doll_name: '123'
                    }
                ],
                moveStep: 30,
                dollLayerArr: [],//娃娃层数组
                isSuccsee: false //抓取结果
            }
        },

        mounted() {
            this.doll_price = this.$route.params.doll_price;
            this.machine_id = this.$route.params.machine_id;
            this.init();
        },



        methods: {
            ...mapMutations([
                'reduceGoldNum'
            ]),

            smallMoney(){
                this.show_report = 'small_Money'
            },

            closeSmallMoney(){
                this.show_report = '';
            },


            init() {

                var self = this;
                CF.Vue.prototype.$load();

                this.manifest = [
                    {id: 'gun', src: 'static/image/virtualDoll/gun.png'},
                    {id: 'top', src: 'static/image/virtualDoll/top.png'},
                    {id: 'left', src: 'static/image/virtualDoll/left.png'},
                    {id: 'right', src: 'static/image/virtualDoll/right.png'},
                    {id: 'shadow', src: 'static/image/virtualDoll/shadow.png'}
                ];
                this.initAjaxData();
            },

            initAjaxData() {
                let self = this;

                (new CF.Ajax()).sendJSON(CF.gameInfo.host+'doll_list_virtual',{
                    user_id: CF.user.uid,
                    machine_id: self.machine_id,
                    sign: CF.M5B({user_id: CF.user.uid,machine_id: self.machine_id})
                },(data)=>{
                    if(data['status']!=1){
                        self.$router.go(-1);
                    }else{
                        if(data['data'] && data['data']['list'] && data['data']['list'].length>0){
                            self.addManifestImg(data.data.list);
                            self.doll_price = data.data.list[0].price;
                            self.dollInfo = data.data.list;
                            self.preLoad(function () {
                                self.startGame();
                            });
                        }
                    }
                })
            },


            addManifestImg: function (list) {
                for (var i = 0; i < list.length; i++) {
                    var item = {};
                    item['id'] = list[i].doll_id;
                    item['src'] = 'https://wwjcdn.like000.com/wwjVirtualDollImg/' + list[i].doll_id + '.png';
                    this.manifest.push(item);
                }
            },
            preLoad: function (preLoadSuccess) {
                let self = this;
                self.addSdk('https://wwjcdn.like000.com/wwjJs/createjs.min.js', ()=> {
                    //舞台初始化
                    self.setStage();
                    //预加载资源
                    self.loadImg(preLoadSuccess);
                })
            },

            addSdk(cb){
                var oHead = document.getElementsByTagName('HEAD').item(0);
                var oScript = document.createElement("script");
                oScript.type = "text/javascript";
                oScript.onload = function () {
                    if (cb) cb();
                };
                oScript.src = src;
                oHead.appendChild(oScript);
            },

            returnToIndex: function () {
                if (this.stage) {
                    createjs.Tween.removeAllTweens();
                    this.stage.removeEventListener("tick", this.mapTick);
                }
                this.$router.go(-1);
            },
            setStage: function () {
                var self = this;
                var canvasId = document.getElementById('virtualCanvas');
                var scale = canvasId.offsetWidth / canvasId.offsetHeight;
                canvasId.width = 750;
                canvasId.height = 750 / scale;

                var stage = self.stage = new createjs.Stage(canvasId);
                createjs.Touch.enable(stage);
                createjs.Ticker.setFPS(60);
                createjs.Ticker.timingMode = createjs.Ticker.RAF;
                createjs.Ticker.addEventListener("tick", stage);
            },
            mapTick: function () {
                // body...
                //爪子跟随影子
                this.pawLayer.x = this.pawShadow.x - 120;
                //如果抓到娃娃 娃娃跟随爪子
                if (this.isCatchDoll && this.dollCanMove) {
                    this.catchDoll.x = this.pawLayer.x + 120;
                    this.catchDoll.y = this.pawLayer.y + 320;
                }
            },
            startGame: function () {
                CF.Vue.prototype.$hideLoad();
                console.log('加载完成-开始游戏');
                //显示背景图
                // this.showBack();
                //显示娃娃
                this.showDolls();
                //显示爪子
                this.showPaw();
                //显示爪子的影子
                this.showPawShadow();
                console.log('startGame')
                this.stage.addEventListener("tick", this.mapTick);
            },
            showBack: function () {
                var bk = CF.TOOLS.bitmap('bk');
                this.stage.addChild(bk);
            },
            showDolls: function () {
                this.dollLayerArr = [];
                for (var i = 0; i < 5; i++) {
                    this.showDoll_item(i);
                }
            },
            showDoll_item: function (index) {
                var layer = new createjs.Container();
                layer.x = this.position[index].x;
                layer.y = this.position[index].y;
                layer.doll_id = this.dollInfo[index].doll_id;
                layer.index = index;
                this.stage.addChild(layer);

                //阴影
                var shadow = CF.TOOLS.bitmap('shadow');
                shadow.regX = shadow.width * 0.5;
                shadow.regY = shadow.height >> 1;
                shadow.scaleX = shadow.scaleY = 0.8;

                //娃娃图
                var doll = CF.TOOLS.bitmap(this.dollInfo[index].doll_id);
                doll.regX = doll.width >> 1;
                doll.regY = doll.height - 20;

                layer.addChild(shadow, doll);

                //push到娃娃层数组
                this.dollLayerArr.push(layer);

            },
            showPaw: function () {

                var initX = 120, initY = 100; //杆初始位置X坐标 以及漏出长度

                var pawLayer = this.pawLayer = new createjs.Container();//整个爪子包括杆
                this.stage.addChild(pawLayer);

                var paw_gun = CF.TOOLS.bitmap('gun');
                paw_gun.regX = paw_gun.width >> 1;
                paw_gun.x = initX;
                paw_gun.y = initY - paw_gun.height;

                var paw_head = this.paw_head = new createjs.Container();//爪子头部
                paw_head.regX = 61;
                paw_head.x = initX;
                paw_head.y = initY;
                pawLayer.addChild(paw_gun, paw_head);

                var paw_top = CF.TOOLS.bitmap('top');

                var paw_left = this.paw_left = CF.TOOLS.bitmap('left');
                paw_left.x = 0;
                paw_left.y = paw_top.height;
                paw_left.regX = paw_left.width - 40;
                paw_left.regY = 20;

                var paw_right = this.paw_right = CF.TOOLS.bitmap('right');
                paw_right.x = paw_top.width;
                paw_right.y = paw_top.height;
                paw_right.regX = 40;
                paw_right.regY = 20;

                paw_head.addChild(paw_left, paw_right, paw_top);
            },
            showPawShadow: function () {
                var pawShadow = this.pawShadow = CF.TOOLS.bitmap('shadow');
                this.stage.addChild(this.pawShadow);

                pawShadow.regX = pawShadow.width >> 1;
                pawShadow.regY = pawShadow.height >> 1;
                pawShadow.x = 120;
                pawShadow.y = 855;
            },
            loadImg: function (preLoadSuccess) {
                CF.TOOLS.loadImg(this.manifest, preLoadSuccess);
            },
            addScript: function (src, cb) {
                var oHead = document.getElementsByTagName('HEAD').item(0);
                var oScript = document.createElement("script");
                oScript.type = "text/javascript";
                oScript.onload = function () {
                    if (cb) cb();
                }
                oScript.src = src;
                oHead.appendChild(oScript);
            },
            move: function (type) { //type 4下 3上 5左 6右

                if (!this.moveImpact(type)) {
                    return;
                }


                if (type == 5) {
                    //爪子影子移动
                    this.moveTween(this.pawShadow, this.pawShadow.x - this.moveStep, this.pawShadow.y, 100);
                    //爪子扭动
                    this.pawRotation('left')
                }
                if (type == 6) {
                    //爪子影子移动
                    this.moveTween(this.pawShadow, this.pawShadow.x + this.moveStep, this.pawShadow.y, 100);
                    //爪子扭动
                    this.pawRotation('right')
                }
                if (type == 3) {
                    //爪子影子移动
                    this.moveTween(this.pawShadow, this.pawShadow.x, this.pawShadow.y - this.moveStep, 100);
                    // //爪子缩小
                    this.paw_head.scaleX -= 0.01;
                    this.paw_head.scaleY -= 0.01;
                }
                if (type == 4) {
                    //爪子影子移动
                    this.moveTween(this.pawShadow, this.pawShadow.x, this.pawShadow.y + this.moveStep, 100);
                    // //爪子放大
                    this.paw_head.scaleX += 0.01;
                    this.paw_head.scaleY += 0.01;
                }
            },
            moveImpact: function (type) {//边界碰撞判断
                if (this.pawShadow.x - this.moveStep <= this.pawShadow.width * 0.5 && type == '5') {
                    // this.pawShadow.x=this.pawShadow.width+this.moveStep;
                    return false;
                }
                if (this.pawShadow.x + this.moveStep >= 750 - this.pawShadow.width * 0.5 && type == '6') {
                    // this.pawShadow.x=750-this.pawShadow.width*0.5-this.moveStep;
                    return false;
                }
                if (this.pawShadow.y - this.moveStep <= 630 && type == '3') {
                    // this.pawShadow.y=630+this.moveStep;
                    return false;
                }
                if (this.pawShadow.y + this.moveStep >= 900 && type == '4') {
                    // this.pawShadow.y=900-this.moveStep;
                    return false;
                }
                return true;
            },
            moveTween: function (target, x, y, time, cb) {
                this.tween = createjs.Tween.get(target)
                    .to({y: y, x: x}, time)

                    .call(function () {
                        if (cb) cb();
                    })
            },
            pawRotation: function (type) {
                var self = this;
                if (type == 'left') {
                    createjs.Tween.get(this.paw_head)
                        .to({rotation: -20}, 100)
                        .to({rotation: 0}, 100)
                }
                if (type == 'right') {
                    createjs.Tween.get(this.paw_head)
                        .to({rotation: 20}, 100)
                        .to({rotation: 0}, 100)
                }
                if (type == 'big') { //爪子放大
                    self.paw_left.rotation = 20;
                    self.paw_right.rotation = -20;
                }
                if (type == 'small') {
                    self.paw_left.rotation = -20;
                    self.paw_right.rotation = 20;
                }
                if (type == 'normal') {
                    self.paw_left.rotation = 0;
                    self.paw_right.rotation = 0;
                }

            },
            goDrop: function () {
                //前端判断是否可抓起
                this.isCatch();
                //发起询问请求 抓没抓到
                this.getResultAjax();
                //爪子放大
                this.pawRotation('big');
                //下抓
                this.which_to_show = '';
                var self = this;
                // //爪子向下移动
                self.pawMove_bottom(function () {
                    //向下移动完成-爪子回到顶部
                    self.pawMove_top(function () {
                        //向上移动完成-爪子影子回到左边 结果展示
                        self.pawMove_left()
                    })
                });
            },
            pawMove_bottom: function (cb) {
                var self = this;
                this.moveTween(this.pawLayer, this.pawShadow.x, this.pawShadow.y - 290, 2000, function () {
                    if (self.isCatchDoll) {
                        //爪子正常
                        self.pawRotation('normal');
                        //娃娃可以跟随爪子
                        self.dollCanMove = true;
                        //抓起之后掉落回原地
                        self.returnDoll();
                    } else {
                        //爪子合并
                        self.pawRotation('small');
                        self.dollCanMove = false;
                    }
                    cb();
                });
            },
            pawMove_top: function (cb) {
                var self = this;
                //爪子回到顶部
                self.moveTween(self.pawLayer, self.pawLayer.x, 0, 2000, function () {
                    // 爪子正常
                    self.pawRotation('normal');
                    cb();

                })
            },
            pawMove_left: function (cb) {
                var self = this;
                //爪子影子回到左边位置
                self.moveTween(self.pawShadow, 120, 855, 1500, function () {
                    //如果抓取成功娃娃掉落坑中。否则归位
                    if (self.isSuccsee) {

                        self.dollCanMove = false;
                        self.moveTween(self.catchDoll, self.catchDoll.x, 1400, 400, function () {
                            //结果展示
                            self.dropDollId = self.catchDoll.doll_id;
                            self.show_result = 'virtualRoom_result';
                        })
                    } else {
                        // self.dropDollId=self.catchDoll.doll_id;
                        self.show_result = 'virtualRoom_result';
                    }
                });
                //爪子大小回复
                createjs.Tween.get(self.paw_head)
                    .to({scaleX: 1, scaleY: 1}, 1000)
            },
            isCatch: function () { //判断是否抓起
                for (var i = 0; i < this.dollLayerArr.length; i++) {
                    var doll = this.dollLayerArr[i];
                    if (this.twoPointDistance(doll.x, doll.y, this.pawShadow.x, this.pawShadow.y) < 60) {
                        this.isCatchDoll = true; //抓起娃娃了
                        this.catchDoll = doll;//抓到的娃娃
                        return;
                    } else {
                        this.isCatchDoll = false;//没抓起娃娃
                    }
                }
            },
            twoPointDistance: function (x1, y1, x2, y2) {
                return Math.pow(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2), 0.5);
            },
            getResultAjax: function () {

                var self = this;
                var status = this.isCatchDoll ? 1 : 0;
                (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'spend_virtual', {
                    user_id: CF.user.uid,
                    machine_id:self.machine_id,
                    status: status,
                    sign: CF.M5B({user_id: CF.user.uid, machine_id:self.machine_id, status: status})
                }, function (data) {
                    //扣费
                    self.reduceGoldNum(self.doll_price);
                    if (data.status == 1) {
                        self.isSuccsee = true;//成功
                    } else {
                        self.isSuccsee = false;//失败
                    }
                });
            },
            returnDoll: function () {
                var self = this;
                if (self.isSuccsee) { //抓取成功 不反回原位置
                    return;
                }
                var t = Math.random(0.5, 1) * 2000;
                //假延迟
                setTimeout(function () {
                    //爪子合并
                    self.pawRotation('small');

                    //娃娃跟随移动取消
                    self.dollCanMove = false;

                    //娃娃回到默认位置
                    var x = self.position[self.catchDoll.index].x;
                    var y = self.position[self.catchDoll.index].y;
                    self.moveTween(self.catchDoll, x, y, 300, function () {
                    })
                }, t);

            },
            haveGold: function () {
                this.show_result = '';
                this.which_to_show = 'virtualRoom_control';
            },
            noHaveGold: function () {
                this.show_tip = 'tip';
            },
            closeResultPage: function () {
                this.show_result = '';
                this.which_to_show = 'virtualRoom_waitSee';
            },
            tipOk: function () {
                console.log('点击ok');
                this.show_tip = '';
                this.$router.push({name: 'rechargePage', params: {}})
            },
            tipClose: function () {
                console.log('点击close');
                this.show_tip = '';
            },
            rulePage: function () {
                this.$router.push({name: "rulePage", params: {type: 1}});
            },
        },

        components: {
            virtualRoom_control: virtualRoom_control,
            virtualRoom_waitSee: virtualRoom_waitSee,
            virtualRoom_result: virtualRoom_result,
            tip: tip,
            small_Money,
            goBack
        },

        watch: {
            '$route'(to, from) {
                if ((to.name == 'virtualRoomPage' && from.name == 'gameRoomPage')|| (to.name == 'virtualRoomPage' && from.name == 'listPage') ) {

                    this.doll_price = this.$route.params.doll_price;
                    this.machine_id = this.$route.params.machine_id;

                    if (this.stage) {
                        this.stage.removeAllChildren();
                        createjs.Tween.removeAllTweens();
                    }
                    this.which_to_show = 'virtualRoom_waitSee';
                    this.show_result = '';
                    this.isSuccsee = false;
                }

                if (from.name == 'virtualRoomPage' || from.name == 'listPage') {
                    CF.Vue.prototype.$hideLoad();
                    this.show_report = '';
                    this.which_to_show = '';
                    //清除
                    if (this.stage) {
                        createjs.Tween.removeAllTweens();
                        this.stage.removeEventListener("tick", this.mapTick);
                    }
                }

                if(to.name == 'virtualRoomPage'){
                    this.which_to_show = 'virtualRoom_waitSee';
                    this.init();
                }
            }
        },
    }


</script>


<style scoped>
    #virtualRoom {
        position: absolute;
        display: flex;
        /*height:100%;
        width:100%;*/
        top: 0rem;
        width: 100%;
        height: 100%;
        flex-wrap: wrap;

    }

    #bg {
        position: absolute;
        top: 0.3rem;
    }

    #bg img {
        width: 7.5rem;
        height: 9.19rem;
    }

    #myCanvas {
        display: flex;
        margin-top: 0.3rem;
        width: 7.5rem;
        height: 9.19rem;
        z-index: 2;
        /*background: #000000;*/

    }

    #virtualCanvas {
        width: 100%;
        height: 100%;
    }

    #top {
        position: absolute;
        left: 0rem;
        top: 0rem;
        z-index: 3;
    }

    #top img {
        width: 7.5rem;
        height: 1.19rem;
    }

    #rule {
        position: absolute;
        right: .35rem;
        top: .3rem;
        z-index: 10;
        display: flex;
    }

    #rule img {
        width: 1.21rem;
        height: 0.56rem;
    }

    .gameRoomBg{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
    }


</style>
