<template>
    <div id="gameRoom_control">
        <img class='ctro_bottom size' src="static/image/virtualDoll/contro_bottom.png"/>
        <img class='ctro_top size' src="static/image/virtualDoll/contro_top.png"/>
        <img class='ctro_left size'  src="static/image/virtualDoll/contro_left.png"/>
        <img class='ctro_right size'  src="static/image/virtualDoll/contro_right.png"/>

        <div class="ctro_bottom mask" v-on:touchstart='directionBtn_1' v-on:touchend='end'></div>
        <div class="ctro_top mask" v-on:touchstart='directionBtn_2' v-on:touchend='end'></div>
        <div class="ctro_left mask" v-on:touchstart='directionBtn_3' v-on:touchend='end'></div>
        <div class="ctro_right mask" v-on:touchstart='directionBtn_4' v-on:touchend='end'></div>

        <img class='drop' v-on:click='goDrop' src="static/image/virtualDoll/drop.png">

       <!--  <div class="_time">{{time}}</div> -->
    </div>
</template>

<script>
import CF from '../../../router/ind.js'
export default {
    data () {
        return {
            time:30
        }
    },
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
            self.$emit('move','4')
            //方向推送
            self.interval = setInterval(function(){
                if(self.canMove)
                self.$emit('move','4')
                if(!self.canMove) clearInterval(self.interval)
            },200)
            return false;
        },
        directionBtn_2:function(e){
            e.preventDefault(); 
            var self = this;
            self.canMove=true;
            if(self.interval)clearInterval(self.interval);
            self.$emit('move','3')
            //方向推送
            self.interval = setInterval(function(){
                if(self.canMove)
                    self.$emit('move','3')
                if(!self.canMove) clearInterval(self.interval)
            },200)
            return false;
        },
        directionBtn_3:function(e){
            e.preventDefault(); 
            var self = this;
            self.canMove=true;
            if(self.interval)clearInterval(self.interval);
            self.$emit('move','5')
            //方向推送
            self.interval = setInterval(function(){
                if(self.canMove)
                self.$emit('move','5')
                if(!self.canMove) clearInterval(self.interval)
            },200)
            return false;
        },
        directionBtn_4:function(e){
            e.preventDefault(); 
            var self = this;
            self.canMove=true;
            if(self.interval)clearInterval(self.interval);
            self.$emit('move','6')
            //方向推送
            self.interval = setInterval(function(){
                if(self.canMove)
                self.$emit('move','6')
                if(!self.canMove) clearInterval(self.interval)
            },200)
            return false;
        },
        end:function(){
            this.canMove=false;
        },
        goDrop:function(){
            CF.timers.del('controll_drop')
            //下抓推送
            this.$emit('goDrop')
        }

    }

}
</script>

<style scoped>
    #gameRoom_control{
        z-index: 20;
    }
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
    }
    .ctro_top{
        position: fixed;
        bottom: 1.82rem;
        left:1.53rem;
    }
    .ctro_left{
        position: fixed;
        bottom: .98rem;
        left:.48rem;
    }
    .ctro_right{
        position: fixed;
        bottom: .98rem;
        left:2.53rem;
    }
    .drop{
        position: fixed;
        bottom: .34rem;
        left: 5.16rem;
        width: 1.8rem;
        height: 1.8rem;
    }
    ._time{
        position: fixed;
        right: .35rem;
        top: 8.55rem;
        color:#ffffff;
        font-size: .62rem;
        font-weight: bold;
    }

</style>