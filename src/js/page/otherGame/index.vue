<template>
    <div>
        <div id="gameLoad">
            <component :is="otp" @goToGame="goToGame" :machine_id="machine_id" :game_id="game_id"></component>
            <gameLoad v-show="gameLoad" :type="1"/>
        </div>
    </div>
</template>

<script>

    import CF from "../../../router/ind.js";
    import oGt from './oGt';
    import gameConfig from './otherGameConfig';
    import gameLoad from '../../components/gameLoad/index';
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                otp: "",
                machine_id: '',
                game_id: "",
                doll_price: "",
                gameLoad: false,
                doll_id: ""
            }
        },

        computed:{
            ...mapState([
                'goldNum'
            ])
        },


        mounted() {
            this.machine_id = this.$route.params.machine_id;
            this.game_id = this.$route.params.game_id;
            this.doll_price = this.$route.params.doll_price;
            this.doll_id = this.$route.params.doll_id;
            this.details = this.$route.params.details;

            this.initGame();

        },

        methods: {
            handle(e) {
                let state = e.data.state;
                if (state == 'exitGame' || state == 'parentError' || state == 'userIdError') {
                    this.$router.go(-1);
                }
                //点击领取
                if (state == 'getReward') {
                    this.$router.go(-1);
                }

                if(state == 'details'){
                    this.$router.replace(`/productInfo/${this.doll_id}/${this.details}`)
                }
            },

            goToGame() {
                this.otp = '';
            },

            initGame() {
                let src = '';
                if (CF.gameInfo.env == 1) {
                    src = `${gameConfig.dev.url}${this.game_id}/index.html`;
                    if (gameConfig.dev[this.game_id]['alert']) {
                        this.otp = 'oGt';
                    } else {
                        this.gameLoad = true;
                    }
                } else {
                    if (gameConfig.pro[this.game_id] && gameConfig.pro[this.game_id]['alert']) {
                        this.otp = 'oGt';
                    } else {
                        this.gameLoad = true;
                    }
                    src = `${gameConfig.pro.url}${this.game_id}/${gameConfig.pro[this.game_id]['v']}/index.html`;
                }
                // if(this.game_id == '101'){
                //     src='https://wwjcdn.like000.com/videoDollCatcher/newGame/101/1.1.2/index.html';
                // }

                let iframe = document.createElement('iframe');
                iframe.setAttribute('id', 'otherGame');
                iframe.setAttribute('src', src);
                iframe.setAttribute('width', '100%');
                iframe.setAttribute('height', '100%');
                iframe.setAttribute('frameborder', 'no');
                iframe.setAttribute('marginwidth', '0');
                iframe.setAttribute('marginheight', '0');
                iframe.setAttribute('scrolling', 'no');
                iframe.setAttribute('allowtransparency', 'false');

                iframe.style.position = 'absolute';
                iframe.style.left = '0';
                iframe.style.top = '0';
                iframe.onload = () => {
                    this.gameLoad = false;
                    let otherGame = document.getElementById('otherGame');
                    otherGame.contentWindow.postMessage({
                        userId: CF.user.uid,
                        machineId: this.machine_id,
                        dollPrice: this.doll_price,
                        dollId:this.doll_id,
                        goldNum:this.goldNum,
                        headImg:CF.user.face
                    }, src);
                    if (window.addEventListener) {// 标准浏览器
                        window.addEventListener('message', this.handle, false);
                    } else if (window.attachEvent) {// IE浏览器
                        window.attachEvent('message', this.handle, false);
                    }
                };

                let gamePacket = document.getElementById('gameLoad');
                gamePacket.appendChild(iframe);
            }
        },

        components: {
            oGt, gameLoad
        },

        beforeDestroy() {
            window.removeEventListener('message', this.handle);
        }
    }
</script>

<style scoped>
    #gameLoad {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    #otherGame {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
</style>