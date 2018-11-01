<template>
    <div id="gameRoom_report" v-on:click='closeClick'>
        <div id='content'>
            <div class="btn" v-on:click='click(1)'>无法上机</div>
            <div class="btn" v-on:click='click(2)'>摄像头歪了</div>
            <div class="btn" v-on:click='click(3)'>没有娃娃了</div>
        </div>
    </div>
</template>

<script>
import CF from '../../router/ind.js'
export default {
    data () {
        return {

        }
    },
    props:['machineId'],
    created:function(){
        
    },
    methods:{
        closeClick:function(){
            this.$emit('close')
        },
        click:function(type){
            var self=this;
            (new CF.Ajax()).sendJSON(CF.gameInfo.host+'repair',{
                user_id:CF.user.uid,
                machine_id:self.machineId,
                type:type,
                sign:CF.M5B({user_id:CF.user.uid,machine_id:self.machineId,type:type})
            },function(data){
                
            });
        }
    }

}
</script>

<style scoped>
   #gameRoom_report{
        position: absolute;
        top: 0rem;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
    #content{
        display: flex;
        margin-top: 3.5rem;
        width: 4.30rem;
        justify-content: center;
        align-content : start;
        height: 3.3rem;
        border-radius:0.06rem;
        /*background: rgba(0,0,0,0.5);*/
        background: #000000;
        opacity: 0.5;
        flex-wrap: wrap;
    }
    .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.6rem;
        height: 0.7rem;
        border: 0.01rem solid #ffffff;
        font-size: 0.3rem;
        color: #ffffff;
        margin-top: 0.26rem;
    }
</style>