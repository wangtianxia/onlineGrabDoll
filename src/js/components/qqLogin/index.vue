<template>
<!-- 10086 QQ登陆获取游客登陆 -->
    <section class="QQLogin" v-disabletouchmove>
        <section class="QQLoginContent">
            <section class="QQLoginContentTitle">
                <p>登陆</p>
                <img v-show="isClose" class="QQloginClose" src="static/image/10086/close.png" @click="closeLogin" />
            </section>
            <img class="QQImg" src="static/image/10086/qqLogin.png" @click="qqLogin()" alt="">
            <p class="p1">QQ登录</p>
            <div v-show="!isClose">
                <img class="line" src="static/image/10086/line.png"/>
                <p class="p2">或</p>
                <p class="p3" @click="visitLogin()">游客登陆</p>
            </div>
        </section>
    </section>
</template>

<script>
import CF from '../../../router/ind.js'
export default {
    data(){
        return {
            isClose:false
        }
    },
    methods:{
        closeLogin(){
            CF.Vue.prototype.$hideLogin();
        },
        qqLogin(){
            let channel = CF.TOOLS.getUrlAttribute('channel');
            if (channel.indexOf('_') != -1) {
                channel = channel.split('_')[0];
            } else {
                channel = channel;
            }
            window.location.replace(CF.gameInfo.host+'temp_qq_login?channel='+ channel);
        },
        visitLogin(){
            var channel=CF.TOOLS.getUrlAttribute('channel');
            if(channel.indexOf('_')!=-1){
                channel = channel.split('_')[0];
            }else{
               channel = channel;
            }
            window.location.replace(CF.gameInfo.host+'temp_login?'+'channel='+channel);
        }
    },
}
</script>

<style scoped>
    p{
        display: block;
        margin: 0;
        padding: 0;
    }
    .QQLogin{
        width: 100%;
        height: 100%;
        position:fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.5);
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 0;
        z-index: 1000;
    }
    .QQLoginContent{
        width: 6rem;
        background-color: white;
        border-radius: 0.2rem;
        text-align: center;
        animation: loginAc 0.2s ease-in both;
    }
    .QQLoginContentTitle{
        width: 100%;
        height: 1rem;
        background-color: #ec4776;
        border-radius: 0.2rem 0.2rem 0 0;
        line-height: 1rem;
        font-size: 0.38rem;
        color: white;
        font-weight: bold;
        text-align: center;
        position: relative;
    }
    .QQImg{
        width: 1.5rem;
        margin-top: 0.6rem;
        margin-bottom: 0.3rem;
    }
    .QQloginClose{
        width: 0.33rem;
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
    }
    .p1{
        font-size: 0.3rem;
        color: black;
        text-align: center;
        margin-bottom: 0.5rem
    }
    .line{
        width:80%;
        margin-bottom: 0.2rem
    }
    .p2{
        font-size: 0.28rem;
        color: #b1b1b1;
        text-align: center;
        margin-bottom: 0.3rem
    }
    .p3{
        font-size: 0.4rem;
        color: #00a2ff;
        text-align: center;
        margin-bottom: 0.5rem
    }
    @keyframes loginAc {
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
</style>
