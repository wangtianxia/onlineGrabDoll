
<template>
    <div class="bindWifi">
        <transition name="fade">
            <div class="bindIphone" v-show="show">
                <div class="bindIphoneTop">
                    <img src="static/image/warm.png" alt="">
                    <div class="bindIphoneTip">
                        <p>账号安全设置</p>
                        <p>绑定账号更好地维护您的利益</p>
                    </div>
                </div>
                <div class="bindIphoneTipBtn" @click="bindPhone">
                    <div>
                        绑定手机号
                    </div>
                </div>
                <p class="tip" @click="waite">稍后再说</p>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                show:false
            }
        },

        mounted(){
            setTimeout(()=>{
                this.show = true;
            },100)
        },

        methods:{
            bindPhone(){
                this.$emit('bindphone');
            },
            waite(){
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>
    .bindWifi{
        width: 100%;
        height: 100%;
        background-color: rgba(50,50,50,0.7);
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .fade-enter-active, .fade-leave-active {
        animation: ac 0.2s ease;
    }

    @keyframes ac {
        from{
            transform: scale(0);
        }
        to{
            transform: scale(1);
        }
    }

    .bindIphone{
        width: 6.6rem;
        background-color: #ffffff;
        border-radius: 0.2rem;
        padding: 0.5rem 0;
    }
    .bindIphoneTop{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .bindIphoneTip{
        margin-left: 0.15rem;
    }
    .bindIphoneTip>p:nth-of-type(1){
        font-size: 0.4rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.36rem;
        letter-spacing: 0rem;
        color: #323232;
        margin: 0;
        padding: 0;
    }
    .bindIphoneTip>p:nth-of-type(2){
        font-size: 0.26rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.36rem;
        letter-spacing: 0rem;
        color: #323232;
        margin: 0;
        padding: 0;
        margin-top: 0.19rem;
    }
    .bindIphoneTipBtn{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem 0;
    }
    .bindIphoneTipBtn>div{
        width: 4.5rem;
        height: 0.7rem;
        background-color: #ffffff;
        border-radius: 0.35rem;
        border: solid 0.01rem #323232;
        font-size: 0.26rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.36rem;
        letter-spacing: 0rem;
        color: #323232;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .tip{
        text-align: center;
        font-size: 0.26rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.36rem;
        letter-spacing: 0rem;
        color: #323232;
        margin: 0;
    }
</style>