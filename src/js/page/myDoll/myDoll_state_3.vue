<template>
    <div id="myDoll_state_3">
        <div id="user_info">
            <div id='tip1'>{{username}}</div>
            <div id='tip2'>{{address}}</div>
            <div id='line_1'></div>
            <section class="common">
                <span id='tip3'>快递公司</span>
                <span id='tip4'>{{express}}</span>
            </section>

            <div class='line_2'></div>
            <section class="common">
                <div id='tip5'>快递单号</div>
                <span id='tip6'>{{number}}</span>
            </section>
            <div class='line_2'></div>
        </div>
        <div id='btnClass' v-if="hideBtn">
            <div id='showBtn' v-on:click='showBtnClick'>秀娃娃得金币</div>
        </div>
    </div>
</template>

<script>
import CF from '../../../router/ind.js'
export default {
    data () {
        return {
            time:2,  //res.count
            hideBtn:true
        }
    },
    props:['address','username','express','number','bag_id','isShowDollShow'],
    created:function(){
        this.init();
        // if(CF.user.platform == '1003' || CF.user.platform == '1007'){
        //     if(!this.isShowDollShow){
        //         this.hideBtn = true;
        //     }else{
        //         this.hideBtn = false;
        //     }
        // }else{
        //     this.hideBtn = true;
        // }
        this.hideBtn = !this.isShowDollShow;
    },
    watch:{
        '$route' (to, from) {
            //如果跳转页面不是本页面 不重新加载数据
            if(to.name=="myDollPage"){this.init();}
        }
    },
    methods:{
        init:function(){
            var self = this;
        },

        returnBack:function(){
            console.log('返回');
            this.$router.go(-1);
        },

        showBtnClick:function(){
            //isShowDollShow 不存在 就显示 ，true就不显示
            var self = this;
            self.$router.replace({ name: 'uploadPhotoPage', params: {bag_id:self.bag_id,isShowDollShow:!self.isShowDollShow}});
        }
    }
}
</script>

<style scoped>
    #myDoll_state_3{
        font-size: 0;
        line-height: 1;
        padding: 0 0.5rem;
    }
    #mask{
        position:absolute;
        height:100%;
        width:100%;
        background:#eaf6fb;
        opacity:0;
    }
    #user_info{
        width: 100%;
        background: #ffffff;
    }
    #tip1{
        font-size:.30rem;
        color: #000000;
        margin-top:.25rem;
    }
    #tip2{
        font-size: .3rem;
        color: #979797;
        width: 6.90rem;
        margin: .25rem 0;
    }
    #tip3{
        font-size:.30rem;
        color: #979797;
    }
    #tip4{
        font-size:.30rem;
        color: #000000;
    }
    #tip5{
        font-size:.30rem;
        color: #979797;
    }
    #tip6{
        font-size:.30rem;
        color: #000000;
    }

    #line_1{
        width: 100%;
        height:1px;
        background-color : #f0f0f0;
    }
    .line_2{
        display: inline-block;
        width: 100%;
        height:1px;
        background-color : #f0f0f0;
    }
    #showBtn{
        display: flex;
        width: 100%;
        justify-content:center;
        align-items: center;
        height: .90rem;
        background: #ff4f97;
        border-radius: 1rem;
        text-align: center;
        color: #ffffff;
        font-size: .32rem;
        margin-top: 0.6rem;
        background: -webkit-gradient(linear, left top, right top, from(rgb(241, 156, 56)), to(rgb(237, 118, 58)));
    }
    #btnClass{
        display: flex;
        justify-content:center;
        width: 100%;
    }
    .common{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0.25rem 0rem;
    }
    #tip6,#tip4{
        margin-left: 0.2rem;
    }



    
</style>