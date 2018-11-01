<template>
    <div id="virtualRoom_result">
        <div id='mask'></div>
        <div id='window'>
            <div id='success' v-show="isSuccess">
                <img src="static/image/result/top.png" style='width:5.32rem;height:0.32rem;position:absolute;left: 0.4rem;'>
                <div id='tip1'>恭喜你，抓到了!</div>
                <div id='doll'>
                    <img style="margin-top:.60rem;width:3rem;height:2.5rem" v-bind:src="'https://wwjcdn.like000.com/wwjDollImg/'+doll_id+'.jpg'">
                </div>
            </div>
            <div id='fail' v-show="!isSuccess">
                <div id='tip2'>就差一点点哦</div>
                <img src="static/image/result/fail.png" style="margin-top:.50rem;width:3.84rem;height:2.96rem">
                <div style="margin-top:.20rem;font-size:.26rem;" v-show='showredPacket'>
                    <img src="static/image/newImage/red.png" style="margin-bottom:-0.13rem;width:0.48rem;height:0.53rem"><span>大吉大利，获得一个红包</span>
                </div>
            </div>
            <div id='tip4'>您还有<span style='color:#ff8400'>{{goldNum}}</span>金币，是否再来一局？</div>
            <div id='line'></div>
            <div id='wait' v-on:click.once='leave'>稍后再试</div>
            <div id='line1'></div>
            <div id='goon' v-on:click.once='goon'>再来一局</div>
            <div id='pyq' v-on:click='shareClick' v-show="isShowShare">
                <img src="static/image/pyq.png" style="width:0.4rem;height:0.4rem"> 分享到朋友圈，炫耀一下吧
            </div>
        </div>

    </div>
</template>

<script>
import CF from '../../../router/ind.js';
import { mapState } from 'vuex';
export default {
    data () {
        return {
            showredPacket:false,
            time:10,
            isShowShare:false
        }
    },
    props:['isSuccess','doll_id','dollPrice'],
    created:function(){

        var self = this;
        this.isShowRed();
    },
    computed:{
        ...mapState(['goldNum'])
    },
    methods:{
        isShowRed:function(){
            var self = this;
            (new CF.Ajax()).sendJSON(CF.gameInfo.host+'get_red_packet',{
                user_id:CF.user.uid,
                catch_result:!self.isSuccess,
                sign:CF.M5B({user_id:CF.user.uid,catch_result:!self.isSuccess})
            },function(data){
                if(data.data.red_packet){
                    self.showredPacket=true;
                }
                
            });
        },
        leave:function(){ //离开下机
            this.$emit('closeResultPage')
            // clearInterval(this.interval);
        },
        shareClick:function(){
            CF.channel.setShareInfo('轻松抓到一只娃娃，良心抓力啊~',null);
        },
        goon:function(){
            var self = this;

            (new CF.Ajax()).sendJSON(CF.gameInfo.host+'start_game_virtual',{
                    user_id:CF.user.uid,
                    price:self.dollPrice,
                    sign:CF.M5B({user_id:CF.user.uid,price:self.dollPrice})
                },function(data){
                    if(data.status==1){
                        self.$emit('haveGold');
                    }else{
                        if (data['data'] && data['data']['recharge_pop']) {
                            self.$emit('smallMoney');
                        } else {
                            self.$emit('noHaveGold');
                        }
                        self.$emit('closeResultPage');
                    }
                }); 

        }

    }

}
</script>

<style scoped>

    #virtualRoom_result{
        position:fixed;
        height:100%;
        width:100%;
        top:0px;
        z-index: 999;
    }
    #mask{
        position:absolute;
        height:100%;
        width:100%;
        background:black;
        opacity:0.7;
    }
    #window{
        position: absolute;
        width: 6.06rem;
        height: 7.48rem;
        background: #ffffff;
        left: 50%;
        top: 50%;
        margin-left:-3.03rem;
        margin-top:-3.73rem;
        border-radius: .30rem;
    }
    #pyq{
        width: 5.00rem;
        height: .70rem;
        text-align: center;
        margin-top:.20rem;
        border:0.02rem solid #ffffff;
        border-radius: .35rem;
        color:#ffffff;
        font-size: .32rem;
        font-weight: bold;
        line-height: .70rem;
        margin-left: .50rem;
        vertical-align: middle;
    }
    #success{
        position: absolute;
        width: 100%;
        text-align: center;
    }
    #fail{
        position: absolute;
        width: 100%;
        text-align: center;
    }
    #tip1{
        font-weight: bold;
        font-size:.42rem;
        color: #ff6c00;
        margin-top:.32rem;
    }
    #tip2{
        font-weight: bold;
        font-size:.42rem;
        color: #ff8400;
        margin-top:.60rem;
    }
    #doll{
        width:3.75rem;height:3.75rem;text-align:center;border:0.03rem dashed #ff6901;
        margin-top:.30rem;
        margin-left:1.13rem;
    }
    #tip3{
        margin-top:.24rem;
        font-size:.30rem;
        color: #000000;
    }
    #tip4{
        margin-top:5.72rem;
        text-align: center;
        font-size:.28rem;
        color: #000000;
    }
    #line{
        width: 6.06rem;
        height:0.02rem;
        background-color : #f0f0f0;
        margin-top:.48rem;
    }
    #line1{
        display: inline-block;
        float: left;
        width:0.02rem;
        height: .32rem;
        background-color : #f0f0f0;
       /* margin-bottom:0.4rem;*/
       margin-top: 0.20rem;
    }
    #wait{
        display: inline-block;
        width: 2.94rem;
        text-align: center;
        float: left;
        font-size:.30rem;
        color:#cccccc;
        line-height: .92rem;
        /*margin-bottom:0.4rem;*/
    }
    #goon{
        display: inline-block;
        width: 2.94rem;
        text-align: center;
        font-size:.30rem;
        font-weight: bold;
        color:#50bfff;
        line-height: .92rem;
        float: left;
        /*margin-bottom:0.4rem;*/
    }
    
</style>