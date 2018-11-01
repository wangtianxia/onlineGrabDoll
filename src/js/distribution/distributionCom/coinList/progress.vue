<template>
    <section ref="progrssItem" :class="['coinList_progress',bg]">
        <section :class="progressvaluecss" :style="{'width':w}"></section>
        <span :class="proTextCss">{{progressText}}</span>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                bg:"coinList_progress_bar",
                progressvaluecss:"progressValue_notComplete",
                progressText:"",
                proTextCss:'',
                w:"0px"
            }
        },

        props:['type','min','max'],

        created(){
            /**
             *  coinList_progress_bar背景色
             *  progressValue_notComplete 未完成没过期 值的颜色
             *  progressValue_notComplete_dead 未完成已过期
             * bg:""
             * progressvaluecss
             *
             */
        },

        mounted(){
            let tempMin = this.min;
            let tempMax = this.max;

            if(tempMin>=tempMax) tempMin=tempMax;
            let tepw = this.$refs['progrssItem']['clientWidth'];
            this.w = (tempMin*tepw)/tempMax + 'px';

            if(this.min>0 && this.min>= this.max){
                this.bg = '';
                this.progressvaluecss = 'progressValue_complete';
                this.proTextCss = 'coin_progressText_complete';
                if(this.type == 1){
                    this.progressText = `已完成`;
                }else if(this.type == 2){
                    this.progressText = `已领取${tempMax}金币`;
                }else if(this.type == 4){
                    this.progressText = `新用户奖励8金币，老用户奖励1金币`;
                }
            }else{
                this.proTextCss = 'coin_progressText_notComplete';
                this.progressvaluecss = "progressValue_notComplete";
                if(this.type == 1){
                    this.progressText = `还差${tempMax - tempMin}元可完成任务`;
                }else if(this.type == 2 || this.type == 3) {
                    this.progressText = '没有领取记录'
                }else if(this.type == 4){
                    this.progressText = `新用户奖励8金币，老用户奖励1金币`;
                }

            }
        }
    }
</script>

<style lang="less" scoped>
    .coinList_progress{
        position: relative;
        width: 100%;
        height: 100%;
    }

    .coinList_progress_bar{
        background-color: rgba(50,50,50,0.2);
        border-radius: 0.15rem;
    }


    .progressValue_notComplete_dead{
        background-color: rgba(50,50,50,0.1);
        border-radius: 0.15rem;
        position: absolute;
        height: 0.3rem;
        left: 0;
        top: 0;
        transition: all 0.3s ease;
    }
    .progressValue_notComplete{
        position: absolute;
        height: 0.3rem;
        background-color: #23b86d;
        border-radius: 0.15rem;
        left: 0;
        top: 0;
        transition: all 0.3s ease;
    }
    .progressValue_complete{
        position: absolute;
        width: 100%;
        height: 0.3rem;
        background-color: rgba(255,64,0,0.2);
        border-radius: 0.15rem;
        left: 0;
        top: 0;
        transition: all 0.3s ease;
    }


    .coin_progressText_complete{
        font-size: 0.2rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0rem;
        color: #ff4000;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        width: 100%;
        text-align: center;
    }
    .coin_progressText_notComplete{
        font-family: PingFang-SC-Regular;
        font-size: 0.2rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0rem;
        color: #ffffff;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        width: 100%;
        text-align: center;
    }
</style>