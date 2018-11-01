<template>
    <div id="myDoll_state_4">
        <div id="change">
            <div id='tip1'>已兑换 <span style="color:#ff4f97">{{doll_refund_price}}</span> 枚金币</div>
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
    props:['doll_refund_price'],
    created:function(){
        // console.log(this.result+'aaaaa'+this.doll_id);

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
    #myDoll_state_4{
        width:100%;
    }
    #change{
        width: 100%;
        height: 1.10rem;
        background: #ffffff;
        border-radius: .10rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #tip1{
        text-align: center;
        font-size:.30rem;
        color: #000000;
        width: 3.75rem;
    }



    
</style>