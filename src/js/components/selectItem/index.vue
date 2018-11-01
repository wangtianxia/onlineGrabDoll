<template>
    <section class="selectItem">
        <section class="selectDoll" @click="holdDoll">
            <section class="selectDoll_s" ref="doll">
                <img class="imgItem" src="static/image/newImage/tab1.png" alt="">
                <p class="selectText">抓娃娃</p>
            </section>
        </section>

        <section class="selectBall" @click="holdBall">
            <section class="selectDoll_s" ref="ball">
                <img class="imgItem" src="static/image/newImage/tab2.png" alt="">
                <p class="selectText">话费商城</p>
            </section>
        </section>
        <section class="selectBall" @click="showDoll">
            <section class="selectDoll_s" ref="dollShow">
                <img class="imgItem" src="static/image/newImage/tab3.png" alt="">
                <p class="selectText">娃娃秀</p>
            </section>
        </section>
        <section class="selectBall" @click="myPacket">
            <section class="selectDoll_s" ref="myPacket">
                <img class="imgItem" src="static/image/newImage/tab4.png" alt="">
                <p class="selectText">背包</p>
            </section>
        </section>
    </section>
    <!--<section class="selectItem"  v-else>-->
    <!--<section v-show="ballMachine" class="selectBall" @click="holdBall">-->
    <!--<section class="selectDoll_s"  ref="ball">-->
    <!--<img class="imgItem" src="static/image/newImage/tab2.png" alt="">-->
    <!--<p class="selectText">抓球球</p>-->
    <!--</section>-->
    <!--</section>-->

    <!--<section class="selectDoll"  @click="holdDoll" >-->
    <!--<section class="selectDoll_s" ref="doll">-->
    <!--<img class="imgItem" src="static/image/newImage/tab1.png" alt="">-->
    <!--<p class="selectText">抓娃娃</p>-->
    <!--</section>-->
    <!--</section>-->

    <!--<section class="selectBall"  @click="showDoll">-->
    <!--<section class="selectDoll_s" ref="dollShow">-->
    <!--<img class="imgItem" src="static/image/newImage/tab3.png" alt="">-->
    <!--<p class="selectText">娃娃秀</p>-->
    <!--</section>-->
    <!--</section>-->
    <!--<section class="selectBall" @click="myPacket">-->
    <!--<section class="selectDoll_s" ref="myPacket">-->
    <!--<img class="imgItem" src="static/image/newImage/tab4.png" alt="">-->
    <!--<p class="selectText">背包</p>-->
    <!--</section>-->
    <!--</section>-->
    <!--</section>-->
</template>

<script>

    import CF from '../../../CF';
    import {mapMutations} from 'vuex';

    export default {
        data() {
            return {
                select: true,
                firstCome: false,
                changeStyle: 'changeStyle',
                resetStyle: 'resetStyle',
                linAcR: 'linAcR',
                left: '0',
                once: false,
                platform1011: false
            }
        },


        created() {
            if (CF.user.platform == '1011') {
                this.platform1011 = true
            }
        },
        mounted() {
            if (CF.user.platform == '1011') {
                this.getLinPos(1);
                this.select = false;
                this.$emit('holdBall');
            } else {
                this.getLinPos(0);
            }
        },

        methods: {
            ...mapMutations([
                'changeSelectTable'
            ]),

            holdDoll() {
                if (!this.select) {
                    this.select = true;
                }
                this.changeSelectTable({state: true});
                this.$emit('holdDoll');
                this.getLinPos(0);
            },

            holdBall() {
                // if(this.select){
                //      this.select = false;
                // }
                // this.firstCome = true;
                // this.$emit('holdBall');
                // this.getLinPos(1);
                this.$router.push({name: 'phoneFare'});
            },


            getLinPos(type) {
                let doll = this.$refs.doll;
                let ball = this.$refs.ball;
                let dollShow = this.$refs.dollShow;
                let myPacket = this.$refs.myPacket;
                let ref = this.$refs;

                // for(let i in ref){
                //     ref[i].style.background ='';
                //     // ref[i].style.backgroundColor='#ffbc70';
                // }
                // if(type == 0){
                //     doll.style.background = 'linear-gradient(to right, #f19c38, #ed763a)'
                // }else if(type ==1){
                //     ball.style.background = 'linear-gradient(to right, #f19c38, #ed763a)'
                // }else if(type ==2){
                //     dollShow.style.background = 'linear-gradient(to right, #f19c38, #ed763a)'
                // }else if(type ==3){
                //     myPacket.style.background = 'linear-gradient(to right, #f19c38, #ed763a)'
                // }

            },

            showDoll() {
                this.$router.push({name: 'dollShowPage', params: {doll_id: 0}});
            },
            myPacket() {
                this.$router.push({name: 'myDollPage', params: {doll_id: 0}})
            }
        }
    }
</script>

<style scoped>
    p {
        margin: 0;
        padding: 0;
    }

    .selectItem {
        background-color: #f7f7f7;
        /*height: 1.3rem;*/
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        position: relative;
        font-size: 0;
        width: 100%;
        padding: 0.2rem 0;
    }

    .selectText {
        font-size: 0.26rem;
        color: #666;
        margin-top: .12rem;
    }

    .selectDoll_s {
        border-radius: 50%;
    }

    .imgItem {
        width: 0.9rem;
    }

    .selectDoll, .selectBall {
        width: 100%;
        height: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .changeStyle {
        font-weight: bold;
        color: #ec4776;
    }

    .resetStyle {
        font-weight: 100;
        color: #979797;
    }

    .line {
        position: absolute;
        bottom: 0;
        width: 0.4rem;
        /*left: 0.8rem;*/
        left: 0;
        transition: all 0.15s ease-in-out;
    }

    .word {
        font-size: 0.22rem;
    }
</style>
