<template>
    <transition name="fade_2" v-on:after-enter="afterEnter">
        <div id='pushTip'>
            <div id='bk'>
               <img src="static/image/pushBk.png">
            </div>
            <img id='head' v-bind:src="pushData.head_img">
            <div id='tip'>{{pushData.user_name}}<br/>抓到了娃娃</div>
        </div>
    </transition>
</template>
<script>
import CF from '../../router/ind.js'
export default {
    data:function(){
        return{
            show:false
        }    
    },
    
    props:['pushData'],

    created:function(){
        var self=this;
        setTimeout(function(){
            self.show=true;
        },50);
    },
    methods:{
    	afterEnter:function(){
            var self=this;
            setTimeout(function(){
                self.$emit('pushOk')
            },1000)
    	}
    }
}
 

</script>


<style scoped>


    #pushTip{
        position:fixed;
        width: 3.11rem;
        height: 1.18rem;
        top:5.2rem;
        overflow: hidden;
        z-index: 998;
    }
    #bk{
        position: absolute;
        top: 0;
        width: 3.11rem;
        height: 1.18rem;
    }
    #bk img{
        width: 100%;
        height: 100%;
    }
    #head{
        position: absolute;
        top: 0.23rem;
        border-radius: 50%;
        max-width: .65rem;
        max-height: .65rem;
        border: 0.02rem solid #ffffff;
        left: 0.05rem;
    }
    #tip{
        position: absolute;
        font-size: 0.3rem;
        line-height: 0.42rem;
        color: #ffffff;
        left: .8rem;
        top: 0.15rem;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .fade_2-enter-active, .fade_2-leave-active {
        transition: all 1s ease-out
    }

    .fade_2-enter, .fade_2-leave-active {
        opacity: 0.3;
    }

    .fade_2-leave-active {
        transform: translateX(-3.18rem);
    }

    .fade_2-enter {
        transform: translateX(-3.18rem);
    }

    .fade_2-enter-action {
        transform: translateX(0rem);
    }


</style>