<template>
    <div id="myDoll_state_1">
            <!-- 组件页面-弹窗 -->
        <component v-bind:is="show_tip" :title='title' :tip='tip' :type='type' v-on:close='tipClose' v-on:ok='tipOk'></component>
        <!--<div id="change">-->
            <!--<div id='tip1'>-选择"兑换金币"将失去该娃娃得到一定数量的金币</div>-->
            <!--<div id='change_anniu' v-on:click='changeGold'>兑换金币</div>-->
        <!--</div>-->
        <ul id="send">
            <section class="myDoll_state_1_send">注意事项</section>
            <li id='tip2'>娃娃寄存时间为7日,到时未发货的娃娃,系统将自动为您兑换成金币</li>
            <li id='tip3'>2只及以上数量娃娃同时发货,可免邮费哦!<br/><p class="anther">(如单独为2只娃娃分别申请了发货,将无法享受免邮)</p></li>
            <li id='tip4'>收到包裹后请及时检查,售后处理时间为签收后7日<p class="anther">(请确保问题订单中娃娃、吊牌、外包装完好)</p></li>
            <li id='tip5'>仅支持中国大陆地区邮寄<br/><p class="anther">（新疆、青海、西藏暂不支持发货）</p></li>
            <li id='tip6'>为能顺利收到快递，请务必添加详细地址！<br/><p class="anther">（包含省、市、区（县）、详细住址）</p></li>
            <li id='fahuo' v-on:click='send_gift'>申请发货</li>
        </ul>
    </div>
</template>

<script>
import CF from '../../../router/ind.js';
import tip from '../tip1.vue';
import { mapMutations } from 'vuex';
export default {
    data () {
        return {
            show_tip:'',
            title:'兑换金币',  //弹窗标题
            tip:'确定将娃娃兑换成'+this.doll_refund_price+'金币？',//弹窗提示
            type:true,//弹窗类型true双按钮flase双按钮
        }
    },
    props:['doll_id','doll_refund_price'],
    created:function(){
        this.init();
    },
    watch:{
        '$route' (to, from) {
            //如果跳转页面不是本页面 不重新加载数据
            if(to.name=="myDollPage"){this.init();};
        }
    },
    methods:{
        ...mapMutations([
            'updateGoldNum'
        ]),

        init:function(){
            var self = this;
        },
        send_gift:function(){ //点击发货
            var self = this;
            self.$router.replace({ name: 'sendDollsPage', params: {_id:self.doll_id}});
        },
        changeGold:function(){ //点击兑币
            // var self = this;
            // self.show_tip='tip';
        },
        returnBack:function(){
            console.log('返回');
            this.$router.go(-1);
        },
        tipOk:function(){
            console.log('点击ok');
            // var self = this;
            // self.show_tip='';
            // (new CF.Ajax()).sendJSON(CF.gameInfo.host+'exchange_gold',{
            //     user_id:CF.user.uid,
            //     _id:self.doll_id,
            //     sign:CF.M5B({user_id:CF.user.uid,_id:self.doll_id,})
            // },function(res){
            //     if(res.status == 1){
            //         self.updateGoldNum(res.data.gold);
            //         self.$router.go(-1);
            //     }
            //
            // });
        },
        tipClose:function(){
            console.log('点击close');
            this.show_tip='';
        },

    },
    components:{
        tip:tip

    }    


}
</script>

<style scoped>
    p{
        margin: 0;
        padding: 0;
    }
    #myDoll_state_1{
        padding: 0.5rem;
    }
    #send{
        background: #ffffff;
        margin: 0;
        padding: 0 0 0 0.3rem;
    }
    #fahuo{
        height: .90rem;
        background: #ff4f97;
        border-radius: 1rem;
        text-align: center;
        color: #ffffff;
        font-size: .32rem;
        margin: 0.6rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(to right, rgb(241, 156, 56), rgb(237, 118, 58));
    }
    #tip2{
        font-weight: bold;
        font-size: .30rem;
        color: #323232;
        margin-bottom: 0.3rem;
    }
    #tip3{
        font-weight: bold;
        font-size: .30rem;
        color: #323232;
        margin-bottom: 0.3rem;
    }
    #tip4{
        font-weight: bold;
        font-size: .30rem;
        color: #323232;
        margin-bottom: 0.3rem;
    }
    #tip5,#tip6{
        font-weight: bold;
        font-size: .30rem;
        color: #323232;
        margin-bottom: 0.3rem;
    }


    .myDoll_state_1_send{
        font-size: 0.3rem;
        color: #888;
        margin-bottom: 0.3rem;
    }
    .anther{
        font-size: 0.26rem;
        color: #ff8f11;
    }

    
</style>