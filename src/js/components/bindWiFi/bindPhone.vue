<template>
    <div class="bindPhone">
        <transition name="fade">
            <div class="bindIphone" v-show="show">
                <p class="title">输入手机号</p>
                <div class="bindPhoneInput">
                    <input type="text" initial="off" maxlength="11" v-model="num">
                </div>
                <div class="btn">
                    <div class="btn_left" @click="sure">
                        确定
                    </div>
                    <div class="btn_right" @click="cancel">
                        取消
                    </div>
                </div>
            </div>
        </transition>

        <section class="showTip" v-show="showError">
            {{errorTip}}
        </section>
    </div>
</template>

<script>
    import { bind_phone_no } from "../../../server/getServerData";

    export default {
        name: "bindPhone",

        data(){
            return {
                show:false,
                num:'',
                showError:false,
                errorTip:""
            }
        },
        mounted(){
            this.show = true
        },
        methods:{
            sure(){
                if(this.num.length<11 || this.num == ''){
                    this.showError = true;
                    this.errorTip = '输入手机号有误';
                    setTimeout(()=>{
                        this.showError = false
                    },1500);
                    return;
                };
                bind_phone_no('bind_phone_no',this.num,(res)=>{
                    if(res['status'] == 1){
                        window.location.replace(res['data']['url'])
                    }
                });
            },
            cancel(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>
    .bindPhone{
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
        padding: 0.5rem 0 0 0;
    }
    .title{
        font-size: 0.4rem;
        text-align: center;
        margin: 0;
        padding: 0;
    }
    .bindPhoneInput{
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0.2rem;
    }
    .bindPhoneInput>input{
        height: 60%;
        font-size: 0.36rem;
        padding-left:0.3rem;
    }
    .btn{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .btn::after{
        position: absolute;
        left: 50%;
        top: 50%;
        height: 50%;
        width: 1px;
        background-color: rgba(0,0,0,0.1);
        content: '';
        transform: translate(-50%,-50%);
    }
    .btn_left{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.4rem;
        width: 100%;
        color: #008CBA;
    }
    .btn_right{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.4rem;
        width: 100%;
        color: #323232;
    }
    .showTip{
        position: absolute;
        padding: 0.3rem 0.2rem;
        z-index: 1000;
        background-color: rgba(0,0,0,0.9);
        color: white;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        font-size: 0.35rem;
        border-radius: 0.1rem;
        padding: 0.2rem 0.5rem;
    }
</style>