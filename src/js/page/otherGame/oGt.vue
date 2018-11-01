<template>
    <div class="oGd">
        <goBack @returnToIndex="returnBack"/>
        <div class="oGdCenter">
            <div class="top">
                <img class="topImg" :src="titlePng" alt="">
            </div>
            <img class="info" :src="contentPng" alt="">
            <img class="topLoader" :src="loadPng" alt="">
            <div class="oGdBtn">
                <div @click="goInGame">
                    <p>开始游戏</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CF from "../../../router/ind.js";
    import goBack from '../../components/return/index';
    import gameConfig from './otherGameConfig';

    export default {
        data() {
            return {
                titlePng:"",
                contentPng:"",
                loadPng:""
            }
        },

        props:['machine_id','game_id'],


        mounted(){
            if(CF.gameInfo.env == 1){
                this.titlePng =  `${gameConfig.dev.url}${this.game_id}/alert/title.png`;
                this.contentPng = `${gameConfig.dev.url}${this.game_id}/alert/center.gif`;
                this.loadPng = `${gameConfig.dev.url}${this.game_id}/alert/info.png`;
            }else{
                this.titlePng =  `${gameConfig.pro.url}${this.game_id}/${gameConfig.pro[this.game_id]['v']}/alert/title.png`;
                this.contentPng = `${gameConfig.pro.url}${this.game_id}/${gameConfig.pro[this.game_id]['v']}/alert/center.gif`;
                this.loadPng = `${gameConfig.pro.url}${this.game_id}/${gameConfig.pro[this.game_id]['v']}/alert/info1.png`
            }
        },

        methods:{
            goInGame(){
                this.$emit('goToGame');
            },
            returnBack(){
                this.$router.go(-1);
            }
        },

        components:{
            goBack
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .oGd{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(51,51,51,0.8);
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        line-height: 1;
        z-index: 1000;
    }
    .top{
        position: absolute;
        left: 0;
        top: 0.6rem;
        text-align: center;
        width: 100%;
    }
    .topImg{
        width: 4.05rem;
    }
    .oGdCenter{
        width: 6.90rem;
        height: 9.30rem;
        background-color: #ffffff;
        border-radius: 0.20rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }
    .info{
        margin-top: 0.4rem;
        width: 4.8rem;
    }
    .topLoader{
        width: 6.33rem;
        margin-top: -0.4rem;
    }
    .oGdBtn{
        width: 100%;
        text-align: center;
        margin-top: 0.4rem;
        position: absolute;
        bottom: 0.4rem;
        left: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
    }
    .oGdBtn>div{
        width: 5.01rem;
        height: 1.10rem;
        background-image: linear-gradient(270deg,
        #ed793f 0%,
        #ffa133 100%),
        linear-gradient(
                #ffffff,
                #ffffff);
        background-blend-mode: normal,
        normal;
        border-radius: 0.55rem;
        display: inline-block;
        display: flex;
        align-items: center;
    }
    .oGdBtn>div>p:nth-of-type(1){
        font-family: PingFang-SC-Medium;
        font-size: 0.4rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        color: #ffffff;
        text-align: center;
        width: 100%;
    }
    .oGdBtn>div>p:nth-of-type(2){
        font-family: PingFang-SC-Regular;
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 2px;
        color: #ffffff;
        margin-top: 0.13rem;
    }
</style>