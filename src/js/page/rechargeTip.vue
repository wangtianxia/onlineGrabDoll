<template>
    <div id="tip">
        <div id='mask'></div>
        <div id='window'>
            
            <div id='title'>确认支付方式</div>
            <div id='rmb'>¥{{data.rmb}}.00</div>
            <div id='gold'>{{data.tip}}</div>
            <div id='wait' >
                <img src="static/image/wait.png" class="Rotation" style="width:0.4rem;height:0.4rem">
            </div>
            <div id='recharge' v-on:click='rechargeClick'>返回游戏重新支付</div>
            <div id='isOk' v-on:click='okClick'>付款完成</div>
            <div id='close'>
                <img src="static/image/close.png" v-on:click='closeClick' style="position: absolute;width: 100%;height: 100%;left: 0px;top: 0px;">
            </div>
        </div>
        
    	<!-- <div id='back'>
            <div id='tip'>恭喜你，抓到了</div>
        </div>
        <div id='leave'>稍后再试</div>
        <div id='goon'>再来一局</div> -->
    </div>
</template>

<script>
import CF from '../../router/ind.js'
export default {
    data () {
        return {

        }
    },
    props:['data'], //{rmb:30,tip:300,payUrl:''}
    created:function(){
        if(this.data.payUrl)
        window.location=this.data.payUrl;
    },
    methods:{
 
        rechargeClick:function(){
            this.$emit('rechargeCancel');//支付取消
            //重新支付
            // window.location=this.data.payUrl;
        },
        okClick:function(){
            this.$emit('rechargeComplete');//支付完成
        },
        closeClick:function(){
            this.$emit('rechargeCancel');//支付取消
        }

    }

}
</script>

<style scoped>
@-webkit-keyframes rotation{
from {-webkit-transform: rotate(0deg);}
to {-webkit-transform: rotate(360deg);}
}
.Rotation{
-webkit-transform: rotate(360deg);
animation: rotation 3s linear infinite;
-moz-animation: rotation 3s linear infinite;
-webkit-animation: rotation 3s linear infinite;
-o-animation: rotation 3s linear infinite;
}
    #tip{
        position:fixed;
        height:100%;
        width:100%;
        z-index: 999;
        top:0rem;
        left:0rem;
    }
    #close{
        position: absolute;
        right: .20rem;
        top: 0.3rem;
        height: 0.27rem;
        width: 0.27rem;
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
        width: 5.60rem;
        height: 5.24rem;
        background: #f2f2f2;
        left: 50%;
        top: 50%;
        margin-left:-2.80rem;
        margin-top:-2.62rem;
        border-radius: .20rem;
        text-align: center;
        overflow: hidden;
    }
    #title{
        font-weight: bold;
        font-size:.30rem;
        width: 5.60rem;
        height: 1.00rem;
        line-height: 1.00rem;
        background: #ffffff;
    }
    #rmb{
        font-size:.36rem;
        font-weight: bold;
        margin-top:.46rem;
    }
    
    #gold{
        font-size:.30rem;
        margin-top:.33rem;
       /* margin-top:.70rem;*/
    }
    #wait{
        margin-top: -0.2rem;
    }
    #recharge{
        margin-top: .60rem;
        display: inline-block;
        width: 2.40rem;
        height: .68rem;
        text-align: center;
        font-size:.30rem;
        color:#ffffff;
        background: #0099ff;
        line-height: .68rem;
        border-radius:0.08rem;
    }
    #isOk{
        border-radius:0.08rem;
        margin-left: .30rem;
        display: inline-block;
        width: 2.40rem;
        height: .68rem;
        text-align: center;
        font-size:.30rem;
        color:#ffffff;
        background: #ff8400;
        line-height: .68rem;
    }
    
</style>