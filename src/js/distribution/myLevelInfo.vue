<template>
    <section class="myLevelInfo">
        <goBack  @returnToIndex="returnToIndex"/>
        <section class="myLevelInfoTop" :class="[tempClass]">
            <section class="myLevelInfoData">
                <img class="module" :src="levelImg" alt="">
                <section class="myLevelInfoData1">
                    <p>{{promoterInfoData['level_desc']}}合伙人</p>
                    <p>当前等级</p>
                </section>
                <section class="progress" ref="progress">
                    <section class="progress1">
                        <section class="currentPos" ref="currentPos"></section>
                    </section>
                    <img class="swiperImg" ref="swiperImg" src="static/image/distribution/swiper.png" alt="">
                </section>
            </section>
        </section>
        <section class="myLevelInfoMoney" v-if="type == 1">
            <p class="myLevelInfoMoney1">当前直接推广所获充值总额<span>{{promoterInfoData['consumption']}}元</span></p>
            <p class="myLevelInfoMoney2" v-if="promoterInfoData['next_level']['level'] != promoterInfoData['level']">再赚取{{promoterInfoData['next_level']['consumption'] - promoterInfoData['consumption']}}元即可升级为{{promoterInfoData['next_level']['desc']}}合伙人</p>
            <p class="myLevelInfoMoney2" v-if="promoterInfoData['next_level']['level'] == promoterInfoData['level']">您已达到最高等级了</p>
        </section>
        <section class="myLevelInfoMoney4" @click="goPay" v-if="type == 2">
            立即升级成为正式合伙人>
        </section>
        <section class="myLevelInfoNextLevel">
            <p class="myLevelInfoNextLevel1">{{promoterInfoData['level_desc']}}合伙人特权：</p>
            <section class="myLevelInfoNextLevel2">
                1.直接收益：{{promoterInfoData['current_level']['profit']*100}}% <br/>
                2.间接收益：{{promoterInfoData['current_level']['indirect_profit']*100}}%（下一等级{{promoterInfoData['next_level']['indirect_profit']*100}}%）<br/>
            </section>
            <p class="getMoreMoney" @click="goEducation">赚钱必看教程></p>
        </section>
        <component :is="bindTip" @hideComp="hideComp" ></component>
    </section>
</template>

<script>

    import goBack from '../components/return/index'
    import { mapState,mapMutations } from 'vuex'
    import { promoterInfo } from "../../server/getServerData";

    export default {
        name: "myLevelInfo",

        data(){
            return {
                bindTip:""
            }
        },

        computed:{
            ...mapState([
                'promoterInfoData'
            ]),

            type(){
                if(this.promoterInfoData['status'] == 2 || this.promoterInfoData['status'] == 1){
                    return 2
                }else{
                    return 1
                }
            },
            tempClass(){
                return `bg${this.promoterInfoData['level']}`
            },
            levelImg(){
                return `static/image/distribution/module/${this.promoterInfoData['level']}.png`
            }
        },

        mounted(){
            if(this.$refs.progress){
                let width = document.querySelector('.progress1').clientWidth;
                let total = this.promoterInfoData['next_level']['consumption'];
                let current = this.promoterInfoData['consumption']>this.promoterInfoData['next_level']['consumption']
                    ?this.promoterInfoData['next_level']['consumption']:this.promoterInfoData['consumption'];
                let pos = (current*width)/total ;
                if(pos>2){
                    document.querySelector('.swiperImg').style.left = (pos-2)+'px';
                    document.querySelector('.currentPos').style.width = pos+"px";
                }

            }
        },

        methods:{
            ...mapMutations([
               'getPromoteInfo'
            ]),

            returnToIndex(){
                this.$router.go(-1)
            },

            goPay(){
                this.$router.push('/payPage')
            },

            paySuccess(){
                this.bindTip = '';
                this.initPromote();
            },
            hideComp(){
                this.bindTip = ''
            },
            initPromote() {
                promoterInfo('promoter_info', (res) => {
                    if (res['status'] == 1) {
                        //试用
                        if (res['data']['status'] == 2 ||res['data']['status'] == 1 ||res['data']['status'] == 3) {
                            this.getPromoteInfo(res['data']);
                        }
                    }
                })
            },

            goEducation(){
                this.$router.push('/education')
            }
        },

        components:{
            goBack
        }
    }
</script>

<style lang="less" scoped>
    *{
        padding: 0;
        margin: 0;
    }
    .bg1{
        background-color: #e4bd64;
    }
    .bg2{
        background-color: #dadce5;
    }
    .bg3{
        background-color: #ffe152;
    }
    .bg4{
        background-color: #eef5ff;
    }
    .myLevelInfo{
        height: 100%;
        padding: 0.2rem 0;
        width: 100%;
        .myLevelInfoTop{
            width: 7.5rem;
            height: 3.9rem;
            .myLevelInfoData{
                display: flex;
                justify-content: center;
                align-items: center;
                align-content: flex-start;
                flex-wrap: wrap;
                .module{
                    width: 1.09rem;
                    height: 1.63rem;
                    margin-top: 0.4rem;
                }
                .myLevelInfoData1{
                    margin-left: 0.19rem;
                    width: 100%;
                    text-align: center;
                    p{
                        font-size: 0.32rem;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 1;
                        letter-spacing: 0.02rem;
                        color: #323232;
                    }
                    p:nth-of-type(2){
                        font-size: 0.24rem;
                        font-weight: normal;
                        font-stretch: normal;
                        margin-top: 0.18rem;
                        color: rgba(50, 50, 50, 0.8);
                    }
                    span{
                        color: #f30000;
                    }
                }
                .progress{
                    width: 5.1rem;
                    height: 0.2rem;
                    background-color: #d2d2d2;
                    border-radius: 0.1rem;
                    margin-top: 0.37rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    section{
                        width: 5rem;
                        height: 0.12rem;
                        background-color: #e6e6e6;
                        border-radius: 0.06rem;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .currentPos{
                            width: 0;
                            height: 0.1rem;
                            background-image: linear-gradient(90deg,
                            #f09b37 0%,
                            #ec753a 100%),
                            linear-gradient(
                                    #ffffff,
                                    #ffffff);
                            background-blend-mode: normal,
                            normal;
                            border-radius: 0.1rem 0rem 0rem 0.1rem;
                            transition: all 0.2s ease;
                        }
                    }
                    .swiperImg{
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 0.5rem;
                        height: 0.54rem;
                        transition: all 0.2s ease;
                    }
                }
            }
        }

        .myLevelInfoMoney{
            background-color: #f7f7f7;
            padding:0.74rem 0.59rem;
            .myLevelInfoMoney1{
                font-size: 0.28rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.01rem;
                color: #323232;
                text-align: left;
            }
            .myLevelInfoMoney2{
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.36rem;
                letter-spacing: 0.02rem;
                color: #323232;
                text-align: left;
                margin-top: 0.31rem;
                span{
                    color: #f30000;
                }
            }
            .myLevelInfoMoney3{
                text-decoration: underline;
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.36rem;
                letter-spacing: 0.02rem;
                color: #008dd6;
                text-align: center;
                margin-top: 0.59rem;
            }
        }

        .myLevelInfoMoney4{
            padding: 1.3rem 0;
            text-decoration: underline;
            font-size: 0.3rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.36rem;
            letter-spacing: 0.02rem;
            color: #008dd6;
            text-align: center;
            background-color: #f7f7f7;
        }

        .myLevelInfoNextLevel{
            padding: 0.6rem 0.5rem;
            .myLevelInfoNextLevel1{
                font-size: 0.32rem;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.02rem;
                color: #323232;
                font-weight: bold;
            }
            .myLevelInfoNextLevel2{
                margin-top: 0.38rem;
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.48rem;
                letter-spacing: 0.02rem;
                color: #323232;
                span{
                    color: #f30000;
                }
            }
            .getMoreMoney{
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.48rem;
                letter-spacing: 0.02rem;
                color: #f30000;
                text-align: center;
                margin-top: 1rem;
                text-decoration: underline;
            }
        }
    }
</style>