<template>
    <div class="wifiTip" @click="clickWIFI">
        <div>
            <p>{{tip}}</p>
            <p>{{tip2}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tip:"",
                tip2:''
            }
        },
        props:['wifiID'],
        mounted(){
            if(this.wifiID){
                this.tip = '原WiFi账户ID';
                this.tip2 = this.wifiID;
            }else{
                this.tip = '原WiFi账户ID';
                this.tip2 = '您未注册WiFi账户'
            }
        },
        methods:{
            clickWIFI(){
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .wifiTip{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    .wifiTip>div{
        margin-top: -7.5rem;
    }
    p:nth-of-type(1){
        text-align: center;
        color: white;
        font-size: 0.4rem;
    }
    p:nth-of-type(2){
        text-align: center;
        color: white;
        font-size: 0.8rem;
    }
</style>