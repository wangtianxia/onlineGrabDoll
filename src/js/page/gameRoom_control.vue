<template>
    <div id="gameRoom_control">
        <img class='ctro_bottom size' src="static/image/game/bottom.png"/>
        <img class='ctro_top size' src="static/image/game/top.png"/>
        <img class='ctro_left size'  src="static/image/game/left.png"/>
        <img class='ctro_right size'  src="static/image/game/right.png"/>

        <div class="ctro_bottom mask" v-on:touchstart='directionBtn_1' v-on:touchend='end'></div>
        <div class="ctro_top mask" v-on:touchstart='directionBtn_2' v-on:touchend='end'></div>
        <div class="ctro_left mask" v-on:touchstart='directionBtn_3' v-on:touchend='end'></div>
        <div class="ctro_right mask" v-on:touchstart='directionBtn_4' v-on:touchend='end'></div>

        <section class="dropAndHold" v-if="type==1">
             <img class='drop' v-on:click='goDrop' src="static/image/game/drop.png">
        </section>
        <section class="dropAndHold" v-else>
            <img class='drop' v-on:click='goDrop' v-show="status" src="static/image/game/drop.png">
            <img class='hold' v-on:click='goHold' v-show="!status" src="static/image/game/drop1.png">
        </section>
        <div class="_time">{{time}}</div>
    </div>
</template>

<script>
import CF from '../../router/ind.js'
export default {
    data () {
        return {
            time:30,
            status:true
        }
    },
    props:['lTime','type'],
    created:function(){

        this.time=this.lTime;
        var self = this;
        CF.timers.add(function(){
            self.time--;
            if(self.time<=0){
                self.time=0;
            }
        },'controll_drop')
        CF.timers.start();

    },
    methods:{
        directionBtn_1:function(e){
            e.preventDefault(); 
            var self = this;
            self.canMove=true;
            if(self.interval)clearInterval(self.interval);
            CF.Connet.actionPush('4',{});
            //方向推送
            self.interval = setInterval(function(){
                // console.log('124')
                if(self.canMove)
                CF.Connet.actionPush('4',{});
                if(!self.canMove) clearInterval(self.interval)
            },200)
            return false;
        },
        directionBtn_2:function(e){
            e.preventDefault(); 
            var self = this;
            self.canMove=true;
            if(self.interval)clearInterval(self.interval);
            CF.Connet.actionPush('3',{});
            //方向推送
            self.interval = setInterval(function(){
                if(self.canMove)
                CF.Connet.actionPush('3',{});
                if(!self.canMove) clearInterval(self.interval)
            },200)
            return false;
        },
        directionBtn_3:function(e){
            e.preventDefault(); 
            var self = this;
            self.canMove=true;
            if(self.interval)clearInterval(self.interval);
            CF.Connet.actionPush('5',{});
            //方向推送
            self.interval = setInterval(function(){
                if(self.canMove)
                CF.Connet.actionPush('5',{});
                if(!self.canMove) clearInterval(self.interval)
            },200)
            return false;
        },
        directionBtn_4:function(e){
            e.preventDefault(); 
            var self = this;
            self.canMove=true;
            if(self.interval)clearInterval(self.interval);
            CF.Connet.actionPush('6',{});
            //方向推送
            self.interval = setInterval(function(){
                if(self.canMove)
                CF.Connet.actionPush('6',{});
                if(!self.canMove) clearInterval(self.interval)
            },200)
            return false;
        },
        end:function(){
            this.canMove=false;
        },
        // 抓
        goDrop:function(){
            if(this.type == 1){
                 CF.timers.del('controll_drop')
            }
            if(this.type == 2){
                this.status = false;
            }
            //下抓推送
            CF.Connet.actionPush('7',{});
        },
        // 松
        goHold(){
            CF.timers.del('controll_drop');
            CF.Connet.actionPush('7',{});
        }
    }
}
</script>

<style scoped>
   /* #gameRoom_control{
        position: absolute;
    }*/
    .mask{
        background: #000000;
        width: 1.24rem;
        height: 1.24rem;
        opacity:0;
    }
    .size{
        width: 1.24rem;
        height: 1.24rem;
    }
    .ctro_bottom{
        position: fixed;
        bottom:0.05rem;
        left:1.53rem;
        z-index: 100;
    }
    .ctro_top{
        position: fixed;
        bottom: 1.82rem;
        left:1.53rem;
        z-index: 100;
    }
    .ctro_left{
        position: fixed;
        bottom: .98rem;
        left:.48rem;
        z-index: 100;
    }
    .ctro_right{
        position: fixed;
        bottom: .98rem;
        left:2.53rem;
        z-index: 100;
    }
    .dropAndHold{
        position: fixed;
        bottom: .34rem;
        left: 5.16rem;
        z-index: 100;
    }
    .drop,.hold{
        width: 1.8rem;
        height: 1.8rem;
    }
    ._time{
        position: fixed;
        top: 3rem;
        color: black;
        font-size: .76rem;
        font-weight: bold;
        z-index: 100;
        left: 50%;
        transform: translate(-50%,-50%);
    }

</style>