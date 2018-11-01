<template>
    <section class="payContent">
        <div class="diaLog" v-if="showDiaLog">
            <p class="dialogTitle">温馨提示</p>
            <p class="diaLogInfo">{{info}}</p>
            <div class="leftDiaLog" @click="cancel">
                取消
            </div>
            <div class="rightDiaLog" @click="sure">
                确定
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "twoChoose",
        data(){
            return {
                showDiaLog:false
            }
        },
        props:['info'],
        mounted(){
            this.showDiaLog = true;
        },
        methods:{
            cancel(){
                this.$emit('cancel')
            },
            sure(){
                this.$emit('sure')
            }
        }

    }
</script>

<style lang="less" scoped>
    .payContent{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        .diaLog{
            width: 6rem;
            min-height: 2.5rem;
            background-color: white;
            border-radius: 0.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            align-content: flex-start;
            animation: ac .3s ease;
            .dialogTitle{
                margin: 0;
                padding: 0;
                text-align: center;
                width: 100%;
                font-size: 0.45rem;
                font-weight: bold;
                color: #323232;
                margin-top: .3rem;
            }
            .diaLogInfo{
                padding: 0.3rem 0.2rem 0.3rem 0.2rem;
                margin: 0;
                text-align: center;
                font-size: 0.3rem;
                color: #323232;
                line-height: 0.4rem;
                width: 90%;

            }
            .leftDiaLog{
                width: 50%;
                display: inline-block;
                height: 1rem;
                font-size: 0.3rem;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
            }
            .leftDiaLog::after{
                position: absolute;
                right: 0;
                content: '';
                height: 40%;
                width: 1px;
                background-color: rgba(0,0,0,0.1);
            }
            .leftDiaLog::before{
                position: absolute;
                left: 0;
                top: 0;
                content: '';
                width: 100%;
                height: 1px;
                background-color: rgba(0,0,0,0.1);
            }

            .rightDiaLog{
                width: 50%;
                display: inline-block;
                height: 1rem;
                font-size: 0.3rem;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                color: rgba(0,0,255,0.5);
            }
            .rightDiaLog::before{
                position: absolute;
                left: 0;
                top: 0;
                content: '';
                width: 100%;
                height: 1px;
                background-color: rgba(0,0,0,0.1);
            }
        }
    }
    @keyframes ac {
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
</style>