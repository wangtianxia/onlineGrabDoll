<template>
    <div id="myDoll_state_2">
        <div class="info"><span>收货人：{{data.username}}</span></div>
        <div class='line_1'></div>
        <div class="info"><span>手机号：{{data.phone_no}}</span></div>
        <div class='line_1'></div>
        <div class="info3">地址：{{data.address}}</div>
        <div class='line_1'></div>
        <div id="change">
            <div id='tip1'>正在为您打包,请耐心等待 ...</div>
        </div>

    </div>
</template>

<script>
import CF from '../../../router/ind.js'
export default {
    data () {
        return {
            time:2,  //res.count
            name:'我的名字很长很长很长(ID:'+10001+")",
        }
    },
    props:['data'],
    created:function(){
        // console.log(this.result+'aaaaa'+this.doll_id);
        console.log(this.data)
        this.init();
    },
    watch:{
        '$route' (to, from) {
            //如果跳转页面不是本页面 不重新加载数据
            if(to.name=="myDollPage"){this.init();};
        }
    },
    methods:{
        init:function(){
            var self = this;
        },
        send_gift:function(){ //点击发货
            var self = this;
            self.$router.replace({ name: 'sendDollsPage', params: {_id:self.doll_id}});
        },
        returnBack:function(){
            console.log('返回')
            this.$router.go(-1)
        },

    }    


}
</script>

<style scoped>
    #myDoll_state_2{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        padding: 0 0.5rem;
    }
    #change{
        width: 100%;
        height: 1.10rem;
        background: #ffffff;
        border-radius: .10rem;
    }
    #tip1{
        text-align: center;
        font-size:.30rem;
        color: #000000;
        margin-top:.35rem;
    }

    .line_1{
        width: 100%;
        height:0.02rem;
        background-color : #f0f0f0;
    }

    .info{
        width: 100%;
        height: 1.1rem;
        background:#ffffff;
        font-size:.30rem;
        color: #979797;
        display: flex;
        align-items:center;
    }
    .info3{
        background:#ffffff;
        font-size:.30rem;
        color: #979797;
        display: flex;
        align-items:center;
        padding: 0.5rem 0;
    }
    .info span{
        display: flex;
    }



    
</style>